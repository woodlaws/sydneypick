import { readFile, access } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("src/site.js", "utf8");
const itineraryHub = await readFile("pages/itineraries.html", "utf8");
const itineraryDetail = await readFile("pages/sydney-5n6d.html", "utf8");
const itineraryJs = await readFile("src/itineraries.js", "utf8");
const areasHub = await readFile("pages/areas.html", "utf8");
const circularQuay = await readFile("pages/circular-quay.html", "utf8");
const operaHouse = await readFile("pages/sydney-opera-house.html", "utf8");
const areasCss = await readFile("styles-areas.css", "utf8");
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
  [itineraryHub.includes("내 여행에 맞는") && itineraryHub.includes("ItemList"), "itinerary hub content and schema"],
  [itineraryDetail.includes("처음 가는 시드니") && itineraryDetail.includes('"@type":"Article"'), "5n6d detail content and schema"],
  [itineraryDetail.match(/<h1>/g)?.length === 1 && itineraryHub.match(/<h1>/g)?.length === 1, "one H1 per itinerary page"],
  [itineraryJs.includes('typeof document !== "undefined"'), "itinerary browser bootstrap is guarded"],
  [areasHub.match(/<h1>/g)?.length === 1 && circularQuay.match(/<h1>/g)?.length === 1 && operaHouse.match(/<h1>/g)?.length === 1, "one H1 per area page"],
  [areasHub.includes("ItemList") && circularQuay.includes('"@type":"Place"') && operaHouse.includes('"@type":"TouristAttraction"'), "area structured data"],
  [circularQuay.includes('"@type":"FAQPage"') && operaHouse.includes('"@type":"FAQPage"'), "visible FAQ schema"],
  [circularQuay.includes("transportnsw.info") && operaHouse.includes("sydneyoperahouse.com"), "official source buttons"],
  [areasHub.includes("상세 콘텐츠 준비 중") && !areasHub.includes('/areas/the-rocks'), "no fabricated detail routes"],
  [areasCss.includes("aspect-ratio:16/9") && areasCss.includes("aspect-ratio:3/2") && areasCss.includes("aspect-ratio:4/3"), "varied area image ratios"],
  [!areasHub.includes("document.") && !circularQuay.includes("document.") && !operaHouse.includes("document."), "area HTML has no server-side browser execution"],
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

