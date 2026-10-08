import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { getPublishedArticle, getPublishedArticles } from "@/lib/articles";

type Props = { params: { slug: string } };

// Turns [text](/path) in article text into links; everything else stays plain text.
function renderInline(text: string) {
  return text.split(/(\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (!match) return part;
    return (
      <Link key={i} href={match[2]} className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800">
        {match[1]}
      </Link>
    );
  });
}

// Drafts (published: false) are never built, so their URLs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getPublishedArticle(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getPublishedArticle(params.slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Person", name: "Chelsea Walton" },
    publisher: { "@type": "Organization", name: "Release Core", url: "https://release-core.com" },
    mainEntityOfPage: `https://release-core.com/articles/${article.slug}`,
  };

  return (
    <AppShell title={article.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="space-y-5 text-base leading-8 text-slate-700">
        {article.blocks.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="pt-4 text-xl font-semibold text-slate-900">
                {block.text}
              </h2>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{renderInline(block.text)}</p>;
        })}
      </article>

      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-lg font-semibold text-slate-900">
          Want to find out what your nervous system is responding to?
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          Release Core helps you ask your body questions and follow the answers to the pattern underneath.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
          >
            Create Account
          </Link>
          <Link
            href="/articles"
            className="rounded-xl border border-slate-300 px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-white"
          >
            More Articles
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
