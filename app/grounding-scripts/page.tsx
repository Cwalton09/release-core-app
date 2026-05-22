"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

type Script = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: React.ReactNode;
};

function TappingPoint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-calm-50 border border-calm-100 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-calm-600 mb-1">{label}</p>
      <p className="text-sm text-slate-700 leading-6">{children}</p>
    </div>
  );
}

function ScriptBody({ children }: { children: string }) {
  return (
    <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{children}</p>
  );
}

const scripts: Script[] = [
  {
    id: "eft",
    title: "EFT Tapping",
    subtitle: "Release stored fear through gentle tapping",
    icon: "✋",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-6">
          Start by taking a slow deep breath. Tap gently with two fingers on each point while repeating the statements.
        </p>
        <TappingPoint label="Karate Chop Point — side of hand">
          Even though part of me feels fear, my body is safe right now.
          <br />
          Even though my nervous system learned to stay alert, I deeply and completely accept myself.
          <br />
          Even though I have been carrying tension and fear, I am open to letting my body soften now.
        </TappingPoint>
        <TappingPoint label="Eyebrow Point">This fear my body has been holding.</TappingPoint>
        <TappingPoint label="Side of Eye">This constant need to stay alert.</TappingPoint>
        <TappingPoint label="Under Eye">This pressure in my nervous system.</TappingPoint>
        <TappingPoint label="Under Nose">My body learned to protect me through fear.</TappingPoint>
        <TappingPoint label="Chin Point">But I do not need to stay in survival mode forever.</TappingPoint>
        <TappingPoint label="Collarbone Point">I thank my body for trying to protect me.</TappingPoint>
        <TappingPoint label="Under Arm">I am safe enough to begin letting this go.</TappingPoint>
        <TappingPoint label="Top of Head">My body is learning a new pattern now.</TappingPoint>
        <p className="text-sm text-slate-500 italic pt-2">Take a deep breath. Then begin the second round:</p>
        <TappingPoint label="Eyebrow Point">I release the need to constantly brace for danger.</TappingPoint>
        <TappingPoint label="Side of Eye">I release the habit of overthinking for protection.</TappingPoint>
        <TappingPoint label="Under Eye">I release stored tension from my body.</TappingPoint>
        <TappingPoint label="Under Nose">My nervous system is allowed to soften now.</TappingPoint>
        <TappingPoint label="Chin Point">I am safe to relax.</TappingPoint>
        <TappingPoint label="Collarbone Point">I am safe to breathe deeply.</TappingPoint>
        <TappingPoint label="Under Arm">I am safe to feel calm.</TappingPoint>
        <TappingPoint label="Top of Head">Peace is safe for my body now.</TappingPoint>
        <div className="mt-6 border-l-4 border-calm-400 pl-4 italic text-slate-600 text-sm leading-6">
          Finish with a slow deep breath and place a hand over the heart:
          <br />
          <span className="font-medium text-calm-700">"My body no longer has to carry fear the same way."</span>
        </div>
      </div>
    ),
  },
  {
    id: "manifesting",
    title: "Manifesting",
    subtitle: "Reprogram your nervous system for abundance",
    icon: "✨",
    content: (
      <ScriptBody>{`Your body is safe to receive more.
More peace. More support. More opportunities. More abundance. More ease.

You no longer need to stay stuck in survival mode to deserve a good life.
Your nervous system is learning that having more is safe.

It is safe to receive. It is safe to succeed. It is safe to be supported. It is safe for life to work out for you.

You release the old belief that you must struggle constantly just to survive.
You release the belief that stress is normal.
You release the fear of not having enough.
You release the fear that good things never last.
You release the fear of failure.
You release the fear of success.
You release the fear of being judged, rejected, abandoned, or misunderstood for growing into a new version of yourself.

Your body no longer needs to brace for worst-case scenarios.
You are safe now.
Safe to soften. Safe to breathe deeply. Safe to trust again. Safe to believe that life can become easier.

Your nervous system is learning a new pattern now.
A pattern of safety. A pattern of peace. A pattern of abundance. A pattern of receiving.

You are no longer emotionally attached to struggle.
You no longer need chaos to feel familiar.
You no longer need to overthink every possible outcome.
Your body is learning how to feel calm while things are going well.

You are becoming available for better experiences.
Better relationships. Better opportunities. Better finances. Better health. Better outcomes.

Your mind begins noticing possibilities that fear once blocked out.
Your Reticular Activating System starts filtering for support, opportunity, solutions, and abundance instead of fear, lack, pressure, and survival.

The right ideas find you.
The right people find you.
The right opportunities find you.

You stop pushing away the very things you've been praying for.
You stop subconsciously expecting disappointment.
You stop assuming life has to be hard.

You allow yourself to receive without guilt.
You allow yourself to rest without fear.
You allow yourself to trust without constantly waiting for something bad to happen.

Your body no longer needs to stay hypervigilant to protect you.
You are safe even when life feels peaceful.
You are safe even when things are working out.
You are safe even when you are happy.

As you sleep tonight, old scarcity patterns begin dissolving.
Old fear patterns soften. Old survival responses calm down.

Your subconscious mind begins building new pathways rooted in safety, confidence, trust, peace, and abundance.

You are not stuck anymore.
You are not trapped anymore.
You are not who you were during your hardest seasons.

A new reality is becoming safe for your body now.
One where you are supported.
One where things flow easier.
One where abundance no longer feels far away.
One where you finally stop surviving and start living.

Everything you desire becomes easier to receive when your body believes it is safe to have it.
And tonight, your body is learning exactly that.`}</ScriptBody>
    ),
  },
  {
    id: "somatic",
    title: "Somatic Healing",
    subtitle: "Invite your body out of protection mode",
    icon: "🫀",
    content: (
      <ScriptBody>{`My body no longer needs to create symptoms to get my attention.
I am safe now.

My nervous system is learning that it does not have to stay in protection mode.
It does not need to stay hyper-alert, overreactive, inflamed, exhausted, tense, or overwhelmed in order to protect me.

My body is intelligent.
My body is not working against me.
My body has been trying to protect me the best way it knew how.
And now it is safe for my system to choose a calmer response.

Every cell in my body is learning safety.
Every system in my body is learning regulation.

My brain no longer needs to scan for danger constantly.
My nervous system no longer needs to amplify fear, stress, or survival signals.

It is safe for my body to soften.
It is safe for my immune system to calm down.
It is safe for my muscles to relax.
It is safe for my stomach to settle.
It is safe for my breathing to deepen.
It is safe for my body to stop expecting something bad to happen.

My body can communicate with me gently now.
It does not need intense symptoms to be heard.
It does not need to stay stuck in old protective patterns.

Today, my nervous system learns a new experience.
A safer experience. A calmer experience. A more regulated experience.

I allow my body to move out of survival mode and into healing mode.
I allow my nervous system to remember what peace feels like.
I allow safety to become my body's new normal.

God designed my body to heal, restore, regulate, and recover.
And tonight, my body remembers how.`}</ScriptBody>
    ),
  },
  {
    id: "nightly",
    title: "Nightly Reset",
    subtitle: "A body-based routine before sleep",
    icon: "🌙",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-6">Each step takes only a few seconds. Do these in order before bed.</p>
        <TappingPoint label="Step 1 — Collarbone Tap">
          Tap lightly on either collarbone point and say:{" "}
          <em>"Body, the danger is over. You can let this go now."</em>
          <br />
          <span className="text-xs text-slate-400">This instantly downshifts the sympathetic system.</span>
        </TappingPoint>
        <TappingPoint label="Step 2 — Jaw Release (5–10 seconds)">
          Gently open and close your jaw, side to side. Jaw tension = survival mode. Releasing it = telling your brain "We're safe."
          <br />
          <em>Say: "I release old reactions."</em>
        </TappingPoint>
        <TappingPoint label="Step 3 — Exhale Drop (10 seconds)">
          Let your shoulders fall while exhaling through your mouth. Long exhale = vagus nerve activation.
          <br />
          <em>Say: "My body can stand down."</em>
        </TappingPoint>
        <TappingPoint label="Step 4 — Sweep the Body (10 seconds)">
          Take both hands and sweep down your chest, ribs, stomach, hips — like brushing off dust. This signals: "Reset complete."
          <br />
          <em>Say: "This pattern is erased."</em>
        </TappingPoint>
        <TappingPoint label="Step 5 — Replace the Pattern (5 seconds)">
          Place your hand on your heart.
          <br />
          <em>Say: "My new baseline is calm. My new identity is healed."</em>
          <br />
          <span className="text-xs text-slate-400">The nervous system must be told what replaces the old pattern.</span>
        </TappingPoint>
      </div>
    ),
  },
  {
    id: "vagus",
    title: "Vagus Nerve Reset",
    subtitle: "30-second reset for overwhelm",
    icon: "👁️",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-6">
          Use anytime you feel overwhelmed, tense, or dysregulated. No one will even notice you're doing it.
        </p>
        <TappingPoint label="Step 1 — Look to the right (15 seconds)">
          Hold your eyes as far right as they go — without moving your head. Hold until you feel a sigh, swallow, or yawn.
          <br />
          <span className="text-xs text-slate-400">That sigh or yawn is the vagus nerve switching on.</span>
        </TappingPoint>
        <TappingPoint label="Step 2 — Look to the left (15 seconds)">
          Eyes far left — same thing. Hold until you sigh or swallow again.
          <br />
          <span className="text-xs text-slate-400">That's the parasympathetic system taking over. You'll feel lighter and more grounded in under 30 seconds.</span>
        </TappingPoint>
      </div>
    ),
  },
  {
    id: "sleep",
    title: "Sleep Reprogramming",
    subtitle: "Imprint peace while drifting to sleep",
    icon: "💤",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-6">
          Do this lying in bed. Your brain waves are entering theta state — imprinting mode. Put one hand on your heart and one on your lower belly.
        </p>
        <TappingPoint label="Breathing pattern">
          4 seconds in through your nose — 8 seconds out through your mouth. Repeat 3 times before you begin.
        </TappingPoint>
        <ScriptBody>{`Then repeat softly:

My body knows how to heal.
My nervous system knows how to relax.
Every cell is remembering peace.
I am safe while I sleep.
My body is switching to repair mode now.`}</ScriptBody>
        <p className="text-sm text-slate-500 italic">Then the identity imprint:</p>
        <ScriptBody>{`I am no longer in healing mode.
I am already healed.
My body is simply maintaining my health.`}</ScriptBody>
        <div className="border-l-4 border-calm-400 pl-4 italic text-slate-600 text-sm leading-6">
          And the closing line:
          <br />
          <span className="font-medium text-calm-700">"Everything that isn't mine… dissolves as I sleep."</span>
          <br />
          <span className="not-italic text-xs text-slate-400">This tells the body to release stored stress, trauma, energy, and tension overnight.</span>
        </div>
      </div>
    ),
  },
  {
    id: "overthinking",
    title: "Overthinking",
    subtitle: "Give your mind permission to rest",
    icon: "🧠",
    content: (
      <ScriptBody>{`I give my mind permission to slow down.

I do not have to solve everything right now.
I do not have to replay every conversation, every decision, every fear, or every possible outcome.

My body is safe in this moment.
My nervous system does not need to search for danger in thoughts that are not happening right now.

I release the need to figure it all out tonight.
I release the pressure to be prepared for every possibility.
I release the belief that overthinking keeps me safe.

My mind can rest.
My body can soften.
My thoughts can pass without me chasing them.

I am allowed to come back to the present.
Right now, I am here.
Right now, I am breathing.
Right now, I am safe enough to let go.

As I sleep, my subconscious mind reorganizes what needs to be reorganized, releases what is no longer needed, and reminds my body that peace is safe.

I choose calm over control.
I choose trust over fear.
I choose rest over rumination.

Tonight, I do not need answers.
Tonight, I need safety.
And my body is learning that safety now.`}</ScriptBody>
    ),
  },
  {
    id: "calming",
    title: "Calming",
    subtitle: "Gently return to the present moment",
    icon: "🍃",
    content: (
      <ScriptBody>{`Right now, in this moment, I am okay.

I do not have to be anywhere other than here.
I do not have to be further along than I am.
I do not have to have it all figured out.

My body is allowed to slow down.
My breath is allowed to deepen.
My shoulders are allowed to drop.

Whatever is happening around me does not have to happen inside me.
I can be still while the world moves.
I can be quiet while thoughts arise.
I can be present while uncertainty exists.

I breathe in — and I bring myself back.
I breathe out — and I release what I cannot control.

My nervous system is safe right now.
My body is not in danger right now.
This feeling will pass.

I am more than this moment.
I am more than this anxiety.
I am still here. I am still whole. I am still safe.

I return to myself now.
Gently. Slowly. Completely.`}</ScriptBody>
    ),
  },
  {
    id: "selfcompassion",
    title: "Self-Compassion",
    subtitle: "Soften self-criticism with kindness",
    icon: "☀️",
    content: (
      <ScriptBody>{`You are doing the best you can with what you have right now.

That is enough.
You are enough.

You do not have to be perfect to deserve kindness.
You do not have to be healed to deserve love.
You do not have to be strong to deserve rest.

The parts of you that are struggling are not your failures.
They are evidence that you have been carrying something heavy for a long time.

You are allowed to be gentle with yourself today.
You are allowed to stop being so hard on yourself.
You are allowed to stop holding yourself to a standard no one else is held to.

I forgive myself for the ways I have spoken harshly to myself.
I forgive myself for the times I did not know better.
I forgive myself for the seasons I spent in survival mode.

I was doing the best I could.
I am doing the best I can.

I deserve the same compassion I give to others.
I deserve grace. I deserve peace.

Today I choose to speak to myself with kindness.
Today I choose to see myself with gentleness.
Today I choose to be on my own side.

I am worthy of my own love.`}</ScriptBody>
    ),
  },
];

export default function GroundingScripts() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = scripts.find((s) => s.id === activeId);

  return (
    <AppShell
      title="Grounding Scripts"
      subtitle="When you can't do a full session, these scripts help your body find safety in the moment. Choose one below to begin."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {scripts.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id === activeId ? null : s.id)}
            className={`rounded-xl border px-4 py-4 text-left transition-all ${
              activeId === s.id
                ? "border-calm-400 bg-calm-50 ring-1 ring-calm-300"
                : "border-calm-200 bg-white hover:border-calm-300 hover:bg-calm-50"
            }`}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-sm font-semibold text-slate-800">{s.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-4">{s.subtitle}</p>
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-6 rounded-xl border border-calm-200 bg-white p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-lg font-semibold text-calm-700">{active.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{active.subtitle}</p>
            </div>
            <button
              onClick={() => setActiveId(null)}
              className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition"
            >
              Close
            </button>
          </div>
          <div className="mt-4 border-t border-calm-100 pt-4">{active.content}</div>
        </div>
      )}
    </AppShell>
  );
}
