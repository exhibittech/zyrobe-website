"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** <details> accordion row whose panel height animates open and closed (native toggle when motion is reduced). */
export default function FaqItem({ q, children, index }: { q: string; children: ReactNode; index: number }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  const toggle = (e: MouseEvent) => {
    const d = ref.current, p = panel.current;
    if (!d || !p || prefersReducedMotion()) return;
    e.preventDefault();
    anim.current?.cancel();
    const opening = !d.open;
    const from = d.open ? p.offsetHeight : 0;
    if (opening) d.open = true;
    const to = opening ? p.scrollHeight : 0;
    anim.current = p.animate(
      [{ height: `${from}px`, opacity: opening ? 0 : 1 }, { height: `${to}px`, opacity: opening ? 1 : 0 }],
      { duration: opening ? 520 : 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    anim.current.onfinish = () => {
      if (!opening) d.open = false;
      anim.current = null;
    };
  };

  return (
    <details ref={ref} data-faq className="group border-b border-line">
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-start gap-5 py-6 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive md:py-7 [&::-webkit-details-marker]:hidden"
      >
        <span className="mt-1.5 w-6 shrink-0 text-xs font-bold tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex-1 font-serif text-xl font-light leading-snug text-ink md:text-2xl">{q}</span>
        <span
          aria-hidden
          className="relative mt-1.5 h-7 w-7 shrink-0 rounded-full ring-1 ring-line transition-colors duration-500 group-open:bg-ink group-open:ring-ink"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-ink transition-colors duration-500 group-open:bg-cream" />
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-ink transition-[transform,background-color] duration-500 ease-silk group-open:rotate-90 group-open:bg-cream" />
        </span>
      </summary>
      <div ref={panel} className="overflow-hidden">
        <div className="pb-7 pl-11 pr-12 text-[0.98rem] leading-relaxed text-ink-soft md:text-[1.05rem]">{children}</div>
      </div>
    </details>
  );
}
