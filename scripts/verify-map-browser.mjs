const port = process.env.CDP_PORT || "9224";
const targets = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
const target = targets.find((item) => item.type === "page" && item.url.includes("/map"));
if (!target) throw new Error("Map page target not found");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
});
const command = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const metrics = async (width, height) => {
  await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  await command("Page.reload", { ignoreCache: true });
  await new Promise((resolve) => setTimeout(resolve, 500));
  return evaluate(`(() => {
    const rect = (selector) => { const node = document.querySelector(selector); const box = node?.getBoundingClientRect(); return box ? { left: box.left, right: box.right, width: box.width, top: box.top } : null; };
    return { innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, scrollX, hero: rect('.map-hero'), map: rect('.map-canvas'), results: rect('.map-results'), selected: document.querySelector('[data-selected-title]')?.textContent, count: document.querySelector('[data-result-count]')?.textContent, visibleCards: [...document.querySelectorAll('[data-place-id]')].filter((node) => !node.hidden).length };
  })()`);
};
const desktop = await metrics(1440, 1000);
const mobile = await metrics(390, 844);
const interaction = await evaluate(`(async () => {
  document.querySelector('[data-region-select="bondi"]').click();
  await new Promise((resolve) => setTimeout(resolve, 50));
  const selected = { url: location.href, title: document.querySelector('[data-selected-title]').textContent, visible: [...document.querySelectorAll('[data-place-id]')].filter((node) => !node.hidden).length };
  history.back();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const back = { url: location.href, title: document.querySelector('[data-selected-title]').textContent, visible: [...document.querySelectorAll('[data-place-id]')].filter((node) => !node.hidden).length };
  return { selected, back };
})()`);
const allRegions = await evaluate(`(() => window.__SYDNEY_MAP__.regions.map(({ id }) => {
  document.querySelector('[data-region-select="' + id + '"]').click();
  return { id, title: document.querySelector('[data-selected-title]').textContent, visible: [...document.querySelectorAll('[data-place-id]')].filter((node) => !node.hidden).length, url: location.search };
}))()`);
const accessibility = await evaluate(`(() => {
  const marker = document.querySelector('[data-region-marker="city-harbour"]');
  marker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  document.querySelector('[data-detail="sydney-opera-house"]').click();
  const result = { markerTitle: document.querySelector('[data-selected-title]').textContent, dialogOpen: document.querySelector('[data-map-dialog]').open, dialogTitle: document.querySelector('[data-dialog-content] h2')?.textContent };
  document.querySelector('[data-map-dialog]').close();
  return result;
})()`);
socket.close();
const checks = [
  [desktop.innerWidth === 1440 && desktop.scrollWidth === desktop.clientWidth && desktop.bodyScrollWidth === desktop.clientWidth, "desktop has no horizontal overflow"],
  [mobile.innerWidth === 390 && mobile.scrollWidth === mobile.clientWidth && mobile.bodyScrollWidth === mobile.clientWidth, "390px mobile has no horizontal overflow"],
  [mobile.map.left >= 0 && mobile.map.right <= 390 && mobile.results.left >= 0 && mobile.results.right <= 390, "mobile map and results stay inside viewport"],
  [interaction.selected.url.includes("region=bondi") && interaction.selected.title.includes("본다이") && interaction.selected.visible === 3, "region click updates URL and three cards"],
  [interaction.back.url.includes("region=manly") && interaction.back.title.includes("맨리") && interaction.back.visible === 3, "browser back restores prior region"],
  [allRegions.length === 9 && allRegions.every(({ visible, url }) => visible === 3 && url.includes("region=")), "all nine region controls show their matching places"],
  [accessibility.markerTitle.includes("시티") && accessibility.dialogOpen && accessibility.dialogTitle === "시드니 오페라하우스", "keyboard marker selection and detail dialog work"],
];
for (const [ok, label] of checks) {
  if (!ok) throw new Error(`Browser verification failed: ${label}\n${JSON.stringify({ desktop, mobile, interaction }, null, 2)}`);
  console.log(`✓ ${label}`);
}
console.log(JSON.stringify({ desktop, mobile, interaction, allRegions, accessibility }, null, 2));
