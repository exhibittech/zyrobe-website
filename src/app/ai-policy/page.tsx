import JsonLd from "@/components/closing/JsonLd";
import Article from "@/components/content/Article";
import ContentHeader from "@/components/content/ContentHeader";
import ContentLayout from "@/components/content/ContentLayout";
import { contentMetadata } from "@/components/content/meta";
import { AI_POLICY, AI_POLICY_UPDATED, CONTENT_SIGNAL, CONTENT_USAGE } from "@/lib/aiPolicy";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const TITLE = "AI and crawler policy";
const DESCRIPTION =
  "Search engines and AI assistants may crawl, quote, summarise and train on zyrobe.com. What we allow, what we ask, and the signals we publish for crawlers.";

export const metadata = contentMetadata({ path: "/ai-policy", title: "AI and crawler policy for zyrobe.com", description: DESCRIPTION });

const SECTIONS = [
  { id: "allowed", title: "What is allowed?" },
  { id: "asks", title: "What do we ask?" },
  { id: "private", title: "What is not on this website?" },
  { id: "signals", title: "Which signals do we publish?" },
  { id: "contact", title: "How do I reach you?" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs("/ai-policy")}#webpage`,
    url: abs("/ai-policy"),
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: AI_POLICY_UPDATED,
    isPartOf: { "@id": `${abs("/")}#website` },
  },
  breadcrumbJsonLd([{ name: "AI and crawler policy", path: "/ai-policy" }]),
];

const List = ({ items }: { items: string[] }) => (
  <ul>
    {items.map((t) => (
      <li key={t}>{t}</li>
    ))}
  </ul>
);

export default function AiPolicyPage() {
  return (
    <ContentLayout>
      <JsonLd data={jsonLd} />
      <ContentHeader
        crumbs={[{ name: "AI and crawler policy", path: "/ai-policy" }]}
        eyebrow="For search engines and AI"
        title={TITLE}
        lead="Search engines and AI assistants are welcome on zyrobe.com. They may crawl every public page, quote and summarise it in answers, and use it to train AI models."
        updated={AI_POLICY_UPDATED}
      />

      <Article toc={SECTIONS}>
        <section aria-labelledby="allowed">
          <h2 id="allowed">What is allowed?</h2>
          <List items={AI_POLICY.allowed} />
        </section>

        <section aria-labelledby="asks">
          <h2 id="asks">What do we ask?</h2>
          <List items={AI_POLICY.asks} />
        </section>

        <section aria-labelledby="private">
          <h2 id="private">What is not on this website?</h2>
          <List items={AI_POLICY.private} />
        </section>

        <section aria-labelledby="signals">
          <h2 id="signals">Which signals do we publish?</h2>
          <List items={AI_POLICY.signals} />
          <p>In robots.txt, every group carries:</p>
          <pre className="overflow-x-auto rounded-xl bg-paper p-4 text-[0.85rem] leading-relaxed ring-1 ring-line">
            {`Content-Signal: ${CONTENT_SIGNAL}\nContent-Usage: ${CONTENT_USAGE}\nAllow: /`}
          </pre>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact">How do I reach you?</h2>
          <p>
            For corrections or questions about this policy, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </Article>
    </ContentLayout>
  );
}
