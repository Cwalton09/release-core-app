"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const affirmations = [
  "I give myself permission to listen to my body.",
  "I am open to receiving what my body wants to share.",
  "My body is a safe place for me to be.",
  "I trust what my body is telling me.",
  "I am here and I am listening.",
  "My body and I are working together.",
];

export default function SessionEntryPage() {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", user.id)
        .single();
      if (error || !profile?.paid) {
        window.location.href = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";
        return;
      }
      setCheckingAccess(false);
    };
    checkAccess();
  }, [router]);

  if (checkingAccess) {
    return null;
  }

  return (
    <AppShell title="Before we begin…">
      <div className="space-y-5 text-sm leading-7 text-slate-700">
        <p>
          Take a breath and let your body settle. Say the following out loud, or quietly to yourself:
        </p>
        <ul className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          {affirmations.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="pt-1 text-emerald-600">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p>
          Take another breath. Notice any shift, even if it is small. When you feel ready, continue.
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