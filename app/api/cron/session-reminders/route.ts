import { NextRequest, NextResponse } from "next/server";
import { serviceClient } from "@/lib/emailSeries/db";
import { resendConfigured } from "@/lib/emailSeries/send";
import { DAY_CODES, formatTime } from "@/lib/sessionSchedule";

export const maxDuration = 300;

type ScheduledProfile = {
  user_id: string;
  display_name: string | null;
  session_days: string;
  session_time: string;
  session_tz: string | null;
  session_reminder_sent_on: string | null;
};

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Today's date and weekday code in the member's own time zone.
function todayIn(tz: string) {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(now);
  const code = DAY_CODES[["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday)];
  return { date, code };
}

function reminderEmail(name: string, time: string) {
  const when = formatTime(time);
  const first = escapeHtml(name.split(" ")[0] || "friend");
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff">
<div style="display:none;max-height:0;overflow:hidden">Your time to check in with your body.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#1f2a2e">
<tr><td style="padding:24px">
<p style="margin:0 0 16px">Hi ${first},</p>
<p style="margin:0 0 16px">Your Release Core session is today at <strong>${when}</strong>.</p>
<p style="margin:0 0 16px">Treat it like you booked it with me. Find a quiet spot, take a breath, and let your body show you what it's ready to let go of.</p>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:8px auto 24px"><tr><td style="background-color:#047857;border-radius:10px"><a style="display:inline-block;padding:16px 32px;color:#ffffff;font-size:18px;font-weight:bold;text-decoration:none" href="https://release-core.com/dashboard">Start my session</a></td></tr></table>
<p style="margin:0 0 16px">See you there,<br>Chelsea</p>
<p style="margin:24px 0 0;font-size:12px;line-height:18px;color:#64748b">You're getting this because you set a session time on your Release Core dashboard. To change it or turn reminders off, go to <a href="https://release-core.com/dashboard" style="color:#64748b">your dashboard</a>.</p>
</td></tr></table></td></tr></table></body></html>`;
  const text = `Hi ${name.split(" ")[0] || "friend"},\n\nYour Release Core session is today at ${when}.\n\nTreat it like you booked it with me. Find a quiet spot, take a breath, and let your body show you what it's ready to let go of.\n\nStart my session: https://release-core.com/dashboard\n\nSee you there,\nChelsea\n\nTo change your session time or turn reminders off, go to https://release-core.com/dashboard`;
  return { subject: `Your Release Core session is today at ${when}`, html, text };
}

// Runs once a day (vercel.json), in the morning US time. Emails each paying member
// whose chosen session days include today, once per day.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }
  if (!resendConfigured()) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set." }, { status: 500 });
  }

  const supabase = serviceClient();
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_id, display_name, session_days, session_time, session_tz, session_reminder_sent_on")
    .eq("paid", true)
    .eq("session_reminders", true)
    .not("session_days", "is", null)
    .returns<ScheduledProfile[]>();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let sent = 0;
  let failed = 0;
  for (const p of profiles) {
    const { date, code } = todayIn(p.session_tz || "America/Chicago");
    if (!p.session_days.split(",").includes(code) || p.session_reminder_sent_on === date) continue;

    const { data: userData } = await supabase.auth.admin.getUserById(p.user_id);
    const to = userData.user?.email;
    if (!to) continue;

    const email = reminderEmail(p.display_name ?? "", p.session_time);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Chelsea at Release Core <chelsea@release-core.com>",
        to: [to],
        reply_to: "releasecoremethod@gmail.com",
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
    });
    if (!res.ok) {
      failed++;
      console.error("Session reminder failed:", res.status, (await res.text()).slice(0, 300));
      continue;
    }
    sent++;
    await supabase.from("profiles").update({ session_reminder_sent_on: date }).eq("user_id", p.user_id);
  }

  return NextResponse.json({ sent, failed });
}
