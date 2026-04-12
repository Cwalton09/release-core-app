"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const trueCoreOptions = [
  "I am not safe",
  "I am alone",
  "I am not enough",
  "I am not supported",
  "I do not matter",
  "My needs do not matter",
  "I have to stay in control",
  "I have to hold everything together",
  "I cannot let go",
  "It is all on me",
  "Something bad will happen",
  "I will lose everything",
  "I have to stay strong",
  "I am responsible for everyone",
  "I do not belong",
  "I am not wanted",
];

export default function TrueCorePage() {
  const [selectedCore, setSelectedCore] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const emotions = searchParams.get("emotions") ?? "";
  const ages = searchParams.get("ages") ?? "";
  const patterns = searchParams.getAll("pattern");

  const toggleCore = (belief: string) => {
    setSelectedCore((current) =>
      current.includes(belief)
        ? current.filter((item) => item !== belief)
        : [...current, belief]
    );
  };

  const continueHref = useMemo(() => {
    const params = new URLSearchParams();

    if (emotions) {
      params.set("emotions", emotions);
    }

    if (ages) {
      params.set("ages", ages);
    }

    patterns.forEach((pattern) => params.append("pattern", pattern));
    selectedCore.forEach((belief) => params.append("core", belief));

    return `/regulation?${params.toString()}`;
  }, [selectedCore, emotions, ages, patterns]);

  return (
    <AppShell title="What is the true core underneath this?">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          Let your body guide you again. Choose the deepest beliefs that feel
          most true underneath the patterns you just uncovered.
        </p>

        <div className="space-y-3">
          {trueCoreOptions.map((belief) => {
            const isSelected = selectedCore.includes(belief);

            return (
              <button
                key={belief}
                type="button"
                onClick={() => toggleCore(belief)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-200 bg-white hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                      isSelected
                        ? "border-white bg-white text-emerald-700"
                        : "border-slate-300 text-transparent"
                    }`}
                  >
                    ✓
                  </div>
                  <span>{belief}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => router.push(continueHref)}
          disabled={selectedCore.length === 0}
          className={`inline-flex rounded-xl px-5 py-3 text-white ${
            selectedCore.length > 0
              ? "bg-emerald-700 hover:bg-emerald-800"
              : "cursor-not-allowed bg-slate-400"
          }`}
        >
          Continue
        </button>
      </div>
    </AppShell>
  );
}