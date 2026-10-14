"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";

type Change = { userId: string; email: string; reason: string };
type Result = {
  checked: number;
  stillActive: number;
  changes: Change[];
  updated?: number;
};

// Private tool: finds members still marked paid who show no active payment in
// Stripe. Nothing changes until the admin ticks people and confirms.
export default function BillingSync() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  function toggle(userId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  }

  async function preview() {
    setBusy(true);
    setError("");
    setSelected(new Set());
    const res = await memberFetch("/api/admin/billing-sync");
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setResult(data);
  }

  async function apply() {
    const ok = window.confirm(
      `Turn off access for the ${selected.size} people you ticked? Everyone else stays as they are.`
    );
    if (!ok) return;
    setBusy(true);
    setError("");
    const res = await memberFetch("/api/admin/billing-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds: [...selected] }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setResult(data);
    setSelected(new Set());
  }

  if (!ready) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  const applied = result?.updated !== undefined;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Membership check</h1>
      <p className="mt-2 text-slate-600">
        Lists members marked as paid who show no active subscription and no payment in the last
        35 days in Stripe. Check each person in Stripe, tick only the ones who really cancelled,
        then turn off their access. Your own account is always skipped.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={preview}
          disabled={busy}
          className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
        >
          {busy ? "Checking Stripe…" : applied ? "Check again" : "Preview"}
        </button>
        {result && !applied && result.changes.length > 0 && (
          <button
            onClick={apply}
            disabled={busy || selected.size === 0}
            className="rounded-full bg-red-600 px-5 py-2.5 font-medium text-white disabled:opacity-40"
          >
            Turn off access for {selected.size} ticked
          </button>
        )}
      </div>
      {result && !applied && result.changes.length > 0 && selected.size === 0 && (
        <p className="mt-2 text-sm text-slate-500">
          Tap a person below to tick them. The red button turns on once someone is ticked.
        </p>
      )}

      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <p className="text-slate-700">
            Checked {result.checked} paid members. {result.stillActive} are still paying.{" "}
            {applied
              ? `Turned off access for ${result.updated}.`
              : `${result.changes.length} show no active payment.`}
          </p>
          {!applied && result.changes.length > 0 && (
            <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
              {result.changes.map((c) => (
                <li key={c.userId} className="text-sm">
                  <label
                    className={`flex cursor-pointer items-start gap-3 p-4 ${
                      selected.has(c.userId) ? "bg-red-50" : "hover:bg-slate-50"
                    }`}
                  >
                  <input
                    type="checkbox"
                    checked={selected.has(c.userId)}
                    onChange={() => toggle(c.userId)}
                    className="mt-0.5 h-6 w-6 shrink-0 accent-red-600"
                    aria-label={`Turn off access for ${c.email || c.userId}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="break-all font-medium text-slate-900">{c.email || c.userId}</p>
                    <p className="text-slate-500">{c.reason}</p>
                    {c.email && (
                      <a
                        href={`https://dashboard.stripe.com/search?query=${encodeURIComponent(c.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 underline underline-offset-4"
                      >
                        Look up in Stripe
                      </a>
                    )}
                  </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
