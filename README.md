# zyrobe.com

Marketing site for **Zyrobe** — *Your wardrobe, now with a stylist.* A scroll-told story that follows the
launch film: the everyday wardrobe questions, the answer, then one chapter per feature (wardrobe, storage,
outfits, try-on, AI stylist, planner, briefcase), pricing and FAQ.

| | |
|---|---|
| Stack | Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, GSAP ScrollTrigger + Lenis, React Three Fiber |
| Hosting | Caddy on the `zyrobe-api` VM (GCP `zyrobe-production`, Mumbai) behind Cloudflare |
| Live | https://zyrobe.com (`/privacy` and `/terms` are still served by the backend) |
| Lighthouse (Oct 24) | desktop 96 / 96 / 100 / 100 · mobile 59 / 100 / 100 / 100 (perf / a11y / best practices / SEO) |

## Performance notes

- The WebGL hero only runs on a real GPU: software renderers (SwiftShader, llvmpipe), Data Saver, ≤4 CPU cores or
  ≤3 GB RAM get the still collage, which is also what the server HTML shows first (fast LCP).
- The display font is Noto Serif Display subset to the characters the site uses (`src/fonts`, ~12 KB per style).
  Adding text with new non-Latin-1 characters? Re-subset from the system TTFs with `python3 -m fontTools.subset`.
- Anything that loops forever must pause off screen (see the Download light sweep).

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
```

Section labs (dev only, never exported): `/lab/hero`, `/lab/story`, `/lab/features-a`, `/lab/features-b`, `/lab/closing`.
Screenshots at scroll positions: `node scripts/shot.mjs http://localhost:3000/lab/hero /tmp/hero --at 0,0.5,1 [--vw 390 --vh 844]`.

## Layout

```
src/app/                 layout (fonts, metadata, JSON-LD), page, sitemap/robots/manifest, icons, OG image
src/components/ui/       shared: Nav, Footer, Phone, Chapter (pinned feature scene), PlayButton, SmoothScroll
src/components/sections/ one file per section, in page order
src/components/three/    WebGL hero (satin shader + floating garments)
src/lib/site.ts          every fact shown on the site: plans, prices, credits, contact, Play URL
public/media/            optimized images and app footage (generated, see below)
deploy/                  deploy.sh + the Caddy site block
```

## Media

`public/media` is generated from the launch-film sources (not in this repo, ~1.2 GB):

```bash
python3 scripts/build-assets.py --src ~/Desktop/zyrobe/launch_film/source/assets --play ~/Desktop/zyrobe/play-store-assets
```

**No real person may appear on the site.** The script excludes try-on results, saved looks and the
face-print sweater (also in the outfit-canvas footage). Check any new asset for people before adding it.

## Deploy

```bash
bash deploy/deploy.sh             # build, upload a release, switch `current`, verify https://zyrobe.com/version.json
bash deploy/deploy.sh --rollback  # back to the previous release
```

- Releases live in `/var/www/zyrobe-site/releases/<time>-<sha>`; `current` is a symlink, switched atomically. The last 5 are kept.
- The script checks whether the Google Play listing is public and builds the button as "Get it on Google Play"
  or "Coming soon to Google Play" accordingly. **Re-run it once Google approves the app.**
- Validate Caddy changes as the `caddy` user (`sudo -u caddy caddy validate --config /etc/caddy/Caddyfile`).
  Validating with plain `sudo` creates missing log files owned by root, and the next reload then fails.
- Caddy config lives in the backend repo (`zyrobe-backend/deploy/caddy/Caddyfile`, reinstalled by its deploy);
  `deploy/Caddyfile.reference` is a copy. `/_next/static` is cached for a year, `/media` for 7 days, pages revalidate.
- Facts on the site (plans, prices, free credits) come from `src/lib/site.ts`; keep it in sync with
  `zyrobe-backend/deploy/plans.json` and the Play listing.

## SEO and AI search

- **What crawlers get:** `robots.txt` welcomes search engines and AI assistants by name (Googlebot, Bingbot, GPTBot,
  ClaudeBot, PerplexityBot and others; `src/app/robots.ts`). `sitemap.xml` lists every page with its real last-change
  date, built from the content registries in `src/content/` (`src/app/sitemap.ts`).
- **Structured data:** one JSON-LD graph on every page (Organization, WebSite, MobileApplication with all prices
  in INR) from `src/lib/seo.ts`, which also has `breadcrumbJsonLd`, `faqJsonLd` and `pageAlternates`. No ratings or
  reviews until real ones exist.
- **For AI assistants:** `/llms.txt` (summary and links, llmstxt.org format) and `/llms-full.txt` (every feature,
  price, privacy fact and FAQ answer) are generated at build time from `src/lib/site.ts`, the FAQ and the registries
  (`src/lib/llms.ts`), so they never drift from the site.
- **Every new page** must set `alternates: pageAlternates("/its/path")` in its metadata, or it inherits the home
  page's canonical. Add it to its registry in `src/content/` with a real `updated` date.

Manual follow-ups (need the owner's accounts):

1. **Google Search Console:** add the domain property `zyrobe.com` (verify with a DNS TXT record in Cloudflare),
   or a URL-prefix property verified by the meta tag: build with `NEXT_PUBLIC_GSC_VERIFICATION=<token>`.
   Then submit `https://zyrobe.com/sitemap.xml`.
2. **Bing Webmaster Tools:** import the site from Search Console, or verify with
   `NEXT_PUBLIC_BING_VERIFICATION=<token>` at build time. Submit the sitemap there too (Bing also feeds Copilot
   and DuckDuckGo).
3. **After each deploy:** `bash deploy/indexnow.sh` pings Bing, Yandex and the other IndexNow engines with every URL
   in the live sitemap (or `bash deploy/indexnow.sh /faq /guides/x` for just those pages). The key file is
   `public/91cb96526f95441eb5a9e0bd1ec7b8a5.txt`; keep it in sync with the script.
