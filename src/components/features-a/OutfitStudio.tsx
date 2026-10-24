"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import Phone from "@/components/ui/Phone";
import Pop from "@/components/features-a/Pop";
import { popOut, toPhone, useStageTimeline } from "@/components/features-a/stage";
import { Chevron, CheckCircle, Sparkle, StatusBar, u } from "@/components/features-a/ui";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Kind = "top" | "bottom";
type Piece = { id: string; kind: Kind; name: string };
type Look = { top: Piece | null; bottom: Piece | null };
type Saved = { key: number; top: Piece; bottom: Piece; name: string };

const PIECES: Piece[] = [
  { id: "c09", kind: "top", name: "Linen Shirt" },
  { id: "c22", kind: "bottom", name: "Beige Trousers" },
  { id: "c06", kind: "top", name: "Denim Shirt" },
  { id: "c15", kind: "bottom", name: "Dark Jeans" },
  { id: "c13", kind: "top", name: "Polo Tee" },
  { id: "c14", kind: "bottom", name: "Black Jeans" },
];
const LOOK_NAMES: Record<string, string> = { c09: "Linen Day", c06: "Denim Weekend", c13: "Easy Friday" };
const pic = (p: Piece) => `/media/garments/${p.id}.webp`;

/** Scroll progress at which the demo places a top, then a bottom, then saves (until the visitor takes over). */
const AUTO = [0.2, 0.38, 0.56];

const SLOT: Record<Kind, CSSProperties> = {
  top: { top: u(3), left: `calc(50% - ${u(17)})`, width: u(34), zIndex: 2 },
  bottom: { top: u(42), left: `calc(50% - ${u(13.5)})`, width: u(27), zIndex: 1 },
};

const FILTERS = [
  { id: "all", label: "All Items" },
  { id: "top", label: "Tops" },
  { id: "bottom", label: "Bottoms" },
] as const;

function LookCard({ s }: { s: Saved }) {
  return (
    <div className="overflow-hidden bg-white" style={{ borderRadius: u(3.4) }}>
      <div className="relative flex items-center justify-center bg-[#f4f2ee]" style={{ aspectRatio: "460 / 400", gap: u(1), padding: u(2) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pic(s.top)} alt={s.top.name} className="h-auto" style={{ width: "46%" }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pic(s.bottom)} alt={s.bottom.name} className="h-auto" style={{ width: "38%" }} draggable={false} />
      </div>
      <div style={{ padding: `${u(2.4)} ${u(3)} ${u(3)}` }}>
        <p className="truncate font-bold text-ink" style={{ fontSize: u(3.6) }}>{s.name}</p>
        <div className="flex items-center justify-between" style={{ marginTop: u(1.6) }}>
          <span className="rounded-md bg-[#efece7] font-bold text-ink-soft" style={{ fontSize: u(2.4), padding: `${u(0.6)} ${u(1.6)}` }}>2 items</span>
          <span className="text-muted" style={{ fontSize: u(2.4) }}>Today</span>
        </div>
      </div>
    </div>
  );
}

/** The app's "New Outfit" canvas, live on the page: drag or tap clothes onto it and save the look. */
export default function OutfitStudio() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const ghostEl = useRef<HTMLImageElement | null>(null);
  const toastEl = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState<Look>({ top: null, bottom: null });
  const [saved, setSaved] = useState<Saved[]>([]);
  const [toast, setToast] = useState(false);
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [ghost, setGhost] = useState<Piece | null>(null);
  const [over, setOver] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const auto = useRef(true);
  const flipFrom = useRef<Partial<Record<Kind, DOMRect>>>({});
  const drag = useRef<{ p: Piece; x0: number; y0: number; x: number; y: number; w: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const savedKey = useRef(0);
  const animatedKey = useRef(0);
  const toastTimer = useRef(0);

  // Saved outfits already in the collection, and the "try it" hint.
  useStageTimeline(root, (tl, { q }) => {
    popOut(tl, q("[data-stack]"), 0.04, { stagger: 0.06 });
    popOut(tl, q("[data-hint]"), 0.08, { reach: 0.25 });
  });

  const tileRect = (p: Piece) =>
    root.current?.querySelector(`[data-piece="${p.id}"] img`)?.getBoundingClientRect();

  const place = (p: Piece, from?: DOMRect) => {
    const r = from ?? tileRect(p);
    if (r) flipFrom.current[p.kind] = r;
    setLook((l) => ({ ...l, [p.kind]: p }));
    setJustSaved(false);
  };

  const showToast = (on: boolean, autoHide = false) => {
    setToast(on);
    window.clearTimeout(toastTimer.current);
    if (on && autoHide) toastTimer.current = window.setTimeout(() => setToast(false), 2600);
  };

  // Scroll-driven demo, until the visitor touches anything.
  useEffect(() => {
    const section = root.current?.closest("section");
    if (!section) return;
    const [demoTop, demoBottom] = PIECES;
    const demoSaved = (): Saved => ({ key: ++savedKey.current, top: demoTop, bottom: demoBottom, name: LOOK_NAMES[demoTop.id] });

    if (prefersReducedMotion()) {
      // Static: show the finished demo look.
      const id = requestAnimationFrame(() => {
        setLook({ top: demoTop, bottom: demoBottom });
        setSaved([demoSaved()]);
        setJustSaved(true);
      });
      return () => cancelAnimationFrame(id);
    }

    let last = 0;
    const update = (p: number) => {
      const step = p >= AUTO[2] ? 3 : p >= AUTO[1] ? 2 : p >= AUTO[0] ? 1 : 0;
      if (step === last || !auto.current) return;
      const prev = last;
      last = step;
      if (prev < 1 && step >= 1) { const r = tileRect(demoTop); if (r) flipFrom.current.top = r; }
      if (prev < 2 && step >= 2) { const r = tileRect(demoBottom); if (r) flipFrom.current.bottom = r; }
      setLook({ top: step >= 1 ? demoTop : null, bottom: step >= 2 ? demoBottom : null });
      if (step >= 3 && prev < 3) {
        setSaved([demoSaved()]);
        setJustSaved(true);
        showToast(true);
      } else if (step < 3 && prev >= 3) {
        setSaved([]);
        setJustSaved(false);
        showToast(false);
      }
    };
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 30%",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    });
    return () => {
      st.kill();
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  // FLIP: a placed piece travels from the tile (or where it was dropped) to its slot.
  useLayoutEffect(() => {
    (["top", "bottom"] as const).forEach((k) => {
      const from = flipFrom.current[k];
      const el = canvas.current?.querySelector<HTMLElement>(`[data-slot="${k}"]`);
      if (!from || !el) return;
      delete flipFrom.current[k];
      const to = el.getBoundingClientRect();
      gsap.fromTo(
        el,
        {
          x: from.left + from.width / 2 - (to.left + to.width / 2),
          y: from.top + from.height / 2 - (to.top + to.height / 2),
          scale: from.width / to.width,
          rotate: -7,
        },
        { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.75, ease: "expo.out" },
      );
    });
  }, [look]);

  // A newly saved look leaves the phone as an outfit card.
  useLayoutEffect(() => {
    const s = saved[saved.length - 1];
    if (!s || s.key === animatedKey.current) return;
    animatedKey.current = s.key;
    const el = root.current?.querySelector<HTMLElement>(`[data-saved="${s.key}"]`);
    if (!el) return;
    gsap.fromTo(
      el,
      { x: toPhone(el).x * 0.8, y: toPhone(el).y * 0.8, scale: 0.3, rotate: 0, autoAlpha: 0 },
      { x: 0, y: 0, scale: 1, rotate: Number(el.dataset.rot), autoAlpha: 1, duration: 0.9, ease: "back.out(1.3)" },
    );
  }, [saved]);

  useEffect(() => {
    const el = toastEl.current;
    if (!el) return;
    if (toast) gsap.fromTo(el, { y: -14, scale: 0.94, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(1.5)" });
    else gsap.to(el, { y: -8, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
  }, [toast]);

  const takeOver = () => {
    auto.current = false;
  };

  // Drag a piece (mouse anywhere; on touch, sideways drags — vertical swipes still scroll the page).
  const moveGhost = () => {
    const d = drag.current;
    const el = ghostEl.current;
    if (!d || !el) return;
    el.style.width = `${d.w}px`;
    el.style.transform = `translate3d(${d.x - d.w / 2}px, ${d.y - d.w * 0.63}px, 0) rotate(-4deg)`;
  };
  const overCanvas = (x: number, y: number) => {
    const c = canvas.current?.getBoundingClientRect();
    return !!c && x >= c.left && x <= c.right && y >= c.top && y <= c.bottom;
  };
  const onDown = (e: PointerEvent<HTMLButtonElement>, p: Piece) => {
    if (e.button !== 0) return;
    const img = e.currentTarget.querySelector("img");
    const w = (img?.getBoundingClientRect().width ?? 60) * 1.7;
    drag.current = { p, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, w, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    d.x = e.clientX;
    d.y = e.clientY;
    if (!d.moved) {
      if (Math.hypot(d.x - d.x0, d.y - d.y0) < 6) return;
      d.moved = true;
      takeOver();
      setGhost(d.p);
    }
    moveGhost();
    const inside = overCanvas(d.x, d.y);
    setOver((o) => (o === inside ? o : inside));
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    suppressClick.current = true;
    const dropped = overCanvas(d.x, d.y) ? ghostEl.current?.getBoundingClientRect() : undefined;
    setGhost(null);
    setOver(false);
    if (dropped) place(d.p, dropped);
  };
  const onCancel = () => {
    drag.current = null;
    setGhost(null);
    setOver(false);
  };
  const onTap = (p: Piece) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    takeOver();
    place(p);
  };

  const save = () => {
    const { top, bottom } = look;
    if (!top || !bottom || justSaved) return;
    takeOver();
    const key = ++savedKey.current;
    setSaved((s) => [...s.slice(-2), { key, top, bottom, name: LOOK_NAMES[top.id] ?? "My Look" }]);
    setJustSaved(true);
    showToast(true, true);
  };

  const shown = PIECES.filter((p) => filter === "all" || p.kind === filter);
  const ready = !!(look.top && look.bottom);
  const count = (k: "all" | Kind) => PIECES.filter((p) => k === "all" || p.kind === k).length;

  return (
    <div
      ref={root}
      className="relative max-md:[--phone-w:min(60vw,28.5svh)]"
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948" }}
    >
      {/* Outfits already in the collection */}
      <Pop tag="stack" src="/media/comps/ocard_3.webp" w={0.44} r={0.074} rot={9} className="z-0 left-[112%] top-[16%] max-md:hidden" />
      <Pop tag="stack" src="/media/comps/ocard_4.webp" w={0.44} r={0.074} rot={-4} className="z-0 left-[100%] top-[24%] max-md:hidden" />

      {/* Hint */}
      <div data-hint className="invisible absolute z-30 max-md:hidden" style={{ left: "-66%", top: "34%", width: u(56) }}>
        <p className="font-serif text-2xl font-light italic text-ink">Try it.</p>
        <p className="mt-1 text-sm leading-snug text-ink-soft">Drag a piece onto the canvas, then save the look.</p>
        <svg viewBox="0 0 120 60" className="mt-2 ml-6 w-24 text-olive" aria-hidden="true">
          <path d="M4 6c18 34 52 46 104 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 5" />
          <path d="m100 38 9 8-11 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10">
        <Phone alt="">
          <div className="absolute inset-0 flex flex-col bg-white text-ink">
            <StatusBar />
            <div className="flex shrink-0 items-center" style={{ height: u(11), paddingInline: u(4.5), gap: u(2.2) }}>
              <Chevron />
              <p className="font-serif" style={{ fontSize: u(5.4) }}>New Outfit</p>
              <span className="ml-auto flex items-center rounded-full bg-ink font-bold text-cream" style={{ fontSize: u(2.3), padding: `${u(1.3)} ${u(2.6)}`, gap: u(1) }}>
                <Sparkle style={{ width: u(2.4) }} /> AI GEN
              </span>
            </div>

            {/* Canvas */}
            <div
              ref={canvas}
              aria-label="Outfit canvas"
              className={`relative shrink-0 transition-colors duration-300 ${over ? "bg-[#f3f4ee]" : "bg-white"}`}
              style={{ height: u(90), backgroundImage: "radial-gradient(#e8e2d8 1px, transparent 1.2px)", backgroundSize: `${u(4.4)} ${u(4.4)}` }}
            >
              {(["top", "bottom"] as const).map((k) => {
                const p = look[k];
                return p ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} data-slot={k} src={pic(p)} alt={p.name} draggable={false} className="absolute h-auto drop-shadow-[0_8px_10px_rgb(46_28_18/.18)]" style={SLOT[k]} />
                ) : (
                  <div
                    key={k}
                    className={`absolute flex items-center justify-center border border-dashed text-center transition-colors duration-300 ${over ? "border-olive text-olive" : "border-line text-muted"}`}
                    style={{ ...SLOT[k], aspectRatio: "315 / 399", borderRadius: u(3), fontSize: u(2.6) }}
                  >
                    {k === "top" ? "Drop a top" : "Drop a bottom"}
                  </div>
                );
              })}
              {look.top || look.bottom ? (
                <button
                  type="button"
                  onClick={() => { takeOver(); setLook({ top: null, bottom: null }); setJustSaved(false); }}
                  className="absolute z-10 rounded-full border border-[#f1c9c4] bg-white font-bold text-[#c8473a]"
                  style={{ right: u(3), top: u(2.5), fontSize: u(2.4), padding: `${u(1)} ${u(2.4)}` }}
                >
                  Clear
                </button>
              ) : null}
            </div>

            {/* Select Clothes sheet */}
            <div className="relative flex min-h-0 flex-1 flex-col bg-white shadow-[0_-10px_24px_-14px_rgb(46_28_18/.35)]" style={{ borderTopLeftRadius: u(6), borderTopRightRadius: u(6), padding: `${u(2)} ${u(4)} ${u(4)}` }}>
              <span className="mx-auto block rounded-full bg-line" style={{ width: u(10), height: u(1) }} />
              <div className="flex items-center" style={{ marginTop: u(2.4), gap: u(1.6) }}>
                <p className="font-bold" style={{ fontSize: u(3.6) }}>Select Clothes</p>
                <span className="rounded-md bg-cream font-bold text-muted" style={{ fontSize: u(2.3), padding: `${u(0.4)} ${u(1.4)}` }}>{PIECES.length}</span>
              </div>
              <div className="flex" style={{ marginTop: u(2.4), gap: u(1.6) }}>
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => { takeOver(); setFilter(f.id); }}
                    className={`rounded-full font-bold transition-colors ${filter === f.id ? "bg-ink text-cream" : "bg-[#f2efea] text-ink-soft"}`}
                    style={{ fontSize: u(2.5), padding: `${u(1.3)} ${u(2.8)}` }}
                  >
                    {f.label} <span className="opacity-60">{count(f.id)}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3" style={{ marginTop: u(3), gap: u(2.2) }}>
                {shown.map((p) => {
                  const on = look[p.kind]?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      data-piece={p.id}
                      aria-label={`Add ${p.name} to the outfit`}
                      onPointerDown={(e) => onDown(e, p)}
                      onPointerMove={onMove}
                      onPointerUp={onUp}
                      onPointerCancel={onCancel}
                      onClick={() => onTap(p)}
                      className={`relative flex cursor-grab items-center justify-center bg-[#f6f4f0] transition-shadow duration-300 active:cursor-grabbing ${on ? "ring-2 ring-olive" : ""}`}
                      style={{ aspectRatio: "1 / 1.08", borderRadius: u(3), padding: u(2), touchAction: "pan-y" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pic(p)} alt="" draggable={false} className="pointer-events-none h-full w-auto object-contain" />
                      <span
                        className={`absolute flex items-center justify-center rounded-full ${on ? "bg-olive text-cream" : "bg-white text-ink-soft shadow-sm"}`}
                        style={{ right: u(1.4), top: u(1.4), width: u(4.4), height: u(4.4), fontSize: u(3) }}
                        aria-hidden="true"
                      >
                        {on ? "✓" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={save}
                disabled={!ready}
                className={`mt-auto w-full rounded-full font-bold transition-[background-color,opacity] duration-300 ${justSaved ? "bg-olive text-cream" : "bg-ink text-cream"} ${ready ? "" : "opacity-35"}`}
                style={{ height: u(10.5), fontSize: u(3.5) }}
              >
                {justSaved ? "Saved ✓" : "Save Outfit"}
              </button>
            </div>
          </div>
        </Phone>
      </div>

      {/* Saved looks leave the phone as outfit cards */}
      {saved.map((s, i) => {
        const fromTop = saved.length - 1 - i;
        return (
          <div
            key={s.key}
            data-saved={s.key}
            data-rot={i % 2 ? 3 : -3}
            className="pop invisible absolute z-20 left-[calc(98%_-_var(--i)*5%)] top-[calc(42%_+_var(--i)*3%)] max-md:left-[calc(66%_-_var(--i)*4%)] max-md:top-[calc(50%_+_var(--i)*3%)]"
            style={{ width: u(46), borderRadius: u(3.4), ["--i" as string]: fromTop, zIndex: 20 + i } as CSSProperties}
          >
            <LookCard s={s} />
          </div>
        );
      })}

      {/* "Outfit saved" toast */}
      <div
        ref={toastEl}
        role="status"
        className="pop invisible absolute z-40 flex items-center bg-[#f7f3ee] text-ink"
        style={{ left: "-4%", top: "1%", width: u(108), gap: u(3), padding: `${u(3.2)} ${u(4.2)}`, borderRadius: u(3.6) }}
      >
        <CheckCircle style={{ width: u(6), flexShrink: 0 }} />
        <span>
          <span className="block font-bold" style={{ fontSize: u(3.6) }}>Outfit Saved!</span>
          <span className="block text-ink-soft" style={{ fontSize: u(2.9) }}>Added to My Outfits.</span>
        </span>
      </div>

      {ghost
        ? createPortal(
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={(el) => { ghostEl.current = el; moveGhost(); }}
              src={pic(ghost)}
              alt=""
              className="pointer-events-none fixed left-0 top-0 z-[100] h-auto drop-shadow-[0_18px_24px_rgb(46_28_18/.35)]"
            />,
            document.body,
          )
        : null}
    </div>
  );
}
