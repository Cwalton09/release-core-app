"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Stripe sends people here after checkout. Access is granted by the Stripe
// webhook once the payment is confirmed, so this page only waits for that.
const CHECK_EVERY_MS = 2000;
const GIVE_UP_AFTER_MS = 60000;

export default function SuccessPage() {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    const waitForPayment = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      while (!cancelled) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("paid")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profile?.paid) {
          router.replace("/dashboard");
          return;
        }

        if (Date.now() - startedAt > GIVE_UP_AFTER_MS) {
          setTimedOut(true);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, CHECK_EVERY_MS));
      }
    };

    waitForPayment();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (timedOut) {
    return (
      <div className="mx-auto max-w-md p-10 text-center text-slate-700">
        <p className="text-lg font-semibold text-slate-900">Your payment is still being confirmed.</p>
        <p className="mt-3 text-sm leading-7">
          This usually takes a few seconds but can take a couple of minutes. Refresh this page in a
          moment, or log in again shortly.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
        >
          Check again
        </button>
      </div>
    );
  }

  return <div className="p-10 text-center">Confirming your payment...</div>;
}
