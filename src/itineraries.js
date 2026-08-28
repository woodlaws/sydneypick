function initItineraryPages() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  menuButton?.addEventListener("click", () => {
    const open = header?.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(open)));
  });
  document.querySelectorAll(".mobile-menu a").forEach((link) => link.addEventListener("click", () => header?.classList.remove("menu-open")));

  const dayLinks = [...document.querySelectorAll("[data-day-link]")];
  const daySections = [...document.querySelectorAll("[data-day]")];
  if (dayLinks.length && daySections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      dayLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.45] });
    daySections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll("[data-copy-plan]").forEach((copyButton) => copyButton.addEventListener("click", async () => {
    const text = daySections.map((section) => section.innerText.trim()).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "일정이 복사됐어요";
    } catch {
      copyButton.textContent = "복사할 수 없어요";
    }
  }));

  document.querySelectorAll("[data-share]").forEach((shareButton) => shareButton.addEventListener("click", async () => {
    const shareData = { title: document.title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
      shareButton.textContent = navigator.share ? "공유 완료" : "링크가 복사됐어요";
    } catch (error) {
      if (error?.name !== "AbortError") shareButton.textContent = "공유할 수 없어요";
    }
  }));

  const storeKey = "sydneyPick5n6dChecks";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch { saved = {}; }
  document.querySelectorAll("[data-visit-check]").forEach((checkbox) => {
    checkbox.checked = Boolean(saved[checkbox.dataset.visitCheck]);
    checkbox.addEventListener("change", () => {
      saved[checkbox.dataset.visitCheck] = checkbox.checked;
      try { localStorage.setItem(storeKey, JSON.stringify(saved)); } catch {}
    });
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initItineraryPages, { once: true });
  else initItineraryPages();
}
