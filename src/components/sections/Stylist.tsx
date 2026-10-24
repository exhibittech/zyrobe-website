"use client";

import { useRef } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import { Pop, SceneBox, chapterOf, toCenter } from "@/components/features-b/Pop";
import { gsap, useGSAP } from "@/lib/gsap";

const c = (n: string) => `/media/comps/${n}.webp`;

function Stage() {
  const box = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(box);
        const inputs = q("[data-in]");
        const outputs = q("[data-out]");
        q("[data-z]").forEach((el) => gsap.set(el, { z: Number((el as HTMLElement).dataset.z) }));

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: chapterOf(box.current), start: "top 55%", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
        });
        tl.fromTo(box.current, { rotateY: -16, rotateX: 6 }, { rotateY: 12, rotateX: -3, duration: 1 }, 0);
        // The plan goes in: occasion, time, place, weather…
        inputs.forEach((el, i) =>
          tl.fromTo(el, { x: -150, opacity: 0, rotate: -6 }, { x: 0, opacity: 1, rotate: 0, ease: "power3.out", duration: 0.16 }, 0.03 + i * 0.05),
        );
        // …the stylist takes it in…
        inputs.forEach((el, i) => {
          tl.to(el, { x: () => toCenter(el).x, y: () => toCenter(el).y, scale: 0.12, opacity: 0, ease: "power2.in", duration: 0.13 }, 0.4 + i * 0.025);
        });
        tl.fromTo(q("[data-glow]"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1.03, duration: 0.07 }, 0.47)
          .to(q("[data-glow]"), { opacity: 0, scale: 1.08, duration: 0.12 }, 0.56);
        // …and the look comes out.
        outputs.forEach((el, i) => {
          tl.fromTo(el, { x: () => toCenter(el).x, y: () => toCenter(el).y, scale: 0.2, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, ease: "back.out(1.3)", duration: 0.17 }, 0.55 + i * 0.07);
        });
      });
    },
    { scope: box },
  );

  return (
    <div style={{ perspective: "1600px" }}>
      <SceneBox>
        <div ref={box} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          <div
            data-glow
            aria-hidden="true"
            className="absolute -inset-[9%] rounded-[30%] opacity-0 blur-2xl"
            style={{ background: "radial-gradient(closest-side, rgb(201 162 74 / .55), rgb(201 162 74 / .18) 60%, transparent)" }}
          />
          <Phone video={{ src: "/media/video/stylist.mp4", poster: "/media/video/stylist-poster.webp" }} alt="Zyrobe AI stylist: daily recommendation, stylist brief and the finished look" />

          {/* The plan */}
          <Pop data-in src={c("chip_evening")} alt="Occasion: Evening Cocktail" w={0.62} r="pill" z={70} className="left-[-34%] top-[9%] md:left-[-66%] md:top-[14%]" />
          <Pop data-in src={c("chip_tonight")} alt="When: Tonight" w={0.4} r="pill" z={40} className="hidden md:block md:left-[-46%] md:top-[22.5%]" />
          <Pop data-in src={c("chip_soho")} alt="Where: soho house" w={0.5} r="pill" z={90} className="hidden md:block md:left-[-70%] md:top-[30.5%]" />
          <Pop data-in src={c("chip_mumbai")} alt="Weather: Mumbai, 33°C, clear sky" w={0.92} r="pill" z={55} className="left-[-40%] top-[19%] md:left-[-86%] md:top-[38.5%]" />

          {/* The look */}
          <Pop data-out src={c("chip_ai")} alt="AI curated" w={0.5} r="pill" z={110} className="left-[60%] top-[5%] md:left-[80%] md:top-[8%]" />
          <Pop data-out src={c("ocard_1")} alt="Saved outfit: Mumbai Linen Chic, 4 items" w={0.6} r={0.074} z={80} className="left-[66%] top-[13%] md:left-[84%] md:top-[16.5%]" />
          <Pop data-out src={c("yl_quote")} alt="Stylist note: You'll look effortlessly chic and stay comfortable tonight at Soho House" w={1.05} r={0.035} z={120} className="left-[-22%] top-[70%] md:left-[-64%] md:top-[66%]" />
        </div>
      </SceneBox>
    </div>
  );
}

export default function Stylist() {
  return (
    <Chapter
      id="stylist"
      index={5}
      eyebrow="AI Stylist"
      side="left"
      length={270}
      title={<>Tell it the plan.<br />Get the look.</>}
      body="Ask the AI stylist what to wear for work, a party, a date or a trip. It picks from the clothes you own, and its ideas consider your style and the weather."
      points={["Occasion, time and place in a few taps", "Weather-aware picks for where you’ll be", "Every look built from your own wardrobe"]}
    >
      <Stage />
    </Chapter>
  );
}
