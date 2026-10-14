"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  // Full-width page with no title card, for pages that design their own layout (the homepage).
  bare?: boolean;
};

const socialLinks = [
  { href: "https://www.instagram.com/releasecoremethod", label: "Instagram" },
  { href: "https://www.tiktok.com/@releasecore", label: "TikTok" },
  { href: "https://www.facebook.com/groups/952719290453784", label: "Facebook Community" },
];

const publicNavItems = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/what-it-helps", label: "What It Helps" },
  { href: "/stories", label: "Stories" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/free", label: "Free Guide" },
  { href: "/login", label: "Log In" },
];

export default function AppShell({ title, subtitle, children, bare = false }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

const navItems = publicNavItems;

  return (
    <div className="min-h-screen">
      <header className="print:hidden sticky top-0 z-10 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-calm-700">
            Release Core
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-xs text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="ml-1 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-800"
            >
              {isLoggedIn ? "My Dashboard" : "Get Started"}
            </Link>
          </div>

          {/* Mobile: start button + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-medium text-white"
            >
              {isLoggedIn ? "Dashboard" : "Get Started"}
            </Link>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-calm-700 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
          </div>
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

      {bare ? (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">{children}</main>
      ) : (
        <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <section className="rounded-2xl border border-calm-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
            {subtitle ? <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p> : null}
            <div className="mt-6">{children}</div>
          </section>
        </main>
      )}

      <footer className="print:hidden mx-auto max-w-3xl px-4 pb-10 text-center">
        <p className="text-xs text-slate-500">Follow Release Core</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {socialLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1.5 text-xs text-slate-600 transition hover:bg-calm-100 hover:text-calm-700"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          <Link href="/podcast" className="hover:text-calm-700">
            Podcast hosts: invite Chelsea
          </Link>
          {" · "}
          <Link href="/tic-tracker" className="hover:text-calm-700">
            Free tic tracker
          </Link>
          {" · "}
          <Link href="/partners" className="hover:text-calm-700">
            Brand partners
          </Link>
          {" · "}
          <Link href="/practitioners" className="hover:text-calm-700">
            For practitioners
          </Link>
        </p>
      </footer>
    </div>
  );
}
