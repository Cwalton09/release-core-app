import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Release Core for Practitioners: Chiropractors, Therapists, and Coaches",
  description:
    "Offer Release Core to your clients. Release Core Pro gives chiropractors, therapists, and life coaches client profiles, digital waivers, session tracking, and personalized nighttime scripts.",
  alternates: { canonical: "/practitioners" },
};

const PRO_SIGNUP = "https://pro-release-core.com/signup";
const PRO_LOGIN = "https://pro-release-core.com/login";

const fits = [
  {
    title: "Chiropractors",
    body: "For patients whose tension keeps coming back after adjustments. Release Core helps them find what their body is still bracing against.",
  },
  {
    title: "Therapists and counselors",
    body: "A structured way to work with what clients feel in their bodies, alongside your own approach. It supports your care, and never replaces it.",
  },
  {
    title: "Life coaches",
    body: "For clients who keep circling the same goal. Release Core helps them find the belief underneath the block, so the work you do together can land.",
  },
  {
    title: "Somatic and wellness practitioners",
    body: "A clear, repeatable session flow that fits naturally with nervous-system and body-based work.",
  },
];

const steps = [
  "Ask the client's nervous system whether there is an emotional connection to what they're feeling.",
  "If there is, ask the body to lead directly to it: the age it started, what was happening, and what the body learned.",
  "Find the belief underneath, layer by layer.",
  "Rewire it with questions the body can actually say yes to, then retest.",
];

const included = [
  "Unlimited client profiles",
  "A digital waiver with a drawn signature for each client",
  "The full Release Core session flow",
  "Session history saved for every client",
  "Personalized nighttime integration scripts",
  "Practitioner notes and next-session focus",
  "Downloadable scripts for clients to take home",
];

export default function PractitionersPage() {
  return (
    <AppShell
      title="Release Core for Practitioners"
      subtitle="Offer the Release Core method to your clients, with a professional platform built for chiropractors, therapists, and life coaches."
    >
      <div className="space-y-10 text-base leading-8 text-slate-700">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/chelsea.jpeg"
            alt="Chelsea Walton, founder of Release Core"
            width={180}
            height={332}
            className="h-auto w-40 shrink-0 rounded-2xl"
          />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Why practitioners use Release Core</h2>
            <p>
              Most of the time, we don&apos;t know the real reason for what&apos;s driving a trigger.
              Your clients can understand their story and still feel it in their body every day,
              because the lesson isn&apos;t stored as a thought. It&apos;s stored in the nervous
              system.
            </p>
            <p>
              Release Core gives you a clear way to find where a pattern started and help the body
              learn something new. It was created by Chelsea Walton after years of chronic illness
              and trying everything, and it&apos;s the same method used in the Release Core app.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Who it&apos;s for</h2>
          {fits.map((f) => (
            <div key={f.title}>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1">{f.body}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">How a session works</h2>
          <ol className="list-decimal space-y-2 pl-6">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p>
            Read more about the method on{" "}
            <Link href="/how-it-works" className="text-emerald-700 underline underline-offset-4">
              How it works
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">What&apos;s included in Release Core Pro</h2>
          <ul className="list-disc space-y-2 pl-6">
            {included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Release Core Pro</h2>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            $50<span className="text-base font-normal text-slate-600"> / month</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">Cancel anytime. No contracts.</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={PRO_SIGNUP}
              className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
            >
              Get started with Release Core Pro
            </a>
            <a href={PRO_LOGIN} className="text-sm text-emerald-700 underline underline-offset-4">
              Already a practitioner? Log in
            </a>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Questions first? Email Chelsea at{" "}
            <a
              href="mailto:releasecoremethod@gmail.com?subject=Release%20Core%20for%20practitioners"
              className="text-emerald-700 underline underline-offset-4"
            >
              releasecoremethod@gmail.com
            </a>
            .
          </p>
        </section>

        <p className="text-sm leading-7 text-slate-500">
          Release Core Pro is intended for practitioners. All sessions are conducted under the
          practitioner&apos;s professional responsibility. Release Core is not a substitute for
          medical or psychological treatment and does not diagnose, treat, or cure any condition.
        </p>
      </div>
    </AppShell>
  );
}
