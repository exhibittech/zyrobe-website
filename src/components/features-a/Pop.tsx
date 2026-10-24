import type { CSSProperties } from "react";
import { size } from "@/lib/media";

type Props = {
  src: string;
  /** Width as a fraction of the phone width (--phone-w). */
  w: number;
  /** Corner radius as a fraction of the rendered width, for rectangular crops. Omit for shaped (alpha) images. */
  r?: number;
  rot?: number;
  className?: string;
  style?: CSSProperties;
  /** Data attribute used to pick the element in the stage timeline. */
  tag: string;
  alt?: string;
};

/** A component that pops out of the phone. Hidden until the stage timeline reveals it. */
export default function Pop({ src, w, r, rot = 0, className = "", style, tag, alt = "" }: Props) {
  const s = size(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={s.w}
      height={s.h}
      loading="lazy"
      decoding="async"
      draggable={false}
      data-rot={rot}
      {...{ [`data-${tag}`]: "" }}
      className={`invisible absolute h-auto select-none ${r === undefined ? "drop-shadow-[0_14px_22px_rgb(46_28_18/.28)]" : "pop"} ${className}`}
      style={{
        width: `calc(var(--phone-w) * ${w})`,
        ...(r === undefined ? {} : { borderRadius: `calc(var(--phone-w) * ${w * r})` }),
        ...style,
      }}
    />
  );
}
