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
  releaseIntro: "Your body has been holding onto a pattern that once helped protect you. You do not have to carry it the same way anymore.",
  supportiveTruths: ["I am safe now.", "I am supported.", "I can let go.", "I do not have to hold this anymore."],
  bodyMessage: "Your body is allowed to soften. It does not need to stay in protection mode.",
};

const reframeMap: Record<string, Reframe> = {
  "I am not safe": {
    releaseIntro: "Your body may have learned that staying alert, guarded, or braced was necessary in order to protect you.",
    supportiveTruths: ["I am safe now.", "It is safe for me to soften.", "My body does not have to stay on guard like that anymore."],
    bodyMessage: "Your body can begin to let go of the need to stay braced for danger.",
  },
  "I am alone": {
    releaseIntro: "Your body may have learned that it had to carry everything alone, and that can create holding, pressure, and over-responsibility.",
    supportiveTruths: ["I am not alone now.", "I am supported.", "It is safe to receive support."],
    bodyMessage: "Your body can let go of the belief that it has to hold all of this by itself.",
  },
  "I am not enough": {
    releaseIntro: "Your body may have been holding the pressure of not feeling like enough, which can create striving, shutdown, tension, or self-protection.",
    supportiveTruths: ["I am enough as I am.", "I do not have to prove my worth.", "I can soften and still be okay."],
    bodyMessage: "Your body can release the pressure to perform, prove, or protect against not being enough.",
  },
  "I am not supported": {
    releaseIntro: "Your body may have learned to carry everything on its own. That made sense at the time, but you do not have to do that anymore.",
    supportiveTruths: ["I am supported now.", "I do not have to do everything alone.", "It is safe to receive help."],
    bodyMessage: "Your body can let go of the need to brace and carry everything.",
  },
  "I have to stay in control": {
    releaseIntro: "Your body may have learned that control was the only way to stay safe, which can create tension, gripping, and a fear of letting go.",
    supportiveTruths: ["I do not have to control everything to be safe.", "It is safe for me to soften.", "I can let go little by little."],
    bodyMessage: "Your body can release the pressure to stay tight, vigilant, and in control.",
  },
  "I feel out of control": {
    releaseIntro: "Your body may have learned that things felt unpredictable or unsafe, and that losing control meant something bad would happen.",
    supportiveTruths: ["I can soften and still be okay.", "I do not have to grip so tightly.", "It is safe for me to release control little by little."],
    bodyMessage: "Your body can begin to release the tension of trying to hold everything together.",
  },
  "I have to handle everything myself": {
    releaseIntro: "Your body may have learned that it had to do everything alone because relying on others did not feel safe or possible.",
    supportiveTruths: ["I am allowed to ask for help.", "I do not have to do this alone.", "It is safe to receive support."],
    bodyMessage: "Your body can release the pressure of having to handle everything by itself.",
  },
  "Something will go wrong": {
    releaseIntro: "Your body may have learned to anticipate danger before it happens, which can keep your system scanning, bracing, and unable to fully relax.",
    supportiveTruths: ["I am safe in this moment.", "My body does not have to keep anticipating danger.", "I can come back to what is true right now."],
    bodyMessage: "Your body can come back to the present instead of preparing for danger.",
  },
  "I cannot relax": {
    releaseIntro: "Your body may have learned that relaxing was not safe — that staying alert and ready was the only way to stay okay.",
    supportiveTruths: ["It is safe for me to rest.", "I am allowed to soften.", "Relaxing does not mean losing control."],
    bodyMessage: "Your body can begin to soften without feeling like it is losing safety.",
  },
  "I will lose everything": {
    releaseIntro: "Your body may have been carrying a deep fear of loss, collapse, or things falling apart, which can create clinging and pressure.",
    supportiveTruths: ["I am here now.", "I do not have to live inside that fear anymore.", "My body can release the expectation of loss."],
    bodyMessage: "Your body can let go of the need to prepare for everything falling apart.",
  },
  "I am not important": {
    releaseIntro: "Your body may have learned to shrink, stay quiet, or make itself small when it believed it was not important enough to be seen.",
    supportiveTruths: ["I am important.", "I matter.", "It is safe for me to take up space."],
    bodyMessage: "Your body can release the need to stay small or invisible in order to stay safe.",
  },
  "I do not matter": {
    releaseIntro: "Your body may have learned to suppress, shrink, or disconnect when it did not feel safe for your needs or feelings to matter.",
    supportiveTruths: ["I matter.", "My body matters.", "My needs matter."],
    bodyMessage: "Your body can release the need to stay small or disconnected in order to stay safe.",
  },
  "My needs do not matter": {
    releaseIntro: "Your body may have learned to suppress what it needed in order to stay connected, avoid conflict, or get through that time.",
    supportiveTruths: ["My needs matter now.", "It is safe for me to have needs.", "It is safe for me to receive support."],
    bodyMessage: "Your body can begin to soften out of suppression and overholding.",
  },
  "I have to stay strong": {
    releaseIntro: "Your body may have learned that softness was not safe and that holding it all in was the only way to survive.",
    supportiveTruths: ["I do not have to stay hard to stay safe.", "It is safe for me to soften.", "My body can release the need to overhold."],
    bodyMessage: "Your body is allowed to soften without falling apart.",
  },
  "I am responsible for everyone": {
    releaseIntro: "Your body may have taken on responsibility that never fully belonged to you, which can create chronic tension and overcaretaking.",
    supportiveTruths: ["I am not responsible for carrying everyone.", "I can release what is not mine.", "My body is allowed to rest."],
    bodyMessage: "Your body can set down what it has been overcarrying.",
  },
  "It is not safe to let go": {
    releaseIntro: "Your body may have learned that letting go was not safe, so holding on became the way it tried to protect you.",
    supportiveTruths: ["It is safe for me to let go now.", "My body can release at its own pace.", "I can soften and still be safe."],
    bodyMessage: "Your body can begin to loosen its grip without losing safety.",
  },
  "I am not worthy of love": {
    releaseIntro: "Your body may have learned that love was conditional or had to be earned, which can create a deep ache of unworthiness.",
    supportiveTruths: ["I am worthy of love as I am.", "I do not have to earn love.", "It is safe for me to receive love now."],
    bodyMessage: "Your body can release the belief that it has to be different to deserve love.",
  },
  "I am broken": {
    releaseIntro: "Your body may have come to believe that something was fundamentally wrong with it, which can create shame, hiding, and disconnection.",
    supportiveTruths: ["I am not broken.", "I am a person who experienced hard things.", "My body is doing its best and always has been."],
    bodyMessage: "Your body can begin to release the story that it is too damaged to heal.",
  },
  "I am a burden": {
    releaseIntro: "Your body may have learned to shrink its needs and suppress itself to avoid being too much for others.",
    supportiveTruths: ["I am not a burden.", "My presence matters.", "It is safe for me to take up space and have needs."],
    bodyMessage: "Your body can release the need to make itself smaller to protect others.",
  },
  "I am not wanted": {
    releaseIntro: "Your body may have stored the pain of feeling unwanted, invisible, or like it did not belong.",
    supportiveTruths: ["I am wanted.", "I belong here.", "It is safe for me to be present and seen."],
    bodyMessage: "Your body can release the protection it built around not feeling wanted.",
  },
  "I am not good enough": {
    releaseIntro: "Your body may have been holding a constant pressure to be better, do more, and prove itself in order to feel acceptable.",
    supportiveTruths: ["I am good enough right now.", "I do not have to keep proving myself.", "I can rest in who I already am."],
    bodyMessage: "Your body can release the exhaustion of striving to be enough.",
  },
  "I have to be perfect": {
    releaseIntro: "Your body may have learned that mistakes were dangerous and that perfection was the only way to stay safe or loved.",
    supportiveTruths: ["I am allowed to be imperfect.", "Mistakes do not make me unworthy.", "It is safe for me to be human."],
    bodyMessage: "Your body can release the pressure of having to get everything right.",
  },
  "I cannot trust anyone": {
    releaseIntro: "Your body may have learned that trusting others led to pain, so it built walls to stay protected.",
    supportiveTruths: ["It is safe for me to let some people in.", "Trust can be built slowly.", "I do not have to carry everything alone."],
    bodyMessage: "Your body can begin to soften the walls it built to stay safe.",
  },
  "I cannot trust myself": {
    releaseIntro: "Your body may have lost faith in its own instincts or judgment after experiences that felt confusing or unsafe.",
    supportiveTruths: ["I can trust myself.", "My body knows things.", "I am learning to listen to myself again."],
    bodyMessage: "Your body can begin to restore its relationship with its own inner knowing.",
  },
  "I am not allowed to say no": {
    releaseIntro: "Your body may have learned that saying no was dangerous — that it would lead to rejection, punishment, or loss of love.",
    supportiveTruths: ["I am allowed to say no.", "My boundaries are safe.", "No is a complete sentence."],
    bodyMessage: "Your body can release the fear of what happens when it sets a boundary.",
  },
  "I have to earn my place": {
    releaseIntro: "Your body may have learned that belonging was conditional and that it had to constantly prove its worth to stay included.",
    supportiveTruths: ["I belong here.", "I do not have to earn my place.", "My presence is enough."],
    bodyMessage: "Your body can release the exhaustion of constantly trying to earn its right to be here.",
  },
  "I will be abandoned": {
    releaseIntro: "Your body may have been bracing for loss and holding on tightly to prevent the pain of being left.",
    supportiveTruths: ["I am here now.", "I can build connections that are safe.", "I do not have to live in fear of being left."],
    bodyMessage: "Your body can release the bracing it has been doing to prepare for abandonment.",
  },
  "I will be rejected": {
    releaseIntro: "Your body may have learned to hide, shrink, or hold back to avoid the pain of rejection.",
    supportiveTruths: ["It is safe for me to show up.", "Rejection does not define my worth.", "I can be seen and still be okay."],
    bodyMessage: "Your body can release the need to hide itself to stay safe from rejection.",
  },
  "I am not lovable": {
    releaseIntro: "Your body may have concluded that something about it made it fundamentally unlovable, which can create deep isolation and self-protection.",
    supportiveTruths: ["I am lovable.", "I deserve connection.", "It is safe for me to let love in."],
    bodyMessage: "Your body can release the belief that it is too much or not enough to be loved.",
  },
  "It is not safe to be seen": {
    releaseIntro: "Your body may have learned that being visible led to criticism, shame, or danger, so staying hidden felt like the safest option.",
    supportiveTruths: ["It is safe for me to be seen.", "I can be visible and still be protected.", "My presence matters."],
    bodyMessage: "Your body can begin to release the need to stay hidden in order to stay safe.",
  },
  "It is not safe to speak up": {
    releaseIntro: "Your body may have learned that using its voice led to punishment, dismissal, or conflict, so staying silent felt safer.",
    supportiveTruths: ["My voice matters.", "It is safe for me to speak.", "I am allowed to take up space with my words."],
    bodyMessage: "Your body can begin to release the fear of what happens when it speaks.",
  },
};

export default function RegulationPage() {
  const searchParams = useSearchParams();

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");
  const unmetNeeds = searchParams.getAll("unmet");
  const ownWords = searchParams.get("ownWords") ?? "";
  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";

  const selectedEmotions = emotionsParam
    ? emotionsParam.split(",").map((e) => e.trim()).filter(Boolean)
    : [];

  const selectedAges = agesParam
    ? agesParam.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const tailored = useMemo(() => {
    const matched = selectedCore.map(
      (belief) => reframeMap[belief] ?? fallbackReframe
    );
    const releaseIntro = matched[0]?.releaseIntro ?? fallbackReframe.releaseIntro;
    const supportiveTruths = Array.from(
      new Set(matched.flatMap((item) => item.supportiveTruths))
    ).slice(0, 6);
    const bodyMessages = Array.from(
      new Set(matched.map((item) => item.bodyMessage))
    );
    return { releaseIntro, supportiveTruths, bodyMessages };
  }, [selectedCore]);

  const installBeliefsHref = useMemo(() => {
    const params = new URLSearchParams();
    if (emotionsParam) params.set("emotions", emotionsParam);
    if (agesParam) params.set("ages", agesParam);
    selectedPatterns.forEach((p) => params.append("pattern", p));
    selectedCore.forEach((b) => params.append("core", b));
    unmetNeeds.forEach((n) => params.append("unmet", n));
    if (ownWords) params.set("ownWords", ownWords);
    return `/install-beliefs?${params.toString()}`;
  }, [emotionsParam, agesParam, selectedPatterns, selectedCore, unmetNeeds, ownWords]);

  return (
    <AppShell title="Release and Reprogram">
      <div className="space-y-6">

        {/* Step 1 — Thank the body */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 1 — Honor your body</h2>
          <p className="text-sm leading-7 text-slate-700">Before anything else, take a moment to thank your body.</p>
          <p className="text-sm leading-7 text-slate-700">
            Every emotion, belief, and pattern you just uncovered was your nervous system doing its best to keep you safe. It was not broken. It was not wrong. It was protecting you with everything it had at the time.
          </p>
          {selectedEmotions.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">
              Feeling <span className="font-medium">{selectedEmotions.join(", ")}</span> made sense. Your body learned that these responses were necessary to survive what was happening.
            </p>
          )}
          {selectedPatterns.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 space-y-1">
              <p className="font-medium text-slate-900 mb-1">Patterns your body used to protect you:</p>
              {selectedPatterns.map((pattern) => (
                <p key={pattern}>• {pattern}</p>
              ))}
            </div>
          )}
          <p className="text-sm leading-7 text-slate-700 italic">
            "Thank you, body, for protecting me. You did the best you could with what you had. I see you. I honor you."
          </p>
        </div>

        {/* Step 2 — Acknowledge the unmet need */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 2 — Acknowledge what that part of you needed</h2>
          <p className="text-sm leading-7 text-slate-700">
            {selectedAges.length > 0
              ? `At ${selectedAges.join(", ")}, there was a part of you that needed something it did not receive.`
              : "There was a part of you that needed something it did not receive."}
          </p>
          {unmetNeeds.length > 0 && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm leading-7 text-slate-700 space-y-1">
              <p className="font-medium text-slate-900 mb-1">What that part of you needed:</p>
              {unmetNeeds.map((need) => (
                <p key={need}>• {need}</p>
              ))}
            </div>
          )}
          {ownWords && (
            <p className="text-sm leading-7 text-slate-600 italic">"{ownWords}"</p>
          )}
          <p className="text-sm leading-7 text-slate-700">
            That need was real. That younger part of you was not wrong for having it. It makes complete sense that your body held on — because no one told it that it was okay to let go.
          </p>
          <p className="text-sm leading-7 text-slate-700 italic">
            "I see what you needed. I am sorry you did not get it then. You are allowed to receive it now."
          </p>
        </div>

        {/* Step 3 — Supportive truths */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 3 — Let these truths land</h2>
          <p className="text-sm leading-7 text-slate-700">
            Read each of these slowly. Let them move through your body, not just your mind. Breathe between each one.
          </p>
          <p className="text-sm leading-7 text-slate-700">{tailored.releaseIntro}</p>
          <div className="space-y-2 text-sm leading-7 text-slate-700">
            {tailored.supportiveTruths.map((truth) => (
              <p key={truth}>• {truth}</p>
            ))}
          </div>
          {tailored.bodyMessages.map((msg, i) => (
            <p key={i} className="text-sm leading-7 text-slate-700">{msg}</p>
          ))}
        </div>

        {/* Step 4 — Physical release */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 4 — Release it from your body</h2>
          <p className="text-sm leading-7 text-slate-700">Check in right now. Did you notice any of the following during this session?</p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 space-y-1">
            <p>• Crying or watery eyes</p>
            <p>• Yawning or deep sighing</p>
            <p>• Goosebumps or chills</p>
            <p>• A shift, softening, or movement in the body sensation</p>
            <p>• Tingling, warmth, or a sense of something lifting</p>
          </div>
          <p className="text-sm leading-7 text-slate-700">If yes — that is your nervous system releasing. Honor it. Stay with it. Let it move through completely.</p>
          <p className="text-sm leading-7 text-slate-700">
            If you did not feel a natural release yet, that is okay. Your body may need a little help moving the energy out. Animals in the wild shake their entire body after a stressful event — and this is exactly what your nervous system needs to do too.
          </p>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm leading-7 text-slate-700 space-y-2">
            <p className="font-semibold text-emerald-800">Shaking release — do this now:</p>
            <p>1. Stand up if you can, or stay seated if needed.</p>
            <p>2. Start shaking your hands and arms loosely — like you are flicking water off your fingertips.</p>
            <p>3. Let the shaking move up into your shoulders, chest, and torso.</p>
            <p>4. If it feels right, let your legs and whole body join in.</p>
            <p>5. Shake for 20 to 30 seconds — or longer if it feels good.</p>
            <p>6. When you stop, stand still. Take 3 slow deep breaths. Notice what shifted.</p>
          </div>
          <p className="text-sm leading-7 text-slate-700 italic">This is not a technique. This is biology. You are giving your nervous system permission to complete what it started.</p>
        </div>

        {/* Step 5 — Check back in */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 5 — Check back in with your body</h2>
          <p className="text-sm leading-7 text-slate-700">
            Go back to the sensation you noticed at the very beginning of this session — the shape, color, size, or texture you found in your body.
          </p>
          <p className="text-sm leading-7 text-slate-700">
            Has it shifted at all, even slightly? Has the color changed, the size shrunk, the texture softened, or the location moved?
          </p>
          <p className="text-sm leading-7 text-slate-700">If yes — your body has already begun to release. That is real. That matters.</p>
          <p className="text-sm leading-7 text-slate-700">
            If it has not shifted yet, that is okay too. Some patterns have many layers. You have already done something important today just by seeing it clearly.
          </p>
        </div>

        {/* Step 6 — Move to install */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Step 6 — Install what is true now</h2>
          <p className="text-sm leading-7 text-slate-700">
            Your body has done the hard work. It has been seen, honored, and given permission to release. Now it is ready to receive something new.
          </p>
          <p className="text-sm leading-7 text-slate-700">
            The next step is installing the new beliefs that are actually true for you today — so your nervous system has something real to anchor into.
          </p>
          <Link
            href={installBeliefsHref}
            className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800 transition"
          >
            Continue to install new beliefs
          </Link>
        </div>

      </div>
    </AppShell>
  );
}