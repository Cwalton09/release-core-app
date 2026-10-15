"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";

type Lead = { email: string; name: string; createdAt: string };
type Result = { leads: Lead[]; skippedAsCustomers: number };

// Private tool: people who made an account but never started a membership,
// with a CSV download for importing them into Resend. Read only.
export default function UnpaidSignups() {
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

  async function load() {
    setBusy(true);
    setError("");
    const res = await memberFetch("/api/admin/unpaid-signups");
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setResult(data);
  }

  function downloadCsv() {
    if (!result) return;
    const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = result.leads.map((l) => [l.email, l.name.split(" ")[0] ?? ""].map(cell).join(","));
    const csv = ["email,first_name", ...rows].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "unpaid-signups.csv";
    link.click();
  }

  if (!ready) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Signed up, never paid</h1>
      <p className="mt-2 text-slate-600">
        People who created an account but didn&apos;t finish checkout. Anyone who is paying, ever
        had a membership, or shows up as a customer in Stripe is left out, so this list is safe to
        email. Nothing here changes anyone&apos;s account.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={load}
          disabled={busy}
          className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 disabled:opacity-50"
        >
          {busy ? "Checking Stripe…" : result ? "Refresh" : "Show the list"}
        </button>
        {result && result.leads.length > 0 && (
          <button
            onClick={downloadCsv}
            className="rounded-full bg-emerald-700 px-5 py-2.5 font-medium text-white"
          >
            Download CSV for Resend
          </button>
        )}
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <p className="text-slate-700">
            {result.leads.length} people signed up but never paid.
            {result.skippedAsCustomers > 0 &&
              ` ${result.skippedAsCustomers} more were left out because Stripe has them as customers.`}
          </p>
          {result.leads.length > 0 && (
            <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 text-sm">
              {result.leads.map((l) => (
                <li key={l.email} className="flex flex-wrap justify-between gap-2 p-4">
                  <span className="min-w-0 break-all">
                    <span className="font-medium text-slate-900">{l.email}</span>
                    {l.name && <span className="text-slate-500"> · {l.name}</span>}
                  </span>
                  <span className="text-slate-500">
                    {new Date(l.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
