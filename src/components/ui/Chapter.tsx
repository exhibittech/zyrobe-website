"use client";

import { createContext, useContext, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Ctx = { sectionRef: RefObject<HTMLElement | null> };
const ChapterCtx = createContext<Ctx | null>(null);

/**
 * Inside a <Chapter> stage: the chapter <section>. Drive stage animations with
 * ScrollTrigger { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: true }
 * so they map to the whole time the stage is pinned (CSS sticky).
 */
export function useChapter() {
  const c = useContext(ChapterCtx);
  if (!c) throw new Error("useChapter must be used inside <Chapter>");
  return c;
}

type Props = {
  id: string;
  index: number;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  points?: string[];
  /** Copy column side on desktop. */
  side?: "left" | "right";
  /** Section height in vh; the stage stays pinned for (length - 100)vh of scroll. */
  length?: number;
  tone?: "cream" | "satin" | "dark";
  /** Replace the default copy block entirely (e.g. copy that changes mid-chapter). */
  copy?: ReactNode;
  className?: string;
  stageClassName?: string;
  style?: CSSProperties;
  children: ReactNode; // the stage
};

const tones = {
  cream: "bg-cream text-ink",
  satin: "bg-satin text-ink",
  dark: "bg-dusk text-cream",
};

/** A feature chapter: pinned two-column scene (copy + animated stage), like a chapter of the launch film. */
export default function Chapter({
  id, index, eyebrow, title, body, points, side = "left", length = 260, tone = "cream",
  copy, className = "", stageClassName = "", style, children,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = copyRef.current?.querySelectorAll("[data-copy]");
      if (!items?.length) return;
      gsap.from(items, {
        y: 28,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <ChapterCtx.Provider value={{ sectionRef }}>
      <section
        ref={sectionRef}
        id={id}
        className={`relative ${tones[tone]} ${className}`}
        style={{ height: `${length}vh`, ...style }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="wrap grid h-full grid-rows-[auto_minmax(0,1fr)] gap-4 pt-20 pb-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:grid-rows-1 md:items-center md:gap-10 md:py-0">
            <div ref={copyRef} className={`relative z-10 max-w-xl ${side === "right" ? "md:order-2 md:justify-self-end" : ""}`}>
              {copy ?? (
                <>
                  <p data-copy className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-sand" : "text-olive"}`}>
                    <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-current opacity-50" />
                    {eyebrow}
                  </p>
                  <h2 data-copy className="display mt-3 text-[2.1rem] sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl">
                    {title}
                  </h2>
                  <div data-copy className={`mt-3 max-w-md text-[0.95rem] leading-relaxed md:mt-6 md:text-lg ${tone === "dark" ? "text-sand" : "text-ink-soft"}`}>
                    {body}
                  </div>
                  {points?.length ? (
                    <ul data-copy className={`mt-8 hidden space-y-2.5 text-[0.95rem] md:block ${tone === "dark" ? "text-sand" : "text-ink-soft"}`}>
                      {points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className={`mt-[0.6em] h-1 w-1 shrink-0 rounded-full ${tone === "dark" ? "bg-sand" : "bg-olive"}`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
            </div>
            <div
              className={`relative flex h-full min-h-0 items-center justify-center ${stageClassName}`}
              style={{ "--phone-w": "clamp(170px, min(24vw, 34svh), 330px)" } as CSSProperties}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </ChapterCtx.Provider>
  );
}
