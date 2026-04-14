import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell title="Welcome to Release Core">
      <div className="space-y-6 text-center">
        <p className="text-slate-600">
          Begin your Release Core session flow.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/signup"
            className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
          >
            Create Account
          </Link>

          <Link
            href="/login"
            className="w-full rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-gray-100 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </AppShell>
  );
}