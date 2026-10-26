import type { GuideBody } from "@/components/guides/GuidePage";
import diwali from "./diwali-festive-outfit-planning";
import dubai from "./dubai-packing-list";
import goa from "./goa-packing-list";
import wedding from "./indian-wedding-guest-outfits";
import kerala from "./kerala-packing-list";
import manali from "./manali-shimla-winter-packing-list";
import monsoon from "./monsoon-wardrobe-guide";
import office from "./office-wear-indian-summer";
import organise from "./organise-your-wardrobe";
import paris from "./paris-packing-list";

/** Guide bodies by slug (titles, summaries and dates are in src/content/guides.ts). */
export const GUIDE_BODIES: Record<string, GuideBody> = {
  "indian-wedding-guest-outfits": wedding,
  "diwali-festive-outfit-planning": diwali,
  "monsoon-wardrobe-guide": monsoon,
  "office-wear-indian-summer": office,
  "goa-packing-list": goa,
  "manali-shimla-winter-packing-list": manali,
  "kerala-packing-list": kerala,
  "paris-packing-list": paris,
  "dubai-packing-list": dubai,
  "organise-your-wardrobe": organise,
};
