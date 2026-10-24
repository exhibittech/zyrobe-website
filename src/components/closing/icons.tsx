// Thin line icons (1.5px strokes) matching the app's outline icon set.
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Camera = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6l1.4-2h5l1.4 2h1.6A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
    <circle cx="12" cy="12.3" r="3.4" />
  </svg>
);
export const Spark = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 3.5 13.8 9a2 2 0 0 0 1.2 1.2l5.5 1.8-5.5 1.8a2 2 0 0 0-1.2 1.2L12 20.5 10.2 15A2 2 0 0 0 9 13.8L3.5 12 9 10.2A2 2 0 0 0 10.2 9z" />
  </svg>
);
export const Hanger = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 8.2V7.4a2 2 0 1 0-2-2" />
    <path d="M12 8.2 3.6 14.6a1.4 1.4 0 0 0 .85 2.5h15.1a1.4 1.4 0 0 0 .85-2.5z" />
  </svg>
);
export const Chat = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z" />
    <path d="M12 8.6 12.7 10.7l2.1.7-2.1.7L12 14.2l-.7-2.1-2.1-.7 2.1-.7z" />
  </svg>
);
export const Calendar = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2.2" />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
  </svg>
);
export const Case = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.2" />
    <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
  </svg>
);
export const Image = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="4" y="4.5" width="16" height="15" rx="2.2" />
    <path d="m4.5 16 4.2-4.2a1.5 1.5 0 0 1 2.1 0L16 17" />
    <path d="m14 15 1.6-1.6a1.5 1.5 0 0 1 2.1 0L20 15.7" />
    <circle cx="15.5" cy="8.8" r="1.4" />
  </svg>
);
export const Check = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} strokeWidth={1.8}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
);
export const Plus = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
