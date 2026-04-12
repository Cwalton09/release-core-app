"use client";

import AppShell from "@/components/AppShell";
import { useRouter } from "next/navigation";

export default function DisclaimerPage() {
  const router = useRouter();

  const handleAccept = () => {
    router.push("/signup");
  };

  return (
    <AppShell title="Disclaimer">
      <div className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-6">
          Disclaimer
        </h1>

        <div className="space-y-4 text-neutral-700 leading-7">
          <p>
            This app is designed for self-awareness, personal growth, and nervous system support.
          </p>

          <p>
            The Release Core Method is not a substitute for medical advice, diagnosis, or treatment.
            It does not diagnose or treat any physical or mental health condition.
          </p>

          <p>
            All insights, prompts, and guidance provided within this app are for educational and
            informational purposes only.
          </p>

          <p>
            You are responsible for your own health, decisions, and actions.
          </p>

          <p>
            If you are experiencing severe emotional distress, physical symptoms, or medical concerns,
            please consult a licensed healthcare provider.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleAccept}
            className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
          >
            I Understand and Agree
          </button>

          <p className="text-xs text-slate-500">
            By continuing, you agree to the Privacy Policy and Terms of Use.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <a
              href="/privacy-policy"
              className="underline underline-offset-2"
            >
              View Privacy Policy
            </a>

            <a
              href="/terms-of-use"
              className="underline underline-offset-2"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}