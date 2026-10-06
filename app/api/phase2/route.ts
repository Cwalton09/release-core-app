"use client";

import { useState, useEffect, useRef } from "react";
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

What are we looking at today?

You can bring in a pattern, trigger, relationship issue, anxiety, overwhelm, money, confidence, grief, fatigue, sleep, skin, gut issues, mold or mycotoxin concerns, fertility, hormones, pain, tension, or anything else that feels important right now.

You do not need to know the root before we begin. We will start with what is happening now and follow your body's responses from there.`;

function parseBodyStatements(
  text: string
): BodyStatement[] | null {
  const lines = text.split("\n");
  const statements: BodyStatement[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const isBullet =
      /^[\*\-•–]\s+.{5,}/.test(trimmed) ||
      /^\d+[\.\)]\s+.{5,}/.test(trimmed);

    if (isBullet) {
      const cleaned = trimmed
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
        "check ",
        "test this",
      ];

      const shouldSkip = skipWords.some((w) =>
        cleaned.toLowerCase().startsWith(w)
      );

      if (cleaned.length > 5 && !shouldSkip) {
        statements.push({
          text: cleaned,
          answer: null,
        });
      }
    }
  }

  return statements.length >= 1
    ? statements
    : null;
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

  const [submitted, setSubmitted] =
    useState(false);

  const [somethingElse, setSomethingElse] =
    useState("");

  const [
    somethingElseChecked,
    setSomethingElseChecked,
  ] = useState(false);

  function toggle(index: number) {
    setChecked((prev) =>
      prev.map((value, i) =>
        i === index ? !value : value
      )
    );
  }

  function handleSubmit() {
    setSubmitted(true);

    const answers: BodyStatement[] =
      statements.map((statement, i) => ({
        ...statement,
        answer: checked[i] ? "yes" : "no",
      }));

    if (
      somethingElseChecked &&
      somethingElse.trim()
    ) {
      answers.push({
        text: somethingElse.trim(),
        answer: "yes",
      });
    }

    onSubmit(answers);
  }

  if (submitted) {
    return (
      <div className="space-y-2 opacity-60">
        {statements.map((statement, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-2.5"
          >
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                checked[i]
                  ? "border-green-600 bg-green-600"
                  : "border-slate-300 bg-white"
              }`}
            >
              {checked[i] && (
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
          </div>
        ))}

        {somethingElseChecked &&
          somethingElse.trim() && (
            <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-2.5">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-green-600 bg-green-600">
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
            </div>
          )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="mb-3 text-xs text-slate-500">
        Check the box for YES. Leave it
        unchecked for NO. Then submit all of
        your answers together.
      </p>

      {statements.map((statement, i) => (
        <button
          key={i}
          type="button"
          onClick={() => toggle(i)}
          className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
            checked[i]
              ? "border-green-500 bg-green-50"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
              checked[i]
                ? "border-green-600 bg-green-600"
                : "border-slate-300 bg-white"
            }`}
          >
            {checked[i] && (
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
            setSomethingElseChecked(
              !somethingElseChecked
            )
          }
          className="flex w-full items-center gap-3 text-left"
        >
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
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
            onChange={(e) =>
              setSomethingElse(e.target.value)
            }
            placeholder="Describe what came up..."
            rows={2}
            className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-green-400 focus:outline-none"
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
  onBodySubmit: (
    answers: BodyStatement[]
  ) => void;
  isLatest: boolean;
}) {
  const {
    intro,
    statements,
    outro,
  } = splitMessageParts(content);

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
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-calm-600">
              Body Testing
            </p>

            <BodyQuestionList
              statements={statements}
              onSubmit={
                isLatest
                  ? onBodySubmit
                  : () => {}
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

function getFinalAssistantContent(
  messages: Message[]
) {
  const assistantMessages =
    messages.filter(
      (message) =>
        message.role === "assistant"
    );

  return (
    assistantMessages[
      assistantMessages.length - 1
    ]?.content || ""
  );
}

function extractSection(
  content: string,
  startHeading: string,
  endHeading?: string
) {
  const lower = content.toLowerCase();

  const startIndex = lower.indexOf(
    startHeading.toLowerCase()
  );

  if (startIndex === -1) {
    return "";
  }

  const bodyStart =
    startIndex + startHeading.length;

  if (!endHeading) {
    return content
      .slice(bodyStart)
      .trim();
  }

  const endIndex = lower.indexOf(
    endHeading.toLowerCase(),
    bodyStart
  );

  if (endIndex === -1) {
    return content
      .slice(bodyStart)
      .trim();
  }

  return content
    .slice(bodyStart, endIndex)
    .trim();
}

function savePDF(
  title: string,
  body: string,
  filename: string
) {
  const pdf = new jsPDF({
    unit: "pt",
    format: "letter",
  });

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  const margin = 54;

  let y = 60;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);

  pdf.text("Release Core", margin, y);

  y += 28;

  pdf.setFontSize(14);
  pdf.text(title, margin, y);

  y += 26;

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(11);

  const cleaned = body
    .replace(/\r/g, "")
    .trim();

  const paragraphs =
    cleaned.split(/\n\s*\n/);

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) continue;

    const lines =
      pdf.splitTextToSize(
        paragraph.trim(),
        pageWidth - margin * 2
      );

    for (const line of lines) {
      if (
        y >
        pageHeight - margin
      ) {
        pdf.addPage();
        y = margin;
      }

      pdf.text(line, margin, y);

      y += 16;
    }

    y += 8;
  }

  pdf.save(filename);
}

export default function Phase2Session() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [checking, setChecking] =
    useState(true);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    sessionComplete,
    setSessionComplete,
  ] = useState(false);

  const [summary, setSummary] =
    useState("");

  const [
    generatingSummary,
    setGeneratingSummary,
  ] = useState(false);

  const [
    bodySubmitted,
    setBodySubmitted,
  ] = useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("paid")
          .eq(
            "user_id",
            session.user.id
          )
          .maybeSingle();

      if (!mounted) return;

      if (!profile?.paid) {
        window.location.href =
          STRIPE_PAYMENT_LINK;
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
    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }, [
    messages,
    loading,
    generatingSummary,
  ]);

  function checkIfComplete(
    text: string
  ) {
    return text
      .toLowerCase()
      .includes(
        "your phase 2 session is complete"
      );
  }

  async function generateSummary(
    completedMessages: Message[]
  ) {
    setGeneratingSummary(true);

    try {
      const response = await fetch(
        "/api/phase2-summary",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages:
              completedMessages,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        data.error
      ) {
        setError(
          data.error ||
            "Your session finished, but there was a problem generating the summary."
        );

        return;
      }

      if (data.summary) {
        setSummary(data.summary);
      }
    } catch {
      setError(
        "Your session finished, but there was a problem generating the summary."
      );
    } finally {
      setGeneratingSummary(false);
    }
  }

  async function sendToAI(
    userContent: string
  ) {
    const userMessage: Message = {
      role: "user",
      content: userContent,
    };

    const newMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(newMessages);
    setLoading(true);
    setError("");
    setBodySubmitted(false);

    try {
      const response = await fetch(
        "/api/phase2",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            messages: newMessages,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        data.error
      ) {
        setError(
          data.error ||
            "Something went wrong."
        );
      } else {
        const assistantMessage: Message =
          {
            role: "assistant",
            content: data.message,
          };

        const completedMessages = [
          ...newMessages,
          assistantMessage,
        ];

        setMessages(
          completedMessages
        );

        if (
          checkIfComplete(
            data.message
          )
        ) {
          setSessionComplete(true);

          await generateSummary(
            completedMessages
          );
        }
      }
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (
      !input.trim() ||
      loading
    ) {
      return;
    }

    const text = input.trim();

    setInput("");

    await sendToAI(text);
  }

  function handleBodySubmit(
    answers: BodyStatement[]
  ) {
    setBodySubmitted(true);

    const formatted =
      answers
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
    e: React.KeyboardEvent
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  }

  function extractNighttimeScript() {
    const finalContent =
      getFinalAssistantContent(
        messages
      );

    return extractSection(
      finalContent,
      "Your Nighttime Script",
      "Your Phase 2 session is complete"
    );
  }

  function downloadNighttimeScript() {
    const script =
      extractNighttimeScript();

    if (!script) {
      setError(
        "I couldn't find the nighttime script in the completed session."
      );

      return;
    }

    const date = new Date()
      .toLocaleDateString("en-US")
      .replace(/\//g, "-");

    savePDF(
      "Your Nighttime Script",
      script,
      `release-core-nighttime-script-${date}.pdf`
    );
  }

  function downloadSummary() {
    if (!summary.trim()) {
      return;
    }

    const date = new Date()
      .toLocaleDateString("en-US")
      .replace(/\//g, "-");

    savePDF(
      "Session Summary",
      summary,
      `release-core-session-summary-${date}.pdf`
    );
  }

  const lastAssistantMessage =
    messages
      .filter(
        (message) =>
          message.role ===
          "assistant"
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
    bodySubmitted ||
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
            {navItems.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-xs text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
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
                menuOpen
                  ? "opacity-0"
                  : ""
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
              {navItems.map(
                (item) => (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
                  >
                    {
                      item.label
                    }
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Guided Deep Session
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            A body-led session to
            uncover the pattern
            underneath what you are
            experiencing and practice a
            new response.
          </p>
        </div>

        <div className="mb-4 flex-1 space-y-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-calm-600 text-xs font-semibold text-white">
              RC
            </div>

            <div className="flex-1 rounded-2xl rounded-tl-sm border border-calm-200 bg-white px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {
                  OPENING_MESSAGE
                }
              </p>
            </div>
          </div>

          {messages.map(
            (message, i) => {
              const isLatestAssistant =
                message.role ===
                  "assistant" &&
                i ===
                  messages.length -
                    1;

              if (
                message.role ===
                "assistant"
              ) {
                return (
                  <AssistantMessage
                    key={i}
                    content={
                      message.content
                    }
                    onBodySubmit={
                      handleBodySubmit
                    }
                    isLatest={
                      isLatestAssistant &&
                      !bodySubmitted
                    }
                  />
                );
              }

              return (
                <div
                  key={i}
                  className="flex flex-row-reverse gap-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-400 text-xs font-semibold text-white">
                    You
                  </div>

                  <div className="flex-1 rounded-2xl rounded-tr-sm border border-calm-200 bg-calm-50 px-4 py-3">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {
                        message.content
                      }
                    </p>
                  </div>
                </div>
              );
            }
          )}

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
                      animationDelay:
                        "0ms",
                    }}
                  />

                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-calm-400"
                    style={{
                      animationDelay:
                        "150ms",
                    }}
                  />

                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-calm-400"
                    style={{
                      animationDelay:
                        "300ms",
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
            <div className="rounded-2xl border-2 border-calm-300 bg-calm-50 p-6">
              <div className="text-center">
                <p className="mb-2 text-2xl">
                  ✨
                </p>

                <p className="text-lg font-semibold text-slate-900">
                  Your Phase 2 session is complete.
                </p>

                <p className="mt-2 font-semibold text-calm-700">
                  You must download these now.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Phase 2 sessions are
                  not saved to your
                  dashboard. Once you
                  leave this page, you
                  may not be able to
                  return to this
                  session. Download
                  both PDFs before
                  closing or leaving
                  this page.
                </p>
              </div>

              {generatingSummary && (
                <div className="mt-5 rounded-xl border border-calm-200 bg-white p-4 text-center">
                  <p className="text-sm font-medium text-calm-700">
                    Creating your
                    session summary...
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    This may take a
                    moment because it
                    is reviewing your
                    full session.
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={
                    downloadNighttimeScript
                  }
                  className="w-full rounded-xl bg-calm-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-calm-700"
                >
                  Download Nighttime
                  Script PDF
                </button>

                <button
                  type="button"
                  onClick={
                    downloadSummary
                  }
                  disabled={
                    generatingSummary ||
                    !summary
                  }
                  className="w-full rounded-xl border border-calm-300 bg-white px-6 py-3 text-sm font-semibold text-calm-700 transition hover:bg-calm-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {generatingSummary
                    ? "Preparing Session Summary..."
                    : "Download Session Summary PDF"}
                </button>
              </div>
            </div>
          )}

          <div
            ref={
              messagesEndRef
            }
          />
        </div>

        {showTextInput &&
          !sessionComplete && (
            <div className="sticky bottom-4">
              <div className="flex items-end gap-3 rounded-2xl border border-calm-200 bg-white p-3 shadow-sm">
                <textarea
                  value={input}
                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                  placeholder="Share what came up, or answer the question above..."
                  rows={3}
                  className="flex-1 resize-none text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={
                    sendMessage
                  }
                  disabled={
                    loading ||
                    !input.trim()
                  }
                  className="flex-shrink-0 rounded-xl bg-calm-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>

              <p className="mt-2 text-center text-xs text-slate-400">
                Press Enter to send ·
                Shift+Enter for a new
                line
              </p>
            </div>
          )}
      </div>
    </div>
  );
}