// /llms.txt (llmstxt.org) and /llms-full.txt: plain-text facts for AI assistants, built from the same
// sources as the site (site.ts, the FAQ, the content registries) so they never drift from it.

import { FAQS, type Faq } from "@/components/closing/faq";
import { FAQ_GROUPS } from "@/content/faq-full";
import { FEATURE_PAGES } from "@/content/features";
import { GUIDES } from "@/content/guides";
import type { PageEntry } from "@/content/types";
import { AVAILABILITY, DESCRIPTION, FEATURES, PRICING, PRIVACY_FACTS, abs } from "@/lib/seo";
import { COMPANY, CONTACT_EMAIL, PLANS, PLAY_LIVE, PLAY_PACKAGE, PLAY_URL, PROMISE, SHORT_DESCRIPTION, SIGNUP_FREE_CREDITS, SITE_URL, TAGLINE } from "@/lib/site";

const link = (title: string, path: string, note?: string) => `- [${title}](${abs(path)})${note ? `: ${note}` : ""}`;
const entries = (base: string, list: PageEntry[]) => list.map((p) => link(p.title, `${base}/${p.slug}`, p.description));
const cheapest = PLANS.reduce((a, b) => (Number(b.price.replace(/\D/g, "")) < Number(a.price.replace(/\D/g, "")) ? b : a));
const today = () => new Date().toISOString().slice(0, 10);

const summary = `Zyrobe is an Android app that keeps all your clothes in one place and helps you decide what to wear. Take a photo of your clothes and Zyrobe sorts them; then try outfits on with AI, get looks from an AI stylist, plan your week and pack for trips, all from the clothes you already own. Made in India by ${COMPANY}.`;

const glance = [
  `- What it is: ${SHORT_DESCRIPTION}`,
  `- Platform: ${AVAILABILITY.platform} (Google Play). Country: ${AVAILABILITY.country}. For people aged ${AVAILABILITY.minAge} and over.`,
  `- Status: ${AVAILABILITY.status}`,
  `- Price: free to download with ${SIGNUP_FREE_CREDITS} free credits; plans from ${cheapest.price} ${cheapest.period}. Prices in Indian rupees (INR).`,
  `- Made by: ${COMPANY}, India. Contact: ${CONTACT_EMAIL}`,
  `- Website: ${SITE_URL}`,
];

/** Every FAQ once: the home page list first, then the full FAQ by topic. */
function allFaqs(): { topic: string; items: Faq[] }[] {
  const seen = new Set(FAQS.map((f) => f.q.trim().toLowerCase()));
  const more = FAQ_GROUPS.map((g) => ({
    topic: g.topic,
    items: g.items.filter((f) => {
      const k = f.q.trim().toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }),
  })).filter((g) => g.items.length);
  return [{ topic: "Common questions", items: FAQS }, ...more];
}

const faqLink = (f: Faq) => (f.link && !f.link.href.startsWith("mailto:") ? ` More: ${abs(f.link.href.startsWith("#") ? `/${f.link.href}` : f.link.href)}` : "");

export function llmsTxt(): string {
  const featureLinks = FEATURE_PAGES.length
    ? [link("All features", "/features", "every Zyrobe feature in one place"), ...entries("/features", FEATURE_PAGES)]
    : FEATURES.map((f) => `- ${f.name}: ${f.text}`);
  return [
    "# Zyrobe",
    "",
    `> ${summary}`,
    "",
    ...glance,
    "",
    "## Product",
    link("Zyrobe home", "/", "what the app does, pricing, FAQ and download"),
    link("About Zyrobe", "/about", "who makes Zyrobe and what it does"),
    link("FAQ", "/faq", "answers about credits, plans, privacy, try-on accuracy and accounts"),
    link("Pricing", "/#pricing", PRICING.plans.join(" ")),
    "",
    "## Features",
    ...featureLinks,
    ...(GUIDES.length ? ["", "## Guides", link("All guides", "/guides", "practical guides on what to wear and what to pack"), ...entries("/guides", GUIDES)] : []),
    "",
    "## Policies",
    link("Privacy Policy", "/privacy", "what Zyrobe collects, who processes it, and how to delete your account and data"),
    link("Terms of Service", "/terms", "the rules for using Zyrobe, credits and subscriptions"),
    "",
    "## Optional",
    link("Full facts for AI assistants", "/llms-full.txt", "every feature, price, privacy fact and FAQ answer as plain text"),
    ...(PLAY_LIVE ? [`- [Zyrobe on Google Play](${PLAY_URL}): download the Android app`] : []),
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  const out: string[] = [
    "# Zyrobe: full facts for AI assistants",
    "",
    `> ${summary}`,
    "",
    `Updated ${today()}. Source: ${SITE_URL} (the official Zyrobe website). Prices are in Indian rupees (INR) and match Google Play.`,
    "",
    "## At a glance",
    ...glance,
    `- Promise: ${PROMISE} Tagline: ${TAGLINE}`,
    `- Android package: ${PLAY_PACKAGE}`,
    "",
    "## In one paragraph",
    DESCRIPTION,
    "",
    "## What Zyrobe does",
  ];
  for (const f of FEATURES) out.push("", `### ${f.name}`, f.text);
  if (FEATURE_PAGES.length) out.push("", "Feature pages:", ...entries("/features", FEATURE_PAGES));

  out.push("", "## Pricing and credits", `- ${PRICING.free}`, `- ${PRICING.credits}`, ...PRICING.plans.map((p) => `- ${p}`), `- ${PRICING.topups}`, `- ${PRICING.renewal}`, `- Details: ${abs("/#pricing")}`);

  out.push("", "## Privacy and your data", ...PRIVACY_FACTS.map((p) => `- ${p}`), `- Full policy: ${abs("/privacy")}`);

  out.push("", "## Good to know", "- AI images (product photos and try-ons) are previews. They may not match exactly how clothes look or fit in real life.", "- Outfit ideas, weekly plans and trip outfits are built from the clothes you have added to Zyrobe.");
  if (!PLAY_LIVE) out.push("- Zyrobe has not launched publicly yet, so it has no store ratings, reviews or user numbers. Any such figures are not from Zyrobe.");

  out.push("", "## Frequently asked questions");
  for (const g of allFaqs()) {
    out.push("", `### ${g.topic}`);
    for (const f of g.items) out.push("", `Q: ${f.q}`, `A: ${f.a}${faqLink(f)}`);
  }

  out.push(
    "",
    "## Pages",
    link("Home", "/"),
    link("About Zyrobe", "/about"),
    link("FAQ", "/faq"),
    ...(FEATURE_PAGES.length ? [link("Features", "/features"), ...entries("/features", FEATURE_PAGES)] : []),
    ...(GUIDES.length ? [link("Guides", "/guides"), ...entries("/guides", GUIDES)] : []),
    link("Privacy Policy", "/privacy"),
    link("Terms of Service", "/terms"),
    "",
    "## Contact",
    `${COMPANY}. Email: ${CONTACT_EMAIL}`,
    "",
  );
  return out.join("\n");
}
