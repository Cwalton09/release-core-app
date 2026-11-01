"use client";

import { useState } from "react";
import Link from "next/link";
import { FREE_GUIDE_URL } from "@/components/FreeGuideSignup";
import { emailSignup } from "@/lib/emailSignup";

type Sway = "forward" | "backward" | "unsure";
type Answer = "yes" | "no" | "unsure";
type Status = "idle" | "sending" | "done" | "error";

// What brought them here, the statement they ask their body, and the next questions
// they get after leaving their email.
const TOPICS = [
  {
    key: "anxious",
    label: "Always on edge or anxious",
    statement: "It's safe for me to relax.",
    more: ["It's safe for me to stop watching for what could go wrong.", "I'm allowed to feel calm even when things aren't finished."],
  },
  {
    key: "sleep",
    label: "Trouble sleeping",
    statement: "It's safe for me to fall asleep.",
    more: ["My body can let its guard down at night.", "Nothing needs my attention while I sleep."],
  },
  {
    key: "money",
    label: "Money stress or money blocks",
    statement: "It's safe for me to have more money than I need.",
    more: ["I'm allowed to spend money on myself.", "Money can stay with me."],
  },
  {
    key: "people",
    label: "People-pleasing or relationships",
    statement: "It's safe for me to say no.",
    more: ["I'm still loved when someone is upset with me.", "My needs matter as much as theirs."],
  },
  {
    key: "body",
    label: "Body symptoms that won't settle",
    statement: "It's safe for my body to feel well.",
    more: ["Part of what I'm feeling is connected to stress my body is holding.", "My body is ready to let some of that stress go."],
  },
  {
    key: "seen",
    label: "Holding back or being seen",
    statement: "It's safe for me to be seen.",
    more: ["I'm allowed to take up space.", "I can be noticed and still be safe."],
  },
  {
    key: "rest",
    label: "Burnout or can't rest",
    statement: "I'm allowed to rest before everything is done.",
    more: ["I'm worthy even when I'm not doing anything.", "It's safe for me to slow down."],
  },
];

const btn =
  "w-full rounded-2xl border border-calm-200 bg-white px-5 py-4 text-left text-base transition hover:border-emerald-600 hover:bg-calm-50";
const primary =
  "rounded-full bg-emerald-700 px-10 py-4 text-base font-medium text-white shadow-sm transition hover:bg-emerald-800";

function SwayButtons({ onPick }: { onPick: (s: Sway) => void }) {
  return (
    <div className="mt-8 space-y-3">
      <button onClick={() => onPick("forward")} className={btn}>My body swayed forward</button>
      <button onClick={() => onPick("backward")} className={btn}>My body swayed backward</button>
      <button onClick={() => onPick("unsure")} className={btn}>I&apos;m not sure</button>
    </div>
  );
}

export default function SwayTestClient() {
  const [step, setStep] = useState(0);
  const [yesDir, setYesDir] = useState<Sway | null>(null);
  const [noDir, setNoDir] = useState<Sway | null>(null);
  const [topic, setTopic] = useState<(typeof TOPICS)[number] | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const go = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // A clear yes and no point in opposite directions.
  const calibrated = yesDir && noDir && yesDir !== "unsure" && noDir !== "unsure" && yesDir !== noDir;
  const yesWord = yesDir === "forward" ? "forward" : "backward";

  function pickNo(s: Sway) {
    setNoDir(s);
    go(3);
  }

  function pickAnswer(s: Sway) {
    setAnswer(s === "unsure" ? "unsure" : s === yesDir ? "yes" : "no");
    go(6);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const signup = await emailSignup({ email, firstName, website, source: `sway:${topic?.key}:${answer}` });
    if (!signup.ok) {
      setError(signup.error);
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  function restart() {
    setYesDir(null);
    setNoDir(null);
    setTopic(null);
    setAnswer(null);
    go(0);
  }

  const wrap = "mx-auto max-w-2xl py-6 sm:py-10";
  const eyebrow = "text-xs font-medium uppercase tracking-[0.2em] text-calm-600";
  const h = "mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 [text-wrap:balance] sm:text-4xl";
  const lead = "mt-5 text-lg leading-8 text-slate-600";

  // Intro
  if (step === 0) {
    return (
      <div className={`${wrap} text-center`}>
        <p className={eyebrow}>Free · 3 minutes</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-slate-900 [text-wrap:balance] sm:text-5xl">
          Ask your body a yes or no question
        </h1>
        <p className={`${lead} mx-auto max-w-xl`}>
          Your mind can say one thing while your body believes another. The sway test is how Release Core
          asks your body directly. Try it now, free, and see what yours says.
        </p>
        <button onClick={() => go(1)} className={`${primary} mt-9`}>
          Start the sway test
        </button>
        <p className="mt-4 text-sm text-slate-500">You&apos;ll need to stand up for this one.</p>
      </div>
    );
  }

  // Set up
  if (step === 1) {
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 1 of 4 · Get ready</p>
        <h1 className={h}>Stand up and let your body soften</h1>
        <ul className="mt-6 space-y-3 text-lg leading-8 text-slate-700">
          <li>• Stand with your feet together, near a wall or chair so you feel steady.</li>
          <li>• Let your arms hang loose. Take a slow breath out.</li>
          <li>• Read each step first, then close your eyes to do it.</li>
          <li>• Don&apos;t try to make anything happen. Your body will gently lean on its own, usually within a few seconds.</li>
        </ul>
        <button onClick={() => go(2)} className={`${primary} mt-9`}>I&apos;m standing</button>
      </div>
    );
  }

  // Find your yes
  if (step === 2) {
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 2 of 4 · Find your yes</p>
        <h1 className={h}>Say out loud: &ldquo;My name is [your real name].&rdquo;</h1>
        <p className={lead}>Close your eyes, say it, and wait a few seconds. Which way did your body lean?</p>
        <SwayButtons onPick={(s) => { setYesDir(s); go(25); }} />
      </div>
    );
  }

  // Find your no (step 25 keeps the numbering simple between yes and no)
  if (step === 25) {
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 2 of 4 · Find your no</p>
        <h1 className={h}>Now say: &ldquo;My name is [a name that isn&apos;t yours].&rdquo;</h1>
        <p className={lead}>Close your eyes, say it, and wait. Which way did your body lean this time?</p>
        <SwayButtons onPick={pickNo} />
      </div>
    );
  }

  // Check the calibration
  if (step === 3) {
    if (!calibrated) {
      return (
        <div className={wrap}>
          <p className={eyebrow}>Step 2 of 4 · Let&apos;s try that again</p>
          <h1 className={h}>Your yes and no didn&apos;t come through clearly yet</h1>
          <p className={lead}>That&apos;s really common the first time. A few things that help:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>• Drink a glass of water and take three slow breaths.</li>
            <li>• Unlock your knees and let your body feel heavy.</li>
            <li>• Instead of a name, try asking: &ldquo;Can you show me a yes?&rdquo; then &ldquo;Can you show me a no?&rdquo;</li>
            <li>• Give it a few more seconds. Some bodies move slowly.</li>
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => go(2)} className={primary}>Try again</button>
            <button onClick={() => go(4)} className="rounded-full border border-slate-300 px-8 py-4 font-medium text-slate-700 hover:bg-slate-50">
              Keep going anyway
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 2 of 4 · You found it</p>
        <h1 className={h}>Your body&apos;s yes is {yesWord}. Your no is the other way.</h1>
        <p className={lead}>
          Everyone&apos;s yes and no are different, so this is yours. Now you can ask your body something
          you actually want to know.
        </p>
        <button onClick={() => go(4)} className={`${primary} mt-9`}>Ask my body a question</button>
      </div>
    );
  }

  // Choose a topic
  if (step === 4) {
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 3 of 4 · What brought you here?</p>
        <h1 className={h}>Pick the one that feels closest</h1>
        <div className="mt-8 space-y-3">
          {TOPICS.map((t) => (
            <button key={t.key} onClick={() => { setTopic(t); go(5); }} className={btn}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Ask the question
  if (step === 5 && topic) {
    return (
      <div className={wrap}>
        <p className={eyebrow}>Step 4 of 4 · Ask your body</p>
        <h1 className={h}>Say out loud: &ldquo;{topic.statement}&rdquo;</h1>
        <p className={lead}>
          Close your eyes, say it slowly, and let your body answer. Don&apos;t think it through. Trust the
          first lean.
        </p>
        <SwayButtons onPick={pickAnswer} />
      </div>
    );
  }

  // Result
  const said = answer === "no" ? "no" : answer === "yes" ? "yes" : null;
  return (
    <div className={`${wrap} space-y-10`}>
      <section className="text-center">
        <p className={eyebrow}>Your body&apos;s answer</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {said === "no" ? "Your body said no." : said === "yes" ? "Your body said yes." : "Your body wasn't sure."}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          {said === "no" &&
            `To “${topic?.statement}” That isn't a flaw, and it isn't you being negative. It's a rule your body learned at some point to keep you safe, and it's still following it. That's often why it keeps coming back no matter how much you understand it.`}
          {said === "yes" &&
            `To “${topic?.statement}” That's a good sign. When something still feels stuck, the rule holding it is usually one layer deeper, and your body can show you where.`}
          {!said &&
            "That happens, especially the first time. An unclear answer can mean the question touches something your body isn't ready to answer yet. Try again after a glass of water, or let a session guide you through it."}
        </p>
      </section>

      {status === "done" ? (
        <section className="space-y-5 rounded-3xl bg-calm-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-900">Two more questions to ask your body</h2>
          <p className="leading-7 text-slate-700">Same as before: stand, say it out loud, and notice the lean.</p>
          <ul className="space-y-2">
            {topic?.more.map((m) => (
              <li key={m} className="rounded-2xl bg-white px-5 py-4 text-lg text-slate-800">&ldquo;{m}&rdquo;</li>
            ))}
          </ul>
          <p className="leading-7 text-slate-700">
            Got a no? In a session, your body leads you to when that rule started and what it learned, and
            then you rewire it.
          </p>
          <div className="rounded-2xl bg-white p-5 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-slate-900">Your free guide is on its way to your inbox.</p>
            <p>If you don&apos;t see it in a few minutes, check your spam folder.</p>
            <a href={FREE_GUIDE_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-emerald-700 underline underline-offset-4">
              Download the guide now
            </a>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl bg-calm-50 p-7">
          <h2 className="text-2xl font-semibold text-slate-900">What should you ask your body next?</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Get two more questions for what you picked, plus my free guide,{" "}
            <span className="font-medium">Find the Belief Underneath</span>.
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
              {status === "sending" ? "Sending..." : "Send them to me"}
            </button>
          </form>
          {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
        </section>
      )}

      <section className="rounded-3xl border border-calm-200 bg-white p-7 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">See what a full session looks like</h2>
        <video
          className="mx-auto mt-5 w-full max-w-[260px] rounded-2xl bg-slate-900"
          src="/social/videos/bb1-session.mp4"
          poster="/social/videos/bb1-session-poster.jpg"
          controls
          playsInline
          preload="none"
        />
        <p className="mt-3 text-sm text-slate-500">Chelsea guiding a live session. Clip from Boots &amp; Baddies with Laura Haynes.</p>
      </section>

      <section className="rounded-3xl bg-calm-700 px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold text-white">Your body already knows where this started.</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-calm-100">
          A Release Core session uses this same sway test to follow your body back to the rule it&apos;s
          still running, so you can rewire it.
        </p>
        <Link href="/signup" className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-medium text-calm-700 transition hover:bg-calm-50">
          Start your first session
        </Link>
      </section>

      <div className="text-center text-sm">
        <button onClick={restart} className="text-slate-500 underline underline-offset-4">Start over</button>
      </div>

      <p className="text-center text-xs leading-6 text-slate-400">
        The sway test is for self-awareness, not diagnosis. Release Core is not a substitute for medical or
        mental health care.
      </p>
    </div>
  );
}
