import FaqItem from "@/components/closing/FaqItem";
import JsonLd from "@/components/closing/JsonLd";
import { FAQS } from "@/components/closing/faq";
import { CONTACT_EMAIL } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="relative bg-cream pt-16 pb-24 md:pt-24 md:pb-36">
      <JsonLd data={faqJsonLd} />
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-16">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="eyebrow text-olive">FAQ</p>
          <h2 className="display mt-5 text-[2.6rem] sm:text-6xl">
            Questions,
            <br />
            <em className="font-light italic text-ink-soft">answered.</em>
          </h2>
          <p className="mt-6 max-w-xs leading-relaxed text-ink-soft">
            Anything else? Write to us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-olive">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-line">
          {FAQS.map((f, i) => (
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
      </div>
    </section>
  );
}
