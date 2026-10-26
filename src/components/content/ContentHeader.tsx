import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { longDate } from "./format";

/**
 * Satin page header: breadcrumbs, eyebrow, H1, the opening answer and the update date.
 * A title with a colon is set on two lines, the second in italics ("Outfit planner: plan what to wear").
 */
export default function ContentHeader({
  crumbs, eyebrow, title, lead, updated, actions, aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: ReactNode;
  updated: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  const cut = title.indexOf(": ");
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-12 md:pt-44 md:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center opacity-80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(250_247_242/.15)_0%,rgb(250_247_242/.55)_60%,var(--color-cream)_100%)]" />
      <div className={`wrap grid items-center gap-12 ${aside ? "md:grid-cols-[minmax(0,1fr)_auto] md:gap-16" : ""}`}>
        <div className="min-w-0">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-8 text-olive">{eyebrow}</p>
          <h1 className="display mt-4 max-w-[19ch] text-balance text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
            {cut > 0 ? (
              <>
                {title.slice(0, cut + 1)}{" "}
                <em className="italic text-ink-soft">{title.slice(cut + 2)}</em>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">{actions}</div> : null}
          <p className="mt-7 text-sm text-muted">
            Updated <time dateTime={updated}>{longDate(updated)}</time>
          </p>
        </div>
        {aside ? <div className="hidden md:block">{aside}</div> : null}
      </div>
    </header>
  );
}
