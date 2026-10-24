"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger scrubs stay in lockstep. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: { offset: -72 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Late-loading media changes section heights.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
