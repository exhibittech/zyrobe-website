"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { E, L, P } from "@/components/story/ease";
import { PROMISE, SHORT_DESCRIPTION, TAGLINE } from "@/lib/site";

/**
 * The real home screen cut into its parts (public/media/home/layers.json), in the 1126x2436 screenshot space.
 * z = how far the part lifts when the screen explodes. Drawn in z order so overlaps match the app when flat.
 */
const LAYERS = [
  { n: "nav", x: 0, y: 2170, w: 1126, h: 266, r: 0, z: 40 },
  { n: "wardh", x: 50, y: 1640, w: 1022, h: 120, r: 0, z: 60 },
  { n: "greet", x: 50, y: 190, w: 510, h: 230, r: 0, z: 70 },
  { n: "cal", x: 55, y: 840, w: 1015, h: 732, r: 46, z: 90 },
  { n: "rack", x: 662, y: 150, w: 464, h: 328, r: 0, z: 120 },
  { n: "stat1", x: 55, y: 1815, w: 485, h: 355, r: 40, z: 130 },
  { n: "act1", x: 68, y: 522, w: 228, h: 248, r: 34, z: 150 },
  { n: "stat2", x: 585, y: 1815, w: 485, h: 355, r: 40, z: 150 },
  { n: "vibe", x: 106, y: 1283, w: 912, h: 237, r: 30, z: 160 },
  { n: "act2", x: 322, y: 522, w: 228, h: 248, r: 34, z: 175 },
  { n: "plan", x: 752, y: 908, w: 268, h: 84, r: 42, z: 190 },
  { n: "act3", x: 577, y: 522, w: 228, h: 248, r: 34, z: 200 },
  { n: "today", x: 106, y: 1060, w: 182, h: 178, r: 30, z: 210 },
  { n: "act4", x: 831, y: 522, w: 228, h: 248, r: 34, z: 225 },
];
const SW = 1126, SH = 2436;

// Phone geometry as fractions of the phone width (matches components/ui/Phone).
const BEZEL = 0.028, R_FRAME = 0.15, R_SCREEN = 0.125;

export default function HomeReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const q = (s: string) => section.querySelector<HTMLElement>(s)!;
      const rig = q("[data-rig]"), tilt = q("[data-tilt]"), satin = q("[data-satin]");
      const layers = Array.from(section.querySelectorAll<HTMLElement>("[data-layer]"));
      const shadows = Array.from(section.querySelectorAll<HTMLElement>("[data-lshadow]"));
      const copy = Array.from(section.querySelectorAll<HTMLElement>("[data-copy]"));

      if (prefersReducedMotion()) {
        setReduced(true);
        return;
      }

      const mm = gsap.matchMedia();
      mm.add({ small: "(max-width: 767px)", fine: "(pointer: fine)" }, (ctx) => {
        const { small, fine } = ctx.conditions as { small: boolean; fine: boolean };
        const amp = small ? 0.85 : 1; // tilt amount
        const depth = small ? 0.8 : 1;

        // Copy rises out of the cream as the section arrives from the dive.
        gsap.fromTo(
          copy,
          { y: 46, opacity: 0, filter: "blur(10px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out", stagger: 0.12,
            scrollTrigger: { trigger: section, start: "top 58%", end: "top 8%", scrub: true },
          },
        );
        gsap.fromTo(satin, { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 42%", end: "top -20%", scrub: true } });

        const render = (p: number) => {
          const W = rig.offsetWidth, k = (W * (1 - 2 * BEZEL)) / SW;
          // Rise facing you, lie back into an isometric view, explode, hold, then settle back flat.
          const rise = E.out3(P(p, 0, 0.22));
          const iso = E.io3(P(p, 0.12, 0.42)), drift = E.io2(P(p, 0.42, 0.68)), settle = E.io3(P(p, 0.66, 0.92));
          const ex = E.io3(P(p, 0.24, 0.48)) * (1 - E.io3(P(p, 0.62, 0.86)));
          const rx = L(L(14, 54, iso), 0, settle) * amp;
          const ry = L(L(-12, 0, iso), 0, settle) * amp;
          const rz = L(L(4, -30, iso) + 6 * drift, 0, settle) * amp;
          const y = L(window.innerHeight * 0.55, 0, rise) + L(0, W * 0.12, iso * (1 - settle));
          const s = L(0.88, 1, rise) * L(1, small ? 1.02 : 1.1, iso * (1 - settle));
          rig.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${s.toFixed(4)})`;
          rig.style.opacity = E.out2(P(p, 0, 0.1)).toFixed(3);
          layers.forEach((el, i) => {
            const m = LAYERS[i];
            const cx = m.x + m.w / 2 - SW / 2, cy = m.y + m.h / 2 - SH / 2;
            const z = m.z * k * 2.6 * ex * depth;
            const spread = 0.08 * ex;
            el.style.transform = `translate3d(${(cx * spread * k).toFixed(2)}px,${(cy * spread * 0.6 * k).toFixed(2)}px,${z.toFixed(2)}px)`;
            shadows[i].style.opacity = (ex * (0.45 + m.z / 300)).toFixed(3);
          });
        };

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom bottom",
          onUpdate: (self) => render(self.progress),
          onRefresh: (self) => render(self.progress),
        });
        render(st.progress);

        let onMove: ((e: PointerEvent) => void) | undefined;
        if (fine && !small) {
          const toX = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
          const toY = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" });
          onMove = (e: PointerEvent) => {
            const r = section.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            toY(((e.clientX / window.innerWidth) - 0.5) * 10);
            toX(-((e.clientY / window.innerHeight) - 0.5) * 7);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
        }
        return () => {
          if (onMove) window.removeEventListener("pointermove", onMove);
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const unit = (n: number) => `calc(var(--k) * ${n})`;

  return (
    <section
      ref={sectionRef}
      id="meet"
      aria-labelledby="meet-title"
      className={`relative text-ink ${reduced ? "bg-cream" : "z-[1]"}`}
      // Transparent, and pulled up over the end of the dive: the copy starts rising while the full stop
      // is still filling the screen, and the page's cream shows through once it has.
      style={{ height: reduced ? "auto" : "330vh", marginTop: reduced ? undefined : "-60svh" }}
    >
      <div className={`${reduced ? "relative min-h-[100svh] py-24" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        {/* Cream satin, soft at the top so the dive's cream hands over seamlessly. */}
        <div
          data-satin
          className="absolute inset-0"
          style={{
            opacity: reduced ? 1 : 0,
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 38%)",
            maskImage: "linear-gradient(180deg, transparent 0%, #000 38%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/satin-soft.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_55%,rgb(255_253_249/.55),transparent_70%)]" />
        </div>

        <div className="wrap relative grid h-full grid-rows-[auto_minmax(0,1fr)] gap-2 pt-24 pb-4 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:grid-rows-1 md:items-center md:gap-10 md:py-0">
          <div className="relative z-10 max-w-[40rem] text-center md:text-left">
            <p data-copy className="glass eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-olive shadow-[0_8px_24px_-14px_rgb(46_28_18/.4)]">
              <span className="h-1.5 w-1.5 rounded-full bg-olive" />
              Introducing Zyrobe
            </p>
            <h2 id="meet-title" data-copy className="display mt-5 text-[2.35rem] sm:text-5xl md:mt-7 md:text-[2.5rem] lg:text-[3.4rem] xl:text-[4.1rem]">
              {PROMISE.split(", ")[0]},<br /> {PROMISE.split(", ")[1]}
            </h2>
            <p data-copy className="eyebrow mt-4 text-[0.66rem] text-muted md:mt-7 md:text-[0.72rem]">{TAGLINE}</p>
            <p data-copy className="mx-auto mt-5 hidden max-w-md text-lg leading-relaxed text-ink-soft md:mx-0 md:block">{SHORT_DESCRIPTION}</p>
          </div>

          <div
            className="relative flex min-h-0 items-center justify-center"
            style={{ perspective: "1700px", perspectiveOrigin: "50% 40%" }}
          >
            <div data-tilt className="relative" style={{ transformStyle: "preserve-3d" }}>
              <div
                data-rig
                className="relative will-change-transform"
                style={
                  {
                    "--W": "clamp(150px, min(24vw, 33svh), 330px)",
                    "--b": `calc(var(--W) * ${BEZEL})`,
                    "--k": `calc((var(--W) - 2 * var(--b)) / ${SW})`,
                    width: "var(--W)",
                    height: `calc(var(--k) * ${SH} + 2 * var(--b))`,
                    transformStyle: "preserve-3d",
                    transform: reduced ? "rotateX(10deg) rotateY(-16deg) rotateZ(3deg)" : undefined,
                    opacity: reduced ? 1 : 0,
                  } as CSSProperties
                }
              >
                {/* Body thickness */}
                <div
                  className="absolute inset-0 bg-[#0b0a09]"
                  style={{ borderRadius: `calc(var(--W) * ${R_FRAME})`, transform: "translateZ(calc(var(--W) * -0.035))" }}
                />
                {/* Frame + empty screen (the app background with its status bar) */}
                <div
                  className="absolute inset-0 bg-[#141210]"
                  style={{
                    borderRadius: `calc(var(--W) * ${R_FRAME})`,
                    padding: "var(--b)",
                    boxShadow:
                      "inset 0 0 0 1.5px #3a342e, inset 0 0 0 3px #0b0a09, 0 30px 60px -18px rgb(46 28 18 / .45), 0 60px 120px -40px rgb(46 28 18 / .35)",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden bg-cream" style={{ borderRadius: `calc(var(--W) * ${R_SCREEN})` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/media/home/base.webp" alt="" className="absolute inset-0 h-full w-full" loading="lazy" decoding="async" draggable={false} />
                  </div>
                </div>
                {/* The parts of the home screen */}
                {LAYERS.map((m) => {
                  const radius =
                    m.n === "nav"
                      ? `0 0 calc(var(--W) * ${R_SCREEN}) calc(var(--W) * ${R_SCREEN})`
                      : unit(m.r);
                  return (
                    <div
                      key={m.n}
                      data-layer
                      className="absolute will-change-transform"
                      style={{
                        left: `calc(var(--b) + ${unit(m.x)})`,
                        top: `calc(var(--b) + ${unit(m.y)})`,
                        width: unit(m.w),
                        height: unit(m.h),
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        data-lshadow
                        className="absolute inset-0"
                        style={{
                          borderRadius: radius,
                          opacity: 0,
                          boxShadow: m.r
                            ? "0 calc(var(--W) * 0.06) calc(var(--W) * 0.1) calc(var(--W) * -0.03) rgb(46 28 18 / .45), 0 1px 3px rgb(46 28 18 / .15)"
                            : "0 calc(var(--W) * 0.04) calc(var(--W) * 0.08) calc(var(--W) * -0.04) rgb(46 28 18 / .22)",
                        }}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/media/home/${m.n}.webp`}
                        alt=""
                        className="absolute inset-0 h-full w-full"
                        style={{ borderRadius: radius }}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
