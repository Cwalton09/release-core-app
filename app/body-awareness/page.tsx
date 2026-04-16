"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { supabase } from "@/lib/supabase";

const activationStatements = [
  "I am ready, willing, and able to communicate with my body.",
  "It is safe for me to communicate with my body.",
  "I want to communicate with my body.",
  "I believe I can communicate with my body.",
  "It is good for me to communicate with my body.",
  "My body wants to communicate with me.",
];

export default function BodyAwarenessPage() {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [symptoms, setSymptoms] = useState("");
  const [showActivation, setShowActivation] = useState(false);

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

  if (checkingAccess) return null;

  const continueWithSymptoms = () => {
    const params = new URLSearchParams();
    if (symptoms) params.set("symptoms", symptoms);
    router.push(`/start-session?${params.toString()}`);
  };

  const continueBodyLead = () => {
    router.push("/start-session");
  };

  return (
    <AppShell title="Body Awareness">
      <div className="space-y-6">

        {/* Sway test instructions */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            The Sway Test — Let your body lead
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            The sway test is how you communicate with your body throughout this process. Your body already knows the answers — this is how we listen to it.
          </p>

          <div className="space-y-2 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-slate-800">How to find your yes and no:</p>
            <p>• Stand with your feet flat on the ground, shoulder width apart</p>
            <p>• Close your eyes and take a slow deep breath</p>
            <p>• Let your body relax and soften — do not try to control the movement</p>
            <p>• Say out loud: <span className="font-medium italic">"My name is [your real name]."</span></p>
            <p>• Notice which direction your body naturally sways — forward or backward</p>
            <p>• That direction is your body's <span className="font-semibold">yes</span></p>
          </div>

          <div className="space-y-2 text-sm leading-7 text-slate-700">
            <p>Now test your <span className="font-semibold">no</span>:</p>
            <p>• Say out loud: <span className="font-medium italic">"My name is [a name that is not yours]."</span></p>
            <p>• Notice your body sway in the opposite direction</p>
            <p>• That is your body's <span className="font-semibold">no</span></p>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            Trust the first response your body gives you. You will use this throughout the entire session.
          </p>
        </div>

        {/* If body is not responding */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <button
            onClick={() => setShowActivation(!showActivation)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-base font-semibold text-slate-900">
              My body is not swaying yet
            </span>
            <span className="text-slate-400 text-lg">{showActivation ? "−" : "+"}</span>
          </button>

          {showActivation && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <p className="text-sm leading-7 text-slate-700">
                Sometimes the connection between the mind and body needs to be opened first. Say each of these statements out loud, slowly and clearly. You do not need to sway test them — just speak them and let them land.
              </p>
              <div className="space-y-3">
                {activationStatements.map((statement, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-slate-700 leading-7 italic"
                  >
                    "{statement}"
                  </div>
                ))}
              </div>
              <p className="text-sm leading-7 text-slate-700">
                After saying these out loud, go back and test your yes and no again. Your body should begin to respond.
              </p>
            </div>
          )}
        </div>

        {/* Symptoms */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            What are you currently experiencing?
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            Type any physical symptoms, emotions, or patterns you are noticing right now. This helps your body know where to start — or you can leave it blank and let your body lead.
          </p>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. tightness in my chest, anxiety, lower back pain, feeling overwhelmed, numbness, sadness..."
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Continue options */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            How would you like to begin?
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            Use your sway test — ask your body which option feels right.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={continueWithSymptoms}
              disabled={!symptoms.trim()}
              className={`flex-1 rounded-xl px-5 py-3 text-sm font-medium transition ${
                symptoms.trim()
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Work with my symptoms
            </button>
            <button
              onClick={continueBodyLead}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:border-emerald-400 transition"
            >
              Let my body lead
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
}