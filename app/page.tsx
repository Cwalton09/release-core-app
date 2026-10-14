import Link from "next/link";
import Image from "next/image";
import AppShell from "@/components/AppShell";
import FreeGuideSignup from "@/components/FreeGuideSignup";
import type { Metadata } from "next";
import { FACEBOOK_GROUP_URL } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Tells Google which social accounts belong to Release Core.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Release Core",
  url: "https://release-core.com",
  logo: "https://release-core.com/opengraph-image",
  founder: { "@type": "Person", name: "Chelsea Walton" },
  sameAs: [
    "https://www.instagram.com/releasecoremethod",
    "https://www.tiktok.com/@releasecore",
  ],
};

// What people are living with, each linked to the article that explains it.
const struggles = [
  { text: "On edge, even when nothing is wrong", href: "/articles/signs-nervous-system-stuck-in-fight-or-flight" },
  { text: "Exhausted all day, wide awake at night", href: "/articles/why-cant-i-sleep-when-exhausted" },
  { text: "Anxious for no reason you can name", href: "/articles/why-do-i-feel-anxious-for-no-reason" },
  { text: "Your stomach feels every stress first", href: "/articles/why-does-stress-upset-my-stomach" },
  { text: "Tics that get louder under pressure", href: "/articles/tics-and-the-nervous-system" },
  { text: "Pain that stayed after the injury healed", href: "/articles/why-does-pain-last-after-healing" },
  { text: "The same relationship, a different person", href: "/articles/why-do-i-keep-attracting-the-same-relationship" },
  { text: "Money that always seems to slip away", href: "/articles/why-cant-i-manifest-money" },
];

const steps = [
  {
    title: "Ask your body",
    body: "You ask your nervous system whether there is an emotional connection to what you're feeling.",
  },
  {
    title: "Let it lead you to the start",
    body: "If there is, your body leads you directly to it: the age it started, what happened, and what your body learned.",
  },
  {
    title: "Rewire it",
    body: "You give your body a new message, with questions it can actually say yes to. Then you check how it feels now.",
  },
];

const quotes = [
  "My nervous system is calm, and it was out of control.",
  "Release Core is incredible for getting to the very root for me in ways journaling or anything else could never reveal.",
  "Within 10 minutes of the session, I was feeling way better and could actually function again.",
];

const appIncludes = [
  "Guided deep sessions, anytime",
  "Your nighttime script and session summary to keep",
  "Faith-based or non-faith sessions",
  "Grounding scripts, quick relief, and the dream interpreter",
];

export default function Home() {
  return (
    <AppShell title="Release Core" bare>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="space-y-20 sm:space-y-28">
        {/* Hero */}
        <section className="mx-auto max-w-3xl pt-6 text-center sm:pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-calm-600">
            For anxiety, tension, sleepless nights, and patterns that keep repeating
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 [text-wrap:balance] sm:text-6xl">
            You know you&apos;re safe.
            <br />
            <span className="text-calm-700">Your body doesn&apos;t believe it&nbsp;yet.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Release Core helps your body show you where a reaction started, then teaches it
            something new, so it can finally stop protecting you from something that&apos;s already
            over.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-700 px-8 py-4 text-base font-medium text-white shadow-sm transition hover:bg-emerald-800"
            >
              Start your first session
            </Link>
            <Link
              href="/free"
              className="rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Get the free guide
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-md text-sm italic leading-6 text-slate-500">
            “Within 10 minutes of the session, I was feeling way better and could actually function
            again.”
          </p>
        </section>

        {/* Does this sound like you? */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Does this sound like you?
            </h2>
            <p className="mt-3 text-slate-600">Tap the one that feels most familiar.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {struggles.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center justify-between rounded-2xl border border-calm-200 bg-white px-5 py-4 text-slate-800 shadow-sm transition hover:border-calm-500 hover:bg-calm-50"
              >
                <span>{s.text}</span>
                <span className="text-calm-500 transition group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
          <p className="text-center text-lg font-medium text-slate-900">
            It isn&apos;t a flaw in you. It&apos;s protection.
          </p>
        </section>

        {/* Why it keeps coming back */}
        <section className="rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Why it keeps coming back
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-300">
            <p>
              Most of the time, we don&apos;t know the real reason for what&apos;s driving the
              trigger. You can understand it, talk about it, and still feel it every day.
            </p>
            <p className="text-white">
              That&apos;s because you can&apos;t think your way out of something your body believes.
            </p>
            <p>
              Release Core gently activates the original trigger, so your body can show you what the
              real trigger is, where it started, and what it&apos;s still protecting you from.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-10">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
            How Release Core works
          </h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-3xl border border-calm-200 bg-white p-7 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-calm-100 font-semibold text-calm-700">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-center text-slate-600">
            You don&apos;t have to dig through years of your life on your own.{" "}
            <Link href="/how-it-works" className="font-medium text-emerald-700 underline underline-offset-4">
              See a full example
            </Link>
          </p>
        </section>

        {/* Stories */}
        <section className="space-y-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
            What people feel afterward
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q} className="rounded-3xl bg-calm-50 p-7">
                <blockquote className="text-lg leading-8 text-slate-800">“{q}”</blockquote>
              </figure>
            ))}
          </div>
          <p className="text-center">
            <Link href="/stories" className="font-medium text-emerald-700 underline underline-offset-4">
              Read their full stories
            </Link>
          </p>
        </section>

        {/* Start */}
        <section className="mx-auto max-w-xl">
          <div className="flex flex-col rounded-3xl border-2 border-emerald-600 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">Start today</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">The Release Core app</h2>
            <p className="mt-3 text-slate-600">
              Guided sessions that walk you through it the same way I do one-on-one, whenever you
              need them.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              {appIncludes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-600" aria-hidden>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-8 rounded-full bg-emerald-700 px-6 py-4 text-center text-base font-medium text-white transition hover:bg-emerald-800"
            >
              Start your membership
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">Cancel anytime.</p>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            Want to work with me 1:1?{" "}
            <a
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline underline-offset-4"
            >
              Join the Release Core Method group on Facebook
            </a>{" "}
            and message me.
          </p>
        </section>

        {/* Chelsea */}
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <Image
            src="/chelsea.jpeg"
            alt="Chelsea Walton, creator of Release Core"
            width={160}
            height={160}
            className="h-40 w-40 shrink-0 rounded-full object-cover shadow-md"
          />
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Hi, I&apos;m Chelsea.</h2>
            <p className="leading-8 text-slate-600">
              I tried everything: supplements, EMDR, somatics, therapy. Some of it helped a little,
              but nothing shifted until I realized that if your body doesn&apos;t feel safe, it
              won&apos;t let anything go. That&apos;s how Release Core was born.
            </p>
            <Link href="/about" className="font-medium text-emerald-700 underline underline-offset-4">
              Read my story
            </Link>
          </div>
        </section>

        <FreeGuideSignup />

        {/* Final CTA */}
        <section className="rounded-3xl bg-calm-700 px-6 py-14 text-center sm:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Your body already knows where it started.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-calm-100">
            You don&apos;t need to know the root, the age, or the reason before you begin. Start with
            what you&apos;re feeling now.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-medium text-calm-700 shadow-sm transition hover:bg-calm-50"
          >
            Start your first session
          </Link>
        </section>

        <p className="mx-auto max-w-3xl pb-4 text-center text-xs leading-6 text-slate-400">
          Release Core is intended for educational, wellness, and personal growth purposes. It is
          not medical or psychological treatment and does not diagnose, treat, cure, or prevent
          disease. Physical symptoms and health conditions can have many causes and should be
          evaluated by an appropriate healthcare professional when needed. Testimonials are personal
          experiences and not a guarantee of results.
        </p>
      </div>
    </AppShell>
  );
}
