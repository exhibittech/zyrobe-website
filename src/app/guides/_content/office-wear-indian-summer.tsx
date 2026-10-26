import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "principles",
      title: "What should I wear to office in the Indian summer?",
      body: (
        <>
          <p>Three things matter most: breathable fabric, a loose fit and light colours. The heat is not the same everywhere, though:</p>
          <ul>
            <li><strong>Delhi and much of North India:</strong> April to June is very hot and dry, and the commute is the hardest part of the day. Loose fits and light colours help most.</li>
            <li><strong>Chennai and the coasts:</strong> hot and humid for much of the year. Sweat is the main problem, so choose fabrics that breathe and dry well.</li>
            <li><strong>Bengaluru:</strong> milder, warmest from March to May, with cooler evenings. A light layer is often enough to stay comfortable all day.</li>
          </ul>
        </>
      ),
    },
    {
      id: "fabrics",
      title: "Which fabrics keep you cool at work?",
      body: (
        <>
          <p>
            Natural, breathable fabrics are best in dry heat. Cotton, linen and cotton-linen blends let air through and
            absorb sweat. Khadi, seersucker, chambray and cotton poplin are all good office choices. Polyester-heavy shirts
            and trousers trap heat and can feel sticky by the afternoon.
          </p>
          <Tip>
            <p>Linen creases. If your office is formal, a cotton-linen blend gives you most of the coolness with fewer wrinkles.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "capsule",
      title: "What goes in a 15-piece summer office capsule?",
      body: (
        <>
          <p>
            A capsule is a small set of clothes that all go together. Keep the colours simple, light neutrals and soft
            pastels, so any top works with any bottom. Six tops and four bottoms make 24 different outfits before you
            even count the layers.
          </p>
          <GuideTable
            head={["Piece", "How many", "Ideas"]}
            rows={[
              ["Tops", "6", "Two white or light blue cotton shirts, one linen shirt, one pastel shirt, and two cotton polos or kurtas"],
              ["Bottoms", "4", "Beige chinos, grey and navy trousers, and one pair of palazzos, straight pants or a cotton skirt"],
              ["Layers", "2", "An unstructured cotton or linen blazer, and a light cardigan, overshirt or cotton stole"],
              ["Shoes", "3", "Loafers or formal flats, light sneakers for casual days, and comfortable closed shoes for long walks"],
            ]}
          />
          <p>
            Most of these you probably own already. Start with what you have, wear the capsule for two weeks, and only then
            fill a real gap.
          </p>
        </>
      ),
    },
    {
      id: "colours",
      title: "Which colours work best in the heat?",
      body: (
        <p>
          Light colours, like white, sky blue, beige and pastels, reflect sunlight, so they feel cooler outdoors than
          dark colours. Some light colours, especially grey and light blue, show sweat marks more than others. White,
          small checks and prints hide them better. Keep dark, heavy colours for evenings and air-conditioned days.
        </p>
      ),
    },
    {
      id: "commute",
      title: "How do I stay fresh from the commute to the evening?",
      body: (
        <ul>
          <li>Wear a thin cotton vest or slip under your top; it absorbs sweat before it shows.</li>
          <li>Leave your blazer or layer at the office instead of wearing it on the commute.</li>
          <li>On the hottest days, keep a spare shirt or top at your desk.</li>
          <li>Choose a relaxed fit. Tight clothes trap heat and show sweat sooner.</li>
          <li>Carry a handkerchief and water, and walk in the shade when you can.</li>
        </ul>
      ),
    },
    {
      id: "ac",
      title: "How do I dress for a cold, air-conditioned office?",
      body: (
        <p>
          Many offices keep the air conditioning low, so you go from 40°C outside to a chilly meeting room. Keep one
          light layer at your desk: a cardigan, an unstructured blazer, an overshirt or a cotton stole. It also makes a
          simple outfit look smarter for meetings.
        </p>
      ),
    },
    {
      id: "ethnic",
      title: "Can I wear ethnic wear to the office in summer?",
      body: (
        <>
          <p>
            In many Indian offices, yes, and it is often the coolest option. A cotton or linen kurta with straight trousers
            or a churidar breathes better than a fitted shirt. Add a light Nehru jacket for meetings.
          </p>
          <ul>
            <li>Choose solid colours or small prints; they look sharper than big, busy prints.</li>
            <li>Cotton kurtas with palazzos or straight pants mix easily with the rest of the capsule.</li>
            <li>Keep heavily embroidered or festive pieces for festivals and office celebrations.</li>
          </ul>
        </>
      ),
    },
    {
      id: "routine",
      title: "How do I plan the week so mornings are easy?",
      body: (
        <Checklist
          title="Sunday-evening routine"
          items={[
            "Check the week’s weather and your meetings",
            "Pick an outfit for each day, including shoes",
            "Iron or steam everything for the first three days",
            "Put your layer and a spare top in your office bag",
            "Move anything that needs washing or repair to one side",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "see every shirt, trouser and layer you own by type and colour, so building the capsule takes minutes." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "combine your capsule pieces into looks and save the ones you like." },
    { href: "/features/outfit-planner", label: "Outfit planner", text: "get outfit ideas from your own clothes and put the whole week on your calendar." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask what to wear to the office; its ideas consider your style and the weather." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note where your winter blazers and sweaters are packed away for the summer." },
  ],
};

export default body;
