"use client";

import { forwardRef, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { size } from "@/lib/media";

/*
 * Pop-outs are sized in phone widths so a scene keeps its proportions at every
 * breakpoint. `--m` (set on the scene box) magnifies them on small screens,
 * where the phone is narrow and app text would get too small to read.
 */
const unit = (f: number) => `calc(var(--phone-w) * ${f} * var(--m, 1))`;

type PopProps = {
  src: string;
  alt?: string;
  /** Width as a fraction of the phone width. */
  w: number;
  /** Corner radius as a fraction of the pop's own width, or "pill". */
  r?: number | "pill";
  className?: string;
  style?: CSSProperties;
  /** Depth (px) inside a preserve-3d scene, for parallax as the scene tilts. */
  z?: number;
  shadow?: boolean;
  /** data-* hooks for scroll choreography. */
  [data: `data-${string}`]: string | boolean | undefined;
};

/** A component lifted out of the app UI (real capture), like the launch film's pop-outs. */
export const Pop = forwardRef<HTMLDivElement, PopProps>(function Pop(
  { src, alt = "", w, r = 0.06, className = "", style, z = 0, shadow = true, ...data },
  ref,
) {
  const { w: iw, h: ih } = size(src);
  return (
    <div
      ref={ref}
      {...data}
      data-z={z || undefined}
      className={`absolute overflow-hidden ${shadow ? "pop" : ""} ${className}`}
      style={{
        width: unit(w),
        aspectRatio: `${iw} / ${ih}`,
        borderRadius: r === "pill" ? 9999 : unit(w * r),
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={iw} height={ih} loading="lazy" decoding="async" draggable={false} className="block h-full w-full" />
    </div>
  );
});

/** Box the size of a <Phone/>; pop-outs are positioned in it with percentages. */
export function SceneBox({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative [--m:1.3] md:[--m:1] max-md:[--phone-w:clamp(130px,min(50vw,calc((100svh_-_330px)*0.42)),240px)] ${className}`}
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948", transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}

/**
 * The chapter <section> that drives a stage. Chapter's sectionRef is still null while a
 * child's layout effect runs (React attaches ancestor refs after child effects), so look it up.
 */
export function chapterOf(el: HTMLElement | null) {
  return el?.closest("section") ?? undefined;
}

/** Offset (px) that moves `el` onto the centre of its scene box: the pop starts "inside" the phone. */
export function toCenter(el: HTMLElement) {
  const box = el.offsetParent as HTMLElement | null;
  if (!box) return { x: 0, y: 0 };
  return {
    x: box.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
    y: box.offsetHeight * 0.45 - (el.offsetTop + el.offsetHeight / 2),
  };
}

/** Muted looping footage for a screen layer; plays only while on screen. */
export function ScreenVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video ref={ref} className={`absolute inset-0 h-full w-full object-cover ${className}`} poster={poster} muted loop playsInline preload="none" aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** A toast drawn like the app's (cream card, check circle), for messages we have no capture of. */
type DataAttrs = { [data: `data-${string}`]: string | boolean | undefined };

export function AppToast({ title, sub, w, className = "", style, ...data }: { title: string; sub: string; w: number; className?: string; style?: CSSProperties } & DataAttrs) {
  return (
    <div
      {...data}
      className={`pop absolute flex items-center gap-[0.7em] bg-[#f9f3ee] px-[0.9em] py-[0.75em] text-left ${className}`}
      style={{ width: unit(w), fontSize: unit(0.042), borderRadius: unit(0.05), ...style }}
    >
      <svg viewBox="0 0 24 24" className="h-[1.7em] w-[1.7em] shrink-0 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="m8 12.3 2.7 2.7L16.2 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-tight">
        <span className="block font-bold text-[#1f1f1f]">{title}</span>
        <span className="mt-[0.2em] block text-[#555]">{sub}</span>
      </span>
    </div>
  );
}

/** A pill drawn like the app's trip header chips (white, hairline border, outline icon). */
export function AppPill({ icon, label, w, className = "", style, dark = false, ...data }: { icon: "pin" | "calendar"; label: string; w?: number; className?: string; style?: CSSProperties; dark?: boolean } & DataAttrs) {
  return (
    <div
      {...data}
      className={`pop absolute flex items-center justify-center gap-[0.5em] whitespace-nowrap rounded-full px-[1em] py-[0.6em] font-bold ${
        dark ? "bg-[#151a2c] text-white" : "border border-[#e3e3e3] bg-white text-[#1d1d1f]"
      } ${className}`}
      style={{ fontSize: unit(0.05), ...(w ? { width: unit(w) } : {}), ...style }}
    >
      <svg viewBox="0 0 24 24" className="h-[1.15em] w-[1.15em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        {icon === "pin" ? (
          <>
            <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.3" />
          </>
        ) : (
          <>
            <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
            <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
          </>
        )}
      </svg>
      {label}
    </div>
  );
}
