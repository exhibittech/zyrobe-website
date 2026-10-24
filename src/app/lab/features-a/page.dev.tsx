// Dev-only lab (page.dev.tsx is never exported).
import Nav from "@/components/ui/Nav";
import Wardrobe from "@/components/sections/Wardrobe";
import Storage from "@/components/sections/Storage";
import Outfits from "@/components/sections/Outfits";
import TryOn from "@/components/sections/TryOn";

export default function Lab() {
  return (
    <>
      <Nav />
      <main>
        <Wardrobe />
        <Storage />
        <Outfits />
        <TryOn />
        <div className="h-[60vh]" />
      </main>
    </>
  );
}
