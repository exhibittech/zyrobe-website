import type { ReactNode } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import LegalToc from "./LegalToc";
import { COMPANY, CONTACT_EMAIL } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

const DOCS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

/** Privacy policy / terms layout: satin header, sticky contents, readable column. Text is the legal source of truth. */
export default function LegalPage({
  path, title, updated, intro, sections,
}: {
  path: "/privacy" | "/terms";
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav onHome={false} />
      <main className="bg-cream text-ink">
        <header className="relative isolate overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center opacity-80" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(250_247_242/.15)_0%,rgb(250_247_242/.55)_60%,var(--color-cream)_100%)]" />
          <div className="wrap">
            <p className="eyebrow text-olive">Legal</p>
            <h1 className="display mt-4 text-[2.9rem] sm:text-6xl md:text-7xl">{title}</h1>
            <p className="mt-5 text-sm text-muted">Last updated: {updated}</p>
            <div className="glass mt-8 inline-flex rounded-full p-1" role="navigation" aria-label="Legal documents">
              {DOCS.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  aria-current={d.href === path ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                    d.href === path ? "bg-ink text-cream" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className="wrap grid gap-12 pb-24 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] md:pb-32">
          <aside className="hidden md:block">
            <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
          </aside>
          <article className="legal max-w-[68ch]">
            {intro}
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </section>
            ))}
            <p className="legal-note">
              Zyrobe is operated by {COMPANY}. Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </article>
        </div>
      </main>
      <Footer onHome={false} />
    </>
  );
}
