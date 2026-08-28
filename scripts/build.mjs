import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");
const config = JSON.parse(await readFile(join(root, "site.config.json"), "utf8"));
const render = (html) => html.replaceAll("__SITE_URL__", config.siteUrl).replaceAll("__LAST_UPDATED__", config.lastUpdated);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ["index.html", "styles.css", "robots.txt", "sitemap.xml"]) {
  try { await cp(join(root, file), join(out, file)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
for (const route of ["schedule", "areas", "prepare", "shopping", "magazine"]) {
  await cp(join(root, "index.html"), join(out, `${route}.html`));
}
await writeFile(join(out, "itineraries.html"), render(await readFile(join(root, "pages", "itineraries.html"), "utf8")));
await mkdir(join(out, "itineraries"), { recursive: true });
await writeFile(join(out, "itineraries", "sydney-5n6d.html"), render(await readFile(join(root, "pages", "sydney-5n6d.html"), "utf8")));
await cp(join(root, "styles-pages.css"), join(out, "styles-pages.css"));
await mkdir(join(out, "assets"), { recursive: true });
await cp(join(root, "src", "site.js"), join(out, "assets", "site.js"));
await cp(join(root, "src", "itineraries.js"), join(out, "assets", "itineraries.js"));
try { await cp(join(root, "public"), join(out, "public"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
console.log("Built dist/");
