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

// Private tool: finds members still marked paid who no longer have an active
// Stripe subscription, and turns off their access.
export default function BillingSync() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/login");
      else setReady(true);
    });
  }, [router]);

  async function run(apply: boolean) {
    if (apply && result) {
      const ok = window.confirm(
        `Turn off access for ${result.changes.length} people with no active subscription?`
      );
      if (!ok) return;
    }
    setBusy(true);
    setError("");
    const res = await memberFetch("/api/admin/billing-sync", { method: apply ? "POST" : "GET" });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setResult(data);
  }

  if (!ready) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Membership check</h1>
      <p className="mt-2 text-slate-600">
        Checks every member marked as paid against Stripe. Anyone without an active subscription
        loses access. Your own account is always skipped.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => run(false)}
          disabled={busy}
          className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
        >
          {busy ? "Checking Stripe…" : "Preview"}
        </button>
        {result && result.updated === undefined && result.changes.length > 0 && (
          <button
            onClick={() => run(true)}
            disabled={busy}
            className="rounded-full bg-red-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
          >
            Turn off access for {result.changes.length}
          </button>
        )}
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <p className="text-slate-700">
            Checked {result.checked} paid members. {result.stillActive} have an active
            subscription.{" "}
            {result.updated !== undefined
              ? `Turned off access for ${result.updated}.`
              : `${result.changes.length} would lose access.`}
          </p>
          {result.changes.length > 0 && (
            <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
              {result.changes.map((c) => (
                <li key={c.userId} className="p-3 text-sm">
                  <p className="font-medium text-slate-900">{c.email || c.userId}</p>
                  <p className="text-slate-500">{c.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
