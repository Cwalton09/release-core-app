"use client";

import Link from "next/link";
import { useMemo, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const beliefFlipMap: Record<string, string[]> = {
  "I am not safe": ["I am safe now.", "It is safe for me to soften.", "I can rest and still be safe.", "I can let go while I sleep.", "My body does not have to stay on guard anymore."],
  "I am alone": ["I am not alone.", "I am supported.", "It is safe for me to receive support.", "I do not have to carry everything alone anymore.", "I can rest and feel held."],
  "I am not enough": ["I am enough as I am.", "I do not have to prove my worth.", "I am safe even when I rest.", "I can sleep without holding that pressure anymore."],
  "I am not supported": ["I am supported now.", "It is safe for me to receive help.", "I do not have to hold everything alone anymore.", "I can relax and still be okay."],
  "I have to stay in control": ["I do not have to control everything to be safe.", "It is safe for me to soften.", "I can relax and still be okay.", "I can sleep without gripping."],
  "I feel out of control": ["I can soften and still be safe.", "I do not have to control everything to be okay.", "It is safe for me to let go little by little.", "I am allowed to release my grip."],
  "I have to handle everything myself": ["I am allowed to ask for help.", "I do not have to do this alone.", "It is safe to receive support.", "I can let others in."],
  "Something will go wrong": ["I am safe in this moment.", "I do not have to brace for what has not happened.", "I can rest in what is true right now.", "My body does not have to stay on alert."],
  "I cannot relax": ["It is safe for me to rest.", "I am allowed to soften.", "Relaxing does not mean losing control.", "My body is allowed to be at ease."],
  "I will lose everything": ["I am here now.", "I do not have to live inside that fear anymore.", "I can sleep without preparing for everything to fall apart.", "I am okay right now."],
  "I am not important": ["I am important.", "I matter.", "It is safe for me to take up space.", "I do not have to earn my place."],
  "I do not matter": ["I matter.", "My body matters.", "My needs matter.", "It is safe for me to exist fully."],
  "My needs do not matter": ["My needs matter now.", "It is safe for me to have needs.", "It is safe for me to receive.", "I can rest and let my body be supported."],
  "I have to stay strong": ["I do not have to stay hard to stay safe.", "It is safe for me to soften.", "Softness is not weakness.", "I am allowed to rest."],
  "I am responsible for everyone": ["I am not responsible for carrying everyone.", "I can release what is not mine.", "I am allowed to rest.", "I can sleep without holding that weight."],
  "It is not safe to let go": ["It is safe for me to let go now.", "I can soften and still be safe.", "I can let go while I sleep.", "Letting go does not mean losing control."],
  "I am not worthy of love": ["I am worthy of love as I am.", "I do not have to earn love.", "It is safe for me to receive love now.", "I deserve connection and care."],
  "I am broken": ["I am not broken.", "I am a person who experienced hard things.", "My body is doing its best and always has been.", "I am allowed to heal."],
  "I am a burden": ["I am not a burden.", "My presence matters.", "It is safe for me to take up space and have needs.", "I am allowed to receive without guilt."],
  "I am not wanted": ["I am wanted.", "I belong here.", "It is safe for me to be present and seen.", "My presence is welcome."],
  "I am not good enough": ["I am good enough right now.", "I do not have to keep proving myself.", "I can rest in who I already am.", "I am enough."],
  "I have to be perfect": ["I am allowed to be imperfect.", "Mistakes do not make me unworthy.", "It is safe for me to be human.", "I can sleep without holding the pressure to be perfect."],
  "I cannot trust anyone": ["It is safe for me to let some people in.", "Trust can be built slowly.", "I do not have to carry everything alone.", "Safe connection is possible."],
  "I cannot trust myself": ["I can trust myself.", "My body knows things.", "I am learning to listen to myself again.", "My instincts are valid."],
  "I am not allowed to say no": ["I am allowed to say no.", "My boundaries are safe.", "No is a complete sentence.", "I can protect my energy."],
  "I have to earn my place": ["I belong here.", "I do not have to earn my place.", "My presence is enough.", "I am allowed to just be."],
  "I will be abandoned": ["I am here now.", "I can build connections that are safe.", "I do not have to live in fear of being left.", "I am supported right now."],
  "I will be rejected": ["It is safe for me to show up.", "Rejection does not define my worth.", "I can be seen and still be okay.", "I am allowed to be myself."],
  "I am not lovable": ["I am lovable.", "I deserve connection.", "It is safe for me to let love in.", "I am worthy of being loved."],
  "It is not safe to be seen": ["It is safe for me to be seen.", "I can be visible and still be protected.", "My presence matters.", "I am allowed to take up space."],
  "It is not safe to speak up": ["My voice matters.", "It is safe for me to speak.", "I am allowed to take up space with my words.", "What I have to say is worth hearing."],
};

const beliefFlipMapBiblical: Record<string, string[]> = {
  "I am not safe": ["God is my refuge and I am safe in Him.", "I am held and protected tonight.", "I can rest — He is watching over me.", "I do not have to stay on guard. He guards me."],
  "I am alone": ["I am never alone. God is with me.", "He has not left me and He will not.", "I am held by something greater than I can see.", "I can rest knowing I am not carrying this alone."],
  "I am not enough": ["God says I am enough. He made me on purpose.", "I do not have to earn what He has already given me.", "I am enough because He says I am.", "I can rest without proving anything."],
  "I am not supported": ["God is my support and my strength.", "I am not holding this alone — He is holding me.", "It is safe to receive. He provides.", "I can let go and trust that I am carried."],
  "I have to stay in control": ["I can release control to the One who holds all things.", "God's hands are more steady than mine.", "It is safe to let go — He is in control.", "I can rest without gripping."],
  "I feel out of control": ["God is in control even when I am not.", "I can release my grip and trust Him.", "It is safe to let go — He is holding what I release.", "I do not have to carry this. He does."],
  "I have to handle everything myself": ["I was never meant to carry this alone.", "God invites me to bring this to Him.", "I can ask for help — from Him and from others.", "It is safe to receive."],
  "Something will go wrong": ["God knows what is ahead and He is already there.", "I do not have to brace for what has not happened.", "I can trust what I cannot see.", "I am safe in this moment."],
  "I cannot relax": ["He gives rest to those He loves.", "I am allowed to be still.", "Resting is an act of trust.", "My body is allowed to be at peace tonight."],
  "I will lose everything": ["What God has for me cannot be taken.", "I do not have to live inside that fear.", "He is my provider and my keeper.", "I am okay right now, in His hands."],
  "I am not important": ["God knows my name. I am important to Him.", "He sees me and He chose me.", "I do not have to earn my place — He gave it to me.", "I matter to God."],
  "I do not matter": ["I matter to God deeply and completely.", "He formed me and He does not make mistakes.", "My needs matter to Him.", "It is safe for me to exist fully — He made space for me."],
  "My needs do not matter": ["God sees my needs and He cares about them.", "I am allowed to bring my needs to Him.", "It is safe to receive — He is a good giver.", "My needs matter to the One who created me."],
  "I have to stay strong": ["His strength is made perfect in my weakness.", "I do not have to hold it together — He holds me.", "Softness is not weakness. It is trust.", "I am allowed to rest in Him tonight."],
  "I am responsible for everyone": ["He is the one who carries the world — not me.", "I can release what was never mine to hold.", "God is responsible for what I cannot control.", "I can sleep without holding that weight."],
  "It is not safe to let go": ["It is safe to let go — He catches what I release.", "I can open my hands and trust Him with what falls.", "Letting go is not losing. It is trusting.", "He is steady when I soften."],
  "I am not worthy of love": ["God loves me not because of what I do but because of who I am.", "His love is not conditional.", "I am worthy because He says I am.", "I can receive His love tonight."],
  "I am broken": ["God does not make broken things.", "He formed me and He does not make mistakes.", "I am being restored — He does not discard what He loves.", "I am whole in His eyes."],
  "I am a burden": ["I am not a burden to God. He delights in me.", "He invites me to come to Him with everything.", "My needs do not push Him away.", "I am welcome in His presence."],
  "I am not wanted": ["God chose me before I was born.", "I am wanted by the One who made me.", "He has always had a place for me.", "I belong to Him."],
  "I am not good enough": ["God does not see me through the lens of good enough.", "He sees me through the lens of love.", "I do not have to perform for His approval.", "I already have it."],
  "I have to be perfect": ["God does not ask for my perfection. He offers His.", "I can rest in His grace tonight.", "I am enough because He says so.", "I can let go of perfect."],
  "I cannot trust anyone": ["God is trustworthy even when people are not.", "He will not betray me.", "I can bring what I am afraid to trust to Him.", "He is safe."],
  "I cannot trust myself": ["God placed wisdom and knowing inside me.", "He speaks through the still small voice within.", "I can learn to trust what He put in me.", "My instincts are not broken."],
  "I am not allowed to say no": ["God gave me the ability to set limits.", "My boundaries are not a sin.", "He honors my humanity and so can I.", "I am allowed to protect what He placed in me."],
  "I have to earn my place": ["God gave me my place. I did not earn it and I cannot lose it.", "I belong because He says I belong.", "I can rest in that tonight.", "My place is secure in Him."],
  "I will be abandoned": ["God will never leave me or forsake me.", "He is with me even now.", "I do not have to brace for His departure.", "He stays."],
  "I will be rejected": ["God accepted me fully.", "There is no version of me He turns away.", "I can show up as I am.", "He does not reject what He made."],
  "I am not lovable": ["God so loved me that He gave everything.", "I am deeply and completely lovable to Him.", "His love for me does not waver.", "I can let that in tonight."],
  "It is not safe to be seen": ["God sees me fully and loves what He sees.", "Being seen by Him is safe.", "I do not have to hide from the One who made me.", "He sees me and He stays."],
  "It is not safe to speak up": ["God gave me a voice and it matters.", "He listens when I speak.", "I am allowed to bring my words to Him and to others.", "My voice was made on purpose."],
};

const fallbackBeliefs = ["I am safe now.", "I am not alone.", "I am supported.", "I can relax and still be okay.", "I can let go and still be safe.", "My body does not have to protect me like that anymore."];
const fallbackBeliefsBiblical = ["God is with me tonight.", "I am safe in His hands.", "I am not alone — He is here.", "I can rest and trust Him.", "He holds what I release.", "I am enough because He says I am."];

export default function SessionSummaryContent() {
  const searchParams = useSearchParams();
  const savedRef = useRef(false);
  const [standardOpen, setStandardOpen] = useState(false);
  const [biblicalOpen, setBiblicalOpen] = useState(false);

  const selectedCore = searchParams.getAll("core");
  const selectedPatterns = searchParams.getAll("pattern");
  const unmetNeeds = searchParams.getAll("unmet");
  const ownWords = searchParams.get("ownWords") ?? "";
  const emotionsParam = searchParams.get("emotions") ?? "";
  const agesParam = searchParams.get("ages") ?? "";
  const bodyArea = searchParams.get("area");
  const whoParam = searchParams.get("who") ?? "";

  const selectedEmotions = emotionsParam ? emotionsParam.split(",").map((e) => e.trim()).filter(Boolean) : [];
  const selectedAges = agesParam ? agesParam.split(",").map((a) => a.trim()).filter(Boolean) : [];
  const selectedWho = whoParam ? whoParam.split(",").map((w) => w.trim()).filter(Boolean) : [];

  const nightlyBeliefs = useMemo(() => {
    const matched = selectedCore.flatMap((belief) => beliefFlipMap[belief] ?? []);
    const unique = Array.from(new Set(matched));
    return unique.length > 0 ? unique : fallbackBeliefs;
  }, [selectedCore]);

  const nightlyBeliefsBiblical = useMemo(() => {
    const matched = selectedCore.flatMap((belief) => beliefFlipMapBiblical[belief] ?? []);
    const unique = Array.from(new Set(matched));
    return unique.length > 0 ? unique : fallbackBeliefsBiblical;
  }, [selectedCore]);

  const summaryText = useMemo(() => {
    if (selectedCore.length === 0) return "Your body may have released a layer today. Even if you do not have every answer yet, awareness is already a shift.";
    if (selectedCore.length === 1) return `Today your body brought forward the belief "${selectedCore[0]}." This pattern may have once helped protect you, even if it no longer reflects where you are now.`;
    return `Today your body brought forward these beliefs: ${selectedCore.join(", ")}. These patterns may have once helped protect you, even if they no longer reflect where you are now.`;
  }, [selectedCore]);

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    const saveSession = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        console.log("SAVE SESSION - user:", user);
        console.log("SAVE SESSION - userError:", userError);
        if (!user) { console.log("SAVE SESSION - no user found, aborting"); return; }

        const insertData = {
          user_id: user.id,
          emotions: emotionsParam || null,
          ages: agesParam || null,
          who_involved: whoParam || null,
          what_happened: ownWords || null,
          core_beliefs: selectedCore.join(", ") || null,
          patterns: selectedPatterns.join(", ") || null,
          unmet_need: unmetNeeds.join(", ") || null,
          own_words: ownWords || null,
          symptoms: searchParams.get("symptoms") || null,
          activation_age: searchParams.get("activationAge") || null,
          feeling: searchParams.get("feeling") || null,
          shape: searchParams.get("shape") || null,
          color: searchParams.get("color") || null,
          size: searchParams.get("size") || null,
          texture: searchParams.get("texture") || null,
          body_location: searchParams.get("area") || null,
        };

        const { data, error } = await supabase.from("sessions").insert(insertData).select();
        console.log("SAVE SESSION - result data:", data);
        console.log("SAVE SESSION - result error:", error);
      } catch (err) {
        console.error("SAVE SESSION - caught error:", err);
      }
    };

    saveSession();
  }, []);

  const bodyPlacementText = bodyArea?.trim()
    ? `Place your hand gently on your ${bodyArea.trim()}.`
    : "Place one hand on your chest and one hand on your belly.";

  const ageText = selectedAges.length > 0 ? selectedAges.join(", ") : "a younger age";
  const whoText = selectedWho.length > 0 ? selectedWho.join(", ") : "someone in your life";
  const emotionText = selectedEmotions.length > 0 ? selectedEmotions.join(", ") : "what came up today";

  const downloadScript = (biblical: boolean) => {
    const beliefs = biblical ? nightlyBeliefsBiblical : nightlyBeliefs;
    const title = biblical ? "Biblical Nighttime Integration Script" : "Nighttime Integration Script";
    const closing = biblical ? "Goodnight. He is with you. 🌙" : "Goodnight. 🌙";
    const bodyPlacement = bodyArea?.trim()
      ? `Place your hand gently on your ${bodyArea.trim()}.`
      : "Place one hand on your chest and one hand on your belly.";
    const date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const content = `
RELEASE CORE
${title}
${date}

---

BEGIN HERE — BODY RESET

Step 1 — Collarbone Tap
Tap lightly on either collarbone point and say:
"Body, the danger is over. You can let this go now."

Step 2 — Jaw Release
Gently open and close your jaw, side to side for 5 to 10 seconds.
Say: "I release old reactions."

Step 3 — Exhale Drop
Let your shoulders fall while exhaling through your mouth.
Say: "My body can stand down."

Step 4 — Sweep the Body
Take both hands and sweep down your chest, ribs, stomach, hips like brushing off dust.
Say: "This pattern is erased."

Step 5 — Replace the Pattern
Place your hand on your heart.
Say: "My new baseline is calm. My new identity is healed."

---

30-SECOND VAGUS NERVE RESET

Step 1 — Look to the Right (15 seconds)
Hold your eyes far right without moving your head until you feel a sigh, swallow, or yawn.

Step 2 — Look to the Left (15 seconds)
Same thing — eyes far left until you sigh or swallow again.

---

SLEEP REPROGRAMMING SCRIPT

Lie in bed. Put one hand on your heart and one on your lower belly.
Breathe in for 4 seconds. Out through your mouth for 8 seconds.

Then repeat softly:

My body knows how to heal.
My nervous system knows how to relax.
Every cell is remembering peace.
I am safe while I sleep.
My body is switching to repair mode now.

---

THE TRUTH MY NERVOUS SYSTEM IS READY TO HEAR

Around ${ageText}, something happened that involved ${whoText}. My body felt ${emotionText}. And from that, it formed a belief that made complete sense at the time.

Tonight I correct those beliefs. Gently. Slowly.

${beliefs.map((b) => `• ${b}`).join("\n")}

---

IDENTITY IMPRINT

I am no longer in healing mode.
I am already healed.
My body is simply maintaining my health.

${bodyPlacement}

Breathe in for 4. Out for 8.

Everything that is not mine dissolves as I sleep.

---

I CARRY THESE INTO SLEEP

${beliefs.join("\n")}

${closing}

---
Release Core | release-core.com
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `release-core-nighttime-script-${biblical ? "biblical" : "standard"}-${date.replace(/,/g, "").replace(/ /g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Session Summary">
      <div className="space-y-6">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">What came up in this session</h2>
          <p className="text-sm leading-7 text-slate-700">{summaryText}</p>
          {selectedEmotions.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">Your body brought forward these emotions: <span className="font-medium">{selectedEmotions.join(", ")}</span>.</p>
          )}
          {selectedAges.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">This connected to experiences around <span className="font-medium">{selectedAges.join(", ")}</span>.</p>
          )}
          {selectedWho.length > 0 && (
            <p className="text-sm leading-7 text-slate-700">The event involved: <span className="font-medium">{selectedWho.join(", ")}</span>.</p>
          )}
          {unmetNeeds.length > 0 && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm leading-7 text-slate-700 space-y-1">
              <p className="font-medium text-slate-900 mb-1">What your body needed and did not get:</p>
              {unmetNeeds.map((need) => <p key={need}>• {need}</p>)}
            </div>
          )}
          {ownWords && <p className="text-sm leading-7 text-slate-600 italic">"{ownWords}"</p>}
          {selectedPatterns.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              <p className="font-medium text-slate-900 mb-2">Patterns your body was protecting through:</p>
              <div className="space-y-1">{selectedPatterns.map((pattern) => <p key={pattern}>• {pattern}</p>)}</div>
            </div>
          )}
          {selectedCore.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCore.map((belief) => (
                <span key={belief} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{belief}</span>
              ))}
            </div>
          )}
        </div>

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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">🌙 Your nighttime integration script</h2>
          <div className="text-sm leading-7 text-slate-700 space-y-3">
            <p className="font-medium text-slate-900">When to use this:</p>
            <p>Read this script tonight as you are lying in bed with the lights off or dimmed, right as you are beginning to drift toward sleep. Do not read it earlier in the day — the timing matters.</p>
            <p className="font-medium text-slate-900">Why it works:</p>
            <p>In the moments just before you fall asleep, your brain shifts into the hypnagogic state — a deeply receptive window where your subconscious becomes wide open. New beliefs can move in without being filtered or blocked. We are using that window intentionally to let what your body uncovered today complete its work while you rest.</p>
            <p>Read slowly. Breathe between each line. Let the words move through your body, not just your mind.</p>
          </div>
          <p className="text-sm font-medium text-slate-900 pt-2">Choose your script:</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStandardOpen(!standardOpen)} className={`rounded-2xl border p-4 text-left transition space-y-1 ${standardOpen ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white hover:border-emerald-400"}`}>
              <p className="text-base">🌿</p>
              <p className="font-semibold text-sm">Standard</p>
              <p className={`text-xs leading-5 ${standardOpen ? "text-emerald-100" : "text-slate-500"}`}>Grounded in the body and nervous system</p>
            </button>
            <button onClick={() => setBiblicalOpen(!biblicalOpen)} className={`rounded-2xl border p-4 text-left transition space-y-1 ${biblicalOpen ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white hover:border-emerald-400"}`}>
              <p className="text-base">✝️</p>
              <p className="font-semibold text-sm">Biblical</p>
              <p className={`text-xs leading-5 ${biblicalOpen ? "text-emerald-100" : "text-slate-500"}`}>Woven with faith and the presence of God</p>
            </button>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => downloadScript(false)} className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 transition">⬇ Download Standard</button>
            <button onClick={() => downloadScript(true)} className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 transition">⬇ Download Biblical</button>
          </div>
        </div>

        {standardOpen && (
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm space-y-6 text-sm leading-7 text-slate-700">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Body Reset — Begin here</p>
              <div className="space-y-4">
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 1 — Collarbone Tap</p>
                  <p>Tap lightly on either collarbone point and say:</p>
                  <p className="italic text-slate-600">"Body, the danger is over. You can let this go now."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 2 — Jaw Release</p>
                  <p>Gently open and close your jaw, side to side for 5 to 10 seconds.</p>
                  <p className="italic text-slate-600">Say: "I release old reactions."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 3 — Exhale Drop</p>
                  <p>Let your shoulders fall while exhaling through your mouth.</p>
                  <p className="italic text-slate-600">Say: "My body can stand down."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 4 — Sweep the Body</p>
                  <p>Take both hands and sweep down your chest, ribs, stomach, hips like you are brushing off dust.</p>
                  <p className="italic text-slate-600">Say: "This pattern is erased."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 5 — Replace the Pattern</p>
                  <p>Place your hand on your heart.</p>
                  <p className="italic text-slate-600">Say: "My new baseline is calm. My new identity is healed."</p>
                </div>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">30-Second Vagus Nerve Reset</p>
              <div className="space-y-3">
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 1 — Look to the Right (15 seconds)</p>
                  <p>Hold your eyes far right without moving your head until you feel a sigh, swallow, or yawn. This is the vagus nerve switching on.</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 2 — Look to the Left (15 seconds)</p>
                  <p>Same thing — eyes far left until you sigh or swallow again. You will feel lighter and more grounded.</p>
                </div>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Sleep Reprogramming Script</p>
              <p>Lie in bed. Put one hand on your heart and one on your lower belly. Breathe in for 4 seconds. Out through your mouth for 8 seconds.</p>
              <p>Then repeat softly:</p>
              <div className="border-l-2 border-emerald-400 pl-5 space-y-2 italic text-slate-600">
                <p>My body knows how to heal.</p>
                <p>My nervous system knows how to relax.</p>
                <p>Every cell is remembering peace.</p>
                <p>I am safe while I sleep.</p>
                <p>My body is switching to repair mode now.</p>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">The truth my nervous system is ready to hear</p>
              <p>Around {ageText}, something happened that involved {whoText}. My body felt {emotionText}. And from that, it formed a belief that made complete sense at the time.</p>
              <p>Tonight I correct those beliefs. Gently. Slowly.</p>
              <div className="space-y-3">
                {nightlyBeliefs.map((belief) => (
                  <div key={belief} className="border-l-2 border-emerald-400 pl-5 italic text-slate-600"><p>{belief}</p></div>
                ))}
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Identity Imprint</p>
              <div className="border-l-2 border-emerald-400 pl-5 space-y-2 italic text-slate-600">
                <p>I am no longer in healing mode.</p>
                <p>I am already healed.</p>
                <p>My body is simply maintaining my health.</p>
              </div>
              <p>{bodyPlacementText}</p>
              <p>Breathe in for 4. Out for 8.</p>
              <p className="italic text-slate-600">Everything that is not mine dissolves as I sleep.</p>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-widest text-slate-400">I carry these into sleep</p>
              <div className="space-y-2">{nightlyBeliefs.map((belief) => <p key={belief} className="text-base font-medium text-slate-800">{belief}</p>)}</div>
              <p className="text-slate-500 text-sm mt-4">Goodnight. 🌙</p>
            </div>
          </div>
        )}

        {biblicalOpen && (
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm space-y-6 text-sm leading-7 text-slate-700">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Body Reset — Begin here</p>
              <div className="space-y-4">
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 1 — Collarbone Tap</p>
                  <p>Tap lightly on either collarbone point and say:</p>
                  <p className="italic text-slate-600">"Body, the danger is over. God is here. You can let this go now."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 2 — Jaw Release</p>
                  <p>Gently open and close your jaw, side to side for 5 to 10 seconds.</p>
                  <p className="italic text-slate-600">Say: "I release old reactions. God is renewing my mind."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 3 — Exhale Drop</p>
                  <p>Let your shoulders fall while exhaling through your mouth.</p>
                  <p className="italic text-slate-600">Say: "My body can stand down. He is standing guard."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 4 — Sweep the Body</p>
                  <p>Take both hands and sweep down your chest, ribs, stomach, hips.</p>
                  <p className="italic text-slate-600">Say: "This pattern is erased. I am made new."</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 5 — Replace the Pattern</p>
                  <p>Place your hand on your heart.</p>
                  <p className="italic text-slate-600">Say: "My new baseline is peace in Him. My new identity is healed and whole."</p>
                </div>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">30-Second Vagus Nerve Reset</p>
              <div className="space-y-3">
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 1 — Look to the Right (15 seconds)</p>
                  <p>Hold your eyes far right until you feel a sigh, swallow, or yawn. This is your body coming into rest.</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-2">
                  <p className="font-semibold text-slate-800">Step 2 — Look to the Left (15 seconds)</p>
                  <p>Eyes far left until you sigh or swallow. You will feel lighter — that is peace settling in.</p>
                </div>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Sleep Reprogramming Script</p>
              <p>Lie in bed. Put one hand on your heart and one on your lower belly. Breathe in for 4 seconds. Out through your mouth for 8 seconds.</p>
              <p>Then repeat softly:</p>
              <div className="border-l-2 border-emerald-400 pl-5 space-y-2 italic text-slate-600">
                <p>My body knows how to heal — God designed it this way.</p>
                <p>My nervous system knows how to relax — He gives rest to those He loves.</p>
                <p>Every cell is remembering peace — His peace that passes understanding.</p>
                <p>I am safe while I sleep — He watches over me.</p>
                <p>My body is switching to repair mode now — He restores.</p>
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">The truth He says about me</p>
              <p>Around {ageText}, something happened that involved {whoText}. My body felt {emotionText}. God saw what happened. He saw what I carried. He has never looked away.</p>
              <p>Tonight, His truth corrects what I believed. Gently. Slowly.</p>
              <div className="space-y-3">
                {nightlyBeliefsBiblical.map((belief) => (
                  <div key={belief} className="border-l-2 border-emerald-400 pl-5 italic text-slate-600"><p>{belief}</p></div>
                ))}
              </div>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">Identity Imprint</p>
              <div className="border-l-2 border-emerald-400 pl-5 space-y-2 italic text-slate-600">
                <p>I am no longer in healing mode.</p>
                <p>I am already healed — by His stripes.</p>
                <p>My body is simply maintaining what God has already done.</p>
              </div>
              <p>{bodyPlacementText}</p>
              <p>Breathe in for 4. Out for 8.</p>
              <p className="italic text-slate-600">Everything that is not from Him dissolves as I sleep.</p>
            </div>
            <hr className="border-slate-200" />
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-widest text-slate-400">I carry these into sleep</p>
              <div className="space-y-2">{nightlyBeliefsBiblical.map((belief) => <p key={belief} className="text-base font-medium text-slate-800">{belief}</p>)}</div>
              <p className="text-slate-500 text-sm mt-4">Goodnight. He is with you. 🌙</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Continue when you are ready</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/body-awareness" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 hover:border-emerald-400 transition">Start another session</Link>
            <Link href="/" className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-800 transition">Back to home</Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}