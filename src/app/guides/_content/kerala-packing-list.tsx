import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "seasons",
      title: "What is the weather like in Kerala through the year?",
      body: (
        <>
          <p>
            Kerala’s coast and backwaters are warm and humid all year, and the hill stations of the Western Ghats are
            noticeably cooler. The rain is what changes most from season to season:
          </p>
          <GuideTable
            head={["Season", "Months", "Weather", "Pack"]}
            rows={[
              ["Cooler and drier", "December to February", "The most comfortable time on the coast; cool evenings in the hills", "Light cotton, plus a sweater or light jacket for Munnar or Wayanad"],
              ["Hot", "March to May", "Hot and humid, with some showers towards May", "Your lightest clothes, a hat and sunscreen"],
              ["Southwest monsoon", "June to September", "Heavy rain and very green landscapes", "Rain gear, quick-drying clothes and waterproof sandals"],
              ["Northeast monsoon", "October and November", "Afternoon and evening thunderstorms", "An umbrella and one extra set of clothes"],
            ]}
          />
        </>
      ),
    },
    {
      id: "coast",
      title: "What should I pack for the backwaters and beaches?",
      body: (
        <>
          <p>
            For a houseboat in Alappuzha or Kumarakom, or the beaches at Kovalam and Varkala, pack loose cotton and linen
            in light colours, swimwear for the beach, and a cover-up for walking around town. Evenings on the water bring
            mosquitoes, so pack one light long-sleeved top and a pair of long, thin trousers for after sunset.
          </p>
          <ul>
            <li>Slip-on sandals: you will take shoes off often, on houseboats and at homes and temples.</li>
            <li>A hat and sunglasses for long boat rides with little shade.</li>
            <li>Swimwear for the beach and the pool only; cover up in town and in restaurants.</li>
          </ul>
        </>
      ),
    },
    {
      id: "hills",
      title: "What should I pack for Munnar, Thekkady and Wayanad?",
      body: (
        <>
          <p>
            The hill stations are cooler than the coast, especially early in the morning and after dark. From December to
            February, nights in Munnar can be cold. Pack a sweater or fleece and a light jacket, and long trousers for
            walks through tea estates and forests.
          </p>
          <ul>
            <li>Walking shoes with a good grip; trails get muddy and slippery.</li>
            <li>Long socks and closed shoes for forest walks. In the wet months, ask your guide about leeches on the trail.</li>
            <li>A light rain jacket, even outside the monsoon: hill weather changes quickly.</li>
          </ul>
        </>
      ),
    },
    {
      id: "temples",
      title: "What should I wear to temples in Kerala?",
      body: (
        <>
          <p>
            Many Kerala temples have strict dress codes. Some, like the Sree Padmanabhaswamy Temple in
            Thiruvananthapuram and the Guruvayur temple, ask men to wear a mundu (a white dhoti) and enter without a
            shirt, and women to wear a saree or other traditional dress. Some temples allow only Hindus inside. Shoes are
            always removed at the entrance.
          </p>
          <Tip>
            <p>Rules differ from temple to temple and can change, so check before you go. Near the bigger temples, mundus can often be bought or rented on the spot, but carrying your own saves time.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "monsoon",
      title: "What should I pack for Kerala in the monsoon?",
      body: (
        <>
          <p>
            Kerala is beautiful in the rains, and many travellers come then on purpose. Pack the way you would for a
            monsoon at home, with a little extra because clothes dry slowly in the humidity.
          </p>
          <Checklist
            title="Monsoon extras"
            items={[
              "A sturdy umbrella and a light rain jacket",
              "Quick-drying tops and trousers instead of denim",
              "Waterproof sandals with a good grip",
              "Dry bags or zip bags for your phone and documents",
              "One or two extra sets of clothes",
            ]}
          />
          <p>
            For more on quick-drying fabrics and drying clothes in humid weather, see our guide to <GuideLink href="/guides/monsoon-wardrobe-guide">what to wear in the monsoon</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "five-days",
      title: "What should I pack for five days in Kerala?",
      body: (
        <>
          <GuideTable            caption="A coast-and-hills trip outside the monsoon"            head={["Item", "How many", "Notes"]}            rows={[              ["Light tops", "5", "Cotton or linen; one or two with long sleeves for evenings"],              ["Light trousers, skirts or shorts", "3", "At least one long pair for temples and the hills"],              ["Warm layer", "1", "A sweater or fleece for Munnar or Wayanad"],              ["Traditional outfit", "1", "A saree, a mundu or a long skirt if you plan to visit temples"],              ["Swimwear and a cover-up", "1 each", "For Kovalam, Varkala or the hotel pool"],              ["Shoes", "2 pairs", "Slip-on sandals and walking shoes with a good grip"],            ]}          />
          <p>
            Turn this list into outfits for each day with the <GuideLink href="/features/trip-packing-planner">trip packing planner</GuideLink>. Adding a beach stop? See the <GuideLink href="/guides/goa-packing-list">Goa packing list</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "essentials",
      title: "What else should I pack for Kerala?",
      body: (
        <Checklist
          title="Kerala essentials"
          items={[
            "Sunscreen and insect repellent",
            "A light cotton scarf or stole for sun, temples and cool evenings",
            "A small quick-dry towel",
            "A reusable water bottle",
            "A small daypack for boat trips and hill walks",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "plan an outfit for each day of your Kerala trip, see the weather where you are going, and share the plan as a PDF." },
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "choose your trip clothes from photos of what you already own." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for travel looks; its ideas consider your style and the weather." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note what went into the suitcase, so you can check it all comes home." },
  ],
};

export default body;
