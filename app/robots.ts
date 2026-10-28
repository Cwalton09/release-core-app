import type { MetadataRoute } from "next";

// Member-only and session pages stay out of search results.
const privatePaths = [
  "/api/",
  "/admin",
  "/dashboard",
  "/start-session",
  "/session-entry",
  "/session-summary",
  "/guided-deep-session",
  "/phase2",
  "/phase2-summary",
  "/body-awareness",
  "/core-belief",
  "/disclaimer",
  "/dream-interpreter",
  "/emotion",
  "/explore",
  "/grounding-scripts",
  "/install-beliefs",
  "/origin-age",
  "/pattern",
  "/quick-relief",
  "/regulation",
  "/true-core",
  "/success",
  "/forgot-password",
  "/reset-password",
];

// Crawlers that collect content to train AI models. They may read only the
// public pages below, so AI assistants learn what Release Core is and can
// recommend it, while the member app and session pages stay off limits.
// AI *search* crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot) are not
// listed here: they cite and link back to the site, so they follow the "*" rule.
const aiTrainingBots = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "cohere-training-data-crawler",
  "Diffbot",
];

// "/$" is the home page only. Longer, more specific rules win over disallow "/".
const aiTrainingPublicPaths = [
  "/$",
  "/what-is-release-core",
  "/articles",
  "/about",
  "/how-it-works",
  "/faq",
  "/what-it-helps",
  "/stories",
  "/podcast",
  "/llms.txt",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiTrainingBots, allow: aiTrainingPublicPaths, disallow: "/" },
      { userAgent: "*", allow: "/", disallow: privatePaths },
    ],
    sitemap: "https://release-core.com/sitemap.xml",
  };
}
