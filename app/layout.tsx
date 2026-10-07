import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://release-core.com";
const siteDescription =
  "Why does your body still react when you know you're safe? Release Core helps you uncover the nervous system patterns behind anxiety, panic, overthinking, and shutdown.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Release Core | Nervous System Regulation & Release Method",
    template: "%s | Release Core",
  },
  description: siteDescription,
  keywords: [
    "nervous system regulation",
    "dysregulated nervous system",
    "fight or flight",
    "somatic healing",
    "anxiety relief",
    "panic",
    "emotional release",
    "body awareness",
    "Release Core Method",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Release Core",
    title: "Release Core | Nervous System Regulation & Release Method",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Release Core | Nervous System Regulation & Release Method",
    description: siteDescription,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
