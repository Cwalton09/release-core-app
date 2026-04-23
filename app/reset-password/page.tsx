"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase sets the session from the URL hash automatically
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.replace("/dashboard");
    }

    setLoading(false);
  };

  if (!ready) {
    return (
      <AppShell title="Reset Password">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <p className="text-sm text-slate-600">Verifying your reset link...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Reset Password">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
          Set a new password
        </h1>
        <p className="mb-6 text-sm leading-7 text-slate-600">
          Choose a new password for your account.
        </p>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}