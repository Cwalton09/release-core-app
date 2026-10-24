"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";
import { CAMPAIGNS, type CampaignId } from "@/lib/campaigns";

type Recipient = { email: string; firstName: string };
type State = {
  recipients?: Recipient[];
  confirming?: boolean;
  busy?: string;
  result?: string;
  error?: string;
};

// Private tool: preview who gets each one-time email, then send it. Sending asks
// for a second click, and the server never emails the same person twice.
export default function CampaignsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<Record<string, State>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  const update = (id: CampaignId, patch: State) => setState((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  async function preview(id: CampaignId) {
    update(id, { busy: "Checking Stripe…", error: undefined, result: undefined, confirming: false });
    const res = await memberFetch(`/api/admin/campaign?campaign=${id}`);
    const data = await res.json();
    update(id, res.ok ? { recipients: data.recipients, busy: undefined } : { error: data.error ?? "Something went wrong.", busy: undefined });
  }

  async function send(id: CampaignId) {
    update(id, { busy: "Sending… this takes about a minute.", confirming: false });
    const res = await memberFetch("/api/admin/campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign: id }),
    });
    const data = await res.json();
    if (!res.ok) return update(id, { error: data.error ?? "Something went wrong.", busy: undefined });
    update(id, {
      busy: undefined,
      result: `Sent to ${data.sent} people.${data.failed.length ? ` Didn't send to: ${data.failed.join(", ")}` : ""}`,
    });
  }

  if (!ready) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">One-time emails</h1>
        <p className="mt-2 text-slate-600">
          Each person gets their own email with their first name, from chelsea@release-core.com.
          Replies go to releasecoremethod@gmail.com.
        </p>
      </div>

      {(Object.keys(CAMPAIGNS) as CampaignId[]).map((id) => {
        const s = state[id] ?? {};
        const c = CAMPAIGNS[id];
        return (
          <section key={id} className="rounded-2xl border border-slate-200 p-5 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{c.label}</h2>
              <p className="text-sm text-slate-500">Subject: {c.email.subject}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                id={`preview-${id}`}
                onClick={() => preview(id)}
                disabled={Boolean(s.busy)}
                className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
              >
                {s.recipients ? "Refresh list" : "Show who gets it"}
              </button>
              {s.recipients && s.recipients.length > 0 && !s.result && (
                s.confirming ? (
                  <>
                    <button id={`confirm-${id}`} onClick={() => send(id)} disabled={Boolean(s.busy)} className="rounded-full bg-emerald-700 px-5 py-2.5 font-medium text-white disabled:opacity-50">
                      Yes, send to {s.recipients.length} people
                    </button>
                    <button onClick={() => update(id, { confirming: false })} className="rounded-full px-4 py-2.5 text-slate-600 underline">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button id={`send-${id}`} onClick={() => update(id, { confirming: true })} disabled={Boolean(s.busy)} className="rounded-full bg-emerald-700 px-5 py-2.5 font-medium text-white disabled:opacity-50">
                    Send to {s.recipients.length} people
                  </button>
                )
              )}
            </div>
            {s.busy && <p className="text-slate-600">{s.busy}</p>}
            {s.result && <p className="rounded-xl bg-emerald-50 p-4 text-emerald-800">{s.result}</p>}
            {s.error && <p className="rounded-xl bg-red-50 p-4 text-red-700">{s.error}</p>}
            {s.recipients && (
              <details className="text-sm text-slate-700">
                <summary className="cursor-pointer">{s.recipients.length} people</summary>
                <ul className="mt-2 space-y-1">
                  {s.recipients.map((r) => (
                    <li key={r.email} className="break-all">{r.firstName || "(no first name)"} · {r.email}</li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        );
      })}
    </main>
  );
}
