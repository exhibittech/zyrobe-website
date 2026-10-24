// Small app-UI pieces drawn in HTML inside the phone (sizes scale with --phone-w like a screenshot).

import type { CSSProperties } from "react";

/** n percent of the phone width. */
export const u = (n: number) => `calc(var(--phone-w) * ${n / 100})`;

export function StatusBar() {
  return (
    <div className="flex shrink-0 items-end justify-between text-ink" style={{ height: u(9), paddingInline: u(7), paddingBottom: u(1) }}>
      <span className="font-bold" style={{ fontSize: u(3.4) }}>9:41</span>
      <svg viewBox="0 0 54 12" style={{ width: u(11) }} aria-hidden="true">
        <g fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx=".8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx=".8" />
          <rect x="9" y="3" width="3" height="9" rx=".8" />
          <rect x="13.5" y=".5" width="3" height="11.5" rx=".8" />
          <path d="M27 2.2c2.4 0 4.6.9 6.3 2.4l1.3-1.4A11 11 0 0 0 27 .3a11 11 0 0 0-7.6 2.9l1.3 1.4A9 9 0 0 1 27 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.4L32 5.8a7.4 7.4 0 0 0-10 0l1.3 1.4c1-.9 2.3-1.4 3.7-1.4ZM27 9.3l-1.9 2 1.9 1.9 1.9-1.9-1.9-2Z" />
          <rect x="39" y="1" width="13" height="10" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="41" y="3" width="9" height="6" rx="1.2" />
          <rect x="52.6" y="4.2" width="1.4" height="3.6" rx=".6" />
        </g>
      </svg>
    </div>
  );
}

export function Chevron({ size = 4.6 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: u(size) }} aria-hidden="true">
      <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function CheckCircle({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
