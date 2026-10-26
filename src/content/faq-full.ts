import { FAQS, type Faq } from "@/components/closing/faq";
import { COMPANY, CONTACT_EMAIL, PLANS, SIGNUP_FREE_CREDITS, TOPUPS } from "@/lib/site";
import { CREDIT_COSTS } from "./features";

// Facts only from the Play listing, src/lib/site.ts, the privacy policy, the terms, the app and the backend.
// Questions that are also on the home page use the home page's answer, word for word.
const home = (q: string): Faq => {
  const f = FAQS.find((x) => x.q === q);
  if (!f) throw new Error(`Home FAQ not found: ${q}`);
  return f.link?.href.startsWith("#") ? { ...f, link: { ...f.link, href: `/${f.link.href}` } } : f;
};

const plans = PLANS.map((p) => `${p.name}: ${p.price} ${p.period} for ${p.credits.toLocaleString("en-IN")} credits`).join("; ");
const packs = TOPUPS.map((t) => `${t.credits} credits for ${t.price}`).join(", ");

/** The full FAQ at /faq, by topic (the home page shows the short list in components/closing/faq.ts). */
export const FAQ_GROUPS: { topic: string; items: Faq[] }[] = [
  {
    topic: "Getting started",
    items: [
      home("What is Zyrobe?"),
      {
        q: "What can I do with Zyrobe?",
        a: "Add your clothes from photos, note where each item is kept, build outfits, try clothes on with AI, ask the AI stylist what to wear, plan your week and pack for trips.",
        link: { href: "/features", label: "See all features" },
      },
      {
        q: "How do I add my clothes?",
        a: "Tap Add Item and take a photo of a piece, or choose one from your phone. Zyrobe removes the background, notes the type and colour, and adds it to your wardrobe. You can edit any detail.",
        link: { href: "/features/digital-wardrobe", label: "How the digital wardrobe works" },
      },
      {
        q: "How do I sign up?",
        a: "Sign in with Google or Apple, or sign up with your email and a password. If you use email, Zyrobe sends a 6-digit code to confirm your address.",
      },
    ],
  },
  {
    topic: "AI features and credits",
    items: [
      home("How do credits work?"),
      {
        q: "How many credits does each AI feature use?",
        a: `Adding an item from a photo uses ${CREDIT_COSTS.addItem} credit. A virtual try-on, a look from the AI stylist, an AI plan for your week and an AI outfit suggestion for a trip use ${CREDIT_COSTS.tryOn} credits each.`,
      },
      {
        q: "What happens if an AI feature fails?",
        a: "If the AI fails to give you a result, the credits it used go back to you.",
      },
      {
        q: "Which features don't use credits?",
        a: "Browsing and editing your wardrobe, the storage tracker, making outfits yourself, planning outfits on your calendar yourself, packing for a trip and sharing the packing list are all free.",
      },
      home("How accurate is the virtual try-on?"),
      {
        q: "Which AI does Zyrobe use?",
        a: "Google's Gemini analyses clothing photos and writes outfit suggestions. Image models run on RunPod create product photos and try-on images.",
      },
      {
        q: "Does Zyrobe consider the weather?",
        a: "Yes. Outfit suggestions, weekly plans and packing lists take the weather into account. Zyrobe looks up your approximate city from your internet connection, and for trips it uses the weather at your destination.",
      },
    ],
  },
  {
    topic: "Plans and billing",
    items: [
      home("Is Zyrobe free?"),
      {
        q: "What plans are there?",
        a: `There are three plans. ${plans}. Each plan adds its credits for its term.`,
        link: { href: "/#pricing", label: "See plans" },
      },
      {
        q: "What are credit packs?",
        a: `Credit packs are extra credits you can buy while your plan is active: ${packs}. They last until your plan ends.`,
      },
      {
        q: "Do the free credits expire?",
        a: `Yes. The ${SIGNUP_FREE_CREDITS} free credits you get when you sign up last for one month.`,
      },
      {
        q: "What happens to my free credits when I choose a plan?",
        a: "When you choose a plan, your free credits are replaced by the plan's credits.",
      },
      {
        q: "How do I pay?",
        a: "Plans and credit packs are bought in the app through Google Play. Google handles the payment, so Zyrobe never sees your card or UPI details.",
      },
      {
        q: "How do I cancel my plan?",
        a: "Cancel it in Google Play at any time. Plans renew automatically until you cancel them.",
      },
      {
        q: "Can I get a refund?",
        a: "Refunds are handled under Google Play's refund policy.",
        link: { href: "/terms", label: "Read the terms" },
      },
    ],
  },
  {
    topic: "Privacy and your data",
    items: [
      home("Are my photos private?"),
      {
        q: "Are my photos used to train AI?",
        a: "No. Zyrobe does not use your photos to train AI models, to build advertising profiles, or for anything other than giving you the app's features.",
      },
      {
        q: "Where is my data stored?",
        a: "On Google Cloud in the Mumbai region, India. Data is encrypted in transit with HTTPS and encrypted at rest.",
      },
      {
        q: "Does Zyrobe show ads or track me?",
        a: "No. The app has no advertising, no advertising IDs and no third-party analytics or tracking tools.",
      },
      {
        q: "Does Zyrobe use my location?",
        a: "Only your approximate city, looked up from your internet connection to show the local weather. Zyrobe does not use GPS and does not ask for location permission.",
      },
      {
        q: "Can Zyrobe see my photo gallery?",
        a: "No. Zyrobe reads only the photos you choose or take with the camera. It never reads your gallery in the background.",
      },
      {
        q: "Who processes my data?",
        a: "Only service providers that run the app's features: Google Cloud (hosting), Google Gemini (photo analysis and suggestions), RunPod (product photos and try-ons), Cloudflare, Google Sign-In and Sign in with Apple, Google Play, Amazon SES (account emails), and ipwho.is and Open-Meteo (city and weather). Zyrobe does not sell your data.",
        link: { href: "/privacy", label: "Read the privacy policy" },
      },
    ],
  },
  {
    topic: "Account",
    items: [
      {
        q: "Can I change my profile details?",
        a: "Yes. In the app, go to Profile > Personal Information.",
      },
      home("How do I delete my account?"),
      {
        q: "Can I delete my account without the app?",
        a: `Yes. Email ${CONTACT_EMAIL} from the email address on your account, with the subject "Delete my Zyrobe account". It is done within 30 days.`,
      },
      {
        q: "What is deleted when I delete my account?",
        a: "Everything: your account details, all your photos, AI results, wardrobe, outfits, plans and trips, and your credits and purchase history in Zyrobe. Backup copies are removed within 30 days, and nothing is kept after that.",
      },
      {
        q: "Does deleting my account cancel my plan?",
        a: "No. Deleting your Zyrobe account does not cancel a Google Play subscription. Cancel your plan in Google Play first.",
      },
      home("Who can use Zyrobe?"),
    ],
  },
  {
    topic: "Availability",
    items: [
      home("Where can I get Zyrobe?"),
      {
        q: "Which phones does Zyrobe work on?",
        a: "Android phones, through Google Play.",
      },
      {
        q: "Which currency are the prices in?",
        a: "Indian rupees (₹), as shown in Google Play.",
      },
      {
        q: "Who makes Zyrobe?",
        a: `Zyrobe is made by ${COMPANY} in India. Write to us any time at ${CONTACT_EMAIL}.`,
        link: { href: "/about", label: "About Zyrobe" },
      },
    ],
  },
];
