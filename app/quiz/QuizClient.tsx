"use client";

import { useState } from "react";
import Link from "next/link";
import { FREE_GUIDE_URL } from "@/components/FreeGuideSignup";
import { emailSignup } from "@/lib/emailSignup";
import { PATTERNS, QUESTIONS, scoreQuiz, type PatternKey } from "./quizData";

type Status = "idle" | "sending" | "done" | "error";

export default function QuizClient() {
  const [step, setStep] = useState(-1); // -1 = intro, 0..n-1 = questions, n = result
  const [answers, setAnswers] = useState<PatternKey[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const total = QUESTIONS.length;
  const finished = step >= total;
  const result = finished ? PATTERNS[scoreQuiz(answers)] : null;

  function choose(pattern: PatternKey) {
    const next = [...answers.slice(0, step), pattern];
    setAnswers(next);
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers([]);
    setStep(-1);
    setStatus("idle");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setStatus("sending");
    setError("");
    const pattern = scoreQuiz(answers);
    const signup = await emailSignup({ email, firstName, website, source: `quiz:${pattern}`, quizPattern: pattern });
    if (!signup.ok) {
      setError(signup.error);
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  async function share() {
    if (!result) return;
    const text = `I got ${result.name} on the Release Core quiz: "What is your body protecting you from?"`;
    const url = "https://release-core.com/quiz";
    try {
      if (navigator.share) {
        await navigator.share({ title: "What is your body protecting you from?", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
    } catch {
      // Sharing was cancelled; nothing to do.
    }
  }

  // Intro
  if (step === -1) {
    return (
      <div className="mx-auto max-w-2xl py-6 text-center sm:py-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-calm-600">2-minute quiz</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-slate-900 [text-wrap:balance] sm:text-5xl">
          What is your body protecting you from?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Your reactions aren&apos;t random. Answer 8 quick questions to find the protection
          pattern your nervous system is running, and what it learned.
        </p>
        <button
          onClick={() => setStep(0)}
          className="mt-9 rounded-full bg-emerald-700 px-10 py-4 text-base font-medium text-white shadow-sm transition hover:bg-emerald-800"
        >
          Start the quiz
        </button>
        <p className="mt-4 text-sm text-slate-500">Go with your first instinct. There are no wrong answers.</p>
      </div>
    );
  }

  // Questions
  if (!finished) {
    const q = QUESTIONS[step];
    return (
      <div className="mx-auto max-w-2xl py-4 sm:py-8">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <button onClick={back} disabled={step === 0} className="disabled:invisible">
            ← Back
          </button>
          <span>
            {step + 1} of {total}
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-calm-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
        <h2 className="mt-10 text-2xl font-semibold leading-snug text-slate-900 [text-wrap:balance] sm:text-3xl">
          {q.prompt}
        </h2>
        <div className="mt-8 space-y-3">
          {q.answers.map((a) => (
            <button
              key={a.text}
              onClick={() => choose(a.pattern)}
              className={`w-full rounded-2xl border px-5 py-4 text-left text-base transition hover:border-emerald-600 hover:bg-calm-50 ${
                answers[step] === a.pattern ? "border-emerald-600 bg-calm-50" : "border-calm-200 bg-white"
              }`}
            >
              {a.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Result
  return (
    <div className="mx-auto max-w-2xl space-y-10 py-4 sm:py-8">
      <section className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-calm-600">Your pattern</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {result!.name}
        </h1>
        <p className="mt-3 text-xl text-calm-700">{result!.tagline}</p>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">{result!.summary}</p>
      </section>

      <section className="rounded-3xl border border-calm-200 bg-white p-7 shadow-sm">
        <h2 className="font-semibold text-slate-900">You might notice:</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          {result!.signs.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-emerald-600" aria-hidden>•</span>
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-slate-600">
          What your body may have learned: <span className="font-medium text-slate-900">{result!.learned}</span>
        </p>
      </section>

      {status === "done" ? (
        <section className="space-y-5 rounded-3xl bg-calm-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-900">Your full result</h2>
          {result!.full.map((p) => (
            <p key={p} className="leading-8 text-slate-700">
              {p}
            </p>
          ))}
          <div className="rounded-2xl bg-white p-5 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-slate-900">Your free guide is on its way to your inbox.</p>
            <p>If you don&apos;t see it in a few minutes, check your spam folder.</p>
            <a
              href={FREE_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-medium text-emerald-700 underline underline-offset-4"
            >
              Download the guide now
            </a>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Read more about your pattern:</p>
            <ul className="mt-2 space-y-1">
              {result!.articles.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="text-emerald-700 underline underline-offset-4">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl bg-calm-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-900">Get your full result</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Where {result!.name.replace("The ", "the ")} pattern usually starts, why it keeps coming
            back, and my free guide, <span className="font-medium">Find the Belief Underneath</span>.
          </p>
          <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring focus:ring-emerald-300 sm:w-40"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring focus:ring-emerald-300"
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Show my result"}
            </button>
          </form>
          {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
        </section>
      )}

      <section className="rounded-3xl bg-calm-700 px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Your body already knows where this started.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-calm-100">
          A Release Core session asks your body to lead you to it, so you can rewire it.
        </p>
        <Link
          href="/signup"
          className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-medium text-calm-700 transition hover:bg-calm-50"
        >
          Start your first session
        </Link>
      </section>

      <div className="flex flex-col items-center gap-3 text-sm sm:flex-row sm:justify-center">
        <button
          onClick={share}
          className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-800 transition hover:bg-slate-50"
        >
          {copied ? "Link copied!" : "Share the quiz"}
        </button>
        <button onClick={restart} className="text-slate-500 underline underline-offset-4">
          Take it again
        </button>
      </div>

      <p className="text-center text-xs leading-6 text-slate-400">
        This quiz is for self-awareness, not diagnosis. Release Core is not a substitute for medical
        or mental health care.
      </p>
    </div>
  );
}
