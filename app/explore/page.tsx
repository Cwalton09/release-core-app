"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

export default function ExplorePage() {
  const router = useRouter();

  return (
    <AppShell title="What would you like to explore?">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          You can start with a symptom or experience you already notice, or let
          your body lead you to the most important issue ready to be explored.
        </p>

        <div className="grid gap-4">
          <button
            type="button"
            onClick={() => router.push("/body-awareness")}
            className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-emerald-300 hover:shadow"
          >
            <div className="text-lg font-semibold text-slate-900">
              Start with a symptom
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Describe what you are noticing in your body, emotions, or life
              right now.
            </p>
          </button>

          <button
            type="button"
            onClick={() => router.push("/body-awareness")}
            className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-emerald-300 hover:shadow"
          >
            <div className="text-lg font-semibold text-slate-900">
              Let my body lead
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Allow your body to show you the most important issue ready to come
              forward.
            </p>
          </button>
        </div>
      </div>
    </AppShell>
  );
}