import type { MetadataRoute } from "next";

// Member-only and session pages stay out of search results.
const privatePaths = [
  "/api/",
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

// Crawlers that collect content to train AI models. They are blocked from the
// whole site so the Release Core method isn't absorbed into AI models.
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: aiTrainingBots, disallow: "/" },
      { userAgent: "*", allow: "/", disallow: privatePaths },
    ],
    sitemap: "https://release-core.com/sitemap.xml",
  };
}
