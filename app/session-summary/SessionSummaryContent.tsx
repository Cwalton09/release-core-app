"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

type NightScript = {
  reflection: string;
  thankYou: string;
  newBeliefs: string[];
};

const scriptMap: Record<string, NightScript> = {
  "I am not safe": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that it had to stay alert, guarded, or braced in order to protect you.",
    thankYou:
      "Thank you, body, for protecting me the best way you knew how when safety did not feel certain.",
    newBeliefs: [
      "I am safe now.",
      "It is safe for me to soften.",
      "My body does not have to stay on guard like that anymore.",
      "I can rest and still be safe.",
      "I can let go while I sleep.",
    ],
  },
  "I am alone": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that it had to carry everything alone.",
    thankYou:
      "Thank you, body, for holding so much when it felt like everything was on me.",
    newBeliefs: [
      "I am not alone now.",
      "I am supported.",
      "It is safe for me to receive support.",
      "I do not have to carry everything alone anymore.",
      "My body can soften while I rest.",
    ],
  },
  "I am not enough": {
    reflection:
      "Tonight, your body may still be unwinding from the pressure of believing you were not enough.",
    thankYou:
      "Thank you, body, for trying to protect me from rejection, shame, or not feeling enough.",
    newBeliefs: [
      "I am enough as I am.",
      "I do not have to prove my worth.",
      "I am safe even when I rest.",
      "My body can let go of pressure now.",
      "I can sleep without holding that belief anymore.",
    ],
  },
  "I am not supported": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that support was not available and that it had to overhold everything alone.",
    thankYou:
      "Thank you, body, for trying to protect me when support did not feel available.",
    newBeliefs: [
      "I am supported now.",
      "It is safe for me to receive help.",
      "I do not have to hold everything together alone anymore.",
      "I can relax and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I do not matter": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that your needs, feelings, or presence did not matter.",
    thankYou:
      "Thank you, body, for protecting me when it did not feel safe to fully exist or take up space.",
    newBeliefs: [
      "I matter.",
      "My body matters.",
      "My needs matter.",
      "It is safe for me to exist fully.",
      "My body can rest without disappearing.",
    ],
  },
  "My needs do not matter": {
    reflection:
      "Tonight, your body may still be unwinding from the habit of pushing your needs down in order to stay safe, connected, or accepted.",
    thankYou:
      "Thank you, body, for helping me survive when it did not feel safe to have needs.",
    newBeliefs: [
      "My needs matter now.",
      "It is safe for me to have needs.",
      "It is safe for me to receive.",
      "My body does not have to suppress itself anymore.",
      "I can rest and let my body be supported.",
    ],
  },
  "I have to stay in control": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that staying in control was the only way to stay safe.",
    thankYou:
      "Thank you, body, for trying to keep me safe by staying tight, vigilant, and in control.",
    newBeliefs: [
      "I do not have to control everything to be safe.",
      "It is safe for me to soften.",
      "It is safe for me to let go a little more now.",
      "I can relax and still be okay.",
      "My body can rest without gripping.",
    ],
  },
  "I have to hold everything together": {
    reflection:
      "Tonight, your body may still be unwinding from the pressure of believing everything depended on you.",
    thankYou:
      "Thank you, body, for holding so much when it felt like everything had to stay together.",
    newBeliefs: [
      "I do not have to hold everything together anymore.",
      "It is safe to put some of this down.",
      "I am supported.",
      "My body can soften now.",
      "I can sleep without carrying all of this.",
    ],
  },
  "I cannot let go": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that letting go was not safe.",
    thankYou:
      "Thank you, body, for protecting me by holding on when letting go once felt dangerous.",
    newBeliefs: [
      "It is safe for me to let go now.",
      "My body can release at its own pace.",
      "I can soften and still be safe.",
      "I am supported now.",
      "My body can let go while I sleep.",
    ],
  },
  "It is all on me": {
    reflection:
      "Tonight, your body may still be unwinding from the weight of over-responsibility and the belief that everything depended on you.",
    thankYou:
      "Thank you, body, for carrying so much when it felt like it was all on me.",
    newBeliefs: [
      "It is not all on me anymore.",
      "I am allowed to receive support.",
      "I do not have to carry this alone.",
      "I can soften and still be okay.",
      "My body can rest now.",
    ],
  },
  "Something bad will happen": {
    reflection:
      "Tonight, your body may still be unwinding from the expectation that danger was always about to happen.",
    thankYou:
      "Thank you, body, for trying to protect me by staying alert and preparing ahead.",
    newBeliefs: [
      "I am safe in this moment.",
      "My body does not have to keep anticipating danger.",
      "I can come back to what is true now.",
      "It is safe for me to rest.",
      "My body can soften while I sleep.",
    ],
  },
  "I will lose everything": {
    reflection:
      "Tonight, your body may still be unwinding from the fear that everything could fall apart or be taken away.",
    thankYou:
      "Thank you, body, for trying to protect me from loss, collapse, or things falling apart.",
    newBeliefs: [
      "I am here now.",
      "I do not have to live inside that fear anymore.",
      "My body can release the expectation of loss.",
      "It is safe for me to soften.",
      "I can rest without preparing for everything to fall apart.",
    ],
  },
  "I have to stay strong": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that softness was not safe and that holding it all in was the only way to survive.",
    thankYou:
      "Thank you, body, for helping me hold it together when softness did not feel safe.",
    newBeliefs: [
      "I do not have to stay hard to stay safe.",
      "It is safe for me to soften.",
      "My body can release the need to overhold.",
      "I can rest without bracing.",
      "Softness is safe now.",
    ],
  },
  "I am responsible for everyone": {
    reflection:
      "Tonight, your body may still be unwinding from carrying responsibility that was never fully yours.",
    thankYou:
      "Thank you, body, for trying to protect everyone when it felt like it all depended on you.",
    newBeliefs: [
      "I am not responsible for carrying everyone.",
      "I can release what is not mine.",
      "My body is allowed to rest.",
      "I do not have to overcarry anymore.",
      "I can sleep without holding that weight.",
    ],
  },
  "I do not belong": {
    reflection:
      "Tonight, your body may still be unwinding from the belief that belonging was uncertain, conditional, or unsafe.",
    thankYou:
      "Thank you, body, for protecting me when belonging did not feel steady or safe.",
    newBeliefs: [
      "I belong here now.",
      "I do not have to earn belonging.",
      "My body is allowed to take up space.",
      "It is safe for me to be here.",
      "I can rest without bracing against rejection.",
    ],
  },
  "I am not wanted": {
    reflection:
      "Tonight, your body may still be unwinding from the pain of feeling unwanted, excluded, or not chosen.",
    thankYou:
      "Thank you, body, for protecting me when being seen or wanted did not feel certain.",
    newBeliefs: [
      "I am wanted.",
      "I am allowed to be here.",
      "My body does not have to hide anymore.",
      "It is safe for me to be seen.",
      "I can rest while feeling safe and wanted.",
    ],
  },
};

const fallbackScript: NightScript = {
  reflection:
    "Tonight, your body may still be unwinding from the pattern it brought forward today. That is okay. Your body is already beginning to integrate what it no longer needs to hold in the same way.",
  thankYou:
    "Thank you, body, for protecting me the best way you knew how during that time.",
  newBeliefs: [
    "I am safe now.",
    "I am not alone.",
    "I am supported.",
    "I can relax and still be okay.",
    "My body does not have to protect me like that anymore.",
  ],
};

export default function SessionSummaryPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");

  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";
  const bodyArea = searchParams.get("area");

  const selectedEmotions = emotionsParam
    ? emotionsParam.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const selectedAges = agesParam
    ? agesParam.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const summaryText = useMemo(() => {
    if (selectedCore.length === 0) {
      return "Your body may have released a layer today. Even if you do not have every answer yet, awareness is already a shift.";
    }

    if (selectedCore.length === 1) {
      return `Today your body brought forward this core belief: ${selectedCore[0]}. This pattern may have once helped protect you, even if it no longer reflects where you are now.`;
    }

    return `Today your body brought forward these core beliefs: ${selectedCore.join(
      ", "
    )}. These patterns may have once helped protect you, even if they no longer reflect where you are now.`;
  }, [selectedCore]);

  const nightly = useMemo(() => {
    const matched = selectedCore.map(
      (belief) => scriptMap[belief] ?? fallbackScript
    );

    const reflection = matched[0]?.reflection ?? fallbackScript.reflection;
    const thankYou = matched[0]?.thankYou ?? fallbackScript.thankYou;

    const newBeliefs = Array.from(
      new Set(matched.flatMap((item) => item.newBeliefs))
    );

    return {
      reflection,
      thankYou,
      newBeliefs: newBeliefs.length > 0 ? newBeliefs : fallbackScript.newBeliefs,
    };
  }, [selectedCore]);

  const bodyPlacementText = bodyArea?.trim()
    ? `As you get into bed tonight, place your hand gently on your ${bodyArea.trim()}.`
    : "As you get into bed tonight, place one hand on your chest and one hand on your belly.";

  return (
    <AppShell title="Session Summary">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            What came up in this session
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-700">
            {summaryText}
          </p>

          {selectedEmotions.length > 0 && (
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Your body also brought forward these emotions:{" "}
              {selectedEmotions.join(", ")}.
            </p>
          )}

          {selectedAges.length > 0 && (
            <p className="mt-3 text-sm leading-7 text-slate-700">
              This may connect to experiences around{" "}
              {selectedAges.join(", ")}.
            </p>
          )}

          {selectedPatterns.length > 0 && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              <p className="font-medium text-slate-900 mb-2">
                Deeper patterns your body may have been protecting through
              </p>
              <div className="space-y-2">
                {selectedPatterns.map((pattern) => (
                  <p key={pattern}>• {pattern}</p>
                ))}
              </div>
            </div>
          )}

          {selectedCore.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-slate-700">
          <p className="font-medium text-slate-900">What to do next</p>

          <div className="mt-3 space-y-3">
            <p>Drink some water.</p>
            <p>Let your body settle before trying to force another answer.</p>
            <p>Notice if the sensation in your body feels different now.</p>
            <p>Rest if your system feels like it wants time to integrate.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Nighttime integration script
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>{nightly.reflection}</p>

            {selectedEmotions.length > 0 && (
              <p>
                It makes sense that your body felt {selectedEmotions.join(", ")}.
              </p>
            )}

            {selectedAges.length > 0 && (
              <p>
                This may connect to experiences around {selectedAges.join(", ")}.
              </p>
            )}

            {selectedPatterns.length > 0 && (
              <p>
                Your body may have adapted through patterns like{" "}
                {selectedPatterns.join(", ")}.
              </p>
            )}

            <p>{nightly.thankYou}</p>

            <p>
              It makes sense that your body felt what it felt and believed what it
              believed at that time. But you are not there anymore.
            </p>

            <p>
              Your body does not have to keep protecting you in that same way now.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <p>{bodyPlacementText}</p>
            <p className="mt-2">
              Let your body feel your presence, your support, and your safety.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-slate-700">
            <p className="font-medium text-slate-900">Let your body soften</p>

            <div className="mt-3 space-y-2">
              <p>My body, you can let go now.</p>
              {bodyArea?.trim() ? (
                <p>{bodyArea.trim()}, you do not have to hold this anymore.</p>
              ) : (
                <p>This part of my body, you do not have to hold this anymore.</p>
              )}
              <p>You do not have to brace.</p>
              <p>You do not have to stay tight.</p>
              <p>It is safe to soften.</p>
              <p>It is safe to release.</p>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-4 text-sm leading-7 text-slate-700">
            <p className="font-medium text-slate-900">Breath and let go</p>

            <div className="mt-3 space-y-2">
              <p>Inhale slowly.</p>
              <p>Exhale and let your body drop.</p>
              <p>Again, inhale.</p>
              <p>Exhale, soften deeper.</p>
              <p>Let your body feel supported.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-slate-700">
            <p className="font-medium text-slate-900">
              Install new beliefs while you sleep
            </p>

            <div className="mt-3 space-y-2">
              {nightly.newBeliefs.map((belief) => (
                <p key={belief}>{belief}</p>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <p>
              As you fall asleep tonight, let your body keep integrating what it
              uncovered today.
            </p>
            <p className="mt-2">
              It does not have to force anything. It can simply soften, receive,
              and let the new beliefs settle in while you rest.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Continue when you are ready
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/body-awareness"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400"
            >
              Start another session
            </Link>

            <Link
              href="/"
              className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}