"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

type Reframe = {
  releaseIntro: string;
  supportiveTruths: string[];
  bodyMessage: string;
};

const reframeMap: Record<string, Reframe> = {
  "I am not safe": {
    releaseIntro:
      "Your body may have been holding onto protection around safety. It learned to stay alert, guarded, or braced because at one point that felt necessary.",
    supportiveTruths: [
      "I am safe now.",
      "My body does not have to stay on guard in the same way.",
      "It is safe for me to soften.",
    ],
    bodyMessage:
      "Let your body know that the moment it learned this pattern is over. It does not have to keep protecting you the same way today.",
  },
  "I am alone": {
    releaseIntro:
      "Your body may have been carrying the belief that you have to do this alone. That can create tension, holding, and the feeling that everything is on you.",
    supportiveTruths: [
      "I am not alone now.",
      "It is safe to receive support.",
      "My body does not have to hold all of this by itself.",
    ],
    bodyMessage:
      "Let your body feel that it no longer has to carry this alone. Support is allowed now.",
  },
  "I am not enough": {
    releaseIntro:
      "Your body may have been protecting a deep fear of not being enough. This can create pressure, striving, shutdown, or constant self-monitoring.",
    supportiveTruths: [
      "I am enough as I am.",
      "I do not have to prove my worth.",
      "My body can let go of pressure.",
    ],
    bodyMessage:
      "Let your body know it does not have to earn safety, love, or worthiness anymore.",
  },
  "I am not supported": {
    releaseIntro:
      "Your body may have learned that support was not available, so it adapted by overholding, overfunctioning, or preparing for disappointment.",
    supportiveTruths: [
      "I am supported now.",
      "It is safe for me to receive help.",
      "My body does not have to hold everything together alone.",
    ],
    bodyMessage:
      "Let your body feel what it is like to stop overholding and to allow support in.",
  },
  "I do not matter": {
    releaseIntro:
      "Your body may have stored the belief that your feelings, needs, or presence did not matter. That can create collapse, silence, or self-abandonment.",
    supportiveTruths: [
      "I matter.",
      "My body matters.",
      "My needs are allowed to exist.",
    ],
    bodyMessage:
      "Let your body feel that it no longer has to disappear to stay safe.",
  },
  "My needs do not matter": {
    releaseIntro:
      "Your system may have learned to push your needs down in order to stay connected, avoid conflict, or survive a situation.",
    supportiveTruths: [
      "My needs matter now.",
      "It is safe for me to have needs.",
      "My body does not have to suppress itself anymore.",
    ],
    bodyMessage:
      "Let your body know it is safe to come out of suppression and be acknowledged now.",
  },
  "I have to stay in control": {
    releaseIntro:
      "Your body may have learned that control was the only way to stay safe. That can keep the nervous system tight, vigilant, and unable to fully relax.",
    supportiveTruths: [
      "I do not have to control everything to be safe.",
      "It is safe for me to soften.",
      "My body can begin to let go.",
    ],
    bodyMessage:
      "Let your body know it does not have to hold on so tightly anymore.",
  },
  "I have to hold everything together": {
    releaseIntro:
      "Your body may have been carrying the weight of everyone and everything. That often shows up as pressure, bracing, and never fully exhaling.",
    supportiveTruths: [
      "I do not have to hold everything together.",
      "It is safe to put some of this down.",
      "My body can release what is not mine to carry.",
    ],
    bodyMessage:
      "Let your body feel what it is like to stop gripping and stop carrying it all.",
  },
  "I cannot let go": {
    releaseIntro:
      "Your body may have learned that letting go was dangerous. That can create tension, gripping, overthinking, and holding patterns in the body.",
    supportiveTruths: [
      "It is safe for me to let go.",
      "My body can release at its own pace.",
      "I do not have to hold this anymore.",
    ],
    bodyMessage:
      "Let your body know it can loosen its grip without losing safety.",
  },
  "It is all on me": {
    releaseIntro:
      "Your body may have been carrying responsibility that felt too heavy or too big for you. That can keep the system in survival mode.",
    supportiveTruths: [
      "It is not all on me anymore.",
      "I am allowed to receive support.",
      "My body can stop carrying this alone.",
    ],
    bodyMessage:
      "Let your body know it can release the pressure of over-responsibility.",
  },
  "Something bad will happen": {
    releaseIntro:
      "Your body may have been anticipating danger, loss, or impact before it happens. That can keep your system braced and scanning ahead.",
    supportiveTruths: [
      "I am safe in this moment.",
      "My body does not have to keep anticipating danger.",
      "I can come back to what is true right now.",
    ],
    bodyMessage:
      "Let your body come back to the present moment instead of the old expectation of danger.",
  },
  "I will lose everything": {
    releaseIntro:
      "Your body may have stored a deep fear of loss, collapse, or things falling apart. That can create clinging, pressure, and fear of relaxing.",
    supportiveTruths: [
      "I am here now.",
      "I do not have to live inside that fear anymore.",
      "My body can release the expectation of loss.",
    ],
    bodyMessage:
      "Let your body know it no longer has to prepare for everything to fall apart.",
  },
  "I have to stay strong": {
    releaseIntro:
      "Your body may have learned that softness was not safe and that strength meant staying shut down, contained, or always holding.",
    supportiveTruths: [
      "I do not have to stay hard to stay safe.",
      "It is safe for me to soften.",
      "My body can release the need to overhold.",
    ],
    bodyMessage:
      "Let your body know it is allowed to soften without falling apart.",
  },
  "I am responsible for everyone": {
    releaseIntro:
      "Your body may have taken on responsibility that never fully belonged to you. That can create chronic tension, pressure, and overcaretaking.",
    supportiveTruths: [
      "I am not responsible for carrying everyone.",
      "I can release what is not mine.",
      "My body is allowed to rest.",
    ],
    bodyMessage:
      "Let your body know it can set down what it has been overcarrying.",
  },
  "I do not belong": {
    releaseIntro:
      "Your body may have learned that belonging was uncertain, unsafe, or conditional. That can create guarding, shrinking, or people-pleasing.",
    supportiveTruths: [
      "I belong here now.",
      "I do not have to earn belonging.",
      "My body is allowed to take up space.",
    ],
    bodyMessage:
      "Let your body know it no longer has to brace against rejection to exist.",
  },
  "I am not wanted": {
    releaseIntro:
      "Your body may have stored the pain of feeling unwanted, excluded, or not chosen. That can create protection around connection and visibility.",
    supportiveTruths: [
      "I am wanted.",
      "I am allowed to be here.",
      "My body does not have to hide anymore.",
    ],
    bodyMessage:
      "Let your body know it is safe to be seen and safe to be here now.",
  },
};

const fallbackReframe: Reframe = {
  releaseIntro:
    "Your body may have been holding onto a pattern it created to protect you. What once helped you survive may not be what you need now.",
  supportiveTruths: [
    "I am safe now.",
    "My body does not have to hold this in the same way anymore.",
    "It is safe for me to soften and release.",
  ],
  bodyMessage:
    "Let your body know it is here now, not back there, and it can begin to let go.",
};

export default function RegulationPage() {
  const searchParams = useSearchParams();
  const selectedCore = searchParams.getAll("core");

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

    const summaryHref = `/session-summary?${new URLSearchParams(
      selectedCore.map((b) => ["core", b])
    ).toString()}`;

    return {
      releaseIntro,
      supportiveTruths,
      bodyMessages,
      summaryHref,
    };
  }, [selectedCore]);

  return (
    <AppShell title="Release and Reprogram">
      <div className="space-y-6">
        <p className="text-sm leading-7 text-slate-700">
          {tailored.releaseIntro}
        </p>

        {selectedCore.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              What your body has been holding
            </h2>

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
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Let these land in your body
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {tailored.supportiveTruths.map((truth) => (
              <p key={truth}>• {truth}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-slate-700">
          <p className="font-medium text-slate-900">Bring your body back to today</p>

          <div className="mt-3 space-y-3">
            {tailored.bodyMessages.map((message) => (
              <p key={message}>{message}</p>
            ))}
            <p>
              Take 3 deep breaths. Let your shoulders drop. Unclench your jaw.
              If it feels right, shake out your arms, legs, chest, and whole
              body for 20 to 30 seconds so the energy can keep moving out.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Check back in with your body
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Go back to the sensation you noticed at the beginning. The shape,
            color, size, or texture.
          </p>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>Has it shifted at all, even slightly?</p>
            <p>If yes, that means your body has already started releasing.</p>
            <p>
              If not, that is okay. It may mean there are more layers to uncover.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            Before continuing, ask your body:
            <br />
            <br />
            Is it okay to keep going today, or does your body want to pause and
            integrate first?
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Is another layer ready to release?
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/body-awareness"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400"
            >
              Yes, keep going
            </Link>

            <Link
              href={tailored.summaryHref}
              className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800"
            >
              End session
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}