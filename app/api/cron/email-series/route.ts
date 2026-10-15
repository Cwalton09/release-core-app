import { NextRequest, NextResponse } from "next/server";
import { serviceClient, type Subscriber } from "@/lib/emailSeries/db";
import { QUIZ_SERIES } from "@/lib/emailSeries/quiz";
import { resendConfigured, sendSeriesEmail } from "@/lib/emailSeries/send";
import type { SeriesEmail } from "@/lib/emailSeries/types";
import { WELCOME_SERIES } from "@/lib/emailSeries/welcome";

export const maxDuration = 300;

const DAY = 24 * 60 * 60 * 1000;

const daysSince = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / DAY);

// Emails of paying members, who shouldn't keep getting "start your membership" emails.
async function memberEmails(supabase: ReturnType<typeof serviceClient>) {
  const { data: paid } = await supabase.from("profiles").select("user_id").eq("paid", true);
  const paidIds = new Set((paid ?? []).map((p) => p.user_id));
  const emails = new Set<string>();
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const u of data.users) if (u.email && paidIds.has(u.id)) emails.add(u.email.toLowerCase());
    if (data.users.length < 1000) return emails;
  }
}

// Runs once a day (vercel.json). Sends each person at most one email per run:
// the next welcome email or quiz email that has come due.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }
  if (!resendConfigured()) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set." }, { status: 500 });
  }

  const supabase = serviceClient();
  const { data: subscribers, error } = await supabase
    .from("email_subscribers")
    .select("*")
    .is("unsubscribed_at", null)
    .returns<Subscriber[]>();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const members = await memberEmails(supabase);
  let sent = 0;
  let failed = 0;

  for (const s of subscribers) {
    if (members.has(s.email)) continue;

    let next: { email: SeriesEmail; field: "welcome_sent" | "quiz_sent"; count: number } | null = null;
    const welcome = WELCOME_SERIES[s.welcome_sent];
    if (welcome && daysSince(s.created_at) >= welcome.day) {
      next = { email: welcome, field: "welcome_sent", count: s.welcome_sent + 1 };
    }
    const quiz = s.quiz_pattern && s.quiz_started_at ? QUIZ_SERIES[s.quiz_pattern]?.[s.quiz_sent] : undefined;
    // Quiz emails go first: they're the most personal, and a welcome email waits a day.
    if (quiz && daysSince(s.quiz_started_at!) >= quiz.day) {
      next = { email: quiz, field: "quiz_sent", count: s.quiz_sent + 1 };
    }
    if (!next) continue;

    try {
      await sendSeriesEmail(next.email, s.email, s.first_name);
      await supabase
        .from("email_subscribers")
        .update({ [next.field]: next.count, last_error: null })
        .eq("id", s.id);
      sent++;
    } catch (err) {
      failed++;
      await supabase.from("email_subscribers").update({ last_error: String(err).slice(0, 500) }).eq("id", s.id);
    }
    // Stay under Resend's rate limit.
    await new Promise((r) => setTimeout(r, 600));
  }

  return NextResponse.json({ checked: subscribers.length, sent, failed });
}
