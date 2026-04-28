"use client";
import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

const emotions = [
  "Fear",
  "Anxiety",
  "Sadness",
  "Grief",
  "Anger",
  "Rage",
  "Resentment",
  "Bitterness",
  "Shame",
  "Guilt",
  "Embarrassment",
  "Humiliation",
  "Loneliness",
  "Rejection",
  "Abandonment",
  "Betrayal",
  "Overwhelm",
  "Powerlessness",
  "Frustration",
  "Helplessness",
  "Hopelessness",
  "Despair",
  "Numbness",
  "Disconnection",
  "Confusion",
  "Panic",
  "Dread",
  "Worthlessness",
  "Inadequacy",
  "Jealousy",
  "Envy",
  "Distrust",
  "Hatred",
  "Self-hatred",
];

export default function EmotionPage() {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((current) =>
      current.includes(emotion)
        ? current.filter((item) => item !== emotion)
        : [...current, emotion]
    );
  };

  return (
    <AppShell title="What emotions feel connected to this?">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          Let your body guide you. Choose any emotions that feel true, charged,
          or connected to what your body is holding.
        </p>
        <div className="space-y-3">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion);
            return (
              <button
                key={emotion}
                type="button"
                onClick={() => toggleEmotion(emotion)}
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
                  <span>{emotion}</span>
                </div>
              </button>
            );
          })}
        </div>
        <Link
          href={`/origin-age?emotions=${encodeURIComponent(selectedEmotions.join(","))}`}
          className={`inline-flex rounded-xl px-5 py-3 text-white ${
            selectedEmotions.length > 0
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