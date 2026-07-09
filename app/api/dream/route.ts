import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { dream } = await req.json();

    if (!dream?.trim()) {
      return NextResponse.json({ error: "No dream provided" }, { status: 400 });
    }

    const prompt = `You are a nervous system healing guide trained in somatic therapy, trauma-informed care, and the Release Core Method. Your role is to interpret dreams through the lens of nervous system healing — identifying what the body and subconscious mind may be processing, releasing, or rewiring.

Dream(s) to interpret:
${dream}

Please provide a warm, grounded interpretation that:
1. Identifies what nervous system patterns or protective strategies may be appearing in the dream
2. Notices what the dreamer does differently from old patterns — signs of healing
3. Connects the dream imagery to possible limiting beliefs being released or rewired
4. Recognizes what the subconscious may be practicing or rehearsing
5. Reflects back the healing that appears to be happening
6. If multiple dreams are shared, find the connecting theme between them
7. Ends with a gentle affirming insight about what this means for their healing journey

Write in a warm, personal, non-clinical tone — like a trusted guide who deeply understands nervous system healing. Write in flowing paragraphs, not bullet points. You may use bullet points only when listing specific dream moments or contrasting old vs new patterns for clarity. Keep it grounded in somatic and nervous system language, not generic dream symbolism.`;

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
