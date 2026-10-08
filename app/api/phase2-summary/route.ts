import { NextRequest, NextResponse } from "next/server";
import { requirePaidMember } from "@/lib/requirePaidMember";

export async function POST(req: NextRequest) {
  const denied = await requirePaidMember(req);
  if (denied) return denied;

  try {
    const { messages } = await req.json();

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const conversationText = messages
      .filter(
        (m: any) =>
          m &&
          typeof m.content === "string" &&
          (m.role === "user" || m.role === "assistant")
      )
      .map(
        (m: any) =>
          `${m.role === "user" ? "CLIENT" : "GUIDE"}: ${m.content}`
      )
      .join("\n\n");

    const today = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

    const prompt = `
You are reviewing a completed Release Core Guided Deep Session.

Your job is to create a clear, accurate, personalized session summary based ONLY on what actually occurred in the conversation.

Release Core is body-led.

The person's YES/NO responses, typed answers, intensity ratings, body observations, and integration responses are the evidence for the session.

Do not invent:

- an age
- a person
- an event
- a trauma
- an emotion
- a belief
- a nervous-system rule
- a loop
- a protective purpose
- a medical cause
- a physical explanation
- a "deepest belief"
- an improvement that the person did not report
- a successful integration response that did not happen

A question being asked does NOT mean the statement tested YES.

A possibility suggested by the guide is NOT a finding unless the person's answers supported it.

A rewire statement is not automatically evidence that the person already fully believes it.

TODAY'S DATE:

${today}

==================================================
IMPORTANT MEDICAL BOUNDARY
==================================================

Release Core explores nervous-system patterns that may exist ALONGSIDE physical symptoms or health concerns.

Do not state that a belief, trauma, emotion, nervous-system pattern, or earlier experience caused:

disease

mold exposure

mycotoxins

infertility

infection

organ dysfunction

nutrient deficiency

toxin exposure

or another medical condition.

Do not say Release Core treated, cured, healed, removed, reversed, or detoxed a physical condition.

Body testing in this session is being used for personal reflection and nervous-system exploration, not medical diagnosis.

If physical symptoms were discussed, clearly distinguish between:

the physical issue itself

and

the nervous-system response surrounding the issue.

==================================================
SUMMARY FORMAT
==================================================

Use the following structure.

Only include optional sections when supported by the actual session.

RELEASE CORE SESSION SUMMARY

[One short line describing the central session theme] — ${today}

Starting Point

Write 2-4 natural sentences explaining what the person came in wanting to explore.

Include their starting nervous-system state when known.

If a starting 0-10 rating was given, include it.

If they identified a body sensation or location at the beginning, include it.

Example style:

"The session began with Chelsea exploring anxiety around being seen. She rated the activation at 7/10 and noticed it primarily in her chest and shoulders."

Do not invent a rating or physical sensation.

==================================================
INITIAL NERVOUS-SYSTEM FINDINGS
==================================================

Write 2-4 sentences describing the most important early YES/NO findings.

Include:

whether meaningful nervous-system involvement tested YES

whether the response appeared protective

the nervous-system state that was present

any meaningful NO answers that changed the direction of the session

Do not include every question asked.

Only include findings that mattered.

==================================================
PROTECTIVE PURPOSE
==================================================

ONLY include this section if the session actually identified a protective purpose.

Explain what the response appeared to be trying to accomplish.

Examples might include:

creating distance

maintaining control

staying prepared

forcing rest

avoiding rejection

preventing vulnerability

preventing overwhelm

conserving energy

protecting connection

or another function

Do not select a purpose unless the person's responses supported it.

Use wording such as:

"The session suggested..."

"The nervous-system response appeared to be serving..."

"The person's answers pointed toward..."

Do not present interpretation as medical or absolute fact.

==================================================
LEARNING HISTORY / EARLIER ORIGIN
==================================================

ONLY include this section if the session identified an earlier age, developmental period, repeated experience, or earlier learning history.

State the age or age range exactly as it came up.

Describe what the person said was happening at that time.

Do not embellish the story.

Do not add people, emotions, events, or meanings that were not stated or subsequently supported through testing.

If the pattern formed through repeated experiences rather than one single event, say that clearly.

Do not force the language of "trauma" or "wound" unless the person themselves used that framing and it is relevant.

==================================================
WHAT THE NERVOUS SYSTEM LEARNED
==================================================

ONLY include this section if the session identified a meaningful learned association, belief, expectation, or nervous-system rule.

Write 1-3 sentences explaining the learning.

Then include:

What the nervous system learned: "[exact or closely paraphrased learning]"

Use the person's language whenever possible.

Do not automatically call it a "core wound."

Do not force themes like abandonment, rejection, worth, attachment, or childhood if the session did not establish them.

==================================================
RULE / LOOP / PATTERN IDENTIFIED
==================================================

ONLY include this section if the session established a rule, loop, learned association, repeating pattern, or combination.

If it was primarily a RULE, include:

Rule: "[rule]"

If it was primarily a LOOP, show the sequence with arrows.

Example format:

trigger → meaning → body response → protective behavior → consequence → repeat

Build the sequence ONLY from what happened in the session.

Do not fill in missing pieces just to create a longer chain.

If it was a combination, describe that clearly.

==================================================
CORE PATTERN IN ONE CHAIN
==================================================

ONLY include this section if the session supports a useful concise chain.

Show the current issue connecting to the learned pattern.

Example style:

[current trigger] → [meaning] → [nervous-system response] → [protective response] → [rule]

Do not force a "deepest belief."

If the session reached a clear belief that genuinely explains the pattern, it may appear at the end.

If a rule or loop is sufficient, stop there.

==================================================
CONNECTION TO THE PRESENT
==================================================

Write 2-4 sentences explaining how the learning history, rule, loop, or protective response appears connected to what the person came in experiencing now.

Use careful language such as:

"appeared connected to"

"the session linked"

"the person's responses suggested"

"the nervous-system pattern seemed to activate when"

Do not make absolute causal claims.

==================================================
THE REWIRE
==================================================

This section is VERY IMPORTANT.

The Release Core rewire now uses FOUR connected elements:

1. positive declarative beliefs
2. personalized "Can you show me..." discovery questions
3. receiving / expectancy language
4. real-life evidence / attention prompts

Do NOT describe this as merely "affirmations."

Do NOT say beliefs were "installed."

Use language such as:

practicing

reinforcing

orienting toward

exploring

learning to recognize

building familiarity with

Write 2-4 sentences summarizing the overall direction of the rewire.

Then write:

New beliefs being practiced:

• [new positive belief]
• [new positive belief]
• [new positive belief]

Continue only for the major beliefs actually used.

Do not add beliefs that were not part of the actual rewire.

Then write:

Experiential questions used:

• "[important Can you show me... question]"
• "[important Can you show me... question]"
• "[important Can you show me... question]"

Include approximately 2-5 of the most meaningful questions actually used in the rewire.

Do not invent new questions.

Then write:

Receiving / expectancy direction:

Write 1-3 sentences describing how the rewire oriented the person toward receiving or recognizing new experiences.

Examples might include:

support being available

connection coming toward them

ease being available

rest being safe

opportunity being able to find them

love or belonging being available

safety becoming more accessible

Only mention what was actually present in the rewire.

If phrases such as "really wants me" were used, mention them only if they were meaningful to the session.

Then write:

Evidence / attention focus:

Write 1-3 sentences describing what the person was invited to begin noticing in real life.

Examples might include:

being valued without performing

rest occurring safely

support arriving

connection surviving honesty

uncertainty existing without catastrophe

visibility being safe

boundaries being respected

making choices without reassurance

Only use evidence themes from the actual session.

==================================================
PRESENT-DAY ORIENTATION
==================================================

ONLY include this section if an earlier age or developmental period was identified.

Include the present-day truths used in the rewire.

Examples may include:

"I am no longer 12 years old."

"I am here now."

"I have choices now."

"I have a voice now."

"I can ask for help now."

"I can set limits now."

"I can leave now."

"I can receive support now."

Only include statements actually used or clearly supported in the session.

Do not invent present-day circumstances.

==================================================
AFTER-REWIRE CHECK
==================================================

ONLY include this section if the session included an after-rewire 0-10 check or body check.

State:

the starting rating

the after-rewire rating

what physical sensation or body change the person reported

If the number decreased, simply describe the change.

Do not say the drop proves healing.

If the number stayed the same, increased, or felt different rather than lower, describe that objectively.

Example:

"The starting activation was 8/10 and was reported as 4/10 after the rewire. She also described less tightness in her chest."

or:

"The rating remained at 6/10, but the sensation shifted from sharp tension to a more diffuse feeling."

Do not interpret beyond what the person reported.

==================================================
FUTURE-TRIGGER REHEARSAL
==================================================

ONLY include this section if the session included rehearsal of a future or real-life trigger.

Describe:

what situation was imagined

what new response the person practiced

which new beliefs were brought into the scenario

what the body-testing responses showed

whether the new response felt available enough to practice

Do not say the trigger is fully resolved unless the person's responses clearly supported that.

Use language such as:

"The rehearsal suggested..."

"The person's responses indicated..."

"The new response appeared available enough to begin practicing..."

If part of the scenario still felt activating, include that accurately.

==================================================
ADDITIONAL INTEGRATION
==================================================

ONLY include this section if the future rehearsal uncovered one more unresolved integration piece and the guide did a short additional rewire.

Explain:

what remained difficult

what additional truth or support was added

whether the future rehearsal was repeated

Do not frame this as failure.

==================================================
COMPLETION CHECK
==================================================

Summarize the final body-testing completion check when it occurred.

Include whether:

the new belief felt available enough to practice

the person could imagine responding differently

they identified a real-life way to practice the new response

another major layer remained

If another major layer was identified for a future session, state that clearly.

Do not continue analyzing it in the summary.

==================================================
YOUR REAL-LIFE PRACTICE
==================================================

Include the exact personalized behavioral practice created in the session.

Keep it clear and practical.

Explain in 1-3 sentences how it gives the person a small opportunity to act from the new belief.

Do not make the practice more intense than what the session recommended.

==================================================
WHAT TO NOTICE THIS WEEK
==================================================

Summarize the evidence the person was invited to notice over the next several days.

Examples might include:

moments where they are valued without performing

rest being safe

support arriving

boundaries being respected

uncertainty resolving without excessive control

connection remaining present during honesty

being seen without danger

making choices independently

Use only the actual focus from the session.

==================================================
FOR THE NEXT 24 HOURS
==================================================

Include the personalized 24-hour integration instruction from the session.

Keep it concise.

Do not add extra homework.

==================================================
FOR THE NEXT 7 DAYS
==================================================

Include the personalized 7-day integration practice from the session.

Emphasize familiarity and repetition rather than perfection.

Do not imply that completing the practice guarantees healing.

==================================================
PHYSICAL RESPONSE DURING THE SESSION
==================================================

ONLY include this section if physical sensations, symptoms, body tension, or body changes were actually discussed.

Describe:

what the person reported

where they felt it

whether it changed during the session

when it changed, if that was clearly reported

Do not claim emotional work medically caused or cured a physical condition.

Always end this section with EXACTLY:

"The timing may indicate that emotional arousal affects tension or symptom intensity in already-sensitive areas, but it does not establish that the emotional experience originally caused these physical conditions. Physical symptoms can have independent medical or musculoskeletal causes and should continue to receive appropriate physical care."

==================================================
NIGHTTIME SCRIPT FOCUS
==================================================

Write 1-2 sentences summarizing what the nighttime script reinforced.

Mention:

the primary new beliefs

any important "Can you show me..." questions

present-day orientation when relevant

rest / receiving / safety language when relevant

Do not reproduce the entire nighttime script.

==================================================
CLOSING INTEGRATION
==================================================

Write 2-4 sentences summarizing where the session landed.

Focus on:

the pattern that became clear

what the person's nervous system appeared to have learned

the new direction being practiced

the future-trigger rehearsal

the real-life practice

what they are being invited to notice now

Do not exaggerate the outcome.

Do not say:

"the nervous system was completely rewired"

"the pattern is permanently gone"

"the issue is healed"

unless the person explicitly reported something specific, and even then describe their report rather than declaring a permanent result.

Then write:

Closing belief:
"[strongest positive belief or present-day truth from the actual rewire]"

Choose this from the actual session.

==================================================
STYLE
==================================================

Write in third person.

Keep the tone:

professional

warm

clear

specific

grounded

Do not sound clinical.

Do not overuse therapy language.

Do not dramatize the person's history.

Preserve the person's own language where useful.

Use the person's name only if the conversation clearly provides it.

Be especially careful to distinguish:

WHAT WAS ASKED

from

WHAT TESTED YES.

A body-testing statement appearing in the conversation is not automatically a finding.

A suggested rule is not automatically the rule.

A suggested belief is not automatically a belief that fired.

A new rewire statement is not proof that the person already fully embodies it.

If a NO answer meaningfully changed the direction of the session, include it when useful.

Do not include irrelevant testing.

==================================================
SESSION CONVERSATION
==================================================

${conversationText}

Generate the Release Core session summary now.
`;

    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            process.env.ANTHROPIC_API_KEY!,
          "anthropic-version":
            "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Anthropic summary API error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Summary request failed",
        },
        {
          status: response.status,
        }
      );
    }

    const summary =
      data.content
        ?.map((c: any) =>
          c.type === "text"
            ? c.text || ""
            : ""
        )
        .join("") || "";

    if (!summary) {
      return NextResponse.json(
        {
          error: "No summary generated",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      summary,
    });
  } catch (err) {
    console.error(
      "Summary generation error:",
      err
    );

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}