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
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
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
