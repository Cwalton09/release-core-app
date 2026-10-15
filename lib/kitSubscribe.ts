// Signs someone up to the Kit form straight from their browser. Kit's bot
// check quarantines sign-ups sent from our server, so this runs client-side.
// Subscribers who join this form get the welcome series (Kit rule).
const KIT_FORM_ID = "10020749";

// Kit tags for each quiz result. Each tag starts that pattern's follow-up emails.
const QUIZ_TAG_IDS: Record<string, string> = {
  guard: "24664573",
  peacekeeper: "24664574",
  holder: "24664575",
  shutdown: "24664576",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type KitResult =
  | { status: "done" }
  // Kit wants a quick "I'm not a robot" check; the sign-up finishes on that page.
  | { status: "verify"; url: string }
  | { status: "error"; error: string };

export async function kitSubscribe({
  email,
  firstName,
  quizPattern,
}: {
  email: string;
  firstName?: string;
  quizPattern?: string;
}): Promise<KitResult> {
  const address = email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(address) || address.length > 254) {
    return { status: "error", error: "Please enter a valid email address." };
  }

  const form = new URLSearchParams({ email_address: address });
  const name = firstName?.trim().slice(0, 100);
  if (name) form.set("fields[first_name]", name);
  const tag = quizPattern ? QUIZ_TAG_IDS[quizPattern] : undefined;
  if (tag) form.append("tags[]", tag);

  try {
    const res = await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: form.toString(),
    });
    // Kit answers 200 even when it rejects a sign-up; the real result is in `status`.
    const result: { status?: string; url?: string; errors?: { messages?: string[] } } = await res
      .json()
      .catch(() => ({}));
    if (result.status === "success") return { status: "done" };
    if (result.status === "quarantined" && result.url) return { status: "verify", url: result.url };
    const message = result.errors?.messages?.[0];
    return { status: "error", error: message ? `${message}.` : "Something went wrong. Please try again." };
  } catch {
    return { status: "error", error: "Something went wrong. Please try again." };
  }
}
