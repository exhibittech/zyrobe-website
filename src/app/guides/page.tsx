import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import JsonLd from "@/components/closing/JsonLd";
import GuideCard from "@/components/guides/GuideCard";
import { categoryId } from "@/components/guides/GuidePage";
import { guideImage, guidesIndexJsonLd } from "@/components/guides/schema";
import { GUIDES, GUIDE_CATEGORIES, type GuideCategory } from "@/content/guides";

const TITLE = "Guides: what to wear and what to pack";
const DESCRIPTION =
  "Practical guides from Zyrobe: what to wear to an Indian wedding, festive and monsoon outfits, office wear for Indian summers, and packing lists for Goa, Manali, Kerala, Paris and Dubai.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    url: "/guides",
    siteName: "Zyrobe",
    locale: "en_IN",
    title: `${TITLE} · Zyrobe`,
    description: DESCRIPTION,
    images: [{ url: guideImage("guides"), width: 1200, height: 630, alt: "Zyrobe guides" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} · Zyrobe`, description: DESCRIPTION, images: [guideImage("guides")] },
};

const INTRO: Record<GuideCategory, string> = {
  Occasions: "Weddings, festivals and the events in between.",
  Seasons: "Dressing for the Indian summer and the monsoon.",
  Travel: "Packing lists for trips in India and abroad.",
  "Wardrobe basics": "Getting more from the clothes you already own.",
};

export default function GuidesIndex() {
  return (
    <>
      <JsonLd data={guidesIndexJsonLd()} />
      <Nav onHome={false} />
      <main className="bg-cream text-ink">
        <header className="relative isolate overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center opacity-80" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(250_247_242/.15)_0%,rgb(250_247_242/.55)_60%,var(--color-cream)_100%)]" />
          <div className="wrap">
            <p className="eyebrow text-olive">Zyrobe guides</p>
            <h1 className="display mt-4 max-w-[14ch] text-[2.9rem] sm:text-6xl md:text-7xl">
              What to wear, <em className="italic">what to pack.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">
              Practical answers for the questions everyone asks in front of the wardrobe: what to wear to a wedding, how to
              dress for the rains, and what to take on a trip. Written for India, useful anywhere.
            </p>
            <nav aria-label="Guide topics" className="glass mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-[22px] p-1">
              {GUIDE_CATEGORIES.map((c) => (
                <a key={c} href={`#${categoryId(c)}`} className="rounded-full px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink">
                  {c}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="wrap space-y-20 pb-24 md:space-y-24 md:pb-32">
          {GUIDE_CATEGORIES.map((c) => {
            const list = GUIDES.filter((g) => g.category === c);
            if (!list.length) return null;
            return (
              <section key={c} id={categoryId(c)} aria-labelledby={`${categoryId(c)}-title`} className="scroll-mt-28">
                <div className="flex flex-col gap-2 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
                  <h2 id={`${categoryId(c)}-title`} className="display text-4xl md:text-5xl">{c}</h2>
                  <p className="text-ink-soft">{INTRO[c]}</p>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((g) => (
                    <GuideCard key={g.slug} guide={g} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer onHome={false} />
    </>
  );
}
