import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import FreeGuideSignup from "@/components/FreeGuideSignup";

export const metadata: Metadata = {
  title: "Free Guide: Find the Belief Underneath",
  description:
    "A free 5-step guide and worksheet to find the core belief your nervous system is still running, from Chelsea Walton, creator of the Release Core Method.",
  alternates: { canonical: "/free" },
};

export default function FreeGuidePage() {
  return (
    <AppShell
      title="Find the Belief Underneath"
      subtitle="A free guide to understanding what your nervous system is still protecting you from."
    >
      <div className="space-y-6 text-base leading-8 text-slate-700">
        <p>
          Anxiety, panic, numbness and overwhelm aren&apos;t the root. They&apos;re protective layers.
          Underneath them is usually a core belief your nervous system learned a long time ago, like
          &ldquo;I&apos;m not safe&rdquo; or &ldquo;My needs don&apos;t matter.&rdquo;
        </p>
        <p>This free guide walks you through finding yours:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>The 5 steps to follow a reaction down to the belief underneath it</li>
          <li>A printable worksheet to fill in as you go</li>
          <li>What to do with what you find</li>
        </ul>
        <FreeGuideSignup />
      </div>
    </AppShell>
  );
}
