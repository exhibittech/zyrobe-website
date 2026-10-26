/**
 * Structured data for search engines and AI answers. `<`, `>` and `&` are escaped as JSON unicode
 * escapes, so no content (FAQ answers, guide text) can ever close the script tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026"),
      }}
    />
  );
}
