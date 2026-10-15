import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { serviceClient, type Subscriber } from "@/lib/emailSeries/db";
import { resendConfigured } from "@/lib/emailSeries/send";

// Read-only overview of free-guide and quiz sign-ups for /admin/email-series.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await serviceClient()
    .from("email_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Subscriber[]>();

  return NextResponse.json({
    resendConfigured: resendConfigured(),
    tableReady: !error,
    tableError: error?.message ?? null,
    subscribers: (data ?? []).map((s) => ({
      email: s.email,
      firstName: s.first_name,
      source: s.source,
      quizPattern: s.quiz_pattern,
      createdAt: s.created_at,
      welcomeSent: s.welcome_sent,
      quizSent: s.quiz_sent,
      unsubscribed: Boolean(s.unsubscribed_at),
      lastError: s.last_error,
    })),
  });
}
