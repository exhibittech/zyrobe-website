import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Search engines and AI assistants are welcome to read and cite the whole site. Each named crawler gets
// its own group (a crawler that matches a named group ignores "*"), so each repeats the same rules.
const CRAWLERS = [
  "Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User",
  "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended", "CCBot",
  "meta-externalagent", "Amazonbot", "DuckAssistBot", "YouBot", "MistralAI-User", "cohere-ai", "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  const rules = { allow: "/", disallow: "/lab/" };
  return {
    rules: [{ userAgent: "*", ...rules }, ...CRAWLERS.map((userAgent) => ({ userAgent, ...rules }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
