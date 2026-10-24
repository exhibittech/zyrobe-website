import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Static HTML export, served by Caddy on the zyrobe-api VM (see deploy/).
  output: "export",
  images: { unoptimized: true },
  // `page.dev.tsx` files are section labs: routable in `next dev`, never exported.
  pageExtensions: isDev ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
  reactStrictMode: true,
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
