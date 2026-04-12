import Link from "next/link";
import type { ReactNode } from "react";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/start-session", label: "Start Session" },
  { href: "/session-entry", label: "Session Entry" }
];

export default function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-calm-700">
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
        </nav>
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
