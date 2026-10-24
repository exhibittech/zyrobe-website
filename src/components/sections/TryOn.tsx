"use client";

import { useRef } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import Pop from "@/components/features-a/Pop";
import DressForm from "@/components/features-a/DressForm";
import { diveIn, popOut, tilt, useStageTimeline } from "@/components/features-a/stage";
import { Chevron, Sparkle, StatusBar, u } from "@/components/features-a/ui";

const TOP = "/media/garments/c09.webp";
const BOTTOM = "/media/garments/c22.webp";

const SPARKS = [
  { left: "14%", top: "18%", size: 4.4 },
  { left: "80%", top: "26%", size: 3.4 },
  { left: "22%", top: "62%", size: 3 },
  { left: "74%", top: "70%", size: 4 },
];

/** The app's Virtual Try-On screen, with a dress form standing in for the photo. */
function TryOnScreen() {
  return (
    <div className="absolute inset-0 flex flex-col bg-cream text-ink">
      <StatusBar />
      <div className="flex shrink-0 items-center" style={{ height: u(11), paddingInline: u(4.5), gap: u(2.2) }}>
        <Chevron />
        <p className="font-serif" style={{ fontSize: u(5.2) }}>Virtual Try-On</p>
        <span
          className="ml-auto flex items-center rounded-full border font-bold"
          style={{ borderColor: "#d9b44a", color: "#a8801f", background: "#fffaf0", fontSize: u(2.3), padding: `${u(1)} ${u(2.4)}`, gap: u(0.8) }}
        >
          <Sparkle style={{ width: u(2.4) }} /> AI
        </span>
      </div>

      {/* Preview */}
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ marginInline: u(4), borderRadius: u(5), background: "radial-gradient(120% 80% at 50% 28%, #fdfaf4 0%, #efe6d7 55%, #ddcfb9 100%)" }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(transparent,rgb(120_95_60/.14))]" />
        <div className="absolute bottom-[2%] left-1/2 h-[93%] -translate-x-1/2" style={{ aspectRatio: "200 / 400" }}>
          <DressForm className="absolute inset-0 h-full w-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-fit src={BOTTOM} alt="" draggable={false} className="invisible absolute h-auto" style={{ left: "24.75%", top: "55%", width: "50.5%" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-fit src={TOP} alt="" draggable={false} className="invisible absolute h-auto drop-shadow-[0_4px_6px_rgb(46_28_18/.18)]" style={{ left: "4%", top: "9.75%", width: "92%" }} />
        </div>
        <div data-glow className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(60%_45%_at_50%_40%,rgb(255_250_235/.55),transparent_70%)]" />
        <div
          data-scan
          className="pointer-events-none invisible absolute inset-x-0 top-0 h-[28%]"
          style={{ background: "linear-gradient(180deg, transparent, rgb(255 255 255 / .55) 45%, rgb(201 162 74 / .35) 52%, rgb(255 255 255 / .4) 60%, transparent)" }}
        />
        {SPARKS.map((s) => (
          <Sparkle key={s.left + s.top} className="invisible absolute text-gold" style={{ left: s.left, top: s.top, width: u(s.size) }} />
        ))}
        <span
          className="absolute rounded-full bg-white/80 font-bold text-ink-soft backdrop-blur"
          style={{ left: u(2.6), top: u(2.6), fontSize: u(2.2), padding: `${u(0.8)} ${u(2)}` }}
        >
          AI preview
        </span>
      </div>

      {/* Chosen clothes */}
      <div className="flex shrink-0 items-center" style={{ padding: `${u(3)} ${u(4)} 0`, gap: u(2.4) }}>
        <span
          className="flex items-center justify-center border border-dashed border-taupe text-muted"
          style={{ width: u(15), height: u(15), borderRadius: u(3), fontSize: u(5) }}
          aria-hidden="true"
        >
          +
        </span>
        {[TOP, BOTTOM].map((src) => (
          <span key={src} className="flex items-center justify-center bg-white ring-2 ring-ink" style={{ width: u(15), height: u(15), borderRadius: u(3), padding: u(1.4) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-auto object-contain" draggable={false} />
          </span>
        ))}
        <span className="ml-auto text-right text-muted" style={{ fontSize: u(2.4), lineHeight: 1.3 }}>
          Top
          <br />+ Bottom
        </span>
      </div>
      <div className="shrink-0" style={{ padding: `${u(3)} ${u(4)} ${u(5)}` }}>
        <div
          data-gen
          className="flex w-full items-center justify-center rounded-full bg-ink font-bold text-cream"
          style={{ height: u(10.5), fontSize: u(3.5), gap: u(1.6) }}
        >
          Generate Try-On <Sparkle style={{ width: u(3) }} />
        </div>
      </div>
    </div>
  );
}

function Stage() {
  const ref = useRef<HTMLDivElement>(null);

  useStageTimeline(ref, (tl, { q, mobile }) => {
    tilt(tl, q("[data-phone]")[0], 10, -8);
    popOut(tl, q("[data-photo]"), 0.0, { reach: 0.6 });

    // The chosen clothes arrive from the sides and go into the phone
    const incoming = q("[data-in]");
    incoming.forEach((el, i) => {
      const dir = i === 0 ? -1 : 1;
      tl.fromTo(
        el,
        { x: dir * (mobile ? 40 : 90), y: 20, rotate: 0, autoAlpha: 0 },
        { x: 0, y: 0, rotate: Number(el.dataset.rot), autoAlpha: 1, duration: 0.12, ease: "power3.out" },
        0.05 + i * 0.05,
      );
    });
    diveIn(tl, incoming, 0.24, { stagger: 0.05, dur: 0.11 });

    // They land on the form
    q("[data-fit]").forEach((el, i) => {
      tl.fromTo(
        el,
        { y: -14, scale: 1.08, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.1, ease: "power2.out" },
        0.3 + i * 0.05,
      );
    });

    // Generate: press, scan, sparkle
    const gen = q("[data-gen]");
    tl.to(gen, { scale: 0.95, duration: 0.025 }, 0.41).to(gen, { scale: 1, duration: 0.03 }, 0.44);
    const scan = q("[data-scan]");
    tl.fromTo(scan, { yPercent: -110, autoAlpha: 1 }, { yPercent: 370, duration: 0.18, ease: "power1.inOut" }, 0.42).set(scan, { autoAlpha: 0 }, 0.6);
    tl.to(q("[data-glow]"), { opacity: 1, duration: 0.08 }, 0.52);
    const sparks = q("svg.text-gold");
    tl.fromTo(sparks, { scale: 0, rotate: -45, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.05, stagger: 0.02, ease: "back.out(3)" }, 0.5)
      .to(sparks, { scale: 0, autoAlpha: 0, duration: 0.05, stagger: 0.02 }, 0.62);

    // Ready
    popOut(tl, q("[data-toast]"), 0.62, { reach: 0.4 });
    popOut(tl, q("[data-vto]"), 0.72);
  });

  return (
    <div
      ref={ref}
      className="relative max-md:[--phone-w:min(54vw,26svh)]"
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948" }}
    >
      <div data-phone className="absolute inset-0">
        <Phone alt="Zyrobe Virtual Try-On: a linen shirt and beige trousers previewed together">
          <TryOnScreen />
        </Phone>
      </div>

      {/* The clothes being tried */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-in data-rot={-8} src={TOP} alt="" aria-hidden="true" draggable={false} className="invisible absolute z-20 h-auto drop-shadow-[0_18px_22px_rgb(46_28_18/.3)] left-[-64%] top-[8%] max-md:left-[-34%] max-md:top-[6%]" style={{ width: u(52) }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-in data-rot={7} src={BOTTOM} alt="" aria-hidden="true" draggable={false} className="invisible absolute z-20 h-auto drop-shadow-[0_18px_22px_rgb(46_28_18/.3)] left-[106%] top-[38%] max-md:left-[82%] max-md:top-[36%]" style={{ width: u(44) }} />

      <Pop tag="photo" src="/media/comps/pill_photo.webp" w={0.42} rot={-4} className="z-30 left-[-30%] top-[50%] max-md:left-[-20%] max-md:top-[48%]" />
      <Pop tag="toast" src="/media/comps/toast_tryon.webp" w={1.06} r={0.033} className="z-40 left-[-3%] top-[2%]" />
      <Pop tag="vto" src="/media/comps/card_vto.webp" w={1.0} r={0.041} rot={-2} className="z-30 left-[-46%] top-[80%] max-md:hidden" />
    </div>
  );
}

export default function TryOn() {
  return (
    <Chapter
      id="try-on"
      index={4}
      side="right"
      eyebrow="Try-on"
      title={<>See it on you. Before you wear it.</>}
      body={
        <>
          <p>Add a photo of yourself, pick a top, a bottom or both, and see the look on you before you get dressed.</p>
          <p className="mt-3 text-sm text-muted">
            AI images are previews. They may not match exactly how clothes look or fit.
          </p>
        </>
      }
      points={["A top, a bottom or the full outfit", "Built from the clothes you own", "Save the looks you love"]}
      className="md:[&>div>div]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <Stage />
    </Chapter>
  );
}
