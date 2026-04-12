"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const patternMap = {
  Safety: [
    "My body stays braced",
    "I expect something to go wrong",
    "I do not feel safe to relax",
    "I feel like I have to protect myself",
  ],
  Control: [
    "I feel like I have to hold everything together",
    "I do not feel safe letting go",
    "I feel responsible for what happens next",
    "I have to stay in control to feel okay",
  ],
  Worth: [
    "I feel like I am not enough",
    "I feel unseen or not important",
    "I feel like my needs do not matter",
    "I feel like I have to prove myself",
  ],
  Support: [
    "I feel like I have to do this alone",
    "I do not feel supported",
    "I feel like I cannot rely on others",
    "I feel like it is all on me",
  ],
  Abandonment: [
    "I fear being left",
    "I fear losing connection",
    "I feel alone even with people around me",
    "I expect support to disappear",
  ],
  Rejection: [
    "I fear not being accepted",
    "I feel like I do not belong",
    "I expect to be shut out",
    "I feel like I have to earn love or approval",
  ],
};

export default function PatternPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const emotions = searchParams.get("emotions") ?? "";
  const ages = searchParams.get("ages") ?? "";
  const cores = searchParams.getAll("core");

  const toggleCategory = (category: string) => {
    setOpenCategory((current) => (current === category ? null : category));
  };

  const togglePattern = (pattern: string) => {
    setSelectedPatterns((current) =>
      current.includes(pattern)
        ? current.filter((item) => item !== pattern)
        : [...current, pattern]
    );
  };

  const buildHref = () => {
    const params = new URLSearchParams();

    if (emotions) params.set("emotions", emotions);
    if (ages) params.set("ages", ages);

    cores.forEach((c) => params.append("core", c));
    selectedPatterns.forEach((p) => params.append("pattern", p));

    return `/true-core?${params.toString()}`;
  };

  return (
    <AppShell title="What pattern feels most true underneath this?">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          Tap a category that feels connected. Then choose any deeper patterns
          that feel true in your body. This helps narrow down what your system
          has really been protecting.
        </p>

        <div className="space-y-4">
          {Object.entries(patternMap).map(([category, patterns]) => {
            const isOpen = openCategory === category;

            return (
              <div
                key={category}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900">
                    {category}
                  </span>
                  <span className="text-slate-500">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-slate-100 px-5 py-4">
                    {patterns.map((pattern) => {
                      const isSelected = selectedPatterns.includes(pattern);

                      return (
                        <button
                          key={pattern}
                          type="button"
                          onClick={() => togglePattern(pattern)}
                          className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                            isSelected
                              ? "border-emerald-700 bg-emerald-700 text-white"
                              : "border-slate-200 bg-slate-50 text-slate-900 hover:border-emerald-400"
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
                            <span>{pattern}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Link
          href={buildHref()}
          className={`inline-flex rounded-xl px-5 py-3 text-white ${
            selectedPatterns.length > 0
              ? "bg-emerald-700 hover:bg-emerald-800"
              : "pointer-events-none bg-slate-400"
          }`}
        >
          Continue
        </Link>
      </div>
    </AppShell>
  );
}