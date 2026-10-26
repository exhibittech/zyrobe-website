import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "five-days",
      title: "What are the five days of Diwali, and what do people wear?",
      body: (
        <>
          <p>
            Diwali falls in October or November and, in much of India, is celebrated over five days. Customs vary by
            region and family, but this is the common pattern:
          </p>
          <GuideTable
            head={["Day", "What happens", "What to wear"]}
            rows={[
              ["Dhanteras", "Shopping and small pujas at home or at work", "Smart, comfortable ethnic wear you can walk and shop in"],
              ["Choti Diwali", "Cleaning, rangoli and early celebrations", "Something easy and washable; you will be busy"],
              ["Diwali (Lakshmi Puja)", "The main puja, diyas, family and sweets", "Your best or new festive outfit; many families wear new clothes on this day"],
              ["Govardhan Puja", "Annakut, and the new year in some regions", "Festive, but lighter than the main day"],
              ["Bhai Dooj", "Brothers and sisters visit each other", "Comfortable festive wear for a long day of visits"],
            ]}
          />
          <p>
            Around Diwali there are usually more events too: office parties, card parties, family dinners and visits to
            friends. That is why planning ahead helps more than buying more.
          </p>
        </>
      ),
    },
    {
      id: "plan",
      title: "How do I plan outfits for the whole festive season?",
      body: (
        <>
          <p>Use the same four steps every year:</p>
          <ul>
            <li><strong>List every event</strong> with its date, the place and who will be there. An office party and a puja at home need very different outfits.</li>
            <li><strong>Sort them by how dressy they are:</strong> big (the main puja, a wedding or a party), medium (family dinners, visits) and simple (shopping, cleaning, travel).</li>
            <li><strong>Give each event one outfit</strong> from what you already own. Only then make a short list of what is missing.</li>
            <li><strong>Check fit, tailoring and ironing early.</strong> Tailors and dry cleaners are very busy before Diwali, so try everything on two to three weeks ahead.</li>
          </ul>
          <Tip>
            <p>Plan the shoes, jewellery and dupatta or jacket with each outfit. Searching for the right earrings or the matching mojaris is what usually makes people late.</p>
          </Tip>
          <p>
            Build each look in the <GuideLink href="/features/outfit-maker">outfit maker</GuideLink> so you can see it before the day, and put the plan on your calendar with the <GuideLink href="/features/outfit-planner">outfit planner</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "mix-and-match",
      title: "How do I make a few festive pieces go further?",
      body: (
        <>
          <p>
            A few versatile pieces can cover the whole season. Three kurtas, two bottoms and two dupattas or jackets give
            you many different combinations. Plain pieces in rich colours mix more easily than heavily printed ones, and
            one statement piece, like an embroidered jacket or a heavy dupatta, can make a simple outfit look new.
          </p>
          <ul>
            <li>Wear a silk kurta with a churidar for the puja, then with straight trousers and a jacket for the office party.</li>
            <li>Pair one saree with two different blouses, or wear the blouse with a lehenga skirt.</li>
            <li>Keep one neutral Nehru jacket that goes over every kurta you own.</li>
          </ul>
        </>
      ),
    },
    {
      id: "safety",
      title: "What is safe to wear around diyas and crackers?",
      body: (
        <>
          <p>
            Choose cotton, linen or silk when you are near flames. Synthetic fabrics such as polyester, nylon and some
            nets can melt and stick to the skin if they catch fire, while natural fibres do not melt. This matters most
            for loose dupattas, flared sleeves and long hems.
          </p>
          <Checklist
            title="Around diyas and crackers"
            items={[
              "Wear a fitted cotton outfit if you will be bursting crackers",
              "Pin or tie back long dupattas, pallus and loose sleeves",
              "Keep long hems away from diyas placed on the floor and on rangoli",
              "Wear closed shoes, not bare feet or open slippers, near crackers",
              "Keep heavy or expensive outfits for indoor events",
            ]}
          />
        </>
      ),
    },
    {
      id: "other-festivals",
      title: "What about Navratri, Durga Puja and other festivals?",
      body: (
        <>
          <p>
            The same planning works for every festival. For Navratri garba and dandiya, choose dance-friendly outfits such
            as a chaniya choli or a kediyu with comfortable flat footwear, and check whether your group follows a
            different colour for each of the nine days. For Durga Puja, many people plan a new outfit for each of the main
            days, from simple cotton for pandal hopping in the heat and crowds to a traditional saree or dhoti and panjabi
            for the big day.
          </p>
          <p>
            Whatever the festival, the first step is the same: write down the events, then decide outfits, then shop
            for anything missing.
          </p>
          <p>
            Wedding season often follows Diwali. For the haldi, mehendi, sangeet, ceremony and reception, see <GuideLink href="/guides/indian-wedding-guest-outfits">what to wear to an Indian wedding</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "checklist",
      title: "What should I do two weeks before Diwali?",
      body: (
        <Checklist
          title="Two weeks before"
          items={[
            "Try on every festive outfit with its shoes",
            "Send anything for alteration or dry cleaning",
            "Air out clothes that were stored with naphthalene or camphor",
            "Match jewellery, dupattas and jackets to each outfit",
            "Note which outfit is for which day, so the family can plan too",
          ]}
        />
      ),
    },
  ],
  helps: [
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "add your festive clothes from a photo, so every kurta, saree and jacket is in one place." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "build and save one look for each event, including the shoes and accessories." },
    { href: "/features/outfit-planner", label: "Outfit planner", text: "put the five days of Diwali on your calendar with an outfit for each." },
    { href: "/features/ai-stylist", label: "AI stylist", text: "ask for a look for a custom occasion, like a Diwali card party; its ideas use your own clothes, your style and the weather." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note which trunk, cupboard or suitcase holds the festive clothes you only wear once a year." },
  ],
};

export default body;
