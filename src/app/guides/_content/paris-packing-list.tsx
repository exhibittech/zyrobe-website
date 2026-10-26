import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "seasons",
      title: "What is the weather like in Paris in each season?",
      body: (
        <>
          <p>
            “What do I pack for Paris?” is one of the questions in Zyrobe’s launch film, because the answer changes so
            much with the season. Rain is possible at any time of year, so a light waterproof layer is always worth
            packing.
          </p>
          <GuideTable
            head={["Season", "Months", "Weather", "Pack"]}
            rows={[
              ["Winter", "December to February", "Cold, often grey and damp; daytime usually only a few degrees above freezing", "A warm coat, thermals, a scarf, gloves and waterproof shoes"],
              ["Spring", "March to May", "Mild but changeable, with showers", "Layers, a light jacket or trench coat, and an umbrella"],
              ["Summer", "June to August", "Warm to hot, with long evenings and occasional heatwaves", "Breathable cotton and linen, plus one light layer for the evening"],
              ["Autumn", "September to November", "Mild at first, then cooler and wetter", "Layers, a warm jacket for November, and an umbrella"],
            ]}
          />
        </>
      ),
    },
    {
      id: "winter",
      title: "What should I pack for Paris in winter?",
      body: (
        <>
          <p>
            Paris in winter is much colder than most Indian cities, and the damp makes it feel colder than the number
            on your weather app. Dress in layers you can open up indoors, because museums, shops and the metro are heated.
          </p>
          <Checklist
            title="Winter list"
            items={[
              "A warm coat, wool or insulated, that covers your hips",
              "Two thermal tops and leggings to wear under your clothes",
              "Three or four sweaters or warm tops",
              "A scarf, gloves and a warm cap",
              "Waterproof shoes or boots with a good sole",
              "A compact umbrella",
            ]}
          />
        </>
      ),
    },
    {
      id: "spring-autumn",
      title: "What should I pack for spring and autumn?",
      body: (
        <p>
          Spring and autumn are about layers. Pack a mix of T-shirts, shirts and light sweaters, two pairs of trousers or
          jeans, and a light jacket or trench coat. A scarf is useful in the cooler mornings and evenings. In April or
          October, a single day can start cold, turn sunny and end in rain, so dress in layers you can add or remove.
        </p>
      ),
    },
    {
      id: "summer",
      title: "What should I pack for Paris in summer?",
      body: (
        <>
          <p>
            Pack breathable cotton and linen: shirts, dresses, light trousers and skirts. Summer evenings can still be
            cool, so bring a light jacket or cardigan. Add sunglasses, a hat and a reusable water bottle for days of walking
            in the sun, especially during a heatwave.
          </p>
          <p>
            Churches don’t usually have a strict dress code for visitors, but covering your shoulders is respectful.
            A light scarf does the job.
          </p>
        </>
      ),
    },
    {
      id: "shoes",
      title: "What shoes are best for walking around Paris?",
      body: (
        <>
          <p>
            Paris is a walking city. Between cobbled streets, long museum galleries and metro stairs, you will be on your
            feet most of the day. Pack shoes you have already broken in: comfortable sneakers or walking shoes, plus one
            smarter pair for the evening. Leave new shoes and thin heels at home, and make sure your winter shoes are
            waterproof.
          </p>
          <Tip>
            <p>Wear your bulkiest shoes and your coat on the flight. It frees up a lot of space in your suitcase.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "style",
      title: "What do people wear in Paris?",
      body: (
        <p>
          Smart-casual outfits in neutral colours fit in almost everywhere, from cafés to museums to nice restaurants:
          dark jeans or trousers, plain knits and shirts, a good coat and clean sneakers or loafers. You don’t need to
          dress up, and a few pieces that all go together will give you a different outfit every day. One dressier
          outfit is enough for a special dinner or a show.
        </p>
      ),
    },
    {
      id: "five-days",
      title: "What should I pack for five days in Paris?",
      body: (
        <GuideTable
          caption="For spring or autumn; add the winter or summer extras above"
          head={["Item", "How many", "Notes"]}
          rows={[
            ["Tops and shirts", "5", "Neutral colours that all go together"],
            ["Light sweaters or knits", "2", "To layer over the tops"],
            ["Trousers or jeans", "2 to 3", "One dark pair works for evenings too"],
            ["Jacket or trench coat", "1", "Ideally water-resistant"],
            ["Evening outfit", "1", "For a special dinner or a show"],
            ["Shoes", "2 pairs", "Broken-in walking shoes and one smarter pair"],
            ["Scarf and compact umbrella", "1 each", "Useful in every season"],
          ]}
        />
      ),
    },
    {
      id: "from-india",
      title: "Any tips for travellers from India?",
      body: (
        <Checklist
          title="Before you fly"
          items={[
            "Check the forecast a week before you leave and again the night before",
            "Pack a pashmina or stole: it works as a scarf, a layer and a cover-up",
            "Carry a cross-body bag that zips; crowded sights and the metro attract pickpockets",
            "Keep a warm layer in your hand luggage for the flight and the arrival",
            "Plan your outfits by day, so you pack only what you will wear",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "create your Paris trip, plan an outfit for each day, see the weather where you are going, and share the plan as a PDF." },
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "choose from photos of the clothes you already own, so you only buy what is really missing." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for a look for an evening out or a gallery opening; its ideas consider your style and the weather." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "build a few looks that share pieces, so a small suitcase covers the whole trip." },
  ],
};

export default body;
