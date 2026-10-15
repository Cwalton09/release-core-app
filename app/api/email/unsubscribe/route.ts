import { NextRequest, NextResponse } from "next/server";
import { serviceClient } from "@/lib/emailSeries/db";
import { isValidUnsubscribe, resendConfigured, upsertResendContact } from "@/lib/emailSeries/send";

// Stops the welcome and quiz emails for one address. GET is the link in the
// email; POST is the one-click unsubscribe that Gmail and Apple Mail send.
async function unsubscribe(req: NextRequest) {
  const email = (req.nextUrl.searchParams.get("e") ?? "").toLowerCase();
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!email || !token || !isValidUnsubscribe(email, token)) return false;

  const { error } = await serviceClient()
    .from("email_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", email);
  if (error) return false;
  if (resendConfigured()) await upsertResendContact(email, null, true);
  return true;
}

function page(message: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Release Core</title></head>
<body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:48px 16px;text-align:center;color:#1e293b;">
<p style="font-size:18px;max-width:420px;margin:0 auto 16px;">${message}</p>
<a href="https://release-core.com" style="color:#059669;">Back to Release Core</a>
</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: NextRequest) {
  const ok = await unsubscribe(req);
  return page(
    ok
      ? "You're unsubscribed. You won't get any more of these emails from Release Core."
      : "That unsubscribe link didn't work. Reply to any email and we'll remove you by hand."
  );
}

export async function POST(req: NextRequest) {
  const ok = await unsubscribe(req);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
