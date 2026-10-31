// Search and AI-answer data: metadata defaults, the JSON-LD graph and the facts behind llms.txt.
// Facts only from src/lib/site.ts, the Play listing (play-store-assets/store-listing.txt), the FAQ and
// the privacy policy. No ratings, reviews or user counts: this site publishes none.

import type { Faq } from "@/components/closing/faq";
import {
  COMPANY,
  CONTACT_EMAIL,
  PLANS,
  PLAY_URL,
  PROMISE,
  SHORT_DESCRIPTION,
  SIGNUP_FREE_CREDITS,
  SITE_URL,
  TOPUPS,
  type Plan,
} from "@/lib/site";

export const TITLE = "Zyrobe: wardrobe app for India with AI stylist and try-on";
export const DESCRIPTION =
  "Zyrobe is an Android wardrobe app for India. Add clothes from a photo, try outfits on with AI, get looks from an AI stylist, plan your week and pack for trips.";
// Home-page cluster (the meta keywords tag is ignored by Google; it documents the strategy in docs/seo-keyword-strategy.md).
export const KEYWORDS = [
  "Zyrobe",
  "wardrobe app",
  "AI wardrobe app",
  "wardrobe app India",
  "digital wardrobe app",
  "closet organizer app",
  "AI stylist app",
  "virtual try-on app",
  "outfit planner app",
  "outfit maker app",
  "packing list app",
  "what to wear today",
  "AI outfit ideas from my clothes",
  "wardrobe app for Android",
];

/** Last site-wide content change (sitemap lastmod for pages without their own date). */
export const SITE_UPDATED = "2026-10-26";
export const PRIVACY_UPDATED = "2026-10-23";
export const TERMS_UPDATED = "2026-10-22";

export const abs = (path: string) => (path.startsWith("http") || path.startsWith("mailto:") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);

/** hreflang + canonical for one page (the site is English for India; x-default points to the same URL). */
export const pageAlternates = (path: string) => ({
  canonical: path,
  languages: { "en-IN": path, "x-default": path },
});

export const AVAILABILITY = {
  platform: "Android",
  country: "India",
  minAge: 18,
  status: `Available on Google Play in India: ${PLAY_URL}`,
};

/** What the app does, in the Play listing's words (also the JSON-LD featureList). */
export const FEATURES: { name: string; text: string }[] = [
  {
    name: "Add clothes from a photo",
    text: "Take a photo of a piece of clothing, or pick one from your gallery. Zyrobe removes the background and uses AI to note its type, colour and other details, so your whole wardrobe sits in one place.",
  },
  { name: "AI product photos", text: "Get a clean product photo of any item, made with AI." },
  {
    name: "Storage (find things fast)",
    text: "Note where each item is kept, like a cupboard, a drawer or a suitcase. Add a storage place with a photo, tick the clothes kept there, and find any item quickly.",
  },
  {
    name: "Outfit builder",
    text: "Build outfits from clothes you already own: pick a top and a bottom, arrange them on a free canvas and save the look to My Outfits.",
  },
  {
    name: "AI virtual try-on",
    text: "Add a photo of yourself, pick a top, a bottom or both, and see the look on you before you get dressed. Try-on images are AI previews: they may not match exactly how clothes look or fit in real life.",
  },
  {
    name: "AI stylist",
    text: "Ask the AI stylist what to wear for work, a party, a date or a trip. It picks from the clothes you own, and its ideas consider your style and the weather where you will be.",
  },
  {
    name: "Weekly outfit planner",
    text: "Pick activities for each day of the week (office, meeting, dinner, brunch, event, travel, leisure, shopping, gym, date, casual, formal, or your own). Zyrobe plans an outfit for each day from your own clothes and saves them to your style calendar.",
  },
  {
    name: "Trip packing (Briefcase)",
    text: "Tell Zyrobe where you are going, when, and why: business, vacation or anything in between. It checks the forecast there, plans an outfit for each day of the trip from your own clothes, packs it all in one tap with an essentials checklist, and shares the plan as a PDF.",
  },
  { name: "Wardrobe insights", text: "See simple insights about the clothes you own." },
];

export const CREDIT_USES = ["adding clothes from a photo", "product photos", "try-ons", "the AI stylist", "outfit plans", "trip packing"];

const TERM: Record<string, { label: string; iso: string }> = {
  "per month": { label: "every month", iso: "P1M" },
  "per 6 months": { label: "every 6 months", iso: "P6M" },
  "per year": { label: "every year", iso: "P1Y" },
};
export const rupees = (s: string) => Number(s.replace(/[^\d]/g, ""));
export const planTerm = (p: Plan) => TERM[p.period]?.label ?? p.period;

/** Plain-language pricing, used by llms.txt and the app's JSON-LD offers. */
export const PRICING = {
  free: `Free to download. Every new account gets ${SIGNUP_FREE_CREDITS} free credits.`,
  credits: `AI features use credits: ${CREDIT_USES.join(", ")}.`,
  plans: PLANS.map((p) => `${p.name}: ${p.price} ${p.period}, ${p.credits.toLocaleString("en-IN")} credits ${planTerm(p)}.`),
  topups: `While a plan is active you can buy extra credit packs at ₹7 a credit: ${TOPUPS.map((t) => `${t.credits} credits for ${t.price}`).join(", ")}. Top-up credits stay until you use them and end with your plan.`,
  renewal: "Plans renew automatically until you cancel them in Google Play. Google Play handles payment; Zyrobe never sees card or UPI details.",
};

export const PRIVACY_FACTS = [
  "Your photos are only used to provide the features you ask for. They are never shown to other users, never sold and never used for advertising.",
  "Photos are not used to train AI models.",
  "The app has no advertising, no advertising IDs and no third-party analytics or tracking SDKs.",
  "The zyrobe.com website (not the app) uses Google Analytics, with cookies, to count visits and see how pages are used.",
  "Account data and photos are stored on Google Cloud in the Mumbai region, India. Data is encrypted in transit (HTTPS) and at rest.",
  "AI features are processed by Google (Gemini API) for clothing analysis and outfit suggestions, and RunPod for product photos and try-on images.",
  "Weather uses your approximate city from your IP address; the app does not use GPS or ask for the location permission.",
  "Sign in with Google, Sign in with Apple, or an email and password.",
  `Delete your account at any time in the app: Profile > Personal Information > Delete Account. Without the app, email ${CONTACT_EMAIL} from the account's email address with the subject "Delete my Zyrobe account"; it is done within 30 days and confirmed by email.`,
  "Deleting an account removes everything: account details, all photos, AI results, the wardrobe, plans and trips, and credits and purchase history in Zyrobe. Copies in daily backups are removed within 30 days; nothing is kept after that.",
  "Deleting the account does not cancel a Google Play subscription: cancel it first in Google Play (Payments & subscriptions > Subscriptions). Single items, outfits, try-on looks, storage places and trips can also be deleted one by one.",
  "You can ask to access, correct, export or delete your data; requests are handled in line with applicable law, including India's Digital Personal Data Protection Act, 2023.",
];

/** App screenshots for structured data (checked: clothes and app UI only, no people). */
const SCREENSHOTS: [string, string][] = [
  ["02_wardrobe", "Wardrobe: all your clothes, sorted by type"],
  ["03_outfits", "My Outfits: looks built from your own clothes"],
  ["04_stylist", "AI Stylist: outfit of the day and studio tools"],
  ["your_look", "Your Look: an AI-curated outfit with a stylist note"],
  ["style_plan", "Style Plan: an outfit for each day of the week"],
  ["day_by_day", "Briefcase: day-by-day outfits and packing advice for a trip"],
];
export const SCREENSHOT_URLS = SCREENSHOTS.map(([f]) => `${SITE_URL}/media/screens/${f}.webp`);

const ORG_ID = `${SITE_URL}/#org`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;
const IN = { "@type": "Country", name: "India", identifier: "IN" };

function offers() {
  const base = {
    priceCurrency: "INR",
    eligibleRegion: IN,
    seller: { "@id": ORG_ID },
    availability: "https://schema.org/InStock",
    url: PLAY_URL,
  };
  return [
    { "@type": "Offer", name: "Free download", description: `Includes ${SIGNUP_FREE_CREDITS} free credits for every new account.`, price: "0", ...base },
    ...PLANS.map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      description: `${p.credits} credits ${planTerm(p)}. Renews automatically until cancelled in Google Play.`,
      price: String(rupees(p.price)),
      ...base,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: rupees(p.price),
        priceCurrency: "INR",
        billingDuration: TERM[p.period]?.iso,
      },
    })),
    ...TOPUPS.map((t) => ({
      "@type": "Offer",
      name: `${t.credits} credit top-up`,
      description: "One-time credit pack, available while a plan is active. Credits stay until used and end with the plan.",
      price: String(rupees(t.price)),
      ...base,
    })),
  ];
}

/** Site-wide graph: the company, the website and the app. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Exhibit Technologies",
        legalName: COMPANY,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        brand: { "@type": "Brand", name: "Zyrobe", logo: `${SITE_URL}/icon-512.png` },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT_EMAIL,
          areaServed: "IN",
          availableLanguage: ["en"],
        },
        sameAs: [PLAY_URL],
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: "Zyrobe",
        url: SITE_URL,
        description: SHORT_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
        about: { "@id": APP_ID },
      },
      {
        "@type": "MobileApplication",
        "@id": APP_ID,
        name: "Zyrobe",
        alternateName: "Zyrobe: AI wardrobe and stylist",
        url: SITE_URL,
        description: DESCRIPTION,
        slogan: PROMISE,
        operatingSystem: "Android",
        applicationCategory: "LifestyleApplication",
        applicationSubCategory: "Wardrobe organiser and outfit planner",
        countriesSupported: "IN",
        inLanguage: "en",
        typicalAgeRange: "18-",
        isAccessibleForFree: true,
        featureList: FEATURES.map((f) => f.name),
        image: `${SITE_URL}/opengraph-image.png`,
        screenshot: SCREENSHOTS.map(([f, caption]) => ({
          "@type": "ImageObject",
          url: `${SITE_URL}/media/screens/${f}.webp`,
          caption,
          width: 720,
          height: 1558,
        })),
        publisher: { "@id": ORG_ID },
        author: { "@id": ORG_ID },
        offers: offers(),
        installUrl: PLAY_URL,
        downloadUrl: PLAY_URL,
        sameAs: [PLAY_URL],
      },
    ],
  };
}

/** BreadcrumbList for an inner page, e.g. [{ name: "Guides", path: "/guides" }, { name: "Goa", path: "/guides/goa" }]. Home is added first. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: "Zyrobe", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** FAQPage for a list of questions (answers as plain text). */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
