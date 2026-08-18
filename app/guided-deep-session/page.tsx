"use client";

import { useState, useEffect, useRef } from "react";
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
  { href: "/dream-interpreter", label: "Dream Interpreter" },
  { href: "/faq", label: "FAQ" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

type BeliefStatement = {
  text: string;
  answer: "yes" | "no" | null;
};

const OPENING_MESSAGE = `Welcome to your Guided Deep Session.

This session will help you find what your nervous system is carrying underneath the surface — the root patterns, protective beliefs, and unmet needs connected to what you are experiencing right now.

Take a moment to settle in. Place one hand on your heart if that feels right.

Then share with me: What is going on for you today? It could be a physical symptom, an emotional reaction, something that triggered you, a situation that feels unresolved, or a dream. Whatever feels most alive in your body right now — start there.`;

// Parse bullet point belief statements from AI response
function parseBeliefStatements(text: string): BeliefStatement[] | null {
  const lines = text.split("\n");
  const statements: BeliefStatement[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines starting with *, -, •, or numbered like "1."
    if (/^[\*\-•]\s+.{10,}/.test(trimmed) || /^\d+\.\s+.{10,}/.test(trimmed)) {
      const text = trimmed.replace(/^[\*\-•]\s+/, "").replace(/^\d+\.\s+/, "").trim();
      // Filter out lines that are clearly not belief statements
      if (text.length > 10 && !text.toLowerCase().startsWith("note:") && !text.toLowerCase().startsWith("for example")) {
        statements.push({ text, answer: null });
      }
    }
  }

  return statements.length >= 3 ? statements : null;
}

// Split message into text parts and belief list
function splitMessageParts(content: string): { intro: string; statements: BeliefStatement[] | null; outro: string } {
  const statements = parseBeliefStatements(content);
  if (!statements) return { intro: content, statements: null, outro: "" };

  const lines = content.split("\n");
  let introLines: string[] = [];
  let outroLines: string[] = [];
  let inList = false;
  let listDone = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const isBullet = /^[\*\-•]\s+.{10,}/.test(trimmed) || /^\d+\.\s+.{10,}/.test(trimmed);

    if (isBullet && !listDone) {
      inList = true;
    } else if (inList && !isBullet) {
      listDone = true;
      inList = false;
      outroLines.push(line);
    } else if (!inList && !listDone) {
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

function BeliefCheckList({
  statements,
  onSubmit,
}: {
  statements: BeliefStatement[];
  onSubmit: (answers: BeliefStatement[]) => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(statements.map(() => false));
  const [submitted, setSubmitted] = useState(false);
  const [somethingElse, setSomethingElse] = useState("");
  const [somethingElseChecked, setSomethingElseChecked] = useState(false);

  function toggle(index: number) {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  function handleSubmit() {
    setSubmitted(true);
    const answers = statements.map((s, i) => ({
      ...s,
      answer: checked[i] ? "yes" as const : "no" as const,
    }));
    if (somethingElseChecked && somethingElse.trim()) {
      answers.push({ text: somethingElse.trim(), answer: "yes" as const });
    }
    onSubmit(answers);
  }

  if (submitted) {
    return (
      <div className="space-y-2 opacity-60">
        {statements.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-calm-50 border border-calm-100 px-4 py-2.5">
            <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 ${checked[i] ? "bg-calm-600 border-calm-600" : "border-slate-300"}`}>
              {checked[i] && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <p className="text-sm text-slate-600">{s.text}</p>
          </div>
        ))}
        {somethingElseChecked && somethingElse.trim() && (
          <div className="flex items-center gap-3 rounded-xl bg-calm-50 border border-calm-100 px-4 py-2.5">
            <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 bg-calm-600 border-calm-600">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-sm text-slate-600">{somethingElse}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400 mb-3">Check the ones your body says YES to. Leave unchecked for NO.</p>
      {statements.map((s, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
            checked[i] ? "border-calm-400 bg-calm-50" : "border-calm-200 bg-white hover:border-calm-300"
          }`}
        >
          <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${checked[i] ? "bg-calm-600 border-calm-600" : "border-slate-300"}`}>
            {checked[i] && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <p className="text-sm text-slate-700 leading-6">{s.text}</p>
        </button>
      ))}

      {/* Something else option */}
      <div className={`rounded-xl border px-4 py-3 transition-all ${somethingElseChecked ? "border-calm-400 bg-calm-50" : "border-calm-200 bg-white"}`}>
        <button
          onClick={() => setSomethingElseChecked(!somethingElseChecked)}
          className="w-full flex items-center gap-3 text-left"
        >
          <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${somethingElseChecked ? "bg-calm-600 border-calm-600" : "border-slate-300"}`}>
            {somethingElseChecked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <p className="text-sm text-slate-500 italic">Something else came up...</p>
        </button>
        {somethingElseChecked && (
          <textarea
            value={somethingElse}
            onChange={(e) => setSomethingElse(e.target.value)}
            placeholder="Describe what came up for you..."
            rows={2}
            className="mt-2 w-full resize-none rounded-lg border border-calm-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-calm-400"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-2 rounded-xl bg-calm-600 py-3 text-sm font-medium text-white transition hover:bg-calm-700"
      >
        Submit my answers
      </button>
    </div>
  );
}

function AssistantMessage({
  content,
  onBeliefSubmit,
  isLatest,
}: {
  content: string;
  onBeliefSubmit: (answers: BeliefStatement[]) => void;
  isLatest: boolean;
}) {
  const { intro, statements, outro } = splitMessageParts(content);

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-600 flex items-center justify-center text-white text-xs font-semibold">RC</div>
      <div className="flex-1 space-y-3">
        {intro && (
          <div className="rounded-2xl rounded-tl-sm bg-white border border-calm-200 px-4 py-3">
            <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{intro}</p>
          </div>
        )}
        {statements && (
          <div className="rounded-2xl border border-calm-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-calm-600 mb-3">
              Check each one with your body — then tap Yes or No
            </p>
            <BeliefCheckList
              statements={statements}
              onSubmit={isLatest ? onBeliefSubmit : () => {}}
            />
          </div>
        )}
        {outro && (
          <div className="rounded-2xl rounded-tl-sm bg-white border border-calm-200 px-4 py-3">
            <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{outro}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Phase2Session() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [summary, setSummary] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [beliefSubmitted, setBeliefSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function checkIfComplete(text: string) {
    const signals = ["nighttime script", "goodnight", "you can rest", "session is complete", "that is the root", "that is your release core target", "body, you can"];
    return signals.some(s => text.toLowerCase().includes(s));
  }

  async function sendToAI(userContent: string) {
    const userMessage: Message = { role: "user", content: userContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    setError("");
    setBeliefSubmitted(false);

    try {
      const response = await fetch("/api/phase2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.error || "Something went wrong.");
      } else {
        const assistantMessage: Message = { role: "assistant", content: data.message };
        setMessages([...newMessages, assistantMessage]);
        if (checkIfComplete(data.message)) setSessionComplete(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    await sendToAI(text);
  }

  function handleBeliefSubmit(answers: BeliefStatement[]) {
    setBeliefSubmitted(true);
    const formatted = answers
      .map(a => `${a.text} — ${a.answer === "yes" ? "Yes" : "No"}`)
      .join("\n");
    sendToAI(formatted);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function generateSummary() {
    setGeneratingSummary(true);
    try {
      const response = await fetch("/api/phase2-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await response.json();
      if (data.summary) setSummary(data.summary);
    } catch { console.error("Summary error"); }
    setGeneratingSummary(false);
  }

  function downloadSummary() {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `release-core-session-${new Date().toLocaleDateString("en-US").replace(/\//g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Check if the latest assistant message has beliefs that haven't been submitted
  const lastAssistantMessage = messages.filter(m => m.role === "assistant").slice(-1)[0];
  const lastHasBeliefs = lastAssistantMessage ? parseBeliefStatements(lastAssistantMessage.content) !== null : false;
  const showTextInput = !lastHasBeliefs || beliefSubmitted || sessionComplete;

  if (checking) return <p className="p-6 text-center text-sm text-slate-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      <div className="flex-1 mx-auto w-full max-w-3xl px-4 py-6 flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-900">Guided Deep Session</h1>
          <p className="text-sm text-slate-500 mt-1">A conversational session to find the root pattern underneath what you are experiencing.</p>
        </div>

        <div className="flex-1 space-y-4 mb-4">
          {/* Opening */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-600 flex items-center justify-center text-white text-xs font-semibold">RC</div>
            <div className="flex-1 rounded-2xl rounded-tl-sm bg-white border border-calm-200 px-4 py-3">
              <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{OPENING_MESSAGE}</p>
            </div>
          </div>

          {/* Conversation */}
          {messages.map((msg, i) => {
            const isLatestAssistant = msg.role === "assistant" && i === messages.length - 1;
            if (msg.role === "assistant") {
              return (
                <AssistantMessage
                  key={i}
                  content={msg.content}
                  onBeliefSubmit={handleBeliefSubmit}
                  isLatest={isLatestAssistant && !beliefSubmitted}
                />
              );
            }
            return (
              <div key={i} className="flex gap-3 flex-row-reverse">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-semibold">You</div>
                <div className="flex-1 rounded-2xl rounded-tr-sm bg-calm-50 border border-calm-200 px-4 py-3">
                  <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-calm-600 flex items-center justify-center text-white text-xs font-semibold">RC</div>
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-white border border-calm-200 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {sessionComplete && (
            <div className="rounded-2xl border border-calm-200 bg-calm-50 p-6 text-center">
              <p className="text-2xl mb-2">✨</p>
              <p className="text-sm font-semibold text-slate-800 mb-1">Your session is complete.</p>
              <p className="text-xs text-slate-500 mb-4 leading-5">Generate a session summary to keep a record of what you found today.</p>
              {!summary ? (
                <button onClick={generateSummary} disabled={generatingSummary}
                  className="rounded-xl bg-calm-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700 disabled:opacity-50">
                  {generatingSummary ? "Generating..." : "Generate session summary"}
                </button>
              ) : (
                <button onClick={downloadSummary}
                  className="rounded-xl border border-calm-300 px-6 py-2.5 text-sm font-medium text-calm-700 transition hover:bg-calm-100">
                  ⬇ Download session summary
                </button>
              )}
            </div>
          )}

          {summary && (
            <div className="rounded-2xl border border-calm-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-calm-700 mb-3">Session Summary</h2>
              <p className="text-xs text-slate-600 leading-6 whitespace-pre-wrap">{summary}</p>
              <button onClick={downloadSummary}
                className="mt-4 w-full rounded-xl bg-calm-600 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">
                ⬇ Download as text file
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Text input — only shows when not waiting for belief answers */}
        {showTextInput && !sessionComplete && (
          <div className="sticky bottom-4">
            <div className="rounded-2xl border border-calm-200 bg-white shadow-sm p-3 flex gap-3 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what is going on, or answer the question above..."
                rows={3}
                className="flex-1 resize-none text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none leading-6"
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()}
                className="flex-shrink-0 rounded-xl bg-calm-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Send
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
          </div>
        )}
      </div>
    </div>
  );
}
