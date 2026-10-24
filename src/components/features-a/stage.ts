"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useChapter } from "@/components/ui/Chapter";

export type StageCtx = { mobile: boolean; reduce: boolean; q: (sel: string) => HTMLElement[] };

/**
 * Scroll-scrubbed timeline for a chapter stage, written in 0..1 progress units
 * (the timeline is padded to 1). Desktop and mobile are built separately through
 * gsap.matchMedia; with reduced motion the stage is shown statically at `rest`.
 */
export function useStageTimeline(
  scope: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline, ctx: StageCtx) => void,
  { start = "top 30%", end = "bottom bottom", rest = 1 }: { start?: string; end?: string; rest?: number } = {},
) {
  useChapter(); // must sit inside a <Chapter>

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      // Not useChapter().sectionRef: an ancestor's ref is attached after this layout effect runs.
      const trigger = root.closest("section");
      const sel = gsap.utils.selector(root);
      const q = (s: string) => sel(s) as HTMLElement[];
      const mm = gsap.matchMedia();
      mm.add(
        { mobile: "(max-width: 767px)", desktop: "(min-width: 768px)", reduce: "(prefers-reduced-motion: reduce)" },
        (c) => {
          const { mobile, reduce } = c.conditions as { mobile: boolean; reduce: boolean };
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: reduce
              ? undefined
              : { trigger, start, end, scrub: 0.5, invalidateOnRefresh: true },
          });
          build(tl, { mobile, reduce, q });
          tl.set({}, {}, 1);
          if (reduce) tl.progress(rest).pause();
        },
      );
      return () => mm.revert();
    },
    { scope },
  );
}

/** Offset from an element's laid-out centre (transforms ignored) to the centre of the phone box it sits in. */
export function toPhone(el: HTMLElement) {
  const box = el.offsetParent as HTMLElement | null;
  if (!box) return { x: 0, y: 0 };
  return {
    x: box.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
    y: box.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
  };
}

type PopOpts = { dur?: number; stagger?: number; reach?: number };

/** Components lift out of the phone (from its centre, small) and land at their place, like the film. */
export function popOut(tl: gsap.core.Timeline, els: HTMLElement[], at: number, { dur = 0.14, stagger = 0.05, reach = 0.85 }: PopOpts = {}) {
  els.forEach((el, i) => {
    tl.fromTo(
      el,
      { x: () => toPhone(el).x * reach, y: () => toPhone(el).y * reach, scale: 0.3, rotate: 0, autoAlpha: 0 },
      { x: 0, y: 0, scale: 1, rotate: Number(el.dataset.rot ?? 0), autoAlpha: 1, duration: dur, ease: "back.out(1.15)" },
      at + i * stagger,
    );
  });
}

/** The reverse: components dive back into the phone. */
export function diveIn(tl: gsap.core.Timeline, els: HTMLElement[], at: number, { dur = 0.12, stagger = 0.05, reach = 0.95 }: PopOpts = {}) {
  els.forEach((el, i) => {
    tl.to(
      el,
      { x: () => toPhone(el).x * reach, y: () => toPhone(el).y * reach, scale: 0.25, rotate: 0, autoAlpha: 0, duration: dur, ease: "power2.in" },
      at + i * stagger,
    );
  });
}

/** Slow 3D turn of the phone across the whole chapter. */
export function tilt(tl: gsap.core.Timeline, el: HTMLElement | undefined, from = -12, to = 9) {
  if (!el) return;
  tl.fromTo(
    el,
    { rotateY: from, rotateX: 5, transformPerspective: 1600 },
    { rotateY: to, rotateX: -3, transformPerspective: 1600, duration: 1, ease: "sine.inOut" },
    0,
  );
}
