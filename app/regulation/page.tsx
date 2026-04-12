"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";

type Reframe = {
  releaseIntro: string;
  supportiveTruths: string[];
  bodyMessage: string;
};

const fallbackReframe: Reframe = {
  releaseIntro:
    "Your body has been holding onto a pattern that once helped protect you. You do not have to carry it the same way anymore.",
  supportiveTruths: [
    "I am safe now.",
    "I am supported.",
    "I can let go.",
    "I do not have to hold this anymore.",
  ],
  bodyMessage:
    "Your body is allowed to soften. It does not need to stay in protection mode.",
};

const reframeMap: Record<string, Reframe> = {
  "I am not safe": {
    releaseIntro:
      "Your body may have learned that staying alert, guarded, or braced was necessary in order to protect you.",
    supportiveTruths: [
      "I am safe now.",
      "It is safe for me to soften.",
      "My body does not have to stay on guard like that anymore.",
    ],
    bodyMessage:
      "Your body can begin to let go of the need to stay braced for danger.",
  },
  "I am alone": {
    releaseIntro:
      "Your body may have learned that it had to carry everything alone, and that can create holding, pressure, and over-responsibility.",
    supportiveTruths: [
      "I am not alone now.",
      "I am supported.",
      "It is safe to receive support.",
    ],
    bodyMessage:
      "Your body can let go of the belief that it has to hold all of this by itself.",
  },
  "I am not enough": {
    releaseIntro:
      "Your body may have been holding the pressure of not feeling like enough, which can create striving, shutdown, tension, or self-protection.",
    supportiveTruths: [
      "I am enough as I am.",
      "I do not have to prove my worth.",
      "I can soften and still be okay.",
    ],
    bodyMessage:
      "Your body can release the pressure to perform, prove, or protect against not being enough.",
  },
  "I am not supported": {
    releaseIntro:
      "Your body may have learned to carry everything on its own. That made sense at the time, but you do not have to do that anymore.",
    supportiveTruths: [
      "I am supported now.",
      "I do not have to do everything alone.",
      "It is safe to receive help.",
    ],
    bodyMessage:
      "Your body can let go of the need to brace and carry everything.",
  },
  "I do not matter": {
    releaseIntro:
      "Your body may have learned to suppress, shrink, or disconnect when it did not feel safe for your needs or feelings to matter.",
    supportiveTruths: [
      "I matter.",
      "My body matters.",
      "My needs matter.",
    ],
    bodyMessage:
      "Your body can release the need to stay small or disconnected in order to stay safe.",
  },
  "My needs do not matter": {
    releaseIntro:
      "Your body may have learned to suppress what it needed in order to stay connected, avoid conflict, or get through that time.",
    supportiveTruths: [
      "My needs matter now.",
      "It is safe for me to have needs.",
      "It is safe for me to receive support.",
    ],
    bodyMessage:
      "Your body can begin to soften out of suppression and overholding.",
  },
  "I have to stay in control": {
    releaseIntro:
      "Your body may have learned that control was the only way to stay safe, which can create tension, gripping, and a fear of letting go.",
    supportiveTruths: [
      "I do not have to control everything to be safe.",
      "It is safe for me to soften.",
      "I can let go little by little.",
    ],
    bodyMessage:
      "Your body can release the pressure to stay tight, vigilant, and in control.",
  },
  "I have to hold everything together": {
    releaseIntro:
      "Your body may have been holding the weight of keeping everything together, which often shows up as bracing, gripping, and over-carrying.",
    supportiveTruths: [
      "I do not have to hold everything together anymore.",
      "It is safe to put some of this down.",
      "I am supported now.",
    ],
    bodyMessage:
      "Your body can let go of what it has been overholding.",
  },
  "I cannot let go": {
    releaseIntro:
      "Your body may have learned that letting go was not safe, so holding on became the way it tried to protect you.",
    supportiveTruths: [
      "It is safe for me to let go now.",
      "My body can release at its own pace.",
      "I can soften and still be safe.",
    ],
    bodyMessage:
      "Your body can begin to loosen its grip without losing safety.",
  },
  "It is all on me": {
    releaseIntro:
      "Your body may have been carrying too much responsibility for too long, and that can keep the system in survival mode.",
    supportiveTruths: [
      "It is not all on me anymore.",
      "I am allowed to receive support.",
      "I do not have to carry this alone.",
    ],
    bodyMessage:
      "Your body can release the pressure of over-responsibility.",
  },
  "Something bad will happen": {
    releaseIntro:
      "Your body may have learned to anticipate danger before it happens, which can keep your system scanning, bracing, and unable to fully relax.",
    supportiveTruths: [
      "I am safe in this moment.",
      "My body does not have to keep anticipating danger.",
      "I can come back to what is true right now.",
    ],
    bodyMessage:
      "Your body can come back to the present instead of preparing for danger.",
  },
  "I will lose everything": {
    releaseIntro:
      "Your body may have been carrying a deep fear of loss, collapse, or things falling apart, which can create clinging and pressure.",
    supportiveTruths: [
      "I am here now.",
      "I do not have to live inside that fear anymore.",
      "My body can release the expectation of loss.",
    ],
    bodyMessage:
      "Your body can let go of the need to prepare for everything falling apart.",
  },
  "I have to stay strong": {
    releaseIntro:
      "Your body may have learned that softness was not safe and that holding it all in was the only way to survive.",
    supportiveTruths: [
      "I do not have to stay hard to stay safe.",
      "It is safe for me to soften.",
      "My body can release the need to overhold.",
    ],
    bodyMessage:
      "Your body is allowed to soften without falling apart.",
  },
  "I am responsible for everyone": {
    releaseIntro:
      "Your body may have taken on responsibility that never fully belonged to you, which can create chronic tension and overcaretaking.",
    supportiveTruths: [
      "I am not responsible for carrying everyone.",
      "I can release what is not mine.",
      "My body is allowed to rest.",
    ],
    bodyMessage:
      "Your body can set down what it has been overcarrying.",
  },
  "I do not belong": {
    releaseIntro:
      "Your body may have learned that belonging was uncertain, conditional, or unsafe, which can create guarding and shrinking.",
    supportiveTruths: [
      "I belong here now.",
      "I do not have to earn belonging.",
      "My body is allowed to take up space.",
    ],
    bodyMessage:
      "Your body can soften out of the need to brace against rejection.",
  },
  "I am not wanted": {
    releaseIntro:
      "Your body may have stored the pain of feeling unwanted, excluded, or not chosen, and that can create protection around connection.",
    supportiveTruths: [
      "I am wanted.",
      "I am allowed to be here.",
      "My body does not have to hide anymore.",
    ],
    bodyMessage:
      "Your body can begin to feel safe being here, being seen, and being present.",
  },
};

export default function RegulationPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");
  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";

  const selectedEmotions = emotionsParam
    ? emotionsParam.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const selectedAges = agesParam
    ? agesParam.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const tailored = useMemo(() => {
    const matched = selectedCore.map(
      (belief) => reframeMap[belief] ?? fallbackReframe
    );

    const releaseIntro =
      matched[0]?.releaseIntro ?? fallbackReframe.releaseIntro;

    const supportiveTruths = Array.from(
      new Set(matched.flatMap((item) => item.supportiveTruths))
    ).slice(0, 6);

    const bodyMessages = Array.from(
      new Set(matched.map((item) => item.bodyMessage))
    );

    return {
      releaseIntro,
      supportiveTruths,
      bodyMessages,
    };
  }, [selectedCore]);

  const installBeliefsHref = useMemo(() => {
    const params = new URLSearchParams();

    if (emotionsParam) params.set("emotions", emotionsParam);
    if (agesParam) params.set("ages", agesParam);

    selectedPatterns.forEach((pattern) => params.append("pattern", pattern));
    selectedCore.forEach((belief) => params.append("core", belief));

    return `/install-beliefs?${params.toString()}`;
  }, [emotionsParam, agesParam, selectedPatterns, selectedCore]);

  return (
    <AppShell title="Release and Reprogram">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Let this land in your body
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            {tailored.releaseIntro}
          </p>

          {selectedEmotions.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              It makes sense that your body felt{" "}
              <span className="font-medium">
                {selectedEmotions.join(", ")}
              </span>
              .
            </p>
          )}

          {selectedAges.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              It may also make sense that this connects to{" "}
              <span className="font-medium">
                {selectedAges.join(", ")}
              </span>
              .
            </p>
          )}

          {selectedPatterns.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              <p className="font-medium text-slate-900 mb-2">
                Patterns your body may have been protecting through
              </p>
              <div className="space-y-2">
                {selectedPatterns.map((pattern) => (
                  <p key={pattern}>• {pattern}</p>
                ))}
              </div>
            </div>
          )}

          {tailored.bodyMessages.map((msg, i) => (
            <p key={i} className="text-sm leading-7 text-slate-700">
              {msg}
            </p>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Let these truths land in your body
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {tailored.supportiveTruths.map((truth) => (
              <p key={truth}>• {truth}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Bring your body back to today
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Take 3 deep breaths. Let your shoulders drop. Unclench your jaw.
            If it feels right, shake out your arms, legs, chest, and whole body
            for 20 to 30 seconds so the energy can keep moving out.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Check back in with your body
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Go back to the sensation you noticed at the beginning. The shape,
            color, size, or texture.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Has it shifted at all, even slightly?
          </p>

          <p className="text-sm leading-7 text-slate-700">
            If yes, that means your body has already started releasing.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            If not, that is okay. It may mean there are more layers to uncover.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Ready for the next step?
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Now that your body has started to come out of the old pattern,
            let’s help it receive what is true now.
          </p>

          <div className="flex gap-3">
            <Link
              href={installBeliefsHref}
              className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800"
            >
              Install new beliefs
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}