"use client";

import { useRef } from "react";
import Phone from "@/components/ui/Phone";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// One phone per chapter, in chapter order, each named underneath (the film's finale).
const PHONES = [
  { label: "Wardrobe", src: "/media/screens/02_wardrobe.webp", alt: "Wardrobe: all your clothes, sorted by type" },
  { label: "Storage", src: "/media/feat/st_grid.webp", alt: "Storage: where each item is kept" },
  { label: "Outfits", src: "/media/screens/03_outfits.webp", alt: "My Outfits: looks built from your clothes" },
  { label: "Try-on", src: "/media/screens/09_outfit_detail.webp", alt: "An outfit with the AI Virtual Try-On button" },
  { label: "AI Stylist", src: "/media/screens/your_look.webp", alt: "Your Look: an AI-curated outfit with a stylist note" },
  { label: "Planner", src: "/media/screens/style_plan.webp", alt: "Style Plan: an outfit for each day of the week" },
  { label: "Briefcase", src: "/media/screens/day_by_day.webp", alt: "Briefcase: day-by-day outfits for a trip" },
];

const clamp = gsap.utils.clamp(0, 1);
const easeOut = gsap.parseEase("power3.out");
const easeInOut = gsap.parseEase("sine.inOut");
const DEG = Math.PI / 180;

function Toast({ src, alt, className = "", data }: { src: string; alt: string; className?: string; data: string }) {
  return (
    <div data-toast={data} className={`pop absolute hidden overflow-hidden lg:block ${className}`} style={{ width: "clamp(220px, 19vw, 290px)", aspectRatio: "900 / 202", borderRadius: "clamp(10px, 1vw, 14px)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={900} height={202} loading="lazy" decoding="async" className="block h-full w-full" />
    </div>
  );
}

export default function Finale() {
  const section = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-ph]", ring.current);
      const toasts = gsap.utils.toArray<HTMLElement>("[data-toast]", section.current);
      const mid = (items.length - 1) / 2;

      // p: 0..1 through the pinned stretch. Phones rise in from the centre outward and fan
      // into a convex arc, then the arc turns slowly like a turntable.
      const render = (p: number, still = false) => {
        const W = items[0]?.offsetWidth ?? 150;
        const R = W * 6.3;
        const fan = still ? 1 : easeOut(clamp(p / 0.42));
        const turn = still ? 0 : (easeInOut(clamp((p - 0.3) / 0.7)) - 0.5) * -9;
        items.forEach((el, i) => {
          const d = i - mid;
          const rise = still ? 1 : easeOut(clamp((p - Math.abs(d) * 0.045) / 0.32));
          const th = (d * 11 * (0.25 + 0.75 * fan) + turn) * DEG;
          gsap.set(el, {
            x: R * Math.sin(th),
            z: -R * (1 - Math.cos(th)),
            rotateY: th / DEG,
            y: (1 - rise) * window.innerHeight * 0.55,
            opacity: rise,
          });
        });
        toasts.forEach((el, i) => {
          const t = still ? 1 : easeOut(clamp((p - 0.3 - i * 0.06) / 0.16));
          gsap.set(el, { opacity: t, x: (1 - t) * (i ? 40 : -40), y: (1 - t) * 12 });
        });
      };

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
          if (!desktop) return;
          if (!motion) {
            render(1, true);
            const onResize = () => render(1, true);
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
          }
          const state = { p: 0 };
          gsap.to(state, {
            p: 1,
            ease: "none",
            onUpdate: () => render(state.p),
            scrollTrigger: { trigger: section.current, start: "top 40%", end: "bottom bottom", scrub: 0.6, onRefresh: () => render(state.p) },
          });
          render(0);
          ScrollTrigger.refresh();
        },
      );
    },
    { scope: section },
  );

  return (
    <section ref={section} id="finale" className="grain relative overflow-clip bg-satin md:h-[270vh]">
      {/* Satin backdrop, blended into the cream sections around it */}
      <div aria-hidden="true" className="absolute inset-0 bg-[url(/media/brand/satin-soft.webp)] bg-cover bg-center opacity-70" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-cream)_0%,transparent_14%,transparent_86%,var(--color-cream)_100%)]" />

      <div className="relative flex flex-col py-24 md:sticky md:top-0 md:h-[100svh] md:justify-center md:py-0 md:pt-16">
        <div className="wrap relative text-center">
          <p className="eyebrow text-olive">All in one app</p>
          <h2 className="display mx-auto mt-4 max-w-[20ch] text-balance text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.6rem]">
            Your wardrobe, finally working for you.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-soft md:text-lg">
            From the first photo to a packed suitcase, all from the clothes you already own.
          </p>
          <Toast data="0" src="/media/comps/toast_tryon.webp" alt="Try-On Ready! Your virtual look has been generated." className="left-0 top-[72%] -rotate-3 xl:left-[3%]" />
          <Toast data="1" src="/media/comps/toast_success.webp" alt="Success: weekly plan saved to your calendar!" className="right-0 top-[66%] rotate-2 xl:right-[3%]" />
        </div>

        <div
          ref={ring}
          className="mt-12 flex snap-x [--phone-w:clamp(200px,58vw,260px)] md:[--phone-w:clamp(112px,min(10.2vw,17svh),158px)] snap-mandatory gap-5 overflow-x-auto px-[calc(50vw-var(--phone-w)/2)] pb-6 [scrollbar-width:none] md:relative md:mt-[clamp(28px,5svh,64px)] md:block md:h-[calc(var(--phone-w)*2.38)] md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
          style={{ perspective: "1800px", transformStyle: "preserve-3d" }}
        >
          {PHONES.map((ph) => (
            <figure
              key={ph.label}
              data-ph
              className="shrink-0 snap-center md:absolute md:left-1/2 md:top-0 md:-ml-[calc(var(--phone-w)/2)] md:will-change-transform"
            >
              <div className="transition-transform duration-500 ease-silk md:hover:-translate-y-3">
                <Phone src={ph.src} alt={ph.alt} />
                <figcaption className="eyebrow mt-4 text-center text-ink-soft md:mt-5">{ph.label}</figcaption>
              </div>
            </figure>
          ))}
        </div>
        <p className="eyebrow mt-2 text-center text-muted md:hidden">Swipe</p>
      </div>
    </section>
  );
}
