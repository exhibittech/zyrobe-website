import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import Questions from "@/components/sections/Questions";
import HomeReveal from "@/components/sections/HomeReveal";
import Wardrobe from "@/components/sections/Wardrobe";
import Storage from "@/components/sections/Storage";
import Outfits from "@/components/sections/Outfits";
import TryOn from "@/components/sections/TryOn";
import Stylist from "@/components/sections/Stylist";
import Planner from "@/components/sections/Planner";
import Briefcase from "@/components/sections/Briefcase";
import Finale from "@/components/sections/Finale";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Download from "@/components/sections/Download";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Questions />
        <HomeReveal />
        <div id="features">
          <Wardrobe />
          <Storage />
          <Outfits />
          <TryOn />
          <Stylist />
          <Planner />
          <Briefcase />
        </div>
        <Finale />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
