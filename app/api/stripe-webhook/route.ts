import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Paid status is only ever set here, from events Stripe has signed. The browser
// cannot grant itself access (see supabase/billing-protection.sql).

// past_due keeps access while Stripe retries a failed card; if every retry
// fails, the subscription moves to canceled/unpaid and access is removed.
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

type BillingFields = {
  paid: boolean;
  subscription_status: string | null;
  stripe_customer_id?: string;
  stripe_subscription_id?: string | null;
};

// Finds the profile for a Stripe customer: first by the saved customer id, then
// by the email on the Stripe customer. Members who joined before customer ids
// were saved get linked the first time Stripe sends an event about them.
async function findUserId(
  supabase: SupabaseClient,
  stripe: Stripe,
  customerId: string,
  email?: string | null
): Promise<string | null> {
  const { data: byCustomer } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  if (byCustomer?.user_id) return byCustomer.user_id;

  let lookupEmail = email;
  if (!lookupEmail) {
    const customer = await stripe.customers.retrieve(customerId);
    if (!customer.deleted) lookupEmail = customer.email;
  }
  if (!lookupEmail) return null;

  const { data: userId, error } = await supabase.rpc("get_user_id_by_email", {
    lookup_email: lookupEmail,
  });
  if (error) console.error("Email lookup failed:", error);
  return (userId as string | null) ?? null;
}

async function updateProfile(supabase: SupabaseClient, userId: string, fields: BillingFields) {
  const { error } = await supabase.from("profiles").update(fields).eq("user_id", userId);
  if (error) throw error;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia" as any,
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // A new member finished checkout through the payment link.
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== "paid") break;

        const customerId = session.customer as string;
        const userId =
          session.client_reference_id ??
          (await findUserId(supabase, stripe, customerId, session.customer_details?.email));

        if (!userId) {
          console.error(`Checkout ${session.id}: no matching user for customer ${customerId}`);
          break;
        }

        await updateProfile(supabase, userId, {
          paid: true,
          subscription_status: "active",
          stripe_customer_id: customerId,
          stripe_subscription_id: (session.subscription as string | null) ?? null,
        });
        console.log(`Checkout completed for user ${userId}`);
        break;
      }

      // Fires for every successful monthly payment, which also links existing members.
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const userId = await findUserId(supabase, stripe, customerId, invoice.customer_email);

        if (!userId) {
          console.error(`Invoice ${invoice.id}: no matching user for customer ${customerId}`);
          break;
        }

        await updateProfile(supabase, userId, {
          paid: true,
          subscription_status: "active",
          stripe_customer_id: customerId,
        });
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userId = await findUserId(supabase, stripe, customerId);

        if (!userId) {
          console.error(`Subscription ${subscription.id}: no matching user for customer ${customerId}`);
          break;
        }

        const deleted = event.type === "customer.subscription.deleted";
        await updateProfile(supabase, userId, {
          paid: !deleted && ACTIVE_STATUSES.has(subscription.status),
          subscription_status: deleted ? "cancelled" : subscription.status,
          stripe_customer_id: customerId,
          stripe_subscription_id: deleted ? null : subscription.id,
        });
        console.log(`Subscription ${event.type} for user ${userId}: ${subscription.status}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
