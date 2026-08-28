function initAccessibility() {
  const header = document.querySelector(".site-header");
  const button = header?.querySelector(".menu-toggle");
  const menu = header?.querySelector(".mobile-menu");
  if (button && menu) {
    button.setAttribute("aria-controls", menu.id || "mobile-menu");
    if (!menu.id) menu.id = "mobile-menu";
    const syncLabel = () => button.setAttribute("aria-label", button.getAttribute("aria-expanded") === "true" ? "메뉴 닫기" : "메뉴 열기");
    new MutationObserver(syncLabel).observe(button, { attributes: true, attributeFilter: ["aria-expanded"] });
    syncLabel();
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || button.getAttribute("aria-expanded") !== "true") return;
      header.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
      button.focus();
    });
  }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAccessibility, { once: true });
  else initAccessibility();
}
