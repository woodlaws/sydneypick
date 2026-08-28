import { readFile, access } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("app.js", "utf8");
const assertions = [
  [html.includes('lang="ko"'), "Korean document language"],
  [html.includes('name="viewport"'), "mobile viewport"],
  [html.includes("<main"), "main landmark"],
  [html.includes("aria-live=\"polite\""), "dynamic itinerary announcement"],
  [html.includes("transportnsw.info"), "official transport source"],
  [css.includes("@media (max-width:760px)"), "mobile layout"],
  [css.includes("prefers-reduced-motion"), "reduced motion support"],
  [js.includes("renderPlan()"), "interactive itinerary"],
];
for (const [ok, label] of assertions) {
  if (!ok) throw new Error(`Check failed: ${label}`);
  console.log(`✓ ${label}`);
}
await access("public/og.png");
console.log("✓ social preview asset");
