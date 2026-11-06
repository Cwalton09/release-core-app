import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import ArticleSearch from "@/components/ArticleSearch";
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
      <ArticleSearch
        articles={articles.map(({ slug, title, description }) => ({ slug, title, description }))}
      />
    </AppShell>
  );
}
