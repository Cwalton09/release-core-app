import fs from "fs";
import path from "path";

// Articles live in /content/articles as simple .md files:
//
//   ---
//   title: Why Does My Body Still React When I Know I'm Safe?
//   description: One or two sentences shown in Google results.
//   date: 2026-10-07
//   published: false
//   ---
//   Paragraph text...
//
//   ## A heading
//
//   - a list item
//
// Only articles with `published: true` appear on the site and in the sitemap.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  blocks: ArticleBlock[];
};

const articlesDir = path.join(process.cwd(), "content", "articles");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    // Strip YAML-style wrapping quotes, e.g. title: "Crohn's Disease: ..."
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, body: match[2] };
}

function parseBody(body: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  for (const chunk of body.split(/\r?\n\s*\r?\n/)) {
    const lines = chunk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    if (lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3) });
      if (lines.length > 1) blocks.push({ type: "p", text: lines.slice(1).join(" ") });
    } else if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

function readArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    published: data.published === "true",
    blocks: parseBody(body),
  };
}

export function getPublishedArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map(readArticle)
    .filter((a) => a.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((a) => a.slug === slug);
}

const stripInline = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

// Pulls "**Question?** Answer" paragraphs out of a "Common questions" section,
// for FAQ structured data that Google and AI answer tools can quote.
export function getArticleFaqs(article: Article): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;
  for (const block of article.blocks) {
    if (block.type === "h2") {
      inFaq = /common questions|frequently asked|faq/i.test(block.text);
      continue;
    }
    if (!inFaq || block.type !== "p") continue;
    const match = block.text.match(/^\*\*([^*]+\?)\*\*\s+(.+)$/);
    if (match) faqs.push({ question: match[1].trim(), answer: stripInline(match[2]).trim() });
  }
  return faqs;
}

// The article's own rewiring question, e.g. "Can you show me what it feels like to be completely calm?"
export function getRewireQuestion(article: Article): string | undefined {
  for (const block of article.blocks) {
    const text = block.type === "ul" ? block.items.join(" ") : block.text;
    const match = text.match(/Can you show me what it feels like [^"?]+\?/);
    if (match) return match[0];
  }
  return undefined;
}
