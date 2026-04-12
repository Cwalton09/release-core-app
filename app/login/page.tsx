import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function LoginPage() {
  return (
    <AppShell title="Login" subtitle="Welcome back. Sign in to continue your Release Core practice.">
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-calm-200 px-4 py-2.5 text-sm outline-none ring-calm-500 focus:ring"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-calm-200 px-4 py-2.5 text-sm outline-none ring-calm-500 focus:ring"
        />
        <button className="w-full rounded-xl bg-calm-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-calm-700">
          Log in
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        New here?{" "}
        <Link href="/signup" className="font-medium text-calm-700 hover:underline">
          Create an account
        </Link>
        .
      </p>
    </AppShell>
  );
}
