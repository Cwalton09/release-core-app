// Shared by the dashboard schedule card and the reminder email cron.
// Days use iCalendar codes (SU..SA) so they drop straight into a calendar RRULE.
export const DAY_CODES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// "19:00" -> "7:00 PM"
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

// ["TU","TH"], "19:00" -> "Tuesdays and Thursdays at 7:00 PM"
export function describeSchedule(days: string[], time: string) {
  const names = DAY_CODES.filter((c) => days.includes(c)).map((c) => `${DAY_NAMES[DAY_CODES.indexOf(c)]}s`);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0] ?? "";
  return `${list} at ${formatTime(time)}`;
}
