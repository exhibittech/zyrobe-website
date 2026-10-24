import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Static HTML export, served by Caddy on the zyrobe-api VM (see deploy/).
  output: "export",
  images: { unoptimized: true },
  // `page.dev.tsx` files are section labs: routable in `next dev`, never exported.
  pageExtensions: isDev ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
  reactStrictMode: true,
  // Hosts other than localhost that may open `next dev` (the dev machine's LAN IP, e.g. from a phone).
  // Dev-only; override with DEV_ORIGINS="host1,host2".
  allowedDevOrigins: (process.env.DEV_ORIGINS ?? "192.168.0.180").split(",").filter(Boolean),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
