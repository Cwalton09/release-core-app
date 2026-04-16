"use client";
import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DisclaimerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("paid")
        .eq("id", user.id)
        .single();
      if (!profile?.paid) {
        router.push("/");
        return;
      }
      setLoading(false);
    };
    checkAccess();
  }, [router]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const handleAccept = () => {
    sessionStorage.setItem("release-core-disclaimer-accepted", "true");
    router.push("/start-session");
  };

  return (
    <AppShell title="Disclaimer">
      <div className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm space-y-10">

        {/* Disclaimer */}
        <section>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-6">
            Disclaimer
          </h1>
          <div className="space-y-4 text-neutral-700 leading-7">
            <p>
              This app is designed for self-awareness, personal growth, and nervous system support.
            </p>
            <p>
              The Release Core Method is not a substitute for medical advice, diagnosis, or treatment.
            </p>
            <p>
              All insights, prompts, and guidance provided are for educational purposes only.
            </p>
            <p>
              You are responsible for your own health, decisions, and actions.
            </p>
            <p>
              If you are experiencing distress, please consult a licensed provider.
            </p>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Terms of Use */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Terms of Use
          </h2>
          <div className="space-y-4 text-neutral-700 leading-7 text-sm">
            <p>
              By accessing or using the Release Core platform, including its website and application, you agree to the following Terms of Use. If you do not agree, you should not use this app.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Self-Awareness and Personal Growth Only</h3>
            <p>
              The Release Core Method and this application and/or website are intended for self-awareness, personal growth, and educational purposes only.
            </p>
            <p>
              This app and/or website is not intended to diagnose, treat, cure, or prevent any medical or mental health condition. It is not a substitute for professional medical, psychological, or therapeutic advice, diagnosis, or treatment.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">No Professional Relationship</h3>
            <p>
              Use of this app and/or website does not create any doctor-patient, therapist-client, or other licensed professional relationship.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">User Responsibility</h3>
            <p>
              You acknowledge and agree that you are fully responsible for your own health, decisions, actions, and results while using this app.
            </p>
            <p>
              You understand that all guidance, prompts, and experiences within the app are self-directed and that you may stop at any time.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Assumption of Risk</h3>
            <p>
              You understand that emotional responses, physical sensations, and personal insights may arise during use of this app.
            </p>
            <p>
              By using this app and/or website, you voluntarily assume all risks associated with your use, including but not limited to emotional discomfort, physical sensations, or personal reactions.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by law, the creator of the Release Core app shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or related to your use of the app and/or website.
            </p>
            <p>
              This includes, but is not limited to, any emotional, physical, financial, or personal outcomes that may result from using the app and/or website.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">No Guarantees</h3>
            <p>
              The app and/or website makes no guarantees regarding results, outcomes, or effectiveness. Each individual's experience will vary.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Not for Crisis Use</h3>
            <p>
              This app and/or website is not intended for use in medical or mental health emergencies.
            </p>
            <p>
              If you are experiencing severe emotional distress, crisis, or medical concerns, please seek immediate help from a licensed professional or emergency services.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Intellectual Property</h3>
            <p>
              All content, materials, methods, language, and processes within the Release Core app are proprietary and protected by copyright and applicable intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, distribute, modify, or create derivative works from any part of this app and/or website without prior written permission.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Acceptance of Terms</h3>
            <p>
              By continuing to use this app and/or website, you acknowledge that you have read, understood, and agreed to these Terms of Use.
            </p>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Privacy Policy
          </h2>
          <div className="space-y-4 text-neutral-700 leading-7 text-sm">
            <p>
              This Privacy Policy explains how the Release Core Method app ("we", "our", or "the app") collects, uses, and protects your information.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Information We Collect</h3>
            <p>
              This app does not require account creation and does not collect personally identifiable information such as your name, email, or address.
            </p>
            <p>
              Any inputs you provide during sessions (such as emotions, body awareness, or beliefs) are processed only within the app experience and are not stored on external servers.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">How Your Information Is Used</h3>
            <p>
              Your responses are used solely to generate a personalized session experience within the app. We do not sell, share, or distribute your information.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Local Storage</h3>
            <p>
              This app may use local storage on your device to remember preferences, such as whether you have accepted the disclaimer. This data stays on your device and is not transmitted.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Medical Disclaimer</h3>
            <p>
              This app is designed for self-awareness and personal development purposes only and is not a substitute for medical, psychological, or professional advice, diagnosis, or treatment.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Continued use of the app means you accept any updates.
            </p>

            <h3 className="text-base font-semibold text-neutral-900">Contact</h3>
            <p>
              If you have questions about this policy, you may contact us through the app creator.
            </p>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Accept Button */}
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            By clicking below, you confirm that you have read and agree to the Disclaimer, Terms of Use, and Privacy Policy above.
          </p>
          <button
            onClick={handleAccept}
            className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
          >
            I Understand and Agree
          </button>
        </div>

      </div>
    </AppShell>
  );
}