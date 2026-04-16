"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const ageRanges: Record<string, string[]> = {
  "Age 0–10": ["Age 0–1", "Age 2", "Age 3", "Age 4", "Age 5", "Age 6", "Age 7", "Age 8", "Age 9", "Age 10"],
  "Age 11–20": ["Age 11", "Age 12", "Age 13", "Age 14", "Age 15", "Age 16", "Age 17", "Age 18", "Age 19", "Age 20"],
  "Age 21–30": ["Age 21", "Age 22", "Age 23", "Age 24", "Age 25", "Age 26", "Age 27", "Age 28", "Age 29", "Age 30"],
  "Age 31–40": ["Age 31", "Age 32", "Age 33", "Age 34", "Age 35", "Age 36", "Age 37", "Age 38", "Age 39", "Age 40"],
  "Age 41–50": ["Age 41", "Age 42", "Age 43", "Age 44", "Age 45", "Age 46", "Age 47", "Age 48", "Age 49", "Age 50"],
  "Age 51+": ["Age 51", "Age 52", "Age 53", "Age 54", "Age 55", "Age 56", "Age 57", "Age 58", "Age 59", "Age 60+"],
};

const specialOptions = [
  "Inherited (passed down through family lineage)",
  "In utero (before birth)",
  "Recent / current",
  "Multiple time periods",
  "I'm not sure",
];

const whoOptions = [
  "Mom",
  "Dad",
  "Both parents",
  "Sibling",
  "Extended family",
  "Friend",
  "Teacher / authority figure",
  "Self",
  "Other",
];

export default function OriginAgePage() {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedWho, setSelectedWho] = useState<string[]>([]);
  const [whatHappened, setWhatHappened] = useState("");
  const [activationAge, setActivationAge] = useState("");
  const searchParams = useSearchParams();
  const emotions = searchParams.get("emotions") ?? "";

  const isInherited = selectedAges.includes("Inherited (passed down through family lineage)");

  const toggleSpecial = (option: string) => {
    setSelectedAges((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const toggleAge = (age: string) => {
    setSelectedAges((current) =>
      current.includes(age)
        ? current.filter((item) => item !== age)
        : [...current, age]
    );
  };

  const toggleWho = (who: string) => {
    setSelectedWho((current) =>
      current.includes(who)
        ? current.filter((item) => item !== who)
        : [...current, who]
    );
  };

  const canContinue = selectedAges.length > 0 && selectedWho.length > 0;

  return (
    <AppShell title="When did this start?">
      <div className="space-y-8">

        {/* Instructions */}
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-3 text-sm text-slate-700 leading-7">
          <p className="font-semibold text-emerald-800">How to use this page:</p>
          <p>
            Use your <span className="font-semibold">sway test</span> to let your body guide you to the correct age when this emotion was first learned or stored.
          </p>
          <p>
            Start by asking your body: <span className="italic">"Was this emotion inherited from my family lineage?"</span> If yes, select <span className="font-semibold">Inherited</span> below, then sway test to find the age it first activated in you. Inherited emotions typically activate when the child first experiences something that triggers that family pattern.
          </p>
          <p>
            If not inherited, <span className="font-semibold">first sway test the decade</span> — ask your body if it was between 0–10, 11–20, 21–30, and so on. Once you find the right decade, the exact ages within that range will appear so you can sway test down to the specific age.
          </p>
          <p>
            Once you have your age, <span className="font-semibold">think back to that time.</span> What was happening in your life? Type anything you remember — even a feeling or a fragment is helpful.
          </p>
          <p>
            Then sway test <span className="font-semibold">who the event involved</span> — mom, dad, family, friends, or yourself.
          </p>
        </div>

        {/* Special Options */}
        <div>
          <h2 className="text-base font-semibold text-neutral-800 mb-3">
            First — sway test these special cases:
          </h2>
          <div className="space-y-2">
            {specialOptions.map((option) => {
              const isSelected = selectedAges.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleSpecial(option)}
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
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inherited activation age */}
        {isInherited && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
            <p className="text-sm font-semibold text-emerald-800">Inherited emotion detected</p>
            <p className="text-sm text-slate-700">
              Inherited emotions and beliefs are passed down through family lineage and activate when the child first experiences something that triggers that pattern. Sway test to find the age this activated in you.
            </p>
            <label className="block text-sm font-medium text-slate-700 mt-2">
              At what age did this inherited pattern activate in you?
            </label>
            <input
              type="text"
              value={activationAge}
              onChange={(e) => setActivationAge(e.target.value)}
              placeholder="e.g. Age 4, Age 7..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        )}

        {/* Decade selector */}
        <div>
          <h2 className="text-base font-semibold text-neutral-800 mb-3">
            Step 1 — Sway test the decade:
          </h2>
          <div className="space-y-2">
            {Object.keys(ageRanges).map((range) => {
              const isActive = selectedRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSelectedRange(isActive ? null : range)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-200 bg-white hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                        isActive
                          ? "border-white bg-white text-emerald-700"
                          : "border-slate-300 text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                    <span>{range}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exact age selector — shows only when a decade is selected */}
        {selectedRange && (
          <div>
            <h2 className="text-base font-semibold text-neutral-800 mb-3">
              Step 2 — Sway test the exact age within {selectedRange}:
            </h2>
            <div className="space-y-2">
              {ageRanges[selectedRange].map((age) => {
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
          </div>
        )}

        {/* What happened */}
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            What was happening at that age? (type anything you remember)
          </label>
          <textarea
            value={whatHappened}
            onChange={(e) => setWhatHappened(e.target.value)}
            placeholder="e.g. My parents were fighting a lot. I felt invisible. I'm not sure but something felt unsafe..."
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Who was involved */}
        <div>
          <h2 className="text-base font-semibold text-neutral-800 mb-3">
            Sway test: Who was this event connected to?
          </h2>
          <div className="space-y-2">
            {whoOptions.map((who) => {
              const isSelected = selectedWho.includes(who);
              return (
                <button
                  key={who}
                  type="button"
                  onClick={() => toggleWho(who)}
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
                    <span>{who}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <Link
          href={`/core-belief?emotions=${encodeURIComponent(emotions)}&ages=${encodeURIComponent(
            selectedAges.join(",")
          )}&who=${encodeURIComponent(selectedWho.join(","))}&what=${encodeURIComponent(
            whatHappened
          )}&activationAge=${encodeURIComponent(activationAge)}`}
          className={`inline-block rounded-xl px-5 py-3 text-white transition ${
            canContinue
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