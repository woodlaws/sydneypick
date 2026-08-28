import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const rootFlag = args.indexOf("--root");
const requestedRoot = rootFlag >= 0 ? args[rootFlag + 1] : ".";
const root = resolve(process.cwd(), requestedRoot);
const portFlag = args.indexOf("--port");
const port = Number(portFlag >= 0 ? args[portFlag + 1] : process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const target = normalize(join(root, relative));
  if (target !== root && !target.startsWith(root + sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  try {
    let body = await readFile(target);
    if (extname(target) === ".html") body = Buffer.from(body.toString().replaceAll("__OG_IMAGE__", `http://${request.headers.host}/public/og.png`));
    response.writeHead(200, { "content-type": types[extname(target)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
