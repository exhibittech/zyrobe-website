#!/usr/bin/env node
// Screenshot every top-level section of a page at its start, middle and end (pinned scenes show their beats).
//   node scripts/qa-sections.mjs <url> <outDir> [--vw 1440] [--vh 900] [--wait 900] [--only id1,id2]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [url, outDir, ...rest] = process.argv.slice(2);
const opt = (k, d) => { const i = rest.indexOf(`--${k}`); return i >= 0 ? rest[i + 1] : d; };
const vw = +opt("vw", 1440), vh = +opt("vh", 900), wait = +opt("wait", 900);
const only = opt("only", "") ? opt("only").split(",") : null;
const mobile = vw < 700;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"],
});
const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 300)));
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(1500);

const sections = await page.evaluate(() =>
  [...document.querySelectorAll("main > section[id], main > div > section[id], main > div[id] > section[id]")]
    .map((s) => ({ id: s.id, top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight })));
console.log("sections:", sections.map((s) => `${s.id}(${Math.round(s.h / vh * 100)}vh)`).join(" "));
const scrollTo = (y) => page.evaluate((y) => { window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y); }, y);

for (const s of sections) {
  if (only && !only.includes(s.id)) continue;
  const span = Math.max(0, s.h - vh);
  const points = span > vh * 0.3 ? [0, 0.25, 0.5, 0.75, 1] : [0];
  for (const f of points) {
    const y = Math.round(s.top + span * f);
    await scrollTo(y);
    await page.waitForTimeout(wait);
    await page.screenshot({ path: `${outDir}/${s.id}-${Math.round(f * 100)}.png` });
  }
}
console.log("errors:", errors.length ? "\n  " + [...new Set(errors)].join("\n  ") : "none");
await browser.close();
