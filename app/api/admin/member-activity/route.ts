import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ADMIN_EMAILS, requireAdmin } from "@/lib/requireAdmin";

export const maxDuration = 300;

export type MemberActivity = {
  email: string;
  name: string;
  status: string;
  joined: string;
  canceled: string | null;
  reason: string | null;
  sessions: number;
  lastSession: string | null;
  // Last guided deep session or dream (tracked from Oct 24, 2026 on).
  lastActive: string | null;
};

// Every Stripe subscription with how many sessions that member saved, so we can
// see whether people who cancel ever used Release Core. Read only.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Account ids by email, so a Stripe customer can be matched to their sessions.
  const userIdByEmail = new Map<string, string>();
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const u of data.users) if (u.email) userIdByEmail.set(u.email.toLowerCase(), u.id);
    if (data.users.length < 1000) break;
  }

  const { data: sessionRows, error: sessionError } = await supabase
    .from("sessions")
    .select("user_id, created_at");
  if (sessionError) return NextResponse.json({ error: sessionError.message }, { status: 500 });
  const sessionsByUser = new Map<string, string[]>();
  for (const s of sessionRows ?? []) {
    const list = sessionsByUser.get(s.user_id) ?? [];
    list.push(s.created_at);
    sessionsByUser.set(s.user_id, list);
  }

  // Missing until supabase/session-schedule.sql adds last_active_at; then it just stays empty.
  const { data: activity } = await supabase.from("profiles").select("user_id, last_active_at");
  const lastActiveByUser = new Map((activity ?? []).map((p) => [p.user_id, p.last_active_at as string | null]));

  const members: MemberActivity[] = [];
  for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100, expand: ["data.customer"] })) {
    const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer;
    const email = "email" in customer ? customer.email?.toLowerCase() ?? "" : "";
    if (!email || ADMIN_EMAILS.has(email)) continue;
    const userId = userIdByEmail.get(email);
    const dates = (userId && sessionsByUser.get(userId)) || [];
    const iso = (t: number | null) => (t ? new Date(t * 1000).toISOString() : null);
    members.push({
      email,
      name: "name" in customer ? customer.name ?? "" : "",
      status: sub.status,
      joined: iso(sub.created)!,
      canceled: iso(sub.canceled_at ?? sub.ended_at ?? null),
      reason: sub.cancellation_details?.feedback ?? null,
      sessions: dates.length,
      lastSession: dates.length ? dates.sort().at(-1)! : null,
      lastActive: (userId && lastActiveByUser.get(userId)) || null,
    });
  }

  members.sort((a, b) => b.joined.localeCompare(a.joined));
  return NextResponse.json({ members });
}
