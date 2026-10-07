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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: privatePaths },
    sitemap: "https://release-core.com/sitemap.xml",
  };
}
