import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ADMIN_EMAILS, requireAdmin } from "@/lib/requireAdmin";
import { customerIdsForEmail } from "@/lib/stripeCustomers";

export const maxDuration = 300;

// Same statuses the Stripe webhook treats as an active membership.
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

// Release Core Pro ($50/month) shares this Stripe account but is a separate product.
const PRO_PRICE_ID = "price_1TRhd8GcdSdj0ADuCKI9UTOU";

// Anyone with a successful payment this recently counts as still paying.
const RECENT_PAYMENT_DAYS = 35;

type Change = {
  userId: string;
  email: string;
  reason: string;
  subscriptionStatus: string;
  stripeCustomerId: string | null;
};

async function emailsByUserId(supabase: SupabaseClient) {
  const emails = new Map<string, string>();
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const u of data.users) if (u.email) emails.set(u.id, u.email.toLowerCase());
    if (data.users.length < 1000) return emails;
  }
}

// Members still marked paid whose Stripe customer has no active subscription.
// These are people who cancelled before the webhook was in place.
async function findCancelled(supabase: SupabaseClient, stripe: Stripe) {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_id, paid, subscription_status, stripe_customer_id")
    .eq("paid", true);
  if (error) throw error;

  const emails = await emailsByUserId(supabase);
  const changes: Change[] = [];
  let checked = 0;
  let stillActive = 0;

  for (const profile of profiles) {
    const email = emails.get(profile.user_id) ?? "";
    if (ADMIN_EMAILS.has(email) || profile.subscription_status === "owner") continue;
    checked++;

    // People who paid more than once can have several Stripe customers, so check
    // the saved one and every customer with their email.
    const customerIds = new Set<string>();
    if (profile.stripe_customer_id) customerIds.add(profile.stripe_customer_id);
    if (email) {
      for (const id of await customerIdsForEmail(stripe, email)) customerIds.add(id);
    }

    let active = false;
    let hasProOnly = false;
    let latestStatus = "no_subscription";
    let latestCreated = 0;
    const recentCutoff = Math.floor(Date.now() / 1000) - RECENT_PAYMENT_DAYS * 86400;

    for (const customer of customerIds) {
      const subs = await stripe.subscriptions.list({ customer, status: "all", limit: 100 });
      for (const sub of subs.data) {
        // A Release Core Pro subscription doesn't count toward the individual app.
        if (sub.items.data.some((item) => item.price?.id === PRO_PRICE_ID)) {
          if (ACTIVE_STATUSES.has(sub.status)) hasProOnly = true;
          continue;
        }
        if (ACTIVE_STATUSES.has(sub.status)) active = true;
        if (sub.created > latestCreated) {
          latestCreated = sub.created;
          latestStatus = sub.status;
        }
      }

      // Safety net: a successful individual-app payment in the last month means
      // they're paying, whatever the subscription record says.
      if (!active) {
        const invoices = await stripe.invoices.list({
          customer,
          status: "paid",
          created: { gte: recentCutoff },
          limit: 20,
        });
        const paidRecently = invoices.data.some((invoice) =>
          invoice.lines.data.some(
            (line: any) => (line.pricing?.price_details?.price ?? line.price?.id) !== PRO_PRICE_ID
          )
        );
        if (paidRecently) active = true;
      }
      if (active) break;
    }

    if (active) {
      stillActive++;
      continue;
    }

    changes.push({
      userId: profile.user_id,
      email,
      reason:
        customerIds.size === 0
          ? "No Stripe customer found with this email"
          : hasProOnly
            ? "Only has an active Release Core Pro subscription, not the individual app"
            : `No payment in the last ${RECENT_PAYMENT_DAYS} days. Latest subscription: ${latestStatus}`,
      subscriptionStatus: latestStatus === "no_subscription" ? "no_subscription" : latestStatus,
      stripeCustomerId: [...customerIds][0] ?? null,
    });
  }

  return { checked, stillActive, changes };
}

function clients() {
  return {
    supabase: createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    ),
    stripe: new Stripe(process.env.STRIPE_SECRET_KEY!),
  };
}

// Preview: lists who would lose access, changes nothing.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const { supabase, stripe } = clients();
  try {
    return NextResponse.json(await findCancelled(supabase, stripe));
  } catch (err) {
    console.error("Billing sync preview failed:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Apply: marks those members unpaid. The service role is allowed past the
// billing-protection trigger, the same way the webhook is.
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const { supabase, stripe } = clients();
  try {
    const { checked, stillActive, changes } = await findCancelled(supabase, stripe);
    let updated = 0;
    for (const change of changes) {
      const { error } = await supabase
        .from("profiles")
        .update({
          paid: false,
          subscription_status: change.subscriptionStatus,
          ...(change.stripeCustomerId ? { stripe_customer_id: change.stripeCustomerId } : {}),
          stripe_subscription_id: null,
        })
        .eq("user_id", change.userId);
      if (error) throw error;
      updated++;
    }
    return NextResponse.json({ checked, stillActive, changes, updated });
  } catch (err) {
    console.error("Billing sync failed:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
