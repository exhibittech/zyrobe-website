import { COMPANY, CONTACT_EMAIL, SIGNUP_FREE_CREDITS } from "@/lib/site";

export type Faq = { q: string; a: string; link?: { href: string; label: string } };

// Facts only from the Play listing, src/lib/site.ts and the privacy policy.
export const FAQS: Faq[] = [
  {
    q: "What is Zyrobe?",
    a: "Zyrobe keeps all your clothes in one place and helps you decide what to wear. Take a photo of your clothes and Zyrobe sorts them for you. Then try outfits on, plan your week and pack for trips, all from the clothes you already own.",
  },
  {
    q: "Is Zyrobe free?",
    a: `Zyrobe is free to download, and every new account gets ${SIGNUP_FREE_CREDITS} free credits. AI features use credits. For more, choose a monthly, 6-month or yearly plan.`,
    link: { href: "#pricing", label: "See plans" },
  },
  {
    q: "How do credits work?",
    a: "AI features use credits: adding clothes from a photo, product photos, try-ons, the AI stylist, outfit plans and trip packing. Each plan adds credits for its term. While your plan is active you can also buy extra credit packs, which last until your plan ends. Plans renew automatically until you cancel them in Google Play.",
  },
  {
    q: "Are my photos private?",
    a: "Your photos belong to you. They are never shown to other users, never sold, and never used for advertising.",
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
  {
    q: "How accurate is the virtual try-on?",
    a: "Try-on images are made with AI, so treat them as previews. They may not match exactly how clothes look or fit in real life.",
  },
  {
    q: "Where can I get Zyrobe?",
    a: "Zyrobe is an Android app, launching first in India on Google Play.",
  },
  {
    q: "Who can use Zyrobe?",
    a: "Zyrobe is for people aged 18 and over.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app, go to Profile > Personal Information > Delete Account and confirm. This permanently deletes your account and all of your data. You can also email us to ask for it, as our privacy policy explains.",
  },
  {
    q: "Who makes Zyrobe?",
    a: `Zyrobe is made by ${COMPANY} in India. Write to us any time at ${CONTACT_EMAIL}.`,
    link: { href: `mailto:${CONTACT_EMAIL}`, label: "Email us" },
  },
];
