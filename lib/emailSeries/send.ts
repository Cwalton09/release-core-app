import { createHmac, timingSafeEqual } from "crypto";
import type { Block, SeriesEmail } from "./types";

// Resend only sends from a domain verified in the Resend dashboard.
const FROM = "Chelsea at Release Core <chelsea@release-core.com>";
const REPLY_TO = "releasecoremethod@gmail.com";

export const resendConfigured = () => Boolean(process.env.RESEND_API_KEY);

// Signed unsubscribe links, so a link only works for the address it was sent to.
// The service role key already lives only on the server, so it doubles as the secret.
function sign(email: string) {
  return createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY!)
    .update(`unsubscribe-email:${email}`)
    .digest("base64url");
}

export function unsubscribeUrl(email: string) {
  const url = new URL("https://release-core.com/api/email/unsubscribe");
  url.searchParams.set("e", email);
  url.searchParams.set("t", sign(email));
  return url.toString();
}

export function isValidUnsubscribe(email: string, token: string) {
  const expected = Buffer.from(sign(email));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const P = "margin:0 0 16px;";
const A = 'style="color:#047857;text-decoration:underline"';

function renderBlock(block: Block) {
  if (typeof block === "string") return `<p style="${P}">${block}</p>`;
  if ("button" in block) {
    const [label, href] = block.button;
    return `<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:8px auto 24px"><tr><td style="background-color:#047857;border-radius:10px"><a style="display:inline-block;padding:16px 32px;color:#ffffff;font-size:18px;font-weight:bold;text-decoration:none" href="${href}">${label}</a></td></tr></table>`;
  }
  if ("center" in block) return `<p style="${P}text-align:center">${block.center}</p>`;
  return `<p style="${P}font-size:12px;line-height:18px;color:#64748b">${block.small}</p>`;
}

function blockText(block: Block) {
  if (typeof block === "string") return block;
  if ("button" in block) return `${block.button[0]}: ${block.button[1]}`;
  return "center" in block ? block.center : block.small;
}

// Turns simple HTML into readable plain text, keeping link addresses.
function toText(html: string) {
  return html
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

export function buildEmail(email: SeriesEmail, firstName: string | null, to: string) {
  const name = escapeHtml(firstName?.trim() || "friend");
  const blocks = email.blocks.map((b) =>
    typeof b === "string" ? b.replace("{{name}}", name) : b
  );
  const unsub = unsubscribeUrl(to);
  const body = blocks
    .map(renderBlock)
    .join("")
    .replace(/<a href=/g, `<a ${A} href=`);

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff">
<div style="display:none;max-height:0;overflow:hidden">${escapeHtml(email.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#1f2a2e">
<tr><td style="padding:24px">${body}
<p style="margin:24px 0 0;font-size:12px;line-height:18px;color:#64748b">You're getting this because you signed up at release-core.com. <a href="${unsub}" style="color:#64748b">Unsubscribe</a></p>
</td></tr></table></td></tr></table></body></html>`;

  const text = [
    ...blocks.map((b) => toText(blockText(b))),
    "",
    `Unsubscribe: ${unsub}`,
  ].join("\n\n");

  return { html, text, unsub };
}

// idempotencyKey makes Resend drop a repeat of the same send (one-time campaigns).
export async function sendSeriesEmail(email: SeriesEmail, to: string, firstName: string | null, idempotencyKey?: string) {
  const { html, text, unsub } = buildEmail(email, firstName, to);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: REPLY_TO,
      subject: email.subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<${unsub}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

// Adds or updates the person in Resend contacts so they show up for broadcasts.
// Best effort: a failure here never blocks the sign-up.
export async function upsertResendContact(email: string, firstName: string | null, unsubscribed = false) {
  const headers = {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({ email, first_name: firstName ?? undefined, unsubscribed }),
    });
    if (res.ok) return;
    // Already a contact: update it instead.
    await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ unsubscribed, ...(firstName ? { first_name: firstName } : {}) }),
    });
  } catch (err) {
    console.error("Resend contact update failed:", err);
  }
}
