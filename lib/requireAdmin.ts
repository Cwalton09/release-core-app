import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Only these accounts can use the admin tools (e.g. /admin/email).
const ADMIN_EMAILS = new Set(["chelseadwalton@gmail.com", "releasecoremethod@gmail.com"]);

// Returns the admin's email when the request carries a valid token for an admin
// account, or a response to send back when access is denied.
export async function requireAdmin(
  req: NextRequest
): Promise<{ email: string } | NextResponse> {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return NextResponse.json({ error: "Please log in to continue." }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  const email = user?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.has(email)) {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }
  return { email };
}
