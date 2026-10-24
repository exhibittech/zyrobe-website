"use client";

import { useRef } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import { Pop, SceneBox, chapterOf } from "@/components/features-b/Pop";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { size } from "@/lib/media";

// Twelve activities from the planner's "Add Activities" sheet, spaced round the ring.
const CHIPS = ["office", "date", "meeting", "travel", "gym", "shopping", "dinner", "formal", "event", "casual", "brunch", "leisure"];
// The week the planner styles (19–25 Oct, as in the app footage): one activity lands on each day.
const WEEK = [
  { d: "Mon", n: 19, chip: "office" },
  { d: "Tue", n: 20, chip: "meeting" },
  { d: "Wed", n: 21, chip: "gym" },
  { d: "Thu", n: 22, chip: "dinner" },
  { d: "Fri", n: 23, chip: "event" },
  { d: "Sat", n: 24, chip: "brunch" },
  { d: "Sun", n: 25, chip: "leisure" },
];

const clamp = gsap.utils.clamp(0, 1);
const ease = gsap.parseEase("power2.inOut");
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Stage() {
  const box = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = box.current!;
      const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", root);
      const slots = gsap.utils.toArray<HTMLElement>("[data-slot]", root);
      const panel = root.querySelector<HTMLElement>("[data-week]")!;
      const toast = root.querySelector<HTMLElement>("[data-toast]")!;
      gsap.set(chips, { xPercent: -50, yPercent: -50 });
      const dayOf = chips.map((c) => WEEK.findIndex((w) => w.chip === c.dataset.chip));

      let geo: { W: number; H: number; slots: { x: number; y: number; h: number }[]; ring: number[]; n: number } | null = null;
      // Slot centres relative to the phone's centre (panel measured at rest, without its fade-up offset).
      const measure = () => {
        const W = root.offsetWidth, H = root.offsetHeight;
        const y0 = gsap.getProperty(panel, "y");
        gsap.set(panel, { y: 0 });
        const rb = root.getBoundingClientRect();
        // Chips hidden at this breakpoint leave no gap in the ring.
        let n = 0;
        const ring = chips.map((c) => (c.offsetParent ? n++ : -1));
        geo = {
          W, H, ring, n,
          slots: slots.map((s) => {
            const r = s.getBoundingClientRect();
            return { x: r.left + r.width / 2 - (rb.left + W / 2), y: r.top + r.height / 2 - (rb.top + H / 2), h: r.height };
          }),
        };
        gsap.set(panel, { y: y0 });
      };

      const render = (p: number) => {
        if (!geo) measure();
        const { W, H, slots: sl, ring, n } = geo!;
        const wide = W > 230;
        const rx = W * (wide ? 0.92 : 0.68), ry = W * 0.2, cy = -H * 0.08;
        const appear = ease(clamp(p / 0.12));
        const spin = ease(clamp(p / 0.56)) * Math.PI * 1.35;
        chips.forEach((el, i) => {
          if (ring[i] < 0) return;
          const a = (ring[i] / n) * Math.PI * 2 + spin;
          const depth = Math.cos(a);
          const k = (depth + 1) / 2;
          const r = 0.35 + 0.65 * appear;
          let x = rx * r * Math.sin(a), y = cy + ry * r * depth;
          let s = (0.78 + 0.28 * k) * (0.5 + 0.5 * appear);
          let o = (0.3 + 0.7 * k) * appear;
          let z = depth > -0.1 ? 30 : 1;
          const day = dayOf[i];
          if (day >= 0) {
            const t = ease(clamp((p - 0.56 - day * 0.018) / 0.2));
            const slot = sl[day];
            x = lerp(x, slot.x, t);
            y = lerp(y, slot.y, t);
            s = lerp(s, slot.h / el.offsetHeight, t);
            o = lerp(o, 1, t);
            if (t > 0) z = 40;
          } else {
            const f = clamp((p - 0.54) / 0.12);
            o *= 1 - f;
            s *= 1 - 0.4 * f;
          }
          gsap.set(el, { x, y, scale: s, opacity: o, zIndex: z });
        });
        const w = ease(clamp((p - 0.48) / 0.12));
        gsap.set(panel, { opacity: w, y: (1 - w) * 24 });
        const tt = clamp((p - 0.84) / 0.08);
        gsap.set(toast, { opacity: tt, y: (1 - gsap.parseEase("back.out(1.6)")(tt)) * H * 0.18, scale: 0.6 + 0.4 * ease(tt) });
      };

      const remeasure = () => { geo = null; };
      ScrollTrigger.addEventListener("refreshInit", remeasure);
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", still: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        if (ctx.conditions?.still) {
          render(1);
          const onResize = () => { remeasure(); render(1); };
          window.addEventListener("resize", onResize);
          return () => window.removeEventListener("resize", onResize);
        }
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => render(state.p),
          scrollTrigger: { trigger: chapterOf(root), start: "top 55%", end: "bottom bottom", scrub: 0.6 },
        });
        render(0);
      });
      return () => ScrollTrigger.removeEventListener("refreshInit", remeasure);
    },
    { scope: box },
  );

  return (
    <SceneBox style={{ transformStyle: "flat" }}>
      <div ref={box} className="absolute inset-0">
        <Phone className="z-10" video={{ src: "/media/video/planner.mp4", poster: "/media/video/planner-poster.webp" }} alt="Zyrobe weekly planner: pick activities, get a style plan, save it to the calendar" />

        {CHIPS.map((n) => (
          <Pop
            key={n}
            data-chip={n}
            src={`/media/comps/act_${n}.webp`}
            alt={n}
            w={size(`/media/comps/act_${n}.webp`).w * 0.00165}
            r="pill"
            className={`left-1/2 top-1/2 opacity-0 will-change-transform ${WEEK.some((w) => w.chip === n) ? "" : "max-md:hidden"}`}
          />
        ))}

        {/* The week the chips land on */}
        <div
          data-week
          className="glass pop absolute left-1/2 top-[71%] z-20 w-[calc(var(--phone-w)*1.95)] max-md:top-[56%] -translate-x-1/2 rounded-[calc(var(--phone-w)*0.07)] p-[calc(var(--phone-w)*0.045)] opacity-0 max-md:w-[min(calc(var(--phone-w)*1.75),calc(100vw_-_32px))]"
          style={{ fontSize: "calc(var(--phone-w) * 0.042 * var(--m, 1))" }}
        >
          <div className="flex items-baseline justify-between px-[0.4em]">
            <span className="font-serif text-[1.35em] font-light text-ink">This week</span>
            <span className="text-[0.85em] font-bold uppercase tracking-[0.16em] text-olive">Oct 19 – 25</span>
          </div>
          <div className="mt-[0.7em] grid grid-cols-4 gap-x-[0.35em] gap-y-[0.6em] md:grid-cols-7">
            {WEEK.map((w) => (
              <div key={w.d} className="flex flex-col items-center">
                <span className="text-[0.72em] font-bold uppercase tracking-[0.14em] text-muted">{w.d}</span>
                <span className={`mt-[0.15em] font-serif text-[1.15em] ${w.n === 19 ? "text-olive" : "text-ink"}`}>{w.n}</span>
                <span data-slot className="mt-[0.35em] block h-[2.3em] w-full rounded-full border border-dashed border-taupe/50" />
              </div>
            ))}
          </div>
        </div>

        <Pop data-toast src="/media/comps/toast_success.webp" alt="Success: weekly plan saved to your calendar" w={1.12} r={0.034} className="left-[-6%] top-[3%] z-50 opacity-0" />
      </div>
    </SceneBox>
  );
}

export default function Planner() {
  return (
    <Chapter
      id="planner"
      index={6}
      eyebrow="Planner"
      side="right"
      length={290}
      title={<>Your week,<br />styled in seconds.</>}
      body="Tell Zyrobe what your week looks like — office, gym, a dinner, a weekend brunch. It plans an outfit for each day from your own clothes and puts them on your calendar."
      points={["Pick activities for each day", "Outfit ideas from the clothes you own", "Saved straight to your style calendar"]}
    >
      <Stage />
    </Chapter>
  );
}
