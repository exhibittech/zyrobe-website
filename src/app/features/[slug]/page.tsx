import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/closing/JsonLd";
import Article from "@/components/content/Article";
import ContentHeader from "@/components/content/ContentHeader";
import ContentLayout from "@/components/content/ContentLayout";
import CtaBand from "@/components/content/CtaBand";
import DataTable from "@/components/content/DataTable";
import FeatureCards from "@/components/content/FeatureCards";
import QaList from "@/components/content/QaList";
import Shots from "@/components/content/Shots";
import { contentMetadata } from "@/components/content/meta";
import Phone from "@/components/ui/Phone";
import PlayButton from "@/components/ui/PlayButton";
import { FEATURES, FEATURES_UPDATED, featureBySlug, type Feature } from "@/content/features";
import { abs, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = featureBySlug((await params).slug);
  if (!f) return {};
  return contentMetadata({ path: `/features/${f.slug}`, title: f.title, description: f.description });
}

function jsonLd(f: Feature) {
  const url = abs(`/features/${f.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: f.title,
      description: f.description,
      inLanguage: "en-IN",
      dateModified: FEATURES_UPDATED,
      isPartOf: { "@id": abs("/#website") },
      about: { "@id": abs("/#app") },
      primaryImageOfPage: { "@type": "ImageObject", url: abs(f.shots[0].src), caption: f.shots[0].alt },
    },
    breadcrumbJsonLd([
      { name: "Features", path: "/features" },
      { name: f.name, path: `/features/${f.slug}` },
    ]),
    faqJsonLd(f.faqs),
  ];
}

export default async function FeaturePage({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) notFound();

  const label = f.name.startsWith("AI") ? f.name : f.name.toLowerCase();
  const creditsTitle = `Does the ${label} use credits?`;
  const faqTitle = `Questions about the ${label}`;
  const toc = [
    ...f.sections.map((s) => ({ id: s.id, title: s.heading })),
    { id: "credits", title: creditsTitle },
    { id: "questions", title: faqTitle },
  ];

  return (
    <ContentLayout>
      <JsonLd data={jsonLd(f)} />
      <ContentHeader
        crumbs={[
          { name: "Features", path: "/features" },
          { name: f.name, path: `/features/${f.slug}` },
        ]}
        eyebrow={f.name}
        title={f.title}
        lead={f.lead}
        updated={FEATURES_UPDATED}
        actions={
          <>
            <PlayButton />
            <Link href="/features" className="text-sm font-bold text-ink-soft underline decoration-taupe underline-offset-4 transition-colors hover:text-ink">
              All features
            </Link>
          </>
        }
        aside={<Phone src={f.shots[0].src} alt={f.shots[0].alt} priority style={{ "--phone-w": "clamp(220px, 21vw, 280px)" } as CSSProperties} />}
      />

      <Article toc={toc}>
        {f.sections.map((s, i) => (
          <section key={s.id} aria-labelledby={s.id}>
            <h2 id={s.id}>{s.heading}</h2>
            {s.paras?.map((p) => <p key={p}>{p}</p>)}
            {s.steps ? (
              <ol>
                {s.steps.map((st) => (
                  <li key={st}>{st}</li>
                ))}
              </ol>
            ) : null}
            {s.list ? (
              <ul>
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : null}
            {s.table ? <DataTable head={s.table.head} rows={s.table.rows} /> : null}
            {i === 1 ? <Shots shots={f.shots} firstOnDesktop={false} /> : null}
          </section>
        ))}
        {f.sections.length < 2 ? <Shots shots={f.shots} firstOnDesktop={false} /> : null}

        <section aria-labelledby="credits">
          <h2 id="credits">{creditsTitle}</h2>
          {f.credits.paras.map((p) => <p key={p}>{p}</p>)}
          <DataTable head={["What you do", "Credits"]} rows={f.credits.rows} numeric caption={`Credits used by the ${f.name}`} />
          <p>
            Every new account gets free credits, and plans add more. <Link href="/#pricing">See plans and prices</Link>
          </p>
        </section>

        <section aria-labelledby="questions">
          <h2 id="questions">{faqTitle}</h2>
          <QaList items={f.faqs} />
        </section>
      </Article>

      <section aria-labelledby="related" className="border-t border-line bg-paper/50 py-16 md:py-24">
        <div className="wrap">
          <p className="eyebrow text-olive">Keep exploring</p>
          <h2 id="related" className="display mt-4 text-[2.3rem] sm:text-5xl">Related features</h2>
          <div className="mt-10">
            <FeatureCards slugs={f.related} />
          </div>
        </div>
      </section>

      <CtaBand />
    </ContentLayout>
  );
}
