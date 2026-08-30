function initItineraryOverview() {
  const root = document.querySelector("#plan-overview");
  const dataNode = document.querySelector("#itinerary-5n6d-data");
  if (!root || !dataNode) return;

  let days = [];
  try { days = JSON.parse(dataNode.textContent || "[]"); } catch { return; }

  const tabs = [...root.querySelectorAll("[data-plan-tab]")];
  const panels = [...root.querySelectorAll("[data-mobile-plan]")];
  const prev = root.querySelector("[data-plan-prev]");
  const next = root.querySelector("[data-plan-next]");
  const status = root.querySelector("[data-plan-status]");
  let active = 0;

  const selectDay = (index, focusTab = false) => {
    active = Math.max(0, Math.min(index, panels.length - 1));
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === active;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
      if (selected) {
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        if (focusTab) tab.focus();
      }
    });
    panels.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== active; });
    if (prev) prev.disabled = active === 0;
    if (next) next.disabled = active === panels.length - 1;
    if (status) status.textContent = `${active + 1} / ${panels.length}`;
  };

  tabs.forEach((tab, index) => tab.addEventListener("click", () => selectDay(index)));
  prev?.addEventListener("click", () => selectDay(active - 1, true));
  next?.addEventListener("click", () => selectDay(active + 1, true));

  root.querySelector("[data-plan-print]")?.addEventListener("click", () => window.print());
  root.querySelector("[data-plan-share]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const url = `${window.location.origin}${window.location.pathname}#plan-overview`;
    try {
      if (navigator.share) await navigator.share({ title: "시드니픽 5박 6일 일정표", text: "시드니 5박 6일 전체 동선을 확인해보세요.", url });
      else await navigator.clipboard.writeText(url);
      button.textContent = navigator.share ? "공유 완료" : "링크 복사 완료";
    } catch (error) {
      if (error?.name !== "AbortError") button.textContent = "공유할 수 없어요";
    }
  });

  root.querySelector("[data-plan-download]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const original = button.textContent;
    button.disabled = true;
    button.textContent = "이미지 만드는 중…";
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 2800;
      canvas.height = 1880;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.fillStyle = "#f5fbfd";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const logo = new Image();
      logo.src = "/public/images/brand/sydney-pick-logo.png";
      try { await logo.decode(); ctx.drawImage(logo, 120, 80, 410, 84); } catch {}

      ctx.fillStyle = "#008db5";
      ctx.font = "700 28px sans-serif";
      ctx.fillText("YOUR 6-DAY PLAN", 120, 235);
      ctx.fillStyle = "#092f40";
      ctx.font = "800 66px sans-serif";
      ctx.fillText("한눈에 보는 시드니 5박 6일", 120, 320);
      ctx.fillStyle = "#4c6c78";
      ctx.font = "32px sans-serif";
      ctx.fillText("도착부터 하버, 도심, 해변, 페리, 블루마운틴과 쇼핑까지", 120, 380);

      const left = 120;
      const top = 445;
      const gap = 18;
      const columnWidth = 410;
      days.forEach((day, index) => {
        const x = left + index * (columnWidth + gap);
        ctx.fillStyle = "#073b52";
        ctx.fillRect(x, top, columnWidth, 210);
        ctx.fillStyle = "#84dff2";
        ctx.font = "700 24px sans-serif";
        ctx.fillText(`DAY ${day.day}`, x + 26, top + 42);
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 31px sans-serif";
        const title = day.title.length > 14 ? `${day.title.slice(0, 14)}…` : day.title;
        ctx.fillText(title, x + 26, top + 91);
        ctx.fillStyle = "#c9e8ef";
        ctx.font = "22px sans-serif";
        ctx.fillText(day.intensity, x + 26, top + 137);
        ctx.font = "19px sans-serif";
        ctx.fillText(day.theme, x + 26, top + 178);

        let y = top + 225;
        day.items.forEach((item) => {
          const palette = { move: ["#e8f1f5", "#315968"], sight: ["#ddf5fb", "#008db5"], rest: ["#f3f7df", "#71842b"], nature: ["#ddf8f0", "#008a70"], tour: ["#fff0e5", "#e36b37"], shopping: ["#fff1ee", "#ff6b5e"], free: ["#f2eefb", "#7556a8"] }[item.type];
          ctx.fillStyle = palette[0];
          ctx.fillRect(x, y, columnWidth, 112);
          ctx.fillStyle = palette[1];
          ctx.fillRect(x, y, 8, 112);
          ctx.font = "700 20px sans-serif";
          ctx.fillText(item.time, x + 26, y + 36);
          ctx.fillStyle = "#092f40";
          ctx.font = "700 25px sans-serif";
          const label = item.title.length > 18 ? `${item.title.slice(0, 18)}…` : item.title;
          ctx.fillText(label, x + 26, y + 75);
          y += 124;
        });
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, 1650, columnWidth, 100);
        ctx.fillStyle = "#476773";
        ctx.font = "19px sans-serif";
        ctx.fillText(day.route.slice(0, 3).join(" → "), x + 20, 1700);
      });
      ctx.fillStyle = "#627b85";
      ctx.font = "22px sans-serif";
      ctx.fillText("시간은 추천 흐름입니다. 항공편·숙소·날씨·운영 상황에 맞게 조정하세요.", 120, 1810);
      ctx.textAlign = "right";
      ctx.fillText(`${window.location.origin}/itineraries/sydney-5n6d`, 2680, 1810);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("PNG unavailable");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sydneypick-sydney-5n6d-itinerary.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      button.textContent = "이미지 저장 완료";
    } catch {
      button.textContent = "저장할 수 없어요";
    } finally {
      button.disabled = false;
      setTimeout(() => { button.textContent = original; }, 2500);
    }
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initItineraryOverview, { once: true });
  else initItineraryOverview();
}
