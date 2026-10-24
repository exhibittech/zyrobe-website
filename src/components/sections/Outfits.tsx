"use client";

import Chapter from "@/components/ui/Chapter";
import OutfitStudio from "@/components/features-a/OutfitStudio";

export default function Outfits() {
  return (
    <Chapter
      id="outfits"
      index={3}
      length={200}
      eyebrow="Outfits"
      title={<>Drag. Drop.<br />Dressed.</>}
      body={
        <p>
          Build outfits from clothes you already own. Pick a top and a bottom, place them on the canvas and save the look.{" "}
          <span className="font-bold text-ink md:hidden">Tap a piece to try it.</span>
          <span className="font-bold text-ink max-md:hidden">Go on, try it.</span>
        </p>
      }
      points={["Mix and match on a free canvas", "Save looks to My Outfits", "Built only from clothes you own"]}
    >
      <OutfitStudio />
    </Chapter>
  );
}
