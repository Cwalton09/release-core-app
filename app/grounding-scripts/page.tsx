"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { practices } from "@/lib/dailyPracticesData";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

// ─── Types ───────────────────────────────────────────────────────────────────

type Script = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  lines: string[];
};

type BreathingTechnique = {
  id: string;
  title: string;
  description: string;
  phases: { label: string; duration: number; color: string }[];
};

// ─── Breathing Techniques ────────────────────────────────────────────────────

const breathingTechniques: BreathingTechnique[] = [
  {
    id: "box",
    title: "Box Breathing",
    description: "Calms the nervous system and improves focus",
    phases: [
      { label: "Inhale", duration: 4, color: "#1D9E75" },
      { label: "Hold", duration: 4, color: "#0F6E56" },
      { label: "Exhale", duration: 4, color: "#6BA8B4" },
      { label: "Hold", duration: 4, color: "#4A7A85" },
    ],
  },
  {
    id: "478",
    title: "4-7-8 Breathing",
    description: "Deeply relaxing, great for anxiety and sleep",
    phases: [
      { label: "Inhale", duration: 4, color: "#1D9E75" },
      { label: "Hold", duration: 7, color: "#0F6E56" },
      { label: "Exhale", duration: 8, color: "#6BA8B4" },
    ],
  },
  {
    id: "physiological",
    title: "Physiological Sigh",
    description: "Fastest way to reduce stress in real time",
    phases: [
      { label: "Inhale (nose)", duration: 3, color: "#1D9E75" },
      { label: "Second inhale (nose)", duration: 1, color: "#0F6E56" },
      { label: "Long exhale (mouth)", duration: 8, color: "#6BA8B4" },
    ],
  },
  {
    id: "extended",
    title: "Extended Exhale",
    description: "Activates the vagus nerve and parasympathetic system",
    phases: [
      { label: "Inhale (nose)", duration: 4, color: "#1D9E75" },
      { label: "Exhale (mouth)", duration: 8, color: "#6BA8B4" },
    ],
  },
];

// ─── Breathing Timer Component ───────────────────────────────────────────────

function BreathingTimer({ technique }: { technique: BreathingTechnique }) {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(technique.phases[0].duration);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhase = technique.phases[phaseIndex];
  const isInhale = currentPhase.label.toLowerCase().includes("inhale");
  const isHold = currentPhase.label.toLowerCase().includes("hold");
  const progress = 1 - secondsLeft / currentPhase.duration;

  let circleScale = 1;
  if (isInhale) circleScale = 0.6 + 0.4 * progress;
  else if (isHold) {
    const prevPhase = technique.phases[phaseIndex - 1];
    circleScale = prevPhase?.label.toLowerCase().includes("inhale") ? 1 : 0.6;
  } else circleScale = 1 - 0.4 * progress;

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((pi) => {
            const next = (pi + 1) % technique.phases.length;
            if (next === 0) setCycles((c) => c + 1);
            setSecondsLeft(technique.phases[next].duration);
            return next;
          });
          return technique.phases[(phaseIndex + 1) % technique.phases.length].duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phaseIndex, technique]);

  function start() {
    setPhaseIndex(0);
    setSecondsLeft(technique.phases[0].duration);
    setCycles(0);
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
    setPhaseIndex(0);
    setSecondsLeft(technique.phases[0].duration);
    setCycles(0);
  }

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative flex items-center justify-center w-48 h-48 mb-6">
        <div className="absolute rounded-full border-2 border-calm-200" style={{ width: "192px", height: "192px" }} />
        <div
          className="rounded-full flex flex-col items-center justify-center transition-all"
          style={{
            width: `${circleScale * 160}px`,
            height: `${circleScale * 160}px`,
            backgroundColor: isRunning ? currentPhase.color + "33" : "#E1F5EE",
            border: `2px solid ${isRunning ? currentPhase.color : "#1D9E75"}`,
            transitionDuration: "800ms",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {isRunning ? (
            <>
              <span className="text-2xl font-light text-slate-700">{secondsLeft}</span>
              <span className="text-xs text-slate-500 mt-0.5">{currentPhase.label}</span>
            </>
          ) : (
            <span className="text-xs text-calm-600 text-center px-2">Press start</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {technique.phases.map((phase, i) => (
          <div key={i} className={`rounded-full px-3 py-1 text-xs transition-all ${isRunning && phaseIndex === i ? "bg-calm-600 text-white" : "bg-calm-50 text-slate-500 border border-calm-200"}`}>
            {phase.label} • {phase.duration}s
          </div>
        ))}
      </div>
      {cycles > 0 && <p className="text-xs text-slate-400 mb-4">Cycles completed: {cycles}</p>}
      <div className="flex gap-3">
        {!isRunning ? (
          <button onClick={start} className="flex items-center gap-2 rounded-full bg-calm-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            Start
          </button>
        ) : (
          <button onClick={stop} className="rounded-full border border-calm-300 px-6 py-2.5 text-sm text-calm-700 transition hover:bg-calm-100">
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

// ─── TTS Hook ─────────────────────────────────────────────────────────────────

function useTTS(lines: string[]) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [rate, setRate] = useState(0.85);
  const stoppedRef = useRef(false);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Karen", "Moira", "Tessa", "Fiona", "Victoria", "Allison", "Ava", "Susan", "Zoe"];
    for (const name of preferred) {
      const v = voices.find((v) => v.name.includes(name));
      if (v) return v;
    }
    const female = voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"));
    if (female) return female;
    return voices.find((v) => v.lang.startsWith("en")) ?? null;
  }, []);

  const speakLine = useCallback((index: number) => {
    if (index >= lines.length || stoppedRef.current) { setIsPlaying(false); setCurrentLine(null); return; }
    const text = lines[index];
    if (!text.trim()) { speakLine(index + 1); return; }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate; utter.pitch = 0.95; utter.volume = 1;
    const voice = getVoice();
    if (voice) utter.voice = voice;
    setCurrentLine(index);
    utter.onend = () => { if (!stoppedRef.current) speakLine(index + 1); };
    window.speechSynthesis.speak(utter);
  }, [lines, rate, getVoice]);

  const play = useCallback(() => { stoppedRef.current = false; window.speechSynthesis.cancel(); setIsPlaying(true); speakLine(0); }, [speakLine]);
  const pause = useCallback(() => { if (window.speechSynthesis.speaking) { window.speechSynthesis.pause(); setIsPlaying(false); } }, []);
  const resume = useCallback(() => { if (window.speechSynthesis.paused) { window.speechSynthesis.resume(); setIsPlaying(true); } }, []);
  const stop = useCallback(() => { stoppedRef.current = true; window.speechSynthesis.cancel(); setIsPlaying(false); setCurrentLine(null); }, []);

  useEffect(() => { return () => { stoppedRef.current = true; window.speechSynthesis.cancel(); }; }, []);

  return { isPlaying, currentLine, rate, setRate, play, pause, resume, stop };
}

function PlayIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>;
}
function PauseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" /><rect x="15" y="3" width="4" height="18" /></svg>;
}

// ─── Scripts data ─────────────────────────────────────────────────────────────

const scripts: Script[] = [
  { id: "eft", title: "EFT Tapping", subtitle: "Release stored fear through gentle tapping", icon: "✋", lines: ["Start by taking a slow deep breath.","Tap gently with two fingers on each point while repeating the statements.","Karate Chop Point — side of hand:","Even though part of me feels fear, my body is safe right now.","Even though my nervous system learned to stay alert, I deeply and completely accept myself.","Even though I have been carrying tension and fear, I am open to letting my body soften now.","Eyebrow Point: This fear my body has been holding.","Side of Eye: This constant need to stay alert.","Under Eye: This pressure in my nervous system.","Under Nose: My body learned to protect me through fear.","Chin Point: But I do not need to stay in survival mode forever.","Collarbone Point: I thank my body for trying to protect me.","Under Arm: I am safe enough to begin letting this go.","Top of Head: My body is learning a new pattern now.","Take a deep breath. Now begin the second round.","Eyebrow Point: I release the need to constantly brace for danger.","Side of Eye: I release the habit of overthinking for protection.","Under Eye: I release stored tension from my body.","Under Nose: My nervous system is allowed to soften now.","Chin Point: I am safe to relax.","Collarbone Point: I am safe to breathe deeply.","Under Arm: I am safe to feel calm.","Top of Head: Peace is safe for my body now.","Finish with a slow deep breath and place a hand over your heart.","My body no longer has to carry fear the same way."] },
  { id: "manifesting", title: "Manifesting", subtitle: "Reprogram your nervous system for abundance", icon: "✨", lines: ["Your body is safe to receive more.","More peace. More support. More opportunities. More abundance. More ease.","You no longer need to stay stuck in survival mode to deserve a good life.","Your nervous system is learning that having more is safe.","It is safe to receive. It is safe to succeed. It is safe to be supported.","It is safe for life to work out for you.","You release the old belief that you must struggle constantly just to survive.","You release the belief that stress is normal.","You release the fear of not having enough.","You release the fear that good things never last.","You release the fear of failure.","You release the fear of success.","You release the fear of being judged, rejected, abandoned, or misunderstood for growing into a new version of yourself.","Your body no longer needs to brace for worst-case scenarios.","You are safe now.","Safe to soften. Safe to breathe deeply. Safe to trust again.","Safe to believe that life can become easier.","Your nervous system is learning a new pattern now.","A pattern of safety. A pattern of peace. A pattern of abundance. A pattern of receiving.","You are no longer emotionally attached to struggle.","You no longer need chaos to feel familiar.","You no longer need to overthink every possible outcome.","Your body is learning how to feel calm while things are going well.","You are becoming available for better experiences.","Better relationships. Better opportunities. Better finances. Better health. Better outcomes.","The right ideas find you. The right people find you. The right opportunities find you.","You stop pushing away the very things you have been praying for.","You allow yourself to receive without guilt.","You allow yourself to rest without fear.","You allow yourself to trust without constantly waiting for something bad to happen.","You are safe even when life feels peaceful.","You are safe even when things are working out.","You are safe even when you are happy.","As you sleep tonight, old scarcity patterns begin dissolving.","Your subconscious mind begins building new pathways rooted in safety, confidence, trust, peace, and abundance.","You are not stuck anymore. You are not trapped anymore.","A new reality is becoming safe for your body now.","One where you are supported. One where things flow easier.","One where you finally stop surviving and start living.","Everything you desire becomes easier to receive when your body believes it is safe to have it.","And tonight, your body is learning exactly that."] },
  { id: "somatic", title: "Somatic Healing", subtitle: "Invite your body out of protection mode", icon: "🫀", lines: ["My body no longer needs to create symptoms to get my attention.","I am safe now.","My nervous system is learning that it does not have to stay in protection mode.","It does not need to stay hyper-alert, overreactive, inflamed, exhausted, tense, or overwhelmed in order to protect me.","My body is intelligent.","My body is not working against me.","My body has been trying to protect me the best way it knew how.","And now it is safe for my system to choose a calmer response.","Every cell in my body is learning safety.","Every system in my body is learning regulation.","My brain no longer needs to scan for danger constantly.","My nervous system no longer needs to amplify fear, stress, or survival signals.","It is safe for my body to soften.","It is safe for my immune system to calm down.","It is safe for my muscles to relax.","It is safe for my stomach to settle.","It is safe for my breathing to deepen.","It is safe for my body to stop expecting something bad to happen.","My body can communicate with me gently now.","It does not need intense symptoms to be heard.","Today, my nervous system learns a new experience.","A safer experience. A calmer experience. A more regulated experience.","I allow my body to move out of survival mode and into healing mode.","I allow my nervous system to remember what peace feels like.","I allow safety to become my body's new normal.","God designed my body to heal, restore, regulate, and recover.","And tonight, my body remembers how."] },
  { id: "nightly", title: "Nightly Reset", subtitle: "A body-based routine before sleep", icon: "🌙", lines: ["Each step takes only a few seconds. Do these in order before bed.","Step one. Tap lightly on either collarbone point and say:","Body, the danger is over. You can let this go now.","Step two. Jaw Release. Gently open and close your jaw, side to side.","Jaw tension equals survival mode. Releasing it tells your brain: We are safe.","Say: I release old reactions.","Step three. Exhale Drop. Let your shoulders fall while exhaling through your mouth.","Say: My body can stand down.","Step four. Sweep the Body. Take both hands and sweep down your chest, ribs, stomach, and hips.","Say: This pattern is erased.","Step five. Place your hand on your heart.","Say: My new baseline is calm. My new identity is healed."] },
  { id: "vagus", title: "Vagus Nerve Reset", subtitle: "30-second reset for overwhelm", icon: "👁️", lines: ["Use this anytime you feel overwhelmed, tense, or dysregulated.","Step one. Without moving your head, hold your eyes as far to the right as they will go.","Hold until you feel a sigh, swallow, or yawn.","That response is the vagus nerve switching on.","Step two. Now move your eyes as far to the left as they will go.","Hold again until you sigh or swallow.","That is the parasympathetic system taking over.","You will feel lighter and more grounded in under thirty seconds."] },
  { id: "sleep", title: "Sleep Reprogramming", subtitle: "Imprint peace while drifting to sleep", icon: "💤", lines: ["Do this lying in bed. Your brain waves are entering theta state — imprinting mode.","Put one hand on your heart and one on your lower belly.","Breathe in for four seconds through your nose.","Breathe out for eight seconds through your mouth.","Repeat three times.","Then repeat softly:","My body knows how to heal.","My nervous system knows how to relax.","Every cell is remembering peace.","I am safe while I sleep.","My body is switching to repair mode now.","Now the identity imprint:","I am no longer in healing mode.","I am already healed.","My body is simply maintaining my health.","And the closing line:","Everything that isn't mine… dissolves as I sleep."] },
  { id: "overthinking", title: "Overthinking", subtitle: "Give your mind permission to rest", icon: "🧠", lines: ["I give my mind permission to slow down.","I do not have to solve everything right now.","I do not have to replay every conversation, every decision, every fear, or every possible outcome.","My body is safe in this moment.","My nervous system does not need to search for danger in thoughts that are not happening right now.","I release the need to figure it all out tonight.","I release the pressure to be prepared for every possibility.","I release the belief that overthinking keeps me safe.","My mind can rest.","My body can soften.","My thoughts can pass without me chasing them.","I am allowed to come back to the present.","Right now, I am here.","Right now, I am breathing.","Right now, I am safe enough to let go.","I choose calm over control.","I choose trust over fear.","I choose rest over rumination.","Tonight, I do not need answers.","Tonight, I need safety.","And my body is learning that safety now."] },
  { id: "calming", title: "Calming", subtitle: "Gently return to the present moment", icon: "🍃", lines: ["Right now, in this moment, I am okay.","I do not have to be anywhere other than here.","I do not have to be further along than I am.","I do not have to have it all figured out.","My body is allowed to slow down.","My breath is allowed to deepen.","My shoulders are allowed to drop.","Whatever is happening around me does not have to happen inside me.","I can be still while the world moves.","I can be quiet while thoughts arise.","I can be present while uncertainty exists.","I breathe in — and I bring myself back.","I breathe out — and I release what I cannot control.","My nervous system is safe right now.","My body is not in danger right now.","This feeling will pass.","I am more than this moment.","I am more than this anxiety.","I am still here. I am still whole. I am still safe.","I return to myself now.","Gently. Slowly. Completely."] },
  { id: "selfcompassion", title: "Self-Compassion", subtitle: "Soften self-criticism with kindness", icon: "☀️", lines: ["I am doing the best I can with what I have right now.","That is enough.","I am enough.","I do not have to be perfect to deserve kindness.","I do not have to be healed to deserve love.","I do not have to be strong to deserve rest.","The parts of me that are struggling are not my failures.","They are evidence that I have been carrying something heavy for a long time.","I am allowed to be gentle with myself today.","I am allowed to stop being so hard on myself.","I forgive myself for the ways I have spoken harshly to myself.","I forgive myself for the times I did not know better.","I forgive myself for the seasons I spent in survival mode.","I was doing the best I could.","I am doing the best I can.","I deserve the same compassion I give to others.","I deserve grace. I deserve peace.","Today I choose to speak to myself with kindness.","Today I choose to see myself with gentleness.","Today I choose to be on my own side.","I am worthy of my own love."] },
  { id: "biblical-peace", title: "He Is With Me", subtitle: "A biblical script for fear and anxiety", icon: "✝️", lines: ["I am not alone in this moment.","The same God who calmed the storm on the sea is with me right now.","He sees me. He knows me. He has not forgotten me.","I cast my anxiety on Him, because He cares for me.","I do not have to carry this alone.","I was never meant to carry this alone.","The Lord is my shepherd. I shall not want.","He makes me lie down in green pastures.","He leads me beside still waters.","He restores my soul.","Even in the valley, He is with me.","His rod and His staff — they comfort me.","I do not have to be afraid.","For He has not given me a spirit of fear,","but of power, and of love, and of a sound mind.","Be still.","And know that He is God.","And know that I am held."] },
  { id: "biblical-surrender", title: "Surrendering to His Peace", subtitle: "A biblical script for overthinking and worry", icon: "🕊️", lines: ["I will not be anxious about anything.","Instead, I bring everything to God in prayer.","Every fear. Every worry. Every what-if.","He already knows what I need before I ask.","I do not have to figure this out on my own.","I was not designed to.","The peace of God, which surpasses all understanding, is available to me right now.","It will guard my heart.","It will guard my mind.","I can lay this down.","I can trust Him with the outcome.","I can release the need to control what only He can carry.","His plans for me are good.","Plans to give me a future and a hope.","Not to harm me. Not to abandon me.","I rest in that now.","I let my body soften into His presence.","I let my mind quiet in His truth.","He is faithful.","He was faithful before this moment.","He will be faithful after it.","I am safe in His hands."] },
  { id: "biblical-rooted", title: "Rooted in Him", subtitle: "A biblical script for healing, identity, and strength", icon: "🌿", lines: ["I am healing.","Not because I have it all together,","but because God is working in me even now.","He is healing what my mind cannot fix on its own.","He is restoring what pain tried to take from me.","He is reaching the places I have not even been able to name yet.","I do not have to earn my way back to wholeness.","He is leading me there.","I know who I am.","I am not my worst season.","I am not my hardest moment.","I am not the version of myself that was just surviving.","I am a child of God.","Chosen. Known. Loved. Kept.","That does not change based on how I feel today.","When I am weak, He is strong.","I do not have to hold everything together right now.","I can lean into the One who is already holding me.","I release the need to have all the answers.","I release the pressure of perfect timing.","I release the fear that I have somehow missed my chance.","His timing is not behind.","His love is not conditional.","His strength is made perfect in my weakness.","I am not too far gone.","I am not too broken.","I am not too tired.","He meets me exactly where I am.","And right here, in this moment, that is enough.","I am rooted in Him.","And nothing can change that."] },
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function GroundingScripts() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeBreathing, setActiveBreathing] = useState<string | null>(null);
  const [activePractice, setActivePractice] = useState<string | null>(null);
  const [practiceSearch, setPracticeSearch] = useState("");
  const active = scripts.find((s) => s.id === activeId);
  const activeTechnique = breathingTechniques.find((t) => t.id === activeBreathing);
  const activePracticeData = practices.find((p) => p.belief === activePractice);
  const { isPlaying, currentLine, rate, setRate, play, pause, resume, stop } = useTTS(active?.lines ?? []);

  useEffect(() => {
    let mounted = true;
    async function checkAccess(retryCount = 0) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (retryCount < 3) { setTimeout(() => { if (mounted) checkAccess(retryCount + 1); }, 500); return; }
        router.replace("/login");
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("paid").eq("user_id", session.user.id).maybeSingle();
      if (!profile?.paid) { window.location.href = STRIPE_PAYMENT_LINK; return; }
      if (mounted) setChecking(false);
    }
    checkAccess();
    return () => { mounted = false; };
  }, [router]);

  const filteredPractices = practices.filter((p) =>
    p.belief.toLowerCase().includes(practiceSearch.toLowerCase())
  );

  function openScript(id: string) { stop(); setActiveId(id === activeId ? null : id); }
  function openBreathing(id: string) { setActiveBreathing(id === activeBreathing ? null : id); }
  function openPractice(belief: string) { setActivePractice(belief === activePractice ? null : belief); }

  if (checking) return <p className="p-6 text-center text-sm text-slate-500">Loading...</p>;

  return (
    <AppShell
      title="Grounding Scripts"
      subtitle="When you can't do a full session, these tools help your body find safety in the moment."
    >
      {/* ── Breathing Exercises ── */}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Breathing Exercises</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
        {breathingTechniques.map((t) => (
          <button key={t.id} onClick={() => openBreathing(t.id)}
            className={`rounded-xl border px-3 py-3 text-left transition-all ${activeBreathing === t.id ? "border-calm-400 bg-calm-50 ring-1 ring-calm-300" : "border-calm-200 bg-white hover:border-calm-300 hover:bg-calm-50"}`}>
            <p className="text-sm font-semibold text-slate-800">{t.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-4">{t.description}</p>
          </button>
        ))}
      </div>
      {activeTechnique && (
        <div className="mb-6 rounded-xl border border-calm-200 bg-white p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold text-calm-700">{activeTechnique.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeTechnique.description}</p>
            </div>
            <button onClick={() => setActiveBreathing(null)} className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition">Close</button>
          </div>
          <BreathingTimer technique={activeTechnique} />
        </div>
      )}

      {/* ── Daily Practices ── */}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 mt-4">Daily Practices</p>
      <p className="text-sm text-slate-500 mb-3 leading-6">Small actions that prove new beliefs to your nervous system. Find the belief you are working on and try one action today.</p>
      <input
        type="text"
        placeholder="Search a belief..."
        value={practiceSearch}
        onChange={(e) => setPracticeSearch(e.target.value)}
        className="w-full rounded-xl border border-calm-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-300 mb-3"
      />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-4">
        {filteredPractices.map((p) => (
          <button key={p.belief} onClick={() => openPractice(p.belief)}
            className={`rounded-xl border px-4 py-3 text-left transition-all ${activePractice === p.belief ? "border-calm-400 bg-calm-50 ring-1 ring-calm-300" : "border-calm-200 bg-white hover:border-calm-300 hover:bg-calm-50"}`}>
            <p className="text-sm font-medium text-slate-700">{p.belief}</p>
          </button>
        ))}
      </div>
      {activePracticeData && (
        <div className="mb-6 rounded-xl border border-calm-200 bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-calm-600 mb-1">Working on</p>
              <h2 className="text-lg font-semibold text-slate-800">"{activePracticeData.belief}"</h2>
            </div>
            <button onClick={() => setActivePractice(null)} className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition">Close</button>
          </div>
          <div className="border-t border-calm-100 pt-4 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Try one of these today</p>
            <div className="space-y-2">
              {activePracticeData.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-calm-50 border border-calm-100 px-4 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">{i + 1}</span>
                  <p className="text-sm text-slate-700 leading-6">{action}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-l-4 border-calm-400 pl-4 italic text-slate-600 text-sm leading-6">
            {activePracticeData.reframe}
          </div>
        </div>
      )}

      {/* ── Grounding Scripts ── */}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 mt-4">Grounding & Nervous System</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-6">
        {scripts.filter(s => !s.id.startsWith("biblical")).map((s) => (
          <button key={s.id} onClick={() => openScript(s.id)}
            className={`rounded-xl border px-4 py-4 text-left transition-all ${activeId === s.id ? "border-calm-400 bg-calm-50 ring-1 ring-calm-300" : "border-calm-200 bg-white hover:border-calm-300 hover:bg-calm-50"}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-sm font-semibold text-slate-800">{s.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-4">{s.subtitle}</p>
          </button>
        ))}
      </div>

      {/* ── Biblical Scripts ── */}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Biblical</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-6">
        {scripts.filter(s => s.id.startsWith("biblical")).map((s) => (
          <button key={s.id} onClick={() => openScript(s.id)}
            className={`rounded-xl border px-4 py-4 text-left transition-all ${activeId === s.id ? "border-calm-400 bg-calm-50 ring-1 ring-calm-300" : "border-calm-200 bg-white hover:border-calm-300 hover:bg-calm-50"}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-sm font-semibold text-slate-800">{s.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-4">{s.subtitle}</p>
          </button>
        ))}
      </div>

      {/* ── Open Script Panel ── */}
      {active && (
        <div className="mt-2 rounded-xl border border-calm-200 bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-calm-700">{active.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{active.subtitle}</p>
            </div>
            <button onClick={() => { stop(); setActiveId(null); }} className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition">Close</button>
          </div>
          <div className="mb-5 rounded-xl border border-calm-200 bg-calm-50 px-4 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              {currentLine === null && !isPlaying ? (
                <button onClick={play} className="flex items-center gap-2 rounded-full bg-calm-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-calm-700"><PlayIcon /> Read aloud</button>
              ) : (
                <>
                  {isPlaying ? (
                    <button onClick={pause} className="flex items-center gap-2 rounded-full bg-calm-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-calm-700"><PauseIcon /> Pause</button>
                  ) : (
                    <button onClick={resume} className="flex items-center gap-2 rounded-full bg-calm-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-calm-700"><PlayIcon /> Resume</button>
                  )}
                  <button onClick={stop} className="rounded-full border border-calm-300 px-4 py-2 text-sm text-calm-700 transition hover:bg-calm-100">Stop</button>
                </>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-slate-500">Speed</span>
                <input type="range" min="0.6" max="1.2" step="0.05" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-24 accent-calm-600" />
                <span className="text-xs text-slate-500 w-8">{rate.toFixed(2)}x</span>
              </div>
            </div>
          </div>
          <div className="border-t border-calm-100 pt-4 space-y-1.5">
            {active.lines.map((line, i) => (
              <p key={i} className={`text-sm leading-7 rounded-lg px-2 py-0.5 transition-colors duration-300 ${currentLine === i ? "bg-calm-100 text-calm-800 font-medium" : "text-slate-700"}`}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
