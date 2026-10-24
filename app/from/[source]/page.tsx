import type { Metadata } from "next";
import Home from "../../page";

// Bio links (release-core.com/from/tiktok, etc.) show the home page, but each
// platform gets its own path so Vercel Analytics can tell which app sent the visit.
const sources = ["instagram", "tiktok", "facebook", "youtube", "pinterest"];

export const dynamicParams = false;

export function generateStaticParams() {
  return sources.map((source) => ({ source }));
}

// Same content as the home page, so Google should only index "/".
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default Home;
