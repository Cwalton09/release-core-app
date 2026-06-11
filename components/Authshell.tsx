"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/start-session", label: "Start Session" },
  { href: "/session-entry", label: "Session Entry" },
  { href: "/grounding-scripts", label: "Grounding Scripts" },
  { href: "/quick-relief", label: "Quick Relief" },
  { href: "/faq", label: "FAQ" },
];

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-calm-700">
            Release Core
          </Link>
          {/* Desktop nav */}
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
          {/* Hamburger button — mobile only */}
          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="border-t border-calm-200 bg-calm-50 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <section className="rounded-2xl border border-calm-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p> : null}
          <div className="mt-6">{children}</div>
        </section>
      </main>
    </div>
  );
}
