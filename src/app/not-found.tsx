import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="grain relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-satin px-6 text-center text-ink">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url(/media/brand/satin-soft.webp)" }}
      />
      <Link href="/" aria-label="Zyrobe home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/brand/logo-sm.webp" alt="Zyrobe" width={520} height={176} className="h-10 w-auto" />
      </Link>
      <p className="eyebrow mt-14 text-olive">404</p>
      <h1 className="display mt-4 text-5xl md:text-7xl">
        Not in this
        <br />
        <em className="font-light italic text-ink-soft">wardrobe.</em>
      </h1>
      <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
        We couldn’t find that page. It may have moved, or the link may be wrong.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-transform duration-500 ease-silk hover:-translate-y-0.5"
      >
        Back to Zyrobe
      </Link>
    </main>
  );
}
