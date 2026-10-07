import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";

const siteUrl = "https://release-core.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const articles = getPublishedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.length
    ? [
        { url: `${siteUrl}/articles`, lastModified, changeFrequency: "weekly", priority: 0.8 },
        ...articles.map((a) => ({
          url: `${siteUrl}/articles/${a.slug}`,
          lastModified: new Date(a.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...articleEntries,
    { url: `${siteUrl}/signup`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms-of-use`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
