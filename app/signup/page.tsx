"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";
import { goToCheckout } from "@/lib/checkout";

// Same four things as the membership card on the homepage.
const includes = [
  { title: "Guided deep sessions, anytime", body: "Your body leads you to where a feeling started, and you rewire it." },
  { title: "Your nighttime script and session summary", body: "Yours to keep, so you can go back to what came up." },
  { title: "Faith-based or non-faith sessions", body: "Whichever fits you." },
  { title: "Grounding scripts, quick relief, and the dream interpreter", body: "For the moments in between." },
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
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
          paid: false,
        },
        { onConflict: "user_id" }
      );
      if (profileError) {
        setErrorMessage(profileError.message);
        return;
      }
      goToCheckout(user);
    } catch (err) {
      setErrorMessage("Something went wrong during signup.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Get started" bare>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:items-start">
        <section className="rounded-3xl bg-calm-50 p-7 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
            Release Core membership
          </p>
          <p className="mt-3">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">$25</span>
            <span className="text-slate-600"> / month</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">Cancel anytime.</p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {includes.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 text-emerald-600" aria-hidden>
                  ✓
                </span>
                <span>
                  <span className="font-medium text-slate-900">{item.title}.</span> {item.body}
                </span>
              </li>
            ))}
          </ul>
          <figure className="mt-7 border-t border-calm-200 pt-6">
            <blockquote className="leading-7 text-slate-800">
              “Within 10 minutes of the session, I was feeling way better and could actually
              function again.”
            </blockquote>
            <figcaption className="mt-2 text-sm text-slate-500">
              <Link href="/stories" className="underline underline-offset-4">
                Read more stories
              </Link>
            </figcaption>
          </figure>
        </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
          Get started
        </h1>
        <p className="mb-6 text-sm leading-7 text-slate-600">
          Create your account, then you&apos;ll go to secure checkout to start your membership.
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
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Continue to checkout"}
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-slate-500">
          $25/month. Cancel anytime from your dashboard.
        </p>
        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-slate-900 underline">
            Log in
          </Link>
        </p>
      </div>
      </div>
    </AppShell>
  );
}