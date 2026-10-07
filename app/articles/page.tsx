import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Nervous System Articles",
  description:
    "Plain-language articles on why your body reacts the way it does: fight or flight, shutdown, panic, and the patterns your nervous system may still be running.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getPublishedArticles();
  if (articles.length === 0) notFound();

  return (
    <AppShell
      title="Articles"
      subtitle="Why your body reacts the way it does, and what it may be trying to protect you from."
    >
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{article.description}</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
