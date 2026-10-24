// Dev-only lab (page.dev.tsx is never exported).
import Nav from "@/components/ui/Nav";
import Stylist from "@/components/sections/Stylist";
import Planner from "@/components/sections/Planner";
import Briefcase from "@/components/sections/Briefcase";
import Finale from "@/components/sections/Finale";

export default function Lab() {
  return (
    <>
      <Nav />
      <main>
        <Stylist />
        <Planner />
        <Briefcase />
        <Finale />
        <div className="h-[60vh]" />
      </main>
    </>
  );
}
