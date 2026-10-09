import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Invite Chelsea Walton on Your Podcast",
  description:
    "Chelsea Walton, creator of the Release Core Method, talks about why the body reacts when you know you're safe, tics and the nervous system, and finding the belief underneath anxiety.",
  alternates: { canonical: "/podcast" },
};

const topics = [
  {
    title: "Why your body still reacts when you know you're safe",
    body: "Knowing and feeling are two different things. Why insight alone doesn't change how you feel, and what the nervous system is actually responding to.",
  },
  {
    title: "Tics, stress, and the nervous system",
    body: "Why tics flare with stress, why kids hold them in at school and let go at home, and what parents can look for underneath the flare-ups.",
  },
  {
    title: "Emotions aren't the root. They're protective layers.",
    body: "Anxiety, anger, numbness, and shutdown as protection, and the core beliefs underneath them that the body learned early on.",
  },
  {
    title: "Why affirmations bounce off, and questions don't",
    body: "Your nervous system argues with statements it doesn't believe yet. Why a question like \"Can you show me what my body softening 10% feels like?\" gets past that.",
  },
  {
    title: "From mold illness and 65 supplements to building my own method",
    body: "Chelsea's story: years of trying everything, what finally shifted, and why she built Release Core so others don't have to search the way she did.",
  },
  {
    title: "Faith and the nervous system",
    body: "How faith can be part of healing the body's old protective patterns, for listeners who want God included.",
  },
];

const questions = [
  "Why can someone know they're safe and still have a panic response?",
  "What does it mean that emotions are protective layers?",
  "Why do tics get louder during stressful seasons?",
  "How do you find the age a pattern started?",
  "Why do you use questions instead of affirmations?",
  "What made you stop trying everything and build your own method?",
  "What's one thing listeners can notice in their body this week?",
];

export default function PodcastPage() {
  return (
    <AppShell
      title="Invite Chelsea on Your Podcast"
      subtitle="Everything you need to have Chelsea Walton, creator of the Release Core Method, on your show."
    >
      <div className="space-y-10 text-base leading-8 text-slate-700">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/chelsea.jpeg"
            alt="Chelsea Walton, creator of the Release Core Method"
            width={180}
            height={332}
            className="h-auto w-40 shrink-0 rounded-2xl"
          />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Short bio</h2>
            <p>
              Chelsea Walton is the creator of the Release Core Method, a nervous system approach
              that helps people find the belief underneath anxiety, panic, shutdown, and patterns
              they can&apos;t think their way out of. After years of chronic illness and trying
              everything from EMDR to 65+ supplements, she began researching the nervous system
              herself and discovered that emotions aren&apos;t the root. They&apos;re protective
              layers. Today she helps people find when a pattern started, what their body learned,
              and how to rewire it.
            </p>
            <p className="text-sm text-slate-500">
              One-line intro: &ldquo;Chelsea Walton is the creator of the Release Core Method, which
              helps your body let go of the patterns it learned to protect you.&rdquo;
            </p>
            <a href="/chelsea.jpeg" download className="text-sm text-emerald-700 underline underline-offset-4">
              Download headshot
            </a>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Topics Chelsea can speak on</h2>
          {topics.map((t) => (
            <div key={t.title}>
              <h3 className="font-semibold text-slate-900">{t.title}</h3>
              <p className="mt-1">{t.body}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Sample interview questions</h2>
          <ul className="list-disc space-y-2 pl-6">
            {questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Good fit for shows about</h2>
          <p>
            Anxiety and mental wellness, nervous system healing, chronic illness, Tourette&apos;s
            and tics, parenting, Christian women and faith, personal growth, and mind-body health.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Book Chelsea</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Email Chelsea with your show name and a few dates that work, and she&apos;ll get back to
            you. You can also reach her on Instagram.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:releasecoremethod@gmail.com?subject=Podcast%20guest%20invitation"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
            >
              Email Chelsea
            </a>
            <a
              href="https://ig.me/m/releasecoremethod"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Message on Instagram
            </a>
          </div>
          <p className="mt-3 text-sm text-slate-600">releasecoremethod@gmail.com</p>
          <p className="mt-4 text-sm text-slate-600">
            Learn more: <Link href="/about" className="text-emerald-700 underline underline-offset-4">Chelsea&apos;s story</Link>
            {" · "}
            <Link href="/how-it-works" className="text-emerald-700 underline underline-offset-4">How a session works</Link>
            {" · "}
            <Link href="/articles" className="text-emerald-700 underline underline-offset-4">Articles</Link>
          </p>
        </section>
      </div>
    </AppShell>
  );
}
