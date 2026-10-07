import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

// Hidden (404) until Chelsea's story below is filled in and approved.
const PUBLISHED = false;

export const metadata: Metadata = {
  title: "About Chelsea Walton, Creator of the Release Core Method",
  description:
    "Why I created the Release Core Method, what I've learned about the nervous system, and how I help people find the patterns underneath anxiety, panic, and shutdown.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chelsea Walton",
  url: "https://release-core.com/about",
  image: "https://release-core.com/chelsea.jpeg",
  jobTitle: "Creator of the Release Core Method",
  sameAs: [
    "https://www.instagram.com/releasecoremethod",
    "https://www.tiktok.com/@chelsea.walton2",
  ],
};

export default function AboutPage() {
  if (!PUBLISHED) notFound();

  return (
    <AppShell title="About Chelsea">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="space-y-6 text-base leading-8 text-slate-700">
        <Image
          src="/chelsea.jpeg"
          alt="Chelsea Walton, creator of the Release Core Method"
          width={320}
          height={320}
          className="rounded-2xl"
        />

        <h2 className="text-xl font-semibold text-slate-900">How I got here</h2>
        <p>[Chelsea: what led you to this work, in your own words.]</p>

        <h2 className="text-xl font-semibold text-slate-900">Why I created Release Core</h2>
        <p>[Chelsea: what you saw that other approaches were missing, and what made you build your own method.]</p>

        <h2 className="text-xl font-semibold text-slate-900">My background</h2>
        <p>[Chelsea: training, certifications, years of experience, number of people you have worked with.]</p>

        <h2 className="text-xl font-semibold text-slate-900">What I believe</h2>
        <p>[Chelsea: the core idea behind your work, e.g. that the body is protecting you, not working against you.]</p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-slate-900">Ready to see what your body is holding onto?</p>
          <Link
            href="/signup"
            className="mt-4 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Create Account
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
