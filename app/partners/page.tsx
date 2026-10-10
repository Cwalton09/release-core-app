import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Partner With Release Core: Media Kit",
  description:
    "Brand partnerships with Release Core and founder Chelsea Walton. A nervous-system wellness brand with an app, a library of research-backed articles, and an engaged audience.",
  alternates: { canonical: "/partners" },
};

const audience = [
  "People looking for real answers about anxiety, stress, sleep, and the body",
  "Parents navigating kids' big emotions, meltdowns, and tics",
  "People living with chronic stress, burnout, gut issues, or pain who want to understand their body",
  "Faith-friendly wellness seekers",
  "People interested in manifesting, mindset, and personal growth",
];

const offers = [
  {
    title: "Faceless and educational social content",
    body: "Calm, branded Reels, TikTok slideshows, and image posts on Instagram, TikTok, and Facebook.",
  },
  {
    title: "Article features",
    body: "A natural mention inside a relevant, research-backed article on release-core.com, where readers arrive from Google searching for answers.",
  },
  {
    title: "Email features",
    body: "A mention in the Release Core email list, sent to people who signed up for the free guide.",
  },
  {
    title: "Product reviews and gifting",
    body: "Honest reviews of products that genuinely fit a calmer, regulated life.",
  },
];

const fits = [
  "Sleep, bedding, and weighted blankets",
  "Journals, planners, and mindfulness tools",
  "Calming teas and caffeine-free drinks",
  "Yoga, stretching, and movement gear",
  "Sound, meditation, and relaxation products",
  "Faith-based wellness and lifestyle brands",
  "Cozy home and self-care products",
];

export default function PartnersPage() {
  return (
    <AppShell
      title="Partner With Release Core"
      subtitle="Media kit for brands that want to reach people who are ready to feel calmer, safer, and more at home in their bodies."
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
            <h2 className="text-xl font-semibold text-slate-900">About Release Core</h2>
            <p>
              Release Core is a nervous-system method and app created by Chelsea Walton. It helps
              people find the belief underneath anxiety, stress, and patterns they can&apos;t think
              their way out of, and rewire it.
            </p>
            <p>
              Chelsea built Release Core after years of chronic illness and trying everything. Today
              the brand includes a members app, guided sessions, and a growing library of
              research-backed articles that people find on Google every day.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Why partner with us</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>A trusted, niche audience in nervous-system wellness, one of 2026&apos;s fastest-growing wellness topics</li>
            <li>50+ in-depth articles on anxiety, sleep, gut health, tics, ADHD, parenting, pain, and manifesting, with cited research</li>
            <li>Paying app members who use Release Core regularly</li>
            <li>Daily content across Instagram, TikTok, and Facebook</li>
            <li>A calm, consistent brand look that keeps partner content feeling natural, never salesy</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Our audience</h2>
          <ul className="list-disc space-y-2 pl-6">
            {audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">Ways to work together</h2>
          {offers.map((o) => (
            <div key={o.title}>
              <h3 className="font-semibold text-slate-900">{o.title}</h3>
              <p className="mt-1">{o.body}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Great-fit brands</h2>
          <ul className="list-disc space-y-2 pl-6">
            {fits.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Our standards</h2>
          <p>
            We only partner with products Chelsea would genuinely use and recommend. All sponsored
            content is clearly labeled. We don&apos;t make medical claims, and we don&apos;t promote
            products as treatments or cures.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Let&apos;s talk</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Email Chelsea with your brand, your product, and what you have in mind. Current
            audience numbers and rates are available on request.
          </p>
          <a
            href="mailto:releasecoremethod@gmail.com?subject=Brand%20partnership"
            className="mt-5 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Email Chelsea
          </a>
          <p className="mt-3 text-sm text-slate-600">releasecoremethod@gmail.com</p>
          <p className="mt-4 text-sm text-slate-600">
            Also see: <Link href="/about" className="text-emerald-700 underline underline-offset-4">Chelsea&apos;s story</Link>
            {" · "}
            <Link href="/articles" className="text-emerald-700 underline underline-offset-4">Articles</Link>
            {" · "}
            <Link href="/podcast" className="text-emerald-700 underline underline-offset-4">Podcast guest info</Link>
          </p>
        </section>
      </div>
    </AppShell>
  );
}
