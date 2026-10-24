"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import PlayButton from "@/components/ui/PlayButton";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { PROMISE, SHORT_DESCRIPTION } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

type Mode = "pending" | "webgl" | "static";

// Decided once on the client: WebGL story, or the still collage (reduced motion, no WebGL, a software
// renderer, Data Saver, or a low-end phone that would drop frames).
let detected: Mode | null = null;
function canRunWebGL(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3) return false;
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}
function detectMode(): Mode {
  if (detected) return detected;
  detected = !prefersReducedMotion() && canRunWebGL() ? "webgl" : "static";
  return detected;
}
const noop = () => () => {};
const useMode = () => useSyncExternalStore<Mode>(noop, detectMode, () => "pending");

const MOBILE_Q = "(max-width: 767px)";
function useMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(MOBILE_Q);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(MOBILE_Q).matches,
    () => false,
  );
}

// Still fallback: five pieces resting around the headline.
const COLLAGE = [
  { id: "c06", cls: "left-[4%] top-[14%] w-[24vw] -rotate-[10deg] md:left-[7%] md:top-[16%] md:w-[13vw]" },
  { id: "c13", cls: "right-[4%] top-[12%] w-[24vw] rotate-[9deg] md:right-[8%] md:top-[14%] md:w-[13vw]" },
  { id: "c04", cls: "hidden md:block right-[3%] top-[48%] w-[10vw] -rotate-[6deg] opacity-80" },
  { id: "c15", cls: "left-[8%] bottom-[4%] w-[22vw] rotate-[7deg] md:left-[12%] md:bottom-[5%] md:w-[11vw]" },
  { id: "c22", cls: "right-[8%] bottom-[3%] w-[22vw] -rotate-[6deg] md:right-[13%] md:bottom-[4%] md:w-[11vw]" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mode = useMode();
  const mobile = useMobile();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (mode === "pending") return;
      if (mode === "webgl") {
        gsap.to("[data-cue-dot]", { y: 30, opacity: 0, duration: 1.6, ease: "power2.in", repeat: -1, repeatDelay: 0.3 });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (s) => {
                progress.current = s.progress;
              },
            },
          })
          .to(copyRef.current, { yPercent: -16, opacity: 0, scale: 0.97, duration: 0.3 }, 0)
          .to(cueRef.current, { opacity: 0, duration: 0.05 }, 0)
          .fromTo(captionRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.14 }, 0.7)
          .to({}, { duration: 0.16 }, 0.84);
      }
    },
    { scope: sectionRef, dependencies: [mode] },
  );

  const story = mode !== "static";

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Zyrobe"
      className={`relative ${story ? "h-[200vh]" : "h-[100svh]"} motion-reduce:h-[100svh]`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-cream">
        {/* Static satin paints first (LCP-safe); the live satin fades in over it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/brand/satin.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/35" />

        {mode === "webgl" && (
          <div
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-silk"
            style={{ opacity: ready ? 1 : 0 }}
          >
            <HeroScene progress={progress} mobile={mobile} active={active} onReady={() => setReady(true)} />
          </div>
        )}

        {mode === "static" && (
          <div aria-hidden className="absolute inset-0">
            {COLLAGE.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.id}
                src={`/media/garments/${c.id}.webp`}
                alt=""
                width={315}
                height={399}
                decoding="async"
                className={`absolute h-auto drop-shadow-[0_18px_22px_rgb(46_28_18/.22)] ${c.cls}`}
              />
            ))}
          </div>
        )}

        {/* Soft light behind the words keeps them crisp over the cloth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_34%_at_50%_52%,rgb(250_247_242/.7),rgb(250_247_242/0)_72%)] md:bg-[radial-gradient(ellipse_46%_42%_at_50%_53%,rgb(250_247_242/.55),rgb(250_247_242/0)_74%)]"
        />

        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-14 text-center will-change-transform"
        >
          <h1 className="w-[min(70vw,27rem)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/brand/logo.webp"
              alt=""
              width={1400}
              height={473}
              fetchPriority="high"
              className="h-auto w-full"
              draggable={false}
            />
            <span className="sr-only">Zyrobe</span>
          </h1>
          <p className="display mt-5 max-w-[16ch] text-[2.05rem] text-ink sm:max-w-none sm:text-5xl md:mt-7 lg:text-[3.6rem]">
            {PROMISE.split(", ")[0]}, <em className="italic">{PROMISE.split(", ")[1]}</em>
          </p>
          <p className="mt-4 max-w-[21rem] text-[0.98rem] leading-relaxed text-balance text-ink-soft md:mt-5 md:max-w-[30rem] md:text-lg">
            {SHORT_DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-7 md:mt-10">
            <PlayButton size="lg" />
            <a
              href="#features"
              className="group inline-flex items-center gap-2 text-sm font-bold tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              See how it works
              <span aria-hidden className="transition-transform duration-500 ease-silk group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div
          ref={captionRef}
          className="pointer-events-none absolute inset-x-0 bottom-[7%] z-10 px-6 text-center opacity-0 md:bottom-[9%]"
        >
          <p className="eyebrow text-olive">Your wardrobe, sorted</p>
          <p className="display mx-auto mt-3 max-w-[13ch] text-[2.1rem] text-balance md:max-w-none md:text-5xl">All your clothes. One place.</p>
        </div>

        {story && (
          <div
            ref={cueRef}
            aria-hidden
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-soft md:flex"
          >
            <span className="eyebrow text-[0.58rem] tracking-[0.34em]">Scroll</span>
            <span className="relative h-9 w-px overflow-hidden bg-ink/15">
              <span data-cue-dot className="absolute left-0 top-0 h-3 w-px bg-ink/70" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
