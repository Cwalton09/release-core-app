import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

// Set to false to hide this page (404).
const PUBLISHED = true;

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

        <p>
          Hi, I&apos;m Chelsea Walton, the creator of the Release Core Method. If you&apos;ve tried
          everything and still feel stuck, I&apos;ve been there. This is how I got here.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Where it started</h2>
        <p>
          I can&apos;t say I had a lot of chronic illness growing up, other than being diagnosed
          with ADHD and being medicated for 23 years. The brain fog, the fatigue, the constant
          tired feeling... it never went away.
        </p>
        <p>
          Then in 2019, I got extremely sick from mold exposure. I had high fevers on and off for
          about five months and honestly felt like I was on my deathbed. That&apos;s what led me to
          my naturopathic doctor.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Trying everything</h2>
        <p>
          From there, I went all in. I did imprinting laser therapy for a couple of years, then
          we shifted into nervous system work like EFT and NET. At one point, I was on 65+
          supplements... and I still wasn&apos;t improving the way I should have been.
        </p>
        <p>
          So I started going down my own path. I tried EMDR, somatics, yoga, frequency music,
          therapy, and meditation. Those things can be helpful, but I personally never felt a
          real shift.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">What I discovered</h2>
        <p>
          I started researching the nervous system myself, hours every day, reading studies and
          trying to understand how it actually works and what a regulated nervous system is
          capable of.
        </p>
        <p>
          What I realized is this: emotions aren&apos;t the root. They&apos;re protective layers.
          Underneath those layers are core beliefs that are running patterns in the nervous
          system. So I started working with just that, identifying the core belief underneath
          everything.
        </p>
        <p>
          Then I realized something even bigger. You have to give your body what it needed in
          that moment in order to actually close the loop. That&apos;s how safety gets created.
          Because if your body doesn&apos;t feel safe, it won&apos;t let anything go.
        </p>

        <h2 className="text-xl font-semibold text-slate-900">Why the subconscious matters</h2>
        <p>
          That&apos;s also what led me to understanding the subconscious. You can consciously
          &ldquo;do all the work,&rdquo; but if your body doesn&apos;t actually believe it&apos;s
          safe, nothing sticks.
        </p>
        <p>
          That&apos;s where the nighttime scripts came in. At night you&apos;re in a theta state,
          and your subconscious is open to receiving and integrating.
        </p>
        <p>
          That was the turning point for me. Everything finally started to click and shift in a
          way it never had before. Release Core is everything I learned, built into a method so
          you don&apos;t have to spend years searching the way I did.
        </p>

        <blockquote className="rounded-2xl border-l-4 border-emerald-600 bg-slate-50 p-5 text-lg font-semibold text-slate-900">
          If your body doesn&apos;t feel safe, it won&apos;t let anything go.
        </blockquote>

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
