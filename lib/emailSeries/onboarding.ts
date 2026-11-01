import Stripe from "stripe";
import { ADMIN_EMAILS } from "@/lib/requireAdmin";
import type { serviceClient } from "./db";
import { sendSeriesEmail } from "./send";
import type { SeriesEmail } from "./types";

// First-week emails for new paying members, so they actually do a first session.
// `day` is days since their subscription started. Day 1 goes to everyone; the
// later ones only go to members who haven't done a session yet.
type OnboardingEmail = SeriesEmail & { onlyIfInactive: boolean };

export const ONBOARDING_SERIES: OnboardingEmail[] = [
  {
    day: 1,
    onlyIfInactive: false,
    subject: "Your first session: start here",
    preview: "20 minutes, a quiet spot, and your body's yes and no",
    blocks: [
      "Hi {{name}},",
      "Welcome to Release Core. I'm so glad you're here. Here's how to get the most out of your first session:",
      "<strong>1. Pick something small and real.</strong> A reaction from this week that felt bigger than the moment. A tight chest, a snap at someone, a night you couldn't sleep. You don't need to know why. That's what the session is for.",
      "<strong>2. Find a quiet spot where you can stand.</strong> You'll use the sway test the whole way through: say a statement out loud, and your body answers yes or no with a gentle lean.",
      "<strong>3. Find your yes and no first.</strong> Say “My name is [your real name]” and notice which way you lean. That's your yes. Then say a name that isn't yours. That's your no.",
      "<strong>4. Trust the first lean.</strong> Don't think it through. Your body already knows.",
      "Start with <strong>Phase 1</strong> if you want a clear step-by-step session, or <strong>Phase 2</strong> if you want to go deeper on one specific thing. When you finish, you'll get your summary and a nighttime script to listen to as you fall asleep.",
      { button: ["Start my first session", "https://release-core.com/dashboard"] },
      "Chelsea",
    ],
  },
  {
    day: 3,
    onlyIfInactive: true,
    subject: "The hardest part is the first 2 minutes",
    preview: "If you haven't started yet, here's the easy way in",
    blocks: [
      "Hi {{name}},",
      "I noticed you haven't done your first session yet. That's really common, so here are the two things I hear most:",
      "<strong>“I don't know what to work on.”</strong> You don't have to. Start with what you're feeling right now, even if it's just “tired” or “on edge.” Your body takes it from there.",
      "<strong>“I'm not sure my body sways.”</strong> Drink some water, take a few slow breaths, unlock your knees, and give it a few more seconds. You can also ask “Can you show me a yes?” and “Can you show me a no?” Some bodies lean slowly at first.",
      "Give it 20 minutes today. Your body has been waiting a long time to be asked.",
      { button: ["Start my first session", "https://release-core.com/dashboard"] },
      "Chelsea",
    ],
  },
  {
    day: 7,
    onlyIfInactive: true,
    subject: "Want me to hold you to it?",
    preview: "Pick a session time and I'll remind you",
    blocks: [
      "Hi {{name}},",
      "Life gets busy, and the things that are for us are usually the first to get pushed back. So let's make it easy.",
      "On your dashboard, pick a day and time for your session. I'll send you a reminder that morning, and you can add it to your calendar too. Treat it like you booked it with me.",
      { button: ["Pick my session time", "https://release-core.com/dashboard"] },
      'Stuck on something, or not sure where to start? Message me in the <a href="https://www.facebook.com/groups/952719290453784">Release Core Method group on Facebook</a> and I\'ll help you.',
      "Chelsea",
    ],
  },
];

const DAY = 24 * 60 * 60 * 1000;

// Runs inside the daily email cron. A member gets each email on the exact day it's
// due, so no tracking column is needed. "Active" means they saved a Phase 1 session
// or did a Guided Deep Session or dream after joining.
export async function sendOnboardingEmails(supabase: ReturnType<typeof serviceClient>) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const maxDay = Math.max(...ONBOARDING_SERIES.map((e) => e.day));
  const since = Math.floor((Date.now() - (maxDay + 1) * DAY) / 1000);

  const { data: unsubscribed } = await supabase
    .from("email_subscribers")
    .select("email")
    .not("unsubscribed_at", "is", null);
  const optedOut = new Set((unsubscribed ?? []).map((s) => s.email.toLowerCase()));

  let sent = 0;
  let failed = 0;
  for await (const sub of stripe.subscriptions.list({ status: "active", created: { gte: since }, limit: 100, expand: ["data.customer"] })) {
    const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer;
    const email = "email" in customer ? customer.email?.toLowerCase() ?? "" : "";
    if (!email || ADMIN_EMAILS.has(email) || optedOut.has(email)) continue;

    const day = Math.floor((Date.now() - sub.created * 1000) / DAY);
    const due = ONBOARDING_SERIES.find((e) => e.day === day);
    if (!due) continue;

    const joined = new Date(sub.created * 1000).toISOString();
    if (due.onlyIfInactive && (await isActiveSince(supabase, email, joined))) continue;

    const firstName = ("name" in customer && customer.name?.split(" ")[0]) || null;
    try {
      await sendSeriesEmail(due, email, firstName, `onboarding-${sub.id}-${due.day}`);
      sent++;
    } catch (err) {
      failed++;
      console.error(`Onboarding email to ${email} failed:`, err);
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  return { sent, failed };
}

async function isActiveSince(supabase: ReturnType<typeof serviceClient>, email: string, since: string) {
  const { data: users } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const user = users?.users.find((u) => u.email?.toLowerCase() === email);
  if (!user) return false;
  const { count } = await supabase
    .from("sessions")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", since);
  if (count) return true;
  const { data: profile } = await supabase.from("profiles").select("last_active_at").eq("user_id", user.id).maybeSingle();
  return Boolean(profile?.last_active_at && profile.last_active_at >= since);
}
