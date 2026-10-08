import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Server-side gate for routes that spend AI credits: the caller must send a
// valid Supabase access token for a member whose profile is paid.
// Returns a response to send back when access is denied, or null when allowed.
export async function requirePaidMember(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = req.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json(
      { error: "Please log in to continue." },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  if (!user) {
    return NextResponse.json(
      { error: "Your login has expired. Please log in again." },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("paid")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.paid) {
    return NextResponse.json(
      { error: "An active membership is required." },
      { status: 403 }
    );
  }

  return null;
}
