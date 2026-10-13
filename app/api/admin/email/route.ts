import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import {
  CAMPAIGN_FROM,
  CAMPAIGN_ID,
  CAMPAIGN_REPLY_TO,
  MAILING_ADDRESS,
  buildCampaignEmail,
  type Recipient,
} from "@/lib/campaignEmail";
import { unsubscribeUrl } from "@/lib/emailUnsubscribe";

export const maxDuration = 300;

// Resend accepts up to 100 emails per batch request.
const BATCH_SIZE = 100;

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function allUsers(supabase: SupabaseClient) {
  const users: User[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    users.push(...data.users);
    if (data.users.length < 1000) return users;
  }
}

// Everyone with a confirmed email who isn't a paying member, hasn't unsubscribed,
// and hasn't already received this campaign.
async function audience(supabase: SupabaseClient) {
  const users = await allUsers(supabase);
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_id, paid, display_name");
  if (error) throw error;
  const byUser = new Map(profiles.map((p) => [p.user_id as string, p]));

  let paid = 0;
  let unsubscribed = 0;
  let alreadySent = 0;
  const recipients: Recipient[] = [];

  for (const user of users) {
    if (!user.email) continue;
    const profile = byUser.get(user.id);
    const meta = user.user_metadata ?? {};
    if (profile?.paid) {
      paid++;
      continue;
    }
    if (meta.email_opt_out) {
      unsubscribed++;
      continue;
    }
    if (Array.isArray(meta.campaigns_sent) && meta.campaigns_sent.includes(CAMPAIGN_ID)) {
      alreadySent++;
      continue;
    }
    const name = String(profile?.display_name ?? "").trim().split(/\s+/)[0] ?? "";
    recipients.push({ id: user.id, email: user.email, firstName: name.slice(0, 40) });
  }

  return { total: users.length, paid, unsubscribed, alreadySent, recipients, users };
}

function resendMessage(recipient: Recipient) {
  const unsubscribe = unsubscribeUrl(recipient.id);
  const { subject, html, text } = buildCampaignEmail(recipient, unsubscribe);
  return {
    from: CAMPAIGN_FROM,
    reply_to: CAMPAIGN_REPLY_TO,
    to: [recipient.email],
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${unsubscribe}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

async function sendBatch(messages: ReturnType<typeof resendMessage>[]) {
  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

// Counts for the admin page.
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const { total, paid, unsubscribed, alreadySent, recipients } = await audience(adminClient());
  return NextResponse.json({
    total,
    paid,
    unsubscribed,
    alreadySent,
    toSend: recipients.length,
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    addressSet: Boolean(MAILING_ADDRESS),
  });
}

// { mode: "test" } emails the admin a copy; { mode: "send" } emails the audience.
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Add RESEND_API_KEY in Vercel, then redeploy." },
      { status: 400 }
    );
  }

  const { mode } = await req.json().catch(() => ({ mode: "" }));
  const supabase = adminClient();

  if (mode === "test") {
    const { users } = await audience(supabase);
    const me = users.find((u) => u.email?.toLowerCase() === admin.email);
    const recipient: Recipient = { id: me?.id ?? "test", email: admin.email, firstName: "Chelsea" };
    try {
      await sendBatch([resendMessage(recipient)]);
    } catch (err) {
      return NextResponse.json({ error: String(err) }, { status: 502 });
    }
    return NextResponse.json({ sent: 1 });
  }

  if (mode !== "send") {
    return NextResponse.json({ error: "Unknown mode." }, { status: 400 });
  }
  if (!MAILING_ADDRESS) {
    return NextResponse.json(
      { error: "Add a mailing address in lib/campaignEmail.ts before sending to everyone." },
      { status: 400 }
    );
  }

  const { recipients, users } = await audience(supabase);
  const usersById = new Map(users.map((u) => [u.id, u]));
  let sent = 0;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    try {
      await sendBatch(batch.map(resendMessage));
    } catch (err) {
      return NextResponse.json({ sent, error: String(err) }, { status: 502 });
    }
    // Record the send so a retry never emails the same person twice.
    await Promise.all(
      batch.map((r) => {
        const meta = usersById.get(r.id)?.user_metadata ?? {};
        const previous = Array.isArray(meta.campaigns_sent) ? meta.campaigns_sent : [];
        return supabase.auth.admin.updateUserById(r.id, {
          user_metadata: { ...meta, campaigns_sent: [...previous, CAMPAIGN_ID] },
        });
      })
    );
    sent += batch.length;
    // Stay under Resend's default limit of 2 requests per second.
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  return NextResponse.json({ sent });
}
