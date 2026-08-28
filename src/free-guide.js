function initFreeGuide() {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  menu?.addEventListener('click', () => {
    const open = header?.classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(Boolean(open)));
  });

  const track = (eventName, details = {}) => {
    const safeDetails = Object.fromEntries(Object.entries(details).filter(([key]) => !['name', 'email', 'phone'].includes(key)));
    window.dispatchEvent(new CustomEvent('sydneypick:analytics', { detail: { event: eventName, ...safeDetails } }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...safeDetails });
  };

  const page = document.body.dataset.leadPage;
  if (page === 'form') track('free_guide_view');
  if (page === 'sample') track('guide_open', { source: 'sample_page' });

  document.querySelectorAll('[data-event]').forEach((element) => element.addEventListener('click', () => track(element.dataset.event, { source: page || 'unknown' })));
  const routeEvents = { '/itineraries/sydney-5n6d': 'itinerary_click', '/shopping/checklist': 'shopping_click', '/shopping/sdf': 'sdf_click' };
  Object.entries(routeEvents).forEach(([route, eventName]) => document.querySelectorAll(`a[href="${route}"]:not([data-event])`).forEach((link) => link.addEventListener('click', () => track(eventName, { source: page || 'unknown' }))));
  document.querySelectorAll('[data-print-guide]').forEach((button) => button.addEventListener('click', () => {
    track('guide_open', { action: 'print' });
    window.print();
  }));

  const form = document.querySelector('[data-lead-form]');
  if (form) {
    const config = window.__LEAD_CONFIG__ || {};
    const message = form.querySelector('[data-form-message]');
    const submitButton = form.querySelector('[data-submit-button]');
    const openedAt = Date.now();
    let started = false;
    let submitting = false;

    form.addEventListener('focusin', () => {
      if (!started) {
        started = true;
        track('free_guide_form_start');
      }
    }, { once: true });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submitting) return;
      if (!form.reportValidity()) {
        message.textContent = '필수항목과 이메일 형식, 개인정보 동의를 확인해주세요.';
        return;
      }
      const data = new FormData(form);
      if (data.get('website') || Date.now() - openedAt < 2500) {
        message.textContent = '잠시 후 다시 시도해주세요.';
        return;
      }
      if (!config.privacyReady || !config.formEndpoint) {
        message.textContent = '현재 신청 기능 준비 중입니다. 입력한 내용은 전송되거나 저장되지 않았습니다.';
        return;
      }

      submitting = true;
      submitButton.disabled = true;
      submitButton.textContent = '신청 내용을 안전하게 전송 중…';
      message.textContent = '페이지를 닫지 말고 잠시 기다려주세요.';
      const query = new URLSearchParams(location.search);
      const payload = {
        submittedAt: new Date().toISOString(),
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        travelPeriod: String(data.get('travelPeriod') || '').trim(),
        duration: String(data.get('duration') || ''),
        travelType: String(data.get('travelType') || ''),
        interest: String(data.get('interest') || ''),
        privacyConsent: data.get('privacyConsent') === 'yes',
        marketingConsent: data.get('marketingConsent') === 'yes',
        sourcePage: document.referrer ? new URL(document.referrer).pathname : '/',
        utmSource: query.get('utm_source') || '',
        utmMedium: query.get('utm_medium') || '',
        utmCampaign: query.get('utm_campaign') || '',
        status: 'new',
        note: ''
      };

      try {
        const response = await fetch(config.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result || result.success !== true) throw new Error('Submission was not confirmed');
        track('free_guide_submit', { source: 'free_guide' });
        sessionStorage.setItem('sydneyPickGuideComplete', String(Date.now()));
        location.assign('/free-guide/complete');
      } catch {
        message.textContent = '신청 내용을 저장하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해주세요.';
        submitButton.disabled = false;
        submitButton.textContent = '무료 가이드 신청하기';
        submitting = false;
      }
    });
  }

  if (page === 'complete') {
    const completedAt = Number(sessionStorage.getItem('sydneyPickGuideComplete') || 0);
    const confirmed = completedAt > 0 && Date.now() - completedAt < 30 * 60 * 1000;
    const title = document.querySelector('[data-complete-title]');
    const copy = document.querySelector('[data-complete-copy]');
    const actions = document.querySelector('[data-complete-actions]');
    const warning = document.querySelector('[data-complete-warning]');
    const after = document.querySelector('[data-after-guide]');
    if (confirmed) {
      copy.textContent = '입력한 이메일 주소는 URL이나 이 화면에 표시하지 않습니다. 지금 웹 가이드를 바로 열 수 있습니다.';
      actions.hidden = false;
      after.hidden = false;
      track('free_guide_complete');
    } else {
      title.textContent = '신청 상태를 확인할 수 없습니다';
      copy.textContent = '완료페이지는 실제 제출 성공이 확인된 브라우저 세션에서만 표시됩니다.';
      warning.hidden = false;
    }
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFreeGuide, { once: true });
  else initFreeGuide();
}
