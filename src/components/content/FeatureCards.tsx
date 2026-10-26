import { FEATURES, type FeatureSlug } from "@/content/features";

/** Cards linking to feature pages, each with the top of its first screenshot. */
export default function FeatureCards({ slugs, headingLevel = 3 }: { slugs?: FeatureSlug[]; headingLevel?: 2 | 3 }) {
  const list = slugs ? slugs.map((s) => FEATURES.find((f) => f.slug === s)!).filter(Boolean) : FEATURES;
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((f) => (
        <li key={f.slug}>
          <a
            href={`/features/${f.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-paper ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(46_28_18/.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
          >
            <div aria-hidden className="relative h-44 overflow-hidden bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.shots[0].src}
                alt={f.shots[0].alt}
                loading="lazy"
                decoding="async"
                className="absolute left-1/2 top-6 w-[46%] -translate-x-1/2 rounded-t-[18px] shadow-[0_18px_40px_-16px_rgb(46_28_18/.45)] ring-[5px] ring-[#141210] transition-transform duration-700 ease-silk group-hover:-translate-y-1.5"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <H className="font-serif text-[1.55rem] font-light leading-tight text-ink">{f.name}</H>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{f.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink">
                How it works
                <span aria-hidden className="transition-transform duration-500 ease-silk group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
