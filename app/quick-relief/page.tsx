"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/start-session", label: "Start Session" },
  { href: "/session-entry", label: "Session Entry" },
  { href: "/grounding-scripts", label: "Grounding Scripts" },
  { href: "/quick-relief", label: "Quick Relief" },
  { href: "/faq", label: "FAQ" },
  { href: "/dream-interpreter", label: "Dream Interpreter" },
];

type Emotion = {
  id: string;
  label: string;
  icon: string;
  color: string;
  breath: { title: string; description: string; phases: { label: string; duration: number }[] };
  anchor: string;
  statement: string[];
  reframe: string;
};

const emotions: Emotion[] = [
  {
    id: "anxious", label: "Anxious / Panicking", icon: "💨", color: "#6BA8B4",
    breath: { title: "Physiological Sigh", description: "The fastest way to calm your nervous system — one breath is enough.", phases: [{ label: "Inhale through nose", duration: 3 }, { label: "Second inhale through nose", duration: 1 }, { label: "Long exhale through mouth", duration: 8 }] },
    anchor: "Place one hand on your heart and one on your belly. Feel the warmth of your own hands. You are here. You are present. You are okay.",
    statement: ["Right now, in this moment, I am okay.", "My nervous system is responding to a signal — not a real threat.", "I am safe enough to breathe.", "I am safe enough to soften.", "This feeling is moving through me.", "I am still here. I am still whole."],
    reframe: "I am not in danger. My body is learning to tell the difference.",
  },
  {
    id: "overwhelmed", label: "Overwhelmed / Stressed", icon: "🌊", color: "#1D9E75",
    breath: { title: "Extended Exhale", description: "A long exhale activates the vagus nerve and slows everything down.", phases: [{ label: "Inhale through nose", duration: 4 }, { label: "Exhale through mouth", duration: 8 }] },
    anchor: "Let your shoulders drop. Unclench your jaw. Feel the weight of your body in your seat. You do not have to solve anything right now.",
    statement: ["I do not have to handle everything right now.", "I am allowed to take this one breath at a time.", "Not everything on my list is an emergency.", "I release the pressure to have it all figured out.", "My nervous system is allowed to slow down.", "I can do less and still be enough."],
    reframe: "I am not behind. I am human. And right now, breathing is enough.",
  },
  {
    id: "sad", label: "Sad / Grieving", icon: "🌧️", color: "#7B9EC9",
    breath: { title: "4-7-8 Breathing", description: "Deeply settling — gives your nervous system permission to rest.", phases: [{ label: "Inhale through nose", duration: 4 }, { label: "Hold", duration: 7 }, { label: "Exhale through mouth", duration: 8 }] },
    anchor: "Place your hand over your heart. This is not weakness — this is your heart processing something it cares about. Let it be felt without judgment.",
    statement: ["It is okay to feel this.", "Sadness is not something to fix — it is something to move through.", "I am allowed to grieve what I have lost.", "My feelings are valid and they will not last forever.", "I am not alone in this.", "Even here, I am held."],
    reframe: "Feeling deeply is not a sign that something is wrong with me. It is a sign that I am alive.",
  },
  {
    id: "angry", label: "Angry / Frustrated", icon: "🔥", color: "#C97B7B",
    breath: { title: "Box Breathing", description: "Regulates the fight response and brings your prefrontal cortex back online.", phases: [{ label: "Inhale", duration: 4 }, { label: "Hold", duration: 4 }, { label: "Exhale", duration: 4 }, { label: "Hold", duration: 4 }] },
    anchor: "Press both feet firmly into the floor. Feel the ground beneath you. You are grounded. You are supported. The earth is holding you right now.",
    statement: ["I notice I am activated.", "This anger has information — and I can hear it without being controlled by it.", "I am allowed to feel this without acting from it.", "I release the need for things to be different right now.", "Other people's behavior does not determine my state.", "I can be bothered and still be okay."],
    reframe: "Their behavior does not have to live in my body. I can let this move through me.",
  },
  {
    id: "disconnected", label: "Disconnected / Numb", icon: "🌫️", color: "#9B8EC9",
    breath: { title: "Activating Breath", description: "Short sharp inhales bring you back into your body gently.", phases: [{ label: "Sharp inhale through nose", duration: 2 }, { label: "Sharp inhale through nose", duration: 2 }, { label: "Slow exhale through mouth", duration: 6 }] },
    anchor: "Rub your hands together until you feel warmth. Then place them on your cheeks or your heart. Feel the sensation. You are in a body. You are here.",
    statement: ["I am here.", "I am in my body.", "It is safe to come back.", "I do not have to feel everything at once.", "I can return to myself slowly.", "My body is a safe place to be."],
    reframe: "Numbness was protection. I no longer need to stay away from myself.",
  },
  {
    id: "shame", label: "Shame / Self-Criticism", icon: "🌑", color: "#8B7355",
    breath: { title: "Heart Breath", description: "Breathe directly into your heart space — this activates self-compassion.", phases: [{ label: "Inhale into your heart", duration: 5 }, { label: "Hold and soften", duration: 3 }, { label: "Exhale with release", duration: 7 }] },
    anchor: "Place both hands over your heart. Imagine breathing warmth directly into your chest. You are not bad. You are not broken. You are someone who is hurting.",
    statement: ["I am not my worst moment.", "I was doing the best I could with what I had.", "I deserve the same compassion I would give someone I love.", "Shame is not the truth — it is a pattern my nervous system learned.", "I forgive myself for not knowing what I did not yet know.", "I am worthy of love exactly as I am."],
    reframe: "I am not broken. I am healing. And healing is allowed to take time.",
  },
  {
    id: "sleep", label: "Can't Sleep", icon: "🌙", color: "#4A7A85",
    breath: { title: "4-7-8 Sleep Breath", description: "Clinically shown to activate the parasympathetic system and prepare the body for sleep.", phases: [{ label: "Inhale through nose", duration: 4 }, { label: "Hold", duration: 7 }, { label: "Exhale through mouth", duration: 8 }] },
    anchor: "Put one hand on your heart and one on your belly. Feel your body sinking into the surface beneath you. You do not have to do anything. You are allowed to rest.",
    statement: ["I give my mind permission to stop solving.", "Everything that needs to happen tomorrow will still be there.", "Right now the only thing I need to do is rest.", "My body knows how to sleep — I just need to get out of its way.", "I am safe. The day is done. I can let go now.", "Everything that isn't mine dissolves as I sleep."],
    reframe: "Sleep is not something I have to earn. My body is designed for this.",
  },
  {
    id: "unknown", label: "I Don't Know — Just Help", icon: "🌿", color: "#1D9E75",
    breath: { title: "Physiological Sigh", description: "When you don't know what you feel — start with one breath. Your body will follow.", phases: [{ label: "Inhale through nose", duration: 3 }, { label: "Second inhale through nose", duration: 1 }, { label: "Long exhale through mouth", duration: 8 }] },
    anchor: "Place one hand on your heart. You don't have to know what you're feeling to take care of yourself. Just start here. Just breathe.",
    statement: ["I don't have to have it figured out.", "I just have to be here.", "My body knows what it needs even when my mind doesn't.", "I am allowed to not know and still be okay.", "Something in me led me here — and that something was looking out for me.", "I am safe. I am here. That is enough for right now."],
    reframe: "I don't need to understand it to move through it. I just need to breathe.",
  },
];

function MiniBreathTimer({ phases, color }: { phases: { label: string; duration: number }[]; color: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].duration);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhase = phases[phaseIndex];
  const isInhale = currentPhase.label.toLowerCase().includes("inhale");
  const isHold = currentPhase.label.toLowerCase().includes("hold");
  const progress = 1 - secondsLeft / currentPhase.duration;
  let circleScale = 1;
  if (isInhale) circleScale = 0.55 + 0.45 * progress;
  else if (isHold) circleScale = phaseIndex > 0 && phases[phaseIndex - 1]?.label.toLowerCase().includes("inhale") ? 1 : 0.55;
  else circleScale = 1 - 0.45 * progress;

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const next = phaseIndex + 1;
          if (next >= phases.length) { setIsRunning(false); setDone(true); return 0; }
          setPhaseIndex(next);
          return phases[next].duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phaseIndex, phases]);

  function start() { setPhaseIndex(0); setSecondsLeft(phases[0].duration); setDone(false); setIsRunning(true); }
  function reset() { setIsRunning(false); setPhaseIndex(0); setSecondsLeft(phases[0].duration); setDone(false); }

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative flex items-center justify-center w-36 h-36 mb-4">
        <div className="absolute rounded-full border-2 border-calm-200" style={{ width: "144px", height: "144px" }} />
        <div className="rounded-full flex flex-col items-center justify-center transition-all"
          style={{ width: `${circleScale * 120}px`, height: `${circleScale * 120}px`, backgroundColor: isRunning ? color + "22" : "#E1F5EE", border: `2px solid ${isRunning ? color : "#1D9E75"}`, transitionDuration: "700ms", transitionTimingFunction: "ease-in-out" }}>
          {done ? <span className="text-xs text-calm-600 text-center px-2">✓ Done</span>
            : isRunning ? (<><span className="text-xl font-light text-slate-700">{secondsLeft}</span><span className="text-xs text-slate-500 mt-0.5 text-center px-2 leading-3">{currentPhase.label}</span></>)
            : <span className="text-xs text-calm-600 text-center px-2">Press start</span>}
        </div>
      </div>
      <div className="flex gap-2">
        {!isRunning && !done ? (
          <button onClick={start} className="flex items-center gap-1.5 rounded-full bg-calm-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-calm-700">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>Start
          </button>
        ) : done ? (
          <button onClick={reset} className="rounded-full border border-calm-300 px-5 py-2 text-sm text-calm-700 transition hover:bg-calm-100">Again</button>
        ) : (
          <button onClick={reset} className="rounded-full border border-calm-300 px-5 py-2 text-sm text-calm-700 transition hover:bg-calm-100">Reset</button>
        )}
      </div>
    </div>
  );
}

function useTTS() {
  const stoppedRef = useRef(false);
  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Karen", "Moira", "Tessa", "Fiona", "Victoria", "Allison", "Ava"];
    for (const name of preferred) { const v = voices.find((v) => v.name.includes(name)); if (v) return v; }
    return voices.find((v) => v.lang.startsWith("en")) ?? null;
  }, []);
  const speak = useCallback((text: string) => {
    stoppedRef.current = false; window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85; utter.pitch = 0.95; utter.volume = 1;
    const voice = getVoice(); if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }, [getVoice]);
  const stop = useCallback(() => { stoppedRef.current = true; window.speechSynthesis.cancel(); }, []);
  useEffect(() => { return () => { window.speechSynthesis.cancel(); }; }, []);
  return { speak, stop };
}

function StepCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-calm-200 bg-white p-5 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">{number}</span>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function QuickRelief() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [step, setStep] = useState(0);
  const { speak, stop } = useTTS();

  useEffect(() => {
    let mounted = true;
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) { router.replace("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("paid").eq("user_id", session.user.id).maybeSingle();
      if (!mounted) return;
      if (!profile?.paid) { window.location.href = STRIPE_PAYMENT_LINK; return; }
      setChecking(false);
    }
    checkAccess();
    return () => { mounted = false; };
  }, [router]);

  function selectEmotion(e: Emotion) { stop(); setSelected(e); setStep(1); }
  function reset() { stop(); setSelected(null); setStep(0); }

  if (checking) return <p className="p-6 text-center text-sm text-slate-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-calm-700">Release Core</Link>
          <div className="hidden gap-2 md:flex">
            {navItems.map((item) => (<Link key={item.href} href={item.href} className="rounded-full px-3 py-1.5 text-xs text-slate-600 transition hover:bg-calm-100 hover:text-calm-700">{item.label}</Link>))}
          </div>
          <button className="flex flex-col gap-1.5 p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-calm-200 bg-calm-50 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (<Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-calm-100 hover:text-calm-700">{item.label}</Link>))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <section className="rounded-2xl border border-calm-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Quick Relief</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">A guided 3-minute sequence to help your nervous system find safety right now.</p>

          <div className="mt-6">
            {!selected ? (
              <>
                <p className="text-sm text-slate-600 mb-5 leading-6">How are you feeling right now? Choose the one that feels closest.</p>
                <div className="grid grid-cols-2 gap-3">
                  {emotions.map((e) => (
                    <button key={e.id} onClick={() => selectEmotion(e)} className="rounded-xl border border-calm-200 bg-white px-4 py-4 text-left transition-all hover:border-calm-300 hover:bg-calm-50">
                      <div className="text-2xl mb-2">{e.icon}</div>
                      <p className="text-sm font-semibold text-slate-800">{e.label}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">You selected</p>
                    <p className="text-base font-semibold text-slate-800">{selected.icon} {selected.label}</p>
                  </div>
                  <button onClick={reset} className="flex items-center gap-1.5 text-xs text-calm-700 hover:text-calm-800 border border-calm-200 rounded-lg px-3 py-1.5 transition hover:bg-calm-50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6" /></svg>Back
                  </button>
                </div>

                <div className="flex gap-1.5 mb-6">
                  {[1, 2, 3, 4].map((s) => (<div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? "bg-calm-600" : "bg-calm-100"}`} />))}
                </div>

                {step >= 1 && (
                  <StepCard number={1} title={selected.breath.title}>
                    <p className="text-sm text-slate-500 mb-3 leading-6">{selected.breath.description}</p>
                    <MiniBreathTimer phases={selected.breath.phases} color={selected.color} />
                    {step === 1 && <button onClick={() => setStep(2)} className="mt-2 w-full rounded-xl bg-calm-600 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">I completed the breath →</button>}
                  </StepCard>
                )}

                {step >= 2 && (
                  <StepCard number={2} title="Body Anchor">
                    <p className="text-sm text-slate-700 leading-7">{selected.anchor}</p>
                    <button onClick={() => speak(selected.anchor)} className="mt-3 flex items-center gap-2 rounded-full border border-calm-200 px-4 py-2 text-xs text-calm-700 transition hover:bg-calm-50">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>Read to me
                    </button>
                    {step === 2 && <button onClick={() => setStep(3)} className="mt-4 w-full rounded-xl bg-calm-600 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">I'm grounded →</button>}
                  </StepCard>
                )}

                {step >= 3 && (
                  <StepCard number={3} title="Calming Statements">
                    <p className="text-xs text-slate-400 mb-3">Read these slowly. Let each one land before moving to the next.</p>
                    <div className="space-y-1.5">
                      {selected.statement.map((line, i) => (<p key={i} className="text-sm text-slate-700 leading-7 rounded-lg bg-calm-50 px-3 py-1.5">{line}</p>))}
                    </div>
                    <button onClick={() => speak(selected.statement.join(". "))} className="mt-3 flex items-center gap-2 rounded-full border border-calm-200 px-4 py-2 text-xs text-calm-700 transition hover:bg-calm-50">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>Read to me
                    </button>
                    {step === 3 && <button onClick={() => setStep(4)} className="mt-4 w-full rounded-xl bg-calm-600 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">I feel a shift →</button>}
                  </StepCard>
                )}

                {step >= 4 && (
                  <StepCard number={4} title="New Belief">
                    <div className="rounded-xl bg-calm-50 border border-calm-100 px-4 py-4 mb-4">
                      <p className="text-sm font-medium text-calm-700 leading-7 italic">"{selected.reframe}"</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 leading-5">Say this out loud if you can. Repeat it three times slowly. Let your body hear it.</p>
                    <button onClick={() => { const text = selected.reframe + ". " + selected.reframe + ". " + selected.reframe; speak(text); }}
                      className="mb-4 flex items-center gap-2 rounded-full border border-calm-200 px-4 py-2 text-xs text-calm-700 transition hover:bg-calm-50">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>Read to me 3 times
                    </button>
                    <div className="rounded-xl border border-calm-200 bg-white px-4 py-4 text-center">
                      <p className="text-2xl mb-2">✨</p>
                      <p className="text-sm font-semibold text-slate-800 mb-1">You showed up for yourself.</p>
                      <p className="text-xs text-slate-500 leading-5">Your nervous system just got a little bit safer. That matters more than you know.</p>
                      <button onClick={reset} className="mt-4 rounded-full border border-calm-200 px-5 py-2 text-sm text-calm-700 transition hover:bg-calm-50">Start again</button>
                    </div>
                  </StepCard>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
