"use client";

import { forwardRef, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  /** Screen image (public path). Ignored when `video` is set. */
  src?: string;
  /** Looping, muted app footage that only plays while visible. */
  video?: { src: string; poster: string };
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Extra layers drawn inside the screen (cross-fading screens, highlights…). */
  children?: ReactNode;
  /** Load eagerly (above the fold). */
  priority?: boolean;
};

/**
 * Pixel-style phone (screens are 900x1948 captures with a clean 9:41 status bar).
 * Width comes from the CSS var --phone-w (override per use with style={{"--phone-w": "280px"}}).
 */
const Phone = forwardRef<HTMLDivElement, Props>(function Phone(
  { src, video, alt = "", className = "", style, children, priority },
  ref,
) {
  const vRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [video?.src]);

  return (
    <div
      ref={ref}
      className={`relative shrink-0 ${className}`}
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948", ...style }}
    >
      {/* Frame */}
      <div
        className="absolute inset-0 rounded-[calc(var(--phone-w)*0.15)] bg-[#141210] p-[calc(var(--phone-w)*0.028)]"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px #3a342e, inset 0 0 0 3px #0b0a09, 0 2px 4px rgb(46 28 18 / .12), 0 30px 60px -18px rgb(46 28 18 / .45), 0 60px 120px -40px rgb(46 28 18 / .35)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--phone-w)*0.125)] bg-cream">
          {video ? (
            <video
              ref={vRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={video.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={alt}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ) : src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          ) : null}
          {children}
          {/* Glass sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/.14)_0%,transparent_32%,transparent_70%,rgb(255_255_255/.05)_100%)]" />
        </div>
        {/* Punch-hole camera */}
        <div className="absolute left-1/2 top-[calc(var(--phone-w)*0.05)] h-[calc(var(--phone-w)*0.036)] w-[calc(var(--phone-w)*0.036)] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />
      </div>
    </div>
  );
});

export default Phone;
