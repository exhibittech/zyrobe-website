import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

// A page that sets openGraph replaces the root one entirely, so the share image is named here too.
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Zyrobe: your wardrobe, now with a stylist. The Zyrobe wordmark on cream satin beside two app screens.",
};

/** Title, description, canonical + hreflang and share cards for a content page. */
export function contentMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const full = `${title} · Zyrobe`;
  return {
    title,
    description,
    alternates: pageAlternates(path),
    openGraph: { type: "website", url: path, siteName: "Zyrobe", locale: "en_IN", title: full, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: ["/twitter-image.png"] },
  };
}
