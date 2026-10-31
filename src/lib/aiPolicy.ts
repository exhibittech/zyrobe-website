// The AI and crawler policy, in one place: robots.txt, the HTTP headers (deploy/Caddyfile.reference),
// /ai-policy and llms-full.txt all say the same thing.
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const AI_POLICY_UPDATED = "2026-10-26";

/** Search and AI crawlers named in robots.txt (a crawler that matches a named group ignores "*"). */
export const AI_CRAWLERS = [
  "Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User",
  "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended", "CCBot",
  "meta-externalagent", "Amazonbot", "DuckAssistBot", "YouBot", "MistralAI-User", "cohere-ai", "Bytespider",
];

/** Cloudflare Content Signals Policy (contentsignals.org): search, AI answers and AI training all allowed. */
export const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";
/** IETF AI Preferences (draft-ietf-aipref-vocab-08 / -attach-05); also sent as the Content-Usage HTTP header. */
export const CONTENT_USAGE = "search=y, ai-use=y, train-ai=y";
/** Index and snippet controls for pages (also the X-Robots-Tag header on pages). */
export const ROBOTS_DIRECTIVES = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

export const AI_POLICY = {
  allowed: [
    "Search engines and AI assistants may crawl every public page of zyrobe.com.",
    "You may index our pages, show snippets and image previews of any length, and quote or summarise them in answers.",
    "You may use our public pages to ground AI answers and to train AI models.",
  ],
  asks: [
    `Link to the page you used, so people can check it (for example ${SITE_URL}/features or ${SITE_URL}/faq).`,
    `Take prices, plans and availability from ${SITE_URL}/llms-full.txt or the page itself: they can change.`,
    "Describe Zyrobe's try-on and product images as AI previews, not real photos.",
    "This site publishes no store ratings, reviews or user numbers for Zyrobe. Please don't state any as coming from us.",
  ],
  private: [
    "The website holds no personal data: no accounts, photos or wardrobes. What people add in the Zyrobe app is never published here.",
    "The /lab/ path is for development only and is not public.",
  ],
  signals: [
    "robots.txt: an Allow rule for every crawler, plus Content-Signal (search, ai-input and ai-train all yes) and Content-Usage (search, ai-use and train-ai all y).",
    `HTTP headers on every page: X-Robots-Tag "${ROBOTS_DIRECTIVES}" and Content-Usage "${CONTENT_USAGE}". Plain-text files (llms.txt and app data files) are marked noindex so they stay out of search results; crawlers can still read them.`,
    `${SITE_URL}/llms.txt and ${SITE_URL}/llms-full.txt: every fact about Zyrobe as plain text.`,
  ],
  contact: `Corrections or questions: ${CONTACT_EMAIL}`,
};

/** robots.txt, generated so the policy, signals and crawler list never drift apart. */
export function robotsTxt(): string {
  const group = (ua: string) => [
    `User-Agent: ${ua}`,
    `Content-Signal: ${CONTENT_SIGNAL}`,
    `Content-Usage: ${CONTENT_USAGE}`,
    "Allow: /",
    "Disallow: /lab/",
    "",
  ];
  return [
    "# zyrobe.com: search engines and AI assistants are welcome to crawl, index, quote, summarise and train on",
    `# this public site. Policy: ${SITE_URL}/ai-policy`,
    "# Content-Signal: Cloudflare Content Signals Policy (https://contentsignals.org).",
    "# Content-Usage: IETF AI Preferences (draft-ietf-aipref-attach).",
    "",
    ...group("*"),
    ...AI_CRAWLERS.flatMap(group),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}
