import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const conversationText = messages
      .map((m: any) => `${m.role === "user" ? "CLIENT" : "GUIDE"}: ${m.content}`)
      .join("\n\n");

    const prompt = `You are reviewing a completed Release Core Guided Deep Session. Based on the full conversation below, generate a professional session summary in this exact format:

RELEASE CORE SESSION SUMMARY
[One line subtitle describing the session theme] — [Today's date]

Starting Point
[2-3 sentences describing what brought the person in — symptoms, trigger, dream, or situation]

Initial Pattern Identified
[2-3 sentences describing the first pattern that emerged]
Key belief: "[exact belief in quotes]"

What the Session Uncovered
[2-3 sentences of synthesis]
• [belief that fired]
• [belief that fired]
• [belief that fired]
[continue for all major beliefs that fired]

The Original Relationship Wound
[2-3 sentences connecting the pattern to its origin]
What the nervous system learned: "[exact learning in quotes]"

[Add relevant sections based on what came up in the session — Protection Became Linked to Love / Why Repair Did Not Feel Safe / The Agency Wound / etc. Only include sections that are relevant to this specific session]

Deepest Belief Reached
[1-2 sentences leading to the core belief]
"[core belief in quotes, bolded]"

Core Pattern in One Chain
[surface pattern] → [next layer] → [next layer] → [next layer] → "[deepest belief in quotes]"

Rewire Direction
[2-3 sentences describing the rewire focus]
• [new belief]
• [new belief]
• [new belief]
[continue for all new beliefs installed]

Physical Response During the Session
[If physical symptoms were mentioned, describe them and where they were felt. Always include this disclaimer: "The timing may indicate that emotional arousal affects tension or symptom intensity in already-sensitive areas, but it does not establish that the emotional experience originally caused these physical conditions. Physical symptoms can have independent medical or musculoskeletal causes and should continue to receive appropriate physical care."]

Closing Integration
[2-3 sentences describing the shift that happened and what the person is taking with them]

Closing belief:
"[final closing belief in quotes]"

Here is the session conversation:

${conversationText}

Generate the summary now. Use the exact format above. Write in third person. Keep it professional, warm, and precise. Only include sections that are relevant to what actually came up in this specific session.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const summary = data.content?.map((c: any) => c.text || "").join("") || "";

    if (!summary) {
      return NextResponse.json({ error: "No summary generated" }, { status: 500 });
    }

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Summary generation error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
