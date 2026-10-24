# zyrobe.com

Marketing site for **Zyrobe** — *Your wardrobe, now with a stylist.* A scroll-told story that follows the
launch film: the everyday wardrobe questions, the answer, then one chapter per feature (wardrobe, storage,
outfits, try-on, AI stylist, planner, briefcase), pricing and FAQ.

| | |
|---|---|
| Stack | Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, GSAP ScrollTrigger + Lenis, React Three Fiber |
| Hosting | Caddy on the `zyrobe-api` VM (GCP `zyrobe-production`, Mumbai) behind Cloudflare |
| Live | https://zyrobe.com (`/privacy` and `/terms` are still served by the backend) |

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
- Caddy config lives in the backend repo (`zyrobe-backend/deploy/caddy/Caddyfile`, reinstalled by its deploy);
  `deploy/Caddyfile.reference` is a copy. `/_next/static` is cached for a year, `/media` for 7 days, pages revalidate.
- Facts on the site (plans, prices, free credits) come from `src/lib/site.ts`; keep it in sync with
  `zyrobe-backend/deploy/plans.json` and the Play listing.
