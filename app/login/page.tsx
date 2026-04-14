"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        setErrorMessage("No user returned from login.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) {
        setErrorMessage(profileError.message);
        return;
      }

      if (profile?.paid) {
        await supabase.auth.getSession();
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      window.location.href = STRIPE_PAYMENT_LINK;
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-calm-200 px-4 py-3 text-base outline-none ring-calm-500 focus:ring"
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-calm-200 px-4 py-3 text-base outline-none ring-calm-500 focus:ring"
        />

        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-calm-600 px-4 py-3 text-base font-medium text-white transition hover:bg-calm-700 disabled:opacity-60"
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