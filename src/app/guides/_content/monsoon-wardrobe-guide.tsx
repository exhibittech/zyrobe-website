import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "when",
      title: "When is the monsoon in India?",
      body: (
        <>
          <p>
            The southwest monsoon usually reaches Kerala in early June, Mumbai and Kolkata around the middle of June,
            and most of the country by July. It withdraws in September and October. Parts of the south-east, including
            Tamil Nadu, get much of their rain later, from the northeast monsoon between about October and December.
            Every city feels the monsoon a little differently:
          </p>
          <GuideTable
            head={["Place", "What the rain is like", "Dress for it"]}
            rows={[
              ["Mumbai", "Very heavy downpours, waterlogged streets and long commutes", "Waterproof footwear, quick-dry trousers or capris, and a spare set of clothes at work"],
              ["Kerala", "Two rainy seasons and humidity for much of the year", "Breathable, quick-drying clothes and an umbrella in your bag every day"],
              ["Kolkata", "Sudden heavy showers between hot, sticky spells", "Light cotton blends that breathe, and sandals that can get wet"],
            ]}
          />
        </>
      ),
    },
    {
      id: "fabrics",
      title: "Which fabrics are best for the rainy season?",
      body: (
        <>
          <p>
            Good monsoon fabrics are light, dry fast and don’t mind getting wet. Heavy, thick or delicate fabrics stay
            damp for hours or get damaged by water.
          </p>
          <GuideTable
            head={["Fabric", "In the rain", "Why"]}
            rows={[
              ["Polyester and nylon blends", "Very good", "They dry quickly and hold their shape"],
              ["Thin cotton and cotton blends", "Good", "Comfortable in the humidity; thin weaves dry faster than thick ones"],
              ["Linen", "Good", "Light and airy, though it creases"],
              ["Rayon and viscose", "Take care", "Comfortable, but weaker when wet and can shrink"],
              ["Denim", "Avoid", "Heavy when wet and very slow to dry"],
              ["Silk, suede and leather", "Avoid", "Water can stain or damage them"],
            ]}
          />
        </>
      ),
    },
    {
      id: "colours",
      title: "What colours should I wear in the monsoon?",
      body: (
        <p>
          Darker and mid-tone colours, like navy, olive, maroon and charcoal, hide mud splashes and water marks. Prints
          hide marks too. Be careful with white and very pale, thin fabrics: many of them turn see-through when they get
          wet. Keep your lightest outfits for days when you know you will stay indoors.
        </p>
      ),
    },
    {
      id: "footwear",
      title: "What footwear works in the rain?",
      body: (
        <>
          <p>
            Choose shoes that can get wet and dry quickly: waterproof sandals or floaters with a good grip, rubber or PVC
            shoes, or gumboots if your streets flood. Grip matters as much as waterproofing, because wet floors, stairs
            and roads get slippery.
          </p>
          <p>
            Leave leather shoes, suede and canvas sneakers at home on rainy days. Leather stains and cracks, and canvas
            stays wet for hours and starts to smell. If your shoes do get soaked, stuff them with newspaper and leave them
            near a fan, not in direct heat.
          </p>
        </>
      ),
    },
    {
      id: "bag",
      title: "What should I keep at work or in my bag?",
      body: (
        <Checklist
          title="Monsoon bag"
          items={[
            "A compact umbrella or a light rain jacket",
            "A spare pair of socks and a spare top",
            "A small quick-dry towel",
            "Zip bags for your phone, wallet and papers",
            "A plastic or foldable bag for wet clothes and the umbrella",
          ]}
        />
      ),
    },
    {
      id: "drying",
      title: "How do I dry clothes when the air is so humid?",
      body: (
        <>
          <p>
            Clothes that stay damp for too long start to smell musty, so the goal is to dry them fully and quickly.
          </p>
          <ul>
            <li>Wash smaller loads, and use the fastest spin your machine allows.</li>
            <li>Hang clothes with space between them, under a fan or by an open window, so air can move through.</li>
            <li>Turn thick items like jeans inside out, and hang them by the waistband so more fabric is exposed.</li>
            <li>Never fold or store anything that still feels even slightly damp.</li>
            <li>If something already smells musty, wash it again and dry it completely; ironing helps remove the last bit of moisture.</li>
          </ul>
        </>
      ),
    },
    {
      id: "storage",
      title: "How do I stop mould and musty smells in the cupboard?",
      body: (
        <>
          <p>
            Keep the inside of your cupboard as dry as you can. Put moisture absorbers, like silica gel sachets or
            moisture-absorbing boxes, on each shelf, and replace or dry them out when they are full. Don’t pack clothes
            tightly: air needs to move. On dry, sunny days, leave the cupboard doors open for a few hours.
          </p>
          <ul>
            <li>Store silks and festive clothes in breathable cotton or muslin bags, not sealed plastic.</li>
            <li>Wipe leather bags, belts and shoes, let them dry, and keep them where air can reach them.</li>
            <li>If you use camphor or naphthalene balls, wrap them in cloth and keep them away from children and pets.</li>
          </ul>
          <Tip>
            <p>Before the rains start, move the clothes you won’t need until winter to a higher, drier shelf or a closed box with a moisture absorber.</p>
          </Tip>
        </>
      ),
    },
  ],
  helps: [
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "see all your clothes by type and colour, so the darker, quick-drying pieces are easy to find on a rainy morning." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask what to wear today; its ideas consider your style and the weather." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note what you moved to the top shelf or a closed box for the season, so you know where it is in winter." },
    { href: "/features/outfit-planner", label: "Outfit planner", text: "plan the week’s outfits ahead, so you aren’t choosing in a hurry when it’s pouring outside." },
  ],
};

export default body;
