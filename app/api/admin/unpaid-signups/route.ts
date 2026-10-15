import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ADMIN_EMAILS, requireAdmin } from "@/lib/requireAdmin";
import { customerIdsForEmail } from "@/lib/stripeCustomers";

export const maxDuration = 300;

type Signup = { email: string; name: string; createdAt: string };

// People who created an account but never started a membership: not paid, and
// no subscription has ever been linked to them. Read only; nothing is changed.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_id, display_name, paid, subscription_status, stripe_customer_id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const profileById = new Map(profiles.map((p) => [p.user_id, p]));

  const signups: Signup[] = [];
  for (let page = 1; ; page++) {
    const { data, error: listError } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (listError) return NextResponse.json({ error: listError.message }, { status: 500 });

    for (const user of data.users) {
      const email = user.email?.toLowerCase();
      if (!email || ADMIN_EMAILS.has(email)) continue;
      const profile = profileById.get(user.id);
      // Anyone who is paying, or ever had a subscription, is not a new lead.
      if (profile?.paid || profile?.subscription_status || profile?.stripe_customer_id) continue;
      signups.push({
        email,
        name: profile?.display_name ?? "",
        createdAt: user.created_at,
      });
    }
    if (data.users.length < 1000) break;
  }

  // Leave out anyone Stripe knows as a customer (for example someone who paid
  // before the webhook linked their account), so paying members are never emailed.
  const leads: Signup[] = [];
  for (const signup of signups) {
    const customers = await customerIdsForEmail(stripe, signup.email);
    if (customers.length === 0) leads.push(signup);
  }

  leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ leads, skippedAsCustomers: signups.length - leads.length });
}
