import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "seasons",
      title: "What is the weather like in Goa through the year?",
      body: (
        <>
          <p>Goa is warm all year. What changes is the rain, the humidity and how crowded it is:</p>
          <GuideTable
            head={["Season", "Months", "Weather", "Pack"]}
            rows={[
              ["Peak season", "November to February", "Sunny, warm days and pleasant evenings; the busiest time", "Beachwear, light cotton and one light layer for the evening"],
              ["Hot season", "March to May", "Hot and humid, with strong sun", "The lightest, loosest clothes you own, a hat and plenty of sunscreen"],
              ["Monsoon", "June to September", "Heavy rain and rough seas; many beach shacks close and swimming is often restricted", "Rain gear, quick-drying clothes and waterproof sandals"],
              ["After the rains", "October", "Green and humid, with fewer visitors", "Light clothes and a compact umbrella"],
            ]}
          />
        </>
      ),
    },
    {
      id: "clothes",
      title: "What clothes should I pack for Goa?",
      body: (
        <>
          <p>
            Pack light, loose clothes in cotton and linen. Goa is casual during the day, but many restaurants and beach
            clubs are a little dressier in the evening, so bring one or two smarter outfits too.
          </p>
          <GuideTable
            caption="For a five-day trip"
            head={["Item", "How many", "Notes"]}
            rows={[
              ["T-shirts and light tops", "5", "Cotton or linen, in colours that mix with all your bottoms"],
              ["Shorts, skirts or light trousers", "3", "One pair of light trousers is useful for temples and evenings"],
              ["Swimwear", "2", "So one can dry while you wear the other"],
              ["Cover-up or sarong", "1", "For walking from the beach to a café or your room"],
              ["Evening outfits", "2", "A linen shirt, a summer dress or a smart cotton set"],
              ["Light layer", "1", "For November to February evenings and air-conditioned rooms"],
            ]}
          />
          <p>
            Want these as outfits for each day? The <GuideLink href="/features/trip-packing-planner">trip packing planner</GuideLink> builds a day-by-day packing list from your own wardrobe. Heading south next? See the <GuideLink href="/guides/kerala-packing-list">Kerala packing list</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "footwear",
      title: "What footwear should I take to Goa?",
      body: (
        <ul>
          <li><strong>Flip-flops or slides</strong> for the beach and the pool.</li>
          <li><strong>Comfortable walking sandals</strong> for Old Goa, Panjim’s Latin Quarter and the markets.</li>
          <li><strong>One smarter pair</strong> for dinners and evenings out.</li>
          <li><strong>In the monsoon,</strong> waterproof sandals or floaters with a good grip instead of anything leather or canvas.</li>
        </ul>
      ),
    },
    {
      id: "modest",
      title: "What should I wear at churches, temples and in town?",
      body: (
        <>
          <p>
            Goa is relaxed, but swimwear belongs on the beach and by the pool. In towns, markets and restaurants, wear a
            cover-up or regular clothes. For churches such as the Basilica of Bom Jesus and the Se Cathedral in Old Goa,
            and for temples, cover your shoulders and knees. At temples you will also remove your shoes.
          </p>
          <Tip>
            <p>A light cotton scarf or stole fixes most dress-code moments: cover your shoulders with it at a church, and use it against the sun on the beach.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "activities",
      title: "What should I wear for scooter rides, water sports and nights out?",
      body: (
        <ul>
          <li><strong>Scooter rides:</strong> a helmet is required by law, and closed shoes and a light long-sleeved layer protect your feet and arms from the sun and from scrapes.</li>
          <li><strong>Water sports:</strong> swimwear with a quick-dry T-shirt or rash guard on top, so you don’t burn on long rides. Leave jewellery in your room.</li>
          <li><strong>Boat trips:</strong> a hat that won’t blow away, sunscreen and a light cover-up for the ride back.</li>
          <li><strong>Nights out:</strong> beach clubs and restaurants are relaxed, but some are dressier in peak season, so pack one smart outfit and shoes that are not flip-flops.</li>
        </ul>
      ),
    },
    {
      id: "monsoon",
      title: "What should I pack for Goa in the monsoon?",
      body: (
        <>
          <p>
            The monsoon is a beautiful, green and quiet time in Goa, but it rains hard and often. Seas are rough, so
            follow the lifeguards’ flags and local advice about swimming.
          </p>
          <Checklist
            title="Monsoon extras"
            items={[
              "A light rain jacket or poncho (more useful than an umbrella on a scooter)",
              "Quick-drying tops and shorts instead of denim",
              "Waterproof sandals with a good grip",
              "A dry bag or zip bags for your phone and documents",
              "One extra set of clothes, because things dry slowly in the humidity",
            ]}
          />
          <p>
            For more on quick-drying fabrics and keeping clothes dry in humid weather, see our guide to <GuideLink href="/guides/monsoon-wardrobe-guide">what to wear in the monsoon</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "sun",
      title: "What else should I pack for the sun?",
      body: (
        <Checklist
          title="Sun kit"
          items={[
            "Sunscreen, and a lip balm with SPF",
            "Sunglasses and a wide-brimmed hat or cap",
            "A light, long-sleeved cotton shirt to cover up in the afternoon sun",
            "A reusable water bottle",
            "A small beach bag or tote",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "create a Goa trip, choose Beach & Resort, plan an outfit for each day, see the weather where you are going, and share the plan as a PDF." },
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "pick your trip outfits from photos of the clothes you already own, without opening every drawer." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for travel looks; its ideas consider your style and the weather." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "mark what is in the suitcase, so nothing gets left behind on the way home." },
  ],
};

export default body;
