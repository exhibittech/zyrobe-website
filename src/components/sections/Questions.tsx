"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { E, L, P } from "@/components/story/ease";

/**
 * The film's eleven wardrobe problems. x/y/r: position + tilt in the film's 1920x1080 frame;
 * px/py: position in a 390x844 portrait frame (phones).
 */
const PROBLEMS = [
  { t: "Where did I keep that shirt?", x: 690, y: 330, r: -3, px: 172, py: 236 },
  { t: "Does this even go together?", x: 1270, y: 290, r: 2.5, px: 218, py: 562 },
  { t: "Will it look good on me?", x: 1200, y: 735, r: -2, px: 166, py: 642 },
  { t: "What do I pack for Paris?", x: 700, y: 760, r: 3, px: 208, py: 166 },
  { t: "Nothing to wear. Again.", x: 965, y: 185, r: -1.5, px: 184, py: 308 },
  { t: "Didn’t I wear this last week?", x: 1390, y: 520, r: 1.5, px: 202, py: 714 },
  { t: "Is it too cold for this?", x: 545, y: 545, r: 2, px: 222, py: 490 },
  { t: "Too formal?", x: 905, y: 455, r: -4, px: 96, py: 386 },
  { t: "Does it still fit?", x: 1060, y: 610, r: 3, px: 292, py: 610 },
  { t: "Where are my black shoes?", x: 960, y: 905, r: -2, px: 188, py: 786 },
  { t: "Shirt or tee?", x: 1125, y: 425, r: -3, px: 300, py: 380 },
];

// Film timeline (seconds), mapped onto scroll.
const PT = [1.0, 1.75, 2.45, 3.1, 3.7, 4.25, 4.75, 5.2, 5.6, 5.95, 6.25]; // unhurried at first, then piling up
const REC = 7.2, L1 = 7.75, L1OUT = 9.55, L2 = 10.0, SUCK = 10.55, DIVE = 11.95, HIT = 13.33;
const T_START = 0.55, T_END = HIT + 0.25;
const P_DIVE = 0.8; // the dive gets the last fifth of the scroll, the rest plays at film pace
const timeAt = (p: number) => (p < P_DIVE ? L(T_START, DIVE, p / P_DIVE) : L(DIVE, T_END, (p - P_DIVE) / (1 - P_DIVE)));

const BAND_MASK = "linear-gradient(112deg, transparent 22%, rgba(0,0,0,.55) 38%, #000 50%, rgba(0,0,0,.55) 62%, transparent 78%)";
const EDGE_MASK = "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)";
const LINE1 = "So many questions.";
const LINE2 = "One answer";

const GLYPH = [239, 228, 210]; // #EFE4D2, the words on dark satin
const CREAM = [250, 247, 242]; // #FAF7F2, the next section

type Dot = { cx: number; cy: number; r: number };

/** Style writes only when the value changed (the loop runs every frame while on screen). */
function makeSetter() {
  const cache = new WeakMap<HTMLElement, Record<string, string>>();
  return (el: HTMLElement, prop: string, val: string) => {
    let c = cache.get(el);
    if (!c) cache.set(el, (c = {}));
    if (c[prop] === val) return;
    c[prop] = val;
    el.style.setProperty(prop, val);
  };
}

/** Pixel bounds of the "." ink relative to the pen position + baseline (canvas scan, as in the film). */
function measureGlyphDot(font: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 400;
  const g = c.getContext("2d");
  if (!g) return null;
  g.font = font;
  g.fillStyle = "#000";
  g.textBaseline = "alphabetic";
  g.fillText(".", 100, 300);
  const px = g.getImageData(0, 0, 400, 400).data;
  let minY = 400, maxY = 0, minX = 400, maxX = 0;
  for (let y = 330; y >= 180; y--) {
    let row = false;
    for (let x = 0; x < 400; x++) {
      if (px[(y * 400 + x) * 4 + 3] > 128) {
        row = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
    if (row) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else if (maxY) break;
  }
  if (!maxY) return null;
  return { dx: (minX + maxX) / 2 - 100, dy: (minY + maxY) / 2 - 300, r: (maxX - minX) / 2 + 0.75 };
}

export default function Questions() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current!, stage = stageRef.current!;
      const q = <T extends Element = HTMLElement>(s: string) => stage.querySelector(s) as unknown as T;
      const qa = (s: string) => Array.from(stage.querySelectorAll<HTMLElement>(s));
      const cam = q<HTMLElement>("[data-cam]"), band = q<HTMLElement>("[data-band]"), bandImg = q<HTMLElement>("[data-band-img]");
      const shade = q<HTMLElement>("[data-shade]"), qWrap = q<HTMLElement>("[data-qwrap]"), line1 = q<HTMLElement>("[data-line1]");
      const line2 = q<HTMLElement>("[data-line2]"), mark = q<HTMLElement>("[data-mark]"), probe = q<HTMLElement>("[data-probe]");
      const dotEl = q<HTMLElement>("[data-dot]");
      const bubbles = qa("[data-bubble]"), l1 = qa("[data-l1]"), l2 = qa("[data-l2]");
      const set = makeSetter();

      if (prefersReducedMotion()) {
        setReduced(true);
        return;
      }

      let W = 1, H = 1, u = 1, portrait = false, D: Dot | null = null;

      const layout = () => {
        W = stage.clientWidth;
        H = stage.clientHeight;
        portrait = W / H < 0.8;
        u = portrait ? Math.min(W / 390, H / 844) : Math.min(W / 1920, H / 1080);
        stage.style.setProperty("--bub", `${(portrait ? 14.5 : 36) * u}px`);
        stage.style.setProperty("--line", `${(portrait ? 38 : 96) * u}px`);
        // Measure the full stop with the wrapper untransformed.
        const prev = qWrap.style.transform;
        qWrap.style.transform = "none";
        const sr = stage.getBoundingClientRect(), pr = probe.getBoundingClientRect();
        const cs = getComputedStyle(line2);
        const ink = measureGlyphDot(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`);
        const fs = parseFloat(cs.fontSize);
        D = ink
          ? { cx: pr.left - sr.left + ink.dx, cy: pr.top - sr.top + ink.dy, r: ink.r }
          : { cx: pr.left - sr.left + fs * 0.09, cy: pr.top - sr.top - fs * 0.06, r: fs * 0.055 };
        qWrap.style.transform = prev;
      };

      const progress = ScrollTrigger.create({ trigger: section, start: "top 35%", end: "bottom bottom" });

      const letterIn = (s: HTMLElement, t: number) => {
        const e = E.out4(P(t, 0, 1));
        set(s, "opacity", e.toFixed(3));
        set(s, "transform", `perspective(5000px) translate3d(0,${((1 - e) * 44 * u).toFixed(2)}px,0.01px)`);
        set(s, "filter", e < 0.999 ? `blur(${((1 - e) * 12 * u).toFixed(1)}px)` : "none");
      };

      const render = (now: number) => {
        if (!D) return;
        const T = timeAt(progress.progress);

        // Camera: slow push across the fabric.
        const c = E.io2(P(T, 0, HIT));
        set(cam, "transform", `translate3d(${(L(-60, 50, c) * u).toFixed(1)}px,${(L(14, -10, c) * u).toFixed(1)}px,0) scale(${L(1.16, 1.04, c).toFixed(4)}) rotate(${L(1.5, 0, c).toFixed(3)}deg)`);
        // Raking light: a soft diagonal band crossing the folds (moved on the compositor, image held still).
        const bx = L(-40, 135, E.io2(P(T, 0.5, HIT - 0.4))) - 50;
        set(band, "transform", `translate3d(${bx.toFixed(2)}%,0,0)`);
        set(bandImg, "transform", `translate3d(${(-bx).toFixed(2)}%,0,0)`);
        const lit = (0.28 + 0.5 * E.io2(P(T, 0.4, 2.2))) * (1 - 0.4 * E.io2(P(T, REC, REC + 1.4))) + 0.5 * E.in3(P(T, HIT - 1.4, HIT - 0.05));
        set(band, "opacity", Math.min(1, lit).toFixed(3));
        set(shade, "opacity", (1 - E.in3(P(T, HIT - 1.4, HIT))).toFixed(3));

        // The problems pop in and pile up, step back behind the words, then all fall into the full stop.
        const rec = E.io3(P(T, REC, REC + 1.0));
        const cx0 = portrait ? 195 : 960, cy0 = portrait ? 422 : 540;
        bubbles.forEach((b, i) => {
          const t0 = PT[i];
          if (T < t0) {
            set(b, "opacity", "0");
            return;
          }
          const pr = PROBLEMS[i];
          const x = portrait ? pr.px : pr.x, y = portrait ? pr.py : pr.y;
          const p = P(T, t0, t0 + 0.5);
          const later = PT.reduce((n, tx) => n + (tx > t0 ? E.io2(P(T, tx, tx + 0.35)) : 0), 0); // each new bubble nudges the pile
          const push = 0.02 * later + 0.5 * rec, drift = Math.sin(now * 0.8 + i * 1.7) * 4;
          let X = W / 2 + (x - cx0 + (x - cx0) * push) * u;
          let Y = H / 2 + (y - cy0 + (y - cy0) * push + drift + (1 - E.out3(p)) * 26) * u;
          let sc = L(0.7, 1, E.outBack(p)) * (1 - 0.014 * later) * L(1, 0.8, rec);
          let op = E.io2(P(T, t0, t0 + 0.2)) * L(1, 0.3, rec);
          let blur = rec * 5.5;
          // Fall into the dot: the farthest ones leave first.
          const dd = Math.hypot(x - cx0, y - cy0) / (portrait ? 420 : 520);
          const s0 = SUCK + (1 - Math.min(1, dd)) * 0.45 + (i % 3) * 0.06;
          const k = E.io2(P(T, s0, s0 + 0.9));
          if (k > 0) {
            X = L(X, D!.cx, k);
            Y = L(Y, D!.cy, k);
            sc *= L(1, 0.04, E.out2(k));
            op = L(op, 0.5, E.out2(P(k, 0, 0.35))) * (1 - E.io2(P(k, 0.7, 1)));
            blur = L(blur, 2.5, k);
          }
          set(b, "transform", `translate3d(${X.toFixed(1)}px,${Y.toFixed(1)}px,0) translate(-50%,-50%) rotate(${(pr.r * L(1.7, 1, E.out3(p)) * (1 - k)).toFixed(2)}deg) scale(${sc.toFixed(4)})`);
          set(b, "opacity", op.toFixed(3));
          set(b, "filter", blur > 0.05 ? `blur(${(blur * u).toFixed(2)}px)` : "none");
        });

        // "So many questions." types in, holds, lifts away.
        const out1 = E.io2(P(T, L1OUT, L1OUT + 0.55));
        l1.forEach((s, i) => letterIn(s, T - (L1 + i * 0.035)));
        set(line1, "opacity", (1 - out1).toFixed(3));
        set(line1, "transform", `perspective(5000px) translate3d(0,${(-out1 * 34 * u).toFixed(2)}px,0.01px)`);
        set(line1, "filter", out1 > 0.001 ? `blur(${(out1 * 8 * u).toFixed(2)}px)` : "none");

        // "One answer." and its full stop, which takes every question in.
        l2.forEach((s, i) => letterIn(s, T - (L2 + i * 0.05)));
        const markIn = E.out4(P(T - (L2 + LINE2.length * 0.05), 0, 1));
        // The round dot takes over from the glyph before the zoom shows: they differ by ~1 px.
        set(mark, "opacity", (markIn * (1 - E.io2(P(T, DIVE, DIVE + 0.25)))).toFixed(3));
        const glow = E.io2(P(T, SUCK + 0.55, SUCK + 1.25)) * (1 - E.io2(P(T, DIVE + 0.2, DIVE + 0.6)));
        set(mark, "text-shadow", glow > 0.001 ? `0 0 ${(glow * 26 * u).toFixed(1)}px rgba(255,236,200,${(glow * 0.9).toFixed(3)})` : "none");

        // Dive into the full stop.
        const z = E.in4(P(T, DIVE, HIT));
        const Smax = (Math.hypot(W, H) / D.r) * 1.6;
        const S = Math.exp(Math.log(Smax) * z);
        const pull = E.in3(P(T, DIVE, HIT));
        const dx = D.cx + pull * (W / 2 - D.cx), dy = D.cy + pull * (H / 2 - D.cy);
        set(qWrap, "transform", z > 0 ? `translate(${(dx - D.cx * S).toFixed(2)}px,${(dy - D.cy * S).toFixed(2)}px) scale(${S.toFixed(4)})` : "none");
        set(line2, "opacity", (1 - P(S, 6, 18)).toFixed(3));
        if (z > 0) {
          const m = P(S, 20, 240);
          const col = GLYPH.map((g, j) => Math.round(L(g, CREAM[j], m))).join(",");
          set(dotEl, "opacity", "1");
          set(dotEl, "background-color", `rgb(${col})`);
          set(dotEl, "clip-path", `circle(${(D.r * S).toFixed(2)}px at ${dx.toFixed(2)}px ${dy.toFixed(2)}px)`);
        } else {
          set(dotEl, "opacity", "0");
        }
      };

      const tick = () => render(performance.now() / 1000);
      let running = false;
      const run = (on: boolean) => {
        if (on === running) return;
        running = on;
        if (on) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      };
      ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: (s) => run(s.isActive) });

      const relayout = () => {
        layout();
        tick();
      };
      relayout();
      document.fonts?.ready.then(relayout);
      ScrollTrigger.addEventListener("refresh", relayout);
      const ro = new ResizeObserver(relayout);
      ro.observe(stage);
      return () => {
        run(false);
        ro.disconnect();
        ScrollTrigger.removeEventListener("refresh", relayout);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="questions"
      aria-labelledby="questions-title"
      className="relative bg-[#241d17] text-[#efe4d2]"
      style={
        reduced
          ? { height: "auto" }
          : {
              height: "360vh",
              // Overlap the hero's last 24vh and feather in, so its dark satin cross-fades into this one (no seam).
              marginTop: "-24vh",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 24vh)",
              maskImage: "linear-gradient(to bottom, transparent 0, #000 24vh)",
            }
      }
    >
      <h2 id="questions-title" className="sr-only">
        So many questions. One answer.
      </h2>
      <div
        ref={stageRef}
        className={`${reduced ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden`}
        aria-hidden="true"
        style={{ "--bub": "24px", "--line": "64px" } as CSSProperties}
      >
        {/* Dark satin with a raking light; the camera pushes slowly across it. */}
        <div data-cam className="absolute -inset-[9%] will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/satin-dark.webp" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div
            data-band
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={{
              opacity: 0.3,
              // Diagonal band, intersected with a horizontal fade so the moving layer's side edges never show
              // (on tall phone screens the 112deg band alone reaches the left/right edges).
              WebkitMaskImage: `${BAND_MASK}, ${EDGE_MASK}`,
              WebkitMaskComposite: "source-in",
              maskImage: `${BAND_MASK}, ${EDGE_MASK}`,
              maskComposite: "intersect",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-band-img
              src="/media/brand/satin-md.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ filter: "brightness(.8) sepia(.15)" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div
          data-shade
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,7,5,.55), rgba(10,7,5,0) 70%), linear-gradient(180deg, rgba(8,6,4,.45), rgba(8,6,4,0) 30%, rgba(8,6,4,0) 70%, rgba(8,6,4,.5))",
          }}
        />

        {/* The problems */}
        {PROBLEMS.map((p) => (
          <div
            key={p.t}
            data-bubble
            className={`absolute left-0 top-0 whitespace-nowrap font-sans text-[#2a211a] will-change-transform ${reduced ? "" : "opacity-0"}`}
            style={{
              fontSize: "var(--bub)",
              padding: "0.46em 0.83em 0.49em",
              borderRadius: "0.78em 0.78em 0.78em 0.2em",
              background: "linear-gradient(180deg, rgba(246,238,225,.96), rgba(234,222,203,.94))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.7), 0 0.6em 1.2em -0.35em rgba(0,0,0,.6), 0 0.05em 0.15em rgba(0,0,0,.25)",
              ...(reduced
                ? {
                    position: "absolute",
                    left: `${(p.x / 1920) * 100}%`,
                    top: `${(p.y / 1080) * 100}%`,
                    transform: `translate(-50%,-50%) rotate(${p.r}deg)`,
                    opacity: 0.2,
                    filter: "blur(1.5px)",
                  }
                : null),
            }}
          >
            {p.t}
          </div>
        ))}

        {/* "So many questions." */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p
            data-line1
            className="display whitespace-nowrap text-center"
            style={{ fontSize: "var(--line)", letterSpacing: "-0.015em", opacity: reduced ? 1 : undefined, transform: reduced ? "translateY(-60%)" : undefined }}
          >
            {[...LINE1].map((ch, i) => (
              <span key={i} data-l1 className={`inline-block ${reduced ? "" : "opacity-0"}`}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
        </div>

        {/* "One answer." — the wrapper zooms into its full stop. */}
        <div data-qwrap className="pointer-events-none absolute inset-0 flex origin-top-left items-center justify-center">
          <p
            data-line2
            className="display whitespace-nowrap text-center"
            style={{ fontSize: "var(--line)", letterSpacing: "-0.006em", transform: reduced ? "translateY(60%)" : undefined }}
          >
            {[...LINE2].map((ch, i) => (
              <span key={i} data-l2 className={`inline-block ${reduced ? "" : "opacity-0"}`}>
                {ch === " " ? " " : ch}
              </span>
            ))}
            <span data-probe className="inline-block h-0 w-0 align-baseline" />
            <span data-mark className={reduced ? "" : "opacity-0"}>.</span>
          </p>
        </div>

        {/* The full stop, grown until it fills the screen in cream. */}
        <div data-dot className="pointer-events-none absolute inset-0 opacity-0" style={{ backgroundColor: "#efe4d2", clipPath: "circle(0px at 50% 50%)" }} />
      </div>
    </section>
  );
}
