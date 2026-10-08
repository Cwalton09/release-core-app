import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import FreeGuideSignup from "@/components/FreeGuideSignup";
import { getPublishedArticle, getPublishedArticles } from "@/lib/articles";

type Props = { params: { slug: string } };

function SessionInvite() {
  return (
    <aside className="rounded-xl border-l-4 border-emerald-600 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
      <span className="font-semibold text-slate-900">Want to know what your body is protecting you from? </span>
      A Release Core session helps you find the belief underneath, step by step.{" "}
      <Link href="/signup" className="font-medium text-emerald-700 underline underline-offset-4">
        Start your first session
      </Link>
    </aside>
  );
}

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

  // A short session invite sits just before the article's third section.
  const headingIndexes = article.blocks.flatMap((b, i) => (b.type === "h2" ? [i] : []));
  const midInviteAt = headingIndexes[2] ?? -1;

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
              <Fragment key={i}>
                {i === midInviteAt && <SessionInvite />}
                <h2 className="pt-4 text-xl font-semibold text-slate-900">{block.text}</h2>
              </Fragment>
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

      <p className="mt-8 text-xs leading-6 text-slate-500">
        Release Core is for self-awareness and nervous system support. It isn&apos;t a substitute
        for medical or mental health care. If you&apos;re in crisis, call or text 988 (U.S.).
      </p>

      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <p className="text-xl font-semibold text-slate-900">
          Find the belief your body is still running.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          You can&apos;t think your way to it, because it isn&apos;t stored as a thought. A Release Core
          session guides you to ask your body questions and follow its answers until you find what
          it&apos;s still protecting you from, then helps it let go.
        </p>
        <p className="mt-3 text-sm italic leading-7 text-slate-600">
          &ldquo;Within 10 minutes of the session, I was feeling way better and could actually
          function again.&rdquo;
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-medium text-white transition hover:bg-emerald-800"
          >
            Start your first session
          </Link>
          <Link
            href="/articles"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-50"
          >
            More articles
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <FreeGuideSignup compact />
      </div>
    </AppShell>
  );
}
