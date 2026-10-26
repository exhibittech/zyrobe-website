import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePage from "@/components/guides/GuidePage";
import { guideImage } from "@/components/guides/schema";
import { GUIDES, guideBySlug } from "@/content/guides";
import { pageAlternates } from "@/lib/seo";
import { GUIDE_BODIES } from "../_content";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  const path = `/guides/${g.slug}`;
  const image = { url: guideImage(g.slug), width: 1200, height: 630, alt: g.title };
  return {
    title: g.title,
    description: g.description,
    alternates: pageAlternates(path),
    openGraph: {
      type: "article",
      url: path,
      siteName: "Zyrobe",
      locale: "en_IN",
      title: g.title,
      description: g.description,
      images: [image],
      publishedTime: g.updated,
      modifiedTime: g.updated,
      section: g.category,
    },
    twitter: { card: "summary_large_image", title: g.title, description: g.description, images: [image.url] },
  };
}

export default async function Guide({ params }: Props) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  const body = GUIDE_BODIES[slug];
  if (!guide || !body) notFound();
  return <GuidePage guide={guide} body={body} />;
}
