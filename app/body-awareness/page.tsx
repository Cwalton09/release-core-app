"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

export default function BodyAwarenessPage() {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Not logged in
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("paid")
        .eq("user_id", user.id)
        .single();

      // Not paid
      if (error || !profile?.paid) {
        window.location.href =
          "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";
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
    <AppShell title="Body Awareness">
      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Let your body lead (Sway Test)
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            This process is not about thinking. Your body already knows the answers.
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

          <p className="text-sm font-medium text-slate-900">
            “My name is [your real name].”
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Notice which direction your body naturally sways.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Now test your body’s <strong>no</strong>.
          </p>

          <p className="text-sm font-medium text-slate-900">
            Say: “My name is [a different name].”
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Trust the first response your body gives you.
          </p>
        </div>

        <p className="text-sm leading-7 text-slate-700">
          Take a moment to gently bring your attention into your body.
        </p>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Where do you feel this?" />
          <input className="w-full rounded-xl border px-4 py-3" placeholder="What does it feel like?" />
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Shape" />
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Color" />
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Size" />
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Texture" />
        </div>

        <Link
          href="/emotion"
          className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-3 font-medium text-white"
        >
          Continue
        </Link>
      </div>
    </AppShell>
  );
}