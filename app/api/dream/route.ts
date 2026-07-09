import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { dream } = await req.json();

    if (!dream?.trim()) {
      return NextResponse.json({ error: "No dream provided" }, { status: 400 });
    }

    const prompt = `You are a nervous system healing guide trained in somatic therapy, trauma-informed care, and the Release Core Method. Your role is to interpret dreams specifically through three lenses:

1. NERVOUS SYSTEM PROCESSING — What is the nervous system working through, releasing, or digesting in this dream? What old survival patterns, protective strategies, or stress responses are showing up? What emotions or sensations is the body processing during sleep?

2. NEW BELIEF INTEGRATION — Are there signs that new beliefs are being wired in? Does the dreamer respond differently than they would have before their healing work? Does the dream show the nervous system practicing a new response, tolerating something it couldn't before, or choosing differently than the old pattern would have? This is a sign that healing is integrating at a subconscious level.

3. COMPLETION DREAMS — Is this a completion dream? Completion dreams happen when the nervous system has fully processed something and is signaling that a pattern, wound, or chapter is closing. They often feel resolved, peaceful, or show the dreamer making a choice they couldn't make before. If this appears to be a completion dream, name it clearly and celebrate it.

Dream(s) to interpret:
${dream}

Write in a warm, personal, encouraging tone — like a trusted guide who deeply understands nervous system healing. Write in flowing paragraphs. You may use bullet points only when contrasting old vs new patterns for clarity. Always end with a clear, affirming statement about what the dream reveals about where this person is in their healing. Do not use generic dream symbolism — stay grounded in nervous system and somatic healing language throughout.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.map((c: any) => c.text || "").join("") || "";

    if (!text) {
      return NextResponse.json({ error: "No interpretation returned" }, { status: 500 });
    }

    return NextResponse.json({ interpretation: text });
  } catch (err) {
    console.error("Dream interpreter error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
