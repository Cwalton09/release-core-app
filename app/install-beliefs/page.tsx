"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

type Reframe = {
  acknowledgment: string;
  thankYou: string;
  installBeliefs: string[];
};

const reframeMap: Record<string, Reframe> = {
  "I am not safe": {
    acknowledgment:
      "It makes sense that your body learned to stay guarded, alert, or braced. At one point, it believed that was how it needed to protect you.",
    thankYou:
      "Thank you, body, for trying to protect me when safety did not feel certain.",
    installBeliefs: [
      "I am safe now.",
      "It is safe for me to soften.",
      "My body does not have to stay on guard like that anymore.",
      "I can relax and still be okay.",
      "I can let go and still be safe.",
    ],
  },
  "I am alone": {
    acknowledgment:
      "It makes sense that your body learned to hold so much by itself. At one point, it may have truly felt like everything was on you.",
    thankYou:
      "Thank you, body, for carrying so much when it felt like no one else could.",
    installBeliefs: [
      "I am not alone now.",
      "I am supported.",
      "It is safe to receive support.",
      "I do not have to carry everything alone anymore.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I am not enough": {
    acknowledgment:
      "It makes sense that your body learned to protect against rejection, pressure, or not feeling enough. It was trying to help you survive that pain.",
    thankYou:
      "Thank you, body, for trying to protect me from feeling not enough.",
    installBeliefs: [
      "I am enough as I am.",
      "I do not have to prove my worth.",
      "I am safe even when I am not performing.",
      "I can relax and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I am not supported": {
    acknowledgment:
      "It makes sense that your body learned to overhold, overfunction, or brace for disappointment when support did not feel available.",
    thankYou:
      "Thank you, body, for trying to protect me when support did not feel there.",
    installBeliefs: [
      "I am supported now.",
      "It is safe to receive help.",
      "I do not have to hold everything alone anymore.",
      "I can let go and still be safe.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I do not matter": {
    acknowledgment:
      "It makes sense that your body learned to shrink, stay quiet, or disconnect if it believed your needs or feelings did not matter.",
    thankYou:
      "Thank you, body, for protecting me when it did not feel safe to fully exist.",
    installBeliefs: [
      "I matter.",
      "My body matters.",
      "My needs matter.",
      "It is safe for me to take up space.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "My needs do not matter": {
    acknowledgment:
      "It makes sense that your body learned to suppress what it needed in order to stay connected, avoid conflict, or get through that time.",
    thankYou:
      "Thank you, body, for helping me survive when it did not feel safe to have needs.",
    installBeliefs: [
      "My needs matter now.",
      "It is safe for me to have needs.",
      "It is safe for me to receive.",
      "I can soften and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I have to stay in control": {
    acknowledgment:
      "It makes sense that your body learned to stay tight and in control if letting go once felt unsafe.",
    thankYou:
      "Thank you, body, for trying to keep me safe by staying in control.",
    installBeliefs: [
      "I do not have to control everything to be safe.",
      "It is safe for me to soften.",
      "It is safe for me to let go little by little.",
      "I can relax and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I have to hold everything together": {
    acknowledgment:
      "It makes sense that your body learned to brace and overhold when it believed everything depended on you.",
    thankYou:
      "Thank you, body, for carrying so much when it felt like everything had to stay together.",
    installBeliefs: [
      "I do not have to hold everything together anymore.",
      "It is safe to put some of this down.",
      "I am supported.",
      "I can soften and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "I cannot let go": {
    acknowledgment:
      "It makes sense that your body learned that letting go felt dangerous. Holding on may have felt safer then.",
    thankYou:
      "Thank you, body, for trying to protect me by holding on.",
    installBeliefs: [
      "It is safe for me to let go now.",
      "My body can release at its own pace.",
      "I can soften and still be safe.",
      "I am supported now.",
      "My body does not have to protect me like that anymore.",
    ],
  },
  "It is all on me": {
    acknowledgment:
      "It makes sense that your body learned to carry pressure, responsibility, and vigilance if it believed it all depended on you.",
    thankYou:
      "Thank you, body, for trying to hold everything when it felt like it was all on me.",
    installBeliefs: [
      "It is not all on me anymore.",
      "I am allowed to receive support.",
      "I do not have to carry this alone.",
      "I can soften and still be okay.",
      "My body does not have to protect me like that anymore.",
    ],
  },
};

const fallbackBeliefs = [
  "I am safe now.",
  "I am not alone.",
  "I am supported.",
  "I can relax and still be okay.",
  "I can let go and still be safe.",
  "My body does not have to protect me like that anymore.",
];

export default function InstallBeliefsPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");

  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";
  const bodyArea = searchParams.get("area");

  const selectedEmotions = emotionsParam
    ? emotionsParam.split(",").map((e) => e.trim()).filter(Boolean)
    : [];

  const selectedAges = agesParam
    ? agesParam.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const areaText = bodyArea?.trim() || "this area";

  const handPlacement = bodyArea?.trim()
    ? `Place your hand gently on your ${bodyArea.trim()}.`
    : "If you are not feeling pressure in one specific area, place one hand on your chest and one on your belly.";

  const tailored = useMemo(() => {
    const matched = selectedCore
      .map((belief) => reframeMap[belief])
      .filter(Boolean);

    const acknowledgment =
      matched[0]?.acknowledgment ??
      "It makes sense that your body created this pattern. At one point, it believed this was how it needed to protect you.";

    const thankYou =
      matched[0]?.thankYou ??
      "Thank you, body, for protecting me the best way you knew how during that time.";

    const installBeliefs = Array.from(
      new Set(matched.flatMap((item) => item.installBeliefs))
    );

    return {
      acknowledgment,
      thankYou,
      installBeliefs: installBeliefs.length > 0 ? installBeliefs : fallbackBeliefs,
    };
  }, [selectedCore]);

  const summaryHref = useMemo(() => {
    const params = new URLSearchParams();

    if (emotionsParam) params.set("emotions", emotionsParam);
    if (agesParam) params.set("ages", agesParam);
    if (bodyArea) params.set("area", bodyArea);

    selectedPatterns.forEach((p) => params.append("pattern", p));
    selectedCore.forEach((b) => params.append("core", b));

    return `/session-summary?${params.toString()}`;
  }, [emotionsParam, agesParam, bodyArea, selectedPatterns, selectedCore]);

  const anotherLayerHref = "/body-awareness";

  return (
    <AppShell title="Install New Beliefs">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Acknowledge what your body did
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {selectedCore.length > 0 && (
              <p>
                Your body may have taken on{" "}
                {selectedCore.length === 1
                  ? `the belief "${selectedCore[0]}"`
                  : `these beliefs: ${selectedCore.join(", ")}`}{" "}
                in order to protect you during that time.
              </p>
            )}

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

            <p>{tailored.acknowledgment}</p>
            <p>{tailored.thankYou}</p>
            <p>
              We are not there anymore, and we do not have to keep living from
              that belief now.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Put your hands on your body
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>{handPlacement}</p>
            <p>
              Let your body feel your presence, your support, and your safety.
            </p>
            <p>
              If you are feeling pressure in {areaText}, gently breathe into that
              area without forcing anything.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Let your body soften
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
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
            <p>Any trapped emotion connected to this is allowed to move now.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Breath and let go
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>Inhale slowly.</p>
            <p>Exhale and let your body drop.</p>
            <p>Again, inhale.</p>
            <p>Exhale, soften deeper.</p>
            <p>Let your body feel supported.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Install new beliefs
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {tailored.installBeliefs.map((belief) => (
              <p key={belief}>{belief}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Check in with your body
          </h2>

          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              Notice what your body feels like now. Notice if there is more
              softness, space, warmth, movement, calm, or release.
            </p>
            <p>Ask your body if there is another layer underneath this.</p>
            <p>
              Then ask, is it okay to continue to that layer today, or does my
              body want to pause and integrate first?
            </p>
            <p>
              If there is no layer underneath, or your body wants to pause, you
              can end the session here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={anotherLayerHref}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400"
            >
              Another layer is ready
            </Link>

            <Link
              href={summaryHref}
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