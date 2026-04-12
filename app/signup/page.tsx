"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function SignupPage() {
  return (
    <AppShell title="Get started">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
          Get started
        </h1>

        <p className="mb-6 text-sm leading-7 text-slate-600">
          You can begin your session flow here. Full account creation will be added next.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Continue
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-slate-900 underline">
            Log in
          </Link>
        </p>
      </div>
    </AppShell>
  );
}