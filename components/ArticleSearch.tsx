"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import FreeGuideSignup from "@/components/FreeGuideSignup";

type ArticleSummary = { slug: string; title: string; description: string };

// Loosen each typed word so "loss" also finds "lose"/"lost" and plurals find singulars.
function normalize(term: string) {
  if (/^(los|lose|loss|lost|losing)$/.test(term)) return "los";
  if (term.length > 3 && term.endsWith("s")) return term.slice(0, -1);
  return term;
}

// Every typed word has to start a word in the title, description, or slug, so
// "ms" finds MS articles without matching "symptoms".
function matches(article: ArticleSummary, terms: string[]) {
  const words = `${article.title} ${article.description} ${article.slug.replace(/-/g, " ")}`
    .toLowerCase()
    .split(/[^a-z0-9']+/);
  return terms.every((term) => words.some((word) => word.startsWith(term)));
}

export default function ArticleSearch({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const terms = query.toLowerCase().split(/[^a-z0-9']+/).filter(Boolean).map(normalize);
  const results = useMemo(
    () => (terms.length ? articles.filter((a) => matches(a, terms)) : articles),
    [articles, terms.join(" ")],
  );

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="article-search" className="sr-only">
          Search articles
        </label>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles: mold, weight loss, MS, tics, sleep..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-base text-slate-900 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
        {terms.length > 0 && (
          <p className="mt-2 text-sm text-slate-500">
            {results.length === 0
              ? "No articles found. Try a different word."
              : `${results.length} article${results.length === 1 ? "" : "s"} found`}
          </p>
        )}
      </div>

      {results.map((article, i) => (
        <Fragment key={article.slug}>
          <Link
            href={`/articles/${article.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{article.description}</p>
          </Link>
          {/* Offer the free guide after the newest few articles, so the list stays first. */}
          {i === 2 && terms.length === 0 && <FreeGuideSignup compact />}
        </Fragment>
      ))}
    </div>
  );
}
