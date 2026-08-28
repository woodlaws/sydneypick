import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ["index.html", "styles.css", "robots.txt", "sitemap.xml"]) {
  try { await cp(join(root, file), join(out, file)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
for (const route of ["schedule", "areas", "prepare", "shopping", "magazine"]) {
  await cp(join(root, "index.html"), join(out, `${route}.html`));
}
await mkdir(join(out, "assets"), { recursive: true });
await cp(join(root, "src", "site.js"), join(out, "assets", "site.js"));
try { await cp(join(root, "public"), join(out, "public"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
console.log("Built dist/");
