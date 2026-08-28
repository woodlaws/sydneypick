const siteContent = {
  itineraries: {
    4: { name: "3박 4일 · 핵심 코스", summary: "시드니의 아이콘과 해변을 빠르게", days: ["하버 아이콘", "본다이 코스트", "맨리 페리", "도심 & 출국"] },
    5: { name: "4박 5일 · 시드니 & 근교", summary: "대표 지역에 블루마운틴 하루를 더해", days: ["하버 아이콘", "본다이 코스트", "맨리 페리", "블루마운틴", "도심 & 출국"] },
    6: { name: "5박 6일 · FIRST PICK", summary: "하버, 해변, 로컬 동네, 근교 자연을 한 번씩 충분히", days: ["하버 아이콘", "본다이 코스트", "맨리 페리", "로컬 동네", "블루마운틴", "마지막 쇼핑 & 출국"] },
    8: { name: "7박 8일 · 여유 코스", summary: "시드니와 주변 지역을 느린 호흡으로", days: ["하버 아이콘", "본다이 코스트", "맨리 페리", "로컬 동네", "블루마운틴", "남부 해안", "자유 일정", "마지막 쇼핑 & 출국"] }
  }
};

function initSite() {
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
menuButton?.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
});
document.querySelectorAll(".mobile-menu a").forEach((link) => link.addEventListener("click", () => {
  header.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const route = document.querySelector("#day-route");
function renderPlan(dayCount = 6) {
  const plan = siteContent.itineraries[dayCount];
  document.querySelector("#itinerary-name").textContent = plan.name;
  document.querySelector("#itinerary-summary").textContent = plan.summary;
  route.innerHTML = plan.days.map((day, index) => `<li><b>DAY ${String(index + 1).padStart(2, "0")}</b><span>${day}</span></li>`).join("");
}
document.querySelectorAll("[data-plan]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-plan]").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderPlan(Number(button.dataset.plan));
  document.querySelector(".itinerary-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
}));
renderPlan();

const searchForm = document.querySelector(".hero-search");
const searchStatus = document.querySelector(".search-status");
searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = String(new FormData(searchForm).get("q") || "").trim();
  if (!query) {
    searchStatus.textContent = "찾고 싶은 지역이나 주제를 입력해주세요.";
    return;
  }
  searchStatus.textContent = `“${query}” 매거진 검색 결과로 이동합니다.`;
  window.location.assign(`/magazine/search?q=${encodeURIComponent(query)}`);
});

const savedChecks = JSON.parse(localStorage.getItem("sydneyPickChecklist") || "{}");
document.querySelectorAll("[data-check]").forEach((checkbox) => {
  checkbox.checked = Boolean(savedChecks[checkbox.dataset.check]);
  checkbox.addEventListener("change", () => {
    savedChecks[checkbox.dataset.check] = checkbox.checked;
    localStorage.setItem("sydneyPickChecklist", JSON.stringify(savedChecks));
  });
});
document.querySelector("#reset-checklist")?.addEventListener("click", () => {
  document.querySelectorAll("[data-check]").forEach((checkbox) => { checkbox.checked = false; });
  localStorage.removeItem("sydneyPickChecklist");
  Object.keys(savedChecks).forEach((key) => delete savedChecks[key]);
});

const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => backTop?.classList.toggle("show", window.scrollY > 800), { passive: true });
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
const routeSection = window.location.pathname.replace(/^\/+|\/+$/g, "");
if (["schedule", "areas", "prepare", "shopping", "magazine"].includes(routeSection)) {
  window.requestAnimationFrame(() => document.getElementById(routeSection)?.scrollIntoView());
}
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite, { once: true });
  } else {
    initSite();
  }
}
