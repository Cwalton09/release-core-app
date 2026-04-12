"use client";

import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

export default function SessionSummaryPage() {
  const searchParams = useSearchParams();
  const selectedCore = searchParams.getAll("core");

  const beliefSentence =
    selectedCore.length > 0
      ? selectedCore.join(", ").toLowerCase()
      : "patterns your body has been holding";

  return (
    <AppShell title="Session Complete">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          You did important work today. Even if the shift feels subtle right
          now, your body has already started processing differently.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            What your body processed
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Your system brought awareness to <strong>{beliefSentence}</strong>.
            These patterns were not random. They were created to protect you at
            some point in your life.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Today, your body started recognizing that it does not have to hold
            those patterns in the same way anymore.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Before you leave this session
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>• Take 3 slow deep breaths</p>
            <p>• Let your shoulders soften</p>
            <p>• Shake out your whole body for 20 to 30 seconds</p>
            <p>• Drink water if you can</p>
            <p>• Give your body time to integrate</p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Nighttime script
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Repeat this for 1 to 2 nights before bed:
          </p>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              My body is safe now. I am here in the present, not back in the
              past.
            </p>

            <p>
              I release {beliefSentence}. My body no longer has to hold these
              patterns to protect me.
            </p>

            <p>
              I allow my body to soften, let go, and create new patterns that
              support me.
            </p>

            <p>
              I am supported, I am safe, and it is okay for me to rest tonight.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}