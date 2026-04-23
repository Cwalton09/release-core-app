import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell title="Welcome to Release Core">
      <div className="space-y-8">

        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-slate-900 leading-tight">
            Your body knows where it hurts.
            <br />
            <span className="text-emerald-700">We help you listen.</span>
          </h1>
        </div>

        {/* What is Release Core */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">What is Release Core?</h2>
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              Release Core is a guided nervous system method designed to help you identify and release the core beliefs your body is holding onto beneath stress, patterns, and emotional or physical discomfort. Instead of only working with thoughts or surface-level emotions, this method allows your body to lead the process, using subtle responses to uncover what is stored at the root.
            </p>
            <p>
              Through a structured process, you are guided to connect with sensations in the body, identify the emotions attached to them, and trace them back to the earliest point they were formed. These experiences are not just mental — they are held within the nervous system. Release Core focuses on creating safety in the body while gently bringing awareness to those stored patterns, without forcing you to relive or re-experience them.
            </p>
            <p>
              Once the root belief is identified, the body is supported in releasing the stored response and updating the pattern with a sense of safety, support, and present-day awareness. This allows the nervous system to shift out of survival responses like fight, flight, freeze, or fawn, and into a more regulated state.
            </p>
          </div>
        </div>

        {/* Nighttime scripts */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Subconscious integration while you sleep</h2>
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              A key part of the Release Core Method is integrating the subconscious mind through personalized nighttime scripts. These scripts are created directly from the core beliefs uncovered during your session.
            </p>
            <p>
              As your body enters a relaxed, pre-sleep state, the subconscious becomes more receptive. Listening to or repeating a script that reflects the exact beliefs your body was holding allows those patterns to be gently rewritten at a deeper level, reinforcing safety, support, and new internal beliefs while you rest.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">How does a session work?</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <div className="flex gap-3">
              <span className="text-emerald-700 font-bold text-base">1.</span>
              <p><span className="font-medium">Connect with your body</span> — Learn the sway test so your body can communicate yes and no.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-700 font-bold text-base">2.</span>
              <p><span className="font-medium">Find the emotion</span> — Let your body identify what emotion is stored and where you feel it.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-700 font-bold text-base">3.</span>
              <p><span className="font-medium">Uncover the origin</span> — Find the age it began, who was involved, and what your body believed.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-700 font-bold text-base">4.</span>
              <p><span className="font-medium">Release and reprogram</span> — Honor what your body carried, release it, and install new beliefs.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-700 font-bold text-base">5.</span>
              <p><span className="font-medium">Integrate overnight</span> — Receive a personalized nighttime script to install new beliefs while you sleep.</p>
            </div>
          </div>
        </div>

        {/* What it is not */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">What Release Core is not</h2>
          <div className="space-y-4 text-sm leading-7 text-slate-700">
            <p>
              Release Core is not about fixing you. It is about working with your body in a way that helps it let go of what it no longer needs to hold onto. Many people use this method to explore emotional patterns, internal blocks, or areas where they feel stuck, while building a deeper sense of connection and trust with their body.
            </p>
          </div>
        </div>

        {/* What it helps with */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">What can it help with?</h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
            <p>• Physical pain or tension</p>
            <p>• Anxiety or overwhelm</p>
            <p>• Financial blocks</p>
            <p>• Relationship patterns</p>
            <p>• Difficulty healing</p>
            <p>• Fatigue or brain fog</p>
            <p>• Feeling stuck</p>
            <p>• Stress and burnout</p>
            <p>• Difficulty detoxing</p>
            <p>• Repeating life patterns</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center leading-6">
          This method is intended for educational and personal growth purposes and is not a substitute for medical or psychological treatment.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition text-center"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-gray-100 transition text-center"
          >
            Log In
          </Link>
        </div>

      </div>
    </AppShell>
  );
}