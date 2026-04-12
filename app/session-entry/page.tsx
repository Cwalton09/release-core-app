import Link from "next/link";
import AppShell from "@/components/AppShell";

const affirmations = [
  "I am ready, willing, and able to communicate with my body.",
  "It is safe for me to communicate with my body.",
  "I want to communicate with my body.",
  "I believe I can communicate with my body.",
  "It is good for me to communicate with my body.",
  "My body wants to communicate with me."
];

export default function SessionEntryPage() {
  return (
    <AppShell title="Before we begin…">
      <div className="space-y-5 text-sm leading-7 text-slate-700">
        <p>
          Take a breath and let your body settle. Say the following out loud, or quietly to yourself:
        </p>
        <ul className="space-y-2 rounded-xl border border-calm-200 bg-calm-50 p-4">
          {affirmations.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="pt-1 text-calm-600">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p>
          Take another breath. Notice any shift, even if it’s small. When you feel ready, continue.
        </p>
             </div>
<div className="pt-6">
  <Link
    href="/explore"
    className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
  >
    Continue
  </Link>
</div>
    </AppShell>
  );
}
