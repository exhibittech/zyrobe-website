import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "weather",
      title: "What is the weather like in Dubai?",
      body: (
        <>
          <p>Dubai is hot for most of the year and rain is rare. The big difference is between the mild winter and the extreme summer:</p>
          <GuideTable
            head={["Season", "Months", "Weather", "Pack"]}
            rows={[
              ["Winter", "December to February", "Warm, sunny days and cool evenings, cooler still in the desert", "Light clothes and a jacket or sweater for the evening"],
              ["Spring", "March to May", "Warm, getting hot by May", "Light, breathable clothes, sunglasses and a hat"],
              ["Summer", "June to September", "Extremely hot, often above 40°C, and humid near the coast", "The lightest loose clothes you own; plan to spend the middle of the day indoors"],
              ["Autumn", "October and November", "Hot at first, slowly cooling", "Light clothes, and a layer for late November evenings"],
            ]}
          />
        </>
      ),
    },
    {
      id: "dress-code",
      title: "What is the dress code in Dubai?",
      body: (
        <>
          <p>
            Dubai is international and relaxed in hotels, beach clubs and restaurants, but modest dress is expected in
            public places like malls, souks, the metro and government buildings. A simple rule: keep your shoulders and
            knees covered, and avoid very short, tight or see-through clothes.
          </p>
          <ul>
            <li>Swimwear is for the beach and the pool. Put on a cover-up before you walk into a lobby, a café or a shop.</li>
            <li>Loose trousers, midi and maxi skirts and dresses, and shirts or tops with sleeves work everywhere.</li>
            <li>Evening wear in hotels and restaurants can be dressier, but the same modest basics apply on the way there.</li>
          </ul>
        </>
      ),
    },
    {
      id: "mosque",
      title: "What should I wear to visit a mosque?",
      body: (
        <>
          <p>
            Mosques that welcome visitors, like the Jumeirah Mosque in Dubai, or the Sheikh Zayed Grand Mosque on a day
            trip to Abu Dhabi, ask for loose, long clothes that cover your arms and legs. Women are asked to cover their
            hair with a scarf, and everyone removes their shoes.
          </p>
          <Tip>
            <p>Check the mosque’s visitor rules and opening times before you go. Bring your own scarf even if you expect one to be provided.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "desert",
      title: "What should I pack for a desert safari?",
      body: (
        <>
          <p>
            Desert safaris usually start in the afternoon and end after dark. The sand is hot in the sun, but from
            November to March the evening can be surprisingly cold, so bring a jacket or fleece.
          </p>
          <Checklist
            title="Desert safari"
            items={[
              "Light, long, loose clothes that protect you from the sun and the sand",
              "Closed shoes or sturdy sandals (sand gets into everything)",
              "A scarf to cover your face from blowing sand",
              "Sunglasses and sunscreen",
              "A warm layer for the evening in winter",
            ]}
          />
        </>
      ),
    },
    {
      id: "list",
      title: "What should I pack for five days in Dubai?",
      body: (
        <>
          <GuideTable            caption="For a five-day trip"            head={["Item", "How many", "Notes"]}            rows={[              ["Light tops with sleeves", "5", "Cotton or linen; short sleeves are fine, sleeveless less so in malls and souks"],              ["Trousers, long skirts or maxi dresses", "3", "Loose and breathable"],              ["Smart evening outfits", "1 to 2", "For a nice dinner or a show"],              ["Light layer", "1", "Malls, the metro and restaurants are strongly air-conditioned"],              ["Swimwear and a cover-up", "1 to 2, plus 1", "For the beach, the pool or a water park"],              ["Shoes", "2 to 3 pairs", "Comfortable walking shoes, sandals, and one smarter pair"],            ]}          />
          <p>
            Plan each day with the <GuideLink href="/features/trip-packing-planner">trip packing planner</GuideLink>. Continuing to Europe? See the <GuideLink href="/guides/paris-packing-list">Paris packing list</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "ramadan",
      title: "What should I wear in Dubai during Ramadan?",
      body: (
        <p>
          Ramadan dates move each year, so check whether your trip falls in the holy month. During Ramadan, dress more
          conservatively than usual in public places, with loose clothes that cover your shoulders and knees, and be
          considerate about eating and drinking in public during fasting hours. Hotels, malls and many restaurants stay
          open, and evenings are lively after sunset, so pack a smart, modest outfit for going out at night.
        </p>
      ),
    },
    {
      id: "from-india",
      title: "Any tips for travellers from India?",
      body: (
        <>
          <p>
            Dubai is a short flight from most Indian cities, and the heat will feel familiar, but the dress expectations
            in public places and the strength of the air conditioning catch many travellers out. A stole or pashmina
            solves both: it covers your shoulders in a mall or a mosque, and keeps you warm indoors.
          </p>
          <ul>
            <li>Pack light: you will want room in your suitcase if you plan to shop.</li>
            <li>Plan outdoor sightseeing for mornings and evenings in the hotter months.</li>
            <li>Wear your heaviest shoes on the flight to save space and weight.</li>
          </ul>
        </>
      ),
    },
  ],
  helps: [
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "create your Dubai trip, plan an outfit for each day, see the weather where you are going, and share the plan as a PDF." },
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "find your light, modest pieces quickly from photos of the clothes you own." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "build looks that share pieces, so a small bag covers sightseeing, dinners and the desert." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for travel or evening looks; its ideas consider your style and the weather." },
  ],
};

export default body;
