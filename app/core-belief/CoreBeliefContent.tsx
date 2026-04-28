"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const beliefs = [
  "I am not safe",
  "I am alone",
  "I am not enough",
  "I am not supported",
  "I have to stay in control",
  "I feel out of control",
  "I have to handle everything myself",
  "Something will go wrong",
  "I cannot relax",
  "I will lose everything",
  "I am not important",
  "I do not matter",
  "My needs do not matter",
  "I have to stay strong",
  "I am responsible for everyone",
  "It is not safe to let go",
  "I am not worthy of love",
  "I am broken",
  "I am a burden",
  "I am not wanted",
  "I am not good enough",
  "I have to be perfect",
  "I cannot trust anyone",
  "I cannot trust myself",
  "I am not allowed to say no",
  "I have to earn my place",
  "I will be abandoned",
  "I will be rejected",
  "I am not lovable",
  "It is not safe to be seen",
  "It is not safe to speak up",
];

export default function CoreBeliefPage() {
  const [selectedBeliefs, setSelectedBeliefs] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emotions = searchParams.get("emotions") ?? "";
  const ages = searchParams.get("ages") ?? "";

  const toggleBelief = (belief: string) => {
    setSelectedBeliefs((current) =>
      current.includes(belief)
        ? current.filter((item) => item !== belief)
        : [...current, belief]
    );
  };

  const continueHref = useMemo(() => {
    const params = new URLSearchParams();
    if (emotions) params.set("emotions", emotions);
    if (ages) params.set("ages", ages);
    selectedBeliefs.forEach((belief) => params.append("core", belief));
    return `/pattern?${params.toString()}`;
  }, [selectedBeliefs, emotions, ages]);

  return (
    <AppShell title="What did this mean to you?">
      <div className="space-y-6">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-2 text-sm text-slate-700 leading-7">
          <p className="font-semibold text-emerald-800">How to use this page:</p>
          <p>
            Use your <span className="font-semibold">sway test</span> to find which beliefs feel true in your body. These are the meanings your nervous system attached to what happened at that age. You can select more than one.
          </p>
        </div>
        <div className="space-y-3">
          {beliefs.map((belief) => {
            const isSelected = selectedBeliefs.includes(belief);
            return (
              <button
                key={belief}
                type="button"
                onClick={() => toggleBelief(belief)}
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
          disabled={selectedBeliefs.length === 0}
          className={`inline-block rounded-xl px-5 py-3 text-white ${
            selectedBeliefs.length > 0
              ? "bg-emerald-700 hover:bg-emerald-800"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Continue
        </button>
      </div>
    </AppShell>
  );
}