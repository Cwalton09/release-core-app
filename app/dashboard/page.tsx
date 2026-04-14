"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

export default function Dashboard() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async (retryCount = 0) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("SESSION ON DASHBOARD:", session);

        const user = session?.user;

        if (!user) {
          if (retryCount < 3) {
            setTimeout(() => {
              if (mounted) checkAccess(retryCount + 1);
            }, 500);
            return;
          }

          console.log("No user found, redirecting to login");
          if (mounted) router.replace("/login");
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("paid")
          .eq("user_id", user.id)
          .maybeSingle();

        console.log("PROFILE:", profile, "PROFILE ERROR:", error);

        if (error) {
          console.error("Profile fetch error:", error);
          if (mounted) setCheckingAccess(false);
          return;
        }

        if (!profile?.paid) {
          window.location.href = STRIPE_PAYMENT_LINK;
          return;
        }

        const saved = localStorage.getItem("release-core-disclaimer-accepted");

        if (mounted) {
          setAccepted(saved === "true");
          setCheckingAccess(false);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        if (mounted) router.replace("/login");
      }
    };

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleAccept = () => {
    localStorage.setItem("release-core-disclaimer-accepted", "true");
    setAccepted(true);
  };

  if (checkingAccess || accepted === null) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col items-center">
      {!accepted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Important Disclaimer
            </h2>

            <div className="space-y-4 text-gray-700 leading-7 text-sm">
              <p>
                This app is designed for self-awareness, personal growth, and
                nervous system support.
              </p>
              <p>
                The Release Core Method is not a substitute for medical advice,
                diagnosis, or treatment. It does not diagnose or treat any
                physical or mental health condition.
              </p>
              <p>
                All insights, prompts, and guidance provided within this app are
                for educational and informational purposes only.
              </p>
              <p>
                You are responsible for your own health, decisions, and actions.
              </p>
              <p>
                If you are experiencing severe emotional distress, physical
                symptoms, or medical concerns, please consult a licensed
                healthcare provider.
              </p>
            </div>

            <button
              onClick={handleAccept}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
            >
              I Understand and Agree
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Dashboard
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/start-session")}
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
          >
            Start Session
          </button>

          <button
            onClick={() => router.push("/session-entry")}
            className="w-full bg-white border border-gray-300 py-3 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Session Entry
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full text-sm text-gray-500 mt-4 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}