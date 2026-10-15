"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { memberFetch } from "@/lib/memberFetch";

type Row = {
  email: string;
  firstName: string | null;
  source: string | null;
  quizPattern: string | null;
  createdAt: string;
  welcomeSent: number;
  quizSent: number;
  unsubscribed: boolean;
  lastError: string | null;
};
type Data = { resendConfigured: boolean; tableReady: boolean; tableError: string | null; subscribers: Row[] };

const PATTERN_NAMES: Record<string, string> = {
  guard: "The Guard",
  peacekeeper: "The Peacekeeper",
  holder: "The Holder",
  shutdown: "The Shutdown",
};

// Private page: free-guide and quiz sign-ups and how far along their emails are.
export default function EmailSeriesAdmin() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }
      const res = await memberFetch("/api/admin/email-series");
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Something went wrong.");
      else setData(json);
    });
  }, [router]);

  if (error) return <p className="p-6 text-center text-red-700">{error}</p>;
  if (!data) return <p className="p-6 text-center text-slate-500">Loading...</p>;

  const active = data.subscribers.filter((s) => !s.unsubscribed);
  const quiz = active.filter((s) => s.quizPattern);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Email sign-ups</h1>
      <p className="mt-2 text-slate-600">
        Everyone who signed up for the free guide or took the quiz. The welcome emails (7) and quiz
        emails (3) go out automatically through Resend.
      </p>

      {!data.resendConfigured && (
        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-800">
          Emails can&apos;t send yet: RESEND_API_KEY isn&apos;t set in Vercel.
        </p>
      )}
      {!data.tableReady && (
        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-800">
          The sign-up table isn&apos;t set up yet ({data.tableError}).
        </p>
      )}

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-calm-50 p-4">
          <p className="text-2xl font-semibold text-slate-900">{active.length}</p>
          <p className="text-sm text-slate-600">Subscribed</p>
        </div>
        <div className="rounded-xl bg-calm-50 p-4">
          <p className="text-2xl font-semibold text-slate-900">{quiz.length}</p>
          <p className="text-sm text-slate-600">Took the quiz</p>
        </div>
        <div className="rounded-xl bg-calm-50 p-4">
          <p className="text-2xl font-semibold text-slate-900">
            {data.subscribers.length - active.length}
          </p>
          <p className="text-sm text-slate-600">Unsubscribed</p>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 text-sm">
        {data.subscribers.map((s) => (
          <li key={s.email} className="p-4">
            <p className="break-all font-medium text-slate-900">
              {s.email}
              {s.firstName && <span className="font-normal text-slate-500"> · {s.firstName}</span>}
            </p>
            <p className="text-slate-600">
              {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              {" · "}Welcome emails {s.welcomeSent}/7
              {s.quizPattern && ` · ${PATTERN_NAMES[s.quizPattern]} emails ${s.quizSent}/3`}
              {s.unsubscribed && " · Unsubscribed"}
            </p>
            {s.lastError && <p className="text-red-600">Last send failed: {s.lastError}</p>}
          </li>
        ))}
        {data.subscribers.length === 0 && <li className="p-4 text-slate-500">No sign-ups yet.</li>}
      </ul>
    </main>
  );
}
