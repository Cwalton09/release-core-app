"use client";
import AppShell from "@/components/AppShell";

export default function FAQPage() {
  return (
    <AppShell title="Frequently Asked Questions">
      <div className="space-y-6">

        <p className="text-sm leading-7 text-slate-600">
          Everything you need to know about working with the Release Core Method.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            How many sessions can I do in a day?
          </h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              It depends on your body. Most of the time, one to two sessions per day is ideal.
            </p>
            <p>
              With the Release Core Method, we always allow the body to lead. Before continuing, we check in to make sure your nervous system is ready to process more.
            </p>
            <p>
              If you push too much too quickly, it can overwhelm your nervous system. When that happens, the body may shut down communication, making it harder to get clear responses. Slower, intentional work tends to create deeper and more lasting shifts.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            Can I do sessions back to back?
          </h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              Possibly, but again, it depends on what your body can handle.
            </p>
            <p>
              We always ask your body before continuing to make sure it is safe to process another layer.
            </p>
            <p>
              A good guideline is to pay attention to what is happening after a session. If you are still having vivid dreams that reflect what you just released, your body is likely still processing. In that case, it is best to give it a day or so before doing another session.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            How can I tell if it is working?
          </h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              Everyone's body responds differently, but most people begin to notice subtle shifts in how they show up in everyday life.
            </p>
            <p>
              Things that used to feel triggering may feel less intense, reactions may feel less automatic, and you may find yourself responding with more awareness instead of reacting out of old patterns.
            </p>
            <p>
              You might also notice changes in your thoughts, your emotional responses, your energy, or even your dreams as your body processes and integrates what was uncovered.
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">From personal experience</p>
              <p>
                I noticed I no longer felt constant tension in my body. The heaviness I used to carry was not there anymore, and I was not reacting to things the way I used to. I felt lighter, calmer, and more like myself. I also experienced clearer thinking, more natural energy, and a stronger desire to be active and present in my day, instead of feeling overwhelmed by it.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            What does processing look like after a session?
          </h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p>
              Processing can look different for everyone, but it is your body continuing to integrate what was uncovered during the session.
            </p>
            <p>
              For some people, this may look like vivid dreams, emotional releases, or memories resurfacing. For others, it may feel more subtle — like feeling tired, more relaxed, or noticing small shifts in how they think or respond to things.
            </p>
            <p>
              You may also notice your body moving things out physically, needing more rest, or craving more quiet time. Sometimes there is a sense of lightness, and other times it can feel like things are still being worked through beneath the surface.
            </p>
            <p>
              All of this is your body doing what it needs to do at its own pace. Giving yourself space, staying hydrated, and allowing your body to guide you can support this process.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-900">Important Note</h2>
          <p className="text-sm leading-7 text-slate-700">
            The Release Core Method is designed to support nervous system awareness and emotional processing. It is not medical advice, diagnosis, or treatment. Everyone's experience is unique, and results will vary.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm space-y-3 text-center">
          <p className="text-base font-semibold text-slate-900">Still have questions?</p>
          <p className="text-sm leading-7 text-slate-700">
            Join us on our Facebook page <span className="font-medium">Release Core Method</span> to ask questions, connect with others, and share your experience.
          </p>
          
            href="https://www.facebook.com/groups/952719290453784"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-white font-medium hover:bg-emerald-800 transition"
          >
            Join the Facebook Group
          </a>
        </div>

      </div>
    </AppShell>
  );
}