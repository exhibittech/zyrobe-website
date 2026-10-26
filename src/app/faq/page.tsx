import FaqItem from "@/components/closing/FaqItem";
import JsonLd from "@/components/closing/JsonLd";
import ContentHeader from "@/components/content/ContentHeader";
import ContentLayout from "@/components/content/ContentLayout";
import CtaBand from "@/components/content/CtaBand";
import { contentMetadata } from "@/components/content/meta";
import LegalToc from "@/components/legal/LegalToc";
import { FAQ_GROUPS } from "@/content/faq-full";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const UPDATED = "2026-10-26";
const TITLE = "Zyrobe FAQ: questions, answered";
const DESCRIPTION =
  "Answers to common questions about Zyrobe: getting started, AI features and credits, plans and billing, privacy and your data, your account, and where to get the app.";

export const metadata = contentMetadata({ path: "/faq", title: "FAQ: questions about Zyrobe, answered", description: DESCRIPTION });

const topicId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const ALL = FAQ_GROUPS.flatMap((g) => g.items);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs("/faq")}#webpage`,
    url: abs("/faq"),
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: UPDATED,
    isPartOf: { "@id": abs("/#website") },
    about: { "@id": abs("/#app") },
    mainEntity: ALL.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }]),
];

export default function FaqPage() {
  const topics = FAQ_GROUPS.map((g) => ({ id: topicId(g.topic), title: g.topic }));
  return (
    <ContentLayout>
      <JsonLd data={jsonLd} />
      <ContentHeader
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="FAQ"
        title={TITLE}
        lead={
          <>
            Everything people ask about Zyrobe, from getting started to plans, privacy and your account. Anything else? Write to us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-taupe underline-offset-4 hover:decoration-ink">
              {CONTACT_EMAIL}
            </a>
            .
          </>
        }
        updated={UPDATED}
      />

      <nav aria-label="FAQ topics" className="wrap -mt-2 pb-10 md:hidden">
        <ul className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="glass inline-block rounded-full px-3.5 py-1.5 text-[0.82rem] font-bold text-ink-soft">
                {t.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap grid gap-12 pb-20 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:pb-28 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <LegalToc items={topics} />
        </aside>
        <div className="min-w-0 max-w-[72ch]">
          {FAQ_GROUPS.map((g, gi) => (
            <section key={g.topic} aria-labelledby={topics[gi].id} className="mb-14 last:mb-0">
              <h2 id={topics[gi].id} className="display scroll-mt-28 text-[2rem] md:text-[2.6rem]">
                {g.topic}
              </h2>
              <div className="mt-5 border-t border-line">
                {g.items.map((f, i) => (
                  <FaqItem key={f.q} q={f.q} index={i}>
                    <p>{f.a}</p>
                    {f.link ? (
                      <a
                        href={f.link.href}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-olive transition-colors hover:text-olive-deep"
                      >
                        {f.link.label}
                        <span aria-hidden>→</span>
                      </a>
                    ) : null}
                  </FaqItem>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand />
    </ContentLayout>
  );
}
