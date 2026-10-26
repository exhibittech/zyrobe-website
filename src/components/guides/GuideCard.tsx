import type { GuideEntry } from "@/content/guides";

/** Guide link card: garment cut-outs on satin, then the title and summary. */
export default function GuideCard({ guide, headingLevel = 3 }: { guide: GuideEntry; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <a
      href={`/guides/${guide.slug}`}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgb(46_28_18/.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
    >
      <div aria-hidden className="relative h-40 overflow-hidden bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center">
        {guide.garments.slice(0, 3).map((id, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            src={`/media/garments/${id}.webp`}
            alt=""
            width={315}
            height={399}
            loading="lazy"
            decoding="async"
            className="absolute top-1/2 h-[118px] w-auto drop-shadow-[0_12px_14px_rgb(46_28_18/.22)] transition-transform duration-700 ease-silk group-hover:-translate-y-1.5"
            style={{ left: `${18 + i * 24}%`, transform: `translateY(-50%) rotate(${[-8, 3, 9][i]}deg)` }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-olive">{guide.category}</p>
        <H className="mt-3 font-serif text-[1.45rem] font-light leading-snug text-ink">{guide.title}</H>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">{guide.description}</p>
        <span className="mt-auto pt-5 text-sm font-bold text-ink">
          Read the guide <span aria-hidden className="inline-block transition-transform duration-500 ease-silk group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}
