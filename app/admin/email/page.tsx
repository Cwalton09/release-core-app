"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";
import { CAMPAIGN_SUBJECT, buildCampaignEmail } from "@/lib/campaignEmail";

type Stats = {
  total: number;
  paid: number;
  unsubscribed: number;
  alreadySent: number;
  toSend: number;
  resendConfigured: boolean;
  addressSet: boolean;
};

const preview = buildCampaignEmail(
  { id: "preview", email: "preview@example.com", firstName: "Sarah" },
  "#"
);

export default function AdminEmail() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadStats() {
    const res = await memberFetch("/api/admin/email");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Couldn't load the list.");
      return;
    }
    setStats(data);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else loadStats();
    });
  }, [router]);

  async function send(mode: "test" | "send") {
    if (mode === "send" && stats) {
      const ok = window.confirm(
        `Send "${CAMPAIGN_SUBJECT}" to ${stats.toSend} people now? This can't be undone.`
      );
      if (!ok) return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    const res = await memberFetch("/api/admin/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(
        data.sent ? `Sent ${data.sent}, then stopped: ${data.error}` : data.error ?? "Send failed."
      );
    } else {
      setNotice(mode === "test" ? "Test sent. Check your inbox." : `Sent to ${data.sent} people.`);
    }
    loadStats();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Membership email</h1>
      <p className="mt-2 text-slate-600">
        Goes to everyone who created an account but doesn&apos;t have a membership. Each person
        gets it once, and anyone who unsubscribes is skipped.
      </p>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      {notice && <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-800">{notice}</p>}

      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Accounts", stats.total],
            ["Members", stats.paid],
            ["Will get it", stats.toSend],
            ["Already sent / unsubscribed", stats.alreadySent + stats.unsubscribed],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 p-4">
              <p className="text-2xl font-semibold text-slate-900">{value}</p>
              <p className="text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      )}

      {stats && !stats.resendConfigured && (
        <p className="mt-4 text-amber-700">Resend isn&apos;t connected yet (RESEND_API_KEY is missing in Vercel).</p>
      )}
      {stats && !stats.addressSet && (
        <p className="mt-2 text-amber-700">
          Add a mailing address before sending to everyone. Test emails work without it.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => send("test")}
          disabled={busy || !stats?.resendConfigured}
          className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
        >
          Send me a test
        </button>
        <button
          onClick={() => send("send")}
          disabled={busy || !stats?.resendConfigured || !stats?.addressSet || !stats?.toSend}
          className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
        >
          {busy ? "Sending…" : `Send to ${stats?.toSend ?? 0} people`}
        </button>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Preview</h2>
      <p className="text-sm text-slate-600">Subject: {preview.subject}</p>
      <iframe
        title="Email preview"
        srcDoc={preview.html}
        className="mt-3 h-[900px] w-full rounded-xl border border-slate-200"
      />
    </main>
  );
}
