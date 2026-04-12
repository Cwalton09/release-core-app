"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const ageOptions = [
  "Before age 5",
  "5–7 years old",
  "8–10 years old",
  "11–13 years old",
  "14–17 years old",
  "18–21 years old",
  "Early adulthood",
  "Recent / current",
  "Multiple time periods",
  "I’m not sure",
];

export default function OriginAgePage() {
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const emotions = searchParams.get("emotions") ?? "";

  const toggleAge = (age: string) => {
    setSelectedAges((current) =>
      current.includes(age)
        ? current.filter((item) => item !== age)
        : [...current, age]
    );
  };

  return (
    <AppShell title="When did this start?">
      <div className="space-y-6">
        <p className="text-sm text-slate-600">
          Let your body guide you. Choose any ages or time periods that feel connected.
        </p>

        <div className="space-y-3">
          {ageOptions.map((age) => {
            const isSelected = selectedAges.includes(age);

            return (
              <button
                key={age}
                type="button"
                onClick={() => toggleAge(age)}
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
                  <span>{age}</span>
                </div>
              </button>
            );
          })}
        </div>

        <Link
          href={`/core-belief?emotions=${encodeURIComponent(
            emotions
          )}&ages=${encodeURIComponent(selectedAges.join(","))}`}
          className={`inline-block rounded-xl px-5 py-3 text-white ${
            selectedAges.length > 0
              ? "bg-emerald-700 hover:bg-emerald-800"
              : "pointer-events-none bg-gray-400"
          }`}
        >
          Continue
        </Link>
      </div>
    </AppShell>
  );
}