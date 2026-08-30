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

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu a");
  navLinks.forEach((link) => {
    const linkPath = new URL(link.href, location.origin).pathname.replace(/\/+$/, "") || "/";
    const isCurrent = linkPath === "/" ? currentPath === "/" : currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  document.querySelectorAll("[data-cta]").forEach((element) => {
    element.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("sydneypick:cta", { detail: { action: element.dataset.cta, location: element.dataset.ctaLocation || "unknown" } }));
    });
  });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAccessibility, { once: true });
  else initAccessibility();
}
