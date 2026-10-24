"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DAY_CODES, DAY_NAMES, describeSchedule, formatTime } from "@/lib/sessionSchedule";

const TIMES = Array.from({ length: 34 }, (_, i) => {
  const minutes = 6 * 60 + i * 30; // 6:00 AM to 10:30 PM
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

const pad = (n: number) => String(n).padStart(2, "0");
const stamp = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

// The next date that falls on one of the chosen days, at the chosen time (local clock).
function firstOccurrence(days: string[], time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  for (let i = 0; i < 8; i++) {
    if (days.includes(DAY_CODES[d.getDay()]) && d.getTime() > Date.now()) return d;
    d.setDate(d.getDate() + 1);
  }
  return d;
}

const SUMMARY = "Release Core session";
const DETAILS = "Your time to check in with your body. Start here: https://release-core.com/dashboard";

function downloadIcs(days: string[], time: string, tz: string) {
  const start = firstOccurrence(days, time);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Release Core//Session schedule//EN",
    "BEGIN:VEVENT",
    `UID:release-core-session-${Date.now()}@release-core.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "")}`,
    `DTSTART;TZID=${tz}:${stamp(start)}`,
    `DTEND;TZID=${tz}:${stamp(end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${days.join(",")}`,
    `SUMMARY:${SUMMARY}`,
    `DESCRIPTION:${DETAILS}`,
    "URL:https://release-core.com/dashboard",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Your Release Core session starts in 15 minutes",
    "TRIGGER:-PT15M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  link.download = "release-core-sessions.ics";
  link.click();
}

function googleCalendarUrl(days: string[], time: string, tz: string) {
  const start = firstOccurrence(days, time);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", SUMMARY);
  url.searchParams.set("details", DETAILS);
  url.searchParams.set("dates", `${stamp(start)}/${stamp(end)}`);
  url.searchParams.set("ctz", tz);
  url.searchParams.set("recur", `RRULE:FREQ=WEEKLY;BYDAY=${days.join(",")}`);
  return url.toString();
}

// Lets a member set a standing session time, like an appointment with Chelsea:
// saved to their profile for reminder emails, and addable to their own calendar.
export default function SessionSchedule({ userId }: { userId: string }) {
  const [days, setDays] = useState<string[]>([]);
  const [time, setTime] = useState("19:00");
  const [reminders, setReminders] = useState(true);
  const [saved, setSaved] = useState<{ days: string[]; time: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago";

  useEffect(() => {
    supabase
      .from("profiles")
      .select("session_days, session_time, session_reminders")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!data?.session_days) return;
        const list = data.session_days.split(",").filter(Boolean);
        setDays(list);
        setTime(data.session_time ?? "19:00");
        setReminders(data.session_reminders ?? true);
        setSaved({ days: list, time: data.session_time ?? "19:00" });
      });
  }, [userId]);

  const toggle = (code: string) =>
    setDays((d) => (d.includes(code) ? d.filter((x) => x !== code) : DAY_CODES.filter((c) => c === code || d.includes(c))));

  async function save() {
    if (days.length === 0) {
      setMessage("Pick at least one day.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { error } = await supabase
      .from("profiles")
      .update({ session_days: days.join(","), session_time: time, session_tz: tz, session_reminders: reminders })
      .eq("user_id", userId);
    setBusy(false);
    if (error) {
      console.error("Saving session schedule failed:", error);
      setMessage("Your schedule didn't save. You can still add it to your calendar below.");
    }
    setSaved({ days, time });
    setEditing(false);
  }

  const showForm = !saved || editing;

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">Your session time</h2>
        <p className="text-sm leading-6 text-gray-600">
          Treat it like an appointment with Chelsea. Pick your days and time, and show up for yourself.
        </p>
      </div>

      {showForm ? (
        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-700">Which days?</legend>
            <div className="flex flex-wrap gap-2">
              {DAY_CODES.map((code, i) => (
                <button
                  key={code}
                  id={`session-day-${code}`}
                  type="button"
                  onClick={() => toggle(code)}
                  aria-pressed={days.includes(code)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    days.includes(code)
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {DAY_NAMES[i].slice(0, 3)}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block space-y-2 text-sm font-medium text-gray-700" htmlFor="session-time">
            <span>What time?</span>
            <select
              id="session-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base"
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>{formatTime(t)}</option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-3 text-sm text-gray-700" htmlFor="session-reminders">
            <input
              id="session-reminders"
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-700"
            />
            <span>Email me a reminder the morning of each session</span>
          </label>
          <button
            onClick={save}
            disabled={busy}
            className="w-full rounded-xl bg-emerald-700 py-3 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {busy ? "Saving..." : "Save my session time"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="rounded-xl bg-white px-4 py-3 text-base font-medium text-gray-800">
            {describeSchedule(saved.days, saved.time)}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => downloadIcs(saved.days, saved.time, tz)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:border-emerald-400"
            >
              Add to my calendar
            </button>
            <a
              href={googleCalendarUrl(saved.days, saved.time, tz)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-800 transition hover:border-emerald-400"
            >
              Add to Google Calendar
            </a>
          </div>
          <p className="text-xs leading-5 text-gray-500">
            Adding it to your calendar gives you a phone alert 15 minutes before.
            {reminders && " You'll also get an email the morning of each session."}
          </p>
          <button onClick={() => setEditing(true)} className="text-sm font-medium text-emerald-700 underline underline-offset-4">
            Change my session time
          </button>
        </div>
      )}
      {message && <p className="text-sm text-red-600">{message}</p>}
    </section>
  );
}
