import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Book a 1:1 Release Core Session with Chelsea",
  description:
    "A private 60-minute Release Core session with Chelsea Walton. Follow your body's answers to find the pattern underneath what you're feeling.",
  alternates: { canonical: "/book" },
};

const CALENDLY_URL = "https://calendly.com/chelseadwalton/60min";

export default function BookPage() {
  return (
    <AppShell
      title="Book a 1:1 session"
      subtitle="Let me guide the questions while you focus completely on listening to your body."
    >
      <div className="space-y-10 text-base leading-8 text-slate-700">
        <section className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-xl font-semibold text-slate-900">1:1 Release Core Session</p>
          <p className="mt-1 text-lg font-semibold text-emerald-700">$60 · 60 minutes</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Choose an available time and pay when you book. Once payment goes through, your session
            is reserved.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 md:hidden"
          >
            View available times &amp; book
          </a>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">What happens in a session</h2>
          <p>
            You come with one thing you want to look at. Sometimes you know exactly what is
            bothering you. Sometimes you just know something feels off. Either one is fine.
          </p>
          <p>
            We start there and I begin asking your body yes-or-no questions. I am not deciding what
            your answer should be. I am narrowing it down based on how your body responds.
          </p>
          <p>
            If the body takes us back to an earlier age, we find the age. Then you tell me what was
            happening around that time. The next questions are built from what actually happened in
            your life, not from a generic list of meanings.
          </p>
          <p>
            We keep narrowing it down until we can see the rule or loop your nervous system is still
            living in.
          </p>
          <p className="font-medium text-slate-900">
            That is usually the moment where somebody says, “Oh my gosh. That actually makes so much
            sense.”
          </p>
          <p>
            Once we see the pattern clearly, we work on what is true now. You are not that age
            anymore. You have choices now. You have a voice now. You can respond to what is actually
            happening today instead of living from an old rule your body created years ago.
          </p>
        </section>

        <section className="hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <iframe
              src={CALENDLY_URL}
              title="Book a 1:1 Release Core Session"
              width="100%"
              height="820"
              frameBorder="0"
              loading="lazy"
              style={{ width: "100%", minWidth: "100%" }}
            />
          </div>
          <p className="mt-3 text-center text-sm text-slate-600">
            The calendar only shows times I actually have available.
          </p>
        </section>

        <p className="text-xs leading-6 text-slate-500">
          Release Core is intended for educational, wellness, and personal growth purposes. It is
          not medical or psychological treatment.
        </p>
      </div>
    </AppShell>
  );
}
