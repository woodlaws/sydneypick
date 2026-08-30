import { readFile, access } from "node:fs/promises";
import { areaGuides, renderAreaGuide } from "./area-guides.mjs";
import { travelPrepPages, renderTravelPrepHub, renderTravelPrepPage } from "./travel-prep-pages.mjs";
import { foodPages, restaurantFieldSchema, restaurantRecords, renderFoodHub, renderFoodPage } from "./food-pages.mjs";
import { shoppingPages, shoppingProductSchema, shoppingProducts, sdfStoreData, renderShoppingHub, renderShoppingPage } from "./shopping-pages.mjs";
import { loadMagazinePosts, magazineCategories, renderMagazineHub, renderMagazineCategory, renderMagazineSearch, renderMagazinePost, renderAuthorPage, renderNotFound, renderRss } from "./magazine-pages.mjs";
import { renderFreeGuide, renderGuideComplete, renderGuideSample, renderPrivacy } from "./lead-pages.mjs";
import { renderAbout, renderOperator, renderEditorialPolicy, renderPartnership, renderContact } from "./trust-pages.mjs";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("src/site.js", "utf8");
const itineraryHub = await readFile("pages/itineraries.html", "utf8");
const itineraryDetail = await readFile("pages/sydney-5n6d.html", "utf8");
const itineraryJs = await readFile("src/itineraries.js", "utf8");
const pagesCss = await readFile("styles-pages.css", "utf8");
const areasHub = await readFile("pages/areas.html", "utf8");
const circularQuay = await readFile("pages/circular-quay.html", "utf8");
const operaHouse = await readFile("pages/sydney-opera-house.html", "utf8");
const areasCss = await readFile("styles-areas.css", "utf8");
const generatedAreaPages = areaGuides.map(renderAreaGuide);
const prepHub = renderTravelPrepHub();
const generatedPrepPages = travelPrepPages.map(renderTravelPrepPage);
const prepJs = await readFile("src/travel-prep.js", "utf8");
const prepCss = await readFile("styles-prep.css", "utf8");
const foodHub = renderFoodHub();
const generatedFoodPages = foodPages.map(renderFoodPage);
const foodJs = await readFile("src/food.js", "utf8");
const foodCss = await readFile("styles-food.css", "utf8");
const shoppingHub = renderShoppingHub();
const generatedShoppingPages = shoppingPages.map(renderShoppingPage);
const shoppingJs = await readFile("src/shopping.js", "utf8");
const shoppingCss = await readFile("styles-shopping.css", "utf8");
const magazinePosts = await loadMagazinePosts();
const magazineHub = renderMagazineHub(magazinePosts);
const magazineCategoriesHtml = magazineCategories.map((category) => renderMagazineCategory(category, magazinePosts));
const magazineSearch = renderMagazineSearch(magazinePosts);
const magazineDetails = magazinePosts.map((post) => renderMagazinePost(post, magazinePosts));
const magazineAuthor = renderAuthorPage(magazinePosts);
const magazineNotFound = renderNotFound();
const magazineRss = renderRss(magazinePosts, "https://sydneypick.com");
const magazineJs = await readFile("src/magazine.js", "utf8");
const magazineCss = await readFile("styles-magazine.css", "utf8");
const leadConfig = JSON.parse(await readFile("lead.config.json", "utf8"));
const freeGuide = renderFreeGuide(leadConfig);
const guideComplete = renderGuideComplete(leadConfig);
const guideSample = renderGuideSample();
const privacy = renderPrivacy(leadConfig);
const freeGuideJs = await readFile("src/free-guide.js", "utf8");
const leadCss = await readFile("styles-leads.css", "utf8");
const about = renderAbout();
const operator = renderOperator(magazinePosts);
const editorialPolicy = renderEditorialPolicy();
const partnership = renderPartnership();
const contact = renderContact(leadConfig);
const contactJs = await readFile("src/contact.js", "utf8");
const trustCss = await readFile("styles-trust.css", "utf8");
const buildScript = await readFile("scripts/build.mjs", "utf8");
const assertions = [
  [html.includes('lang="ko"'), "Korean document language"],
  [html.includes('name="viewport"'), "mobile viewport"],
  [html.includes('https://sydneypick.com/'), "canonical domain"],
  [html.includes('application/ld+json'), "structured data"],
  [html.includes('id="schedule"') && html.includes('id="areas"') && html.includes('id="sdf"'), "requested section structure"],
  [html.indexOf('id="schedule"') < html.indexOf('id="areas"') && html.indexOf('id="areas"') < html.indexOf('id="prepare"'), "content order"],
  [html.includes("FIRST PICK") && html.includes("5박 6일"), "first-pick itinerary"],
  [html.includes('class="home-hero-title"><span>처음 가는 시드니,</span><span>실패 없는 선택</span>') && html.includes('class="home-section-title"'), "dedicated home hero and section title structure"],
  [css.includes('.home-hero-title{width:100%;max-width:900px') && css.includes('.home-section-title{max-width:760px') && !css.includes('h1{margin:0;font-size'), "home title sizing is scoped and global H1 sizing removed"],
  [html.includes("transportnsw.info") && html.includes("sydney.com"), "official travel sources"],
  [css.includes("@media(max-width:600px)"), "mobile reflow"],
  [css.includes("aspect-ratio:16/9") && css.includes("aspect-ratio:3/2") && css.includes("aspect-ratio:4/3"), "varied image ratios"],
  [css.includes("prefers-reduced-motion"), "reduced motion support"],
  [js.includes("siteContent") && js.includes("renderPlan"), "structured interactive content"],
  [html.includes('/assets/site.js') && !html.includes('/app.js'), "browser code is loaded only from static assets"],
  [js.includes('typeof document !== "undefined"'), "browser bootstrap is guarded from server imports"],
  [itineraryHub.includes("내 여행에 맞는") && itineraryHub.includes("ItemList"), "itinerary hub content and schema"],
  [itineraryHub.includes('class="itinerary-hero-title"><span>내 여행에 맞는</span><span>시드니 일정</span>') && itineraryHub.includes('class="lead itinerary-hero-lead"'), "dedicated itinerary hero title and lead structure"],
  [pagesCss.includes('.itinerary-hero-title{width:100%;max-width:900px') && !pagesCss.includes('.page-hero h1{margin:0;font-size'), "itinerary typography is scoped and shared page hero has no oversized title"],
  [itineraryDetail.includes("처음 가는 시드니") && itineraryDetail.includes('"@type":"Article"'), "5n6d detail content and schema"],
  [[itineraryDetail, itineraryHub].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per itinerary page"],
  [itineraryJs.includes('typeof document !== "undefined"'), "itinerary browser bootstrap is guarded"],
  [[areasHub, circularQuay, operaHouse].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per area page"],
  [areasHub.includes("ItemList") && circularQuay.includes('"@type":"Place"') && operaHouse.includes('"@type":"TouristAttraction"'), "area structured data"],
  [circularQuay.includes('"@type":"FAQPage"') && operaHouse.includes('"@type":"FAQPage"'), "visible FAQ schema"],
  [circularQuay.includes("transportnsw.info") && operaHouse.includes("sydneyoperahouse.com"), "official source buttons"],
  [areasHub.includes("상세 콘텐츠 준비 중") && !areasHub.includes('/areas/darling-harbour') && !areasHub.includes('/areas/port-stephens'), "no fabricated detail routes"],
  [areasCss.includes("aspect-ratio:16/9") && areasCss.includes("aspect-ratio:3/2") && areasCss.includes("aspect-ratio:4/3"), "varied area image ratios"],
  [!areasHub.includes("document.") && !circularQuay.includes("document.") && !operaHouse.includes("document."), "area HTML has no server-side browser execution"],
  [areaGuides.length === 4 && new Set(areaGuides.map((guide) => guide.slug)).size === 4, "four unique regional guide routes"],
  [generatedAreaPages.every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1 && page.includes('"@type":"FAQPage"')), "generated guides have one H1 and FAQ schema"],
  [generatedAreaPages.every((page) => page.includes("BreadcrumbList") && (page.includes('"@type":"Place"') || page.includes('"@type":"TouristAttraction"'))), "generated guide structured data"],
  [new Set(areaGuides.flatMap((guide) => [guide.hero, guide.body])).size === areaGuides.length * 2, "regional guide images are not repeated"],
  [generatedAreaPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "updates and official sources"],
  [areasHub.includes('/areas/the-rocks') && areasHub.includes('/areas/bondi-beach') && areasHub.includes('/areas/manly') && areasHub.includes('/areas/blue-mountains'), "area hub links all new guides"],
  [itineraryDetail.includes('/areas/the-rocks') && itineraryDetail.includes('/areas/bondi-beach') && itineraryDetail.includes('/areas/manly') && itineraryDetail.includes('/areas/blue-mountains'), "5n6d links all new guides"],
  [travelPrepPages.length === 5 && new Set(travelPrepPages.map((page) => page.slug)).size === 5, "five unique travel-prep detail routes"],
  [[prepHub, ...generatedPrepPages].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per travel-prep page"],
  [generatedPrepPages.every((page) => page.includes("BreadcrumbList") && page.includes('"@type":"FAQPage"')), "travel-prep breadcrumb and visible FAQ schema"],
  [generatedPrepPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "travel-prep update dates and sources"],
  [prepHub.includes("10단계") && prepHub.includes("data-prep-check") && prepHub.includes("/travel-prep/checklist"), "travel-prep hub steps and local checklist"],
  [prepHub.includes('class="preparation-hero-title"><span>처음 가는 시드니</span><span>여행 준비 가이드</span>') && prepHub.includes('class="preparation-section-title"'), "travel-prep hub has dedicated title structures"],
  [prepCss.includes('.preparation-hero-title{width:100%;max-width:850px') && !prepCss.includes('.prep-hero{position:relative;min-height:560px;aspect-ratio'), "travel-prep hero typography is scoped and full bleed"],
  [prepJs.includes('typeof document !== "undefined"') && prepJs.includes("localStorage") && !prepJs.includes("fetch("), "travel-prep browser code is guarded and local only"],
  [generatedPrepPages.find((page) => page.includes("준비물 체크리스트"))?.includes("data-custom-item-form"), "custom checklist item support"],
  [html.includes('href="/travel-prep"'), "homepage links travel-prep hub"],
  [itineraryDetail.includes('/travel-prep/airport-to-city') && itineraryDetail.includes('/travel-prep/opal-card') && itineraryDetail.includes('/travel-prep/esim') && itineraryDetail.includes('/travel-prep/money-payment'), "5n6d links travel-prep guides"],
  [foodPages.length === 4 && new Set(foodPages.map((page) => page.slug)).size === 4, "four unique food detail routes"],
  [[foodHub, ...generatedFoodPages].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per food page"],
  [generatedFoodPages.every((page) => page.includes("BreadcrumbList") && page.includes('"@type":"FAQPage"')), "food breadcrumb and visible FAQ schema"],
  [!foodHub.includes('"@type":"Restaurant"') && generatedFoodPages.every((page) => !page.includes('"@type":"Restaurant"')), "no Restaurant schema without verified venues"],
  [restaurantRecords.length === 0 && Object.keys(restaurantFieldSchema).length === 18, "empty verified restaurant data and reusable field schema"],
  [foodHub.includes("에디터 확인 후 업데이트") && foodHub.includes("제휴 준비 중"), "editorial and affiliate status labels"],
  [foodHub.includes('class="food-hub-hero-title"><span>시드니 맛집과 카페,</span>') && foodCss.includes('.food-hub-hero-title{width:100%;max-width:920px') && !foodCss.includes('.food-hero{position:relative;min-height:590px;aspect-ratio'), "food hub hero typography is scoped and full bleed"],
  [foodJs.includes("dataFoodFilter") || foodJs.includes("foodFilter"), "food filter behavior"],
  [foodJs.includes("typeof document!=='undefined'") && !foodJs.includes("fetch("), "food browser code is server-safe"],
  [generatedFoodPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "food update dates and official sources"],
  [html.includes('href="/food"'), "homepage links food hub"],
  [itineraryDetail.includes('/food/harbour-dining') && itineraryDetail.includes('/food/brunch-cafes') && itineraryDetail.includes('/food/by-area'), "5n6d links food guides"],
  [shoppingPages.length === 5 && new Set(shoppingPages.map((page) => page.slug)).size === 5, "five unique shopping detail routes"],
  [[shoppingHub, ...generatedShoppingPages].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per shopping page"],
  [generatedShoppingPages.every((page) => page.includes("BreadcrumbList") && page.includes('"@type":"FAQPage"')), "shopping breadcrumb and visible FAQ schema"],
  [!shoppingHub.includes('"@type":"Product"') && generatedShoppingPages.every((page) => !page.includes('"@type":"Product"') && !page.includes('"@type":"LocalBusiness"')), "no Product or LocalBusiness schema without verified data"],
  [shoppingProducts.length === 0 && Object.keys(shoppingProductSchema).length === 16 && sdfStoreData.address === null, "empty verified shopping data and reusable schemas"],
  [shoppingHub.includes("편집 추천") && shoppingHub.includes("제휴 링크") && shoppingHub.includes("유료 광고") && shoppingHub.includes("SDF 취급상품"), "shopping disclosure labels"],
  [shoppingHub.includes('class="shopping-hub-hero-title"><span>호주 여행 쇼핑,</span>') && shoppingCss.includes('.shopping-hero .shopping-hub-hero-title{width:100%;max-width:850px'), "shopping hub hero typography is scoped"],
  [shoppingJs.includes("localStorage") && shoppingJs.includes("data-shopping-filter") && shoppingJs.includes("typeof document!=='undefined'") && !shoppingJs.includes("fetch("), "shopping interactions are local and server-safe"],
  [shoppingCss.includes("aspect-ratio:16/9") && shoppingCss.includes("@media(max-width:600px)"), "shopping image ratio and mobile layout"],
  [generatedShoppingPages.every((page) => page.includes("최종 업데이트: __LAST_UPDATED__") && page.includes("공식 정보 확인")), "shopping update dates and official sources"],
  [html.includes('href="/shopping"') && html.includes('href="/shopping/sdf"'), "homepage links shopping hub and SDF guide"],
  [html.includes('/shopping') && html.includes('/shopping/sdf') && (await readFile("scripts/build.mjs", "utf8")).includes('/shopping/sdf'), "homepage and DAY 6 build link shopping guides"],
  [magazinePosts.length === 6 && new Set(magazinePosts.map(({ slug }) => slug)).size === 6, "six unique magazine articles"],
  [magazinePosts.every((post) => ["title","slug","description","category","tags","author","publishedAt","updatedAt","heroImage","heroImageAlt","ogImage","featured","recommended","readingTime","sources","relatedPosts","relatedAreas","relatedItineraries","status","content"].every((field) => post[field] !== undefined)), "magazine content fields"],
  [magazineCategories.length === 9 && magazineCategories.every(({ slug }) => /^[a-z0-9-]+$/.test(slug)), "nine consistent magazine category slugs"],
  [[magazineHub, ...magazineDetails].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per magazine page"],
  [magazineHub.includes('class="mag-hero-content"') && magazineHub.includes('class="magazine-hero-title"') && magazineHub.includes('class="magazine-title-brand"') && magazineHub.includes('class="mag-category-nav-inner"'), "centered magazine hero and category navigation structure"],
  [magazineDetails.every((page) => page.includes('"@type":"Article"') && page.includes('"@type":"BreadcrumbList"') && page.includes('"@type":"FAQPage"')), "article, breadcrumb and visible FAQ schemas"],
  [magazinePosts.every((post) => post.toc.some(({ level }) => level === 2)) && magazineDetails.every((page) => page.includes('class="article-toc"')), "automatic H2 and H3 table of contents"],
  [magazineSearch.includes("window.__MAGAZINE_INDEX__") && magazineJs.includes("URLSearchParams") && magazineJs.includes("제목, 요약, 카테고리"), "client-side title summary category search"],
  [magazineJs.includes("typeof document!=='undefined'") && !magazineJs.includes("fetch("), "magazine browser code is static and server-safe"],
  [magazineCategoriesHtml.length === 9 && magazineCategoriesHtml.every((page) => (page.match(/<h1>/g) || []).length === 1), "category routes including empty states"],
  [magazineAuthor.includes("시드니픽 편집팀") && !magazineAuthor.includes("방문 횟수</"), "author page avoids invented credentials"],
  [magazineNotFound.includes("404") && magazineNotFound.includes("noindex"), "custom noindex 404 page"],
  [(magazineRss.match(/<item>/g) || []).length === 6, "RSS contains all published posts"],
  [magazineCss.includes("aspect-ratio:16/9") && magazineCss.includes("@media(max-width:600px)"), "magazine image ratio and mobile layout"],
  [html.includes('href="/magazine"') && html.includes('/magazine/sydney-opal-card-guide'), "homepage links magazine hub and real articles"],
  [[freeGuide, guideComplete, guideSample, privacy].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per free-guide and privacy page"],
  [freeGuide.includes('"@type":"FAQPage"') && freeGuide.includes('"@type":"BreadcrumbList"'), "free-guide visible FAQ and breadcrumb schema"],
  [guideComplete.includes('noindex,follow') && !guideComplete.includes('name="email"') && !guideComplete.includes('name="name"'), "completion page is noindex and contains no applicant data"],
  [guideSample.includes('data-print-guide') && guideSample.includes('5박 6일') && guideSample.includes('/shopping/checklist'), "printable web guide content"],
  [privacy.includes("운영정보 입력 필요") && privacy.includes("개인정보 수집 비활성"), "privacy policy blocks unconfirmed operations"],
  [leadConfig.formEndpoint === "" && leadConfig.privacyReady === false && freeGuide.includes('data-form-active="false"'), "lead collection disabled by default"],
  [freeGuide.includes('name="privacyConsent"') && freeGuide.includes('name="marketingConsent"') && !freeGuide.includes(" checked"), "separate unchecked required and optional consent"],
  [freeGuide.includes('type="email"') && freeGuide.includes('name="website"') && !freeGuide.includes('name="phone"'), "email validation and honeypot without phone collection"],
  [freeGuideJs.includes("typeof document !== 'undefined'") && freeGuideJs.includes("submitting") && freeGuideJs.includes("form.reportValidity()"), "server-safe form validation and duplicate-submit guard"],
  [freeGuideJs.includes("result.success !== true") && freeGuideJs.includes("sessionStorage.setItem('sydneyPickGuideComplete'") && !freeGuideJs.includes("console."), "confirmed success gate without applicant console logging"],
  [["free_guide_view","free_guide_form_start","free_guide_submit","free_guide_complete","guide_open","itinerary_click","shopping_click","sdf_click"].every((event) => freeGuideJs.includes(event)), "privacy-safe lead funnel event hooks"],
  [leadCss.includes("@media(max-width:600px)") && leadCss.includes("@media print") && leadCss.includes("@page"), "mobile form layout and print-to-PDF CSS"],
  [html.includes('href="/free-guide"') && !html.includes('href="#guide"'), "homepage guide CTAs use real route"],
  [[about, operator, editorialPolicy, partnership, contact].every((page) => (page.match(/<h1(?:\s|>)/g) || []).length === 1), "one H1 per trust page"],
  [[about, operator, editorialPolicy, partnership, contact].every((page) => page.includes('BreadcrumbList') && page.includes('rel="canonical"') && page.includes('property="og:title"')), "trust page SEO, breadcrumb and Open Graph"],
  [about.includes('"@type":"Organization"') && !about.includes('"telephone"') && !about.includes('"address"'), "Organization schema contains only confirmed fields"],
  [operator.includes('"@type":"Person"') && operator.includes('임헌수') && operator.includes('2023년') && operator.includes('14박 15일') && operator.includes('거상스쿨') && operator.includes('거상마케팅센터'), "operator page uses confirmed facts"],
  [operator.includes('실제 프로필 사진으로 교체 예정') && operator.includes('실제 시드니 여행 사진') && !operator.includes('시드니 최고 전문가'), "operator media placeholders and no inflated claim"],
  [editorialPolicy.includes('AI 활용과 사람의 검토') && editorialPolicy.includes('저작권과 이미지 출처') && editorialPolicy.includes('SDF 관련 콘텐츠 공개 원칙') && editorialPolicy.includes('광고·제휴·편집 추천을 구분'), "editorial and SDF disclosure principles"],
  [(partnership.match(/<article><span>\d{2}<\/span><div><h3>/g) || []).length === 10 && partnership.includes('가격표·노출수·성과 수치는') && partnership.includes('가짜 다운로드 버튼을 제공하지 않습니다'), "ten partnership products without fabricated pricing or file"],
  [leadConfig.contactEndpoint === "" && leadConfig.privacyReady === false && contact.includes('data-form-active="false"') && contact.includes('문의 기능 준비 중'), "contact collection disabled by default"],
  [contact.includes('name="privacyConsent"') && !contact.includes(' checked') && !contact.includes('type="file"') && contact.includes('파일 업로드 기능은 준비 중'), "contact consent is unchecked and upload is honest"],
  [contactJs.includes("typeof document!=='undefined'") && contactJs.includes("result.success!==true") && !contactJs.includes("console."), "contact form is server-safe and requires confirmed success"],
  [contactJs.includes("{detail:{event}}") && !contactJs.includes("detail:{event,email") && !contactJs.includes("detail:{event,name"), "contact analytics excludes personal data"],
  [trustCss.includes('@media(max-width:600px)') && trustCss.includes('aspect-ratio:4/5') && trustCss.includes('aspect-ratio:16/10'), "trust pages responsive layout and varied image ratios"],
  [["/about","/about/hunsoo-lim","/editorial-policy","/partnership","/contact","/privacy"].every((path) => buildScript.includes(`href="${path}"`)), "global footer contains all trust links"],
];
for (const [ok, label] of assertions) {
  if (!ok) throw new Error(`Check failed: ${label}`);
  console.log(`✓ ${label}`);
}
await access("public/og.png");
await access("public/favicon.svg");
await access("robots.txt");
await access("sitemap.xml");
await access("integrations/google-apps-script.example.js");
await access("integrations/google-apps-script-contact.example.js");
console.log("✓ social preview and SEO files");
