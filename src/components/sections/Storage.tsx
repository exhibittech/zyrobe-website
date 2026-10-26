"use client";

import { useRef } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import Pop from "@/components/features-a/Pop";
import { diveIn, popOut, tilt, useStageTimeline } from "@/components/features-a/stage";

const PLACES = [
  { src: "/media/feat/ph_bedroom_wardrobe.webp", name: "Bedroom Wardrobe", count: "4 items", rot: -5, cls: "left-[-58%] top-[6%] max-md:left-[-30%] max-md:top-[2%]" },
  { src: "/media/feat/ph_shirt_drawer.webp", name: "Shirt Drawer", count: "12 items", rot: 4, cls: "left-[-50%] top-[40%] max-md:hidden" },
  { src: "/media/feat/ph_travel_bag.webp", name: "Travel Bag", count: "9 items", rot: 5, cls: "left-[104%] top-[12%] max-md:left-[78%] max-md:top-[8%]" },
  { src: "/media/feat/ph_walk_in_closet.webp", name: "Walk-in Closet", count: "26 items", rot: -3, cls: "left-[98%] top-[46%] max-md:hidden" },
];

const ITEMS = [
  { src: "/media/feat/st_item_0.webp", alt: "Maroon patterned velvet shirt, ticked", rot: -9, cls: "left-[-34%] top-[70%] max-md:left-[-22%] max-md:top-[68%]" },
  { src: "/media/feat/st_item_1.webp", alt: "White linen shirt, ticked", rot: -4, cls: "left-[-4%] top-[73%] max-md:left-[34%] max-md:top-[72%]" },
  { src: "/media/feat/st_item_2.webp", alt: "Mid-blue jeans, ticked", rot: 0, cls: "left-[26%] top-[75%] max-md:left-[90%] max-md:top-[68%]" },
  { src: "/media/feat/st_item_3.webp", alt: "Faded blue jeans, ticked", rot: 4, cls: "left-[56%] top-[73%] max-md:hidden" },
  { src: "/media/feat/st_item_4.webp", alt: "Dark blue jeans, ticked", rot: 9, cls: "left-[86%] top-[70%] max-md:hidden" },
];

// The Storage Details screen as items get ticked (cross-fades over the Storage tab).
const DETAIL_SCREENS = [
  ["st_detail_0", "Storage Details for the Bedroom Wardrobe, with no items ticked yet"],
  ["st_detail_2", "Storage Details for the Bedroom Wardrobe, with a velvet shirt and a linen shirt ticked"],
  ["st_detail_4", "Storage Details for the Bedroom Wardrobe, with four items ticked"],
] as const;

function Stage() {
  const ref = useRef<HTMLDivElement>(null);

  useStageTimeline(ref, (tl, { q }) => {
    const [bedroom, ...others] = q("[data-place]");
    const screens = q("[data-screen]");
    tilt(tl, q("[data-phone]")[0], 10, -8);

    // Storage places lift out of the Storage tab
    popOut(tl, q("[data-place]"), 0.02, { stagger: 0.06, dur: 0.15 });

    // Open "Bedroom Wardrobe"
    tl.to(others, { opacity: 0.4, scale: 0.94, duration: 0.08 }, 0.32)
      .to(bedroom, { scale: 1.07, duration: 0.08, ease: "power2.out" }, 0.32)
      .to(q("[data-ring]"), { opacity: 1, duration: 0.06 }, 0.33)
      .to(screens[0], { opacity: 1, duration: 0.05 }, 0.34);

    // Tick the clothes kept there, then they go in
    const items = q("[data-item]");
    popOut(tl, items, 0.4, { stagger: 0.035, dur: 0.12 });
    diveIn(tl, items, 0.62, { stagger: 0.035, dur: 0.1 });
    tl.to(screens[1], { opacity: 1, duration: 0.04 }, 0.66).to(screens[2], { opacity: 1, duration: 0.04 }, 0.74);

    // Saved
    popOut(tl, q("[data-toast]"), 0.82, { dur: 0.1, reach: 0.4 });
  });

  return (
    <div
      ref={ref}
      className="relative max-md:[--phone-w:min(52vw,26svh)]"
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948" }}
    >
      <div data-phone className="absolute inset-0">
        <Phone src="/media/feat/st_grid.webp" alt="Zyrobe Storage tab: Bedroom Wardrobe, Travel Bag, Shirt Drawer and Walk-in Closet">
          {DETAIL_SCREENS.map(([s, alt]) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s}
              data-screen
              src={`/media/feat/${s}.webp`}
              alt={alt}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0"
            />
          ))}
        </Phone>
      </div>

      {PLACES.map((p) => (
        <figure
          key={p.name}
          data-place
          data-rot={p.rot}
          className={`pop invisible absolute z-20 bg-paper p-[calc(var(--phone-w)*0.022)] pb-[calc(var(--phone-w)*0.03)] ${p.cls}`}
          style={{ width: "calc(var(--phone-w) * 0.46)" }}
        >
          <div className="relative overflow-hidden rounded-[calc(var(--phone-w)*0.03)]" style={{ aspectRatio: "700 / 728" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <figcaption className="mt-[calc(var(--phone-w)*0.025)] px-0.5 leading-tight">
            <span className="block truncate font-bold text-ink" style={{ fontSize: "calc(var(--phone-w) * 0.042)" }}>{p.name}</span>
            <span className="block text-muted" style={{ fontSize: "calc(var(--phone-w) * 0.032)" }}>{p.count}</span>
          </figcaption>
          {p.name === "Bedroom Wardrobe" ? (
            <span data-ring className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 ring-2 ring-olive ring-offset-2 ring-offset-paper" />
          ) : null}
        </figure>
      ))}

      {ITEMS.map((it) => (
        <Pop key={it.src} tag="item" src={it.src} alt={it.alt} w={0.3} rot={it.rot} className={`z-30 ${it.cls}`} />
      ))}

      <Pop tag="toast" src="/media/feat/st_toast.webp" alt="Success: items saved to storage successfully" w={1.1} className="z-40 left-[-5%] top-[83%]" />
    </div>
  );
}

export default function Storage() {
  return (
    <Chapter
      id="storage"
      index={2}
      side="right"
      eyebrow="Storage"
      title={<>Know where it all lives.</>}
      body={
        <p>
          Note where each piece is kept: a cupboard, a drawer, a suitcase. Next time you are looking for that shirt, you
          will know exactly where it is.
        </p>
      }
      points={["Add a storage place with a photo", "Tick the clothes kept there", "Find any item fast"]}
      // Flip the columns so the stage keeps the wide column on this side too.
      className="md:[&>div>div]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <Stage />
    </Chapter>
  );
}
