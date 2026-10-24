// Dev-only lab (page.dev.tsx is never exported).
import Nav from "@/components/ui/Nav";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Download from "@/components/sections/Download";

export default function Lab() {
  return (
    <>
      <Nav />
      <main>
        <Pricing />
        <Faq />
        <Download />
        <div className="h-[60vh]" />
      </main>
    </>
  );
}
