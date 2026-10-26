import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "how-cold",
      title: "How cold are Manali and Shimla in winter?",
      body: (
        <>
          <p>
            Both towns sit around 2,000 metres up or higher, and December to February is the coldest time. Days are cold
            but often sunny, and daytime temperatures are usually in single digits Celsius. Nights can drop below freezing,
            especially in Manali. Snow is likely in this period, though how much, and when, changes from year to year.
          </p>
          <p>
            Higher places nearby, like Solang Valley and Sissu beyond the Atal Tunnel near Manali, or Kufri and Narkanda
            near Shimla, are colder and snowier than the towns. Plan your clothes for the coldest place on your
            itinerary, not for the town.
          </p>
        </>
      ),
    },
    {
      id: "layers",
      title: "How should I layer for the mountains?",
      body: (
        <>
          <p>
            Layers keep you warmer than one heavy jacket, and you can take one off when you step into a heated café or a
            warm car.
          </p>
          <GuideTable
            head={["Layer", "What it does", "What to wear"]}
            rows={[
              ["Base", "Keeps warmth in and moves sweat away from your skin", "Thermal top and leggings in wool or a synthetic blend"],
              ["Middle", "Traps warm air", "A fleece, a wool sweater or a light down vest"],
              ["Outer", "Blocks wind, snow and rain", "A warm insulated jacket that is water-resistant and windproof"],
            ]}
          />
          <Tip>
            <p>Avoid cotton as your base layer. Cotton holds sweat and snowmelt and stays cold and damp against your skin, while wool and synthetics keep you warmer when they get wet.</p>
          </Tip>
          <p>
            If your winter clothes are packed away, the <GuideLink href="/features/clothes-storage-tracker">clothes storage tracker</GuideLink> shows which box, loft or suitcase holds them.
          </p>
        </>
      ),
    },
    {
      id: "list",
      title: "What should I pack for a winter trip to Manali or Shimla?",
      body: (
        <>
          <GuideTable            caption="For a five-day trip"            head={["Item", "How many", "Notes"]}            rows={[              ["Thermal sets (top and leggings)", "2 to 3", "Wear one, keep one dry"],              ["Warm tops or sweaters", "3", "Wool or fleece works best"],              ["Insulated jacket", "1", "Water-resistant, with a hood if possible"],              ["Warm trousers", "3", "Fleece-lined or wool-blend; jeans are fine in town on dry days but stay cold and wet in snow"],              ["Woollen socks", "4 to 5 pairs", "Plus one spare pair in your day bag"],              ["Gloves", "1 to 2 pairs", "Waterproof ones if you plan to play in the snow"],              ["Warm cap and scarf or neck warmer", "1 each", "Choose a cap that covers your ears"],              ["Warm sleepwear", "1 to 2 sets", "Room heating varies from hotel to hotel"],            ]}          />
          <p>
            The <GuideLink href="/features/trip-packing-planner">trip packing planner</GuideLink> can turn this list into an outfit for each day of your trip. Heading somewhere warmer? See the <GuideLink href="/guides/goa-packing-list">Goa packing list</GuideLink> or the <GuideLink href="/guides/kerala-packing-list">Kerala packing list</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "shoes",
      title: "What shoes do I need for snow and ice?",
      body: (
        <>
          <p>
            Pack one pair of waterproof boots with a deep, grippy sole and good ankle support. Roads and paths can be icy,
            especially in the early morning, so walk slowly where the ground looks shiny or wet. Flat-soled sneakers and
            canvas shoes get soaked in snow and slip on ice.
          </p>
          <p>Bring a second pair of shoes so one can dry overnight, and a couple of plastic bags to keep wet shoes away from your clothes.</p>
        </>
      ),
    },
    {
      id: "snow-day",
      title: "What should I wear for a day in the snow?",
      body: (
        <>
          <p>
            Snow play gets you wet quickly, and wet clothes make you cold fast. Wear your thermal base layer, a warm middle
            layer and a waterproof outer layer, with waterproof gloves and boots. Jeans and cotton trousers soak through,
            so wear waterproof or fleece-lined trousers, or rent a snow suit for the day.
          </p>
          <ul>
            <li>Keep a dry set of socks, gloves and a top in the car for the ride back.</li>
            <li>Wear sunglasses: sunlight reflected off snow is strong enough to hurt your eyes.</li>
            <li>Dress children in one more layer than you think they need, and check their gloves and socks often.</li>
          </ul>
        </>
      ),
    },
    {
      id: "rent",
      title: "Can I rent snow clothes there?",
      body: (
        <p>
          Yes. Near snow points like Solang Valley and Kufri, shops usually rent snow suits, gumboots and gloves for the
          day. They are handy for snow play and save space in your bag. Check the size and condition before you pay, and
          keep your own thermal and warm layers on underneath.
        </p>
      ),
    },
    {
      id: "extras",
      title: "What else should I pack for the cold?",
      body: (
        <Checklist
          title="Cold-weather extras"
          items={[
            "Sunscreen and sunglasses: snow reflects strong sunlight at altitude",
            "Lip balm and a rich moisturiser for the dry, cold air",
            "A small backpack for your spare socks, gloves and water",
            "A power bank, because phone batteries drain faster in the cold",
            "A reusable bottle; you still need water when you don’t feel thirsty",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "create the trip, plan an outfit for each day, see the weather where you are going, and share the plan as a PDF with whoever you travel with." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "winter clothes spend most of the year packed away; note which box, loft or suitcase they are in, so you find them in minutes." },
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "see all your sweaters, jackets and thermals in one place before you pack." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for travel looks; its ideas consider your style and the weather." },
  ],
};

export default body;
