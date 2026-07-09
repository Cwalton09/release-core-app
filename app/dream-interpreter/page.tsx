"use client";

import { useState, useEffect } from "react";
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

export default function DreamInterpreter() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [dream, setDream] = useState("");
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState("");
  const [error, setError] = useState("");

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

  async function interpret() {
    if (!dream.trim()) return;
    setLoading(true);
    setInterpretation("");
    setError("");

    try {
      const response = await fetch("/api/dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setInterpretation(data.interpretation);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

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
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Dream Interpreter</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Dreams often reflect what your nervous system is processing, releasing, and rewiring — especially after healing work. Share your dream and receive an interpretation through the lens of nervous system healing.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Describe your dream
              </label>
              <textarea
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="Share your dream in as much detail as you remember. You can include multiple dreams — they often connect in meaningful ways..."
                rows={8}
                className="w-full rounded-xl border border-calm-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-calm-400 focus:outline-none focus:ring-1 focus:ring-calm-300 resize-none"
              />
            </div>

            <button
              onClick={interpret}
              disabled={loading || !dream.trim()}
              className="w-full rounded-xl bg-calm-600 py-3 text-sm font-medium text-white transition hover:bg-calm-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Interpreting your dream..." : "Interpret my dream"}
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-6 rounded-xl border border-calm-200 bg-calm-50 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-calm-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="text-sm text-slate-500">Reading the language of your nervous system...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Interpretation */}
          {interpretation && !loading && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🌙</span>
                <h2 className="text-lg font-semibold text-calm-700">Your Dream Interpretation</h2>
              </div>
              <div className="rounded-xl border border-calm-200 bg-calm-50 p-6">
                <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">{interpretation}</p>
              </div>
              <p className="mt-4 text-xs text-slate-400 text-center leading-5">
                This interpretation is offered as a gentle reflection through the lens of nervous system healing. Trust what resonates and release what doesn't.
              </p>
              <button
                onClick={() => { setDream(""); setInterpretation(""); }}
                className="mt-4 w-full rounded-xl border border-calm-200 py-2.5 text-sm text-calm-700 transition hover:bg-calm-50"
              >
                Interpret another dream
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
