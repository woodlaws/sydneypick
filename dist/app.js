const plans = [
  { title: "하버에 첫눈에 반하는 날", note: "모두 도보 25분 권역", stops: ["The Rocks", "하버 브리지", "오페라 하우스", "보태닉 가든"], food: "The Rocks 펍 런치 · Circular Quay 젤라토", cost: "A$95–135" },
  { title: "태평양을 옆에 두고 걷는 날", note: "버스 + 코스탈 워크", stops: ["Bondi Beach", "Tamarama", "Bronte", "Coogee"], food: "Bondi 브런치 · Coogee 피시 앤 칩스", cost: "A$105–145" },
  { title: "페리 자체가 여행이 되는 날", note: "Circular Quay에서 F1 페리", stops: ["Manly Wharf", "Shelly Beach", "North Head", "Manly Corso"], food: "Manly 베이커리 · 해변가 이른 저녁", cost: "A$110–150" },
  { title: "동네의 결을 따라 느긋한 날", note: "라이트레일 + 도보", stops: ["Surry Hills", "Paddington", "QVB", "Darling Harbour"], food: "Surry Hills 커피 · Chinatown 저녁", cost: "A$100–140" },
  { title: "현지인처럼 한 박자 늦추는 날", note: "기차 + 이너웨스트 산책", stops: ["Newtown", "Carriageworks", "Barangaroo", "Observatory Hill"], food: "Newtown 다문화 런치 · Barangaroo 선셋", cost: "A$95–130" }
];

const timeline = document.querySelector("#timeline");
const budget = { 2: "A$220–300", 3: "A$330–450", 4: "A$430–590", 5: "A$530–720" };
let selectedDays = 3;

function renderPlan() {
  document.querySelector("#plan-days").textContent = selectedDays;
  document.querySelector("#budget-total").textContent = budget[selectedDays];
  timeline.innerHTML = plans.slice(0, selectedDays).map((plan, index) => `
    <article class="day-card ${index === 0 ? "open" : ""}">
      <button class="day-toggle" aria-expanded="${index === 0}">
        <span class="day-num">${String(index + 1).padStart(2, "0")}</span>
        <span class="day-title"><small>DAY ${index + 1} · ${plan.note}</small><strong>${plan.title}</strong></span>
        <span class="day-cost">${plan.cost}<i>＋</i></span>
      </button>
      <div class="day-detail">
        <div class="stop-list">${plan.stops.map((stop, stopIndex) => `<span>${stopIndex + 1}<b>${stop}</b></span>`).join("")}</div>
        <p><em>오늘의 한 끼</em>${plan.food}</p>
      </div>
    </article>`).join("");
  document.querySelectorAll(".day-toggle").forEach(button => button.addEventListener("click", () => {
    const card = button.closest(".day-card");
    const isOpen = card.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  }));
}

document.querySelectorAll("[data-days]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-days]").forEach(item => item.classList.remove("selected"));
  button.classList.add("selected");
  selectedDays = Number(button.dataset.days);
  renderPlan();
}));

document.querySelectorAll("[data-style]").forEach(button => button.addEventListener("click", () => button.classList.toggle("active")));
document.querySelector("#make-plan").addEventListener("click", () => document.querySelector("#itinerary").scrollIntoView({ behavior: "smooth" }));
document.querySelectorAll(".district").forEach(card => card.addEventListener("click", () => {
  document.querySelectorAll(".district").forEach(item => item.classList.remove("active"));
  card.classList.add("active");
}));
renderPlan();
