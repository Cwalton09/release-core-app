import Link from "next/link";
import Image from "next/image";
import AppShell from "@/components/AppShell";

export default function Home() {
  return (
    <AppShell title="Release Core">
      <div className="space-y-8">

        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="mx-auto max-w-3xl space-y-5">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              What if your body is reacting to something your mind already knows is over?
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
                believes, what it is responding to, and what pattern it may
                still be running.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials moved up */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              What people are saying after using Release Core
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold leading-7 text-slate-900">
                  “My nervous system is calm, and it was out of control.”
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold leading-7 text-slate-900">
                  “Release Core is incredible for getting to the very root for me in ways journaling or anything else could never reveal.”
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-semibold leading-7 text-slate-900">
                  “Within 10 minutes of the session, I was feeling way better and could actually function again.”
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="mb-3 text-xl font-semibold text-slate-900">
                “I feel calm yet rock solid.”
              </p>

              <div className="space-y-4 text-sm leading-7 text-slate-700">
                <p>
                  “I have been doing sessions with Chelsea and on my own for a while now.
                  I just want to say to anyone sitting on the fence how amazing she is
                  and how effective Release Core has been for me.
                </p>

                <p>
                  My nervous system is calm, and it was out of control. I feel calm yet
                  rock solid. No spiraling out of control, no panicking, just calm with
                  a strength to get through whatever comes up in life.
                </p>

                <p>
                  I have let go of so much and I’m really coming into myself again more
                  and more. I feel so clear and alive.
                </p>

                <p>
                  One-on-one is amazing, but there is the website option also so I can
                  continue doing the work on my own. Thank you so much, Chelsea. I am so
                  grateful.” ❤️
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="mb-3 text-xl font-semibold text-white">
                “I am dumbfounded.”
              </p>

              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  “I have done SEVERAL sessions with Chels, but this one TOPPED them all!!!
                </p>

                <p>
                  I woke up SO sick with so many symptoms. As soon as Chels saw my post,
                  she called me immediately and did a session with me.
                </p>

                <p>
                  Within 10 minutes of the session, I was feeling way better, could
                  actually function again, and even had my appetite back!!!
                </p>

                <p>
                  THANK YOU, THANK YOU, THANK YOU!!!!! If you haven’t given this a try,
                  please do yourself a favor, trust Chels, and do it!!!”
                </p>
              </div>
            </div>

            <p className="text-xs leading-6 text-slate-500">
              Testimonials are personal experiences shared by individual clients.
              Every person is different and these experiences are not a guarantee of
              results. Release Core is not a substitute for medical or psychological care.
            </p>
          </div>
        </section>

        {/* Broader explanation */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
          <div className="mx-auto max-w-3xl space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              Release Core is about way more than anxiety.
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-700 sm:text-base">
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

        {/* Nervous system chart */}
        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why I look at the nervous system
            </h2>

            <p className="text-sm leading-8 text-slate-700 sm:text-base">
              Your nervous system is involved in so much more than whether you
              feel calm or anxious. It constantly communicates with the rest of
              the body, which is why I think it is worth asking what it is doing
              alongside whatever else somebody is experiencing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-4 font-semibold text-slate-900">
                    What someone may be dealing with
                  </th>
                  <th className="px-4 py-4 font-semibold text-slate-900">
                    Where the nervous system may come into the picture
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
                    can explore whether the system still feels like danger is
                    happening now.
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
                    other patterns the nervous system may be carrying alongside
                    the physical side of fertility.
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
                    responsible for other people’s reactions.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 align-top font-medium text-slate-900">
                    Fatigue, burnout, brain fog, feeling depleted
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
                    Chronic illness, organ concerns, or overwhelmed body systems
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">
                    The autonomic nervous system helps regulate and communicate
                    with many body systems. Release Core does not replace
                    medical care, but it can explore whether chronic stress or
                    protective patterns are another layer worth working with.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            Release Core does not diagnose disease, remove toxins, treat mold
            exposure, or replace medical care. The purpose is to explore the
            nervous system and subconscious patterns that may be present
            alongside what someone is physically or emotionally experiencing.
          </p>
        </section>

        {/* Session explanation */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="mx-auto max-w-3xl space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              So what actually happens in a Release Core session?
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-700 sm:text-base">
              <p>
                You normally come to me with one thing you want to look at.
                Sometimes you know exactly what is bothering you. Sometimes
                you just know something feels off. Either one is fine.
              </p>

              <p>
                We start there and I begin asking your body yes-or-no questions.
                I am not sitting there deciding what your answer should be. I am
                narrowing it down based on how your body responds.
              </p>

              <p>
                Is the nervous system involved? Is there a protection pattern?
                What is the body trying to protect you from? Is this connected
                to something happening now, or something your system learned
                earlier?
              </p>

              <p>
                If the body takes us back to an earlier age, we find the age.
                Then you tell me what was happening around that time. That is
                where the session becomes really personal, because the next
                questions are built from what actually happened in your life,
                not from a generic list of meanings.
              </p>

              <p>
                From there, we keep narrowing it down until we can see the rule
                or loop the nervous system is still living in.
              </p>

              <p className="font-medium text-slate-900">
                That is usually the moment where somebody says, “Oh my gosh.
                That actually makes so much sense.”
              </p>

              <p>
                Once we see the pattern clearly, we stop digging and work on
                what is true now. You are not that age anymore. You have
                choices now. You have a voice now. You can set limits now. You
                can ask for support now. You can respond to what is actually
                happening today instead of living from an old rule your body
                created years ago.
              </p>
            </div>
          </div>
        </section>

        {/* Overwhelmed systems */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
          <div className="mx-auto max-w-3xl space-y-5">
            <h2 className="text-2xl font-semibold text-slate-900">
              Your nervous system does not have to be perfectly regulated before you can do this.
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-700 sm:text-base">
              <p>
                A lot of people I work with already feel like their body is
                completely maxed out. They are exhausted, sensitive to
                everything, wired and tired, overwhelmed, in pain, or feel like
                their body has been fighting for a very long time.
              </p>

              <p>
                I am not interested in forcing somebody like that into some huge
                emotional release just because we can.
              </p>

              <p>
                Sometimes the first thing the body needs is simply more safety.
                Maybe it needs to know it is allowed to rest. Maybe it needs to
                know its limits matter. Maybe it needs to know it can receive
                support. Maybe it needs to know everything does not have to be
                solved today.
              </p>

              <p className="font-medium text-slate-900">
                We work with what the body is ready for.
              </p>
            </div>
          </div>
        </section>

        {/* About Chelsea */}
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex justify-center">
              <Image
                src="/chelsea.jpeg"
                alt="Chelsea, creator of Release Core"
                width={170}
                height={170}
                className="rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>

            <div className="space-y-5">
              <h2 className="text-center text-2xl font-semibold text-slate-900">
                Hi, I’m Chelsea.
              </h2>

              <div className="space-y-4 text-sm leading-8 text-slate-700 sm:text-base">
                <p>
                  I created Release Core because I became completely fascinated
                  with figuring out why our bodies do what they do.
                </p>

                <p>
                  I am the person who wants to know what is underneath
                  something. I do not want to stop at, “You’re anxious,” or,
                  “You’re overwhelmed,” or, “That’s just a trigger.”
                </p>

                <p>
                  I want to know why.
                </p>

                <p>
                  What does your body think is happening? What is it trying to
                  protect you from? When did it learn that? What belief came
                  from it? Did that belief turn into a rule or loop? And does
                  your nervous system still need to live by it today?
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
                  And I still get excited every single time we find the thing underneath the thing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl bg-slate-900 p-8 sm:p-10">
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Curious what your body might be trying to tell you?
            </h2>

            <p className="text-sm leading-8 text-slate-300 sm:text-base">
              You do not have to know what the root belief is before you start.
              You do not have to know what age it started. You do not even have
              to completely understand why something is bothering you. We start
              with what is happening now and follow it from there.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-500"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-600 px-6 py-3 text-center font-medium text-white transition hover:bg-slate-800"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        {/* Main Disclaimer */}
        <p className="mx-auto max-w-3xl pb-4 text-center text-xs leading-6 text-slate-400">
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