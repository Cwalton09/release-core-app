"use client";

import AppShell from "@/components/AppShell";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

export default function HomePage() {
  const handleGetStarted = () => {
    window.location.href = STRIPE_PAYMENT_LINK;
  };

  return (
    <AppShell title="Release Core">
      <div className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-4">
          Release Core Method
        </h1>

        <p className="text-lg text-neutral-600 mb-5">
          A guided system to uncover emotional and nervous system patterns stored in your body.
          Identify the root cause, release it, and reset your system back to safety.
        </p>

        <p className="text-lg text-neutral-600 mb-8">
          This method helps you understand why you feel stuck in fight, flight, freeze, or fawn,
          and gives you a step-by-step process to shift it.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleGetStarted}
            className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </AppShell>
  );
}