import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.cwd());
const dist = join(root, "dist");
const mode = process.argv[2] || "all";
const failures = [];
const warnings = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);

async function walk(directory) {
  const output = [];
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    (await stat(path)).isDirectory() ? output.push(...await walk(path)) : output.push(path);
  }
  return output;
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => extname(file) === ".html");
const records = await Promise.all(htmlFiles.map(async (file) => ({ file, html: await readFile(file, "utf8") })));
const routeFor = (file) => {
  const path = relative(dist, file).split(sep).join("/");
  if (path === "index.html") return "/";
  return `/${path.replace(/\.html$/, "").replace(/\/index$/, "")}`;
};
const routeMap = new Map(records.map(({ file, html }) => [routeFor(file), { file, html }]));
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? null;
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>https:\/\/sydneypick\.com([^<]*)<\/loc>/g)].map((match) => match[1] || "/"));
const publicRoutes = [...routeMap.keys()].filter((route) => !["/404"].includes(route));

function checkLinks() {
  const bad = [];
  for (const [route, { html }] of routeMap) {
    for (const anchor of tags(html, "a")) {
      const href = attr(anchor, "href");
      if (href === null || href === "" || /^javascript:/i.test(href)) bad.push(`${route}: invalid href ${href ?? "missing"}`);
      if (href === "#schedule" || href === "#areas" || href === "/#schedule" || href === "/#areas") bad.push(`${route}: legacy anchor ${href}`);
      if (!href?.startsWith("/") || href.startsWith("//")) continue;
      const pathname = new URL(href, "https://sydneypick.com").pathname.replace(/\/$/, "") || "/";
      const asset = join(dist, pathname.replace(/^\//, ""));
      if (!routeMap.has(pathname) && !allFiles.includes(asset) && !allFiles.includes(`${asset}.html`)) bad.push(`${route}: missing ${pathname}`);
    }
  }
  bad.length ? bad.forEach(fail) : pass(`internal links (${records.length} HTML files)`);
}

function checkSeo() {
  const titles = new Map();
  for (const [route, { html }] of routeMap) {
    const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
    const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    if (!title) fail(`${route}: missing title`);
    if (route !== "/404" && !description) fail(`${route}: missing description`);
    if (h1Count !== 1) fail(`${route}: H1 count ${h1Count}`);
    if (!noindex && canonical !== `https://sydneypick.com${route === "/" ? "/" : route}`) fail(`${route}: canonical mismatch`);
    if (noindex && canonical) fail(`${route}: noindex page has canonical`);
    if (!noindex && (!html.includes('property="og:title"') || !html.includes('property="og:image"') || !html.includes('name="twitter:card"'))) fail(`${route}: incomplete social metadata`);
    if (noindex && sitemapUrls.has(route)) fail(`${route}: noindex route present in sitemap`);
    if (!noindex && route !== "/404") {
      if (titles.has(title)) fail(`${route}: duplicate title with ${titles.get(title)}`);
      titles.set(title, route);
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try { JSON.parse(match[1]); } catch (error) { fail(`${route}: invalid JSON-LD (${error.message})`); }
    }
  }
  if (!sitemapUrls.has("/magazine/search") && !sitemapUrls.has("/free-guide/complete") && !sitemapUrls.has("/404")) pass("noindex routes excluded from sitemap");
  if (!failures.some((item) => item.includes("title") || item.includes("canonical") || item.includes("JSON-LD") || item.includes("H1"))) pass("SEO and structured data");
}

function checkImages() {
  for (const [route, { html }] of routeMap) {
    const images = tags(html, "img");
    images.forEach((image, index) => {
      const source = attr(image, "src");
      if (!source) fail(`${route}: image without src`);
      if (attr(image, "alt") === null) fail(`${route}: image without alt`);
      if (!/\bdecoding=/.test(image)) fail(`${route}: image without decoding hint`);
      if (index > 0 && !/\bloading="lazy"/.test(image)) warnings.push(`${route}: non-primary image is not lazy`);
      if (source?.startsWith("/") && !allFiles.includes(join(dist, source.replace(/^\//, "")))) fail(`${route}: missing local image ${source}`);
    });
  }
  if (!failures.some((item) => item.includes("image"))) pass("image sources, alt text and loading hints");
}

async function checkRuntimeSafety() {
  const scripts = ["site.js", "itineraries.js", "travel-prep.js", "food.js", "shopping.js", "magazine.js", "free-guide.js", "contact.js", "accessibility.js"];
  for (const script of scripts) {
    try { await import(`${pathToFileURL(join(root, "src", script)).href}?audit=${Date.now()}`); }
    catch (error) { fail(`${script}: server import failed: ${error.message}`); }
  }
  if (!failures.some((item) => item.includes("server import"))) pass("browser scripts import safely without document/window");
}

function checkOperations() {
  const required = ["/about", "/about/hunsoo-lim", "/editorial-policy", "/partnership", "/contact", "/privacy"];
  required.forEach((route) => { if (!routeMap.has(route)) fail(`missing required route ${route}`); });
  const footerLinks = ["/about", "/about/hunsoo-lim", "/editorial-policy", "/itineraries", "/areas", "/food", "/travel-prep", "/shopping", "/magazine", "/free-guide", "/partnership", "/contact", "/privacy"];
  for (const [route, { html }] of routeMap) {
    footerLinks.forEach((href) => { if (!html.includes(`href="${href}"`)) fail(`${route}: common footer missing ${href}`); });
  }
  for (const route of ["/free-guide", "/contact"]) {
    const html = routeMap.get(route)?.html || "";
    if (!/<form[^>]+method="post"/i.test(html) || /<form[^>]+method="get"/i.test(html)) fail(`${route}: form is not POST-only`);
    if (!html.includes('data-form-active="false"') || !/<button[^>]+disabled/i.test(html)) fail(`${route}: inactive form is not disabled`);
  }
  if (!allFiles.some((file) => file.endsWith("site.webmanifest"))) fail("missing web manifest");
  if (!failures.some((item) => item.includes("required route") || item.includes("common footer") || item.includes("form") || item.includes("manifest"))) pass("required routes, common footer, forms and manifest");
}

if (["all", "links"].includes(mode)) checkLinks();
if (["all", "seo"].includes(mode)) checkSeo();
if (["all", "images"].includes(mode)) checkImages();
if (["all", "runtime"].includes(mode)) await checkRuntimeSafety();
if (mode === "all") checkOperations();
warnings.forEach((warning) => console.warn(`△ ${warning}`));
if (failures.length) {
  console.error(`\n${failures.length} audit failure(s):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(`\nAudit complete: ${records.length} HTML files, 0 failures.`);
}
