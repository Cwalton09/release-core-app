"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

type Session = {
  id: string;
  created_at: string;
  emotions: string;
  core_beliefs: string;
  ages: string;
  symptoms: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async (retryCount = 0) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user) {
          if (retryCount < 3) {
            setTimeout(() => {
              if (mounted) checkAccess(retryCount + 1);
            }, 500);
            return;
          }
          if (mounted) router.replace("/login");
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("paid")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          if (mounted) setCheckingAccess(false);
          return;
        }

        if (!profile?.paid) {
          window.location.href = STRIPE_PAYMENT_LINK;
          return;
        }

        // Load past sessions
        const { data: pastSessions } = await supabase
          .from("sessions")
          .select("id, created_at, emotions, core_beliefs, ages, symptoms")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (mounted) {
          setSessions(pastSessions ?? []);
          setLoadingSessions(false);
        }

        const saved = sessionStorage.getItem("release-core-disclaimer-accepted");

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
    sessionStorage.setItem("release-core-disclaimer-accepted", "true");
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
              Disclaimer
            </h2>
            <div className="space-y-3 text-gray-700 leading-7 text-sm">
              <p>This app is designed for self-awareness, personal growth, and nervous system support.</p>
              <p>The Release Core Method is not a substitute for medical advice, diagnosis, or treatment. It does not diagnose or treat any physical or mental health condition.</p>
              <p>All insights, prompts, and guidance provided within this app are for educational and informational purposes only.</p>
              <p>You are responsible for your own health, decisions, and actions.</p>
              <p>If you are experiencing severe emotional distress, physical symptoms, or medical concerns, please consult a licensed healthcare provider.</p>
            </div>

            <hr className="my-5 border-gray-200" />

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Terms of Use</h2>
            <div className="space-y-3 text-gray-700 leading-7 text-sm">
              <p>By accessing or using the Release Core platform, including its website and application, you agree to the following Terms of Use. If you do not agree, you should not use this app.</p>
              <h3 className="font-semibold text-gray-800">Self-Awareness and Personal Growth Only</h3>
              <p>The Release Core Method and this application and/or website are intended for self-awareness, personal growth, and educational purposes only.</p>
              <p>This app and/or website is not intended to diagnose, treat, cure, or prevent any medical or mental health condition. It is not a substitute for professional medical, psychological, or therapeutic advice, diagnosis, or treatment.</p>
              <h3 className="font-semibold text-gray-800">No Professional Relationship</h3>
              <p>Use of this app and/or website does not create any doctor-patient, therapist-client, or other licensed professional relationship.</p>
              <h3 className="font-semibold text-gray-800">User Responsibility</h3>
              <p>You acknowledge and agree that you are fully responsible for your own health, decisions, actions, and results while using this app.</p>
              <p>You understand that all guidance, prompts, and experiences within the app are self-directed and that you may stop at any time.</p>
              <h3 className="font-semibold text-gray-800">Assumption of Risk</h3>
              <p>You understand that emotional responses, physical sensations, and personal insights may arise during use of this app.</p>
              <p>By using this app and/or website, you voluntarily assume all risks associated with your use, including but not limited to emotional discomfort, physical sensations, or personal reactions.</p>
              <h3 className="font-semibold text-gray-800">Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, the creator of the Release Core app shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or related to your use of the app and/or website.</p>
              <h3 className="font-semibold text-gray-800">No Guarantees</h3>
              <p>The app and/or website makes no guarantees regarding results, outcomes, or effectiveness. Each individual's experience will vary.</p>
              <h3 className="font-semibold text-gray-800">Not for Crisis Use</h3>
              <p>This app and/or website is not intended for use in medical or mental health emergencies. If you are experiencing severe emotional distress, crisis, or medical concerns, please seek immediate help from a licensed professional or emergency services.</p>
              <h3 className="font-semibold text-gray-800">Intellectual Property</h3>
              <p>All content, materials, methods, language, and processes within the Release Core app are proprietary and protected by copyright and applicable intellectual property laws.</p>
              <h3 className="font-semibold text-gray-800">Acceptance of Terms</h3>
              <p>By continuing to use this app and/or website, you acknowledge that you have read, understood, and agreed to these Terms of Use.</p>
            </div>

            <hr className="my-5 border-gray-200" />

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Privacy Policy</h2>
            <div className="space-y-3 text-gray-700 leading-7 text-sm">
              <p>This Privacy Policy explains how the Release Core Method app ("we", "our", or "the app") collects, uses, and protects your information.</p>
              <h3 className="font-semibold text-gray-800">Information We Collect</h3>
              <p>An account is required to access this app. We collect your email address and payment status in order to provide access to the platform.</p>
              <p>Any inputs you provide during sessions (such as emotions, body awareness, or beliefs) are processed only within the app experience and are not stored on external servers.</p>
              <h3 className="font-semibold text-gray-800">How Your Information Is Used</h3>
              <p>Your information is used solely to provide access to and operate the app. We do not sell, share, or distribute your information.</p>
              <h3 className="font-semibold text-gray-800">Local Storage</h3>
              <p>This app may use local storage on your device to remember preferences, such as whether you have accepted the disclaimer. This data stays on your device and is not transmitted.</p>
              <h3 className="font-semibold text-gray-800">Medical Disclaimer</h3>
              <p>This app is designed for self-awareness and personal development purposes only and is not a substitute for medical, psychological, or professional advice, diagnosis, or treatment.</p>
              <h3 className="font-semibold text-gray-800">Changes to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. Continued use of the app means you accept any updates.</p>
              <h3 className="font-semibold text-gray-800">Contact</h3>
              <p>If you have questions about this policy, you may contact us through the app creator.</p>
            </div>

            <hr className="my-5 border-gray-200" />

            <p className="text-xs text-gray-500 mb-4">
              By clicking below, you confirm that you have read and agree to the Disclaimer, Terms of Use, and Privacy Policy above.
            </p>
            <button
              onClick={handleAccept}
              className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
            >
              I Understand and Agree
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Dashboard
        </h1>

        {/* Start buttons */}
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
        </div>

        {/* Past sessions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Past Sessions</h2>

          {loadingSessions ? (
            <p className="text-sm text-gray-500">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
              <p className="text-sm text-gray-500">No sessions yet. Start your first session above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-2"
                >
                  <p className="text-xs text-gray-400">
                    {new Date(session.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {session.emotions && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Emotions: </span>
                      {session.emotions}
                    </p>
                  )}
                  {session.core_beliefs && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Core beliefs: </span>
                      {session.core_beliefs}
                    </p>
                  )}
                  {session.ages && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Age: </span>
                      {session.ages}
                    </p>
                  )}
                  {session.symptoms && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Symptoms: </span>
                      {session.symptoms}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full text-sm text-gray-500 mt-4 underline"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}