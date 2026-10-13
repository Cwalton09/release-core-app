import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { isValidUnsubscribe } from "@/lib/emailUnsubscribe";

// Turns off marketing emails for one account. GET is the link in the email;
// POST is the one-click unsubscribe that Gmail and Apple Mail send.
async function unsubscribe(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("u") ?? "";
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!userId || !token || !isValidUnsubscribe(userId, token)) return false;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
  const { data } = await supabase.auth.admin.getUserById(userId);
  if (!data.user) return false;
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { ...(data.user.user_metadata ?? {}), email_opt_out: true },
  });
  return !error;
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
      ? "You're unsubscribed. You won't get any more emails like this from Release Core."
      : "That unsubscribe link didn't work. Reply to any email and we'll remove you by hand."
  );
}

export async function POST(req: NextRequest) {
  const ok = await unsubscribe(req);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
