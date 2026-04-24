"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const unmetNeeds = [
  "To feel safe",
  "To be seen",
  "To be heard",
  "To be held",
  "To be loved without conditions",
  "To know I was enough",
  "To not be alone in it",
  "To be protected",
  "To be chosen",
  "To be allowed to rest",
  "To know my needs mattered",
  "To be told it was not my fault",
  "To be comforted",
  "To feel like I belonged",
  "To have someone show up for me",
  "To be allowed to feel without being shut down",
  "To know I was not a burden",
  "To feel like I was wanted",
];

export default function TrueCorePage() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [ownWords, setOwnWords] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const emotions = searchParams.get("emotions") ?? "";
  const ages = searchParams.get("ages") ?? "";
  const patterns = searchParams.getAll("pattern");
  const cores = searchParams.getAll("core");

  const toggleNeed = (need: string) => {
    setSelectedNeeds((current) =>
      current.includes(need)
        ? current.filter((item) => item !== need)
        : [...current, need]
    );
  };

  const continueHref = useMemo(() => {
    const params = new URLSearchParams();
    if (emotions) params.set("emotions", emotions);
    if (ages) params.set("ages", ages);
    patterns.forEach((pattern) => params.append("pattern", pattern));
    cores.forEach((core) => params.append("core", core));
    selectedNeeds.forEach((need) => params.append("unmet", need));
    if (ownWords) params.set("ownWords", ownWords);
    return `/regulation?${params.toString()}`;
  }, [selectedNeeds, ownWords, emotions, ages, patterns, cores]);

  return (
    <AppShell title="What did your body need that it didn't get?">
      <div className="space-y-6">

        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-2 text-sm text-slate-700 leading-7">
          <p className="font-semibold text-emerald-800">This is the heart of it.</p>
          <p>
            Underneath every belief and every pattern is a need that went unmet. Use your <span className="font-semibold">sway test</span> to find what your body was really longing for at that age. What did that younger part of you need that it didn't receive?
          </p>
        </div>

        <div className="space-y-3">
          {unmetNeeds.map((need) => {
            const isSelected = selectedNeeds.includes(need);
            return (
              <button
                key={need}
                type="button"
                onClick={() => toggleNeed(need)}
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
                  <span>{need}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            In your own words — what did that part of you need? (optional)
          </label>
          <textarea
            value={ownWords}
            onChange={(e) => setOwnWords(e.target.value)}
            placeholder="e.g. I just needed someone to tell me it was going to be okay..."
            rows={3}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button
          type="button"
          onClick={() => router.push(continueHref)}
          disabled={selectedNeeds.length === 0}
          className={`inline-flex rounded-xl px-5 py-3 text-white ${
            selectedNeeds.length > 0
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