// Free-guide and quiz sign-ups. The server saves the person, sends the guide
// email through Resend, and the rest of the emails follow automatically.
export async function emailSignup(body: {
  email: string;
  firstName?: string;
  website?: string;
  source?: string;
  quizPattern?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
