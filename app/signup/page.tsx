"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";
const PROMO_CODES = ["FREESESSION", "RELEASECORE", "TRYITFREE"];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const isPromoValid = PROMO_CODES.includes(promoCode.trim().toUpperCase());

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const user = data.user;

      if (!user) {
        setErrorMessage("No user returned from signup.");
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          display_name: fullName,
          paid: isPromoValid ? true : false,
        },
        { onConflict: "user_id" }
      );

      if (profileError) {
        setErrorMessage(profileError.message);
        return;
      }

      if (isPromoValid) {
        router.push("/disclaimer");
      } else {
        window.location.href = STRIPE_PAYMENT_LINK;
      }
    } catch (err) {
      setErrorMessage("Something went wrong during signup.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Get started">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
          Get started
        </h1>
        <p className="mb-6 text-sm leading-7 text-slate-600">
          Create your account to begin your Release Core session flow.
        </p>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />

          {/* Promo code */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Promo code (optional)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none uppercase"
            />
            {promoCode && PROMO_CODES.includes(promoCode.trim().toUpperCase()) && (
              <p className="text-sm text-emerald-600 font-medium">
                ✓ Promo code applied — enjoy your free session!
              </p>
            )}
            {promoCode && !PROMO_CODES.includes(promoCode.trim().toUpperCase()) && (
              <p className="text-sm text-red-500">
                That promo code is not valid.
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

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