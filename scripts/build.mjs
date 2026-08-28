import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ["index.html", "styles.css", "app.js", "robots.txt", "sitemap.xml"]) {
  try { await cp(join(root, file), join(out, file)); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
try { await cp(join(root, "public"), join(out, "public"), { recursive: true }); } catch (error) { if (error.code !== "ENOENT") throw error; }
await mkdir(join(out, "server"), { recursive: true });
await writeFile(join(out, "server", "index.js"), `export default {
  async fetch(request, env) {
    if (env?.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if ((response.headers.get("content-type") || "").includes("text/html")) {
        const origin = new URL(request.url).origin;
        const html = (await response.text()).replaceAll("__OG_IMAGE__", origin + "/public/og.png");
        return new Response(html, response);
      }
      return response;
    }
    return new Response("Site assets unavailable", { status: 503 });
  }
};\n`);
console.log("Built dist/");
