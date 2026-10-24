"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";
import type { MemberActivity as Member } from "@/app/api/admin/member-activity/route";

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

// How many saved sessions each group averaged, and how many never saved one.
function summarize(list: Member[]) {
  const zero = list.filter((m) => m.sessions === 0).length;
  const avg = list.length ? list.reduce((n, m) => n + m.sessions, 0) / list.length : 0;
  return { count: list.length, zero, avg };
}

// Private tool: every membership with its saved-session count, to see whether
// people who cancel were using Release Core. Read only.
export default function MemberActivityPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [members, setMembers] = useState<Member[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  async function load() {
    setBusy(true);
    setError("");
    const res = await memberFetch("/api/admin/member-activity");
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setMembers(data.members);
  }

  if (!ready) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  const active = members?.filter((m) => m.status === "active" || m.status === "trialing") ?? [];
  const left = members?.filter((m) => m.status === "canceled") ?? [];
  const groups = [
    { label: "Still members", ...summarize(active) },
    { label: "Canceled", ...summarize(left) },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Member activity</h1>
      <p className="mt-2 text-slate-600">
        Every membership from Stripe, with how many sessions that person saved. A session counts
        when it reaches the session summary page. Guided deep sessions aren&apos;t saved there, so
        they show in &ldquo;Last deep session&rdquo; instead, tracked from Oct 24, 2026 on. Nothing
        here changes anyone&apos;s account.
      </p>

      <button
        onClick={load}
        disabled={busy}
        className="mt-6 rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
      >
        {busy ? "Checking Stripe…" : members ? "Refresh" : "Show activity"}
      </button>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      {members && (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.label} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">{g.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{g.count}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {g.avg.toFixed(1)} sessions on average · {g.zero} never saved a session
                </p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3 font-medium">Member</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Joined</th>
                  <th className="p-3 font-medium">Canceled</th>
                  <th className="p-3 font-medium">Sessions</th>
                  <th className="p-3 font-medium">Last session</th>
                  <th className="p-3 font-medium">Last deep session</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {members.map((m) => (
                  <tr key={m.email + m.joined}>
                    <td className="p-3">
                      <span className="font-medium text-slate-900">{m.name || m.email}</span>
                      {m.reason && <span className="block text-xs text-slate-500">Reason: {m.reason.replace(/_/g, " ")}</span>}
                    </td>
                    <td className="p-3">{m.status}</td>
                    <td className="p-3 whitespace-nowrap">{date(m.joined)}</td>
                    <td className="p-3 whitespace-nowrap">{date(m.canceled)}</td>
                    <td className="p-3 tabular-nums">{m.sessions}</td>
                    <td className="p-3 whitespace-nowrap">{date(m.lastSession)}</td>
                    <td className="p-3 whitespace-nowrap">{date(m.lastActive)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
