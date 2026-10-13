import { STRIPE_PAYMENT_LINK } from "@/lib/checkout";

// The membership email sent from /admin/email to people who created an account
// but never subscribed. Change CAMPAIGN_ID when the email changes: members who
// already received an id are skipped, so the same email is never sent twice.
export const CAMPAIGN_ID = "membership-2026-10";

export const CAMPAIGN_SUBJECT = "What is your body still holding onto?";
export const CAMPAIGN_PREVIEW = "You signed up for a reason. Here's what a session can show you.";

// Resend only sends from a domain verified in the Resend dashboard.
export const CAMPAIGN_FROM = "Chelsea at Release Core <chelsea@release-core.com>";
export const CAMPAIGN_REPLY_TO = "releasecoremethod@gmail.com";

// US law (CAN-SPAM) requires a physical mailing address in marketing emails.
// Use a PO box or virtual mailbox, not a home address. Bulk sending stays off
// until this is filled in; test emails still work.
export const MAILING_ADDRESS = "";

export type Recipient = { id: string; email: string; firstName: string };

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function checkoutUrl(recipient: Recipient) {
  const url = new URL(STRIPE_PAYMENT_LINK);
  url.searchParams.set("client_reference_id", recipient.id);
  url.searchParams.set("prefilled_email", recipient.email);
  return url.toString();
}

const PARAGRAPHS = [
  "At some point you created a Release Core account, because something wasn't sitting right. Maybe it was anxiety that shows up out of nowhere, a pattern you keep repeating, or a body that never fully relaxes.",
  "Most of the time, we don't know the real reason for what's driving it. That's why talking it through, or trying to think your way out of it, doesn't always change how you feel. Your body is still running something it learned a long time ago.",
  "That's what a Release Core session is for. First, you ask your nervous system whether there's an emotional connection to what you're feeling. If there is, your body leads you directly to it: the age it started, what was happening, and what your body learned. Then you rewire it, with questions your body can actually say yes to.",
];

const INCLUDED = [
  "Guided deep sessions you can do anytime, at your own pace",
  "Your nighttime script and session summary to download after every session",
  "A faith-based or non-faith option, whichever fits you",
  "Grounding scripts, quick relief, and the dream interpreter",
];

export function buildCampaignEmail(recipient: Recipient, unsubscribeUrl: string) {
  const greeting = recipient.firstName ? `Hi ${recipient.firstName},` : "Hi there,";
  const cta = checkoutUrl(recipient);

  const text = [
    greeting,
    ...PARAGRAPHS,
    "With a membership you get:",
    ...INCLUDED.map((item) => `- ${item}`),
    `Start your membership: ${cta}`,
    "You don't have to dig through years of your life on your own. Your body already knows where it started.",
    "Warmly,\nChelsea Walton\nFounder, Release Core",
    "---",
    "You're receiving this because you created an account at release-core.com.",
    `Unsubscribe: ${unsubscribeUrl}`,
    MAILING_ADDRESS,
  ]
    .filter(Boolean)
    .join("\n\n");

  const p = (content: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1e293b;">${content}</p>`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f8fafc;">
<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(CAMPAIGN_PREVIEW)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:32px 28px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
<tr><td>
${p(escapeHtml(greeting))}
${PARAGRAPHS.map((para) => p(escapeHtml(para))).join("\n")}
${p("<strong>With a membership you get:</strong>")}
<ul style="margin:0 0 24px;padding-left:20px;font-size:16px;line-height:1.6;color:#1e293b;">
${INCLUDED.map((item) => `<li style="margin-bottom:6px;">${escapeHtml(item)}</li>`).join("\n")}
</ul>
<p style="margin:0 0 24px;text-align:center;">
<a href="${escapeHtml(cta)}" style="display:inline-block;background:#059669;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:999px;">Start your membership</a>
</p>
${p("You don't have to dig through years of your life on your own. Your body already knows where it started.")}
${p("Warmly,<br>Chelsea Walton<br>Founder, Release Core")}
<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px;">
<p style="margin:0;font-size:12px;line-height:1.5;color:#64748b;">
You're receiving this because you created an account at release-core.com.
<a href="${escapeHtml(unsubscribeUrl)}" style="color:#64748b;">Unsubscribe</a>
${MAILING_ADDRESS ? `<br>${escapeHtml(MAILING_ADDRESS)}` : ""}
</p>
</td></tr></table>
</td></tr></table>
</body></html>`;

  return { subject: CAMPAIGN_SUBJECT, html, text };
}
