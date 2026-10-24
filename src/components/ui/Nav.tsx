"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, PLAY_LIVE, PLAY_URL } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
      <nav
        aria-label="Main"
        className={`flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-700 ease-silk ${
          scrolled ? "glass shadow-[0_8px_30px_-12px_rgb(46_28_18/.25)]" : "border border-transparent"
        }`}
      >
        <a href="#top" aria-label="Zyrobe, back to top" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/logo-sm.webp" alt="Zyrobe" width={520} height={176} className="h-7 w-auto md:h-8" />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={PLAY_LIVE ? PLAY_URL : "#download"}
          {...(PLAY_LIVE ? { target: "_blank", rel: "noopener" } : {})}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-transform duration-500 ease-silk hover:-translate-y-0.5"
        >
          {PLAY_LIVE ? "Get the app" : "Coming soon"}
        </a>
      </nav>
    </header>
  );
}
