import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { areaGuides, renderAreaGuide } from "./area-guides.mjs";
import { travelPrepPages, renderTravelPrepHub, renderTravelPrepPage } from "./travel-prep-pages.mjs";
import { foodPages, renderFoodHub, renderFoodPage } from "./food-pages.mjs";
import { shoppingPages, renderShoppingHub, renderShoppingPage } from "./shopping-pages.mjs";
import { loadMagazinePosts, magazineCategories, renderMagazineHubV2, renderMagazineCategory, renderMagazineSearch, renderMagazinePost, renderAuthorPage, renderNotFound, renderRss } from "./magazine-pages.mjs";
import { renderFreeGuide, renderGuideComplete, renderGuideSample, renderPrivacy } from "./lead-pages.mjs";
import { renderAbout, renderOperator, renderEditorialPolicy, renderPartnership, renderContact } from "./trust-pages.mjs";

const root = process.cwd();
const out = join(root, "dist");
const config = JSON.parse(await readFile(join(root, "site.config.json"), "utf8"));
const leadConfig = JSON.parse(await readFile(join(root, "lead.config.json"), "utf8"));
leadConfig.formEndpoint = process.env.FORM_ENDPOINT?.trim() || leadConfig.formEndpoint;
leadConfig.contactEndpoint = process.env.CONTACT_FORM_ENDPOINT?.trim() || leadConfig.contactEndpoint;
leadConfig.consultationUrl = process.env.CONSULTATION_URL?.trim() || leadConfig.consultationUrl || "/contact";
leadConfig.kakaoChannelUrl = process.env.KAKAO_CHANNEL_URL?.trim() || leadConfig.kakaoChannelUrl;
const magazinePosts = await loadMagazinePosts(root);
const commonFooter = `<footer class="site-footer"><div class="wrap footer-grid"><div class="footer-brand"><a class="brand" href="/" aria-label="시드니픽 홈"><strong>SYDNEY PICK</strong><span>시드니픽</span></a><p>한국인을 위한 시드니 자유여행 가이드.<br>더 적게 헤매고, 더 오래 기억하세요.</p></div><nav aria-label="브랜드"><strong>브랜드</strong><a href="/about">시드니픽 소개</a><a href="/about/hunsoo-lim">운영자 임헌수</a><a href="/editorial-policy">편집 기준</a></nav><nav aria-label="콘텐츠"><strong>콘텐츠</strong><a href="/itineraries">여행 일정</a><a href="/areas">지역별 픽</a><a href="/food">맛집·카페</a><a href="/travel-prep">여행 준비</a><a href="/shopping">쇼핑픽</a><a href="/magazine">픽 매거진</a></nav><nav aria-label="지원"><strong>지원</strong><a href="/free-guide">무료 여행 가이드</a><a href="/partnership">제휴·광고</a><a href="/contact">문의하기</a><a href="/privacy">개인정보처리방침</a></nav></div><div class="wrap footer-bottom"><p>© 2026 SYDNEY PICK. 변경 가능한 정보는 예약·방문 전 공식 채널을 확인하세요.</p><div><a href="https://www.sydney.com/" target="_blank" rel="noopener noreferrer">Destination NSW</a><a href="https://transportnsw.info/" target="_blank" rel="noopener noreferrer">Transport for NSW</a></div></div></footer>`;
function replaceSiteFooter(html) {
  const start = html.lastIndexOf("<footer");
  const end = html.indexOf("</footer>", start);
  return start >= 0 && end >= 0 ? `${html.slice(0, start)}${commonFooter}${html.slice(end + 9)}` : html;
}
function normalizeImages(html) {
  let first = true;
  return html.replace(/<img\b([^>]*)>/g, (tag, attrs) => {
    const isPriority = first;
    first = false;
    let next = attrs;
    if (!/\bdecoding=/.test(next)) next += ' decoding="async"';
    if (isPriority) {
      if (!/\bfetchpriority=/.test(next)) next += ' fetchpriority="high"';
    } else if (!/\bloading=/.test(next)) next += ' loading="lazy"';
    return `<img${next}>`;
  });
}
function normalizeSiteHeader(html) {
  return html.replace(/<header class="site-header">(?!\s*<div class="site-header__inner">)([\s\S]*?)<\/header>/, '<header class="site-header"><div class="site-header__inner">$1</div></header>');
}
function normalizeArticleHero(html) {
  return html.replace(/<header class="article-header wrap">([\s\S]*?)<\/header><figure class="article-hero"><img([^>]*)><figcaption>([^<]*)<\/figcaption><\/figure>/, (_match, content, imageAttributes, credit) => {
    const heroContent = content.replace("<h1>", '<h1 class="detail-hero-title">').replace('<p class="article-deck">', '<p class="article-deck detail-hero-lead">');
    return `<header class="article-header detail-hero"><img class="detail-hero-image"${imageAttributes}><div class="wrap detail-hero-content">${heroContent}</div><span class="detail-hero-credit">${credit}</span></header>`;
  });
}
function render(html) {
  let output = html.replaceAll("__SITE_URL__", config.siteUrl).replaceAll("__LAST_UPDATED__", config.lastUpdated).replaceAll("__OG_IMAGE__", `${config.siteUrl}/public/og.png`).replaceAll("__CONSULTATION_URL__", leadConfig.consultationUrl).replaceAll('class="brand" href="#top"', 'class="brand" href="/"').replaceAll('href="/#areas"', 'href="/areas"').replaceAll('href="/#prepare"', 'href="/travel-prep"').replaceAll('href="/#food"', 'href="/food"').replaceAll('href="/#shopping"', 'href="/shopping"').replaceAll('href="/#magazine"', 'href="/magazine"').replaceAll('href="/#guide"', 'href="/free-guide"').replaceAll('href="#guide"', 'href="/free-guide"').replaceAll('https://unsplash.com/photos/cA8Oj_VuKKk/download?force=true&w=1200', 'https://images.unsplash.com/photo-1729936483375-e58027cfcdd2?auto=format&fit=crop&fm=jpg&q=82&w=1200').replaceAll('뉴사우스웨일스 해안의 푸른 바다와 모래사장', '포트스테판의 푸른 바다와 모래사장이 이어지는 해안 풍경').replaceAll('<p>기념품과 호주 선물 준비</p>', '<p><a href="/shopping">쇼핑픽에서 선물 기준 확인</a></p>').replaceAll('<p>일정과 위치에 따라 SDF 방문 검토</p>', '<p><a href="/shopping/sdf">일정과 위치에 따라 SDF 방문 검토</a></p>').replaceAll('확정되지 않은 개인 경력이나 방문 횟수 대신, 독자가 확인할 수 있는 제작 원칙과 업데이트 기준을 공개합니다.', '시드니픽 편집팀은 운영자 임헌수와 함께 확인 가능한 여행 경험, 공식 출처와 업데이트 기준을 공개합니다.').replaceAll('<h2>운영자 실제 정보 입력 영역</h2><p>이름·소개·프로필 이미지·담당 분야·연락 채널은 운영자가 확인한 자료를 받은 뒤 공개합니다.</p></div><span>자료 확인 후 업데이트</span>', '<h2>운영자 임헌수</h2><p>2023년 시드니를 14박 15일 동안 여행한 경험과 AI·마케팅 콘텐츠 운영 기준을 바탕으로 시드니픽을 운영합니다.</p><a href="/about/hunsoo-lim">운영자 소개 확인 →</a></div><span>실제 사진 입력 필요</span>');
  output = output.replaceAll('target="_blank" rel="noreferrer"', 'target="_blank" rel="noopener noreferrer"');
  output = output.replace(/<a(?![^>]*data-cta)([^>]*href="\/contact"[^>]*)>/g, '<a data-cta="inquiry" data-cta-location="site"$1>');
  output = output.replace(/<a(?![^>]*data-cta)([^>]*href="\/free-guide"[^>]*)>/g, '<a data-cta="free-guide" data-cta-location="site"$1>');
  output = output.replace(/<form class="lead-form" data-lead-form novalidate data-form-active="(true|false)">/, '<form class="lead-form" data-lead-form method="post" action="/free-guide/submit-disabled" novalidate data-form-active="$1" aria-describedby="lead-form-message">').replace(/<form class="contact-form" data-contact-form data-form-active="(true|false)" novalidate>/, '<form class="contact-form" data-contact-form data-form-active="$1" method="post" action="/contact/submit-disabled" novalidate aria-describedby="contact-form-message">').replace('<p class="form-message" data-form-message', '<p class="form-message" id="lead-form-message" data-form-message').replace('<p class="contact-message" data-contact-message', '<p class="contact-message" id="contact-form-message" data-contact-message');
  if (output.includes('data-form-active="false"')) output = output.replace(/(<button[^>]+data-(?:submit-button|contact-submit))>/, '$1 disabled aria-disabled="true">');
  if (output.includes('<meta name="robots" content="noindex')) output = output.replace(/<link rel="canonical"[^>]*>/, "");
  if (!output.includes('name="twitter:card"')) output = output.replace("</head>", '<meta name="twitter:card" content="summary_large_image"></head>');
  if (!output.includes('rel="manifest"')) output = output.replace("</head>", '<link rel="manifest" href="/public/site.webmanifest"></head>');
  if (!output.includes('/assets/accessibility.js')) output = output.replace("</body>", '<script src="/assets/accessibility.js" defer></script></body>');
  return normalizeImages(normalizeArticleHero(normalizeSiteHeader(replaceSiteFooter(output))));
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ["styles.css", "robots.txt", "sitemap.xml"]) {
  try { await cp(join(root, file), join(out, file)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
await writeFile(join(out, "index.html"), render(await readFile(join(root, "index.html"), "utf8")));
await writeFile(join(out, "itineraries.html"), render(await readFile(join(root, "pages", "itineraries.html"), "utf8")));
await mkdir(join(out, "itineraries"), { recursive: true });
await writeFile(join(out, "itineraries", "sydney-5n6d.html"), render(await readFile(join(root, "pages", "sydney-5n6d.html"), "utf8")));
await writeFile(join(out, "areas.html"), render(await readFile(join(root, "pages", "areas.html"), "utf8")));
await mkdir(join(out, "areas"), { recursive: true });
await writeFile(join(out, "areas", "circular-quay.html"), render(await readFile(join(root, "pages", "circular-quay.html"), "utf8")));
await writeFile(join(out, "areas", "sydney-opera-house.html"), render(await readFile(join(root, "pages", "sydney-opera-house.html"), "utf8")));
for (const guide of areaGuides) {
  await writeFile(join(out, "areas", `${guide.slug}.html`), render(renderAreaGuide(guide)));
}
await writeFile(join(out, "travel-prep.html"), render(renderTravelPrepHub()));
await mkdir(join(out, "travel-prep"), { recursive: true });
for (const page of travelPrepPages) {
  await writeFile(join(out, "travel-prep", `${page.slug}.html`), render(renderTravelPrepPage(page)));
}
await writeFile(join(out, "food.html"), render(renderFoodHub()));
await mkdir(join(out, "food"), { recursive: true });
for (const page of foodPages) {
  await writeFile(join(out, "food", `${page.slug}.html`), render(renderFoodPage(page)));
}
await writeFile(join(out, "shopping.html"), render(renderShoppingHub()));
await mkdir(join(out, "shopping"), { recursive: true });
for (const page of shoppingPages) {
  await writeFile(join(out, "shopping", `${page.slug}.html`), render(renderShoppingPage(page)));
}
await writeFile(join(out, "magazine.html"), render(renderMagazineHubV2(magazinePosts)));
await mkdir(join(out, "magazine", "category"), { recursive: true });
for (const category of magazineCategories) {
  await writeFile(join(out, "magazine", "category", `${category.slug}.html`), render(renderMagazineCategory(category, magazinePosts)));
}
await writeFile(join(out, "magazine", "search.html"), render(renderMagazineSearch(magazinePosts)));
for (const post of magazinePosts) {
  await writeFile(join(out, "magazine", `${post.slug}.html`), render(renderMagazinePost(post, magazinePosts)));
}
await mkdir(join(out, "authors"), { recursive: true });
await writeFile(join(out, "authors", "editor.html"), render(renderAuthorPage(magazinePosts)));
await writeFile(join(out, "free-guide.html"), render(renderFreeGuide(leadConfig)));
await mkdir(join(out, "free-guide"), { recursive: true });
await writeFile(join(out, "free-guide", "complete.html"), render(renderGuideComplete(leadConfig)));
await writeFile(join(out, "free-guide", "sample.html"), render(renderGuideSample()));
await writeFile(join(out, "privacy.html"), render(renderPrivacy(leadConfig)));
await writeFile(join(out, "about.html"), render(renderAbout()));
await mkdir(join(out, "about"), { recursive: true });
await writeFile(join(out, "about", "hunsoo-lim.html"), render(renderOperator(magazinePosts)));
await writeFile(join(out, "editorial-policy.html"), render(renderEditorialPolicy()));
await writeFile(join(out, "partnership.html"), render(renderPartnership()));
await writeFile(join(out, "contact.html"), render(renderContact(leadConfig)));
await writeFile(join(out, "404.html"), render(renderNotFound()));
await writeFile(join(out, "rss.xml"), renderRss(magazinePosts, config.siteUrl));
const publishedMagazineUrls = [
  "/magazine",
  "/authors/editor",
  ...magazineCategories.filter(({ slug }) => magazinePosts.some((post) => post.status === "published" && post.category === slug)).map(({ slug }) => `/magazine/category/${slug}`),
  ...magazinePosts.filter(({ status }) => status === "published").map(({ slug }) => `/magazine/${slug}`),
  "/free-guide",
  "/free-guide/sample",
  "/privacy",
  "/about",
  "/about/hunsoo-lim",
  "/editorial-policy",
  "/partnership",
  "/contact",
];
const magazineSitemap = publishedMagazineUrls.map((path) => `  <url><loc>${config.siteUrl}${path}</loc><lastmod>${config.lastUpdated}</lastmod></url>`).join("\n");
const baseSitemap = await readFile(join(root, "sitemap.xml"), "utf8");
await writeFile(join(out, "sitemap.xml"), baseSitemap.replace("</urlset>", `${magazineSitemap}\n</urlset>`));
await cp(join(root, "styles-pages.css"), join(out, "styles-pages.css"));
await cp(join(root, "styles-areas.css"), join(out, "styles-areas.css"));
await cp(join(root, "styles-prep.css"), join(out, "styles-prep.css"));
await cp(join(root, "styles-food.css"), join(out, "styles-food.css"));
await cp(join(root, "styles-shopping.css"), join(out, "styles-shopping.css"));
await cp(join(root, "styles-magazine.css"), join(out, "styles-magazine.css"));
await cp(join(root, "styles-leads.css"), join(out, "styles-leads.css"));
await cp(join(root, "styles-trust.css"), join(out, "styles-trust.css"));
await mkdir(join(out, "assets"), { recursive: true });
await cp(join(root, "src", "site.js"), join(out, "assets", "site.js"));
await cp(join(root, "src", "itineraries.js"), join(out, "assets", "itineraries.js"));
await cp(join(root, "src", "travel-prep.js"), join(out, "assets", "travel-prep.js"));
await cp(join(root, "src", "food.js"), join(out, "assets", "food.js"));
await cp(join(root, "src", "shopping.js"), join(out, "assets", "shopping.js"));
await cp(join(root, "src", "magazine.js"), join(out, "assets", "magazine.js"));
await cp(join(root, "src", "free-guide.js"), join(out, "assets", "free-guide.js"));
await cp(join(root, "src", "contact.js"), join(out, "assets", "contact.js"));
await cp(join(root, "src", "accessibility.js"), join(out, "assets", "accessibility.js"));
try { await cp(join(root, "public"), join(out, "public"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
console.log("Built dist/");
