import type { MetadataRoute } from "next";

const siteUrl = "https://release-core.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/signup`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms-of-use`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
