import Link from "next/link";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "What Happens in a Release Core Session",
  description:
    "A step-by-step look at a Release Core session: finding what's really driving a pattern, when it started, what your nervous system learned, and how it gets rewired with questions your body can say yes to.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    title: "Find what's really driving it",
    body: "We start with what you bring: a reaction, a pattern, a situation that still feels charged, or a symptom with a nervous system piece to it. Then we ask your body what part of it is actually still active, so we work on the real thing instead of guessing.",
  },
  {
    title: "Find the deepest wound",
    body: "Two people can go through the same experience and carry completely different wounds. For one it's feeling powerless. For another it's being misunderstood, rejected, or replaced. Your body shows us which one it's still holding.",
  },
  {
    title: "Find when it started",
    body: "We find the age the pattern started and what was happening in your life at that time. Sometimes it's a recent event. Sometimes that event woke up something much older. Your body tells us which.",
  },
  {
    title: "Find what your nervous system learned",
    body: "This is the heart of it. We uncover what your body concluded back then: what it believed was happening, what it decided it had to do to stay safe, and the rules it has been running ever since, like \"I have to earn closeness\" or \"I can't relax yet.\"",
  },
  {
    title: "See how it shows up today",
    body: "We look at the protection that pattern created, like over-explaining, keeping the peace, staying on guard, or bracing your body. If there's a physical symptom, we explore whether this pattern is activating alongside it.",
  },
  {
    title: "Rewire it with questions",
    body: "Affirmations alone often bounce off, because your nervous system hasn't accepted them yet. So we ask questions instead, like \"Can you show me what it feels like to not have to earn closeness?\" A question gives your nervous system something to go looking for, instead of something to argue with. Then we reinforce it with statements your body is now ready to accept.",
  },
];

export default function HowItWorksPage() {
  return (
    <AppShell
      title="What Happens in a Session"
      subtitle="You don't have to figure out what's wrong on your own. Your body already knows. A Release Core session helps you ask it."
    >
      <div className="space-y-10 text-base leading-8 text-slate-700">
        <p>
          Most approaches start by deciding what your problem means. Release Core starts by asking
          your body. Instead of me guessing, we ask your body questions and follow its answers until
          we find what it&apos;s still protecting you from, and why.
        </p>

        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-1">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">An example</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This is a made-up example to show how a session flows.
          </p>
          <div className="mt-4 space-y-4">
            <p>
              Someone comes in because their whole body tenses up before work calls. They know
              they&apos;re good at their job, but they still feel like they&apos;re about to be caught
              out.
            </p>
            <p>
              Their body shows the deepest wound isn&apos;t about work at all. It&apos;s about feeling
              judged. The pattern started at age 9, when mistakes at home meant getting in trouble.
              Their nervous system learned: &ldquo;If I get it wrong, I&apos;m not safe.&rdquo; So it
              learned to brace before anything that felt like being evaluated.
            </p>
            <p>
              The rewire starts with questions like &ldquo;Can you show me what it feels like to be
              relaxed during a work call?&rdquo; and &ldquo;Can you show me what my body softening 10%
              feels like?&rdquo; Then come statements their body is finally ready to accept:
              &ldquo;I&apos;m allowed to make mistakes and still be safe.&rdquo;
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">What people often feel afterward</h2>
          <p>
            Every body is different, but people often describe feeling lighter, calmer, and more like
            themselves. Some notice more energy, easier sleep, or that a situation that used to set
            them off simply doesn&apos;t carry the same charge anymore. Sometimes it&apos;s immediate.
            Sometimes it unfolds over the next few days as your body integrates what changed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Faith-friendly</h2>
          <p>
            If your faith matters to you, your rewire can include God, so the new message lands in a
            way that feels true to who you are. If it doesn&apos;t, it never has to. Your session is
            built around you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Good to know</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-medium text-slate-900">You don&apos;t need to remember your childhood. </span>
              Your body leads. Many people are surprised by what comes up.
            </li>
            <li>
              <span className="font-medium text-slate-900">Your body sets the pace. </span>
              We check in before going deeper, so you never have to process more than you&apos;re
              ready for.
            </li>
            <li>
              <span className="font-medium text-slate-900">Physical symptoms still deserve medical care. </span>
              Release Core can explore the nervous system side of a symptom alongside your doctor,
              never instead of them.
            </li>
            <li>
              <span className="font-medium text-slate-900">Read what members say. </span>
              <Link href="/" className="text-emerald-700 underline underline-offset-4">
                See testimonials on the homepage
              </Link>
              , or read the <Link href="/faq" className="text-emerald-700 underline underline-offset-4">FAQ</Link>.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Ready to find what your body is holding onto?</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Do sessions on your own, at your own pace, whenever you need them.
          </p>
          <Link
            href="/signup"
            className="mt-5 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Start your first session
          </Link>
        </section>

        <p className="text-xs leading-6 text-slate-500">
          Release Core is for self-awareness and nervous system support. It isn&apos;t a substitute for
          medical or mental health care. If you&apos;re in crisis, call or text 988 (U.S.).
        </p>
      </div>
    </AppShell>
  );
}
