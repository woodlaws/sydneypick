export const itinerary5n6d = [
  {
    day: 1,
    title: "시드니 도착과 하버 첫 만남",
    theme: "ARRIVAL & HARBOUR",
    areas: "공항 · 서큘러키 · 오페라하우스 · 더 록스",
    intensity: "여유",
    level: 1,
    route: ["공항", "숙소", "서큘러키", "오페라하우스", "더 록스"],
    items: [
      { time: "08:00~11:00", title: "공항 도착·입국", type: "move", slot: "morning", badge: "항공" },
      { time: "11:00~13:00", title: "숙소 이동·수하물 보관", type: "move", slot: "morning", badge: "대중교통" },
      { time: "13:00~14:00", title: "가벼운 점심", type: "rest", slot: "lunch" },
      { time: "14:00~16:00", title: "서큘러키·오페라하우스", type: "sight", slot: "afternoon" },
      { time: "16:00~18:00", title: "하버브리지 전망", type: "sight", slot: "afternoon" },
      { time: "18:00~20:00", title: "더 록스 산책·저녁", type: "rest", slot: "evening" },
      { time: "20:00 이후", title: "숙소 복귀·휴식", type: "free", slot: "evening" },
    ],
  },
  {
    day: 2,
    title: "도심과 달링하버",
    theme: "CITY & DARLING HARBOUR",
    areas: "CBD · QVB · 하이드파크 · 달링하버 · 바랑가루",
    intensity: "보통",
    level: 2,
    route: ["CBD", "QVB", "하이드파크", "달링하버", "바랑가루"],
    items: [
      { time: "09:00~11:00", title: "시드니 CBD 산책", type: "sight", slot: "morning" },
      { time: "11:00~12:30", title: "QVB 관람", type: "sight", slot: "morning" },
      { time: "12:30~14:00", title: "점심", type: "rest", slot: "lunch" },
      { time: "14:00~15:30", title: "하이드파크", type: "nature", slot: "afternoon" },
      { time: "15:30~18:00", title: "달링하버", type: "sight", slot: "afternoon" },
      { time: "18:00~20:00", title: "바랑가루·저녁", type: "rest", slot: "evening" },
      { time: "20:00 이후", title: "자유시간", type: "free", slot: "evening" },
    ],
  },
  {
    day: 3,
    title: "본다이비치와 동부 해안",
    theme: "BONDI & COAST",
    areas: "본다이비치 · 동부 해안",
    intensity: "보통",
    level: 2,
    route: ["시내", "본다이비치", "해안 산책", "카페", "시내"],
    items: [
      { time: "08:30~10:00", title: "시내에서 본다이 이동", type: "move", slot: "morning", badge: "대중교통" },
      { time: "10:00~12:00", title: "본다이비치", type: "nature", slot: "morning" },
      { time: "12:00~13:30", title: "해변 브런치", type: "rest", slot: "lunch" },
      { time: "13:30~16:30", title: "본다이 코스털 워크", type: "nature", slot: "afternoon", badge: "도보" },
      { time: "16:30~18:00", title: "카페·휴식", type: "rest", slot: "afternoon" },
      { time: "18:00 이후", title: "시내 복귀·저녁", type: "move", slot: "evening", badge: "대중교통" },
    ],
  },
  {
    day: 4,
    title: "페리를 타고 맨리로",
    theme: "FERRY & MANLY",
    areas: "서큘러키 · 맨리",
    intensity: "여유",
    level: 1,
    route: ["서큘러키", "페리", "맨리 중심가", "맨리비치", "시내"],
    items: [
      { time: "09:00~10:00", title: "서큘러키 이동", type: "move", slot: "morning", badge: "대중교통" },
      { time: "10:00~10:40", title: "맨리 페리", type: "move", slot: "morning", badge: "페리" },
      { time: "11:00~12:30", title: "맨리 중심가", type: "sight", slot: "morning" },
      { time: "12:30~14:00", title: "점심", type: "rest", slot: "lunch" },
      { time: "14:00~17:00", title: "맨리비치·해안 산책", type: "nature", slot: "afternoon", badge: "도보" },
      { time: "17:00~18:00", title: "카페·휴식", type: "rest", slot: "afternoon" },
      { time: "18:00 이후", title: "페리 야경·시내 복귀", type: "move", slot: "evening", badge: "페리" },
    ],
  },
  {
    day: 5,
    title: "블루마운틴 당일치기",
    theme: "BLUE MOUNTAINS",
    areas: "카툼바 · 블루마운틴",
    intensity: "이동 많음",
    level: 3,
    note: "날씨, 교통편과 투어 상품에 따라 일정이 달라질 수 있습니다.",
    route: ["시드니", "카툼바권", "전망 지역", "산책·체험", "시드니"],
    items: [
      { time: "07:30~10:00", title: "시드니 출발·이동", type: "tour", slot: "morning", badge: "기차·투어" },
      { time: "10:00~12:00", title: "대표 전망 지역", type: "tour", slot: "morning" },
      { time: "12:00~13:00", title: "점심", type: "rest", slot: "lunch" },
      { time: "13:00~16:30", title: "산책·체험", type: "tour", slot: "afternoon", badge: "도보" },
      { time: "16:30~19:00", title: "시드니 복귀", type: "move", slot: "evening", badge: "기차·투어" },
      { time: "19:00 이후", title: "저녁·휴식", type: "rest", slot: "evening" },
    ],
  },
  {
    day: 6,
    title: "쇼핑과 출국",
    theme: "SHOPPING & DEPARTURE",
    areas: "도심 · 쇼핑 · 공항",
    intensity: "항공편에 따라 조정",
    level: 2,
    note: "항공편 시간에 따라 전체 일정이 달라질 수 있습니다.",
    route: ["숙소", "선물 쇼핑", "선택 일정", "공항"],
    items: [
      { time: "08:00~09:30", title: "체크아웃", type: "move", slot: "morning" },
      { time: "09:30~12:00", title: "선물 쇼핑", type: "shopping", slot: "morning" },
      { time: "12:00~13:00", title: "점심", type: "rest", slot: "lunch" },
      { time: "13:00~15:00", title: "자유시간 또는 추가 쇼핑", type: "free", slot: "afternoon" },
      { time: "출발 3~4시간 전", title: "공항 이동", type: "move", slot: "evening", badge: "대중교통" },
      { time: "항공편 일정", title: "출국", type: "move", slot: "evening", badge: "항공" },
    ],
  },
];

const typeLabels = {
  move: "이동",
  sight: "관광",
  rest: "식사·휴식",
  nature: "자연·해변",
  tour: "근교·투어",
  shopping: "쇼핑",
  free: "자유시간",
};

const slots = [
  ["morning", "오전", "08:00—12:30"],
  ["lunch", "점심", "12:00—14:00"],
  ["afternoon", "오후", "13:00—18:00"],
  ["evening", "저녁", "18:00 이후"],
];

function intensity(day) {
  const dots = [1, 2, 3].map((dot) => `<i class="${dot <= day.level ? "on" : ""}"></i>`).join("");
  return `<span class="plan-intensity" aria-label="일정 강도 ${day.intensity}"><b>${day.intensity}</b><span aria-hidden="true">${dots}</span></span>`;
}

function activity(item, day) {
  return `<a class="plan-activity plan-type-${item.type}" href="#day${day.day}"><span class="plan-time">${item.time}</span><strong>${item.title}</strong><span class="plan-meta"><em>${typeLabels[item.type]}</em>${item.badge ? `<small>${item.badge}</small>` : ""}<span aria-hidden="true">↓</span></span></a>`;
}

function dayHeader(day) {
  return `<header class="plan-day-head"><span>DAY ${day.day}</span><small>${day.theme}</small><h3>${day.title}</h3><p>${day.areas}</p>${intensity(day)}<a href="#day${day.day}">상세보기 ↓</a></header>`;
}

function mobileDay(day, index) {
  return `<article class="mobile-plan-card" data-mobile-plan="${index}" ${index ? "hidden" : ""} aria-labelledby="mobile-plan-title-${day.day}"><header><span>DAY ${day.day} · ${day.theme}</span><h3 id="mobile-plan-title-${day.day}">${day.title}</h3><p>${day.areas}</p>${intensity(day)}</header><ol>${day.items.map((item) => `<li class="plan-type-${item.type}"><time>${item.time}</time><a href="#day${day.day}"><strong>${item.title}</strong><span>${typeLabels[item.type]}${item.badge ? ` · ${item.badge}` : ""}</span></a></li>`).join("")}</ol>${day.note ? `<p class="mobile-plan-note">${day.note}</p>` : ""}<div class="mobile-plan-route"><b>오늘의 동선</b><span>${day.route.join(" → ")}</span></div><a class="mobile-plan-detail" href="#day${day.day}">DAY ${day.day} 상세 일정 보기 ↓</a></article>`;
}

export function renderItineraryOverview() {
  const headers = itinerary5n6d.map(dayHeader).join("");
  const scheduleRows = slots.map(([slot, label, range]) => `<div class="plan-row-label"><b>${label}</b><span>${range}</span></div>${itinerary5n6d.map((day) => `<div class="plan-slot" data-day="${day.day}" data-slot="${slot}">${day.items.filter((item) => item.slot === slot).map((item) => activity(item, day)).join("") || '<span class="plan-empty">일정 조정</span>'}</div>`).join("")}`).join("");
  const routes = `<div class="plan-row-label plan-route-label"><b>동선</b><span>하루 이동 요약</span></div>${itinerary5n6d.map((day) => `<div class="plan-route-cell"><span>${day.route.join(" → ")}</span>${day.note ? `<small>${day.note}</small>` : ""}</div>`).join("")}`;
  const json = JSON.stringify(itinerary5n6d).replaceAll("<", "\\u003c");
  return `<section class="plan-overview" id="plan-overview" aria-labelledby="plan-overview-title"><div class="plan-overview-shell"><div class="plan-overview-header"><div><p class="plan-eyebrow">YOUR 6-DAY PLAN</p><h2 id="plan-overview-title"><span>한눈에 보는</span> 시드니 5박 6일</h2><p class="plan-description">도착부터 하버, 도심, 해변, 페리, 블루마운틴과 마지막 쇼핑까지 전체 동선을 한 장에 정리했습니다.</p><p class="plan-advice">시간은 추천 흐름이며 항공편, 숙소 위치, 날씨와 운영 상황에 맞게 조정하세요.</p></div><div class="plan-actions" aria-label="일정표 도구"><button type="button" data-plan-download>일정표 이미지 저장</button><button type="button" data-plan-print>인쇄하기</button><button type="button" data-plan-share>링크 공유</button></div></div><div class="plan-legend" aria-label="일정 유형 범례">${Object.entries(typeLabels).map(([type, label]) => `<span class="plan-type-${type}"><i></i>${label}</span>`).join("")}</div><div class="desktop-plan"><p class="plan-scroll-hint">표를 좌우로 움직여 6일 전체 일정을 비교하세요.</p><div class="plan-scroll" tabindex="0" aria-label="시드니 5박 6일 일정 비교표"><div class="plan-grid"><div class="plan-corner"><span>시간대</span><small>6일 비교</small></div>${headers}${scheduleRows}${routes}</div></div></div><div class="mobile-plan"><nav class="mobile-plan-tabs" aria-label="날짜 선택">${itinerary5n6d.map((day, index) => `<button type="button" data-plan-tab="${index}" aria-selected="${index === 0}" ${index === 0 ? 'class="active"' : ""}>DAY ${day.day}</button>`).join("")}</nav>${itinerary5n6d.map(mobileDay).join("")}<div class="mobile-plan-pager"><button type="button" data-plan-prev disabled>← 이전 날</button><span data-plan-status>1 / 6</span><button type="button" data-plan-next>다음 날 →</button></div></div><aside class="plan-lead"><div><p>TAKE IT WITH YOU</p><h3>이 일정을 휴대폰에 저장해 가세요</h3><span>5박 6일 일정표와 출발 전 체크리스트를 한 번에 받아보세요.</span></div><a href="/free-guide">무료 일정표 받기 →</a></aside></div><script type="application/json" id="itinerary-5n6d-data">${json}</script></section>`;
}
