/**
 * Alt text for images that appear in many places, so the same picture is always described the same way.
 * Describe what is visible, in a few words. No people appear in any asset.
 */

/** The 20 garment cut-outs in public/media/garments (c00 to c22), by file id. */
export const GARMENT_ALT: Record<string, string> = {
  c00: "Dark green crew-neck T-shirt",
  c01: "Navy and maroon check half-sleeve shirt",
  c02: "Black short-sleeve shirt with a white window-pane check",
  c04: "Brown and cream buffalo-check shirt with a chest pocket",
  c05: "Blue and cream block-check flannel shirt",
  c06: "Blue denim shirt with a chest pocket",
  c08: "Grey washed sweatshirt with a graphic print",
  c09: "Dusty pink linen shirt",
  c11: "Navy button-down shirt",
  c12: "Orange T-shirt with a printed temple sketch",
  c13: "Maroon polo T-shirt with a black collar",
  c14: "Black slim-fit jeans",
  c15: "Dark blue jeans",
  c16: "Light blue straight-leg jeans",
  c17: "Mid-blue washed slim jeans",
  c18: "Black jeans",
  c19: "Charcoal grey washed jeans",
  c20: "Faded blue straight-fit jeans",
  c21: "Blue denim cargo trousers",
  c22: "Beige pleated trousers",
};

/** Alt for a garment cut-out given its file id ("c09") or its path ("/media/garments/c09.webp"). */
export function garmentAlt(idOrSrc: string): string {
  const id = idOrSrc.match(/c\d\d/)?.[0] ?? idOrSrc;
  return GARMENT_ALT[id] ?? "Clothing item";
}

/** The satin and fabric backdrops. Only for backdrops that sit in an aria-hidden subtree (or carry aria-hidden). */
export const SATIN_ALT = {
  cream: "Cream satin fabric",
  dark: "Dark satin fabric",
  sheen: "Satin fabric catching the light",
} as const;
