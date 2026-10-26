import type { CSSProperties } from "react";
import Phone from "@/components/ui/Phone";

export type Shot = { src: string; alt: string; caption: string };

/**
 * App screenshots in phone frames, captioned (two or three in a row).
 * `firstOnDesktop={false}`: the first one is already beside the page title on wide screens.
 */
export default function Shots({ shots, firstOnDesktop = true }: { shots: Shot[]; firstOnDesktop?: boolean }) {
  const w = shots.length > 2 ? "min(40vw, 180px)" : "min(40vw, 220px)";
  return (
    <div className="my-10 flex flex-wrap justify-center gap-x-6 gap-y-8 sm:justify-start" style={{ "--phone-w": w } as CSSProperties}>
      {shots.map((s, i) => (
        <figure key={s.src} className={`m-0 ${i === 0 && !firstOnDesktop ? "md:hidden" : ""}`} style={{ width: "var(--phone-w)" }}>
          <Phone src={s.src} alt={s.alt} />
          <figcaption className="mt-4 text-center text-[0.8rem] leading-snug text-muted">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
