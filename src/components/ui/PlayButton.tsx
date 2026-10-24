import { PLAY_LIVE, PLAY_URL } from "@/lib/site";

type Props = { tone?: "dark" | "light"; className?: string; size?: "md" | "lg" };

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden="true">
      <path fill="#34A853" d="M1.2.5 13.4 12.9 1.2 25.4C.8 25.2.5 24.7.5 24V1.9C.5 1.3.8.8 1.2.5Z" />
      <path fill="#FBBC04" d="m17.5 8.8-4.1 4.1 4.1 4.1 4.7-2.7c1.3-.8 1.3-2.1 0-2.8l-4.7-2.7Z" />
      <path fill="#EA4335" d="M13.4 12.9 1.2 25.4c.5.3 1.1.2 1.8-.2L17.5 17l-4.1-4.1Z" />
      <path fill="#4285F4" d="M13.4 12.9 17.5 8.8 3 .6C2.3.2 1.7.2 1.2.5l12.2 12.4Z" />
    </svg>
  );
}

/** Google Play call to action. Before the listing is public it says "Coming soon" and points to #download. */
export default function PlayButton({ tone = "dark", className = "", size = "md" }: Props) {
  const dark = tone === "dark";
  const big = size === "lg";
  return (
    <a
      href={PLAY_LIVE ? PLAY_URL : "#download"}
      {...(PLAY_LIVE ? { target: "_blank", rel: "noopener" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full transition-[transform,box-shadow,background-color] duration-500 ease-silk hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive ${
        big ? "py-3.5 pl-5 pr-7" : "py-3 pl-4 pr-6"
      } ${
        dark
          ? "bg-ink text-cream shadow-[0_10px_30px_-10px_rgb(46_28_18/.6)] hover:bg-night"
          : "bg-paper/90 text-ink shadow-[0_10px_30px_-12px_rgb(46_28_18/.35)] ring-1 ring-line hover:bg-paper"
      } ${className}`}
    >
      <PlayGlyph className={big ? "h-7 w-7" : "h-6 w-6"} />
      <span className="flex flex-col text-left leading-none">
        <span className={`font-sans ${big ? "text-[0.7rem]" : "text-[0.62rem]"} uppercase tracking-[0.18em] opacity-70`}>
          {PLAY_LIVE ? "Get it on" : "Coming soon to"}
        </span>
        <span className={`mt-1 font-sans font-bold ${big ? "text-xl" : "text-lg"} tracking-tight`}>Google Play</span>
      </span>
    </a>
  );
}
