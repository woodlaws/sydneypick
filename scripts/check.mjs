import { readFile, access } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("src/site.js", "utf8");
const assertions = [
  [html.includes('lang="ko"'), "Korean document language"],
  [html.includes('name="viewport"'), "mobile viewport"],
  [html.includes('https://sydneypick.com/'), "canonical domain"],
  [html.includes('application/ld+json'), "structured data"],
  [html.includes('id="schedule"') && html.includes('id="areas"') && html.includes('id="sdf"'), "requested section structure"],
  [html.indexOf('id="schedule"') < html.indexOf('id="areas"') && html.indexOf('id="areas"') < html.indexOf('id="prepare"'), "content order"],
  [html.includes("FIRST PICK") && html.includes("5박 6일"), "first-pick itinerary"],
  [html.includes("transportnsw.info") && html.includes("sydney.com"), "official travel sources"],
  [css.includes("@media(max-width:600px)"), "mobile reflow"],
  [css.includes("aspect-ratio:16/9") && css.includes("aspect-ratio:3/2") && css.includes("aspect-ratio:4/3"), "varied image ratios"],
  [css.includes("prefers-reduced-motion"), "reduced motion support"],
  [js.includes("siteContent") && js.includes("renderPlan"), "structured interactive content"],
  [html.includes('/assets/site.js') && !html.includes('/app.js'), "browser code is loaded only from static assets"],
  [js.includes('typeof document !== "undefined"'), "browser bootstrap is guarded from server imports"],
];
for (const [ok, label] of assertions) {
  if (!ok) throw new Error(`Check failed: ${label}`);
  console.log(`✓ ${label}`);
}
await access("public/og.png");
await access("public/favicon.svg");
await access("robots.txt");
await access("sitemap.xml");
console.log("✓ social preview and SEO files");
