// Dev-only lab (page.dev.tsx is never exported).
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";

export default function Lab() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="h-[60vh]" />
      </main>
    </>
  );
}
