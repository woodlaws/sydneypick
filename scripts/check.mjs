import { readFile, access } from "node:fs/promises";
import { areaGuides, renderAreaGuide } from "./area-guides.mjs";
import { travelPrepPages, renderTravelPrepHub, renderTravelPrepPage } from "./travel-prep-pages.mjs";
import { foodPages, restaurantFieldSchema, restaurantRecords, renderFoodHub, renderFoodPage } from "./food-pages.mjs";

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
const generatedAreaPages = areaGuides.map(renderAreaGuide);
const prepHub = renderTravelPrepHub();
const generatedPrepPages = travelPrepPages.map(renderTravelPrepPage);
const prepJs = await readFile("src/travel-prep.js", "utf8");
const foodHub = renderFoodHub();
const generatedFoodPages = foodPages.map(renderFoodPage);
const foodJs = await readFile("src/food.js", "utf8");
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
  [areasHub.includes("상세 콘텐츠 준비 중") && !areasHub.includes('/areas/darling-harbour') && !areasHub.includes('/areas/port-stephens'), "no fabricated detail routes"],
  [areasCss.includes("aspect-ratio:16/9") && areasCss.includes("aspect-ratio:3/2") && areasCss.includes("aspect-ratio:4/3"), "varied area image ratios"],
  [!areasHub.includes("document.") && !circularQuay.includes("document.") && !operaHouse.includes("document."), "area HTML has no server-side browser execution"],
  [areaGuides.length === 4 && new Set(areaGuides.map((guide) => guide.slug)).size === 4, "four unique regional guide routes"],
  [generatedAreaPages.every((page) => (page.match(/<h1>/g) || []).length === 1 && page.includes('"@type":"FAQPage"')), "generated guides have one H1 and FAQ schema"],
  [generatedAreaPages.every((page) => page.includes("BreadcrumbList") && (page.includes('"@type":"Place"') || page.includes('"@type":"TouristAttraction"'))), "generated guide structured data"],
  [new Set(areaGuides.flatMap((guide) => [guide.hero, guide.body])).size === areaGuides.length * 2, "regional guide images are not repeated"],
  [generatedAreaPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "updates and official sources"],
  [areasHub.includes('/areas/the-rocks') && areasHub.includes('/areas/bondi-beach') && areasHub.includes('/areas/manly') && areasHub.includes('/areas/blue-mountains'), "area hub links all new guides"],
  [itineraryDetail.includes('/areas/the-rocks') && itineraryDetail.includes('/areas/bondi-beach') && itineraryDetail.includes('/areas/manly') && itineraryDetail.includes('/areas/blue-mountains'), "5n6d links all new guides"],
  [travelPrepPages.length === 5 && new Set(travelPrepPages.map((page) => page.slug)).size === 5, "five unique travel-prep detail routes"],
  [(prepHub.match(/<h1>/g) || []).length === 1 && generatedPrepPages.every((page) => (page.match(/<h1>/g) || []).length === 1), "one H1 per travel-prep page"],
  [generatedPrepPages.every((page) => page.includes("BreadcrumbList") && page.includes('"@type":"FAQPage"')), "travel-prep breadcrumb and visible FAQ schema"],
  [generatedPrepPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "travel-prep update dates and sources"],
  [prepHub.includes("10단계") && prepHub.includes("data-prep-check") && prepHub.includes("/travel-prep/checklist"), "travel-prep hub steps and local checklist"],
  [prepJs.includes('typeof document !== "undefined"') && prepJs.includes("localStorage") && !prepJs.includes("fetch("), "travel-prep browser code is guarded and local only"],
  [generatedPrepPages.find((page) => page.includes("준비물 체크리스트"))?.includes("data-custom-item-form"), "custom checklist item support"],
  [html.includes('href="/travel-prep"'), "homepage links travel-prep hub"],
  [itineraryDetail.includes('/travel-prep/airport-to-city') && itineraryDetail.includes('/travel-prep/opal-card') && itineraryDetail.includes('/travel-prep/esim') && itineraryDetail.includes('/travel-prep/money-payment'), "5n6d links travel-prep guides"],
  [foodPages.length === 4 && new Set(foodPages.map((page) => page.slug)).size === 4, "four unique food detail routes"],
  [(foodHub.match(/<h1>/g) || []).length === 1 && generatedFoodPages.every((page) => (page.match(/<h1>/g) || []).length === 1), "one H1 per food page"],
  [generatedFoodPages.every((page) => page.includes("BreadcrumbList") && page.includes('"@type":"FAQPage"')), "food breadcrumb and visible FAQ schema"],
  [!foodHub.includes('"@type":"Restaurant"') && generatedFoodPages.every((page) => !page.includes('"@type":"Restaurant"')), "no Restaurant schema without verified venues"],
  [restaurantRecords.length === 0 && Object.keys(restaurantFieldSchema).length === 18, "empty verified restaurant data and reusable field schema"],
  [foodHub.includes("에디터 확인 후 업데이트") && foodHub.includes("제휴 준비 중"), "editorial and affiliate status labels"],
  [foodJs.includes("dataFoodFilter") || foodJs.includes("foodFilter"), "food filter behavior"],
  [foodJs.includes("typeof document!=='undefined'") && !foodJs.includes("fetch("), "food browser code is server-safe"],
  [generatedFoodPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "food update dates and official sources"],
  [html.includes('href="/food"'), "homepage links food hub"],
  [itineraryDetail.includes('/food/harbour-dining') && itineraryDetail.includes('/food/brunch-cafes') && itineraryDetail.includes('/food/by-area'), "5n6d links food guides"],
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
