import { NextResponse } from "next/server";

// Kit form that collects free-guide sign-ups ("Newsletter site" form in Kit).
// Kit's public form endpoint needs no API key; subscribers who join this form
// get the welcome series once the form is connected to it in Kit.
const KIT_FORM_ID = "10020749";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; firstName?: string; website?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  const firstName = (body.firstName ?? "").trim().slice(0, 100);
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const form = new URLSearchParams({ email_address: email });
  if (firstName) form.set("fields[first_name]", firstName);
  if (body.source) form.set("referrer", `https://release-core.com${body.source}`);

  try {
    const res = await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: form.toString(),
    });
    if (!res.ok) {
      console.error("Kit subscribe failed:", res.status, await res.text());
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("Kit subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
