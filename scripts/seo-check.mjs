// Fetch /sitemap.xml from the dev server (http://localhost:3100), map the URLs to localhost, and print status, title/description lengths and duplicates. Run: node scripts/seo-check.mjs
const BASE = "http://localhost:3100";
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASE));
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const rows = [];
for (const u of urls) {
  const r = await fetch(u);
  const h = await r.text();
  const t = dec((h.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "");
  const d = dec((h.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || h.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i) || [])[1] || "");
  const h1 = dec(((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
  const canon = (h.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) || [])[1] || "";
  rows.push({ path: u.replace(BASE, "") || "/", status: r.status, t, d, h1, canon });
}
const base = (t) => t.replace(/ · Zyrobe$/, "");
for (const r of rows) {
  const flags = [];
  if (r.status !== 200) flags.push("STATUS");
  if (base(r.t).length > 60 && r.path !== "/") flags.push("TITLE>60");
  if (r.path !== "/privacy" && r.path !== "/terms" && (r.d.length < 140 || r.d.length > 160)) flags.push("DESC-LEN");
  console.log(`${String(r.status)} ${r.path.padEnd(48)} t=${String(base(r.t).length).padStart(3)} d=${String(r.d.length).padStart(3)} ${flags.join(",")}\n    T: ${r.t}\n    D: ${r.d}\n    H1: ${r.h1}`);
}
for (const k of ["t", "d"]) {
  const m = new Map();
  rows.forEach((r) => m.set(r[k], [...(m.get(r[k]) || []), r.path]));
  for (const [v, ps] of m) if (ps.length > 1) console.log(`DUPLICATE ${k}: ${ps.join(", ")} -> ${v}`);
}
console.log(`${rows.length} URLs, ${rows.filter((r) => r.status === 200).length} OK`);
