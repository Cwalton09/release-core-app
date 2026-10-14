import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "What Release Core Helps With: Anxiety, the Body, and Patterns",
  description:
    "Release Core looks at whether the nervous system is involved in anxiety, relationship patterns, gut issues, pain, sleep, fatigue, tics, and more, alongside proper medical care.",
  alternates: { canonical: "/what-it-helps" },
};

const rows = [
  {
    issue: "Anxiety, panic, overthinking, feeling on edge",
    why: "The nervous system is constantly assessing safety. If it has learned to expect danger, rejection, conflict, or unpredictability, the body can stay alert even when your conscious mind knows you are okay.",
  },
  {
    issue: "Anger, shutdown, people pleasing, relationship triggers",
    why: "These can sometimes be protection patterns. We may uncover beliefs around being left, not being enough, being misunderstood, keeping other people happy, or needing to stay emotionally guarded.",
  },
  {
    issue: "Gut issues, digestion, appetite, nutrient concerns",
    why: "The gut and nervous system communicate constantly. Stress physiology can affect appetite, motility, digestive activity, elimination, and how settled or defended the body feels while eating and digesting.",
  },
  {
    issue: "Mold, mycotoxins, toxins, chronic environmental stress",
    why: "If the body has been dealing with something threatening for a long time, the nervous system may stay highly protective even as the physical side is being addressed. Release Core can explore whether the system still feels like danger is happening now.",
  },
  {
    issue: "Fertility, hormones, cycle concerns",
    why: "Stress signaling and reproductive physiology are connected. In Release Core, we may explore things like safety, loss, fear, disappointment, control, pressure, receiving, or other patterns the nervous system may be carrying alongside the physical side of fertility.",
  },
  {
    issue: "Skin issues and physical reactivity",
    why: "The nervous system communicates with immune and inflammatory pathways. Sometimes we also uncover patterns around visibility, pressure, boundaries, being noticed, or feeling responsible for other people’s reactions.",
  },
  {
    issue: "Fatigue, burnout, brain fog, feeling depleted",
    why: "Sometimes we find a system that has spent years believing it cannot stop, cannot rest, cannot disappoint anyone, or has to carry everything. Other times the body may be trying to slow somebody down because it does not feel like they are allowed to choose rest themselves.",
  },
  {
    issue: "Pain, tension, tightness, chronic bracing",
    why: "The nervous system influences muscle guarding, tension, pain sensitivity, and protective bracing. We can explore whether the body still feels like it has to stay prepared or hold itself a certain way to be safe.",
  },
  {
    issue: "Sleep issues and difficulty truly resting",
    why: "Sometimes the body does not fully believe it is safe to let go. We may find beliefs around needing to stay alert, being responsible for everything, preparing for problems, or feeling like rest has to be earned.",
  },
  {
    issue: "Tics that get louder with stress",
    why: "Tics have a medical side and deserve real care. Stress, pressure, and holding tics in all day can turn the urge up, so we look at what the nervous system is bracing against.",
  },
  {
    issue: "Chronic illness, organ concerns, or overwhelmed body systems",
    why: "The autonomic nervous system helps regulate and communicate with many body systems. Release Core does not replace medical care, but it can explore whether chronic stress or protective patterns are another layer worth working with.",
  },
];

export default function WhatItHelpsPage() {
  return (
    <AppShell
      title="What Release Core helps with"
      subtitle="It’s about way more than anxiety."
    >
      <div className="space-y-10 text-base leading-8 text-slate-700">
        <section className="space-y-4">
          <p>
            Sometimes somebody comes to me because they are anxious, overwhelmed, angry, constantly
            overthinking, scared of rejection, struggling in a relationship, feeling stuck with
            money, afraid to be seen, unable to rest, or repeating the same pattern over and over.
          </p>
          <p>
            Other times, we are looking at what is happening physically. People bring things into
            sessions like gut issues, skin issues, fatigue, chronic tension, pain, sleep problems,
            hormone and fertility concerns, nutrient absorption concerns, mold and mycotoxin
            exposure, toxins, chronic illness, or situations where one part of the body just seems
            to be struggling.
          </p>
          <p>
            I am not looking at somebody with a physical issue and saying, “It is all your nervous
            system.” If mold is present, mold is present. If somebody has a medical condition, that
            matters. If there is a nutrient deficiency, infection, toxin exposure, or physical
            problem, that matters too.
          </p>
          <p className="font-medium text-slate-900">
            What I want to know is: is the nervous system involved too?
          </p>
          <p>
            Is the body still perceiving danger? Is it bracing? Is it constantly monitoring? Does it
            feel safe resting? Does it feel safe receiving nourishment or support? Does it believe
            it has to keep pushing? Does it believe slowing down is dangerous? Does it feel like it
            still has to protect you from something that happened years ago?
          </p>
          <p>That is the part we dig into with Release Core.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Where the nervous system comes in</h2>
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.issue} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">{row.issue}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-700">{row.why}</p>
              </div>
            ))}
          </div>
          <p>
            Want to read more about any of these?{" "}
            <Link href="/articles" className="text-emerald-700 underline underline-offset-4">
              Browse the articles
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Your nervous system does not have to be perfectly regulated before you can do this.
          </h2>
          <p>
            A lot of people I work with already feel like their body is completely maxed out. They
            are exhausted, sensitive to everything, wired and tired, overwhelmed, in pain, or feel
            like their body has been fighting for a very long time.
          </p>
          <p>
            I am not interested in forcing somebody like that into some huge emotional release just
            because we can. Sometimes the first thing the body needs is simply more safety.
          </p>
          <p className="font-medium text-slate-900">We work with what the body is ready for.</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
            >
              Start your first session
            </Link>
            <Link
              href="/free"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Get the free guide
            </Link>
          </div>
        </section>

        <p className="text-xs leading-6 text-slate-500">
          Release Core does not diagnose disease, remove toxins, treat mold exposure, or replace
          medical care. The purpose is to explore the nervous system and subconscious patterns that
          may be present alongside what someone is physically or emotionally experiencing.
        </p>
      </div>
    </AppShell>
  );
}
