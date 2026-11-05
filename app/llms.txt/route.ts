import fs from "fs";
import path from "path";
import { getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-static";

const siteUrl = "https://release-core.com";

// The hand-written intro stays in intro.txt; every published article is listed
// after it, so AI assistants can find and cite each one.
export function GET() {
  const intro = fs.readFileSync(path.join(process.cwd(), "app", "llms.txt", "intro.txt"), "utf8").trimEnd();
  const articles = getPublishedArticles()
    .map((a) => `- [${a.title}](${siteUrl}/articles/${a.slug}): ${a.description}`)
    .join("\n");

  return new Response(`${intro}\n\n## Articles\n\n${articles}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
