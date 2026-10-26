import Link from "next/link";
import JsonLd from "@/components/closing/JsonLd";
import ContentHeader from "@/components/content/ContentHeader";
import ContentLayout from "@/components/content/ContentLayout";
import CtaBand from "@/components/content/CtaBand";
import DataTable from "@/components/content/DataTable";
import FeatureCards from "@/components/content/FeatureCards";
import { contentMetadata } from "@/components/content/meta";
import PlayButton from "@/components/ui/PlayButton";
import { CREDIT_TABLE, FEATURES, FEATURES_UPDATED } from "@/content/features";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import { SIGNUP_FREE_CREDITS } from "@/lib/site";

const TITLE = "Zyrobe features: from the first photo to a packed suitcase";
const DESCRIPTION =
  "What Zyrobe does: a digital wardrobe, a clothes storage tracker, an outfit maker, AI virtual try-on, an AI stylist, a weekly outfit planner and a trip packing planner.";

export const metadata = contentMetadata({ path: "/features", title: "Features: digital wardrobe, AI stylist and virtual try-on", description: DESCRIPTION });

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${abs("/features")}#webpage`,
    url: abs("/features"),
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: FEATURES_UPDATED,
    isPartOf: { "@id": abs("/#website") },
    about: { "@id": abs("/#app") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: FEATURES.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f.title, url: abs(`/features/${f.slug}`) })),
    },
  },
  breadcrumbJsonLd([{ name: "Features", path: "/features" }]),
];

export default function FeaturesPage() {
  return (
    <ContentLayout>
      <JsonLd data={jsonLd} />
      <ContentHeader
        crumbs={[{ name: "Features", path: "/features" }]}
        eyebrow="Features"
        title={TITLE}
        lead="Zyrobe keeps all your clothes in one app and helps you decide what to wear. Here is everything it does, and how each part works."
        updated={FEATURES_UPDATED}
        actions={<PlayButton />}
      />

      <section aria-labelledby="all-features" className="pb-16 md:pb-24">
        <div className="wrap">
          <h2 id="all-features" className="sr-only">All features</h2>
          <FeatureCards headingLevel={3} />
        </div>
      </section>

      <section aria-labelledby="credits" className="border-t border-line bg-paper/50 py-16 md:py-24">
        <div className="wrap grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div>
            <p className="eyebrow text-olive">Credits</p>
            <h2 id="credits" className="display mt-4 text-[2.3rem] sm:text-5xl">Which features use credits?</h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              The AI features use credits. Everything else, like your wardrobe, storage, your own outfits and packing, is free. Every new
              account gets {SIGNUP_FREE_CREDITS} free credits, and if the AI fails, the credits go back to you.
            </p>
            <Link href="/#pricing" className="mt-6 inline-block text-sm font-bold text-ink underline decoration-taupe underline-offset-4 hover:decoration-ink">
              See plans and prices
            </Link>
          </div>
          <DataTable
            head={["AI feature", "Credits"]}
            numeric
            caption="Credits each AI feature uses"
            rows={CREDIT_TABLE.map((c) => [
              <a key={c.feature} href={`/features/${c.feature}`} className="underline decoration-taupe underline-offset-4 hover:decoration-ink">
                {c.action}
              </a>,
              `${c.credits} ${c.credits === 1 ? "credit" : "credits"}`,
            ])}
          />
        </div>
      </section>

      <CtaBand />
    </ContentLayout>
  );
}
