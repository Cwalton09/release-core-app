// Add this popup component to your dashboard page
// Show it when someone clicks "Start Session"
// Replace your current "Start Session" button with this

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SessionPicker() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
      >
        Start Session
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Choose your session type</h2>
            <p className="text-sm text-slate-500 mb-6 leading-6">Both sessions work with your nervous system to identify and release what your body is holding.</p>

            <div className="space-y-3">
              {/* Phase 1 */}
              <button
                onClick={() => { setOpen(false); router.push("/start-session"); }}
                className="w-full rounded-2xl border-2 border-calm-200 bg-white p-5 text-left transition-all hover:border-calm-400 hover:bg-calm-50"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">🌿</span>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Phase 1 — Structured Release Session</p>
                    <p className="text-sm text-slate-500 leading-5">A guided step-by-step session using the sway test to identify emotions, body sensations, core beliefs, and patterns. Best for your first sessions or when you want a clear structured experience.</p>
                  </div>
                </div>
              </button>

              {/* Phase 2 */}
              <button
                onClick={() => { setOpen(false); router.push("/guided-deep-session"); }}
                className="w-full rounded-2xl border-2 border-calm-200 bg-white p-5 text-left transition-all hover:border-calm-400 hover:bg-calm-50"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">🔍</span>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Phase 2 — Guided Deep Session</p>
                    <p className="text-sm text-slate-500 leading-5">A conversational session that asks adaptive questions based on your body's responses to find the root pattern underneath what you are experiencing. Best when you want to go deeper on something specific.</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-sm text-slate-400 hover:text-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
