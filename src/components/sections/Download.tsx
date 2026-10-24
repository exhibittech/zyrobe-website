"use client";

import { useRef } from "react";
import PlayButton from "@/components/ui/PlayButton";
import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { SHORT_DESCRIPTION, TAGLINE } from "@/lib/site";

// Cut-outs drifting at the edges: [file, left%, top%, width (vw, desktop), rotate, parallax depth, mobile]
const PIECES: [string, number, number, number, number, number, boolean][] = [
  ["c06", 4, 12, 15, -12, 1.0, true],
  ["c22", 84, 8, 10, 9, 0.6, true],
  ["c13", 80, 62, 13, -7, 1.3, false],
  ["c09", 8, 64, 12, 10, 0.8, false],
];

/** Final call to action: the wordmark on satin, like the film's end card. */
export default function Download() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const scrub = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };

      gsap.fromTo(q("[data-bg]"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: scrub });
      q("[data-piece]").forEach((el) => {
        const depth = Number(el.getAttribute("data-depth"));
        gsap.fromTo(el, { yPercent: 40 * depth }, { yPercent: -40 * depth, rotate: `+=${8 * depth}`, ease: "none", scrollTrigger: scrub });
      });

      // The light sweep loops forever, so it only runs while the section is on screen.
      const sheen = gsap.fromTo(q("[data-sheen]"), { xPercent: -22 }, { xPercent: 22, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
      ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? sheen.play() : sheen.pause()) });

      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 62%", toggleActions: "play none none reverse" } });
      tl.fromTo(
        q("[data-logo]"),
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.06, filter: "blur(10px)" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.inOut" },
      )
        .from(q("[data-line]"), { y: 26, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 }, "-=0.8")
        .from(q("[data-piece-in]"), { opacity: 0, scale: 0.85, duration: 1.4, ease: "expo.out", stagger: 0.08 }, 0.2);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="download"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-satin py-28 text-ink"
    >
      <div
        data-bg
        aria-hidden
        className="absolute inset-x-0 -inset-y-[10%] -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/media/brand/satin-full.webp)" }}
      />
      {/* Slow light raking across the folds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden mix-blend-soft-light">
        <div data-sheen className="absolute inset-y-0 -left-1/2 w-[200%] bg-[linear-gradient(100deg,transparent_35%,rgb(255_255_255/.55)_50%,transparent_65%)]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgb(250_247_242/.55),transparent_75%)]" />
      {/* Melt in from the cream page above */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-cream to-transparent" />

      {PIECES.map(([f, x, y, w, r, depth, mobile]) => (
        <div
          key={f}
          data-piece
          data-depth={depth}
          aria-hidden
          className={`pointer-events-none absolute -z-10 ${mobile ? "" : "hidden md:block"}`}
          style={{ left: `${x}%`, top: `${y}%`, width: `clamp(${mobile ? 84 : 110}px, ${w}vw, 230px)`, rotate: `${r}deg` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-piece-in
            src={`/media/garments/${f}.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full drop-shadow-[0_24px_30px_rgb(46_28_18/.28)]"
          />
        </div>
      ))}

      <div className="wrap relative flex flex-col items-center text-center">
        <p data-line className="eyebrow text-olive">Your wardrobe is waiting</p>
        <h2 className="sr-only">Zyrobe</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-logo
          src="/media/brand/logo.webp"
          alt=""
          width={1400}
          height={473}
          loading="lazy"
          className="mt-8 w-[min(84vw,760px)]"
        />
        <p data-line className="mt-6 font-serif text-[2rem] font-light italic leading-tight text-ink-soft md:mt-8 md:text-5xl">
          {TAGLINE}
        </p>
        <p data-line className="mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
          {SHORT_DESCRIPTION}
        </p>
        <div data-line className="mt-10">
          <PlayButton size="lg" />
        </div>
        <p data-line className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-muted">
          Android <span className="mx-1.5 opacity-50">·</span> India <span className="mx-1.5 opacity-50">·</span> 18+
        </p>
      </div>
    </section>
  );
}
