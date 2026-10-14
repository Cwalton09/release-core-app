// "What is your body protecting you from?" quiz: each answer points to one of four
// protection patterns. Results describe the pattern and point to a session; they
// deliberately don't give self-help tips.

export type PatternKey = "guard" | "peacekeeper" | "holder" | "shutdown";

export type Question = {
  prompt: string;
  answers: { text: string; pattern: PatternKey }[];
};

export const QUESTIONS: Question[] = [
  {
    prompt: "When things finally get quiet, you...",
    answers: [
      { text: "Start scanning for what could go wrong", pattern: "guard" },
      { text: "Wonder if everyone is okay with you", pattern: "peacekeeper" },
      { text: "Notice how tight your shoulders or jaw are", pattern: "holder" },
      { text: "Go blank or zone out", pattern: "shutdown" },
    ],
  },
  {
    prompt: "In a conflict, you usually...",
    answers: [
      { text: "Get defensive and ready for it", pattern: "guard" },
      { text: "Smooth it over, even if it wasn't your fault", pattern: "peacekeeper" },
      { text: "Push through and handle it", pattern: "holder" },
      { text: "Go quiet and can't find your words", pattern: "shutdown" },
    ],
  },
  {
    prompt: "At night, you're most likely to...",
    answers: [
      { text: "Lie there with your mind racing", pattern: "guard" },
      { text: "Replay conversations from the day", pattern: "peacekeeper" },
      { text: "Wake up with a sore jaw or tight body", pattern: "holder" },
      { text: "Sleep, but never wake up feeling rested", pattern: "shutdown" },
    ],
  },
  {
    prompt: "When someone near you is upset, you...",
    answers: [
      { text: "Go on high alert", pattern: "guard" },
      { text: "Feel like it's your job to fix it", pattern: "peacekeeper" },
      { text: "Feel your stomach knot up and brace", pattern: "holder" },
      { text: "Check out until it passes", pattern: "shutdown" },
    ],
  },
  {
    prompt: "Your body tends to...",
    answers: [
      { text: "Jump at small things, heart racing", pattern: "guard" },
      { text: "Drop in your stomach when someone seems disappointed", pattern: "peacekeeper" },
      { text: "Hold tension, pain, or headaches", pattern: "holder" },
      { text: "Feel heavy, foggy, and tired", pattern: "shutdown" },
    ],
  },
  {
    prompt: "On a free day with nothing planned, you...",
    answers: [
      { text: "Can't relax, like something bad is coming", pattern: "guard" },
      { text: "Feel guilty, like you should be helping someone", pattern: "peacekeeper" },
      { text: "Fill it with a to-do list", pattern: "holder" },
      { text: "Lose the whole day and don't know where it went", pattern: "shutdown" },
    ],
  },
  {
    prompt: "Which thought feels most true?",
    answers: [
      { text: "\"I have to stay ready.\"", pattern: "guard" },
      { text: "\"I need everyone to be okay.\"", pattern: "peacekeeper" },
      { text: "\"If I don't hold it together, no one will.\"", pattern: "holder" },
      { text: "\"It's all too much.\"", pattern: "shutdown" },
    ],
  },
  {
    prompt: "When you're close to getting something you really want, you...",
    answers: [
      { text: "Wait for the other shoe to drop", pattern: "guard" },
      { text: "Worry it will upset someone", pattern: "peacekeeper" },
      { text: "Work even harder so it doesn't fall apart", pattern: "holder" },
      { text: "Stall, or quietly pull back", pattern: "shutdown" },
    ],
  },
];

export type Pattern = {
  name: string;
  tagline: string;
  summary: string;
  signs: string[];
  learned: string;
  full: string[];
  articles: { title: string; href: string }[];
};

export const PATTERNS: Record<PatternKey, Pattern> = {
  guard: {
    name: "The Guard",
    tagline: "Your body is always on watch.",
    summary:
      "Your nervous system learned that staying alert is what keeps you safe. So even when nothing is wrong, part of you is scanning, bracing, and getting ready.",
    signs: [
      "On edge even when everything is fine",
      "A mind that races at night",
      "Rest that makes you more anxious, not less",
      "Jumping at small sounds or surprises",
    ],
    learned: "\"If I stay ready, nothing can blindside me.\"",
    full: [
      "This pattern often starts somewhere life felt unpredictable. Maybe you never knew what mood someone would be in, or something happened that you didn't see coming. Your body made a decision back then: never get caught off guard again.",
      "That decision protected you. But your body is still following it today, long after the danger is gone. That's why you can know you're safe and still feel like you're not.",
      "You can't think your way out of something your body believes. In a Release Core session, your body leads you to where this started, and you give it what it needed back then, so it can finally stand down.",
    ],
    articles: [
      { title: "Signs your nervous system is stuck in fight or flight", href: "/articles/signs-nervous-system-stuck-in-fight-or-flight" },
      { title: "Hypervigilance: always scanning for danger", href: "/articles/hypervigilance-always-scanning-for-danger" },
    ],
  },
  peacekeeper: {
    name: "The Peacekeeper",
    tagline: "Your body feels safe when everyone else is okay.",
    summary:
      "Your nervous system learned that keeping other people happy is what keeps you safe. So you read every room, smooth things over, and put yourself last without even deciding to.",
    signs: [
      "Saying yes when you want to say no",
      "Feeling responsible for other people's moods",
      "Replaying conversations, wondering if you upset someone",
      "Guilt when you rest or put yourself first",
    ],
    learned: "\"If everyone is okay, I'm okay.\"",
    full: [
      "This pattern often starts somewhere love or peace felt like it depended on you. Maybe someone's mood decided how the whole house felt, or being easy was how you stayed close. Your body learned to watch everyone else to stay safe.",
      "It isn't weakness. It's protection. But it can leave you exhausted, resentful, and unsure what you even want.",
      "You can't think your way out of something your body believes. In a Release Core session, your body leads you to where this started, so it can learn that your needs are allowed to matter too.",
    ],
    articles: [
      { title: "The fawn response: why you people-please", href: "/articles/fawn-response-people-pleasing" },
      { title: "Why do I overthink everything?", href: "/articles/why-do-i-overthink-everything" },
    ],
  },
  holder: {
    name: "The Holder",
    tagline: "Your body is holding everything together.",
    summary:
      "Your nervous system learned that if you don't carry it all, everything falls apart. So you push through, stay strong, and your body holds the tension for you.",
    signs: [
      "A tight jaw, shoulders, or stomach you barely notice anymore",
      "Pain, headaches, or tension that keeps coming back",
      "Handling everything yourself, even when you're exhausted",
      "Getting sick as soon as you finally slow down",
    ],
    learned: "\"If I don't hold it together, no one will.\"",
    full: [
      "This pattern often starts somewhere you had to grow up fast or be the strong one. Maybe nobody else was steady, or falling apart didn't feel allowed. Your body learned to brace and keep going.",
      "That strength got you through. But a body that's always bracing never gets to rest, and the tension has to go somewhere.",
      "You can't think your way out of something your body believes. In a Release Core session, your body leads you to where this started, so it can learn it doesn't have to carry everything alone.",
    ],
    articles: [
      { title: "Why do I clench my jaw?", href: "/articles/why-do-i-clench-my-jaw" },
      { title: "How the nervous system shapes pain", href: "/articles/how-the-nervous-system-shapes-pain" },
    ],
  },
  shutdown: {
    name: "The Shutdown",
    tagline: "When it's too much, your body turns everything down.",
    summary:
      "Your nervous system learned that when fighting or fixing isn't possible, the safest thing is to disappear a little. So you go numb, foggy, or blank, especially when life gets heavy.",
    signs: [
      "Feeling numb, flat, or far away",
      "Brain fog and exhaustion, even after sleep",
      "Knowing what to do but not being able to start",
      "Going quiet in hard conversations",
    ],
    learned: "\"When it's too much, disappear.\"",
    full: [
      "This pattern often starts somewhere you felt overwhelmed and couldn't change what was happening. Your body found the only way out it had: turning everything down.",
      "It isn't laziness, and it isn't weakness. It's one of the oldest ways a body protects itself. But it can leave you feeling like you're watching your life instead of living it.",
      "You can't think your way out of something your body believes. In a Release Core session, your body leads you to where this started, so it can learn it's safe to come back.",
    ],
    articles: [
      { title: "Why do I shut down when I'm overwhelmed?", href: "/articles/why-do-i-shut-down-when-overwhelmed" },
      { title: "Why do I feel emotionally numb?", href: "/articles/why-do-i-feel-emotionally-numb" },
    ],
  },
};

// The pattern with the most answers. Ties go to the answer to "Which thought feels
// most true?", then to the earliest pattern in the tie.
export function scoreQuiz(answers: PatternKey[]): PatternKey {
  const counts: Record<PatternKey, number> = { guard: 0, peacekeeper: 0, holder: 0, shutdown: 0 };
  for (const a of answers) counts[a]++;
  const max = Math.max(...Object.values(counts));
  const tied = (Object.keys(counts) as PatternKey[]).filter((k) => counts[k] === max);
  const tiebreak = answers[6];
  return tied.includes(tiebreak) ? tiebreak : tied[0];
}
