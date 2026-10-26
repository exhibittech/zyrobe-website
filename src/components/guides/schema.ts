import type { GuideEntry } from "@/content/guides";
import { GUIDES } from "@/content/guides";
import { SITE_URL } from "@/lib/site";

const ORG = { "@id": `${SITE_URL}/#org` };
export const guideImage = (slug: string) => `/media/guides/${slug}.jpg`;

const crumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path}` })),
});

/** Article + breadcrumbs for one guide. */
export function guideJsonLd(g: GuideEntry) {
  const url = `${SITE_URL}/guides/${g.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.title,
        description: g.description,
        abstract: g.answer,
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}${guideImage(g.slug)}`,
        datePublished: g.updated,
        dateModified: g.updated,
        inLanguage: "en-IN",
        articleSection: g.category,
        author: ORG,
        publisher: ORG,
        isPartOf: { "@type": "CollectionPage", "@id": `${SITE_URL}/guides#collection` },
        ...(g.places?.length ? { contentLocation: g.places.map((name) => ({ "@type": "Place", name })) } : {}),
      },
      crumbs([["Home", "/"], ["Guides", "/guides"], [g.title, `/guides/${g.slug}`]]),
    ],
  };
}

/** The guides index: a collection of every guide. */
export function guidesIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/guides#collection`,
        name: "Zyrobe Guides",
        description: "Practical guides on what to wear and what to pack: Indian weddings, festivals, the monsoon, office wear and trips in India and abroad.",
        url: `${SITE_URL}/guides`,
        inLanguage: "en-IN",
        publisher: ORG,
        image: `${SITE_URL}${guideImage("guides")}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/guides/${g.slug}`, name: g.title })),
        },
      },
      crumbs([["Home", "/"], ["Guides", "/guides"]]),
    ],
  };
}
