import type { ReactNode } from "react";

/** Tick-box list for packing lists and checklists (inside the `.legal` reading column). */
export function Checklist({ items, title }: { items: ReactNode[]; title?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-line bg-paper/70 px-5 py-4 md:px-6">
      {title && <p className="eyebrow !my-1 text-olive">{title}</p>}
      <ul className="!my-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="!pl-7 before:!left-0 before:!top-[0.42em] before:!h-[0.95em] before:!w-[0.95em] before:!rounded-[4px] before:!border before:!border-olive/70 before:!bg-transparent"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A table that becomes labelled cards on phones (no sideways scrolling). */
export function GuideTable({ head, rows, caption }: { head: string[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="my-7">
      <table className="w-full border-collapse text-[0.95rem] leading-relaxed">
        {caption && <caption className="mb-3 text-left text-sm text-muted">{caption}</caption>}
        <thead className="max-sm:hidden">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="border-b border-ink/15 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-ink first:pl-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line max-sm:mb-3 max-sm:block max-sm:rounded-2xl max-sm:border max-sm:bg-paper/70 max-sm:px-4 max-sm:py-3">
              {r.map((cell, j) => (
                <td
                  key={j}
                  data-label={head[j]}
                  className={`px-3 py-3 align-top first:pl-0 max-sm:block max-sm:px-0 max-sm:py-1 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:text-[0.68rem] max-sm:before:font-bold max-sm:before:uppercase max-sm:before:tracking-[0.14em] max-sm:before:text-muted max-sm:before:content-[attr(data-label)] ${
                    j === 0 ? "font-bold text-ink" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A short practical aside. */
export function Tip({ children, label = "Tip" }: { children: ReactNode; label?: string }) {
  return (
    <aside className="my-6 rounded-r-2xl border-l-2 border-olive bg-satin/40 py-3 pr-5 pl-5">
      <p className="eyebrow !my-0 text-olive">{label}</p>
      <div className="mt-1.5 text-ink-soft [&>p]:!my-1">{children}</div>
    </aside>
  );
}
