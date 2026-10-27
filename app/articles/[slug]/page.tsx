import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import FreeGuideSignup from "@/components/FreeGuideSignup";
import { getArticleFaqs, getPublishedArticle, getPublishedArticles, getRewireQuestion } from "@/lib/articles";

type Props = { params: { slug: string } };

// signupHref carries the article slug so each new account records which article sent it.
function SessionInvite({ signupHref, rewireQuestion }: { signupHref: string; rewireQuestion?: string }) {
  return (
    <aside className="rounded-xl border-l-4 border-emerald-600 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
      <span className="font-semibold text-slate-900">Want to know what your body is protecting you from? </span>
      A Release Core session helps you find when the pattern started and what your body learned
      back then.{" "}
      {rewireQuestion && (
        <>
          Then you rewire it by asking your body questions like &ldquo;{rewireQuestion}&rdquo;{" "}
        </>
      )}
      <Link href={signupHref} className="font-medium text-emerald-700 underline underline-offset-4">
        Start your first session
      </Link>
    </aside>
  );
}

// Turns [text](/path) into links and **text** into bold; everything else stays plain text.
function renderInline(text: string, signupHref = "/signup") {
  return text.split(/(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (!match) return part;
    // Outside sources (studies) open in a new tab so readers stay on the article.
    if (/^https?:\/\//.test(match[2])) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
        >
          {match[1]}
        </a>
      );
    }
    return (
      <Link key={i} href={match[2] === "/signup" ? signupHref : match[2]} className="font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800">
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

  const faqs = getArticleFaqs(article);
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const signupHref = `/signup?from=${article.slug}`;
  const rewireQuestion = getRewireQuestion(article);

  // The free-guide signup sits before the second section, while readers are most
  // engaged; a short session invite sits two sections later. Short articles with
  // few sections fall back so the two never land in the same spot.
  const headingIndexes = article.blocks.flatMap((b, i) => (b.type === "h2" ? [i] : []));
  const signupAt = headingIndexes[1] ?? -1;
  const midInviteAt = headingIndexes[3] ?? headingIndexes[2] ?? -1;

  return (
    <AppShell title={article.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="space-y-5 text-base leading-8 text-slate-700">
        {article.blocks.map((block, i) => {
          if (block.type === "h2") {
            return (
              <Fragment key={i}>
                {i === signupAt && (
                  <div className="py-2">
                    <FreeGuideSignup compact />
                  </div>
                )}
                {i === midInviteAt && <SessionInvite signupHref={signupHref} rewireQuestion={rewireQuestion} />}
                <h2 className="pt-4 text-xl font-semibold text-slate-900">{block.text}</h2>
              </Fragment>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, signupHref)}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{renderInline(block.text, signupHref)}</p>;
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
          You can&apos;t think your way to it, because it isn&apos;t stored as a thought. In a Release
          Core session you find the age the pattern started, what your nervous system learned back
          then, and rewire it with questions your body can actually say yes to.
        </p>
        <p className="mt-3 text-sm italic leading-7 text-slate-600">
          &ldquo;Within 10 minutes of the session, I was feeling way better and could actually
          function again.&rdquo;
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={signupHref}
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
