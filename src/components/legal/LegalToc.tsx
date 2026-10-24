"use client";

import { useEffect, useState } from "react";

/** "On this page" list; highlights the section being read. */
export default function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    // The current section is the last heading above 35% of the viewport.
    const update = () => {
      raf = 0;
      const line = innerHeight * 0.35;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("hashchange", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("hashchange", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="eyebrow text-muted">On this page</p>
      <ol className="mt-5 space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-px block border-l py-1.5 pl-4 text-[0.88rem] leading-snug transition-colors duration-300 ${
                active === i.id ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink-soft"
              }`}
            >
              {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
