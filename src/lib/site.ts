// Single source of truth for facts shown on the site. Keep in sync with the
// Play listing (play-store-assets/store-listing.txt) and backend deploy/plans.json.

export const PLAY_PACKAGE = "com.exhibit.zyrobeapp";
export const PLAY_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;

export const SITE_URL = "https://zyrobe.com";
// Google Analytics 4 property "Zyrobe website" (account Zyrobe, Exhibit Technologies organization).
export const GA_ID = "G-PLJFE5QS5Q";
export const CONTACT_EMAIL = "webteam@exhibit.co.in";
export const COMPANY = "Exhibit Technologies Private Limited";

export const TAGLINE = "Better outfits. Better days.";
export const PROMISE = "Your wardrobe, now with a stylist.";
export const SHORT_DESCRIPTION =
  "All your clothes in one app. Try outfits on with AI and plan what to wear.";

export const SIGNUP_FREE_CREDITS = 5;

export type Plan = {
  id: string;
  name: string;
  price: string; // INR, as shown in Google Play
  period: string;
  credits: number;
  note: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  { id: "zyrobe_100_items", name: "Starter", price: "₹499", period: "per month", credits: 100, note: "Billed monthly" },
  { id: "zyrobe_500_items", name: "Pro Wardrobe", price: "₹1,999", period: "per 6 months", credits: 500, note: "Billed every 6 months", featured: true },
  { id: "zyrobe_1000_items", name: "Elite Wardrobe", price: "₹3,499", period: "per year", credits: 1000, note: "Billed yearly" },
];

export const TOPUPS = [
  { credits: 10, price: "₹70" },
  { credits: 50, price: "₹350" },
  { credits: 100, price: "₹700" },
];

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#finale", label: "The app" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];
