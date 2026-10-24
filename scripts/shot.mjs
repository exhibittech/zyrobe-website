#!/usr/bin/env node
// Screenshot a page at several scroll positions (headless Chrome, WebGL via SwiftShader).
//   node scripts/shot.mjs <url> <outPrefix> [--vw 1440] [--vh 900] [--at 0,0.25,0.5,1 | --px 0,900] [--wait 900] [--full]
// --at = fractions of the max scroll; --px = absolute scrollY values. Prints console errors.
import { chromium } from "playwright-core";

const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) { console.error("usage: shot.mjs <url> <outPrefix> [opts]"); process.exit(1); }
const opt = (k, d) => { const i = rest.indexOf(`--${k}`); return i >= 0 ? rest[i + 1] : d; };
const vw = +opt("vw", 1440), vh = +opt("vh", 900), wait = +opt("wait", 900);
const mobile = vw < 700;

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"],
});
const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.log(`[${m.type()}]`, m.text().slice(0, 300)); });
page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 400)));
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(1500);

const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const list = rest.includes("--px") ? opt("px").split(",").map(Number) : (opt("at", "0")).split(",").map((f) => Math.round(+f * max));
let i = 0;
for (const y of list) {
  await page.evaluate((y) => {
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  }, y);
  await page.waitForTimeout(wait);
  const file = `${out}-${String(i++).padStart(2, "0")}-${y}.png`;
  await page.screenshot({ path: file, fullPage: rest.includes("--full") });
  console.log(file);
}
console.log("scrollHeight-max", max);
await browser.close();
