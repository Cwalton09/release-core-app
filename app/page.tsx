import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell title="Release Core">
      <div className="space-y-8">

        {/* Hero */}
        <section className="text-center space-y-5 py-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700">
            A body-led nervous system method
          </p>

          <h1 className="text-4xl font-semibold text-slate-900 leading-tight">
            Your body may be protecting you from something
            <span className="text-emerald-700">
              {" "}
              your conscious mind no longer sees as a threat.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base leading-7 text-slate-600">
            Release Core helps you explore the subconscious beliefs,
            emotional patterns, and protective responses that may be keeping
            your nervous system stuck in old survival patterns.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium hover:bg-emerald-800 transition text-center"
            >
              Start Release Core
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-800 hover:bg-slate-50 transition text-center"
            >
              Log In
            </Link>
          </div>
        </section>

        {/* Core Question */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 shadow-sm text-center space-y-4">
          <p className="text-sm uppercase tracking-wider font-medium text-emerald-800">
            The question changes
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">
            Instead of asking,
            <br />
            “What is wrong with me?”
          </h2>

          <p className="text-xl font-medium text-emerald-800">
            We ask: “What is my body trying to protect me from?”
          </p>
        </section>

        {/* Recognition */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <p className="text-sm font-medium text-emerald-700 mb-2">
              YOU MAY RECOGNIZE YOURSELF HERE
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">
              Protection does not always look like fear.
            </h2>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            Sometimes the nervous system protects us through patterns that feel
            like personality traits, habits, emotional reactions, or ways of
            coping.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <p>• Overthinking everything</p>
            <p>• Shutting down during conflict</p>
            <p>• People pleasing</p>
            <p>• Feeling responsible for everyone</p>
            <p>• Perfectionism</p>
            <p>• Fear of being seen or judged</p>
            <p>• Difficulty resting without guilt</p>
            <p>• Needing reassurance</p>
            <p>• Feeling like you must stay in control</p>
            <p>• Preparing for something to go wrong</p>
            <p>• Feeling unsafe receiving support</p>
            <p>• Repeating the same patterns</p>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            Stress and nervous-system activation can also influence sleep,
            digestion, muscle tension, headaches, appetite, energy, and how
            strongly physical discomfort is experienced.
          </p>
        </section>

        {/* What Makes Release Core Different */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="text-2xl font-semibold text-slate-900">
            What makes Release Core different?
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            We do not begin by deciding what your problem means.
          </p>

          <p className="text-lg font-semibold text-emerald-700">
            We let your body lead.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Using body-led yes/no testing, we narrow down the pattern
            underneath the reaction and explore what your nervous system may
            still associate with danger, rejection, loss, pressure, or lack of
            safety.
          </p>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <div className="space-y-3 text-center text-sm font-medium text-slate-800">
              <p>Current Trigger</p>
              <p className="text-emerald-700">↓</p>
              <p>Protective Response</p>
              <p className="text-emerald-700">↓</p>
              <p>Underlying Belief</p>
              <p className="text-emerald-700">↓</p>
              <p>Earlier Experience</p>
              <p className="text-emerald-700">↓</p>
              <p>Updated Belief + Present-Day Safety</p>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            You may consciously know, “I am safe now,” while another part of
            your nervous system is still operating from an old belief such as:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm italic text-slate-700">
            <p>“I have to stay prepared.”</p>
            <p>“I cannot depend on anyone.”</p>
            <p>“Being noticed is dangerous.”</p>
            <p>“My needs are a burden.”</p>
            <p>“I have to earn love.”</p>
            <p>“Rest is not safe.”</p>
          </div>
        </section>

        {/* Pattern Examples */}
        <section className="space-y-5">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
              LOOKING UNDER THE SURFACE
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">
              What can be underneath the surface?
            </h2>

            <p className="text-sm leading-7 text-slate-600 max-w-2xl mx-auto">
              The issue you notice today may be only the surface layer. Release
              Core is designed to explore the meaning your nervous system may
              have attached to that pattern.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Overwhelm + Exhaustion
              </p>

              <p className="text-sm leading-7 text-slate-700">
                A pattern of constantly pushing through may connect to beliefs
                like “I have to carry everything,” “my needs come last,” or
                “stopping is not an option.”
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Rejection + Self-Worth
              </p>

              <p className="text-sm leading-7 text-slate-700">
                A present-day rejection trigger may connect to deeper beliefs
                such as “I am not enough,” “I am unlikeable,” or “other
                people’s opinions determine my worth.”
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Fear of Being Seen
              </p>

              <p className="text-sm leading-7 text-slate-700">
                Someone may consciously want confidence while their nervous
                system still associates attention, visibility, or being noticed
                with judgment or danger.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
              REAL EXPERIENCES
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">
              What people are saying about Release Core
            </h2>

            <p className="text-sm leading-7 text-slate-600 max-w-2xl mx-auto">
              Every person and every session is different, but these are some
              of the experiences people have shared after using Release Core.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="text-emerald-700 text-xl">★★★★★</div>

              <p className="text-lg font-semibold leading-7 text-slate-900">
                “Release Core is incredible for getting to the very root for
                me.”
              </p>

              <p className="text-sm leading-7 text-slate-700">
                “Release Core is incredible for getting to the very root for me
                in ways journaling or anything else could never reveal.”
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="text-emerald-700 text-xl">★★★★★</div>

              <p className="text-lg font-semibold leading-7 text-slate-900">
                “I’m feeling good still!!”
              </p>

              <p className="text-sm leading-7 text-slate-700">
                “Thank you for checking in! I’m feeling good still!! No
                significant dreams or anything like that haha. To be honest, I
                know I have been dreaming, but I can’t remember them.”
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 shadow-sm space-y-5">
            <div className="text-emerald-700 text-xl">★★★★★</div>

            <p className="text-2xl font-semibold leading-tight text-slate-900">
              “My nervous system is calm, and it was out of control.”
            </p>

            <div className="space-y-4 text-sm leading-7 text-slate-700">
              <p>
                “I have been doing sessions with Chelsea and on my own for a
                while now. I just want to say to anyone sitting on the fence
                how amazing she is and how effective Release Core has been for
                me.
              </p>

              <p>
                My nervous system is calm, and it was out of control. I feel
                calm yet rock solid. No spiraling out of control, no panicking
                — just calm with a strength to get through whatever comes up
                in life.
              </p>

              <p>
                I have let go of so much and I’m really coming into myself
                again more and more. I feel so clear and alive.
              </p>

              <p>
                What I love is that there is no repeatedly reliving the trauma
                or telling the same painful story over and over. For me, it
                has been a simple process with so many benefits.
              </p>

              <p>
                One-on-one is amazing, but there is the website option also so
                I can continue doing the work on my own.
              </p>

              <p>
                Thank you so much, Chelsea. I am so grateful.” ❤️
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-7 shadow-sm space-y-5">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              ANOTHER RELEASE CORE EXPERIENCE
            </p>

            <p className="text-2xl font-semibold leading-tight text-white">
              “I am dumbfounded.”
            </p>

            <div className="space-y-4 text-sm leading-7 text-slate-300">
              <p>
                “I have done SEVERAL sessions with Chels, but this one TOPPED
                them all!!!
              </p>

              <p>
                I woke up SO sick with so many symptoms. As soon as Chels saw
                my post, she called me immediately and did a session with me.
                During the session, we discovered exactly what we both felt
                was contributing to what was going on.
              </p>

              <p>
                Within 10 minutes of the session, I was feeling way better,
                could actually function again, and even had my appetite back!!!
              </p>

              <p>
                THANK YOU, THANK YOU, THANK YOU!!!!! If you haven’t given this
                a try, please do yourself a favor, trust Chels, and do it!!!”
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-6 max-w-2xl mx-auto">
            Testimonials describe individual experiences and are not a
            guarantee of results.
          </p>
        </section>

        {/* How a Session Works */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700 mb-2">
              THE PROCESS
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">
              What happens during a Release Core session?
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-slate-700">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                1
              </span>

              <div>
                <p className="font-semibold text-slate-900">
                  Start with what is happening now
                </p>

                <p>
                  We begin with the trigger, emotion, pattern, physical
                  sensation, or area where you feel stuck.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                2
              </span>

              <div>
                <p className="font-semibold text-slate-900">
                  Let the body narrow it down
                </p>

                <p>
                  Using structured body-led yes/no questions, we explore what
                  your nervous system associates with the pattern.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                3
              </span>

              <div>
                <p className="font-semibold text-slate-900">
                  Find the belief underneath it
                </p>

                <p>
                  We identify the emotional meaning, belief, or earlier
                  experience that appears connected to the pattern.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                4
              </span>

              <div>
                <p className="font-semibold text-slate-900">
                  Create present-day safety
                </p>

                <p>
                  The goal is to help your system recognize what is different
                  now and practice new beliefs that reflect present-day
                  reality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                5
              </span>

              <div>
                <p className="font-semibold text-slate-900">
                  Continue integration afterward
                </p>

                <p>
                  Personalized reflection statements or nighttime scripts may
                  be created from the beliefs uncovered during your session to
                  help reinforce the new pattern.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm font-medium text-slate-900">
            No two sessions are exactly alike because the process follows your
            individual pattern rather than a predetermined interpretation.
          </p>
        </section>

        {/* Nighttime Scripts */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
            CONTINUING THE WORK
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">
            Personalized nighttime scripts
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            A key part of Release Core is helping you continue practicing the
            updated beliefs after your session.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            Personalized nighttime scripts can be created from the exact
            beliefs uncovered during your session. These statements are
            designed to reinforce safety, support, and present-day awareness
            while your body is in a relaxed state before sleep.
          </p>
        </section>

        {/* About Chelsea */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 shadow-sm space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
            MEET THE CREATOR
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">
            Hi, I’m Chelsea — creator of Release Core.
          </h2>

          <p className="text-sm leading-7 text-slate-700">
            Release Core developed through my own experience trying to
            understand why we can consciously know something is safe, logical,
            or no longer relevant while our bodies continue responding as
            though the old threat is still happening.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            I became fascinated by the connection between subconscious
            beliefs, nervous-system protection, emotional triggers, and the
            body. Over time, I developed a structured way of using body-led
            questioning to trace present-day patterns back to the belief
            underneath them.
          </p>

          <p className="text-sm leading-7 text-slate-700">
            That process became Release Core.
          </p>
        </section>

        {/* Begin Here */}
        <section className="rounded-3xl bg-slate-900 p-8 text-center space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            Ready to begin exploring your patterns differently?
          </h2>

          <p className="text-sm leading-7 text-slate-300 max-w-xl mx-auto">
            Create an account to begin using Release Core, or log in if you
            already have one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-500 transition text-center"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-600 px-6 py-3 text-white font-medium hover:bg-slate-800 transition text-center"
            >
              Log In
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center leading-6 max-w-2xl mx-auto">
          Release Core is intended for educational, wellness, and personal
          growth purposes and is not a substitute for medical or psychological
          treatment.
        </p>

      </div>
    </AppShell>
  );
}