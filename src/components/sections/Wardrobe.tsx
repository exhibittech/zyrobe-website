"use client";

import { useRef } from "react";
import Chapter from "@/components/ui/Chapter";
import Phone from "@/components/ui/Phone";
import Pop from "@/components/features-a/Pop";
import { popOut, tilt, useStageTimeline } from "@/components/features-a/stage";

function Stage() {
  const ref = useRef<HTMLDivElement>(null);

  useStageTimeline(ref, (tl, { q }) => {
    tilt(tl, q("[data-phone]")[0]);
    popOut(tl, q("[data-queue]"), 0.02, { dur: 0.16 });
    popOut(tl, q("[data-tag]"), 0.2, { stagger: 0.08 });
    popOut(tl, q("[data-card]"), 0.44, { stagger: 0.08 });
    popOut(tl, q("[data-ai]"), 0.68);
  });

  return (
    <div
      ref={ref}
      className="relative max-md:[--phone-w:min(54vw,27svh)]"
      style={{ width: "var(--phone-w)", aspectRatio: "900 / 1948" }}
    >
      <div data-phone className="absolute inset-0">
        <Phone
          video={{ src: "/media/video/wardrobe-ai.mp4", poster: "/media/video/wardrobe-ai-poster.webp" }}
          alt="Zyrobe app: a jacket is photographed, analysed by AI and saved with its details"
        />
      </div>

      {/* Analysing in the upload queue */}
      <Pop tag="queue" src="/media/comps/queue_card.webp" alt="Upload queue card: a jacket being analysed by AI, first in the queue" w={1.06} r={0.05} className="z-20 left-[-44%] top-[9%] max-md:left-[-26%] max-md:top-[5%] max-md:w-[calc(var(--phone-w)*0.98)]!" />

      {/* What the AI noted */}
      <Pop tag="tag" src="/media/comps/yl_piece_1.webp" alt="Linen shirt tagged as a top, formal style" w={0.42} r={0.095} rot={5} className="z-20 left-[74%] top-[22%] max-md:left-[70%] max-md:top-[24%]" />
      <Pop tag="tag" src="/media/comps/yl_piece_2.webp" alt="Beige trousers tagged as a bottom, formal style" w={0.42} r={0.095} rot={-4} className="z-20 left-[104%] top-[37%] max-md:left-[76%] max-md:top-[46%]" />
      <Pop tag="tag" src="/media/comps/yl_piece_3.webp" alt="Casual sneakers tagged as footwear, vintage style" w={0.42} r={0.095} rot={3} className="z-20 left-[78%] top-[55%] max-md:hidden" />

      {/* Into the wardrobe */}
      <Pop tag="card" src="/media/comps/wcard_jacket.webp" alt="Wardrobe card for a cream bomber jacket with navy trim" w={0.38} r={0.073} rot={-5} className="z-20 left-[-40%] top-[34%] max-md:left-[-24%] max-md:top-[48%]" />
      <Pop tag="card" src="/media/comps/wcard_tshirt.webp" alt="Wardrobe card for a T-shirt with a Japanese-style graphic print" w={0.38} r={0.073} rot={4} className="z-10 left-[-62%] top-[50%] max-md:hidden" />
      <Pop tag="card" src="/media/comps/wcard_jeans.webp" alt="Wardrobe card for black jeans" w={0.38} r={0.073} rot={-2} className="z-20 left-[-34%] top-[66%] max-md:hidden" />

      <Pop tag="ai" src="/media/comps/chip_ai.webp" alt="AI Curated badge" w={0.6} r={0.123} rot={3} className="z-30 left-[64%] top-[1%] max-md:left-[52%] max-md:top-[-1%] max-md:w-[calc(var(--phone-w)*0.5)]!" />
    </div>
  );
}

export default function Wardrobe() {
  return (
    <Chapter
      id="wardrobe"
      index={1}
      eyebrow="Wardrobe"
      title={<>Snap it.<br />Zyrobe knows it.</>}
      body={
        <p>
          Take a photo of any piece. Zyrobe removes the background and notes the type, colour and more, so your whole
          wardrobe sits in one place.
        </p>
      }
      points={[
        "Background removed for you",
        "Type, colour and details tagged by AI",
        "A clean product photo of any item, made with AI",
      ]}
    >
      <Stage />
    </Chapter>
  );
}
