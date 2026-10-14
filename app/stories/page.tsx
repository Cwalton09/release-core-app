import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Release Core Stories: What People Say After a Session",
  description:
    "Real experiences from people who have used Release Core, in sessions with Chelsea and on their own in the app.",
  alternates: { canonical: "/stories" },
};

const shortQuotes = [
  "My nervous system is calm, and it was out of control.",
  "Release Core is incredible for getting to the very root for me in ways journaling or anything else could never reveal.",
  "Within 10 minutes of the session, I was feeling way better and could actually function again.",
];

export default function StoriesPage() {
  return (
    <AppShell
      title="Stories"
      subtitle="What people say after using Release Core, in their own words."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {shortQuotes.map((quote) => (
            <div key={quote} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold leading-7 text-slate-900">“{quote}”</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="mb-3 text-xl font-semibold text-slate-900">“I feel calm yet rock solid.”</p>
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              “I have been doing sessions with Chelsea and on my own for a while now. I just want to
              say to anyone sitting on the fence how amazing she is and how effective Release Core
              has been for me.
            </p>
            <p>
              My nervous system is calm, and it was out of control. I feel calm yet rock solid. No
              spiraling out of control, no panicking, just calm with a strength to get through
              whatever comes up in life.
            </p>
            <p>
              I have let go of so much and I’m really coming into myself again more and more. I feel
              so clear and alive.
            </p>
            <p>
              One-on-one is amazing, but there is the website option also so I can continue doing
              the work on my own. Thank you so much, Chelsea. I am so grateful.” ❤️
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="mb-3 text-xl font-semibold text-white">“I am dumbfounded.”</p>
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>“I have done SEVERAL sessions with Chels, but this one TOPPED them all!!!</p>
            <p>
              I woke up SO sick with so many symptoms. As soon as Chels saw my post, she called me
              immediately and did a session with me.
            </p>
            <p>
              Within 10 minutes of the session, I was feeling way better, could actually function
              again, and even had my appetite back!!!
            </p>
            <p>
              THANK YOU, THANK YOU, THANK YOU!!!!! If you haven’t given this a try, please do
              yourself a favor, trust Chels, and do it!!!”
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
          >
            Start your first session
          </Link>
          <Link
            href="/free"
            className="rounded-xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Get the free guide
          </Link>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          Testimonials are personal experiences shared by individual clients. Every person is
          different and these experiences are not a guarantee of results. Release Core is not a
          substitute for medical or psychological care.
        </p>
      </div>
    </AppShell>
  );
}
