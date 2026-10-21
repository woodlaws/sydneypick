(()=>{
  const data=window.__SYDNEY_MAP__;
  if(!data)return;
  const valid=new Set(data.regions.map(({id})=>id));
  const cards=[...document.querySelectorAll('[data-place-id]')];
  const buttons=[...document.querySelectorAll('[data-region-select]')];
  const title=document.querySelector('[data-selected-title]');
  const description=document.querySelector('[data-selected-description]');
  const feature=document.querySelector('[data-selected-feature]');
  const count=document.querySelector('[data-result-count]');
  const results=document.querySelector('.map-results');
  const dialog=document.querySelector('[data-map-dialog]');
  const dialogContent=document.querySelector('[data-dialog-content]');
  const resetButton=document.querySelector('[data-map-reset]');
  const scrollButton=document.querySelector('[data-scroll-results]');
  const mapStatus=document.querySelector('[data-map-status]');
  const mapLoading=document.querySelector('[data-map-loading]');
  const queryRegion=()=>{const value=new URLSearchParams(location.search).get('region');return value&&valid.has(value)?value:'all'};
  const initialBounds=[[-33.955,150.975],[-33.748,151.325]];
  const regionLayers=new Map();
  const placeLayers=[];
  let map=null;

  const mapIcon=(label,tone='navy')=>L.divIcon({className:'map-leaflet-icon-wrap',html:`<span class="map-leaflet-icon is-${tone}">${label}</span>`,iconSize:[42,42],iconAnchor:[21,21],tooltipAnchor:[0,-22]});
  const landmarkIcons={'sydney-opera-house':'◒','the-rocks':'◆','maritime-museum':'⚓','bondi-beach':'≋','coogee-beach':'≋','manly-beach':'≋','taronga-zoo':'●','parramatta-park':'♣'};
  const showMapFallback=(message)=>{mapLoading?.setAttribute('hidden','');if(mapStatus){mapStatus.hidden=false;if(message)mapStatus.textContent=message}};

  const updateMap=(selected,{animate=true}={})=>{
    if(!map)return;
    regionLayers.forEach((layer,id)=>layer.setStyle(id===selected?{color:'#073d52',weight:4,fillColor:'#ff6b5c',fillOpacity:.34}:{color:'#087da6',weight:2,fillColor:'#67c7df',fillOpacity:.14}));
    placeLayers.forEach(({region,marker})=>marker.setOpacity(selected==='all'||region===selected?1:.42));
    if(selected==='all')map.fitBounds(initialBounds,{padding:[24,24],maxZoom:11,animate});
    else{const region=data.regions.find(item=>item.id===selected);const zoom=matchMedia('(max-width: 767px)').matches?Math.max(12,region.zoom-1):region.zoom;map.setView(region.center,zoom,{animate,duration:.55})}
  };

  const select=(region,{history=true,mapMove=true,animate=true}={})=>{
    const selected=valid.has(region)?region:'all';
    const info=data.regions.find(({id})=>id===selected);
    cards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.region!==selected});
    buttons.forEach(button=>{const active=button.dataset.regionSelect===selected;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
    const visible=cards.filter(card=>!card.hidden).length;
    title.textContent=info?info.name:'전체 권역';
    description.textContent=info?info.description:'지도나 권역 버튼을 선택하면 해당 지역의 대표 장소만 모아볼 수 있습니다.';
    feature.textContent=info?info.feature:'시드니의 대표 여행 권역을 실제 위치 관계로 비교해보세요.';
    count.textContent=String(visible);
    scrollButton.hidden=selected==='all';
    if(history){const url=new URL(location.href);if(selected==='all')url.searchParams.delete('region');else url.searchParams.set('region',selected);window.history.pushState({region:selected},'',url)}
    if(mapMove)updateMap(selected,{animate});
    if(info&&matchMedia('(max-width: 767px)').matches){const status=`${info.name} 선택됨. 지도 아래에 추천 장소 ${visible}개가 표시됩니다.`;if(mapStatus){mapStatus.hidden=false;mapStatus.textContent=status}}
  };

  const initMap=()=>{
    if(!window.L){showMapFallback('실시간 지도를 불러오지 못했습니다. 지역 버튼과 명소 목록으로 계속 탐색할 수 있습니다.');return}
    map=L.map('sydney-travel-map',{zoomControl:true,scrollWheelZoom:false,doubleClickZoom:true,dragging:!matchMedia('(pointer: coarse)').matches,touchZoom:true,boxZoom:false,keyboard:true,minZoom:9,maxZoom:16});
    map.attributionControl.setPrefix(false);
    map.fitBounds(initialBounds,{padding:[24,24],maxZoom:11,animate:false});
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
    let tileErrors=0;
    tiles.on('load',()=>mapLoading?.setAttribute('hidden',''));
    tiles.on('tileerror',()=>{tileErrors+=1;if(tileErrors===3)showMapFallback('일부 지도 타일을 불러오지 못했습니다. 지역 선택과 명소 목록은 정상적으로 사용할 수 있습니다.')});
    tiles.addTo(map);
    data.regions.forEach((region,index)=>{
      const circle=L.circle(region.center,{radius:region.radius,color:'#087da6',weight:2,opacity:.85,fillColor:'#67c7df',fillOpacity:.16,className:'map-region-overlay'}).addTo(map);
      circle.bindTooltip(`${index+1}. ${region.short}`,{permanent:true,direction:'center',className:'map-region-label'});
      circle.on('click',()=>select(region.id,{history:true,mapMove:true}));
      circle.on('keypress',event=>{if(event.originalEvent?.key==='Enter'||event.originalEvent?.key===' ')select(region.id,{history:true,mapMove:true})});
      regionLayers.set(region.id,circle);
    });
    data.places.filter(item=>landmarkIcons[item.id]).forEach(item=>{
      const marker=L.marker([item.coordinates.lat,item.coordinates.lng],{icon:mapIcon(landmarkIcons[item.id],item.type.includes('해변')?'coral':'navy'),keyboard:true,title:item.name}).addTo(map);
      marker.bindTooltip(item.name,{direction:'top',offset:[0,-20],className:'map-place-tooltip'});
      marker.on('click',()=>select(item.region,{history:true,mapMove:true}));
      placeLayers.push({region:item.region,marker});
    });
    mapLoading?.setAttribute('hidden','');
    select(queryRegion(),{history:false,mapMove:true,animate:false});
  };

  buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.regionSelect,{mapMove:true})));
  resetButton?.addEventListener('click',()=>select('all',{mapMove:true}));
  scrollButton?.addEventListener('click',()=>results?.querySelector('.map-place-grid')?.scrollIntoView({behavior:'smooth',block:'start'}));
  window.addEventListener('popstate',()=>select(queryRegion(),{history:false,mapMove:true}));
  document.querySelectorAll('.map-place-media img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.nextElementSibling.hidden=false}));
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-detail]');
    if(trigger&&dialog){const item=data.places.find(({id})=>id===trigger.dataset.detail);if(!item)return;dialogContent.innerHTML=`<p class="section-kicker">${item.type}</p><h2>${item.name}</h2><p class="map-dialog-en">${item.english}</p><p>${item.reason}</p><p><strong>위치</strong><br>${item.address}</p><div class="map-dialog-links">${item.detail?`<a href="${item.detail}">시드니픽 상세 가이드</a>`:''}<a href="${item.official}" target="_blank" rel="noopener noreferrer">공식 홈페이지 ↗</a><a href="${item.map}" target="_blank" rel="noopener noreferrer">구글 길찾기 ↗</a></div>`;dialog.showModal()}
    if(event.target.closest('[data-dialog-close]'))dialog.close();
  });
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  const initial=queryRegion();
  if(new URLSearchParams(location.search).has('region')&&initial==='all'){const url=new URL(location.href);url.searchParams.delete('region');history.replaceState({region:'all'},'',url)}
  select(initial,{history:false,mapMove:false});
  initMap();
})();
