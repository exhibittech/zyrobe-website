import type { ReactNode } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import PlayButton from "@/components/ui/PlayButton";
import LegalToc from "@/components/legal/LegalToc";
import JsonLd from "@/components/closing/JsonLd";
import GuideCard from "./GuideCard";
import { guideJsonLd } from "./schema";
import { guideBySlug, type GuideEntry } from "@/content/guides";
import { SIGNUP_FREE_CREDITS } from "@/lib/site";

export type GuideSection = { id: string; title: string; body: ReactNode };
/** A Zyrobe feature that helps with this guide: link to its feature page, and one line on how. */
export type GuideHelp = { href: string; label: string; text: ReactNode };
export type GuideBody = { sections: GuideSection[]; helps: GuideHelp[] };

const HELPS_ID = "how-zyrobe-helps";

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** One guide: satin header with garment art, contents, reading column, how Zyrobe helps, related guides. */
export default function GuidePage({ guide, body }: { guide: GuideEntry; body: GuideBody }) {
  const toc = [...body.sections.map(({ id, title }) => ({ id, title })), { id: HELPS_ID, title: "How Zyrobe helps" }];
  const related = guide.related.map(guideBySlug).filter((g): g is GuideEntry => !!g);
  const updated = formatDate(guide.updated);
  const crumbs = [["Home", "/"], ["Guides", "/guides"], [guide.category, `/guides#${categoryId(guide.category)}`]] as const;

  return (
    <>
      <JsonLd data={guideJsonLd(guide)} />
      <Nav onHome={false} />
      <main className="bg-cream text-ink">
        <header className="relative isolate overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center opacity-80" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(250_247_242/.15)_0%,rgb(250_247_242/.55)_60%,var(--color-cream)_100%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[38%] lg:block">
            {guide.garments.slice(0, 3).map((id, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={`/media/garments/${id}.webp`}
                alt=""
                width={315}
                height={399}
                decoding="async"
                className="absolute w-[clamp(120px,11vw,170px)] drop-shadow-[0_22px_26px_rgb(46_28_18/.22)]"
                style={{ left: `${[8, 42, 22][i]}%`, top: `${[30, 22, 56][i]}%`, rotate: `${[-9, 7, -4][i]}deg` }}
              />
            ))}
          </div>
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {crumbs.map(([label, href], i) => (
                  <li key={href} className="flex items-center gap-x-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    <a href={href} className="transition-colors hover:text-ink">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="display mt-6 max-w-[18ch] text-balance text-[2.5rem] sm:text-6xl lg:max-w-[16ch] lg:text-[4.2rem]">{guide.title}</h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{guide.description}</p>
            <p className="mt-6 text-sm text-muted">
              Updated <time dateTime={guide.updated}>{updated}</time> · By the Zyrobe team
            </p>
          </div>
        </header>

        <div className="wrap grid gap-12 pb-20 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] md:pb-24">
          <aside className="hidden md:block">
            <LegalToc items={toc} />
          </aside>
          <article className="legal max-w-[68ch]">
            <p>{guide.answer}</p>
            {body.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </section>
            ))}

            <section id="download" aria-labelledby={HELPS_ID} className="mt-14 rounded-[26px] border border-line bg-paper px-6 py-7 md:px-9 md:py-9">
              <h2 id={HELPS_ID} className="!mt-0">How Zyrobe helps</h2>
              <p>
                Zyrobe keeps all your clothes in one app and helps you decide what to wear, using the clothes you already own.
              </p>
              <ul>
                {body.helps.map((h) => (
                  <li key={h.href + h.label}>
                    <a href={h.href}>{h.label}</a>: {h.text}
                  </li>
                ))}
              </ul>
              <p className="!text-sm !text-muted">
                Zyrobe is free to download, with {SIGNUP_FREE_CREDITS} free credits when you sign up; AI features use credits. Android, in India, for people aged 18 and over. AI images are previews and may not match exactly how clothes look or fit in real life.
              </p>
              <div className="mt-6 [&_a]:no-underline">
                <PlayButton />
              </div>
            </section>

            <p className="legal-note">
              Updated {updated}. Weather and customs vary by place, family and year, so check local conditions and ask your hosts when in doubt.
            </p>
          </article>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-guides" className="border-t border-line bg-paper/60 py-16 md:py-20">
            <div className="wrap">
              <p className="eyebrow text-olive">Keep reading</p>
              <h2 id="related-guides" className="display mt-3 text-4xl md:text-5xl">Related guides</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads, like the rest of the site (Lenis and ScrollTrigger start clean) */}
              <a href="/guides" className="mt-10 inline-flex text-sm font-bold text-ink underline decoration-taupe underline-offset-4 hover:decoration-ink">
                All guides
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer onHome={false} />
    </>
  );
}

export const categoryId = (c: string) => c.toLowerCase().replace(/[^a-z]+/g, "-");
