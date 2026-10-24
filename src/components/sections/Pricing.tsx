"use client";

import { useRef, type ComponentType } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { PLANS, SIGNUP_FREE_CREDITS, TOPUPS, type Plan } from "@/lib/site";
import { Camera, Case, Calendar, Chat, Check, Hanger, Image, Plus, Spark } from "@/components/closing/icons";

const USES: [ComponentType<{ className?: string }>, string][] = [
  [Camera, "Adding clothes from a photo"],
  [Image, "Product photos"],
  [Hanger, "Try-ons"],
  [Chat, "The AI stylist"],
  [Calendar, "Outfit plans"],
  [Case, "Trip packing"],
];

const TERM: Record<string, string> = {
  zyrobe_100_items: "every month",
  zyrobe_500_items: "every 6 months",
  zyrobe_1000_items: "every year",
};

const rupees = (s: string) => Number(s.replace(/[^\d]/g, ""));
const perCredit = (p: Plan) => `₹${(rupees(p.price) / p.credits).toFixed(2)}`;

function PlanCard({ plan }: { plan: Plan }) {
  const dark = !!plan.featured;
  return (
    <article
      data-card
      className={`group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-[transform,box-shadow] duration-700 ease-silk hover:-translate-y-1.5 md:p-8 ${
        dark
          ? "bg-dusk text-cream shadow-[0_40px_80px_-30px_rgb(23_18_14/.7)] md:-my-4 md:py-12"
          : "bg-paper text-ink ring-1 ring-line shadow-[0_24px_60px_-34px_rgb(46_28_18/.35)] hover:shadow-[0_34px_70px_-30px_rgb(46_28_18/.4)]"
      }`}
    >
      {dark ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-soft-light"
            style={{ backgroundImage: "url(/media/brand/satin-dark.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_70%_at_80%_0%,rgb(219_201_176/.18),transparent_60%)]" />
        </>
      ) : null}
      <div className="relative flex items-center justify-between gap-3">
        <h3 className={`eyebrow ${dark ? "text-sand" : "text-olive"}`}>{plan.name}</h3>
        {dark ? (
          <span className="rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#e9cf8f]">
            Recommended
          </span>
        ) : null}
      </div>

      <p className="relative mt-7 flex items-baseline gap-2">
        <span data-count={plan.credits} className="display text-[4.2rem] leading-none tabular-nums md:text-[4.8rem]">
          {plan.credits.toLocaleString("en-IN")}
        </span>
        <span className={`text-sm font-bold uppercase tracking-[0.16em] ${dark ? "text-sand" : "text-muted"}`}>credits</span>
      </p>

      <p className="relative mt-6 flex items-baseline gap-2">
        <span className="font-serif text-3xl font-normal tracking-tight">{plan.price}</span>
        <span className={dark ? "text-sand" : "text-ink-soft"}>{plan.period}</span>
      </p>
      <p className={`relative mt-1 text-sm ${dark ? "text-sand/80" : "text-muted"}`}>About {perCredit(plan)} per credit</p>

      <div className={`relative my-7 h-px ${dark ? "bg-cream/15" : "bg-line"}`} />

      <ul className={`relative space-y-3 text-[0.95rem] ${dark ? "text-cream/90" : "text-ink-soft"}`}>
        {[
          `${plan.credits.toLocaleString("en-IN")} credits ${TERM[plan.id] ?? plan.period}`,
          "Top up any time while it’s active",
          "Cancel any time in Google Play",
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <Check className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-gold" : "text-olive"}`} />
            {t}
          </li>
        ))}
      </ul>
      <p className={`relative mt-auto pt-8 text-xs uppercase tracking-[0.18em] ${dark ? "text-sand/70" : "text-muted"}`}>{plan.note}</p>
    </article>
  );
}

/** Credits + plans, straight from Google Play (src/lib/site.ts). */
export default function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const st = (trigger: Element | null, start = "top 80%") => ({ trigger, start, toggleActions: "play none none reverse" });

      gsap.from(q("[data-head]"), { y: 36, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.09, scrollTrigger: st(root.current, "top 70%") });
      gsap.from(q("[data-use]"), { y: 18, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, scrollTrigger: st(q("[data-uses]")[0]) });
      gsap.from(q("[data-card]"), {
        y: 80, opacity: 0, rotateX: 8, transformPerspective: 1200, transformOrigin: "50% 100%",
        duration: 1.4, ease: "expo.out", stagger: 0.12, scrollTrigger: st(q("[data-cards]")[0], "top 82%"),
      });
      q("[data-count]").forEach((el) => {
        const to = Number(el.getAttribute("data-count"));
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: to, duration: 1.6, ease: "power3.out", scrollTrigger: st(el, "top 90%"),
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString("en-IN"); },
        });
      });
      gsap.from(q("[data-topup]"), { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: st(q("[data-topup]")[0], "top 88%") });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="pricing" className="relative overflow-hidden bg-cream pt-24 pb-12 md:pt-36 md:pb-16">
      {/* Satin wash fading into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-cover bg-center opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{ backgroundImage: "url(/media/brand/satin-soft.webp)" }}
      />
      <div className="wrap relative">
        <header className="mx-auto max-w-3xl text-center">
          <p data-head className="eyebrow text-olive">Pricing</p>
          <h2 data-head className="display mt-5 text-[2.6rem] sm:text-6xl md:text-7xl">
            Start free.
            <br />
            <em className="font-light italic text-ink-soft">Grow when you need to.</em>
          </h2>
          <p data-head className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Zyrobe is free to download, and every new account gets{" "}
            <strong className="font-bold text-ink">{SIGNUP_FREE_CREDITS} free credits</strong>. AI features use credits. When
            you want more, pick a plan.
          </p>
        </header>

        <div data-uses className="mx-auto mt-12 max-w-4xl">
          <p className="eyebrow text-center text-muted">What uses credits</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {USES.map(([Icon, label]) => (
              <li
                key={label}
                data-use
                className="flex items-center gap-2 rounded-full bg-paper/80 px-4 py-2 text-sm text-ink-soft ring-1 ring-line backdrop-blur-sm"
              >
                <Icon className="h-[18px] w-[18px] text-olive" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div data-cards className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        <div
          data-topup
          className="glass mx-auto mt-10 flex max-w-4xl flex-col gap-6 rounded-[28px] p-6 md:mt-14 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="max-w-sm">
            <p className="flex items-center gap-2 font-serif text-2xl font-light">
              <Spark className="h-5 w-5 text-gold" />
              Need a few more?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Top up at ₹7 a credit while your plan is active. Top-up credits stay until you use them, and end with your plan.
            </p>
          </div>
          <ul className="grid grid-cols-3 gap-2.5 md:flex md:gap-3">
            {TOPUPS.map((t) => (
              <li key={t.credits} className="flex flex-col items-center rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-line md:min-w-28 md:px-6">
                <span className="flex items-center gap-1 font-serif text-2xl leading-none">
                  <Plus className="h-3.5 w-3.5 text-olive" />
                  {t.credits}
                </span>
                <span className="mt-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted">credits</span>
                <span className="mt-2 text-sm font-bold text-ink">{t.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted md:text-sm">
          Prices in Indian rupees, as shown in Google Play in India. Plans renew automatically until you cancel them in
          Google Play.
        </p>
      </div>
    </section>
  );
}
