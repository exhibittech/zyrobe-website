import { robotsTxt } from "@/lib/aiPolicy";

export const dynamic = "force-static";

// A route handler, not robots.ts: the metadata API can't write the Content-Signal / Content-Usage lines.
export function GET() {
  return new Response(robotsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
