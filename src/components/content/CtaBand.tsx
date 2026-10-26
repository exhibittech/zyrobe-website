import PlayButton from "@/components/ui/PlayButton";
import { TAGLINE } from "@/lib/site";

/**
 * Closing call to action on satin. It carries id="download" because PlayButton points to #download
 * until the Play listing is public.
 */
export default function CtaBand() {
  return (
    <section id="download" aria-label="Get Zyrobe" className="relative isolate overflow-hidden py-20 text-center md:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/media/brand/satin-full.webp)] bg-cover bg-center" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,rgb(250_247_242/.6),transparent_80%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-cream to-transparent" />
      <div className="wrap flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/brand/logo.webp" alt="Zyrobe" width={1400} height={473} loading="lazy" className="w-[min(60vw,320px)]" />
        <p className="mt-5 font-serif text-[1.7rem] font-light italic leading-tight text-ink-soft md:text-4xl">{TAGLINE}</p>
        <div className="mt-9">
          <PlayButton size="lg" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-muted">
          Android <span className="mx-1.5 opacity-50">·</span> India <span className="mx-1.5 opacity-50">·</span> 18+
        </p>
      </div>
    </section>
  );
}
