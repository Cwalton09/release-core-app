"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export const FREE_GUIDE_URL = "/free/find-the-belief-underneath.pdf";

type Status = "idle" | "sending" | "done" | "error";

export default function FreeGuideSignup({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, website, source: pathname }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Free guide</p>
      <h2 className={`mt-2 font-semibold text-slate-900 ${compact ? "text-xl" : "text-2xl"}`}>
        Find the Belief Underneath
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        A 5-step guide and worksheet to understand what your nervous system is still protecting you
        from. Free, straight to your inbox.
      </p>

      {status === "done" ? (
        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
          <p className="font-semibold text-slate-900">You&apos;re in. Check your inbox 🤍</p>
          <p>If you see an email asking you to confirm, click it so the guide and my emails reach you.</p>
          <a
            href={FREE_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Download the guide now
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
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
          {/* Hidden from people; catches spam bots. */}
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
            {status === "sending" ? "Sending..." : "Send me the guide"}
          </button>
        </form>
      )}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {status !== "done" && (
        <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
      )}
    </section>
  );
}
