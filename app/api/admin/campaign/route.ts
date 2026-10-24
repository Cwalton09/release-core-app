import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CAMPAIGNS, type CampaignId } from "@/lib/campaigns";
import { serviceClient } from "@/lib/emailSeries/db";
import { resendConfigured, sendSeriesEmail } from "@/lib/emailSeries/send";
import { ADMIN_EMAILS, requireAdmin } from "@/lib/requireAdmin";

export const maxDuration = 300;

type Recipient = { email: string; firstName: string };

const isCampaign = (id: unknown): id is CampaignId => typeof id === "string" && id in CAMPAIGNS;

// Who gets each one-time email, worked out from Stripe so it is always current:
// members = an active subscription and no session time set yet;
// canceled = a canceled subscription and no active one now (rejoined people are left out).
async function recipients(campaign: CampaignId): Promise<Recipient[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const active = new Map<string, string>();
  const canceled = new Map<string, string>();
  for await (const sub of stripe.subscriptions.list({ status: "all", limit: 100, expand: ["data.customer"] })) {
    const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer;
    const email = "email" in customer ? customer.email?.toLowerCase() : undefined;
    if (!email || ADMIN_EMAILS.has(email)) continue;
    const name = ("name" in customer && customer.name) || "";
    if (["active", "trialing", "past_due"].includes(sub.status)) active.set(email, name);
    else if (sub.status === "canceled") canceled.set(email, name);
  }

  let list: Map<string, string>;
  if (campaign === "canceled") {
    list = new Map([...canceled].filter(([email]) => !active.has(email)));
  } else {
    // Skip members who already picked a session time.
    const supabase = serviceClient();
    const scheduled = new Set<string>();
    const { data: profiles } = await supabase.from("profiles").select("user_id, session_days");
    const scheduledIds = new Set((profiles ?? []).filter((p) => p.session_days).map((p) => p.user_id));
    for (let page = 1; ; page++) {
      const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) throw error;
      for (const u of data.users) if (u.email && scheduledIds.has(u.id)) scheduled.add(u.email.toLowerCase());
      if (data.users.length < 1000) break;
    }
    list = new Map([...active].filter(([email]) => !scheduled.has(email)));
  }

  return [...list].map(([email, name]) => ({ email, firstName: name.trim().split(/\s+/)[0] || "" }));
}

// GET ?campaign=members|canceled previews the list. Nothing is sent.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const campaign = req.nextUrl.searchParams.get("campaign");
  if (!isCampaign(campaign)) return NextResponse.json({ error: "Unknown campaign." }, { status: 400 });
  return NextResponse.json({ recipients: await recipients(campaign) });
}

// POST { campaign } sends one personal email to each person on the list. Resend's
// idempotency key means pressing send twice never emails anyone a second time.
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  if (!resendConfigured()) return NextResponse.json({ error: "RESEND_API_KEY is not set." }, { status: 500 });
  const { campaign } = await req.json();
  if (!isCampaign(campaign)) return NextResponse.json({ error: "Unknown campaign." }, { status: 400 });

  const list = await recipients(campaign);
  const failed: string[] = [];
  let sent = 0;
  for (const r of list) {
    try {
      await sendSeriesEmail(CAMPAIGNS[campaign].email, r.email, r.firstName || null, `campaign-${campaign}-2026-10-24-${r.email}`);
      sent++;
    } catch (err) {
      console.error(`Campaign ${campaign} to ${r.email} failed:`, err);
      failed.push(r.email);
    }
    // Stay under Resend's rate limit of a few requests per second.
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  return NextResponse.json({ sent, failed });
}
