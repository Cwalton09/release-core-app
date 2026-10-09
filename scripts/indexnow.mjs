// Tells Bing (and other IndexNow search engines) about the site's pages so new
// and updated articles get crawled quickly. Bing also powers ChatGPT search and
// Copilot results. Runs after production builds on Vercel; never fails a build.
import fs from "fs";
import path from "path";

const SITE = "https://release-core.com";
const KEY = "1b154ff72701101abf1c13871f869667";

if (process.env.VERCEL && process.env.VERCEL_ENV !== "production") {
  console.log("IndexNow: skipped (not a production deploy)");
  process.exit(0);
}

const pages = ["/", "/about", "/how-it-works", "/free", "/faq", "/articles", "/signup"];

const dir = path.join(process.cwd(), "content", "articles");
const articles = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => /^published:\s*true\s*$/m.test(fs.readFileSync(path.join(dir, f), "utf8")))
  .map((f) => `/articles/${f.replace(/\.md$/, "")}`);

const urlList = [...pages, ...articles].map((p) => SITE + p);

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "release-core.com",
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs, status ${res.status}`);
} catch (error) {
  console.log("IndexNow: could not submit", error?.message ?? error);
}
