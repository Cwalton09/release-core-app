"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const beliefFlipMap: Record<string, string[]> = {
  "I am not safe": [
    "I am safe now.",
    "It is safe for me to soften.",
    "I can rest and still be safe.",
    "I can let go while I sleep.",
    "My body does not have to stay on guard anymore.",
  ],
  "I am alone": [
    "I am not alone.",
    "I am supported.",
    "It is safe for me to receive support.",
    "I do not have to carry everything alone anymore.",
    "I can rest and feel held.",
  ],
  "I am not enough": [
    "I am enough as I am.",
    "I do not have to prove my worth.",
    "I am safe even when I rest.",
    "I can sleep without holding that pressure anymore.",
  ],
  "I am not supported": [
    "I am supported now.",
    "It is safe for me to receive help.",
    "I do not have to hold everything alone anymore.",
    "I can relax and still be okay.",
  ],
  "I have to stay in control": [
    "I do not have to control everything to be safe.",
    "It is safe for me to soften.",
    "I can relax and still be okay.",
    "I can sleep without gripping.",
  ],
  "I have to handle everything myself": [
    "I am allowed to ask for help.",
    "I do not have to do this alone.",
    "It is safe to receive support.",
  ],
  "Something will go wrong": [
    "I am safe in this moment.",
    "I do not have to brace for what has not happened.",
    "I can rest in what is true right now.",
  ],
  "I cannot relax": [
    "It is safe for me to rest.",
    "I am allowed to soften.",
    "Relaxing does not mean losing control.",
  ],
  "I will lose everything": [
    "I am here now.",
    "I do not have to live inside that fear anymore.",
    "I can sleep without preparing for everything to fall apart.",
  ],
  "I am not important": [
    "I am important.",
    "I matter.",
    "It is safe for me to take up space.",
  ],
  "I do not matter": [
    "I matter.",
    "My body matters.",
    "My needs matter.",
    "It is safe for me to exist fully.",
  ],
  "My needs do not matter": [
    "My needs matter now.",
    "It is safe for me to have needs.",
    "It is safe for me to receive.",
    "I can rest and let my body be supported.",
  ],
  "I have to stay strong": [
    "I do not have to stay hard to stay safe.",
    "It is safe for me to soften.",
    "Softness is not weakness.",
    "I am allowed to rest.",
  ],
  "I am responsible for everyone": [
    "I am not responsible for carrying everyone.",
    "I can release what is not mine.",
    "I am allowed to rest.",
    "I can sleep without holding that weight.",
  ],
  "It is not safe to let go": [
    "It is safe for me to let go now.",
    "I can soften and still be safe.",
    "I can let go while I sleep.",
  ],
};

const fallbackBeliefs = [
  "I am safe now.",
  "I am not alone.",
  "I am supported.",
  "I can relax and still be okay.",
  "I can let go and still be safe.",
  "My body does not have to protect me like that anymore.",
];

export default function SessionSummaryPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");
  const unmetNeeds = searchParams.getAll("unmet");
  const ownWords = searchParams.get("ownWords") ?? "";
  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";
  const bodyArea = searchParams.get("area");
  const whoParam = searchParams.get("who") ?? "";

  const selectedEmotions = emotionsParam
    ? emotionsParam.split(",").map((e) => e.trim()).filter(Boolean)
    : [];

  const selectedAges = agesParam
    ? agesParam.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const selectedWho = whoParam
    ? whoParam.split(",").map((w) => w.trim()).filter(Boolean)
    : [];

  const nightlyBeliefs = useMemo(() => {
    const matched = selectedCore.flatMap(
      (belief) => beliefFlipMap[belief] ?? []
    );
    const unique = Array.from(new Set(matched));
    return unique.length > 0 ? unique : fallbackBeliefs;
  }, [selectedCore]);

  const summaryText = useMemo(() => {
    if (selectedCore.length === 0) {
      return "Your body may have released a layer today. Even if you do not have every answer yet, awareness is already a shift.";
    }
    if (selectedCore.length === 1) {
      return `Today your body brought forward the belief "${selectedCore[0]}." This pattern may have once helped protect you, even if it no longer reflects where you are now.`;
    }
    return `Today your body brought forward these beliefs: ${selectedCore.join(", ")}. These patterns may have once helped protect you, even if they no longer reflect where you are now.`;
  }, [selectedCore]);

  const bodyPlacementText = bodyArea?.trim()
    ? `Place your hand gently on your ${bodyArea.trim()}.`
    : "Place one hand on your chest and one hand on your belly.";

  const ageText = selectedAges.length > 0 ? selectedAges.join(", ") : "a younger age";
  const whoText = selectedWho.length > 0 ? selectedWho.join(", ") : "someone in your life";
  const emotionText = selectedEmotions.length > 0 ? selectedEmotions.join(", ") : "what came up today";

  return (
    <AppShell title="Session Summary">
      <div className="space-y-6">

        {/* What came up */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            What came up in this session
          </h2>
          <p className="text-sm leading-7 text-slate-700">{summaryText}</p>

          {selectedEmotions.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              Your body brought forward these emotions: <span className="font-medium">{selectedEmotions.join(", ")}</span>.
            </p>
          )}

          {selectedAges.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              This connected to experiences around <span className="font-medium">{selectedAges.join(", ")}</span>.
            </p>
          )}

          {selectedWho.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              The event involved: <span className="font-medium">{selectedWho.join(", ")}</span>.
            </p>
          )}

          {unmetNeeds.length > 0 && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm leading-7 text-slate-700 space-y-1">
              <p className="font-medium text-slate-900 mb-1">What your body needed and did not get:</p>
              {unmetNeeds.map((need) => (
                <p key={need}>• {need}</p>
              ))}
            </div>
          )}

          {ownWords && (
            <p className="text-sm leading-7 text-slate-600 italic">"{ownWords}"</p>
          )}

          {selectedPatterns.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              <p className="font-medium text-slate-900 mb-2">Patterns your body was protecting through:</p>
              <div className="space-y-1">
                {selectedPatterns.map((pattern) => (
                  <p key={pattern}>• {pattern}</p>
                ))}
              </div>
            </div>
          )}

          {selectedCore.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCore.map((belief) => (
                <span
                  key={belief}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {belief}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right now */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Right now</h2>
          <div className="text-sm leading-7 text-slate-700 space-y-2">
            <p>Drink some water.</p>
            <p>Let your body settle before moving into anything else.</p>
            <p>Notice if the sensation in your body feels different than when you started.</p>
            <p>Rest if your system feels like it wants time to integrate.</p>
            <p>You do not have to figure anything out right now. Your body is already working.</p>
          </div>
        </div>

        {/* Nighttime script intro */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            🌙 Your nighttime integration script
          </h2>
          <div className="text-sm leading-7 text-slate-700 space-y-3">
            <p className="font-medium text-slate-900">When to use this:</p>
            <p>
              Read this script tonight as you are lying in bed with the lights off or dimmed, right as you are beginning to drift toward sleep. Do not read it earlier in the day — the timing matters.
            </p>
            <p className="font-medium text-slate-900">Why it works:</p>
            <p>
              In the moments just before you fall asleep, your brain shifts from its active waking state into a deeply receptive state called the hypnagogic state. In this window, your conscious mind begins to quiet and your subconscious mind becomes wide open. New beliefs, truths, and feelings can move in without being filtered, analyzed, or blocked. This is the same reason that what you think and feel right before sleep often shapes how you feel when you wake up. We are using that window intentionally — to let what your body uncovered today complete its work while you rest.
            </p>
            <p>
              Read slowly. Breathe between each line. Let the words move through your body, not just your mind.
            </p>
          </div>
        </div>

        {/* The script */}
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm space-y-6 text-sm leading-7 text-slate-700">

          {/* Settle */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">Begin here</p>
            <p>I find a comfortable position. I let my hands rest somewhere soft. I take one slow breath and simply notice that I am here.</p>
            <p>Something in me did important work today. I am ready to let it settle.</p>
          </div>

          <hr className="border-slate-200" />

          {/* Breath */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">Settle my body</p>
            <p>I breathe in slowly for 4 counts. I hold gently for 4. I breathe out for 6.</p>
            <p>I do this three times. With each exhale, I let my body know — the danger is not here tonight. I am safe right now.</p>
          </div>

          <hr className="border-slate-200" />

          {/* Acknowledge */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">Acknowledge what was</p>
            <p>
              Today my body brought forward something that has been stored for a long time. Around {ageText}, something happened that involved {whoText}. My body felt {emotionText}. And from that, it formed a belief that made complete sense at the time.
            </p>
            <p>
              That belief kept me going. It protected me. It was not wrong — it was the only thing that made sense then.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* To the younger self */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">To the younger part of me</p>
            <div className="border-l-2 border-rose-300 pl-5 space-y-2 italic text-slate-600">
              <p>I see you. I see how hard that was.</p>
              <p>You were so young, and what you carried was so large.</p>
              <p>You did not have the words for what you were feeling. You just felt it — in your body, in your chest, in the way everything felt uncertain.</p>
              <p>You survived something hard. And you have been carrying it ever since.</p>
              <p>I am sorry no one came to tell you that you were going to be okay. I am here now. And I am telling you — you are okay.</p>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Truth */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">The truth my nervous system is ready to hear</p>
            <p>The beliefs I formed then — they lived in my body because no one came to correct them. Tonight, I correct them. Gently. Slowly.</p>
            <div className="space-y-3">
              {nightlyBeliefs.map((belief) => (
                <div key={belief} className="border-l-2 border-emerald-400 pl-5 italic text-slate-600">
                  <p>{belief}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Letter to the body */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">A letter to my body</p>
            <p>
              Dear body — you have been on high alert for a long time. You learned to scan for danger because once, danger was real. You learned to brace, to hold, to stay ready. That was your gift to me, and I am grateful.
            </p>
            <p>
              But tonight, I want to give you something back — permission to rest. You have done enough. You kept me going then. You keep me going now. You do not have to keep watch tonight.
            </p>
            <p>{bodyPlacementText}</p>
            <p>
              I let my body feel my own presence, my support, my safety. I breathe into wherever I feel tension and I simply say — you can soften now. You are allowed.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* As I drift */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">As I drift toward sleep</p>
            <p>
              I place my hand on my heart. I feel it beating — steady, faithful, mine. It has beaten through every hard night. It is beating now.
            </p>
            <p>
              If fears come tonight, I can say to them quietly — I hear you. But we are safe right now. You can rest.
            </p>
            <p>
              I am allowed to sleep. I am allowed to let tonight be easy. I am allowed to wake up tomorrow and still be okay.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Final beliefs */}
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400">I carry these into sleep</p>
            <div className="space-y-2">
              {nightlyBeliefs.map((belief) => (
                <p key={belief} className="text-base font-medium text-slate-800">
                  {belief}
                </p>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4">Goodnight. 🌙</p>
          </div>

        </div>

        {/* Continue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Continue when you are ready</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/body-awareness"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400 transition"
            >
              Start another session
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800 transition"
            >
              Back to home
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}