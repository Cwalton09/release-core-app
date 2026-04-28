"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";

const beliefFlipMap: Record<string, string[]> = {
  "I am not safe": [
    "I am safe now.",
    "It is safe for me to soften.",
    "My body does not have to stay on guard anymore.",
    "I can relax and still be okay.",
    "I can let go and still be safe.",
  ],
  "I am alone": [
    "I am not alone now.",
    "I am supported.",
    "It is safe to receive support.",
    "I do not have to carry everything alone anymore.",
  ],
  "I am not enough": [
    "I am enough as I am.",
    "I do not have to prove my worth.",
    "I am safe even when I am not performing.",
    "I can relax and still be okay.",
  ],
  "I am not supported": [
    "I am supported now.",
    "It is safe to receive help.",
    "I do not have to hold everything alone anymore.",
    "I can let go and still be safe.",
  ],
  "I have to stay in control": [
    "I do not have to control everything to be safe.",
    "It is safe for me to soften.",
    "It is safe for me to let go little by little.",
    "I can relax and still be okay.",
  ],
  "I feel out of control": [
    "I can soften and still be safe.",
    "I do not have to control everything to be okay.",
    "It is safe for me to let go little by little.",
    "I am allowed to release my grip.",
  ],
  "I have to handle everything myself": [
    "I am allowed to ask for help.",
    "I do not have to do this alone.",
    "It is safe to receive support.",
    "I can let others in.",
  ],
  "Something will go wrong": [
    "I am safe in this moment.",
    "I do not have to brace for what has not happened.",
    "I can come back to what is true right now.",
    "My body does not have to stay on alert.",
  ],
  "I cannot relax": [
    "It is safe for me to rest.",
    "I am allowed to soften.",
    "Relaxing does not mean losing control.",
    "My body is allowed to be at ease.",
  ],
  "I will lose everything": [
    "I am here now.",
    "I do not have to live inside that fear anymore.",
    "I can release the expectation of loss.",
    "I am okay right now.",
  ],
  "I am not important": [
    "I am important.",
    "I matter.",
    "It is safe for me to take up space.",
    "I do not have to earn my place.",
  ],
  "I do not matter": [
    "I matter.",
    "My body matters.",
    "My needs matter.",
    "It is safe for me to take up space.",
  ],
  "My needs do not matter": [
    "My needs matter now.",
    "It is safe for me to have needs.",
    "It is safe for me to receive.",
    "I am allowed to ask for what I need.",
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
    "My body is allowed to rest.",
    "I can put some of this down.",
  ],
  "It is not safe to let go": [
    "It is safe for me to let go now.",
    "My body can release at its own pace.",
    "I can soften and still be safe.",
    "Letting go does not mean losing control.",
  ],
  "I am not worthy of love": [
    "I am worthy of love as I am.",
    "I do not have to earn love.",
    "It is safe for me to receive love now.",
    "I deserve connection and care.",
  ],
  "I am broken": [
    "I am not broken.",
    "I am a person who experienced hard things.",
    "My body is doing its best and always has been.",
    "I am allowed to heal.",
  ],
  "I am a burden": [
    "I am not a burden.",
    "My presence matters.",
    "It is safe for me to take up space and have needs.",
    "I am allowed to receive without guilt.",
  ],
  "I am not wanted": [
    "I am wanted.",
    "I belong here.",
    "It is safe for me to be present and seen.",
    "My presence is welcome.",
  ],
  "I am not good enough": [
    "I am good enough right now.",
    "I do not have to keep proving myself.",
    "I can rest in who I already am.",
    "I am enough.",
  ],
  "I have to be perfect": [
    "I am allowed to be imperfect.",
    "Mistakes do not make me unworthy.",
    "It is safe for me to be human.",
    "I can release the pressure to get everything right.",
  ],
  "I cannot trust anyone": [
    "It is safe for me to let some people in.",
    "Trust can be built slowly.",
    "I do not have to carry everything alone.",
    "Safe connection is possible.",
  ],
  "I cannot trust myself": [
    "I can trust myself.",
    "My body knows things.",
    "I am learning to listen to myself again.",
    "My instincts are valid.",
  ],
  "I am not allowed to say no": [
    "I am allowed to say no.",
    "My boundaries are safe.",
    "No is a complete sentence.",
    "I can protect my energy.",
  ],
  "I have to earn my place": [
    "I belong here.",
    "I do not have to earn my place.",
    "My presence is enough.",
    "I am allowed to just be.",
  ],
  "I will be abandoned": [
    "I am here now.",
    "I can build connections that are safe.",
    "I do not have to live in fear of being left.",
    "I am supported right now.",
  ],
  "I will be rejected": [
    "It is safe for me to show up.",
    "Rejection does not define my worth.",
    "I can be seen and still be okay.",
    "I am allowed to be myself.",
  ],
  "I am not lovable": [
    "I am lovable.",
    "I deserve connection.",
    "It is safe for me to let love in.",
    "I am worthy of being loved.",
  ],
  "It is not safe to be seen": [
    "It is safe for me to be seen.",
    "I can be visible and still be protected.",
    "My presence matters.",
    "I am allowed to take up space.",
  ],
  "It is not safe to speak up": [
    "My voice matters.",
    "It is safe for me to speak.",
    "I am allowed to take up space with my words.",
    "What I have to say is worth hearing.",
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

export default function InstallBeliefsPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");
  const unmetNeeds = searchParams.getAll("unmet");
  const ownWords = searchParams.get("ownWords") ?? "";
  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";
  const bodyArea = searchParams.get("area");

  const areaText = bodyArea?.trim() || "this area";

  const handPlacement = bodyArea?.trim()
    ? `Place your hand gently on your ${bodyArea.trim()}.`
    : "Place one hand on your chest and one on your belly.";

  const installBeliefs = useMemo(() => {
    const matched = selectedCore.flatMap((belief) => beliefFlipMap[belief] ?? []);
    const unique = Array.from(new Set(matched));
    return unique.length > 0 ? unique : fallbackBeliefs;
  }, [selectedCore]);

  const summaryHref = useMemo(() => {
    const params = new URLSearchParams();
    if (emotionsParam) params.set("emotions", emotionsParam);
    if (agesParam) params.set("ages", agesParam);
    if (bodyArea) params.set("area", bodyArea);
    selectedPatterns.forEach((p) => params.append("pattern", p));
    selectedCore.forEach((b) => params.append("core", b));
    unmetNeeds.forEach((n) => params.append("unmet", n));
    return `/session-summary?${params.toString()}`;
  }, [emotionsParam, agesParam, bodyArea, selectedPatterns, selectedCore, unmetNeeds]);

  return (
    <AppShell title="Install New Beliefs">
      <div className="space-y-6">

        {(unmetNeeds.length > 0 || ownWords) && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">What you needed — you can receive now</h2>
            <p className="text-sm leading-7 text-slate-700">Your body identified what it was longing for. It is safe to receive that now.</p>
            {unmetNeeds.length > 0 && (
              <div className="space-y-1 text-sm leading-7 text-slate-700">
                {unmetNeeds.map((need) => <p key={need}>• {need}</p>)}
              </div>
            )}
            {ownWords && <p className="text-sm leading-7 text-slate-600 italic">"{ownWords}"</p>}
            <p className="text-sm leading-7 text-slate-700">You are allowed to receive this now. Your body is ready.</p>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Put your hands on your body</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>{handPlacement}</p>
            <p>Let your body feel your presence, your support, and your safety.</p>
            <p>Gently breathe into {areaText} without forcing anything. Just let your breath find it.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Let your body soften</h2>
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
          <h2 className="text-xl font-semibold text-slate-900">Breathe and let go</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>Inhale slowly.</p>
            <p>Exhale and let your body drop.</p>
            <p>Again, inhale.</p>
            <p>Exhale, soften deeper.</p>
            <p>Let your body feel supported.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Let these truths install now</h2>
          <p className="text-sm leading-7 text-slate-700">Read each one slowly. Breathe between each one. Let your body feel the truth of these — not just your mind.</p>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {installBeliefs.map((belief) => (
              <p key={belief} className="font-medium text-emerald-900">• {belief}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Check in with your body</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>Notice what your body feels like now. Is there more softness, space, warmth, movement, or calm?</p>
            <p>Use your sway test to ask your body — is there another layer underneath this that is ready to be worked on today?</p>
            <p>If yes, start a new session with that layer. If no, your body is ready to rest and integrate.</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/body-awareness" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400 transition">
              Another layer is ready
            </Link>
            <Link href={summaryHref} className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800 transition">
              End session
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}