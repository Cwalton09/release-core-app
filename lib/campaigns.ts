import type { SeriesEmail } from "./emailSeries/types";

// One-time emails sent from /admin/campaigns. Wording approved by Chelsea on
// Oct 24, 2026 (drafts in marketing/). {{name}} is the first name.
export const CAMPAIGNS = {
  members: {
    label: "Current members: book your session time",
    email: {
      day: 0,
      subject: "Book your next session with me",
      preview: "Pick your days and time, and I'll remind you.",
      blocks: [
        "Hi {{name}},",
        "Can I tell you what I hear most from members?",
        "&ldquo;I know I should do a session, I just keep forgetting.&rdquo;",
        "That makes total sense. When you book a session with me, you show up because it's on the calendar and someone is expecting you. When it's on your own, life gets busy and it slides. Not because you don't want it. Because nobody scheduled it.",
        "So I made it so you can book your session with me, just like an appointment:",
        "1. Go to your dashboard: <a href=\"https://release-core.com/dashboard\">release-core.com/dashboard</a>",
        "2. Under <strong>Your session time</strong>, pick your days and the time you want",
        "3. Tap <strong>Add to my calendar</strong> so your phone reminds you 15 minutes before",
        "On your session days, I'll also send you a short reminder that morning.",
        "You don't need hours. One session a week is enough to keep finding the rules your body is still running and rewiring them. Most people are surprised how much shifts in a single one.",
        { button: ["Book my session time", "https://release-core.com/dashboard"] },
        "And if something is getting in the way, like you're not sure what to work on or a session felt stuck, just hit reply. I read every one.",
        "Proud of you for being here,",
        "Chelsea",
      ],
    } satisfies SeriesEmail,
  },
  canceled: {
    label: "Canceled members: why did you leave?",
    email: {
      day: 0,
      subject: "Can I ask you something?",
      preview: "One sentence back would really help me.",
      blocks: [
        "Hi {{name}},",
        "You were part of Release Core this year, and I wanted to reach out to you personally.",
        "I'm working hard on making Release Core better, and I'd really love to know: what made you decide to cancel?",
        "Just hit reply. Even one sentence helps. Was it time, money, not knowing what to work on, sessions not feeling like they worked, or something else? There's no wrong answer, and I read every reply myself.",
        "One thing I keep hearing is that it's easy to let sessions slide when nobody is expecting you. So I just added a way to set your own session time, like an appointment with me. It goes on your calendar, and you get a reminder from me that morning.",
        "If you ever want to come back, your account is still there. Membership is now $25 a month, and you can restart anytime by logging in at <a href=\"https://release-core.com/login\">release-core.com/login</a>.",
        "Either way, thank you for trusting me with part of your healing. It meant a lot.",
        "Chelsea",
      ],
    } satisfies SeriesEmail,
  },
} as const;

export type CampaignId = keyof typeof CAMPAIGNS;
