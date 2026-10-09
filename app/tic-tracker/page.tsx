import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Free Printable Tic Tracker: Spot What Makes Tics Flare",
  description:
    "A free printable weekly tic tracker for parents and adults. Track tics alongside sleep, stress, and events to see what your nervous system is reacting to.",
  alternates: { canonical: "/tic-tracker" },
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const columns = [
  "Tics today (1 = quiet, 5 = loud)",
  "Worst time of day",
  "Sleep last night (1 to 5)",
  "Stress or big feelings",
  "What was happening",
];

export default function TicTrackerPage() {
  return (
    <AppShell
      title="Free Printable Tic Tracker"
      subtitle="Tics often follow what's happening in your life. This one-page weekly tracker helps you, or your child, see the pattern."
    >
      <div className="space-y-8 text-base leading-8 text-slate-700">
        <section className="space-y-4 print:hidden">
          <p>
            Tics tend to come and go, and they often get louder with stress, excitement,
            exhaustion, or after a long day of holding them in. Writing it down for a week or two
            can show you things you would never notice otherwise.
          </p>
          <p>
            Print it, keep it on the fridge or by the bed, and fill in one line each evening. It
            takes about a minute. If you&apos;re tracking for a child, you can fill it in together
            or quietly on your own.
          </p>
          <PrintButton />
          <p className="text-sm text-slate-500">
            Want to understand the pattern? Read{" "}
            <Link href="/articles/tics-and-the-nervous-system" className="text-emerald-700 underline underline-offset-4">
              Tics and the Nervous System
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white p-4 print:border-0 print:p-0">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">My Weekly Tic Tracker</h2>
            <p className="text-sm text-slate-500">Week of: ____________</p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-14 border border-slate-300 bg-slate-50 p-2 text-left">Day</th>
                  {columns.map((c) => (
                    <th key={c} className="border border-slate-300 bg-slate-50 p-2 text-left font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d}>
                    <td className="h-16 border border-slate-300 p-2 font-medium">{d}</td>
                    {columns.map((c) => (
                      <td key={c} className="border border-slate-300 p-2" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <p className="font-semibold text-slate-900">At the end of the week, notice:</p>
            <p>Which days were loudest? What was happening the day before?</p>
            <p>Did tics change with sleep, school or work, screens, or plans?</p>
            <p>Were they louder after holding them in, or when someone pointed them out?</p>
            <p>What do you think your body was bracing for?</p>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Free from Release Core · release-core.com/tic-tracker · Talk to your doctor if tics
            are new, changing quickly, or painful.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 print:hidden">
          <h2 className="text-xl font-semibold text-slate-900">Seeing a pattern?</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Most of the time, we don&apos;t know the real reason behind what&apos;s driving the
            trigger. In a Release Core session, you ask your nervous system whether there&apos;s an
            emotional connection, and your body leads you to where it started so you can rewire it.
          </p>
          <Link
            href="/how-it-works"
            className="mt-5 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            See what happens in a session
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
