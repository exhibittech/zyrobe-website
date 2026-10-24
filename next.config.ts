import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Static HTML export, served by Caddy on the zyrobe-api VM (see deploy/).
  output: "export",
  images: { unoptimized: true },
  // `page.dev.tsx` files are section labs: routable in `next dev`, never exported.
  pageExtensions: isDev ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
  reactStrictMode: true,
  // Let phones/laptops on the office LAN open `next dev` (e.g. http://192.168.0.180:3100).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
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
