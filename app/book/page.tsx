import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { FACEBOOK_GROUP_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "1:1 Sessions with Chelsea",
  description:
    "Chelsea offers a limited number of 1:1 Release Core sessions by request through the Release Core Method Facebook group.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <AppShell
      title="1:1 sessions with Chelsea"
      subtitle="I take a limited number of private sessions by request."
    >
      <div className="space-y-6 text-base leading-8 text-slate-700">
        <p>
          To ask about a 1:1 session, join the Release Core Method group on Facebook and send me a
          private message there.
        </p>
        <a
          href={FACEBOOK_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
        >
          Join the Facebook group
        </a>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-slate-900">Want to start today?</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            The Release Core app walks you through a guided session the same way I do one-on-one,
            whenever you need it.
          </p>
          <Link
            href="/signup"
            className="mt-4 inline-block rounded-xl border border-emerald-700 bg-white px-6 py-3 font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            Start your first session
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
