import type { MetadataRoute } from "next";
import { PLAY_PACKAGE, PLAY_URL, PROMISE, SHORT_DESCRIPTION } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Zyrobe — ${PROMISE}`,
    short_name: "Zyrobe",
    description: SHORT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#faf7f2",
    categories: ["lifestyle", "shopping", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    related_applications: [{ platform: "play", url: PLAY_URL, id: PLAY_PACKAGE }],
    prefer_related_applications: false,
  };
}
