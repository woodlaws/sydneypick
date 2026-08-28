import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { areaGuides, renderAreaGuide } from "./area-guides.mjs";
import { travelPrepPages, renderTravelPrepHub, renderTravelPrepPage } from "./travel-prep-pages.mjs";
import { foodPages, renderFoodHub, renderFoodPage } from "./food-pages.mjs";
import { shoppingPages, renderShoppingHub, renderShoppingPage } from "./shopping-pages.mjs";
import { loadMagazinePosts, magazineCategories, renderMagazineHub, renderMagazineCategory, renderMagazineSearch, renderMagazinePost, renderAuthorPage, renderNotFound, renderRss } from "./magazine-pages.mjs";
import { renderFreeGuide, renderGuideComplete, renderGuideSample, renderPrivacy } from "./lead-pages.mjs";

const root = process.cwd();
const out = join(root, "dist");
const config = JSON.parse(await readFile(join(root, "site.config.json"), "utf8"));
const leadConfig = JSON.parse(await readFile(join(root, "lead.config.json"), "utf8"));
leadConfig.formEndpoint = process.env.FORM_ENDPOINT?.trim() || leadConfig.formEndpoint;
const magazinePosts = await loadMagazinePosts(root);
const render = (html) => html.replaceAll("__SITE_URL__", config.siteUrl).replaceAll("__LAST_UPDATED__", config.lastUpdated).replaceAll('href="/#prepare"', 'href="/travel-prep"').replaceAll('href="/#food"', 'href="/food"').replaceAll('href="/#shopping"', 'href="/shopping"').replaceAll('href="/#magazine"', 'href="/magazine"').replaceAll('href="/#guide"', 'href="/free-guide"').replaceAll('href="#guide"', 'href="/free-guide"').replaceAll('<p>기념품과 호주 선물 준비</p>', '<p><a href="/shopping">쇼핑픽에서 선물 기준 확인</a></p>').replaceAll('<p>일정과 위치에 따라 SDF 방문 검토</p>', '<p><a href="/shopping/sdf">일정과 위치에 따라 SDF 방문 검토</a></p>');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ["styles.css", "robots.txt", "sitemap.xml"]) {
  try { await cp(join(root, file), join(out, file)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
await writeFile(join(out, "index.html"), render(await readFile(join(root, "index.html"), "utf8")));
for (const route of ["schedule", "prepare"]) {
  await cp(join(root, "index.html"), join(out, `${route}.html`));
}
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
await writeFile(join(out, "magazine.html"), render(renderMagazineHub(magazinePosts)));
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
await writeFile(join(out, "404.html"), render(renderNotFound()));
await writeFile(join(out, "rss.xml"), renderRss(magazinePosts, config.siteUrl));
const publishedMagazineUrls = [
  "/magazine",
  "/magazine/search",
  "/authors/editor",
  ...magazineCategories.map(({ slug }) => `/magazine/category/${slug}`),
  ...magazinePosts.filter(({ status }) => status === "published").map(({ slug }) => `/magazine/${slug}`),
  "/free-guide",
  "/free-guide/sample",
  "/privacy",
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
await mkdir(join(out, "assets"), { recursive: true });
await cp(join(root, "src", "site.js"), join(out, "assets", "site.js"));
await cp(join(root, "src", "itineraries.js"), join(out, "assets", "itineraries.js"));
await cp(join(root, "src", "travel-prep.js"), join(out, "assets", "travel-prep.js"));
await cp(join(root, "src", "food.js"), join(out, "assets", "food.js"));
await cp(join(root, "src", "shopping.js"), join(out, "assets", "shopping.js"));
await cp(join(root, "src", "magazine.js"), join(out, "assets", "magazine.js"));
await cp(join(root, "src", "free-guide.js"), join(out, "assets", "free-guide.js"));
try { await cp(join(root, "public"), join(out, "public"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
console.log("Built dist/");
