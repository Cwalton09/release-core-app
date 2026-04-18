"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kQ3cvaczg6H6tpgYsbII01";

const beliefFlipMap: Record<string, string[]> = {
  "I am not safe": ["I am safe now.", "It is safe for me to soften.", "I can rest and still be safe.", "I can let go while I sleep.", "My body does not have to stay on guard anymore."],
  "I am alone": ["I am not alone.", "I am supported.", "It is safe for me to receive support.", "I do not have to carry everything alone anymore.", "I can rest and feel held."],
  "I am not enough": ["I am enough as I am.", "I do not have to prove my worth.", "I am safe even when I rest.", "I can sleep without holding that pressure anymore."],
  "I am not supported": ["I am supported now.", "It is safe for me to receive help.", "I do not have to hold everything alone anymore.", "I can relax and still be okay."],
  "I have to stay in control": ["I do not have to control everything to be safe.", "It is safe for me to soften.", "I can relax and still be okay.", "I can sleep without gripping."],
  "I have to handle everything myself": ["I am allowed to ask for help.", "I do not have to do this alone.", "It is safe to receive support.", "I can let others in."],
  "Something will go wrong": ["I am safe in this moment.", "I do not have to brace for what has not happened.", "I can rest in what is true right now.", "My body does not have to stay on alert."],
  "I cannot relax": ["It is safe for me to rest.", "I am allowed to soften.", "Relaxing does not mean losing control.", "My body is allowed to be at ease."],
  "I will lose everything": ["I am here now.", "I do not have to live inside that fear anymore.", "I can sleep without preparing for everything to fall apart.", "I am okay right now."],
  "I am not important": ["I am important.", "I matter.", "It is safe for me to take up space.", "I do not have to earn my place."],
  "I do not matter": ["I matter.", "My body matters.", "My needs matter.", "It is safe for me to exist fully."],
  "My needs do not matter": ["My needs matter now.", "It is safe for me to have needs.", "It is safe for me to receive.", "I can rest and let my body be supported."],
  "I have to stay strong": ["I do not have to stay hard to stay safe.", "It is safe for me to soften.", "Softness is not weakness.", "I am allowed to rest."],
  "I am responsible for everyone": ["I am not responsible for carrying everyone.", "I can release what is not mine.", "I am allowed to rest.", "I can sleep without holding that weight."],
  "It is not safe to let go": ["It is safe for me to let go now.", "I can soften and still be safe.", "I can let go while I sleep.", "Letting go does not mean losing control."],
};

const beliefFlipMapBiblical: Record<string, string[]> = {
  "I am not safe": ["God is my refuge and I am safe in Him.", "I am held and protected tonight.", "I can rest — He is watching over me.", "I do not have to stay on guard. He guards me."],
  "I am alone": ["I am never alone. God is with me.", "He has not left me and He will not.", "I am held by something greater than I can see.", "I can rest knowing I am not carrying this alone."],
  "I am not enough": ["God says I am enough. He made me on purpose.", "I do not have to earn what He has already given me.", "I am enough because He says I am.", "I can rest without proving anything."],
  "I am not supported": ["God is my support and my strength.", "I am not holding this alone — He is holding me.", "It is safe to receive. He provides.", "I can let go and trust that I am carried."],
  "I have to stay in control": ["I can release control to the One who holds all things.", "God's hands are more steady than mine.", "It is safe to let go — He is in control.", "I can rest without gripping."],
  "I have to handle everything myself": ["I was never meant to carry this alone.", "God invites me to bring this to Him.", "I can ask for help — from Him and from others.", "It is safe to receive."],
  "Something will go wrong": ["God knows what is ahead and He is already there.", "I do not have to brace for what has not happened.", "I can trust what I cannot see.", "I am safe in this moment."],
  "I cannot relax": ["He gives rest to those He loves.", "I am allowed to be still.", "Resting is an act of trust.", "My body is allowed to be at peace tonight."],
  "I will lose everything": ["What God has for me cannot be taken.", "I do not have to live inside that fear.", "He is my provider and my keeper.", "I am okay right now, in His hands."],
  "I am not important": ["God knows my name. I am important to Him.", "He sees me and He chose me.", "I do not have to earn my place — He gave it to me.", "I matter to God."],
  "I do not matter": ["I matter to God deeply and completely.", "He formed me and He does not make mistakes.", "My needs matter to Him.", "It is safe for me to exist fully — He made space for me."],
  "My needs do not matter": ["God sees my needs and He cares about them.", "I am allowed to bring my needs to Him.", "It is safe to receive — He is a good giver.", "My needs matter to the One who created me."],
  "I have to stay strong": ["His strength is made perfect in my weakness.", "I do not have to hold it together — He holds me.", "Softness is not weakness. It is trust.", "I am allowed to rest in Him tonight."],
  "I am responsible for everyone": ["He is the one who carries the world — not me.", "I can release what was never mine to hold.", "God is responsible for what I cannot control.", "I can sleep without holding that weight."],
  "It is not safe to let go": ["It is safe to let go — He catches what I release.", "I can open my hands and trust Him with what falls.", "Letting go is not losing. It is trusting.", "He is steady when I soften."],
};

const fallbackBeliefs = ["I am safe now.", "I am not alone.", "I am supported.", "I can relax and still be okay.", "I can let go and still be safe.", "My body does not have to protect me like that anymore."];
const fallbackBeliefsBiblical = ["God is with me tonight.", "I am safe in His hands.", "I am not alone — He is here.", "I can rest and trust Him.", "He holds what I release.", "I am enough because He says I am."];

type Session = {
  id: string;
  created_at: string;
  emotions: string;
  core_beliefs: string;
  ages: string;
  symptoms: string;
  who_involved: string;
  what_happened: string;
  patterns: string;
  unmet_need: string;
  own_words: string;
  body_location: string;
  feeling: string;
  shape: string;
  color: string;
  size: string;
  texture: string;
  activation_age: string;
};

function getNightlyBeliefs(coreBeliefs: string, biblical: boolean) {
  const beliefs = coreBeliefs ? coreBeliefs.split(",").map((b) => b.trim()).filter(Boolean) : [];
  const map = biblical ? beliefFlipMapBiblical : beliefFlipMap;
  const fallback = biblical ? fallbackBeliefsBiblical : fallbackBeliefs;
  const matched = Array.from(new Set(beliefs.flatMap((b) => map[b] ?? [])));
  return matched.length > 0 ? matched : fallback;
}

export default function Dashboard() {
  const router = useRouter();
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [standardOpen, setStandardOpen] = useState(false);
  const [biblicalOpen, setBiblicalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async (retryCount = 0) => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (!user) {
          if (retryCount < 3) {
            setTimeout(() => { if (mounted) checkAccess(retryCount + 1); }, 500);
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

        if (error) { if (mounted) setCheckingAccess(false); return; }

        if (!profile?.paid) { window.location.href = STRIPE_PAYMENT_LINK; return; }

        const { data: pastSessions } = await supabase
          .from("sessions")
          .select("id, created_at, emotions, core_beliefs, ages, symptoms, who_involved, what_happened, patterns, unmet_need, own_words, body_location, feeling, shape, color, size, texture, activation_age")
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
    return () => { mounted = false; };
  }, [router]);

  const handleAccept = () => {
    sessionStorage.setItem("release-core-disclaimer-accepted", "true");
    setAccepted(true);
  };

  const openSession = (session: Session) => {
    setSelectedSession(session);
    setStandardOpen(false);
    setBiblicalOpen(false);
  };

  if (checkingAccess || accepted === null) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  const nightlyBeliefs = selectedSession ? getNightlyBeliefs(selectedSession.core_beliefs, false) : [];
  const nightlyBeliefsBiblical = selectedSession ? getNightlyBeliefs(selectedSession.core_beliefs, true) : [];
  const ageText = selectedSession?.ages || "a younger age";
  const whoText = selectedSession?.who_involved || "someone in your life";
  const emotionText = selectedSession?.emotions || "what came up";
  const bodyPlacementText = selectedSession?.body_location
    ? `Place your hand gently on your ${selectedSession.body_location}.`
    : "Place one hand on your chest and one hand on your belly.";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col items-center">

      {/* Disclaimer modal */}
      {!accepted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Disclaimer</h2>
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
              <p>This Privacy Policy explains how the Release Core Method app collects, uses, and protects your information.</p>
              <h3 className="font-semibold text-gray-800">Information We Collect</h3>
              <p>An account is required to access this app. We collect your email address and payment status in order to provide access to the platform.</p>
              <p>Any inputs you provide during sessions are processed only within the app experience and are not stored on external servers.</p>
              <h3 className="font-semibold text-gray-800">How Your Information Is Used</h3>
              <p>Your information is used solely to provide access to and operate the app. We do not sell, share, or distribute your information.</p>
              <h3 className="font-semibold text-gray-800">Changes to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. Continued use of the app means you accept any updates.</p>
              <h3 className="font-semibold text-gray-800">Contact</h3>
              <p>If you have questions about this policy, you may contact us through the app creator.</p>
            </div>
            <hr className="my-5 border-gray-200" />
            <p className="text-xs text-gray-500 mb-4">By clicking below, you confirm that you have read and agree to the Disclaimer, Terms of Use, and Privacy Policy above.</p>
            <button onClick={handleAccept} className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition">
              I Understand and Agree
            </button>
          </div>
        </div>
      )}

      {/* Session detail modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Session Details</h2>
              <button onClick={() => setSelectedSession(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(selectedSession.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>

            {selectedSession.symptoms && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Symptoms</p>
                <p className="text-sm text-gray-700">{selectedSession.symptoms}</p>
              </div>
            )}

            {(selectedSession.body_location || selectedSession.feeling || selectedSession.shape || selectedSession.color || selectedSession.size || selectedSession.texture) && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Body Sensation</p>
                {selectedSession.body_location && <p className="text-sm text-gray-700"><span className="font-medium">Location: </span>{selectedSession.body_location}</p>}
                {selectedSession.feeling && <p className="text-sm text-gray-700"><span className="font-medium">Feeling: </span>{selectedSession.feeling}</p>}
                {selectedSession.shape && <p className="text-sm text-gray-700"><span className="font-medium">Shape: </span>{selectedSession.shape}</p>}
                {selectedSession.color && <p className="text-sm text-gray-700"><span className="font-medium">Color: </span>{selectedSession.color}</p>}
                {selectedSession.size && <p className="text-sm text-gray-700"><span className="font-medium">Size: </span>{selectedSession.size}</p>}
                {selectedSession.texture && <p className="text-sm text-gray-700"><span className="font-medium">Texture: </span>{selectedSession.texture}</p>}
              </div>
            )}

            {selectedSession.emotions && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Emotions</p>
                <p className="text-sm text-gray-700">{selectedSession.emotions}</p>
              </div>
            )}

            {selectedSession.ages && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Age</p>
                <p className="text-sm text-gray-700">{selectedSession.ages}</p>
                {selectedSession.activation_age && <p className="text-sm text-gray-700"><span className="font-medium">Activation age: </span>{selectedSession.activation_age}</p>}
              </div>
            )}

            {selectedSession.who_involved && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Who Was Involved</p>
                <p className="text-sm text-gray-700">{selectedSession.who_involved}</p>
              </div>
            )}

            {selectedSession.what_happened && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">What Happened</p>
                <p className="text-sm text-gray-700">{selectedSession.what_happened}</p>
              </div>
            )}

            {selectedSession.core_beliefs && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Core Beliefs</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.core_beliefs.split(",").map((b) => (
                    <span key={b} className="rounded-full bg-white border border-emerald-200 px-3 py-1 text-sm text-gray-700">{b.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.patterns && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Patterns</p>
                {selectedSession.patterns.split(",").map((p) => (
                  <p key={p} className="text-sm text-gray-700">• {p.trim()}</p>
                ))}
              </div>
            )}

            {selectedSession.unmet_need && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">What Your Body Needed</p>
                {selectedSession.unmet_need.split(",").map((n) => (
                  <p key={n} className="text-sm text-gray-700">• {n.trim()}</p>
                ))}
              </div>
            )}

            {selectedSession.own_words && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">In Your Own Words</p>
                <p className="text-sm text-gray-600 italic">"{selectedSession.own_words}"</p>
              </div>
            )}

            {/* Nighttime script section */}
            <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-800">🌙 Nighttime Integration Script</p>
              <p className="text-xs text-gray-500">Read this tonight as you are drifting off to sleep. Your subconscious is most open right before sleep — this is when new beliefs install most deeply.</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStandardOpen(!standardOpen)}
                  className={`rounded-2xl border p-3 text-left transition space-y-1 ${standardOpen ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white hover:border-emerald-400"}`}
                >
                  <p className="text-base">🌿</p>
                  <p className="font-semibold text-sm">Standard</p>
                  <p className={`text-xs leading-5 ${standardOpen ? "text-emerald-100" : "text-slate-500"}`}>Grounded in the body</p>
                </button>
                <button
                  onClick={() => setBiblicalOpen(!biblicalOpen)}
                  className={`rounded-2xl border p-3 text-left transition space-y-1 ${biblicalOpen ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white hover:border-emerald-400"}`}
                >
                  <p className="text-base">✝️</p>
                  <p className="font-semibold text-sm">Biblical</p>
                  <p className={`text-xs leading-5 ${biblicalOpen ? "text-emerald-100" : "text-slate-500"}`}>Woven with faith</p>
                </button>
              </div>
            </div>

            {/* Standard script */}
            {standardOpen && (
              <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5 space-y-5 text-sm leading-7 text-slate-700">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Begin here</p>
                  <p>I find a comfortable position. I let my hands rest somewhere soft. I take one slow breath and simply notice that I am here.</p>
                  <p>Something in me did important work. I am ready to let it settle.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Settle my body</p>
                  <p>I breathe in slowly for 4 counts. I hold gently for 4. I breathe out for 6.</p>
                  <p>I do this three times. With each exhale, I let my body know — the danger is not here tonight. I am safe right now.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Acknowledge what was</p>
                  <p>Around {ageText}, something happened that involved {whoText}. My body felt {emotionText}. And from that, it formed a belief that made complete sense at the time.</p>
                  <p>That belief kept me going. It protected me. It was not wrong — it was the only thing that made sense then.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">To the younger part of me</p>
                  <div className="border-l-2 border-rose-300 pl-4 space-y-2 italic text-slate-600">
                    <p>I see you. I see how hard that was.</p>
                    <p>You were so young, and what you carried was so large.</p>
                    <p>You survived something hard. And you have been carrying it ever since.</p>
                    <p>I am here now. And I am telling you — you are okay.</p>
                  </div>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">The truth my nervous system is ready to hear</p>
                  <p>The beliefs I formed then lived in my body because no one came to correct them. Tonight, I correct them. Gently. Slowly.</p>
                  <div className="space-y-2">
                    {nightlyBeliefs.map((belief) => (
                      <div key={belief} className="border-l-2 border-emerald-400 pl-4 italic text-slate-600">
                        <p>{belief}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">A letter to my body</p>
                  <p>Dear body — you have been on high alert for a long time. Tonight, I give you permission to rest. You do not have to keep watch tonight.</p>
                  <p>{bodyPlacementText}</p>
                  <p>You can soften now. You are allowed.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">As I drift toward sleep</p>
                  <p>I place my hand on my heart. I feel it beating — steady, faithful, mine.</p>
                  <p>I am allowed to sleep. I am allowed to let tonight be easy. I am allowed to wake up tomorrow and still be okay.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-slate-400">I carry these into sleep</p>
                  {nightlyBeliefs.map((belief) => (
                    <p key={belief} className="text-base font-medium text-slate-800">{belief}</p>
                  ))}
                  <p className="text-slate-500 text-sm">Goodnight. 🌙</p>
                </div>
              </div>
            )}

            {/* Biblical script */}
            {biblicalOpen && (
              <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5 space-y-5 text-sm leading-7 text-slate-700">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Begin here</p>
                  <p>I find a comfortable position. I take one slow breath and simply notice that I am here — and that He is here too.</p>
                  <p>Something in me did important work. I bring it to God now and I am ready to let it settle in His presence.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Settle my body</p>
                  <p>I breathe in slowly for 4 counts. I hold gently for 4. I breathe out for 6.</p>
                  <p>With each exhale, I release this to Him. I am safe in His hands right now.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">Acknowledge what was</p>
                  <p>Around {ageText}, something happened that involved {whoText}. My body felt {emotionText}. And from that, it formed a belief that made complete sense at the time.</p>
                  <p>God saw what happened. He saw what I carried. He has never looked away.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">To the younger part of me</p>
                  <div className="border-l-2 border-rose-300 pl-4 space-y-2 italic text-slate-600">
                    <p>I see you. God sees you too — He has always seen you.</p>
                    <p>You were never meant to carry it alone.</p>
                    <p>You survived something hard. But tonight, you can put it down.</p>
                    <p>God says you are okay. You are loved. You always were.</p>
                  </div>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">The truth He says about me</p>
                  <p>Tonight, God's truth corrects what I believed. Gently. Slowly.</p>
                  <div className="space-y-2">
                    {nightlyBeliefsBiblical.map((belief) => (
                      <div key={belief} className="border-l-2 border-emerald-400 pl-4 italic text-slate-600">
                        <p>{belief}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">A prayer for my body</p>
                  <p>God — tonight I invite You in. I give You this body, this tension, this holding. I trust You with what I have been carrying.</p>
                  <p>{bodyPlacementText}</p>
                  <p>God is here. I can soften now. I am held.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-slate-400">As I drift toward sleep</p>
                  <p>I place my hand on my heart. I feel it beating — steady, faithful, created by Him.</p>
                  <p>I am held tonight. I will wake up tomorrow in His hands, and I will still be okay.</p>
                </div>
                <hr className="border-slate-200" />
                <div className="space-y-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-slate-400">I carry these into sleep</p>
                  {nightlyBeliefsBiblical.map((belief) => (
                    <p key={belief} className="text-base font-medium text-slate-800">{belief}</p>
                  ))}
                  <p className="text-slate-500 text-sm">Goodnight. He is with you. 🌙</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedSession(null)}
              className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Dashboard</h1>

        <div className="space-y-4">
          <button onClick={() => router.push("/start-session")} className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition">
            Start Session
          </button>
          <button onClick={() => router.push("/session-entry")} className="w-full bg-white border border-gray-300 py-3 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-100 transition">
            Session Entry
          </button>
        </div>

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
                <button
                  key={session.id}
                  onClick={() => openSession(session)}
                  className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-2 text-left hover:border-emerald-400 transition"
                >
                  <p className="text-xs text-gray-400">
                    {new Date(session.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  {session.emotions && <p className="text-sm text-gray-700"><span className="font-medium">Emotions: </span>{session.emotions}</p>}
                  {session.core_beliefs && <p className="text-sm text-gray-700"><span className="font-medium">Core beliefs: </span>{session.core_beliefs}</p>}
                  {session.ages && <p className="text-sm text-gray-700"><span className="font-medium">Age: </span>{session.ages}</p>}
                  {session.symptoms && <p className="text-sm text-gray-700"><span className="font-medium">Symptoms: </span>{session.symptoms}</p>}
                  <p className="text-xs text-emerald-600 font-medium pt-1">Tap to view full session →</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => router.push("/")} className="w-full text-sm text-gray-500 mt-4 underline">
          Back to Home
        </button>
      </div>
    </div>
  );
}