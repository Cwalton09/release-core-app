"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/start-session", label: "Start Session" },
  { href: "/session-entry", label: "Session Entry" },
  { href: "/grounding-scripts", label: "Grounding Scripts" },
  { href: "/quick-relief", label: "Quick Relief" },
  { href: "/dream-interpreter", label: "Dream Interpreter" },
  { href: "/faq", label: "FAQ" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

type BodyStatement = {
  text: string;
  answer: "yes" | "no" | null;
};

const OPENING_MESSAGE = `Welcome to your Guided Deep Session.

We're going to run this just like a Release Core session.

First, tell me what we're looking at today.

It can be anything — a physical symptom, mold or mycotoxins, skin, gut issues, fertility, fatigue, pain, a relationship trigger, anxiety, anger, money, confidence, grief, a repeating pattern, something your body keeps doing, or something else entirely.

You do not need to know why it is happening. That's what we're going to figure out.

What are we looking at today?`;

function parseBodyStatements(text: string): BodyStatement[] | null {
  const lines = text.split("\n");
  const statements: BodyStatement[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const isBullet =
      /^[\*\-•–]\s+.{5,}/.test(trimmed) ||
      /^\d+[\.\)]\s+.{5,}/.test(trimmed);

    if (!isBullet) continue;

    const clean = trimmed
      .replace(/^[\*\-•–]\s+/, "")
      .replace(/^\d+[\.\)]\s+/, "")
      .replace(/^["“”]/, "")
      .replace(/["“”]$/, "")
      .trim();

    const skipWords = [
      "note:",
      "for example",
      "example:",
      "step ",
      "what we found",
      "the rewire",
      "your nighttime script",
      "session summary",
    ];

    const shouldSkip = skipWords.some((word) =>
      clean.toLowerCase().startsWith(word)
    );

    if (clean.length > 5 && !shouldSkip) {
      statements.push({
        text: clean,
        answer: null,
      });
    }
  }

  return statements.length >= 1 ? statements : null;
}

function splitMessageParts(content: string): {
  intro: string;
  statements: BodyStatement[] | null;
  outro: string;
} {
  const statements = parseBodyStatements(content);

  if (!statements) {
    return {
      intro: content,
      statements: null,
      outro: "",
    };
  }

  const lines = content.split("\n");

  const introLines: string[] = [];
  const outroLines: string[] = [];

  let inList = false;
  let listDone = false;

  for (const line of lines) {
    const trimmed = line.trim();

    const isBullet =
      /^[\*\-•–]\s+.{5,}/.test(trimmed) ||
      /^\d+[\.\)]\s+.{5,}/.test(trimmed);

    if (isBullet && !listDone) {
      inList = true;
      continue;
    }

    if (inList && !isBullet) {
      listDone = true;
      inList = false;

      if (trimmed) {
        outroLines.push(line);
      }

      continue;
    }

    if (!inList && !listDone) {
      introLines.push(line);
    } else if (listDone) {
      outroLines.push(line);
    }
  }

  return {
    intro: introLines.join("\n").trim(),
    statements,
    outro: outroLines.join("\n").trim(),
  };
}

function BodyQuestionList({
  statements,
  onSubmit,
}: {
  statements: BodyStatement[];
  onSubmit: (answers: BodyStatement[]) => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(
    statements.map(() => false)
  );

  const [submitted, setSubmitted] = useState(false);
  const [somethingElse, setSomethingElse] = useState("");
  const [somethingElseChecked, setSomethingElseChecked] =
    useState(false);

  function toggle(index: number) {
    setChecked((previous) =>
      previous.map((value, i) =>
        i === index ? !value : value
      )
    );
  }

  function handleSubmit() {
    if (submitted) return;

    setSubmitted(true);

    const answers: BodyStatement[] = statements.map(
      (statement, index) => ({
        ...statement,
        answer: checked[index] ? "yes" : "no",
      })
    );

    if (somethingElseChecked && somethingElse.trim()) {
      answers.push({
        text: `Something else: ${somethingElse.trim()}`,
        answer: "yes",
      });
    }

    onSubmit(answers);
  }

  if (submitted) {
    return (
      <div className="space-y-2 opacity-70">
        {statements.map((statement, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                checked[index]
                  ? "border-green-600 bg-green-600"
                  : "border-slate-300 bg-white"
              }`}
            >
              {checked[index] && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <p className="text-sm text-slate-600">
              {statement.text}
            </p>

            <span className="ml-auto text-xs font-semibold text-slate-400">
              {checked[index] ? "YES" : "NO"}
            </span>
          </div>
        ))}

        {somethingElseChecked && somethingElse.trim() && (
          <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
            <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-green-600 bg-green-600">
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-sm text-slate-600">
              {somethingElse}
            </p>

            <span className="ml-auto text-xs font-semibold text-green-700">
              YES
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="mb-3 text-xs leading-5 text-slate-500">
        Ask your body each question. Check the box for YES.
        Leave it unchecked for NO, then tap Submit when you're finished.
      </p>

      {statements.map((statement, index) => (
        <button
          key={index}
          type="button"
          onClick={() => toggle(index)}
          className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
            checked[index]
              ? "border-green-500 bg-green-50"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
              checked[index]
                ? "border-green-600 bg-green-600"
                : "border-slate-300 bg-white"
            }`}
          >
            {checked[index] && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <p className="text-sm leading-6 text-slate-700">
            {statement.text}
          </p>
        </button>
      ))}

      <div
        className={`rounded-xl border-2 px-4 py-3 transition-all ${
          somethingElseChecked
            ? "border-green-500 bg-green-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <button
          type="button"
          onClick={() =>
            setSomethingElseChecked(!somethingElseChecked)
          }
          className="flex w-full items-center gap-3 text-left"
        >
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 ${
              somethingElseChecked
                ? "border-green-600 bg-green-600"
                : "border-slate-300 bg-white"
            }`}
          >
            {somethingElseChecked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <p className="text-sm italic text-slate-500">
            Something else came up...
          </p>
        </button>

        {somethingElseChecked && (
          <textarea
            value={somethingElse}
            onChange={(event) =>
              setSomethingElse(event.target.value)
            }
            placeholder="Type what came up..."
            rows={2}
            className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-green-400 focus:outline-none"
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-3 w-full rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
      >
        Submit my answers →
      </button>
    </div>
  );
}

function AssistantMessage({
  content,
  onBodySubmit,
  isLatest,
}: {
  content: string;
  onBodySubmit: (answers: BodyStatement[]) => void;
  isLatest: boolean;
}) {
  const { intro, statements, outro } =
    splitMessageParts(content);

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">
        RC
      </div>

      <div className="flex-1 space-y-3">
        {intro && (
          <div className="rounded-2xl rounded-tl-sm border border-calm-200 bg-white px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {intro}
            </p>
          </div>
        )}

        {statements && (
          <div className="rounded-2xl border border-calm-200 bg-white p-4">
            <BodyQuestionList
              statements={statements}
              onSubmit={
                isLatest ? onBodySubmit : () => {}
              }
            />
          </div>
        )}

        {outro && (
          <div className="rounded-2xl rounded-tl-sm border border-calm-200 bg-white px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {outro}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function extractSection(
  content: string,
  heading: string,
  nextHeading?: string
) {
  const lower = content.toLowerCase();
  const start = lower.indexOf(heading.toLowerCase());

  if (start === -1) return "";

  const contentStart = start + heading.length;

  if (!nextHeading) {
    return content.slice(contentStart).trim();
  }

  const end = lower.indexOf(
    nextHeading.toLowerCase(),
    contentStart
  );

  if (end === -1) {
    return content.slice(contentStart).trim();
  }

  return content.slice(contentStart, end).trim();
}

function savePDF({
  title,
  content,
  filename,
}: {
  title: string;
  content: string;
  filename: string;
}) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 55;
  const usableWidth = pageWidth - margin * 2;

  let y = 60;

  const addHeader = () => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(21);
    pdf.text("Release Core", margin, y);

    y += 30;

    pdf.setFontSize(15);
    pdf.text(title, margin, y);

    y += 30;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
  };

  const newPage = () => {
    pdf.addPage();
    y = 60;
    addHeader();
  };

  addHeader();

  const paragraphs = content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  paragraphs.forEach((paragraph) => {
    const lines = pdf.splitTextToSize(
      paragraph,
      usableWidth
    );

    for (const line of lines) {
      if (y > pageHeight - 60) {
        newPage();
      }

      pdf.text(line, margin, y);
      y += 17;
    }

    y += 8;
  });

  pdf.save(filename);
}

export default function Phase2Session() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  const [messages, setMessages] = useState<Message[]>(
    []
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sessionComplete, setSessionComplete] =
    useState(false);

  const [bodyAnswersSubmitted, setBodyAnswersSubmitted] =
    useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!mounted) return;

      if (!profile?.paid) {
        window.location.href = STRIPE_PAYMENT_LINK;
        return;
      }

      setChecking(false);
    }

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function checkIfComplete(text: string) {
    return text
      .toLowerCase()
      .includes("your phase 2 session is complete");
  }

  async function sendToAI(userContent: string) {
    const userMessage: Message = {
      role: "user",
      content: userContent,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setLoading(true);
    setError("");
    setBodyAnswersSubmitted(false);

    try {
      const response = await fetch("/api/phase2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(
          data.error || "Something went wrong."
        );
      } else {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
        };

        setMessages([
          ...newMessages,
          assistantMessage,
        ]);

        if (checkIfComplete(data.message)) {
          setSessionComplete(true);
        }
      }
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const text = input.trim();

    setInput("");

    await sendToAI(text);
  }

  function handleBodySubmit(
    answers: BodyStatement[]
  ) {
    setBodyAnswersSubmitted(true);

    const formatted = answers
      .map(
        (answer) =>
          `${answer.text} — ${
            answer.answer === "yes"
              ? "YES"
              : "NO"
          }`
      )
      .join("\n");

    sendToAI(formatted);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  }

  const finalAssistantMessage = messages
    .filter(
      (message) => message.role === "assistant"
    )
    .slice(-1)[0];

  const finalContent =
    finalAssistantMessage?.content || "";

  const nighttimeScript = sessionComplete
    ? extractSection(
        finalContent,
        "Your Nighttime Script",
        "Session Summary"
      )
    : "";

  const sessionSummary = sessionComplete
    ? extractSection(
        finalContent,
        "Session Summary"
      )
        .replace(
          /Your Phase 2 session is complete\./gi,
          ""
        )
        .trim()
    : "";

  function downloadNighttimeScript() {
    if (!nighttimeScript) return;

    savePDF({
      title: "Nighttime Script",
      content: nighttimeScript,
      filename: `release-core-nighttime-script-${new Date()
        .toLocaleDateString("en-US")
        .replace(/\//g, "-")}.pdf`,
    });
  }

  function downloadSummary() {
    if (!sessionSummary) return;

    savePDF({
      title: "Session Summary",
      content: sessionSummary,
      filename: `release-core-session-summary-${new Date()
        .toLocaleDateString("en-US")
        .replace(/\//g, "-")}.pdf`,
    });
  }

  const lastAssistantMessage = messages
    .filter(
      (message) => message.role === "assistant"
    )
    .slice(-1)[0];

  const lastHasBodyQuestions =
    lastAssistantMessage
      ? parseBodyStatements(
          lastAssistantMessage.content
        ) !== null
      : false;

  const showTextInput =
    !lastHasBodyQuestions ||
    bodyAnswersSubmitted ||
    sessionComplete;

  if (checking) {
    return (
      <p className="p-6 text-center text-sm text-slate-500">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm font-semibold text-calm-700"
          >
            Release Core
          </Link>

          <div className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-xs text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${
                menuOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-calm-700 transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${
                menuOpen
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-calm-200 bg-calm-50 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Guided Deep Session
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Follow your body's answers until we
            uncover the pattern underneath what
            you're experiencing.
          </p>
        </div>

        <div className="mb-4 flex-1 space-y-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">
              RC
            </div>

            <div className="flex-1 rounded-2xl rounded-tl-sm border border-calm-200 bg-white px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {OPENING_MESSAGE}
              </p>
            </div>
          </div>

          {messages.map((message, index) => {
            const isLatestAssistant =
              message.role === "assistant" &&
              index === messages.length - 1;

            if (message.role === "assistant") {
              return (
                <AssistantMessage
                  key={index}
                  content={message.content}
                  onBodySubmit={
                    handleBodySubmit
                  }
                  isLatest={
                    isLatestAssistant &&
                    !bodyAnswersSubmitted
                  }
                />
              );
            }

            return (
              <div
                key={index}
                className="flex flex-row-reverse gap-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-400 text-xs font-semibold text-white">
                  You
                </div>

                <div className="flex-1 rounded-2xl rounded-tr-sm border border-calm-200 bg-calm-50 px-4 py-3">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">
                RC
              </div>

              <div className="flex-1 rounded-2xl rounded-tl-sm border border-calm-200 bg-white px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-calm-400"
                    style={{
                      animationDelay: "0ms",
                    }}
                  />

                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-calm-400"
                    style={{
                      animationDelay: "150ms",
                    }}
                  />

                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-calm-400"
                    style={{
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {sessionComplete && (
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
              <div className="mb-5 text-center">
                <p className="mb-2 text-2xl">
                  ✨
                </p>

                <p className="mb-2 text-base font-semibold text-slate-900">
                  Your Release Core session is
                  complete.
                </p>

                <p className="text-sm leading-6 text-slate-600">
                  Your Nighttime Script and
                  Session Summary are ready.
                </p>
              </div>

              <div className="mb-5 rounded-xl border border-amber-300 bg-white p-4">
                <p className="mb-1 text-sm font-bold text-amber-800">
                  You must download these now.
                </p>

                <p className="text-xs leading-5 text-slate-600">
                  Phase 2 sessions are not saved
                  to your dashboard. Once you leave
                  this page, you may not be able to
                  return to this session. Download
                  both PDFs before closing or
                  leaving this page.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={
                    downloadNighttimeScript
                  }
                  disabled={!nighttimeScript}
                  className="w-full rounded-xl bg-calm-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-calm-700 disabled:opacity-50"
                >
                  🌙 Download Nighttime Script PDF
                </button>

                <button
                  onClick={downloadSummary}
                  disabled={!sessionSummary}
                  className="w-full rounded-xl border border-calm-300 bg-white px-6 py-3 text-sm font-semibold text-calm-700 transition hover:bg-calm-100 disabled:opacity-50"
                >
                  ⬇ Download Session Summary PDF
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {showTextInput &&
          !sessionComplete && (
            <div className="sticky bottom-4">
              <div className="flex items-end gap-3 rounded-2xl border border-calm-200 bg-white p-3 shadow-sm">
                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer here..."
                  rows={3}
                  className="flex-1 resize-none text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  onClick={sendMessage}
                  disabled={
                    loading || !input.trim()
                  }
                  className="flex-shrink-0 rounded-xl bg-calm-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>

              <p className="mt-2 text-center text-xs text-slate-400">
                Press Enter to send · Shift+Enter
                for a new line
              </p>
            </div>
          )}
      </main>
    </div>
  );
}