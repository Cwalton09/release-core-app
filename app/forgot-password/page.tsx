"use client";
import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: "https://release-core.com/reset-password",
      }
    );

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <AppShell title="Reset Password">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
          Forgot your password?
        </h1>

        {sent ? (
          <div className="space-y-4">
            <p className="text-sm leading-7 text-slate-600">
              We sent a password reset link to <span className="font-medium">{email}</span>. Check your inbox and click the link to reset your password.
            </p>
            <p className="text-sm text-slate-500">
              Did not receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSent(false)}
                className="underline text-slate-700"
              >
                try again
              </button>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm leading-7 text-slate-600">
              Enter the email address you signed up with and we will send you a link to reset your password.
            </p>
            <form className="space-y-4" onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                required
              />
              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}

        <p className="mt-5 text-sm text-slate-600">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-slate-900 underline">
            Log in
          </Link>
        </p>
      </div>
    </AppShell>
  );
}