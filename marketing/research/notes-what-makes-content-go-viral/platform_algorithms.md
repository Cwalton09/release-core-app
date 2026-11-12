# Platform Algorithms: How TikTok For You, Instagram Reels and YouTube Shorts Decide Distribution (2024-2026)

Evidence-quality legend used throughout:
- **[OFFICIAL]** = the platform itself (help center, newsroom, executive on record)
- **[INDEPENDENT]** = large-dataset vendor studies, journalism on leaks, peer-reviewed or arXiv research
- **[FOLKLORE]** = repeated by creator/SEO blogs with no primary source or data
- "(snippet only)" = seen in search-result text but the page itself was not opened this session; verify before quoting.
- Research date: 2026-11-12.

## 1. Which ranking signals do the platforms officially describe?

### Takeaway
All three platforms say the core input is predicted viewer behaviour: watching (watch time and completion), active engagement (sends/shares, likes, comments, follows) and explicit negative feedback ("Not interested"). Instagram is the only one that has publicly ranked its signals: **watch time, likes and sends**, with sends weighted more for reaching non-followers. TikTok and YouTube describe categories of signals but give no weights.

### Cited Findings
**Instagram [OFFICIAL]**
- Jan 22, 2025: Adam Mosseri said "The top three signals that matter most for ranking are watch time, likes and sends." He told creators to track **average watch time, likes per reach and sends per reach**. — [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)
- Same statement: "Likes are slightly more important for connected content, and sends are slightly more important for unconnected content." In other words, likes help with followers and sends (DM shares) help with non-followers. — [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)
- Mosseri, 2024 Q&A (as quoted secondhand): "sends per reach correlate more, in my experience, with overall reach than anything else." — via [InfluencerMarketingHub](https://influencermarketinghub.com/instagram-sends-per-reach-playbook/) (secondary)
- Comments were **not** in Mosseri's top three. The idea that comments feed in through watch time is the journalist's inference, not Mosseri's. — [Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)
- Meta publishes "system cards" for Instagram ranking. Meta announced 22 such cards in June 2023. — [Meta newsroom, 2023](https://about.fb.com/news/2023/06/how-ai-ranks-content-on-facebook-and-instagram/)
- Secondary write-ups say the Reels card lists these predictions: likelihood you watch less than 3 seconds, watch to the end, reuse the audio, share off-Instagram, comment and follow the author. The Feed card lists likelihood of swiping through a whole carousel, skipping and sharing via DM. These lists come from blogs (snippet only), and the Reels card page URL I tried returned 404. Verify on Meta's Transparency Center before quoting. The older [Instagram Feed ranking system card](https://ai.meta.com/tools/system-cards/instagram-feed-ranking/) dates from 2022.
- Hashtags: when Instagram capped hashtags at **5 per post/Reel (announced Dec 18, 2025)**, Mosseri said hashtags help search but "do not increase your reach." — [Business Today](https://www.businesstoday.in/technology/news/story/no-more-hashtag-stuffing-instagram-limits-hashtag-usage-to-just-5-per-reel-and-post-507444-2025-12-19); [Social Media Today](https://www.socialmediatoday.com/news/instagram-implements-new-limits-on-hashtag-use/808309/)

**TikTok [OFFICIAL]**
- TikTok's official explainer (June 2020, still the canonical newsroom post) names three signal groups: **user interactions** (likes, shares, comments, accounts followed, watching a video in full), **video information** (captions, sounds, hashtags) and **device/account settings** (language, country, device type), weighted by strength. The post states that follower count and an account's past high-performing videos are **not direct factors**. Note: the follower-count wording is from my own knowledge of the post. I did not re-open it this session. — [TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/) (2020, older)
- "Not interested" (long-press) is an explicit negative signal. TikTok says it will "limit how much of that content we recommend." — [TikTok Transparency: recommendation system](https://www.tiktok.com/transparency/recommendation-system/)

**YouTube / Shorts [OFFICIAL]**
- YouTube Help's "How YouTube recommendations work" lists these signals: watch history, search history, subscriptions, likes (positive), and dislikes, "Not interested" and "Don't recommend channel" (negative). It also lists **satisfaction surveys**, used to measure satisfaction "not just watch time." The Shorts feed is "personalized to reflect what we think you want to see next," and the page gives no Shorts-specific signal list. — [YouTube Help](https://support.google.com/youtube/answer/16089387?hl=en)
- YouTube Studio exposes a Shorts metric, **"Viewed vs. swiped away"** ("How many chose to view"). Third-party guides treat it as a key ranking input, but one analysis notes YouTube "has not said this exact number is the ranking signal." — [OutlierKit](https://outlierkit.com/resources/youtube-shorts-algorithm/); [vidIQ](https://vidiq.com/blog/post/youtube-shorts-algorithm/)
- **Measurement change:** from **Mar 31, 2025**, a public Shorts "view" counts every start or replay, with no minimum watch time. The old metric was renamed **"engaged views"**, and YPP monetization still uses engaged views. Before/after comparisons across that date are not like-for-like. — [TechCrunch](https://techcrunch.com/2025/03/26/youtube-is-changing-how-youtube-shorts-views-are-counted); [Tubefilter](https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/)

**Leaks and journalism [INDEPENDENT]** (older, flagged)
- NYT, Dec 2021: an internal "TikTok Algo 101" document described optimizing for user value, retention and time spent, using likes, comments, playtime and whether a video was played. — [NYT](https://www.nytimes.com/2021/12/05/business/media/tiktok-algorithm.html) (2021, cited from memory, not re-fetched)
- Forbes, Jan 2023: TikTok staff could manually "heat" selected videos into For You, so some virality was hand-picked. — [Forbes](https://www.forbes.com/sites/emilybaker-white/2023/01/20/tiktoks-secret-heating-button-can-make-anyone-go-viral/) (2023, cited from memory, not re-fetched)
- Research: explicit "Not interested" reduces unwanted content more than implicit skipping. — [arXiv 2605.10690 (2026)](https://arxiv.org/html/2605.10690). Users still struggle to stop unwanted content. — [ICWSM paper](https://ojs.aaai.org/index.php/ICWSM/article/view/42688)

### Inferences
- Across all three platforms, the officially named signal everyone shares is **watch behaviour**: completion, rewatch and "didn't swipe away." The second shared signal is a **share/send**.
- For reaching **non-followers** on Instagram specifically, the official guidance points to content people DM to a friend.
- **Saves** are widely called a top signal, but no 2025-2026 official ranking statement names them in the top tier. They appear in Meta's older system cards. Treat "saves are the #1 signal" as **folklore**.
- Claims like "sends are weighted 3-5x likes" have no primary source. **[FOLKLORE]**

### Gaps
- I could not open Meta's current Reels system card (404). The exact prediction list and its date (blogs claim Nov 2025) are unverified.
- I found no 2025-2026 TikTok document updating the 2020 explainer with weights.
- I found no on-record statement from YouTube's Todd Beaupre or Todd Sherman on Shorts ranking this session.

## 2. How does initial test distribution work for small/new accounts? Does early velocity matter?

### Takeaway
Officially, TikTok says follower count is not a direct ranking factor, and Instagram built **Trial Reels** (launched Dec 2024) to show content to non-followers first. The popular idea that every post is shown to a fixed "first batch of ~200-500 people" and then expanded or killed is a reasonable description of how these systems behave. However, **no platform documents specific batch sizes or time windows.**

### Cited Findings
- TikTok: follower count and past hits are not direct factors (see Q1), so new accounts can reach the For You feed. — [TikTok Newsroom 2020](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/) **[OFFICIAL, older]**
- Instagram Trial Reels launched **December 2024**. A trial reel is shown **only to non-followers** and does not appear on the grid or in followers' feeds. — [Social Media Today](https://www.socialmediatoday.com/news/instagram-launches-trial-reels-for-audience-sampling/735136/); [Business Standard](https://business-standard.com/technology/tech-news/instagram-introduces-trial-reels-feature-what-it-is-how-it-works-more-124121100429_1.html) **[OFFICIAL via press]**
- Trial Reels details from vendor blogs, which conflict and are unconfirmed by Meta: a ~72-hour evaluation window (others say 24-72h), an "Auto" option that shares to followers if the reel performs well, a 1,000-follower eligibility threshold (contested), and API/scheduler support added around Dec 2025 (Metricool documents publishing Trial Reels). — [Planoly](https://www.planoly.com/blog/are-instagram-trial-reels-worth-it); [Storrito](https://storrito.com/resources/how-instagram-trial-reels-work-72-hours/); [Metricool help](https://metricool-onxkr.hc.ferndesk.com/how-to-publish-instagram-trial-reels-in-metricool-w0qdj) **[INDEPENDENT/vendor, mixed]**
- YouTube Shorts: third-party guides say a new Short is shown to a small test audience first, and its viewed-vs-swiped rate plus average view duration decide expansion. Their "75-80% viewed" targets are heuristics, and one source says no official threshold exists. — [vidIQ](https://vidiq.com/blog/post/youtube-shorts-algorithm/); [bytecap research](https://www.bytecap.io/research/youtube-shorts-retention-benchmarks) **[INDEPENDENT/FOLKLORE]**

### Inferences
- "Early velocity," meaning engagement in the first hour, matters only insofar as the first viewers' behaviour feeds the next round of distribution. There is no evidence of a hard "first 30/60 minutes or it's dead" rule. Recommendation systems also re-surface older content: Shorts and TikToks often take off days later. **[FOLKLORE for fixed windows]**
- For a small account with near-zero Instagram reach, Trial Reels are the one **officially designed** non-follower test mechanism, if the account is eligible.

### Gaps
- I found no official batch sizes, test windows or velocity thresholds for any platform.
- Meta help-center confirmation of the Trial Reels auto-share behaviour and the follower threshold was not retrieved.

## 3. Third-party schedulers / API posting vs native, and trending sounds via API

### Takeaway
There is **no credible evidence of an algorithmic penalty** for posting through schedulers. The existing tests show no difference, but they are small and run by vendors with a conflict of interest. The real, **documented** difference is functional on TikTok: API-posted videos have **restricted music access** (Metricool says only around the top 100 trending tracks are available), business accounts have a reduced commercial library, and videos can be **muted after publishing**. Things added only in the app (some sounds, in-app text, stickers, effects) can't be added via API.

### Cited Findings
- Buffer's 200+ post / 35-profile test (Facebook, Twitter, LinkedIn) found no significant reach or engagement difference between third-party and native posts. **2015, older, not TikTok/IG.** — [Buffer](https://buffer.com/resources/3rd-party-facebook/); [Buffer experiment](https://blog.bufferapp.com/3rd-party-social-media-tools) **[INDEPENDENT, vendor, old]**
- In an April 2025 Instagram test, Hootsuite found scheduled posts got 8.19% engagement vs 6.44% for native posts, with higher reach. The sample was very small and the vendor has an obvious interest. — [Hootsuite](https://blog.hootsuite.com/experiment-third-party-scheduling-instagram/) **[INDEPENDENT, weak]**
- Buffer's current position is that the penalty myth is "debunked" but marketers should test both. — [Buffer](https://buffer.com/resources/scheduled-posts/)
- Metricool advises **manual publishing** if you need sounds outside TikTok's Top 100 trending songs. The manual flow sends a phone notification so you can finish the post in-app with the full Commercial Music Library. — [Metricool help](https://help.metricool.com/en/article/schedule-and-post-on-tiktok-pl1qpr/); [Metricool: add music](https://help.metricool.com/how-to-add-music-to-your-tiktok-posts-from-metricool-kap4e) **[OFFICIAL vendor docs]**
- TikTok **business accounts** have a smaller commercial music library. Copyrighted music can be muted, and validation happens at API publish time, so a video can go live **without sound**. — [Metricool: posted without sound](https://help.metricool.com/en/article/why-was-my-tiktok-video-posted-without-sound-10s29rq/)
- "Trending sounds help TikTok categorize and recommend your video to users who engage with that audio" is a Metricool marketing claim, not measured data. — [Metricool](https://metricool.com/tiktok-sounds) **[FOLKLORE-adjacent]**. TikTok's own explainer does list "sounds" among video-information signals. — [TikTok Newsroom 2020](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)
- Meta's Reels predictions reportedly include whether you will **reuse the audio** (secondary, snippet only; see Q1). This implies the audio track is a modelled object on Instagram too.

### Inferences
- "Schedulers get shadowbanned" is **[FOLKLORE]**: no platform has said so and the weak data shows no effect.
- The practical risk is losing in-app features. On TikTok, a trending sound attached in-app links the video to that sound's page and audience, while API posts are limited or may be muted. On a business account, a muted video or a generic audio track may underperform for reasons unrelated to any "API penalty."

### Gaps
- No large, independent 2024-2026 study of native vs API reach on TikTok or Reels exists.
- TikTok's own Content Posting API docs on attaching trending audio were not retrieved.

## 4. Do photo carousels / photo mode get distributed differently from video (2025-2026)?

### Takeaway
On **TikTok, video beats photo posts on views by a wide margin** in the largest 2025-2026 dataset, and photo-post performance fell year over year as volume surged. On **Instagram, Reels get more reach but carousels get higher engagement rates**, and Instagram's ranking explicitly models carousel swipe-through. Smaller vendor studies showing carousels "winning" usually measure engagement *rate*, not reach.

### Cited Findings
- **Metricool, 2.31M TikTok posts, 92k+ accounts, Jan-Feb 2025 vs Jan-Feb 2026:** videos earned **5.6x more views and 7.8x more interactions** than image/carousel posts. Image/carousel publishing rose about 140% YoY, while their views fell over 23%, reach about 20%, interactions 62% and engagement rate 50%. Overall TikTok per-post views fell 31% YoY. Tiny/small accounts held or improved engagement rate. — [Net Influencer on Metricool report (Jun 16, 2026)](https://www.netinfluencer.com/tiktok-content-volume-up-nearly-80-percent-in-early-2026-as-per-post-performance-declined-report-finds/) **[INDEPENDENT, large]**
- **Buffer 2026 (millions of posts):** TikTok video median engagement rate was 3.39% vs 1.92% for carousels/photos (video +77%). — [Buffer](https://buffer.com/resources/data-best-content-format-social-media/) **[INDEPENDENT, large]**
- **Buffer, Instagram:** median engagement rate (as % of reach) was carousels 6.9%, single images 4.4%, Reels 3.3%. On reach (4M+ posts, Jan 2022-Oct 2024), Reels got **1.36x the reach of carousels** and **2.25x the reach of single images**. — [Buffer](https://buffer.com/resources/data-best-content-format-social-media/)
- Fanpage Karma found carousel reach only about 3% above video, with an engagement rate around 81% higher (cross-platform, window unclear). — [Fanpage Karma](https://www.fanpagekarma.com/insights/carousel-vs-video-performance-tiktok-instagram/) **[INDEPENDENT, smaller]**
- A TTCalculator page claims a 15-35% higher engagement rate for carousels on accounts under 100K and "no reduced reach." It has no verifiable methodology. — [ttcalculator](https://ttcalculator.net/guides/growth/tiktok-photo-carousel-engagement/) **[FOLKLORE-grade]**
- Instagram's Feed ranking reportedly predicts "swipe through the whole carousel" (secondary; see Q1). Since about 2022 Instagram re-shows carousels with a different first slide to people who skipped them. This is from my background knowledge, not verified this session.
- Instagram's originality enforcement reportedly extended to **photos and carousels** in 2026 (snippet only; see Q7).

### Inferences
- On TikTok, photo mode is **not penalized as such** (no official statement exists either way), but it competes in a much smaller views pool. It is now flooded with supply, which dilutes per-post views.
- On Instagram, carousels are a reasonable engagement and save/send format, but Reels remain the main non-follower reach format. Carousels can reach non-followers through recommendations, just less often.
- An engagement *rate* advantage for carousels often reflects a smaller, warmer audience: the denominator is smaller.

### Gaps
- No platform has officially said whether photo posts are eligible for the same For You / Reels-tab inventory as video.
- I found no 2025-2026 study isolating photo-mode reach for small accounts on TikTok.

## 5. Posting frequency/cadence and posting time

### Takeaway
The best available data (Buffer, using within-account fixed-effects models) says **posting more raises average views per post on TikTok and growth on Instagram, with diminishing returns**. The gain comes mainly from more chances at an outlier hit, not better typical posts. There is no credible evidence that frequent posting "hurts" or that the algorithm punishes gaps. Posting time has weak, platform-agnostic evidence. YouTube-oriented guides say time of day doesn't matter (unattributed).

### Cited Findings
- **Buffer TikTok study (Oct 8, 2025): 11.4M posts, 150k+ accounts, fixed-effects regression.** Compared with posting 1x/week, views per post were about 17% higher at 2-5/week, 29% higher at 6-10/week and 34% higher at 11+/week. **Median** views were flat (about 460-510) across cadences, while 90th-percentile views rose from about 3.7k to 14.4k. The effect held across account sizes. The author's interpretation is that more posts mean more chances of a viral hit. — [Buffer](https://buffer.com/resources/how-often-should-you-post-on-tiktok/) **[INDEPENDENT, strong methodology]**
- **Buffer Instagram (2M+ posts, ~102k accounts):** 3-5 posts/week roughly doubled follower growth vs 1-2/week, with diminishing returns beyond 5. — [Buffer](https://buffer.com/resources/how-often-to-post-on-instagram/) **[INDEPENDENT]**
- Buffer also found consistent posting linked to about 5x more likes, comments and shares. — [Buffer consistent-posting study](https://buffer.com/resources/consistent-posting-study/) (correlational; snippet only)
- Mosseri has repeatedly advised quality over volume, but I found no 2025-2026 on-record figure from him. A YouTube-oriented Buffer guide says time of day doesn't affect Shorts performance (unattributed). — [Buffer Shorts guide (2023)](https://buffer.com/resources/youtube-shorts-algorithm/) **[unattributed]**

### Inferences
- The "posting twice a day kills reach / cannibalizes your own posts" folklore is **not supported** at the averages level. Buffer's within-account data show views per post rising with frequency. A real but undocumented risk is lower-quality or near-duplicate posts lowering per-post watch signals (and, on TikTok, unoriginal/repetitive content rules; see Q7).
- Posting time mainly affects the size of the initial follower audience. For non-follower-driven feeds it is a second-order factor. Vendor "best time" heatmaps are aggregate correlations. **[weak evidence]**

### Gaps
- I found no official statement from any platform on optimal frequency.
- I found no rigorous 2025-2026 study of posting time on Shorts or Reels for small accounts.

## 6. Search/SEO on TikTok and YouTube; Instagram originality and sends per reach

### Takeaway
TikTok's official explainer lists captions, sounds and hashtags as video-information signals. The widely repeated claim that TikTok also indexes **on-screen text (OCR) and spoken words (speech-to-text)** for search is plausible, since TikTok auto-generates captions, but it comes only from SEO vendors in my searches. On Instagram, keywords in captions help search, and hashtags (now capped at 5) "help search" but don't raise reach, per Mosseri. Instagram's official push is toward **originality** and **sends per reach** for non-follower distribution.

### Cited Findings
- TikTok lists captions, sounds and hashtags as content signals. — [TikTok Newsroom 2020](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/) **[OFFICIAL, older]**
- SEO vendors claim TikTok search reads captions, on-screen text (OCR), spoken audio (ASR) and hashtags, and recommend repeating the target keyword across all of them. One vendor's weights (spoken "very high," caption "high," hashtag "medium") are unsourced. Creator Search Insights is TikTok's native keyword tool. — [SocialKit](https://socialk.it/en/blog/tiktok-seo-guide); [Darkroom](https://www.darkroomagency.com/observatory/tiktok-seo); [SEO Sherpa](https://seosherpa.com/tiktok-search-engine/) **[INDEPENDENT/vendor; unverified against TikTok]**
- Instagram hashtags: capped at 5 (Dec 2025). Mosseri says they help search, not reach. A Fanpage Karma correlation found 5 hashtags gave about +2% reach vs none. — [Business Today](https://www.businesstoday.in/technology/news/story/no-more-hashtag-stuffing-instagram-limits-hashtag-usage-to-just-5-per-reel-and-post-507444-2025-12-19); [Fanpage Karma](https://www.fanpagekarma.com/insights/?p=3917)
- Sends per reach: officially named a key metric, especially for unconnected (non-follower) reach. — [Social Media Today, Jan 2025](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/) **[OFFICIAL]**
- YouTube: recommendations use search history and watch history (official). The Shorts feed is personalized, and no Shorts-specific SEO guidance was found in YouTube Help. — [YouTube Help](https://support.google.com/youtube/answer/16089387?hl=en)

### Inferences
- For a wellness niche, search-oriented phrasing ("how to calm anxiety at night") in captions, on-screen text and spoken lines costs nothing and matches the vendor consensus. The weighting claims, though, are **[FOLKLORE]**.
- Alt text: I found no 2024-2026 official statement that alt text affects Reels or carousel distribution. **[unverified]**

### Gaps
- I found no official TikTok or YouTube documentation confirming OCR or speech indexing for search ranking.
- YouTube Shorts title/description weight in Shorts-feed distribution (vs YouTube search) is not documented.

## 7. Penalties: watermarks, reposts/duplicates, AI labels, link in bio, health misinformation

### Takeaway
Penalties that are **documented and real**: Instagram limits recommendation of Reels with **other apps' watermarks** (TikTok/YouTube logos; your own logo is fine) and demotes **reposted/aggregated content** in favour of originals. TikTok makes **unoriginal/reused content ineligible for For You** and can make whole accounts temporarily ineligible after repeated violations. TikTok's For You eligibility standards also exclude **certain misinformation, including health-related claims that may cause harm**. Commonly claimed but **unsupported**: link-in-bio penalties, AI-label penalties (YouTube says AI content can be recommended as broadly as non-AI content), and "shadowbans" for sponsored tags.

### Cited Findings
- **Watermarks (Instagram):** Mosseri said Reels with a TikTok logo still reach followers but are kept out of Explore/recommendations: "What we try to do is not recommend Reels with logos from other apps, but if it's your own logo, don't worry about it." — [Social Media Today (2024)](https://www.socialmediatoday.com/news/instagram-clarifies-that-including-your-own-logo-on-a-reel-is-ok/730852/) **[OFFICIAL]**
- **Sponsored tags:** Instagram says Paid Partnership labels do not reduce reach. — [Social Media Today](https://www.socialmediatoday.com/news/instagram-says-that-it-does-not-reduce-the-reach-of-sponsored-content/732615/) **[OFFICIAL]**
- **Originality (Instagram):** since April 2022, Instagram ranks original content above reposts and down-ranks aggregator accounts (older). — [Engadget](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html); [Tubefilter](https://www.tubefilter.com/2022/04/21/instagram-adam-mosseri-algorithm-change-original-content/). Per an April 2026 report (snippet only, page returned 403), the originality review looks at an **account's posting over a month**. Mosseri told aggregators to "remix the content... Make it your own," and enforcement reportedly extended to photos and carousels. — [PetaPixel, Apr 30, 2026](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/)
- **Unoriginal content (TikTok):** reused/unoriginal content without creative contribution (e.g. someone else's watermark) is ineligible for For You. One source dates the explicit guideline to **Sep 13, 2025**. — [ConductAtlas: FYF eligibility provision](https://conductatlas.com/platform/tiktok/tiktok-community-guidelines/for-you-feed-eligibility-exclusion/) (secondary; verify on [TikTok's FYF standards](https://www.tiktok.com/community-guidelines/en/fyf-standards))
- **Account-level For You ineligibility (TikTok):** repeat violations of For You standards can make an entire account temporarily ineligible (2024 update). — [Tubefilter, Apr 2024](https://www.tubefilter.com/2024/04/18/tiktok-moderation-problematic-content-accounts-on-for-you-page/); [Yahoo/Variety](https://www.yahoo.com/tech/tiktok-block-users-feed-repeatedly-155549425.html)
- **Health misinformation (TikTok):** TikTok's FYF standards exclude misinformation that "may cause moderate" harm. The snippet was truncated, but this is the tier that covers unproven health claims. — [NY AG TikTok policy report, 2025 Q3 (PDF)](https://ag.ny.gov/sites/default/files/social-media-policy-report/2025-q3-tiktok-inc-policy.pdf) (snippet only)
- **AI content (YouTube):** AI-made videos "can be recommended as broadly as videos made without AI." — [YouTube Help](https://support.google.com/youtube/answer/16089387?hl=en) **[OFFICIAL]**
- **YouTube duplicates:** no Shorts-specific statement retrieved. YouTube's "reused content" monetization policy exists, but I did not verify it this session.

### Inferences
- For wellness content: claims that state cures or causation ("X cures anxiety," "stress causes cancer") are the type of content TikTok's FYF standards target. Hedged, experiential language ("can help," "many people notice") is lower-risk. This matches the existing project rule that health claims must be research-backed.
- **Cross-posting the same file to TikTok, Reels and Shorts** is fine as long as it is your own original content and has **no other platform's watermark**. Re-uploading the *same* video repeatedly on the *same* platform risks the unoriginal/duplicate rules. That last point is an inference, with no platform statement on self-duplicates.
- Link in bio: no evidence of a reach penalty was found. **[FOLKLORE]**

### Gaps
- I could not open TikTok's full FYF eligibility text for health misinformation (the PDF snippet was truncated).
- I found no official Instagram statement on AI-label effects on reach, or on whether "AI info" labels reduce distribution.
- The April 2026 Instagram originality expansion was seen only via search snippets (the PetaPixel page returned 403).
