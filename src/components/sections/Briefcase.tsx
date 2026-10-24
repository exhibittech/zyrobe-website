"use client";

import { useRef, type ReactNode } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import { AppPill, AppToast, Pop, SceneBox, ScreenVideo, chapterOf, toCenter } from "@/components/features-b/Pop";
import { gsap, useGSAP } from "@/lib/gsap";

const f = (n: string) => `/media/feat/${n}.webp`;

// The "Paris Trip" from the app (Business, 12–14 Nov): the AI lookbook's three days.
const DAYS = [
  { label: "Day 1 · Arrival & client briefing", items: ["Plaid shirt", "Khaki trousers", "Sneakers", "Minimalist watch"] },
  { label: "Day 2 · Meetings & dinner in Le Marais", items: ["Navy shirt", "Beige trousers", "White sneakers", "Black watch"] },
  { label: "Day 3 · Breakfast & departure", items: ["Colorblock polo", "Black jeans", "Sneakers", "Sunglasses"] },
];
const DAY_POS = ["md:top-[21%]", "md:top-[41%]", "md:top-[61%]"];

function DayCard({ day, i, className = "" }: { day: (typeof DAYS)[number]; i: number; className?: string }) {
  return (
    <div
      data-day
      className={`pop absolute bg-white p-[0.55em] ${className}`}
      style={{ width: "calc(var(--phone-w) * 0.98 * var(--m, 1))", fontSize: "calc(var(--phone-w) * 0.04 * var(--m, 1))", borderRadius: "calc(var(--phone-w) * 0.05)" }}
    >
      <p className="inline-block rounded-[0.4em] bg-[#151a2c] px-[0.6em] py-[0.3em] text-[0.72em] font-bold uppercase tracking-[0.06em] text-white">{day.label}</p>
      <div className="mt-[0.5em] grid grid-cols-4 gap-[0.35em]">
        {day.items.map((alt, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={alt} src={f(`dt_${i}_${n}`)} alt={alt} width={190} height={202} loading="lazy" decoding="async" className="block h-auto w-full" />
        ))}
      </div>
    </div>
  );
}

function Stage() {
  const box = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = box.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const section = chapterOf(root);
        const scr = (n: string) => q(`[data-scr="${n}"]`);
        q("[data-z]").forEach((el) => gsap.set(el, { z: Number((el as HTMLElement).dataset.z) }));
        gsap.set(q("[data-scr]"), { opacity: 0 });
        gsap.set(section?.querySelector("[data-beat='2']") ?? [], { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top 55%", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
        });
        const out = (el: HTMLElement, at: number, ease = "back.out(1.3)") =>
          tl.fromTo(el, { x: () => toCenter(el).x, y: () => toCenter(el).y, scale: 0.2, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, ease, duration: 0.12 }, at);
        const back = (el: HTMLElement, at: number) =>
          tl.to(el, { x: () => toCenter(el).x, y: () => toCenter(el).y, scale: 0.18, opacity: 0, ease: "power2.in", duration: 0.08 }, at);
        const show = (el: Element | Element[], at: number, d = 0.03) => tl.to(el, { opacity: 1, duration: d }, at);

        tl.fromTo(root, { rotateY: -12, rotateX: 5 }, { rotateY: 9, rotateX: -2, duration: 1 }, 0);

        // Beat 1 — where, when and why lift out of the trip form
        const form = q("[data-form]") as HTMLElement[];
        form.forEach((el, i) => out(el, 0.04 + i * 0.035));
        form.forEach((el, i) => back(el, 0.35 + i * 0.012));

        // AI loader, then the lookbook
        show(scr("loader"), 0.38);
        if (section) {
          tl.to(section.querySelector("[data-beat='1']"), { opacity: 0, y: -16, duration: 0.03 }, 0.44)
            .fromTo(section.querySelector("[data-beat='2']"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.035 }, 0.47);
        }
        show(scr("look"), 0.5);
        tl.fromTo(q("[data-lb]"), { yPercent: 0 }, { yPercent: -16, duration: 0.22, ease: "power1.inOut" }, 0.54);
        const weather = q("[data-weather]")[0] as HTMLElement;
        out(weather, 0.54);
        const days = q("[data-day]") as HTMLElement[];
        days.forEach((el, i) => out(el, 0.6 + i * 0.04));

        // Pack: looks go into the trip, then the items
        days.forEach((el, i) => back(el, 0.76 + i * 0.02));
        back(weather, 0.75);
        show(scr("saved"), 0.77);
        show(scr("items"), 0.84);
        out(q("[data-toast]")[0] as HTMLElement, 0.85);
        out(q("[data-ess]")[0] as HTMLElement, 0.88, "power3.out");
        q("[data-tick]").forEach((el, i) => show(el, 0.92 + i * 0.025, 0.012));
      });
    },
    { scope: box },
  );

  return (
    <div style={{ perspective: "1700px" }}>
      <SceneBox>
        <div ref={box} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          <Phone src={f("pf_dates")} alt="Plan a New Journey: Paris Trip, Business, 12 to 14 November">
            <div data-scr="loader" className="absolute inset-0 motion-reduce:hidden">
              <ScreenVideo src="/media/video/trip-loader.mp4" poster="/media/video/trip-loader-poster.webp" />
            </div>
            <div data-scr="look" className="absolute inset-0 overflow-hidden bg-[#f8f4f0] motion-reduce:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-lb src={f("lb_content")} alt="Trip Lookbook for Paris with a weather note and day-by-day outfits" loading="lazy" className="absolute inset-x-0 top-[5.2%] h-auto w-full" />
              {/* status bar borrowed from a capture of the same phone */}
              <div className="absolute inset-x-0 top-0 h-[5.2%] bg-[length:100%_auto] bg-top" style={{ backgroundImage: `url(${f("pt_items")})` }} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-scr="saved" src={f("pt_saved")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-scr="items" src={f("pt_items")} alt="Paris Trip: 11 wardrobe pieces packed" loading="lazy" className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" />
          </Phone>

          {/* Beat 1: the trip */}
          <Pop data-form src={f("p_wx_pill")} alt="Weather in Paris: 14°C, overcast" w={0.52} r="pill" z={90} className="left-[52%] top-[6%] md:left-[78%] md:top-[19%]" />
          <Pop data-form src={f("p_bus")} alt="Occasion: Business" w={0.48} r="pill" z={60} className="left-[-30%] top-[14%] md:left-[-56%] md:top-[29%]" />
          <AppPill data-form icon="pin" label="Paris, France" className="left-[-34%] top-[23%] md:left-[-66%] md:top-[38%]" />
          <Pop data-form src={f("p_note")} alt="Itinerary: business, client meetings and a dinner" w={1.0} r={0.06} z={110} className="hidden md:block md:left-[-58%] md:top-[48%]" />
          <AppPill data-form icon="calendar" label="Nov 12 – Nov 14, 2026" className="hidden md:flex md:left-[64%] md:top-[60%]" />
          <Pop data-form src={f("p_dur")} alt="Trip duration: 3 days" w={0.64} r="pill" z={70} className="hidden md:block md:left-[68%] md:top-[69%]" />

          {/* Beat 2: the AI lookbook, then packing */}
          <Pop data-weather src={f("lb_weather")} alt="Expect brisk, overcast late-autumn weather in Paris, 7°C to 12°C" w={1.06} r={0.03} z={120} className="hidden motion-reduce:!hidden md:block md:left-[38%] md:top-[3%]" />
          {DAYS.map((d, i) => (
            <DayCard key={d.label} day={d} i={i} className={`${i ? "hidden md:block" : "left-[-30%] top-[60%]"} md:left-[70%] ${DAY_POS[i]} motion-reduce:!hidden`} />
          ))}
          <AppToast data-toast title="Wardrobe Updated" sub="11 items packed in Paris Trip." w={1.1} className="left-[-5%] top-[3%] z-10 motion-reduce:hidden" />
          <div data-ess className="pop absolute hidden overflow-hidden md:left-[-66%] md:top-[64%] md:block motion-reduce:!hidden" style={{ width: "calc(var(--phone-w) * 0.92)", aspectRatio: "954 / 657", borderRadius: "calc(var(--phone-w) * 0.05)" }}>
            {[0, 1, 2, 3].map((n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={n}
                {...(n ? { "data-tick": true } : {})}
                src={f(`ess_list_${n}`)}
                alt={n === 3 ? "Essentials checklist: toothbrush, phone charger and sunglasses ticked" : ""}
                loading="lazy"
                className={`absolute inset-0 h-full w-full ${n ? "opacity-0 motion-reduce:opacity-0" : ""} ${n === 3 ? "motion-reduce:opacity-100" : ""}`}
              />
            ))}
          </div>
        </div>
      </SceneBox>
    </div>
  );
}

function Beat({ n, eyebrow, title, body, points, heading }: { n: string; eyebrow: string; title: ReactNode; body: string; points: string[]; heading: "h2" | "h3" }) {
  const H = heading;
  return (
    <div data-beat={n} className={`[grid-area:1/1] ${n === "2" ? "motion-reduce:hidden" : ""}`}>
      <p data-copy className="eyebrow flex items-center gap-3 text-olive">
        <span className="tabular-nums">07</span>
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </p>
      <H data-copy className="display mt-3 text-[2.1rem] sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl">{title}</H>
      <p data-copy className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-soft md:mt-6 md:text-lg">{body}</p>
      <ul data-copy className="mt-8 hidden space-y-2.5 text-[0.95rem] text-ink-soft md:block">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-olive" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Briefcase() {
  return (
    <Chapter
      id="briefcase"
      index={7}
      eyebrow="Briefcase"
      side="left"
      length={340}
      title="Where. When. And why."
      body=""
      copy={
        <div className="grid">
          <Beat
            n="1"
            heading="h2"
            eyebrow="Briefcase"
            title={<>Where. When.<br />And why.</>}
            body="Tell Zyrobe where you’re going, when, and what for. It checks the weather there and gets to work on a travel capsule from your own clothes."
            points={["Business, vacation or anything in between", "The forecast for where you’re going", "A capsule built from what you own"]}
          />
          <Beat
            n="2"
            heading="h3"
            eyebrow="AI packing"
            title={<>Pack light.<br />Look right.</>}
            body="Get an outfit for every day of the trip, pack it all in one tap, tick off the essentials, and share the plan as a PDF."
            points={["A look for each day of the trip", "One tap to pack, with an essentials checklist", "Share the whole plan as a PDF"]}
          />
        </div>
      }
    >
      <Stage />
    </Chapter>
  );
}
