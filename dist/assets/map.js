(()=>{
  const data=window.__SYDNEY_MAP__;
  if(!data)return;
  const valid=new Set(data.regions.map(({id})=>id));
  const cards=[...document.querySelectorAll('[data-place-id]')];
  const buttons=[...document.querySelectorAll('[data-region-select]')];
  const markers=[...document.querySelectorAll('[data-region-marker]')];
  const title=document.querySelector('[data-selected-title]');
  const description=document.querySelector('[data-selected-description]');
  const count=document.querySelector('[data-result-count]');
  const results=document.querySelector('.map-results');
  const dialog=document.querySelector('[data-map-dialog]');
  const dialogContent=document.querySelector('[data-dialog-content]');
  const queryRegion=()=>{const value=new URLSearchParams(location.search).get('region');return value&&valid.has(value)?value:'all'};
  const select=(region,{history=true,scroll=false}={})=>{
    const selected=valid.has(region)?region:'all';
    const info=data.regions.find(({id})=>id===selected);
    cards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.region!==selected});
    buttons.forEach(button=>{const active=button.dataset.regionSelect===selected;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
    markers.forEach(marker=>{const active=marker.dataset.regionMarker===selected;marker.classList.toggle('is-active',active);marker.setAttribute('aria-pressed',String(active))});
    const visible=cards.filter(card=>!card.hidden).length;
    title.textContent=info?info.name:'전체 권역';
    description.textContent=info?info.description:'지도나 권역 버튼을 선택하면 해당 지역의 대표 장소만 모아볼 수 있습니다.';
    count.textContent=String(visible);
    if(history){const url=new URL(location.href);if(selected==='all')url.searchParams.delete('region');else url.searchParams.set('region',selected);window.history.pushState({region:selected},'',url)}
    if(scroll&&matchMedia('(max-width: 980px)').matches)results.scrollIntoView({behavior:'smooth',block:'start'});
  };
  buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.regionSelect,{scroll:true})));
  markers.forEach(marker=>{marker.addEventListener('click',()=>select(marker.dataset.regionMarker,{scroll:true}));marker.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();select(marker.dataset.regionMarker,{scroll:true})}})});
  window.addEventListener('popstate',()=>select(queryRegion(),{history:false}));
  document.querySelectorAll('.map-place-media img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.nextElementSibling.hidden=false}));
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-detail]');
    if(trigger&&dialog){const item=data.places.find(({id})=>id===trigger.dataset.detail);if(!item)return;dialogContent.innerHTML=`<p class="section-kicker">${item.type}</p><h2>${item.name}</h2><p class="map-dialog-en">${item.english}</p><p>${item.reason}</p><p><strong>위치</strong><br>${item.address}</p><div class="map-dialog-links">${item.detail?`<a href="${item.detail}">시드니픽 상세 가이드</a>`:''}<a href="${item.official}" target="_blank" rel="noopener noreferrer">공식 홈페이지 ↗</a><a href="${item.map}" target="_blank" rel="noopener noreferrer">구글 길찾기 ↗</a></div>`;dialog.showModal()}
    if(event.target.closest('[data-dialog-close]'))dialog.close();
  });
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  const initial=queryRegion();
  if(new URLSearchParams(location.search).has('region')&&initial==='all'){const url=new URL(location.href);url.searchParams.delete('region');history.replaceState({region:'all'},'',url)}
  select(initial,{history:false});
})();
