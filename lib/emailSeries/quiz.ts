import type { SeriesEmail } from "./types";

// Follow-up emails for each quiz result (moved from Kit, same wording).
// `day` is days after the person took the quiz.
export const QUIZ_SERIES: Record<string, SeriesEmail[]> = {
  "guard": [
    {
      "day": 1,
      "subject": "Why your body won't stand down",
      "preview": "Even when you know you're safe",
      "blocks": [
        "Hi {{name}},",
        "You got The Guard on the quiz. That means your body is always on watch: scanning, bracing, getting ready, even when nothing is wrong.",
        "Here's the part most people miss. The Guard isn't a thinking problem. You probably already know you're safe. You may have told yourself to relax a hundred times. It doesn't work, because the part of you that's on watch doesn't listen to logic.",
        "It's following a rule it learned a long time ago: \"If I stay ready, nothing can blindside me.\" Somewhere, life felt unpredictable, and your body decided it would never get caught off guard again. It's been keeping that promise ever since.",
        "Your body won't drop that rule just because you understand it. It lets go when it goes back to where the rule started and gets what it needed then.",
        "That's what a Release Core session does. Your body leads you to where it started, and you give it a new message it can actually believe, so it can finally stand down.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 6,
      "subject": "What it feels like when The Guard finally rests",
      "preview": "Not forced calm. Real calm.",
      "blocks": [
        "Hi {{name}},",
        "Imagine this for a second.",
        "You lie down at night and your mind doesn't start racing. A door slams, you notice it, and then it's gone. A free afternoon feels like rest, not like waiting for the next thing to go wrong.",
        "That isn't you trying harder to be calm. That's what happens when your body no longer believes it has to stand guard.",
        "Here's what one member shared:",
        {
          "center": "<em>\"My nervous system is calm, and it was out of control. I feel calm yet rock solid.\"</em>"
        },
        "Nothing about The Guard is permanent. It's a pattern your body learned, which means it's a pattern your body can unlearn once it's taken back to where it started.",
        {
          "button": [
            "Find where yours started",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 12,
      "subject": "How a session works (for The Guard)",
      "preview": "3 steps, and your body leads",
      "blocks": [
        "Hi {{name}},",
        "If you've been curious about Release Core but aren't sure what actually happens in a session, here it is.",
        "<strong>1. You ask your body. </strong>You ask your nervous system whether there's an emotional connection to what you're feeling, like that always-on-edge feeling.",
        "<strong>2. Your body leads you to the start. </strong>If there is, it leads you to the age it started, what happened, and what your body decided back then.",
        "<strong>3. You rewire it. </strong>You give your body a new message, with questions it can actually say yes to. Then you check how it feels now.",
        "You don't have to dig through years of your life on your own, or figure out where it came from first. Your body already knows.",
        "Membership is $25 a month, and you can cancel anytime. You get guided deep sessions whenever you need them, plus a nighttime script and a summary of every session to keep.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        "<strong>P.S. </strong>If The Guard sounded exactly like you, your body has probably been on watch for a long time. It doesn't have to stay that way.",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    }
  ],
  "peacekeeper": [
    {
      "day": 1,
      "subject": "Why you can't just stop people-pleasing",
      "preview": "It was never really a choice",
      "blocks": [
        "Hi {{name}},",
        "You got The Peacekeeper on the quiz. That means your body feels safe when everyone else is okay, so you read every room, smooth things over, and put yourself last without even deciding to.",
        "Maybe you've tried to stop. Tried to say no, hold the boundary, care less about what they think. Then the moment comes and the yes is out of your mouth before you can catch it.",
        "That's because people-pleasing isn't a decision you're making. It's a rule your body learned: \"If everyone is okay, I'm okay.\" Somewhere, love or peace felt like it depended on you, and your body learned to watch everyone else to stay safe.",
        "Your body won't let go of that rule just because you understand it. It lets go when it goes back to where the rule started and learns something new there.",
        "That's what a Release Core session does. Your body leads you to where it started, so it can learn that your needs are allowed to matter too.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 6,
      "subject": "What it feels like when you stop managing everyone",
      "preview": "Saying no without the guilt spiral",
      "blocks": [
        "Hi {{name}},",
        "Imagine this for a second.",
        "You say no, and you don't replay it all night. Someone's in a bad mood, and you notice it without it becoming your job to fix. You rest without guilt. You actually know what you want.",
        "That isn't you becoming selfish. That's what happens when your body no longer believes your safety depends on everyone else being okay.",
        "Here's what one member shared:",
        {
          "center": "<em>\"Release Core is incredible for getting to the very root for me in ways journaling or anything else could never reveal.\"</em>"
        },
        "Nothing about The Peacekeeper is permanent. It's a pattern your body learned, which means it's a pattern your body can unlearn once it's taken back to where it started.",
        {
          "button": [
            "Find where yours started",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 12,
      "subject": "How a session works (for The Peacekeeper)",
      "preview": "3 steps, and your body leads",
      "blocks": [
        "Hi {{name}},",
        "If you've been curious about Release Core but aren't sure what actually happens in a session, here it is.",
        "<strong>1. You ask your body. </strong>You ask your nervous system whether there's an emotional connection to what you're feeling, like that feeling of being responsible for everyone.",
        "<strong>2. Your body leads you to the start. </strong>If there is, it leads you to the age it started, what happened, and what your body decided back then.",
        "<strong>3. You rewire it. </strong>You give your body a new message, with questions it can actually say yes to. Then you check how it feels now.",
        "You don't have to dig through years of your life on your own, or figure out where it came from first. Your body already knows.",
        "Membership is $25 a month, and you can cancel anytime. You get guided deep sessions whenever you need them, plus a nighttime script and a summary of every session to keep.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        "<strong>P.S. </strong>If The Peacekeeper sounded exactly like you, you've probably spent a long time taking care of everyone else. This one is for you.",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    }
  ],
  "holder": [
    {
      "day": 1,
      "subject": "Why the tension keeps coming back",
      "preview": "Your body is holding more than your shoulders",
      "blocks": [
        "Hi {{name}},",
        "You got The Holder on the quiz. That means your body is holding everything together. You push through, you stay strong, and the tension lives in your jaw, your shoulders, or your stomach.",
        "Maybe you've tried to make it go away. It eases for a day, then it's right back. That's because the tension isn't random. It's following a rule your body learned: \"If I don't hold it together, no one will.\"",
        "Somewhere, you had to grow up fast or be the strong one. Maybe nobody else was steady, or falling apart didn't feel allowed. Your body learned to brace and keep going, and it hasn't stopped.",
        "Your body won't drop that rule just because you understand it. It lets go when it goes back to where the rule started and learns something new there.",
        "That's what a Release Core session does. Your body leads you to where it started, so it can learn it doesn't have to carry everything alone.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 6,
      "subject": "What it feels like to finally put it down",
      "preview": "Your body was never meant to brace forever",
      "blocks": [
        "Hi {{name}},",
        "Imagine this for a second.",
        "You wake up without a sore jaw. You slow down for a weekend and don't get sick. Someone else carries something, and your body actually lets them.",
        "That isn't you becoming weak. That's what happens when your body no longer believes everything falls apart without you.",
        "Here's what one member shared:",
        {
          "center": "<em>\"Release Core is incredible for getting to the very root for me in ways journaling or anything else could never reveal.\"</em>"
        },
        "Nothing about The Holder is permanent. It's a pattern your body learned, which means it's a pattern your body can unlearn once it's taken back to where it started.",
        {
          "button": [
            "Find where yours started",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 12,
      "subject": "How a session works (for The Holder)",
      "preview": "3 steps, and your body leads",
      "blocks": [
        "Hi {{name}},",
        "If you've been curious about Release Core but aren't sure what actually happens in a session, here it is.",
        "<strong>1. You ask your body. </strong>You ask your nervous system whether there's an emotional connection to what you're feeling, like that holding-it-all-together tension.",
        "<strong>2. Your body leads you to the start. </strong>If there is, it leads you to the age it started, what happened, and what your body decided back then.",
        "<strong>3. You rewire it. </strong>You give your body a new message, with questions it can actually say yes to. Then you check how it feels now.",
        "You don't have to dig through years of your life on your own, or figure out where it came from first. Your body already knows.",
        "Membership is $25 a month, and you can cancel anytime. You get guided deep sessions whenever you need them, plus a nighttime script and a summary of every session to keep.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        "<strong>P.S. </strong>If The Holder sounded exactly like you, you've been the strong one for a long time. You're allowed to put some of it down.",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    }
  ],
  "shutdown": [
    {
      "day": 1,
      "subject": "Why you go numb when it gets to be too much",
      "preview": "It isn't laziness. It never was.",
      "blocks": [
        "Hi {{name}},",
        "You got The Shutdown on the quiz. That means when life gets heavy, your body turns everything down. You go numb, foggy, or blank.",
        "Maybe you've called yourself lazy for it. You know exactly what you need to do and you still can't start. A hard conversation comes up and you go quiet.",
        "It isn't laziness, and it isn't weakness. It's one of the oldest ways a body protects itself. It's following a rule it learned: \"When it's too much, disappear.\" Somewhere, you felt overwhelmed and couldn't change what was happening, and your body found the only way out it had.",
        "Your body won't drop that rule just because you understand it. It lets go when it goes back to where the rule started and learns something new there.",
        "That's what a Release Core session does. Your body leads you to where it started, so it can learn it's safe to come back.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 6,
      "subject": "What it feels like to come back to your life",
      "preview": "Feeling things again, without being flooded",
      "blocks": [
        "Hi {{name}},",
        "Imagine this for a second.",
        "You wake up with a clear head. You start the thing you've been putting off, without hitting a wall. You stay present in a hard conversation. You feel your life instead of watching it.",
        "That isn't you forcing yourself to try harder. That's what happens when your body no longer believes it has to disappear to stay safe.",
        "Here's what one member shared:",
        {
          "center": "<em>\"Within 10 minutes of the session, I was feeling way better and could actually function again.\"</em>"
        },
        "Nothing about The Shutdown is permanent. It's a pattern your body learned, which means it's a pattern your body can unlearn once it's taken back to where it started.",
        {
          "button": [
            "Find where yours started",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    },
    {
      "day": 12,
      "subject": "How a session works (for The Shutdown)",
      "preview": "3 steps, and your body leads",
      "blocks": [
        "Hi {{name}},",
        "If you've been curious about Release Core but aren't sure what actually happens in a session, here it is.",
        "<strong>1. You ask your body. </strong>You ask your nervous system whether there's an emotional connection to what you're feeling, like that numb, far-away feeling.",
        "<strong>2. Your body leads you to the start. </strong>If there is, it leads you to the age it started, what happened, and what your body decided back then.",
        "<strong>3. You rewire it. </strong>You give your body a new message, with questions it can actually say yes to. Then you check how it feels now.",
        "You don't have to dig through years of your life on your own, or figure out where it came from first. Your body already knows.",
        "Membership is $25 a month, and you can cancel anytime. You get guided deep sessions whenever you need them, plus a nighttime script and a summary of every session to keep.",
        {
          "button": [
            "Start your first session",
            "https://release-core.com/signup"
          ]
        },
        "Chelsea",
        "<strong>P.S. </strong>If The Shutdown sounded exactly like you, it makes sense that you've felt stuck. Your body has been protecting you. It's safe to come back.",
        {
          "small": "<em>Release Core is for self-awareness and nervous system support. It isn't a substitute for medical or mental health care. If you're in crisis, call or text 988 (U.S.).</em>"
        }
      ]
    }
  ]
};
