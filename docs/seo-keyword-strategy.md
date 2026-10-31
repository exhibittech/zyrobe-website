# Zyrobe keyword strategy (zyrobe.com)

Written 26 October 2026. Audience: India first (city level), then global English searchers, plus AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews).

Product state to respect in every word: Zyrobe is an Android app for India, 18+, **live on Google Play** (since October 2026). We never claim ratings, user counts, awards or "best". Sources of truth for facts: `src/lib/site.ts`, `src/components/closing/faq.ts`, `src/content/*.ts`, `../play-store-assets/store-listing.txt`.

## 1. What this is based on (and what it is not)

- **No search-volume tool was available.** Nothing below has a volume number. "Competition" and "demand" are judgements from who ranks, how the query is phrased and how many apps and retailers target it. Treat them as hypotheses and replace them with Search Console data once the site has impressions (section 9).
- The web search tool used for research is US-only, so Indian result pages could not be observed directly. India-specific claims come from the Indian sites that did surface (Aza Fashions, Libas, Kaash, Skyscanner India, Tata Neu, Croma, Google India blog, Drapis on Product Hunt) and from reasoning about intent.
- Competitor title tags and meta descriptions were read directly from their home pages on 26 Oct 2026 (table below). Their claims (user counts, "best") are theirs, not ours, and we repeat none of them.

### What competitors target

| App | `<title>` (verbatim) | Terms it is going after |
|---|---|---|
| Whering | Whering \| The Social Wardrobe & Styling App – Whering | social wardrobe, styling app, free |
| Indyx | Catalog, Style, Resell Your Closet \| Indyx | catalog closet, resell, human stylists |
| GetWardrobe | GetWardrobe - AI Wardrobe App \| Outfit Ideas | AI wardrobe app, outfit ideas, free |
| Cladwell | Cladwell — meet your stylist | capsule wardrobe, stylist (weak keyword targeting) |
| Alta | Alta \| Your personal AI stylist that truly gets you | AI stylist, closet, weather, special events |
| Pureple | Pureple \| AI Outfit Planner and Closet Organizer | AI outfit planner, closet organizer, virtual try-on |
| Acloset | Acloset — Your AI-Powered Smart Closet | smart closet, AI outfit picks, virtual try-on |
| Drapis (India) | (Product Hunt listing) | AI stylist built for Indian wardrobes (sarees, kurtas, lehengas, sherwanis); very small |

Reading of the market:

1. **Head terms ("wardrobe app", "closet app", "outfit planner app") are owned by established apps and roundup articles** (Alta, Indyx, Whering, GetWardrobe and others, plus their own "best closet apps" roundups). A new domain with no links will not rank for these in the first months. They still belong on the home and feature pages because that is what the product is, and because AI engines read those pages to describe the product, but the traffic plan should not depend on them.
2. **India is thinly served for the app category.** Only one India-specific entrant (Drapis) showed up. Google launched its own virtual try-on inside Search and Shopping in India in December 2025, so "virtual try-on" is now a familiar idea to Indian users, but it is a shopping tool. Zyrobe's angle is different and true: try-on and styling **with clothes you already own**.
3. **The informational "what to wear / what to pack" queries in India are served mostly by clothing retailers** (Aza Fashions, Libas, Kaash, Tata Neu, Jaipur Studio). Their pages end in a product catalogue. A practical guide with fabrics, weather, venue rules and checklists, written without a catalogue to sell, can compete on usefulness and on being quoted by AI answers. This is where Zyrobe can win first.
4. **"AI stylist", "AI outfit generator" and "virtual try-on" are rising phrases**, but unproven for our domain. They are worth owning on the feature pages because the product genuinely does them.
5. **Hinglish / Hindi:** the one Hindi result found was a Devanagari article (Prabhat Khabar); we found no reliable evidence of romanised Hinglish ("aaj kya pehnu") demand worth building for. Decision: the site stays in plain English, which Indian searchers use heavily for fashion and travel ("kurta", "mehendi", "sangeet", "dupatta" are already used on the pages). Revisit with Search Console data (section 9).

## 2. Principles

1. **Win long tail first, convert through the product pages.** Guides capture "what to wear / what to pack" searches; every guide links to the feature that solves the same problem.
2. **One primary keyword per page, never shared.** Secondary keywords may overlap in meaning but are not used as another page's primary (section 5 lists the guardrails).
3. **Answer first.** The first sentence under every H1 answers the page's main question in plain words (this is what AI answer engines quote). H2s are questions or tasks; the first paragraph under each answers it. Tables and short lists carry the facts.
4. **India modifiers where they are true.** "India", "Indian" and city names appear where the page is really about India (festivals, monsoon, office climate, destinations). City names are used as **sections and table rows inside useful guides**, never as swapped-name pages.
5. **No claims we cannot support.** No "best", no ratings or counts, no features we do not have (for example, we do not say the app recognises sarees or specific garments; it notes type and colour). The app is live on Google Play, so "download" and "Play Store" intent belongs on the home page and download sections only; guides stay informational.
6. **Plain voice.** Short sentences, no stuffing. If a keyword makes a sentence worse, the sentence wins.

## 3. Keyword clusters

Intent codes: **I** informational, **C** commercial investigation (comparing apps), **T** transactional (wants the app), **N** navigational (brand).

### A. Head and category terms (home and feature hub)

| Keyword | Intent | Competition (judgement) | Target page |
|---|---|---|---|
| wardrobe app | C | Very high | `/` (primary) |
| AI wardrobe app | C | High | `/` (secondary) |
| wardrobe app India / wardrobe app for Android | C/T | Medium (few Indian entrants) | `/` (secondary) |
| digital wardrobe app | C | High | `/features/digital-wardrobe` (primary) |
| virtual closet app | C | High | `/features/digital-wardrobe` (secondary) |
| closet organizer app | C | High | `/features/clothes-storage-tracker` (primary) |
| wardrobe app features | C | Low | `/features` (primary) |
| zyrobe, zyrobe app | N | None (brand) | `/` and `/about` |

### B. Feature terms

| Keyword | Intent | Competition | Target page |
|---|---|---|---|
| outfit maker app | C | Medium | `/features/outfit-maker` |
| outfit planner app | C | High | `/features/outfit-planner` |
| AI virtual try-on app | C/T | High, rising in India | `/features/ai-virtual-try-on` |
| AI stylist app | C | High | `/features/ai-stylist` |
| what to wear today | I | Very high (weather and fashion sites) | `/features/ai-stylist` (secondary) |
| AI outfit generator, AI outfit ideas from my clothes | C | Medium | `/features/ai-stylist` (secondary) |
| packing list app | C | High | `/features/trip-packing-planner` |
| trip packing planner, travel outfit planner | C | Medium | `/features/trip-packing-planner` (secondary) |

### C. India occasions and seasons

| Keyword | Intent | Competition | Target page |
|---|---|---|---|
| what to wear to an Indian wedding | I | High (retailer blogs) | `/guides/indian-wedding-guest-outfits` |
| haldi / mehendi / sangeet outfit ideas | I | High | same page (sections), secondary |
| Diwali outfit ideas | I | High, seasonal (Oct to Nov) | `/guides/diwali-festive-outfit-planning` |
| what to wear in monsoon (India) | I | Medium | `/guides/monsoon-wardrobe-guide` |
| summer office wear India | I | High | `/guides/office-wear-indian-summer` |
| capsule wardrobe for office | I | Medium | same page (secondary); a full India capsule guide is on the backlog |

### D. Travel and destinations

| Keyword | Intent | Competition | Target page |
|---|---|---|---|
| Goa packing list | I | High (travel sites) | `/guides/goa-packing-list` |
| Manali winter packing list | I | High, seasonal (Nov to Feb) | `/guides/manali-shimla-winter-packing-list` |
| Kerala packing list | I | Medium | `/guides/kerala-packing-list` |
| Paris packing list | I | Very high (global) | `/guides/paris-packing-list` (the India angle is the differentiator) |
| Dubai packing list | I | High | `/guides/dubai-packing-list` ("from India" is the differentiator) |

### E. Wardrobe basics

| Keyword | Intent | Competition | Target page |
|---|---|---|---|
| how to organise your wardrobe | I | High (furniture and home brands) | `/guides/organise-your-wardrobe` |

### F. Question-style long tail (for AI answers)

These are phrased the way people ask a chatbot. Almost all are already answered by an H2 plus a first-sentence answer; the table says where.

| Question | Where it is answered |
|---|---|
| What is a digital wardrobe? | `/features/digital-wardrobe`, "What is a digital wardrobe?" |
| Can AI tell me what to wear from my own clothes? | `/features/ai-stylist`; home FAQ (new) |
| How accurate is AI virtual try-on? What photo works best? | `/features/ai-virtual-try-on`; home FAQ |
| How do I plan my outfits for the week? | `/features/outfit-planner` |
| How do I pack for a trip based on the weather? | `/features/trip-packing-planner`; home FAQ (new) |
| Is Zyrobe free? How do credits work? Are my photos private? | `/faq` and home FAQ |
| What should I wear to a haldi, mehendi or sangeet? What colours should a guest avoid? | `/guides/indian-wedding-guest-outfits` |
| What is safe to wear around diyas and crackers? | `/guides/diwali-festive-outfit-planning` |
| Which fabrics are best for the monsoon? | `/guides/monsoon-wardrobe-guide` |
| What should I wear to office in the Indian summer? How do I dress for an air-conditioned office? | `/guides/office-wear-indian-summer` |
| Can I rent snow clothes in Manali? | `/guides/manali-shimla-winter-packing-list`, "Can I rent snow clothes there?" |
| What should I wear to temples in Kerala? What is the dress code in Dubai? | the Kerala and Dubai guides |
| How do I organise a small or shared wardrobe? | `/guides/organise-your-wardrobe` |
| What is the best wardrobe app in India? | **Not answered.** We will not claim "best". Backlog item: a neutral "how to choose a wardrobe app" guide |

### G. City-level terms (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, Kolkata)

We deliberately do **not** make one page per city. Pages that differ only by the city name are doorway pages, and Google and AI engines both discount them. Instead:

- **Inside existing guides**, a city appears as a row or bullet only where the clothing advice really changes: the office summer guide (Delhi, Mumbai, Hyderabad, Pune, Chennai, Bengaluru, Kolkata) and the monsoon guide (Mumbai, Pune, Delhi, Kolkata, Kerala, Chennai, Bengaluru, Hyderabad). Descriptions of the weather are kept general and are not numeric.
- **One reference page on the backlog** ("What to wear in Indian cities, month by month") will own the head of this cluster.
- **A city gets its own page only** if Search Console shows real demand and we can write at least three things that are true only for that city (for example "Delhi winter office layering: fog, cold mornings, heated offices"). Not before.

## 4. Search intent and the funnel

- **Awareness (guides):** someone planning a wedding outfit or a Goa trip. They do not know Zyrobe. Each guide ends with "How Zyrobe helps", linking to the one to three features that match the task.
- **Consideration (feature pages):** someone comparing apps or asking "can AI do X". These pages state exactly what the feature does, what it costs in credits and what it cannot do (try-ons are AI previews).
- **Brand (home, about, FAQ):** answers "what is Zyrobe, who makes it, is it free, is it safe". These are the pages AI engines cite for brand questions.

## 5. Keyword map (one primary per page)

Titles are written as `title` and shown as `title · Zyrobe` (the home page has no suffix). "Before" titles are kept here so click-through can be compared after the change.

| Page | Primary keyword | Secondary keywords | New title (before the suffix) | Before |
|---|---|---|---|---|
| `/` | wardrobe app | AI wardrobe app; wardrobe app India; wardrobe app for Android | Zyrobe: wardrobe app for India with AI stylist and try-on | Zyrobe — Your wardrobe, now with a stylist. |
| `/features` | wardrobe app features | Zyrobe features; digital wardrobe features | Wardrobe app features: AI stylist, try-on and planner | Features: digital wardrobe, AI stylist and virtual try-on |
| `/features/digital-wardrobe` | digital wardrobe app | virtual closet app; add clothes from a photo; catalogue my clothes | Digital wardrobe app: add your clothes from a photo | Digital wardrobe app: all your clothes in one place |
| `/features/clothes-storage-tracker` | closet organizer app | wardrobe organizer app; clothes storage tracker; wardrobe inventory app | Closet organizer app: know where every item is kept | Clothes storage tracker: know where every item is kept |
| `/features/outfit-maker` | outfit maker app | outfit creator app; create outfits from my clothes; outfit builder | Outfit maker app: build outfits from clothes you own | Outfit maker: build outfits from the clothes you own |
| `/features/ai-virtual-try-on` | AI virtual try-on app | virtual try on clothes app; try on clothes with AI; virtual try-on app India | AI virtual try-on app: try clothes on from your photo | AI virtual try-on: see clothes on you before you wear them |
| `/features/ai-stylist` | AI stylist app | what to wear today; AI outfit generator; AI outfit ideas from my clothes | AI stylist app: outfit ideas from your own clothes | AI stylist: what to wear, from your own wardrobe |
| `/features/outfit-planner` | outfit planner app | weekly outfit planner; plan outfits for the week; outfit calendar | Outfit planner app: plan what to wear this week | Outfit planner: plan what to wear this week |
| `/features/trip-packing-planner` | packing list app | trip packing planner; travel outfit planner; packing list as PDF | Packing list app: plan outfits for every day of a trip | Trip packing planner: outfits for every day of your trip |
| `/guides` | what to wear and what to pack | outfit guides India; packing guides India | What to wear and what to pack: guides for India | Guides: what to wear and what to pack |
| `/guides/indian-wedding-guest-outfits` | what to wear to an Indian wedding | Indian wedding guest outfits; haldi, mehendi and sangeet outfits; wedding guest outfits for men India | What to wear to an Indian wedding: outfits for each function | What to wear to an Indian wedding as a guest |
| `/guides/diwali-festive-outfit-planning` | Diwali outfit ideas | what to wear on Diwali; Diwali outfit planning; festive outfits India | Diwali outfit ideas: plan an outfit for every festive day | How to plan your Diwali and festive season outfits |
| `/guides/monsoon-wardrobe-guide` | what to wear in the monsoon | monsoon wardrobe; monsoon outfits for office; monsoon fabrics; monsoon outfits Mumbai | What to wear in the monsoon: a wardrobe guide for India | Monsoon wardrobe guide: what to wear in the rains |
| `/guides/office-wear-indian-summer` | summer office wear India | summer office outfits for women; capsule wardrobe for office; office wear Delhi summer | Summer office wear in India: a 15-piece capsule wardrobe | Office wear for Indian summers: a small capsule that beats the heat |
| `/guides/goa-packing-list` | Goa packing list | what to pack for Goa; what to wear in Goa; Goa trip clothes | Goa packing list: what to pack for every season | Goa packing list for every season |
| `/guides/manali-shimla-winter-packing-list` | Manali winter packing list | Shimla winter packing list; what to wear in Manali in winter; Himachal winter clothes | Manali and Shimla winter packing list: what to wear in snow | Manali and Shimla winter packing list |
| `/guides/kerala-packing-list` | Kerala packing list | what to wear in Kerala; Munnar packing list; Kerala temple dress code | Kerala packing list: what to pack for backwaters and hills | Kerala packing list: backwaters, beaches and hill stations |
| `/guides/paris-packing-list` | Paris packing list | what to pack for Paris; what to wear in Paris; Paris packing list from India | Paris packing list: what to pack, season by season | What to pack for Paris, season by season |
| `/guides/dubai-packing-list` | Dubai packing list | what to wear in Dubai; Dubai dress code for tourists; Dubai packing list from India | Dubai packing list: what to wear, for travellers from India | Dubai packing list for travellers from India |
| `/guides/organise-your-wardrobe` | how to organise your wardrobe | wardrobe organisation ideas; how to arrange clothes in a wardrobe; organise a small wardrobe | How to organise your wardrobe: a step-by-step guide | How to organise your wardrobe and keep it that way |
| `/about` | about Zyrobe | Zyrobe app; who makes Zyrobe; Exhibit Technologies | About Zyrobe: AI wardrobe app made in India | About Zyrobe: facts, pricing and who makes it |
| `/faq` | Zyrobe FAQ | is Zyrobe free; Zyrobe credits; Zyrobe privacy | Zyrobe FAQ: is it free, credits and photo privacy | FAQ: questions about Zyrobe, answered |
| `/privacy`, `/terms` | not targeted | brand navigational ("Zyrobe privacy policy", "delete Zyrobe account") | Privacy Policy: how Zyrobe handles your photos and data / Terms of Service: accounts, credits and subscriptions | Privacy Policy / Terms of Service |

### Cannibalisation guardrails

- **Home vs digital wardrobe page:** home owns "wardrobe app" and the brand; the feature page owns "digital wardrobe app" and the "add clothes from a photo" task. Home does not explain adding clothes; it links to the feature.
- **Digital wardrobe vs storage tracker:** "closet organizer app" goes to the storage page; the digital wardrobe page never uses it as a heading.
- **Storage tracker vs the organise guide:** the app page is for people looking for a tool; the guide is for people looking for steps. The guide links to the tool, not the other way around in the title.
- **Trip planner vs destination guides:** the feature owns the generic "packing list app" and "trip packing planner"; destination pages own "<place> packing list". Guides link to the planner with the anchor text "trip packing planner".
- **Monsoon guide vs Goa and Kerala monsoon sections:** the sections stay short and link to the monsoon guide.
- **Wedding vs Diwali:** different events, but both mention festive wear; each links to the other with descriptive anchors and neither repeats the other's full advice.

## 6. On-page rules applied

1. **Title:** unique, primary keyword in the first words, 60 characters or fewer before the suffix (verified against the running site with a script that fetches every sitemap URL and prints title and description lengths).
2. **Meta description:** 140 to 160 characters, primary keyword plus a reason to click, unique.
3. **H1 and first paragraph:** H1 = the title on feature pages and guides (the two are the same string in code); the first paragraph defines the thing and answers the main question in its first sentence, in the form "Zyrobe is a [primary keyword] that ...".
4. **Internal links:** guides link to feature pages and to each other with descriptive anchors (never "click here"); feature pages now end with a list of guides that use the feature; features link to related features (already present).
5. **Structured data** (already in place and kept): `MobileApplication`, `FAQPage`, `Article`, `BreadcrumbList`, `CollectionPage`. `llms.txt` and `llms-full.txt` are generated from the same data, so titles and descriptions flow through automatically. All major AI crawlers are allowed in `robots.txt`.
6. **Home FAQ:** added question-style entries ("Can Zyrobe tell me what to wear today?", "Can Zyrobe help me pack for a trip?") and made the first answer say what Zyrobe is in its first sentence.

## 7. New content to create next (prioritised)

Scoring: **Fit** with the product, **Seasonality** (publish before the season starts), **Winnability** for a new domain, **Risk** of being thin or a doorway. Every item must be genuinely useful on its own and link to the matching feature. Dates are approximate; check the festival calendar before publishing.

| # | Page (working title) | Primary keyword | Why it should win | Publish by | Links to |
|---|---|---|---|---|---|
| 1 | What to wear to a winter wedding in North India | winter wedding outfits India | Peak season Nov to Feb. The wedding guide has one paragraph on this; a full page can go deeper (shawls, coats over sarees and lehengas, men's layers, heated vs open-air venues). Retailer blogs rarely cover layering. | Early Nov 2026 | Wedding guide, outfit maker, trip planner |
| 2 | What to wear in Indian cities, month by month (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, Kolkata) | what to wear in India by month | One genuinely useful reference table (city x season: heat, humidity, rain, AC offices, one layer or not). Owns the city-level cluster without doorway pages. Split out a city only if Search Console shows demand. | Dec 2026 | Office, monsoon, packing guides, AI stylist |
| 3 | Thailand packing list for Indian travellers (Bangkok, Phuket, temple dress code) | Thailand packing list | Large outbound market, December holidays, few India-focused answers. Same format as Dubai and Paris. | Mid Nov 2026 | Trip packing planner, Dubai guide |
| 4 | Kashmir winter packing list (Srinagar, Gulmarg) | Kashmir winter packing list | Natural sibling of the Manali page; same layering logic, different gear (pheran, snow boots, heating). Ladakh follows in spring. | Early Dec 2026 | Manali guide, storage tracker |
| 5 | Business casual and office dress codes in India (outfit formulas for men and women) | business casual India | Evergreen, high search habit, many people unsure what "smart casual" means in an Indian office. Complements the summer guide and the week planner. | Jan 2027 | Office guide, outfit planner, AI stylist |
| 6 | Capsule wardrobe for India: how many clothes you need, by climate | capsule wardrobe India | Existing 15-piece office capsule shows the format; a general version by climate zone (hot-dry, hot-humid, mild, cold) with kurtas and ethnic wear included. | Jan 2027 | Digital wardrobe, outfit maker, wardrobe insights |
| 7 | "I have nothing to wear": why it happens and a 10-minute fix | I have nothing to wear | Conversational query that AI engines answer often; the cause (can't see what you own) is exactly what a digital wardrobe solves. Do not quote statistics unless sourced. | Feb 2027 | Digital wardrobe, AI stylist |
| 8 | How to store woollens, silk sarees and off-season clothes | how to store woollen clothes | Practical, India-specific (damp, moths, naphthalene, folding silk). Peaks Feb to Mar and Oct to Nov. Strong tie to the storage tracker. | Feb 2027 | Storage tracker, organise guide |
| 9 | Destination wedding packing list (Udaipur, Jaipur, Goa) | destination wedding packing list | Combines two strong topics (weddings and trips) that this site already covers; a per-function packing grid is something retailers do not give. | Nov 2026 | Wedding guide, trip planner, outfit maker |
| 10 | How to dry clothes in the monsoon at home (flats, balconies, no sun) | how to dry clothes in monsoon | High-intent, India-specific and seasonal. The monsoon guide has a short section; a dedicated page can compare indoor drying methods and fix the musty smell. | May 2027 | Monsoon guide, storage tracker |

More ideas, in rough priority order:

11. A dedicated `/pricing` page (Starter, Pro Wardrobe, Elite Wardrobe, top-ups, what a credit buys; "How much does Zyrobe cost in India?") so pricing questions have their own URL and title. Today it is an anchor on the home page and a section on About.
12. How to choose a wardrobe app: eight questions to ask (a neutral checklist, no ranking, no competitor claims) to give the "best wardrobe app" question an honest home.
13. Navratri and Garba: nine days, a nine-outfit plan (publish about six weeks before; the colour for each day varies by tradition, so the page must say so).
14. What to wear for Durga Puja in Kolkata (pandal hopping, heat and crowds).
15. What to wear on Holi (old clothes, colour stains, what to wash first).
16. Eid outfit planning.
17. Singapore, Bali and Europe (Schengen) packing lists for Indian travellers.
18. Ladakh packing list (altitude, sun, layers), Rajasthan winter packing list, Andaman packing list.
19. How to photograph your clothes for a digital wardrobe app (light, background, angle).
20. A better photo for AI virtual try-on: what to wear, where to stand (a short guide that expands the existing section).
21. Wardrobe audit: the 90-day hanger test and how to decide what to let go.
22. Weekend trip with one bag: a 3-day packing list.

Rules for all new pages:

- Pages must differ in substance, not just the place name. If two pages could be swapped by find-and-replace, merge them.
- Weather and customs: general ("hot and humid", "heavy downpours"), with a line that conditions vary. No invented temperatures or dates.
- Same template as today: answer-first paragraph, question H2s, one table, one checklist, "How Zyrobe helps", related guides.
- Update `src/content/guides.ts` (title, description, answer, related), add the body in `src/app/guides/_content/`, and the sitemap, llms.txt and JSON-LD follow automatically.

## 8. Changelog (what was applied on-page, 26 Oct 2026)

No slugs or URLs changed. No image markup or `alt` text was touched. `Hero.tsx` was not edited.

| File | Change |
|---|---|
| `src/lib/seo.ts` | Home `TITLE`, `DESCRIPTION` (now opens "Zyrobe is an Android wardrobe app for India"), `KEYWORDS` reduced to the 14-term home cluster |
| `src/content/features.ts` | New `title`, `description` and `lead` for all 7 feature pages (primary keyword first, "Zyrobe is a [keyword] ..." opening); storage section opens with "a closet organizer for your phone"; new `guides` field per feature (slugs) |
| `src/app/features/[slug]/page.tsx` | New section "Guides that go well with the [feature]" (descriptive anchor text = guide title); added to the contents list |
| `src/app/features/page.tsx` | H1, meta title, description and lead use "wardrobe app features" |
| `src/content/guides.ts` | New `title`, `description` and `answer` openings for all 10 guides; more city names in `places` for the office and monsoon guides |
| `src/app/guides/page.tsx`, `src/app/guides/[slug]/page.tsx` | Title, description and lead for the hub; hreflang `en-IN` alternates added through `pageAlternates()` like every other page |
| `src/app/guides/_content/*.tsx` | 32 inline links with descriptive anchors (guide to guide, guide to feature); city bullets in the office guide (Mumbai, Kolkata, Hyderabad, Pune added); city rows in the monsoon guide (Pune, Delhi, Chennai, Bengaluru, Hyderabad added) |
| `src/components/guides/blocks.tsx` | New `GuideLink` helper for in-text links (plain `<a>`, same full-page-load behaviour as the rest of the site) |
| `src/components/closing/faq.ts`, `src/content/faq-full.ts` | "What is Zyrobe?" now defines the product in its first sentence; two new answer-first questions ("Can Zyrobe tell me what to wear today?", "Can Zyrobe help me pack for a trip?") on the home page and the FAQ |
| `src/app/about/page.tsx`, `src/app/faq/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Meta title and description (140 to 160 characters); About and FAQ leads open with a direct definition |

**Recommended home H1 (not applied, `Hero.tsx` is locked):** replace the visually hidden text inside the `<h1>` with `Zyrobe: the wardrobe app for India with an AI stylist`, and consider a visually hidden first paragraph, `Zyrobe is an Android wardrobe app for India that keeps all your clothes in one place and helps you decide what to wear.`, so the page opens with the same definition as the FAQ and the meta description.

## 9. How to measure

**Set up (once):** verify zyrobe.com in Google Search Console (domain property) and Bing Webmaster Tools; submit `https://zyrobe.com/sitemap.xml`; keep the GA4 property (G-PLJFE5QS5Q). After launch, add a GA4 event on the Play button so "visit to install intent" can be measured by page.

**Before and after:** the titles in section 5 changed on the date of this document. In Search Console, compare the 28 days before and after for CTR and average position per page (Performance, Pages, filter by page, then Compare).

**Queries to watch** (Performance, Queries; filter Country = India, then repeat with "all countries" for the global English audience). Use "Custom (regex)" filters:

| Group | Regex | What good looks like |
|---|---|---|
| Brand | `zyrobe` | Impressions grow; the home page is the top result for "zyrobe", "zyrobe app", "zyrobe wardrobe app" |
| Category | `wardrobe app\|digital wardrobe\|closet (organi[sz]er\|app)\|virtual closet` | Impressions appear first (low position is normal at the start); watch which of home, digital wardrobe and storage pages Google picks, and check against section 5 |
| Features | `outfit (planner\|maker\|generator\|ideas)\|ai stylist\|virtual try.?on\|try on clothes` | Each feature page shows for its own primary phrase |
| Packing | `packing list\|what to pack\|pack for` | Destination guides get impressions for "<place> packing list"; spot new places people pair with it |
| Occasions | `wedding\|haldi\|mehendi\|sangeet\|diwali\|festive\|navratri\|durga puja` | Seasonal curve: impressions climb 4 to 6 weeks before the festival |
| Weather and office | `monsoon\|rain\|office wear\|summer\|winter` | The monsoon and office guides rank for fabric and city phrases |
| Cities | `mumbai\|delhi\|bengaluru\|bangalore\|chennai\|hyderabad\|pune\|kolkata` | Reveals which cities deserve a deeper section or, later, their own page (see section 3G) |
| Questions | `^(what\|how\|can\|is\|does\|which\|where)\b` | The question-style long tail; these are the queries AI engines also ask |

**Per page, weekly:** impressions, clicks, CTR, average position; a page with high impressions and CTR under about 1% needs a better title or description; position 8 to 20 with growing impressions needs more depth or internal links.

**AI answer engines (no single dashboard exists):**

1. In GA4, look at sessions by source for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`; landing pages tell you what they cite. Many AI visits arrive with no referrer, so treat the count as a floor.
2. Once a month, ask each assistant the same ten questions (examples: "What is Zyrobe?", "Is there a wardrobe app with an AI stylist in India?", "What should I pack for Goa in the monsoon?", "What should I wear to a mehendi?", "What fabrics are best for the monsoon in India?"). Record whether Zyrobe is named, whether a zyrobe.com page is cited, and whether the facts (price, Android, India, live on Google Play) are correct. Wrong facts get fixed in `site.ts`, `faq.ts` and `llms.txt`, then re-checked.
3. Check Google AI Overviews by searching the same questions in an India-located browser; note whether the guides are cited.

**Honest limits:** with a new domain and an unlaunched app, the first 8 to 12 weeks are mostly impressions and indexing, not traffic. Judge success first by indexed pages, impressions on the guide queries, and correct brand facts in AI answers; clicks come after.
