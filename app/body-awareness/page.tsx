"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function BodyAwarenessPage() {
  return (
    <AppShell title="Body Awareness">
      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Let your body lead (Sway Test)
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            This process is not about thinking. Your body already knows the
            answers.
          </p>

          <div className="space-y-2 text-sm leading-7 text-slate-700">
            <p>• Stand up with your feet flat on the ground</p>
            <p>• Close your eyes and take a deep breath</p>
            <p>• Let your body relax and soften</p>
            <p>• Do not try to control the movement</p>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            First, we are going to test your body’s <strong>yes</strong>.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Say this out loud or in your mind:
          </p>

          <p className="text-sm font-medium text-slate-900">
            “My name is [your real name].”
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Notice which direction your body naturally sways.
          </p>

          <div className="space-y-2 text-sm leading-7 text-slate-700">
            <p>• You may gently sway forward</p>
            <p>• You may gently sway backward</p>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            Whatever direction your body moves, that becomes your body’s{" "}
            <strong>yes</strong>.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Now test your body’s <strong>no</strong>.
          </p>

          <p className="text-sm font-medium text-slate-900">
            Say: “My name is [a different name].”
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Notice if your body responds in the opposite direction.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Don’t force it. Even the smallest movement counts. Trust the first
            response your body gives you.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            From here on out, let your body answer. Don’t overthink it.
          </p>
        </div>

        <p className="text-sm leading-7 text-slate-700">
          Take a moment to gently bring your attention into your body. Notice
          what stands out first without forcing anything.
        </p>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Where do you feel this in your body?
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Chest, stomach, throat, shoulders..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              What does it feel like?
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Tight, heavy, pressure, buzzing..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Shape
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Ball, knot, cloud, sharp edge..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Color
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Black, gray, red, blue..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Size
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Small, medium, large..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Texture
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Rough, sticky, dense, soft..."
            />
          </div>
        </div>

        <Link
          href="/emotion"
          className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white transition hover:bg-emerald-800"
        >
          Continue
        </Link>
      </div>
    </AppShell>
  );
}