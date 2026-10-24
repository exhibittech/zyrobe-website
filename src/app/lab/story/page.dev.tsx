// Dev-only lab (page.dev.tsx is never exported).
import Nav from "@/components/ui/Nav";
import Questions from "@/components/sections/Questions";
import HomeReveal from "@/components/sections/HomeReveal";

export default function Lab() {
  return (
    <>
      <Nav />
      <main>
        <Questions />
        <HomeReveal />
        <div className="h-[60vh]" />
      </main>
    </>
  );
}
