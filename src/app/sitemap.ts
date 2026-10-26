import type { MetadataRoute } from "next";
import { FEATURE_PAGES } from "@/content/features";
import { GUIDES } from "@/content/guides";
import { PRIVACY_UPDATED, SCREENSHOT_URLS, SITE_UPDATED, TERMS_UPDATED } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Real content dates only (a lastmod that changes on every build teaches crawlers to ignore it).
const latest = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), SITE_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 1,
    images: [`${SITE_URL}/opengraph-image.png`, ...SCREENSHOT_URLS],
  };
  const hubs: MetadataRoute.Sitemap = [
    ...(FEATURE_PAGES.length ? [{ url: `${SITE_URL}/features`, lastModified: latest(FEATURE_PAGES.map((p) => p.updated)), changeFrequency: "monthly" as const, priority: 0.9 }] : []),
    ...(GUIDES.length ? [{ url: `${SITE_URL}/guides`, lastModified: latest(GUIDES.map((p) => p.updated)), changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    { url: `${SITE_URL}/about`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  ];
  const features: MetadataRoute.Sitemap = FEATURE_PAGES.map((p) => ({
    url: `${SITE_URL}/features/${p.slug}`,
    lastModified: p.updated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const guides: MetadataRoute.Sitemap = GUIDES.map((p) => ({
    url: `${SITE_URL}/guides/${p.slug}`,
    lastModified: p.updated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const legal: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy`, lastModified: PRIVACY_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: TERMS_UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];
  return [home, ...hubs, ...features, ...guides, ...legal];
}
