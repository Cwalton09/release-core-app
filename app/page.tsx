import Link from "next/link";
import Image from "next/image";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell title="Release Core">
      <div className="space-y-8">

        {/* Hero */}
        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-5">
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-slate-900">
              What if your body is reacting to something your mind already
              knows is over?
            </h1>

            <div className="space-y-4 text-base leading-8 text-slate-700">
              <p>
                That question is really what Release Core is built around.
                You can know you are safe. You can know you are loved. You can
                know you do not need to panic, overthink, shut down, stay on
                guard, or keep pushing yourself past your limits... and your
                body can still react like it has something to protect you from.
              </p>

              <p>
                Release Core is the method I created to help us figure out
                what that protection is actually about. Instead of me deciding
                what your issue means, we ask your body questions and follow
                the answers until we understand what your nervous system
                believes, what it is responding to, and whether that belief
                still needs to be running now.
              </p>

              <p className="font-medium text-slate-900">
                Most of the time, the thing we start with is not actually the
                deepest thing we end up finding.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-medium text-center hover:bg-emerald-800 transition"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-6 py-3 text-slate-800 font-medium text-center hover:bg-slate-50 transition"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        {/* Intro / What this can look like */}
        <section className="rounded-3xl bg-emerald-50 border border-emerald-200 p-7 sm:p-9">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              Release Core is about way more than anxiety.
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-8 text-slate-700">
              <p>
                Sometimes somebody comes to me because they are anxious,
                overwhelmed, angry, constantly overthinking, scared of
                rejection, struggling in a relationship, feeling stuck with
                money, afraid to be seen, unable to rest, or repeating the same
                pattern over and over.
              </p>

              <p>
                Other times, we are looking at what is happening physically.
                People bring things into sessions like gut issues, skin issues,
                fatigue, chronic tension, pain, sleep problems, hormone and
                fertility concerns, nutrient absorption concerns, mold and
                mycotoxin exposure, toxins, chronic illness, or situations
                where one part of the body just seems to be struggling.
              </p>

              <p>
                I am not looking at somebody with a physical issue and saying,
                “It is all your nervous system.” If mold is present, mold is
                present. If somebody has a medical condition, that matters. If
                there is a nutrient deficiency, infection, toxin exposure, or
                physical problem, that matters too.
              </p>

              <p className="font-medium text-slate-900">
                What I want to know is: is the nervous system involved too?
              </p>

              <p>
                Is the body still perceiving danger? Is it bracing? Is it
                constantly monitoring? Does it feel safe resting? Does it feel
                safe receiving nourishment or support? Does it believe it has
                to keep pushing? Does it believe slowing down is dangerous?
                Does it feel like it still has to protect you from something
                that happened years ago?
              </p>

              <p>
                That is the part we dig into with Release Core.
              </p>
            </div>
          </div>
        </section>

        {/* Body + nervous system chart */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why I look at the nervous system
            </h2>

            <p className="text-sm sm:text-base leading-8 text-slate-700">
              Your nervous system is involved in so much more than whether you
              feel calm or anxious. It constantly communicates with the rest of
              the body. That is why I think it is worth asking what the nervous
              system is doing alongside whatever else somebody is experiencing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-4 font-semibold text-slate-900">
                    What somebody may be dealing with
                  </th>
                  <th className="px-4 py-4 font-semibold text-slate-900">
                    Where the nervous system can come into the picture
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Anxiety, panic, overthinking, feeling on edge
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The nervous system is constantly assessing safety. If it
                    has learned to expect danger, rejection, conflict, or
                    unpredictability, the body can stay alert even when your
                    conscious mind knows you are okay.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Anger, shutdown, people pleasing, relationship triggers
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    These can sometimes be protection patterns. We may uncover
                    beliefs around being left, not being enough, being
                    misunderstood, keeping other people happy, or needing to
                    stay emotionally guarded.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Gut issues, digestion, appetite, nutrient concerns
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The gut and nervous system communicate constantly. Stress
                    physiology can affect appetite, motility, digestive
                    activity, elimination, and how settled or defended the body
                    feels while eating and digesting.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Mold, mycotoxins, toxins, chronic environmental stress
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    If the body has been dealing with something threatening for
                    a long time, the nervous system may stay highly protective
                    even as the physical side is being addressed. Release Core
                    can explore whether the system still feels like the danger
                    is happening now.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Fertility, hormones, cycle concerns
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    Stress signaling and reproductive physiology are connected.
                    In Release Core, we may explore things like safety, loss,
                    fear, disappointment, control, pressure, receiving, or
                    other patterns that somebody's nervous system may be
                    carrying alongside the physical side of fertility.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Skin issues and physical reactivity
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The nervous system communicates with immune and inflammatory
                    pathways. Sometimes we also uncover patterns around
                    visibility, pressure, boundaries, being noticed, or feeling
                    responsible for other people's reactions.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Fatigue, burnout, brain fog, feeling completely depleted
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    Sometimes we find a system that has spent years believing
                    it cannot stop, cannot rest, cannot disappoint anyone, or
                    has to carry everything. Other times the body may be trying
                    to slow somebody down because it does not feel like they
                    are allowed to choose rest themselves.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Pain, tension, tightness, chronic bracing
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The nervous system influences muscle guarding, tension, pain
                    sensitivity, and protective bracing. We can explore whether
                    the body still feels like it has to stay prepared or hold
                    itself a certain way to be safe.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Sleep issues and difficulty truly resting
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    Sometimes the body does not fully believe it is safe to let
                    go. We may find beliefs around needing to stay alert, being
                    responsible for everything, preparing for problems, or
                    feeling like rest has to be earned.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Chronic illness, organ concerns, or body systems that feel
                    overwhelmed
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The autonomic nervous system helps regulate and communicate
                    with many body systems. Release Core does not replace
                    medical care, but it can be used to explore whether
                    chronic stress or protective patterns are another layer
                    worth working with.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            Release Core does not diagnose disease, remove toxins, treat mold
            exposure, or replace medical care. The purpose of this work is to
            explore the nervous system and subconscious patterns that may be
            present alongside what someone is physically or emotionally
            experiencing.
          </p>
        </section>

        {/* How I actually run a session */}
        <section className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-9 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              So what actually happens in a Release Core session?
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-8 text-slate-700">
              <p>
                You normally come to me with one thing you want to look at.
                Sometimes you know exactly what is bothering you. Sometimes
                you just know that something feels off. Either one is fine.
              </p>

              <p>
                We start there and I begin asking your body yes-or-no
                questions. I am not sitting there trying to decide what your
                answer should be. I am narrowing it down based on how your body
                responds.
              </p>

              <p>
                Is the nervous system involved? Is there a protection pattern
                happening? What does the body believe it is protecting you
                from? Is this about rejection? Responsibility? Control?
                Abandonment? Being judged? Having needs? Being disappointed?
                Feeling unsupported? Not being enough? Not being safe enough to
                rest?
              </p>

              <p>
                Then we keep going.
              </p>

              <p>
                Sometimes we find an earlier age connected to the belief.
                Sometimes there is a specific experience. Sometimes the person
                remembers it immediately and sometimes they never would have
                connected that experience to what they are dealing with today.
              </p>

              <p>
                And we do not stop at the first answer just because it sounds
                good. I keep asking whether there is another layer underneath
                it. Does the body still believe this today? Is this the actual
                core belief? Is there something deeper? What does the nervous
                system think would happen if it stopped protecting you this
                way?
              </p>

              <p className="font-medium text-slate-900">
                That is usually when we get to the part where somebody says,
                "Oh my gosh. That actually makes so much sense."
              </p>

              <p>
                Once we understand what the body has been responding to, we
                work on what is true now. You are not five, ten, nineteen, or
                twenty-seven anymore. You have different choices, different
                resources, different relationships, and a different level of
                control over your life now.
              </p>

              <p>
                We start giving the nervous system a new message to practice
                instead of continuing to run the old one.
              </p>
            </div>
          </div>
        </section>

        {/* Compromised / overwhelmed nervous systems */}
        <section className="rounded-3xl bg-emerald-50 border border-emerald-200 p-7 sm:p-9">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              And no, your nervous system does not have to be "regulated"
              before you can do this.
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-8 text-slate-700">
              <p>
                A lot of people I work with already feel like their body is
                completely maxed out. They are exhausted. Sensitive to
                everything. Wired and tired. In pain. Overwhelmed. Their body
                feels like it has been fighting for a very long time.
              </p>

              <p>
                I am not interested in forcing somebody like that into some
                giant emotional release just because we can.
              </p>

              <p>
                Sometimes the first thing we need to work on is simply helping
                the nervous system feel a little safer having more capacity.
                Maybe the body needs to know it is allowed to rest. Maybe it
                needs to know it does not have to solve everything today.
                Maybe it does not believe its limits will be respected. Maybe
                it thinks symptoms are the only way it is allowed to stop.
              </p>

              <p>
                We work with what the body is ready for. Sometimes we go deep.
                Sometimes we build safety first.
              </p>

              <p className="font-medium text-slate-900">
                That is why I say the body leads the session.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-slate-900">
              A few things people have said after using Release Core
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-3">
              <p className="text-lg font-semibold text-slate-900">
                "Release Core is incredible for getting to the very root for
                me."
              </p>

              <p className="text-sm leading-7 text-slate-700">
                "Release Core is incredible for getting to the very root for me
                in ways journaling or anything else could never reveal."
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-3">
              <p className="text-lg font-semibold text-slate-900">
                "I'm feeling good still!!"
              </p>

              <p className="text-sm leading-7 text-slate-700">
                "Thank you for checking in! I'm feeling good still!! No
                significant dreams or anything like that haha. To be honest, I
                know I have been dreaming, but I can't remember them."
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-7 space-y-4">
            <p className="text-xl font-semibold text-slate-900">
              "My nervous system is calm, and it was out of control."
            </p>

            <div className="space-y-4 text-sm leading-7 text-slate-700">
              <p>
                "I have been doing sessions with Chelsea and on my own for a
                while now. I just want to say to anyone sitting on the fence
                how amazing she is and how effective Release Core has been for
                me.
              </p>

              <p>
                My nervous system is calm, and it was out of control. I feel
                calm yet rock solid. No spiraling out of control, no panicking,
                just calm with a strength to get through whatever comes up in
                life.
              </p>

              <p>
                I have let go of so much and I'm really coming into myself
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
                Thank you so much, Chelsea. I am so grateful." ❤️
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 sm:p-7 space-y-4">
            <p className="text-xl font-semibold text-white">
              "I am dumbfounded."
            </p>

            <div className="space-y-4 text-sm leading-7 text-slate-300">
              <p>
                "I have done SEVERAL sessions with Chels, but this one TOPPED
                them all!!!
              </p>

              <p>
                I woke up SO sick with so many symptoms. As soon as Chels saw
                my post, she called me immediately and did a session with me.
                During the session, we discovered exactly what we both felt was
                contributing to what was going on.
              </p>

              <p>
                Within 10 minutes of the session, I was feeling way better,
                could actually function again, and even had my appetite back!!!
              </p>

              <p>
                THANK YOU, THANK YOU, THANK YOU!!!!! If you haven't given this
                a try, please do yourself a favor, trust Chels, and do it!!!"
              </p>
            </div>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            Testimonials are personal experiences shared by individual clients.
            Every person is different and these experiences are not a guarantee
            of results. Release Core is not a substitute for medical or
            psychological care.
          </p>
        </section>

        {/* About Chelsea */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
          <div className="max-w-3xl mx-auto">

            <div className="flex justify-center mb-6">
              <Image
                src="/chelsea.jpeg"
                alt="Chelsea, creator of Release Core"
                width={170}
                height={170}
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-slate-900 text-center">
                Hi, I'm Chelsea.
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-8 text-slate-700">
                <p>
                  I created Release Core because I became completely fascinated
                  with figuring out why our bodies do what they do.
                </p>

                <p>
                  I am the person who wants to know what is underneath
                  something. I do not want to stop at, "You're anxious," or,
                  "You're overwhelmed," or, "That's just a trigger."
                </p>

                <p>
                  I want to know why.
                </p>

                <p>
                  What does your body think is happening? What is it trying to
                  protect you from? When did it learn that? What belief came
                  from it? Is there another belief underneath that one? And
                  does your body actually need to keep believing it today?
                </p>

                <p>
                  The more I started working this way, the more I watched
                  people uncover connections they never would have consciously
                  thought of on their own.
                </p>

                <p>
                  Eventually all of those questions turned into a process, and
                  that process became Release Core.
                </p>

                <p className="font-medium text-slate-900">
                  And I still get excited every single time we find the thing
                  underneath the thing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl bg-slate-900 p-8 sm:p-10">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Curious what your body might be trying to tell you?
            </h2>

            <p className="text-sm sm:text-base leading-8 text-slate-300">
              You do not have to know what the root belief is before you start.
              You do not have to know what age it started. You do not even have
              to completely understand why something is bothering you.
              We start with what is happening now and follow it from there.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
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
          </div>
        </section>

        {/* Main Disclaimer */}
        <p className="max-w-3xl mx-auto text-xs leading-6 text-center text-slate-400 pb-4">
          Release Core is intended for educational, wellness, and personal
          growth purposes. It is not medical or psychological treatment and
          does not diagnose, treat, cure, or prevent disease. Physical symptoms
          and health conditions can have many causes and should be evaluated by
          an appropriate healthcare professional when needed.
        </p>

      </div>
    </AppShell>
  );
}