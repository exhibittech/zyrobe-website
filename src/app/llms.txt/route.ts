import { llmsTxt } from "@/lib/llms";

// Exported as out/llms.txt (Caddy serves .txt as text/plain; charset=utf-8).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
