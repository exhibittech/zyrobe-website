import type { Faq } from "@/components/closing/faq";
import type { PageEntry } from "./types";

// Facts only from the app (../wordrobe/lib), the backend, the Play listing and the privacy policy.

export type FeatureSlug =
  | "digital-wardrobe"
  | "clothes-storage-tracker"
  | "outfit-maker"
  | "ai-virtual-try-on"
  | "ai-stylist"
  | "outfit-planner"
  | "trip-packing-planner";

/**
 * Credits each AI action uses: the backend defaults (zyrobe-backend app/services/credit_service.py,
 * DEFAULT_AI_CREDIT_COSTS). If the AI fails, the credits go back.
 */
export const CREDIT_COSTS = { addItem: 1, tryOn: 2, stylist: 2, weekPlan: 2, tripPlan: 2 } as const;

export const CREDIT_TABLE: { action: string; credits: number; feature: FeatureSlug }[] = [
  { action: "Add a piece of clothing from a photo", credits: CREDIT_COSTS.addItem, feature: "digital-wardrobe" },
  { action: "One AI virtual try-on", credits: CREDIT_COSTS.tryOn, feature: "ai-virtual-try-on" },
  { action: "One look from the AI stylist", credits: CREDIT_COSTS.stylist, feature: "ai-stylist" },
  { action: "One AI plan for your week", credits: CREDIT_COSTS.weekPlan, feature: "outfit-planner" },
  { action: "One AI outfit suggestion for a trip", credits: CREDIT_COSTS.tripPlan, feature: "trip-packing-planner" },
];

/** A block of the page body. The heading is a question or a task; the first paragraph answers it. */
export type FeatureSection = {
  id: string;
  heading: string;
  paras?: string[];
  list?: string[];
  steps?: string[];
  table?: { head: [string, string]; rows: [string, string][] };
};

export type FeatureShot = { src: string; alt: string; caption: string };

export type Feature = {
  slug: FeatureSlug;
  /** Short name for cards, breadcrumbs and links. */
  name: string;
  /** H1 and page title, written the way people search. */
  title: string;
  /** Meta description and card summary. */
  description: string;
  /** The page's opening answer. */
  lead: string;
  sections: FeatureSection[];
  credits: { paras: string[]; rows: [string, string][] };
  shots: FeatureShot[];
  faqs: Faq[];
  related: FeatureSlug[];
};

export const FEATURES_UPDATED = "2026-10-26";

export const FEATURES: Feature[] = [
  {
    slug: "digital-wardrobe",
    name: "Digital wardrobe",
    title: "Digital wardrobe app: all your clothes in one place",
    description:
      "Take a photo of a piece of clothing and Zyrobe removes the background, notes the type and colour, and adds it to your digital wardrobe. Search and filter everything you own.",
    lead:
      "Zyrobe turns photos of your clothes into a tidy digital wardrobe on your phone. Take a photo, and the app removes the background, notes the type and colour, and files the item for you.",
    sections: [
      {
        id: "what-is-it",
        heading: "What is a digital wardrobe?",
        paras: [
          "A digital wardrobe is a list of the clothes you own, with a photo of each one, kept on your phone. In Zyrobe every item has a clean photo and details such as its type, colour, style, material and season.",
          "Once your clothes are in, you can search them, build outfits with them, try them on with AI and plan what to wear.",
        ],
        list: [
          "Add clothes quickly: take a photo and Zyrobe removes the background and notes the type and colour.",
          "Get a clean product photo of any item, made with AI.",
          "Filter your wardrobe by Tops, Bottoms, Footwear and Accessories, or search it.",
          "See how many clothing items and accessories you have on the home screen.",
        ],
      },
      {
        id: "how-to-add-clothes",
        heading: "How do I add clothes to Zyrobe?",
        paras: ["Tap Add Item, take or choose a photo, and check the details the AI fills in."],
        steps: [
          "Tap Add Item on the home screen.",
          "Take a photo of the piece, or choose one from your phone. Crop it if you need to.",
          "Zyrobe analyses the photo in the background, so you can add more photos while you wait.",
          "Open the item when it is ready for review. The AI has filled in the details, such as the name, type and colour.",
          "Change anything you like, then save. The item appears in your wardrobe.",
        ],
      },
      {
        id: "item-details",
        heading: "What details does Zyrobe note for each item?",
        paras: ["Zyrobe reads the type and colour from the photo and fills in the rest of the details it can see. You can edit every field."],
        list: [
          "Item name and type",
          "Colour, with swatches you can tap to change",
          "Brand, style and material",
          "Season, such as all season",
          "Where the item is kept (see the storage tracker)",
        ],
      },
    ],
    credits: {
      paras: [
        `Adding a piece of clothing from a photo uses ${CREDIT_COSTS.addItem} credit. If the AI analysis fails, the credit goes back to you. Product photos made with AI also use credits.`,
        "Browsing, searching and editing your wardrobe is free.",
      ],
      rows: [
        ["Add an item from a photo", `${CREDIT_COSTS.addItem} credit`],
        ["Search, filter and edit items", "Free"],
      ],
    },
    shots: [
      { src: "/media/screens/02_wardrobe.webp", alt: "Zyrobe Wardrobe tab with T-shirts, jackets and jeans on clean backgrounds, filtered by type", caption: "Your wardrobe, sorted by type" },
      { src: "/media/screens/01_home.webp", alt: "Zyrobe home screen with Add Item, Plan Outfit, Try-On and Briefcase shortcuts", caption: "Add an item from the home screen" },
    ],
    faqs: [
      {
        q: "How many credits does it cost to add a piece of clothing?",
        a: `Adding an item from a photo uses ${CREDIT_COSTS.addItem} credit. If the AI analysis fails, the credit goes back to you.`,
      },
      {
        q: "Can I fix a detail the AI got wrong?",
        a: "Yes. Open the item and tap any field to change it. You can also tap a colour swatch to pick a different colour.",
      },
      {
        q: "Does Zyrobe look through my photo gallery?",
        a: "No. Zyrobe reads only the photos you choose or take with the camera. It never reads your gallery in the background.",
      },
      {
        q: "Are my clothing photos used to train AI?",
        a: "No. Your photos are used only to give you the features you ask for. They are never shown to other users, never sold and never used for advertising.",
        link: { href: "/privacy", label: "Read the privacy policy" },
      },
      {
        q: "How is my wardrobe sorted?",
        a: "By type: Tops, Bottoms, Footwear and Accessories. You can also search your wardrobe.",
      },
    ],
    related: ["clothes-storage-tracker", "outfit-maker", "ai-stylist"],
  },
  {
    slug: "clothes-storage-tracker",
    name: "Storage tracker",
    title: "Clothes storage tracker: know where every item is kept",
    description:
      "Note where each piece of clothing is kept, like a cupboard, a drawer or a suitcase. Zyrobe's storage tracker shows what is in each place, so you find things fast.",
    lead:
      "Zyrobe remembers where each piece of clothing is kept, like a cupboard, a drawer or a suitcase. Open a place to see what is in it, or open an item to see where it is.",
    sections: [
      {
        id: "what-is-it",
        heading: "What is the storage tracker?",
        paras: [
          "The storage tracker is the Storage tab in your Zyrobe wardrobe. It lists the places where you keep clothes. Each place has a name and a photo, and shows the items stored there.",
          "Each item's details also show where it is kept, so you know where to look before you open a single drawer.",
        ],
        list: ["Bedroom wardrobe", "Shirt drawer", "Travel bag", "Walk-in closet"],
      },
      {
        id: "how-to-use",
        heading: "How do I note where my clothes are kept?",
        paras: ["Add a storage place, then pick the items you keep there."],
        steps: [
          "Open Wardrobe and switch to the Storage tab.",
          "Tap + to add a place. Give it a name, such as Bedroom Wardrobe or Travel Bag, and take a photo of it.",
          "Open the place and tap the items you keep there. Filter by Tops, Bottoms, Footwear or Accessories to find them faster.",
          "Tap Save Changes.",
        ],
      },
    ],
    credits: {
      paras: ["The storage tracker does not use credits. Adding places and moving items between them is free."],
      rows: [["Add storage places and items", "Free"]],
    },
    shots: [
      { src: "/media/feat/st_grid.webp", alt: "Zyrobe Storage tab with a bedroom wardrobe, a travel bag, a shirt drawer and a walk-in closet", caption: "Every place you keep clothes" },
      { src: "/media/feat/st_detail_0.webp", alt: "Storage details screen for a bedroom wardrobe, with shirts and jeans to select", caption: "Pick the items kept in each place" },
    ],
    faqs: [
      { q: "Does the storage tracker use credits?", a: "No. Adding storage places and the items in them is free." },
      {
        q: "How do I see where an item is kept?",
        a: "Open the item in your wardrobe. Its details show the storage place it is in.",
      },
      {
        q: "What can I use as a storage place?",
        a: "Any place you keep clothes: a cupboard, a drawer, a shelf, a suitcase or a travel bag. Give it a name and a photo so you recognise it.",
      },
      {
        q: "Can I delete a storage place?",
        a: "Yes. Open the place and tap the delete icon. This cannot be undone.",
      },
    ],
    related: ["digital-wardrobe", "trip-packing-planner", "outfit-maker"],
  },
  {
    slug: "outfit-maker",
    name: "Outfit maker",
    title: "Outfit maker: build outfits from the clothes you own",
    description:
      "Put outfits together on a canvas with the clothes in your Zyrobe wardrobe. Name them, save them, schedule them on your calendar and see how you look in them.",
    lead:
      "Zyrobe's outfit maker is a canvas where you put outfits together from the clothes you already own. Save each look with a name, and wear it on any day you choose.",
    sections: [
      {
        id: "what-is-it",
        heading: "What can I do with the outfit maker?",
        paras: ["You can build, name and save outfits from your own wardrobe, then use them across the app."],
        list: [
          "Tap or drag clothes from your wardrobe onto a canvas to build a look.",
          "Save it with a name, such as Casual Friday, and edit it later.",
          "Schedule an outfit on your Style Calendar.",
          "Add a photo of yourself wearing it, or attach an AI try-on look.",
        ],
      },
      {
        id: "how-to-make-an-outfit",
        heading: "How do I make an outfit?",
        paras: ["Open Outfits, tap New Outfit and drop clothes onto the canvas."],
        steps: [
          "Open the Outfits tab and tap New Outfit.",
          "Tap or drag clothes from your wardrobe onto the canvas. Drag a piece off the canvas to remove it.",
          "Tap Save Outfit and give the look a name.",
          "Open the outfit any time to see it as a collage, schedule it or see how you look in it.",
        ],
      },
      {
        id: "how-you-look",
        heading: "Can I see how I look in an outfit?",
        paras: [
          "Yes. Each outfit has two views: the outfit collage and How You Look. In How You Look, add a photo of yourself wearing the outfit, or attach a look you made with the AI virtual try-on.",
        ],
      },
    ],
    credits: {
      paras: [
        "Making and saving outfits yourself does not use credits. The AI features you can use with an outfit, like the virtual try-on, do.",
      ],
      rows: [
        ["Make, edit and save outfits", "Free"],
        ["AI virtual try-on of an outfit", `${CREDIT_COSTS.tryOn} credits`],
      ],
    },
    shots: [
      { src: "/media/screens/03_outfits.webp", alt: "My Outfits screen in Zyrobe showing saved looks made of shirts, trousers, shoes and watches", caption: "Your saved outfits" },
      { src: "/media/screens/09_outfit_detail.webp", alt: "Outfit details in Zyrobe: a white shirt, beige trousers, sneakers and a watch, with an AI Virtual Try-On button", caption: "An outfit, ready to try on" },
    ],
    faqs: [
      { q: "Does making outfits use credits?", a: "No. Building, editing and saving outfits yourself is free." },
      { q: "Can I change an outfit later?", a: "Yes. Open the outfit to edit its pieces or rename it." },
      {
        q: "Can I plan which day to wear an outfit?",
        a: "Yes. Schedule a saved outfit on your Style Calendar, or let the AI plan your week.",
        link: { href: "/features/outfit-planner", label: "See the outfit planner" },
      },
      {
        q: "Can I see an outfit on me?",
        a: "Yes. Add a photo of yourself wearing it, or use the AI virtual try-on and attach the result to the outfit.",
        link: { href: "/features/ai-virtual-try-on", label: "See the AI virtual try-on" },
      },
    ],
    related: ["ai-virtual-try-on", "outfit-planner", "ai-stylist"],
  },
  {
    slug: "ai-virtual-try-on",
    name: "AI virtual try-on",
    title: "AI virtual try-on: see clothes on you before you wear them",
    description:
      "Add a full-body photo of yourself, pick a top, a bottom or both from your wardrobe, and Zyrobe's AI shows you wearing them. Save the look or attach it to an outfit.",
    lead:
      "Add a photo of yourself, pick a top, a bottom or both from your wardrobe, and Zyrobe's AI shows you wearing them. It is a quick way to check a look before you get dressed.",
    sections: [
      {
        id: "how-it-works",
        heading: "How does the AI virtual try-on work?",
        paras: ["You choose a photo of yourself and the clothes to try, and the AI makes an image of you wearing them."],
        steps: [
          "Open Try-On from the home screen, the Stylist tab or an outfit.",
          "Choose a full-body photo of yourself.",
          "Select the clothes to try on from your wardrobe: a top, a bottom or both.",
          "Tap Generate Try-On and wait a moment.",
          "Save the look, download it to your phone, or attach it to an outfit.",
        ],
      },
      {
        id: "photo-tips",
        heading: "What photo gives the best try-on?",
        paras: ["A clear, full-body photo taken from the front gives the best result."],
        list: [
          "Full body in frame: head to toe should be visible.",
          "Good lighting: stand near a window or in a well-lit room.",
          "Face forward, stand straight, arms slightly apart.",
          "Plain background: a neutral wall gives the cleanest results.",
          "Wear fitted clothes.",
          "Avoid cropped or dark photos and side views.",
        ],
      },
      {
        id: "accuracy",
        heading: "How accurate is the try-on?",
        paras: [
          "Try-on images are made with AI, so treat them as previews. They may not match exactly how clothes look or fit in real life.",
        ],
      },
      {
        id: "privacy",
        heading: "What happens to my photo?",
        paras: [
          "Your photo is used only to make the try-on you ask for. It is sent over an encrypted connection to Zyrobe's servers in India and to RunPod, which runs the image models. It is never shown to other users, never sold, never used for advertising and not used to train AI models.",
        ],
      },
    ],
    credits: {
      paras: [`Each try-on uses ${CREDIT_COSTS.tryOn} credits. If the try-on fails, the credits go back to you.`],
      rows: [
        ["One virtual try-on", `${CREDIT_COSTS.tryOn} credits`],
        ["Saving and downloading looks", "Free"],
      ],
    },
    shots: [
      { src: "/media/screens/09_outfit_detail.webp", alt: "An outfit in Zyrobe with the AI Virtual Try-On button", caption: "Start a try-on from any outfit" },
      { src: "/media/screens/04_stylist.webp", alt: "Zyrobe Stylist tab with Outfit of the Day and a Virtual Try-On card", caption: "Or from the Stylist tab" },
    ],
    faqs: [
      {
        q: "How many credits does a virtual try-on use?",
        a: `Each try-on uses ${CREDIT_COSTS.tryOn} credits. If the try-on fails, the credits go back to you.`,
      },
      {
        q: "Can I try on a whole outfit?",
        a: "You can try on a top, a bottom or both at once, chosen from your Zyrobe wardrobe.",
      },
      {
        q: "Is my photo private?",
        a: "Yes. Your photo is used only to make the try-on. It is never shown to other users, never sold, never used for advertising and not used to train AI models.",
        link: { href: "/privacy", label: "Read the privacy policy" },
      },
      {
        q: "Can I keep my try-on images?",
        a: "Yes. Save a look to your saved try-on looks, download it to your phone's gallery, or attach it to an outfit.",
      },
      {
        q: "Will the try-on look exactly like real life?",
        a: "Not always. Try-on images are made with AI, so treat them as previews of how a look might come together.",
      },
    ],
    related: ["outfit-maker", "ai-stylist", "digital-wardrobe"],
  },
  {
    slug: "ai-stylist",
    name: "AI stylist",
    title: "AI stylist: what to wear, from your own wardrobe",
    description:
      "Ask Zyrobe's AI stylist what to wear for work, a party, a date or a trip. It builds a complete outfit from the clothes you own, with your style and the weather in mind.",
    lead:
      "Ask Zyrobe's AI stylist what to wear for work, a party, a date or a trip. It picks a complete outfit from the clothes you already own, explains why it works, and keeps your style and the weather in mind.",
    sections: [
      {
        id: "what-is-it",
        heading: "What does the AI stylist do?",
        paras: ["It suggests complete outfits made from the clothes in your Zyrobe wardrobe, for the occasion you name."],
        list: [
          "Style chat: tap a quick start, like Party outfit, Office look, Date night, Casual look or Travel look, or type what you need.",
          "Stylist brief: set the occasion, the time and the place, and get Your Look with a stylist note.",
          "Outfit of the Day: a daily recommendation on the Stylist tab.",
          "Build around one piece: start from an item and ask for the pieces that go with it.",
        ],
      },
      {
        id: "how-to-use",
        heading: "How do I get an outfit from the AI stylist?",
        paras: ["Tell it the occasion and it puts the look together for you."],
        steps: [
          "Open the Stylist tab.",
          "Write what you need in the style chat, or fill in a stylist brief: the occasion (for example Evening Cocktail, Weekend Brunch or Wedding Guest), the time and the place.",
          "Zyrobe checks your wardrobe and the weather, and builds the outfit.",
          "Read the stylist note and the pieces it chose. Tap Use This Look, save it to your lookbook, or ask for another.",
        ],
      },
      {
        id: "what-it-considers",
        heading: "What does the AI stylist take into account?",
        paras: [
          "Its ideas are made from the clothes you own and consider your style and the weather. For the weather, Zyrobe looks up your approximate city from your internet connection. It does not use GPS or ask for location permission.",
        ],
      },
    ],
    credits: {
      paras: [
        `Each look from the AI stylist uses ${CREDIT_COSTS.stylist} credits, and so does asking for another one. If the AI fails, the credits go back to you.`,
      ],
      rows: [
        ["One look from the AI stylist", `${CREDIT_COSTS.stylist} credits`],
        ["Saving a look", "Free"],
      ],
    },
    shots: [
      { src: "/media/screens/your_look.webp", alt: "Your Look in Zyrobe: an AI-curated outfit of a linen shirt, beige trousers and sneakers, with a stylist note", caption: "Your Look, with a stylist note" },
      { src: "/media/screens/04_stylist.webp", alt: "Zyrobe Stylist tab with the Outfit of the Day", caption: "Outfit of the Day" },
    ],
    faqs: [
      {
        q: "Does the AI stylist use my own clothes?",
        a: "Yes. Its outfits are made from the clothes in your Zyrobe wardrobe, so add some clothes first.",
        link: { href: "/features/digital-wardrobe", label: "How to add clothes" },
      },
      {
        q: "How many credits does the AI stylist use?",
        a: `Each look uses ${CREDIT_COSTS.stylist} credits, and asking for another one uses ${CREDIT_COSTS.stylist} more. If the AI fails, the credits go back to you.`,
      },
      {
        q: "Does the AI stylist check the weather?",
        a: "Yes. Zyrobe looks up your approximate city from your internet connection and uses the local weather. It does not use GPS.",
      },
      {
        q: "What occasions can I ask about?",
        a: "Any occasion: work, a party, a date, a casual day, a trip, or one you type yourself, like a wedding.",
      },
      { q: "Can I save the looks it suggests?", a: "Yes. Save a look to your lookbook, or tap Use This Look." },
    ],
    related: ["outfit-planner", "trip-packing-planner", "ai-virtual-try-on"],
  },
  {
    slug: "outfit-planner",
    name: "Outfit planner",
    title: "Outfit planner: plan what to wear this week",
    description:
      "Tell Zyrobe what your week looks like and its AI plans an outfit for each day from your own clothes. Confirm the plan and it goes on your Style Calendar.",
    lead:
      "Tell Zyrobe what your week looks like, and its AI plans an outfit for each day from the clothes you own. Confirm the plan and the outfits go on your Style Calendar.",
    sections: [
      {
        id: "how-it-works",
        heading: "How do I plan my outfits for the week?",
        paras: ["Pick the days, add what you are doing on each one, and let the AI plan the outfits."],
        steps: [
          "On the home screen, tap Plan Week.",
          "Choose the week. You can plan up to 7 days, and remove the days you don't need.",
          "Add activities for each day, like Office, Meeting or Dinner, or type your own.",
          "Tap Generate Weekly Plan.",
          "Check the Style Plan and tap Confirm Weekly Plan. The outfits go on your Style Calendar.",
        ],
      },
      {
        id: "activities",
        heading: "Which activities can I add?",
        paras: [
          "Pick one or more for each day: Office, Meeting, Dinner, Brunch, Event, Travel, Leisure, Shopping, Gym, Date, Casual and Formal. Or type your own, like a wedding or a day at the beach.",
        ],
      },
      {
        id: "calendar",
        heading: "Can I plan outfits myself?",
        paras: [
          "Yes. On the Style Calendar, tap a day and pick one of your saved outfits. You can change or remove a planned outfit at any time.",
          "The AI plans only the days that don't have an outfit yet, and past days can't be planned.",
        ],
      },
    ],
    credits: {
      paras: [
        `An AI plan for your week uses ${CREDIT_COSTS.weekPlan} credits, however many days it covers. If the AI fails, the credits go back to you. Picking outfits yourself is free.`,
      ],
      rows: [
        ["One AI plan for your week", `${CREDIT_COSTS.weekPlan} credits`],
        ["Planning outfits yourself", "Free"],
      ],
    },
    shots: [
      { src: "/media/screens/activities.webp", alt: "Smart Weekly Planner in Zyrobe: adding activities such as Office, Meeting and Dinner to a day", caption: "Add what you're doing each day" },
      { src: "/media/screens/style_plan.webp", alt: "Style Plan in Zyrobe: an office-casual outfit planned for Monday", caption: "An outfit for every day" },
    ],
    faqs: [
      {
        q: "How many credits does a weekly plan use?",
        a: `One AI plan uses ${CREDIT_COSTS.weekPlan} credits, however many days it covers. Planning outfits yourself is free.`,
      },
      { q: "Can I plan only a few days?", a: "Yes. Remove the days you don't need before you generate the plan. You can plan up to 7 days at a time." },
      { q: "Can I change a planned outfit?", a: "Yes. Open the day on your Style Calendar to change the outfit or remove it." },
      {
        q: "Does the planner consider the weather?",
        a: "Yes. Zyrobe takes the weather into account when it suggests outfits and weekly plans.",
      },
    ],
    related: ["ai-stylist", "outfit-maker", "trip-packing-planner"],
  },
  {
    slug: "trip-packing-planner",
    name: "Trip packing planner",
    title: "Trip packing planner: outfits for every day of your trip",
    description:
      "Plan a trip in Zyrobe and pack from your own wardrobe. The AI suggests day-by-day outfits for your destination's weather and plans, and you can share the packing list as a PDF.",
    lead:
      "Plan a trip in Zyrobe's Briefcase and pack from your own wardrobe. The AI suggests an outfit for each day, based on the weather where you are going and what you plan to do, and you can share the packing list as a PDF.",
    sections: [
      {
        id: "how-it-works",
        heading: "How do I plan what to pack for a trip?",
        paras: ["Create a trip, pack the clothes you are taking, and let the AI plan your outfits day by day."],
        steps: [
          "Open Briefcase and tap New Trip.",
          "Add the trip name, the destination (city and country), the occasions, any notes about your plans, and your departure and return dates.",
          "Tap Create Travel Capsule.",
          "Tap Pack from Wardrobe and choose the clothes you are taking.",
          "Tap AI Suggest for day-by-day outfits, or build your own outfits from your trip items or your full wardrobe.",
          "Add essentials, like a phone charger or a toothbrush.",
          "Share the packing list as a PDF.",
        ],
      },
      {
        id: "occasions",
        heading: "What kinds of trips can I plan?",
        paras: [
          "Choose one or more occasions for each trip: Vacation, Business, Casual, Event & Party, Beach & Resort, Weekend, Adventure and Dining. Add notes too, like \"3 days of meetings, 2 days of sightseeing\".",
        ],
      },
      {
        id: "weather",
        heading: "Does the packing planner check the weather?",
        paras: [
          "Yes. Each trip shows the weather at your destination, and the AI uses it with your plans to suggest outfits and packing advice for each day.",
        ],
      },
      {
        id: "trips",
        heading: "What does a trip look like in Zyrobe?",
        paras: ["Each trip has three tabs, and your next trip sits at the top of Briefcase with a countdown."],
        list: [
          "Items: the pieces you have packed, by category.",
          "Outfits: your day-by-day looks.",
          "Essentials: everything else you need to take.",
        ],
      },
    ],
    credits: {
      paras: [
        `Each AI outfit suggestion for a trip uses ${CREDIT_COSTS.tripPlan} credits. If the AI fails, the credits go back to you. Packing and building outfits yourself is free.`,
      ],
      rows: [
        ["One AI outfit suggestion for a trip", `${CREDIT_COSTS.tripPlan} credits`],
        ["Packing, essentials and your own outfits", "Free"],
        ["Sharing the packing list as a PDF", "Free"],
      ],
    },
    shots: [
      { src: "/media/feat/pl_list.webp", alt: "Briefcase in Zyrobe: a Dubai trip next, with trips to Goa, London, Mumbai and Kashmir below", caption: "All your trips in Briefcase" },
      { src: "/media/feat/lb_sheet.webp", alt: "Trip Lookbook in Zyrobe for Paris: the weather and day-by-day outfits", caption: "Day-by-day outfits for the weather" },
      { src: "/media/feat/pt_items.webp", alt: "Packed wardrobe pieces for a Paris trip in Zyrobe, by tops, bottoms and shoes", caption: "Everything you've packed" },
    ],
    faqs: [
      {
        q: "How many credits does the packing planner use?",
        a: `Each AI outfit suggestion for a trip uses ${CREDIT_COSTS.tripPlan} credits. Packing and building outfits yourself is free.`,
      },
      { q: "Can I share my packing list?", a: "Yes. Zyrobe makes a PDF of your trip's packing list that you can share." },
      {
        q: "Does it use the weather at my destination?",
        a: "Yes. Each trip shows the destination's weather, and the AI uses it to suggest outfits and packing advice.",
      },
      {
        q: "If I delete a trip, are my clothes deleted too?",
        a: "No. Deleting a trip removes only the trip. Your wardrobe items are not affected.",
      },
      {
        q: "Can I plan outfits for the trip myself?",
        a: "Yes. Build outfits on the canvas from the pieces you packed or from your full wardrobe.",
      },
    ],
    related: ["outfit-planner", "ai-stylist", "clothes-storage-tracker"],
  },
];

export const featureBySlug = (slug: string) => FEATURES.find((f) => f.slug === slug);

/** Feature pages, served at /features/<slug>. */
export const FEATURE_PAGES: PageEntry[] = FEATURES.map((f) => ({
  slug: f.slug,
  title: f.title,
  description: f.description,
  updated: FEATURES_UPDATED,
}));
