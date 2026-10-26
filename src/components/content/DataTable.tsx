import type { ReactNode } from "react";

/** Small fact table; the last column is right-aligned when `numeric` (prices, credits). */
export default function DataTable({ head, rows, numeric = false, caption }: {
  head: string[];
  rows: ReactNode[][];
  numeric?: boolean;
  caption?: string;
}) {
  const last = head.length - 1;
  const align = (i: number) => (numeric && i === last ? "text-right whitespace-nowrap" : "text-left");
  return (
    <div className="my-6 overflow-hidden rounded-2xl bg-paper/80 ring-1 ring-line">
      <table className="w-full border-collapse text-[0.95rem] leading-snug">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-satin/60">
            {head.map((h, i) => (
              <th key={h} scope="col" className={`px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft ${align(i)}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="border-t border-line align-top">
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 text-left font-normal text-ink-soft">{c}</th>
                ) : (
                  <td key={i} className={`px-4 py-3 font-bold text-ink ${align(i)}`}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
