"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    window.location.href = STRIPE_PAYMENT_LINK;
  };

  return (
    <AppShell
      title="Login"
      subtitle="Welcome back. Sign in to continue your Release Core practice."
    >
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-calm-200 px-4 py-2.5 text-sm outline-none ring-calm-500 focus:ring"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-calm-200 px-4 py-2.5 text-sm outline-none ring-calm-500 focus:ring"
          required
        />

        {message ? (
          <p className="text-sm text-red-600">{message}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-calm-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        New here?{" "}
        <Link href="/signup" className="font-medium text-calm-700 hover:underline">
          Create an account
        </Link>
        .
      </p>
    </AppShell>
  );
}