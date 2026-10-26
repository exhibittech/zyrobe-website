import type { PageEntry } from "./types";

export type GuideCategory = "Occasions" | "Seasons" | "Travel" | "Wardrobe basics";

export type GuideEntry = PageEntry & {
  category: GuideCategory;
  /** The direct answer: the guide's first paragraph, plain text (also used by llms.txt and search snippets). */
  answer: string;
  /** Places the guide is about (structured data). */
  places?: string[];
  /** Garment cut-outs (public/media/garments) shown in the header art. */
  garments: string[];
  related: string[];
};

export const GUIDE_CATEGORIES: GuideCategory[] = ["Occasions", "Seasons", "Travel", "Wardrobe basics"];

/** Guides, served at /guides/<slug>. Bodies live in src/app/guides/_content/<slug>.tsx. */
export const GUIDES: GuideEntry[] = [
  {
    slug: "indian-wedding-guest-outfits",
    title: "What to wear to an Indian wedding: outfits for each function",
    description:
      "What to wear to an Indian wedding as a guest: outfit ideas for the haldi, mehendi, sangeet, ceremony and reception, for men and women, with colours to avoid.",
    updated: "2026-10-26",
    category: "Occasions",
    answer:
      "For an Indian wedding, dress for each function, not just the wedding day. Wear light, washable clothes in yellow or other bright colours for the haldi, comfortable colourful outfits for the mehendi, something dressy you can dance in for the sangeet, your most traditional festive outfit for the wedding ceremony, and an evening look for the reception. In most families, avoid bridal red and all-white or all-black outfits unless the hosts ask for them, and check the invite for a dress code or colour theme.",
    places: ["India"],
    garments: ["c13", "c22", "c11"],
    related: ["diwali-festive-outfit-planning", "organise-your-wardrobe", "goa-packing-list"],
  },
  {
    slug: "diwali-festive-outfit-planning",
    title: "Diwali outfit ideas: plan an outfit for every festive day",
    description:
      "Diwali outfit ideas and a simple plan for the five days of the festival: one outfit per event, festive pieces that mix and match, and what is safe near diyas.",
    updated: "2026-10-26",
    category: "Occasions",
    answer:
      "For Diwali, give each day its own outfit: smart, comfortable ethnic wear for Dhanteras shopping, something easy and washable for Choti Diwali, your best or new festive outfit for the Lakshmi Puja, and comfortable festive wear for Bhai Dooj visits. List every event first, build several looks from a few festive pieces by changing the dupatta, jacket or accessories, check the fit and ironing two weeks ahead, and wear cotton or other natural fabrics near diyas and crackers, because synthetics can melt.",
    places: ["India"],
    garments: ["c13", "c09", "c22"],
    related: ["indian-wedding-guest-outfits", "organise-your-wardrobe", "office-wear-indian-summer"],
  },
  {
    slug: "monsoon-wardrobe-guide",
    title: "What to wear in the monsoon: a wardrobe guide for India",
    description:
      "What to wear in the Indian monsoon: quick-drying fabrics, dark colours, waterproof shoes and drying tips, with notes for Mumbai, Delhi, Chennai and Kolkata.",
    updated: "2026-10-26",
    category: "Seasons",
    answer:
      "In the Indian monsoon, wear light, quick-drying fabrics such as polyester or nylon blends and thin cotton, choose darker colours that hide splashes, and skip heavy denim, silk, suede and leather. Waterproof sandals or rubber shoes work better than canvas or leather. At home, dry clothes with moving air, never fold anything damp, and keep cupboards dry with moisture absorbers so clothes don’t smell musty.",
    places: ["Mumbai", "Pune", "Delhi", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Kerala", "India"],
    garments: ["c00", "c18", "c02"],
    related: ["kerala-packing-list", "organise-your-wardrobe", "office-wear-indian-summer"],
  },
  {
    slug: "office-wear-indian-summer",
    title: "Summer office wear in India: a 15-piece capsule wardrobe",
    description:
      "Summer office wear for hot Indian cities like Delhi, Mumbai, Chennai and Bengaluru: a 15-piece capsule of breathable clothes in light colours, plus an AC layer.",
    updated: "2026-10-26",
    category: "Seasons",
    answer:
      "For summer office wear in India, build a small capsule of fifteen breathable cotton and linen pieces in light colours: six tops, four bottoms, two light layers for the air-conditioned office and three pairs of shoes. Choose loose, comfortable fits and pieces that all go together: six tops and four bottoms alone make 24 different outfits.",
    places: ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Hyderabad", "Pune", "Kolkata", "India"],
    garments: ["c09", "c22", "c05"],
    related: ["organise-your-wardrobe", "monsoon-wardrobe-guide", "dubai-packing-list"],
  },
  {
    slug: "goa-packing-list",
    title: "Goa packing list: what to pack for every season",
    description:
      "Goa packing list for every season: what to pack for November to February, the hot months and the monsoon, with beachwear, cover-ups, footwear and rain gear.",
    updated: "2026-10-26",
    category: "Travel",
    answer:
      "For Goa, pack light cotton and linen clothes, swimwear, a cover-up, sunglasses, a hat and sunscreen, flip-flops plus one pair of comfortable walking sandals, and one smarter outfit for the evening. From November to February add a light layer for cooler nights. From June to September, during the monsoon, pack a rain jacket, quick-drying clothes and waterproof sandals. Keep swimwear for the beach, and cover shoulders and knees in churches and temples.",
    places: ["Goa", "India"],
    garments: ["c12", "c16", "c04"],
    related: ["kerala-packing-list", "dubai-packing-list", "monsoon-wardrobe-guide"],
  },
  {
    slug: "manali-shimla-winter-packing-list",
    title: "Manali and Shimla winter packing list: what to wear in snow",
    description:
      "Manali and Shimla winter packing list: dress in layers with thermals, an insulated jacket, grippy waterproof boots, gloves and a cap, and what to rent for snow.",
    updated: "2026-10-26",
    category: "Travel",
    answer:
      "For Manali and Shimla in winter, dress in three layers: a thermal base layer, a fleece or wool sweater, and a warm, water-resistant insulated jacket. Add woollen socks, waterproof boots with a good grip, gloves, a warm cap and a scarf. Nights can drop below freezing, especially in Manali, and snow is likely in December, January and February. Snow suits and boots can usually be rented near snow points like Solang.",
    places: ["Manali", "Shimla", "Himachal Pradesh", "India"],
    garments: ["c08", "c11", "c14"],
    related: ["goa-packing-list", "paris-packing-list", "organise-your-wardrobe"],
  },
  {
    slug: "kerala-packing-list",
    title: "Kerala packing list: what to pack for backwaters and hills",
    description:
      "Kerala packing list: breathable clothes for the humid coast, a warm layer for Munnar and Wayanad, rain gear for the two monsoons, and what to wear to temples.",
    updated: "2026-10-26",
    category: "Travel",
    answer:
      "For Kerala, pack breathable cotton and linen for the hot, humid coast and backwaters, plus a light sweater or jacket for the hill stations like Munnar and Wayanad, where evenings are cooler. Kerala has two rainy seasons, roughly June to September and October to November, so pack an umbrella or rain jacket and quick-drying clothes then. Bring modest, traditional clothes for temple visits, because some temples have strict dress codes.",
    places: ["Kerala", "Munnar", "Alappuzha", "Wayanad", "India"],
    garments: ["c00", "c20", "c05"],
    related: ["goa-packing-list", "monsoon-wardrobe-guide", "manali-shimla-winter-packing-list"],
  },
  {
    slug: "paris-packing-list",
    title: "Paris packing list: what to pack, season by season",
    description:
      "Paris packing list for winter, spring, summer and autumn: layers, a rain jacket, comfortable shoes and smart-casual outfits, with tips for Indian travellers.",
    updated: "2026-10-26",
    category: "Travel",
    answer:
      "For Paris, pack layers in neutral colours, a light rain jacket or a small umbrella, and comfortable shoes you can walk in all day on cobblestones. In winter (December to February) add a warm coat, a thermal layer, a scarf and gloves. In summer (June to August) pack breathable clothes, with a light layer for the evening. Smart-casual outfits work almost everywhere, from cafés to museums.",
    places: ["Paris", "France"],
    garments: ["c06", "c18", "c01"],
    related: ["dubai-packing-list", "manali-shimla-winter-packing-list", "organise-your-wardrobe"],
  },
  {
    slug: "dubai-packing-list",
    title: "Dubai packing list: what to wear, for travellers from India",
    description:
      "Dubai packing list: light, breathable clothes for summer and winter, modest outfits for malls and mosques, a layer for the AC, and desert safari tips.",
    updated: "2026-10-26",
    category: "Travel",
    answer:
      "For Dubai, pack light, breathable clothes that cover your shoulders and knees, because modest dress is expected in malls, souks and other public places. Add a light layer for the strong air conditioning indoors, sunglasses and a hat, and comfortable sandals or sneakers. Summers (June to September) are extremely hot and humid. Winters (December to February) are warm by day and cool in the evening, so add a jacket then, especially for a desert safari. Wear swimwear only at the beach or the pool.",
    places: ["Dubai", "United Arab Emirates"],
    garments: ["c09", "c22", "c00"],
    related: ["paris-packing-list", "goa-packing-list", "office-wear-indian-summer"],
  },
  {
    slug: "organise-your-wardrobe",
    title: "How to organise your wardrobe: a step-by-step guide",
    description:
      "How to organise your wardrobe: sort what you own, group it by type, store off-season clothes, note where everything is kept, and a five-minute weekly reset.",
    updated: "2026-10-26",
    category: "Wardrobe basics",
    answer:
      "To organise your wardrobe, take everything out, keep only what fits and you actually wear, then group the rest by type: tops, bottoms, dresses, footwear and accessories. Hang shirts and anything that creases, fold knits, and pack away off-season clothes. Then note where every item lives, and spend five minutes a week putting things back, so it stays organised.",
    places: ["India"],
    garments: ["c04", "c17", "c06"],
    related: ["monsoon-wardrobe-guide", "office-wear-indian-summer", "diwali-festive-outfit-planning"],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
