import { NextResponse } from "next/server";
import { QUIZ_PATTERNS, serviceClient, type Subscriber } from "@/lib/emailSeries/db";
import { resendConfigured, sendSeriesEmail, upsertResendContact } from "@/lib/emailSeries/send";
import { WELCOME_SERIES } from "@/lib/emailSeries/welcome";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Free-guide and quiz sign-ups. Saves the person, sends the guide email right
// away, and the daily cron (/api/cron/email-series) sends the rest.
export async function POST(req: Request) {
  let body: { email?: string; firstName?: string; website?: string; source?: string; quizPattern?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  const firstName = (body.firstName ?? "").trim().slice(0, 100) || null;
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const quizPattern = QUIZ_PATTERNS.includes(body.quizPattern ?? "") ? body.quizPattern! : null;
  const source = (body.source ?? "").slice(0, 100) || null;

  const supabase = serviceClient();
  const { data: existing, error: readError } = await supabase
    .from("email_subscribers")
    .select("*")
    .eq("email", email)
    .maybeSingle<Subscriber>();
  if (readError) {
    console.error("Subscribe lookup failed:", readError);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  const now = new Date().toISOString();
  let subscriber: Subscriber;
  if (existing) {
    // Signing up again re-subscribes them, and a first quiz result starts the quiz emails.
    const changes: Partial<Subscriber> = { unsubscribed_at: null };
    if (firstName && !existing.first_name) changes.first_name = firstName;
    if (quizPattern && !existing.quiz_pattern) {
      changes.quiz_pattern = quizPattern;
      changes.quiz_started_at = now;
    }
    const { data, error } = await supabase
      .from("email_subscribers")
      .update(changes)
      .eq("id", existing.id)
      .select("*")
      .single<Subscriber>();
    if (error) {
      console.error("Subscribe update failed:", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
    subscriber = data;
  } else {
    const { data, error } = await supabase
      .from("email_subscribers")
      .insert({
        email,
        first_name: firstName,
        source,
        quiz_pattern: quizPattern,
        quiz_started_at: quizPattern ? now : null,
      })
      .select("*")
      .single<Subscriber>();
    if (error) {
      console.error("Subscribe insert failed:", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
    subscriber = data;
  }

  if (resendConfigured()) {
    await upsertResendContact(email, subscriber.first_name);
    // The guide email goes out right away, once per person.
    if (subscriber.welcome_sent === 0) {
      try {
        await sendSeriesEmail(WELCOME_SERIES[0], email, subscriber.first_name);
        await supabase.from("email_subscribers").update({ welcome_sent: 1, last_error: null }).eq("id", subscriber.id);
      } catch (err) {
        // The daily cron retries it.
        console.error("Welcome email failed:", err);
        await supabase.from("email_subscribers").update({ last_error: String(err).slice(0, 500) }).eq("id", subscriber.id);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
