function initTravelPrep() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  menuButton?.addEventListener("click", () => {
    const open = header?.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(open)));
  });
  document.querySelectorAll(".mobile-menu a").forEach((link) => link.addEventListener("click", () => header?.classList.remove("menu-open")));

  const pageKey = document.body.dataset.prepPage || "hub";
  const storageKey = `sydneyPickPrep:${pageKey}`;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { state = {}; }
  const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} };
  document.querySelectorAll("[data-prep-check]").forEach((input) => {
    input.checked = Boolean(state[input.dataset.prepCheck]);
    input.addEventListener("change", () => { state[input.dataset.prepCheck] = input.checked; save(); });
  });
  document.querySelector("[data-reset-prep]")?.addEventListener("click", () => {
    state = {}; save();
    document.querySelectorAll("[data-prep-check]").forEach((input) => { input.checked = false; });
  });
  document.querySelector("[data-print-prep]")?.addEventListener("click", () => window.print());
  document.querySelector("[data-share-prep]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
      button.textContent = navigator.share ? "공유 완료" : "링크 복사 완료";
    } catch (error) { if (error?.name !== "AbortError") button.textContent = "공유할 수 없어요"; }
  });

  const customForm = document.querySelector("[data-custom-item-form]");
  const customList = document.querySelector("[data-custom-items]");
  let customItems = [];
  try { customItems = JSON.parse(localStorage.getItem(`${storageKey}:custom`) || "[]"); } catch { customItems = []; }
  const renderCustom = () => {
    if (!customList) return;
    customList.innerHTML = customItems.map((item, index) => `<label><input type="checkbox" data-custom-index="${index}" ${item.done ? "checked" : ""}> <span>${item.text.replace(/[<>&]/g, "")}</span></label>`).join("");
    customList.querySelectorAll("[data-custom-index]").forEach((input) => input.addEventListener("change", () => {
      customItems[Number(input.dataset.customIndex)].done = input.checked;
      try { localStorage.setItem(`${storageKey}:custom`, JSON.stringify(customItems)); } catch {}
    }));
  };
  customForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const field = customForm.querySelector("input");
    const text = field?.value.trim();
    if (!text) return;
    customItems.push({ text, done: false });
    try { localStorage.setItem(`${storageKey}:custom`, JSON.stringify(customItems)); } catch {}
    field.value = ""; renderCustom();
  });
  renderCustom();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initTravelPrep, { once: true });
  else initTravelPrep();
}
