import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "each-function",
      title: "What should I wear to each wedding function?",
      body: (
        <>
          <p>
            An Indian wedding is usually a series of events over two to five days, and each one has its own mood. A
            simple rule: the earlier in the day and the closer to home, the lighter and simpler the outfit. The wedding
            ceremony is the most traditional, and the reception is the most like a formal evening party.
          </p>
          <GuideTable
            caption="A quick plan for the main functions (customs differ between families and regions)"
            head={["Function", "Mood", "Women", "Men"]}
            rows={[
              ["Haldi", "Daytime, at home, messy with turmeric paste", "A cotton kurta set or a simple saree in yellow or another bright shade, nothing you mind staining", "A light cotton kurta in yellow or another bright shade, with pyjama or churidar"],
              ["Mehendi", "Relaxed, colourful, a lot of sitting", "A sharara, anarkali or light lehenga; short or elbow sleeves so fresh mehendi doesn’t smudge", "A printed or pastel kurta, on its own or with a light jacket"],
              ["Sangeet", "Evening, music and dancing", "A lehenga, a party saree or an Indo-western outfit you can dance in", "A kurta with a Nehru jacket, a bandhgala or an Indo-western jacket"],
              ["Wedding", "The most traditional, often long", "A silk saree, a lehenga or an anarkali in rich colours", "A sherwani or a dressy kurta set with a jacket; in many South Indian weddings, a veshti or mundu with a shirt"],
              ["Reception", "An evening party", "A saree, a gown or a dressy Indo-western look", "A suit, a bandhgala or a tuxedo"],
            ]}
          />
          <p>
            You don’t need a new outfit for every event. Most guests plan two or three strong looks and keep the rest
            simple. If you are close family, you may be asked to follow a colour theme for some functions, so ask early.
          </p>
        </>
      ),
    },
    {
      id: "colours",
      title: "Which colours should a wedding guest avoid?",
      body: (
        <>
          <p>
            In many North Indian families, red is the bride’s colour, so guests usually avoid a full red outfit at the
            wedding ceremony. All-white and all-black outfits are also avoided at many Hindu weddings, because these
            colours are linked with mourning in some communities.
          </p>
          <p>
            These rules are not the same everywhere. White and cream are traditional at many Kerala and Christian weddings,
            and many brides in the south wear colours other than red. The safest plan is to read the invite, look for a
            colour theme or dress code, and ask the family if you are unsure. Bright, festive colours are almost always a
            good choice.
          </p>
        </>
      ),
    },
    {
      id: "men",
      title: "What should men wear to an Indian wedding?",
      body: (
        <>
          <p>
            A well-fitted kurta is the most useful piece a male guest can own. Wear it with a churidar or straight pyjama
            for the day events, and add a Nehru jacket in the evening. A bandhgala works for the sangeet and the
            reception. A full sherwani is usually worn by the groom and close family, so as a guest, a lighter sherwani or
            a kurta with a jacket is a safe level of dressy.
          </p>
          <ul>
            <li><strong>Day events:</strong> cotton or linen kurtas in light, bright colours.</li>
            <li><strong>Evening events:</strong> silk or silk-blend kurtas, a Nehru jacket, a bandhgala or a suit.</li>
            <li><strong>Footwear:</strong> mojaris or juttis with ethnic wear, loafers or formal shoes with a suit. Pick shoes that are easy to take off.</li>
          </ul>
        </>
      ),
    },
    {
      id: "women",
      title: "What should women wear to an Indian wedding?",
      body: (
        <>
          <p>
            Sarees, lehengas, anarkalis, shararas and Indo-western sets all work. Think about comfort as well as looks:
            wedding days are long, and a heavy lehenga can be tiring by the end of the night. Save the heaviest outfit for
            the event that matters most to you, and choose lighter fabrics for the day functions.
          </p>
          <ul>
            <li><strong>Sarees:</strong> allow time for draping, and carry safety pins.</li>
            <li><strong>Lehengas:</strong> try them on with the shoes you will wear, so the length is right.</li>
            <li><strong>Footwear:</strong> block heels, wedges or embellished flats are easier than thin heels on grass, stairs and long standing.</li>
          </ul>
        </>
      ),
    },
    {
      id: "venue-rules",
      title: "Are there dress rules at the wedding venue?",
      body: (
        <>
          <p>Places of worship have their own rules, and they apply to guests too.</p>
          <ul>
            <li><strong>Gurdwara (Sikh Anand Karaj):</strong> everyone covers their head, shoes are removed, and guests usually sit on the floor, so wear something modest that is easy to sit in. Carry a scarf or dupatta.</li>
            <li><strong>Temples:</strong> shoes come off at the entrance, so choose footwear you can remove quickly.</li>
            <li><strong>Churches:</strong> covered shoulders are a respectful choice for the ceremony.</li>
            <li><strong>Nikah ceremonies:</strong> modest clothes are expected; women may be asked to cover their heads.</li>
          </ul>
        </>
      ),
    },
    {
      id: "weather",
      title: "How do I dress for the weather and the season?",
      body: (
        <>
          <p>
            The main wedding season in much of India runs through the cooler months, roughly November to February. In
            North India, evenings can get cold then, so plan a warm layer that suits your outfit: a shawl or stole, a
            velvet jacket, or a long coat over a saree. For summer weddings, and in the humid south and on the coasts,
            choose breathable fabrics such as cotton silk, chanderi, linen blends and light georgette.
          </p>
          <Tip>
            <p>For outdoor day functions, keep sunglasses and a small umbrella in the car. Many venues are open lawns with little shade.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "repeat",
      title: "How can I repeat outfits across functions?",
      body: (
        <>
          <p>
            Mixing pieces is the easiest way to look different at every event without buying more. Wear a lehenga skirt
            with two different blouses or dupattas. Pair one saree with a different blouse and jewellery. Wear one Nehru
            jacket over two different kurtas, or one kurta under two different jackets. Changing shoes and accessories
            also changes the whole look.
          </p>
          <Checklist
            title="Wedding bag checklist"
            items={[
              "Safety pins, dupatta pins and a small sewing kit",
              "A spare pair of comfortable flats or sandals",
              "A shawl or stole for cold evenings",
              "Tissues and stain wipes (turmeric and food stains happen)",
              "A scarf or handkerchief to cover your head at a gurdwara or temple",
              "Your gift or envelope, ready the night before",
            ]}
          />
        </>
      ),
    },
  ],
  helps: [
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "photograph each festive outfit once; Zyrobe removes the background and notes the type and colour, so you can see every option side by side." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "put pieces together into one look per function and save them." },
    { href: "/features/outfit-planner", label: "Outfit planner", text: "put each function’s outfit on your calendar, so everything is decided before you pack." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note where heavy outfits are kept, like a suitcase on the loft or a cupboard at your parents’ home." },
    { href: "/features/ai-virtual-try-on", label: "AI virtual try-on", text: "add a photo of yourself and see a top, a bottom or both on you before you decide." },
    { href: "/features/trip-packing-planner", label: "Trip packing planner", text: "for a destination wedding, plan an outfit for each day, see the weather there, and share the plan as a PDF." },
  ],
};

export default body;
