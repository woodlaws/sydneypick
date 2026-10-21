(()=>{
  const data=window.__SYDNEY_MAP__;
  if(!data)return;

  const validRegions=new Set(data.regions.map(({id})=>id));
  const typeLabels={all:'전체 유형',attraction:'명소',beach:'해변',restaurant:'맛집',cafe:'카페'};
  const validTypes=new Set(Object.keys(typeLabels));
  const cards=[...document.querySelectorAll('[data-place-id]')];
  const regionButtons=[...document.querySelectorAll('[data-region-select]')];
  const typeButtons=[...document.querySelectorAll('[data-type-select]')];
  const title=document.querySelector('[data-selected-title]');
  const description=document.querySelector('[data-selected-description]');
  const feature=document.querySelector('[data-selected-feature]');
  const count=document.querySelector('[data-result-count]');
  const results=document.querySelector('.map-results');
  const emptyState=document.querySelector('[data-empty-state]');
  const emptyRegionButton=document.querySelector('[data-empty-region]');
  const emptyTypeButton=document.querySelector('[data-empty-type]');
  const dialog=document.querySelector('[data-map-dialog]');
  const dialogContent=document.querySelector('[data-dialog-content]');
  const resetMapButton=document.querySelector('[data-map-reset]');
  const resetFiltersButton=document.querySelector('[data-filter-reset]');
  const scrollButton=document.querySelector('[data-scroll-results]');
  const mapStatus=document.querySelector('[data-map-status]');
  const mapLoading=document.querySelector('[data-map-loading]');
  const initialBounds=[[-33.955,150.975],[-33.748,151.325]];
  const regionLayers=new Map();
  const placeLayers=new Map();
  let map=null;
  let state={region:'all',type:'all'};
  let focusedPlaceId=null;

  const escapeHtml=(value)=>String(value).replace(/[&<>'\"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[character]));
  const readState=()=>{
    const params=new URLSearchParams(location.search);
    const region=params.get('region');
    const type=params.get('type');
    return {region:region&&validRegions.has(region)?region:'all',type:type&&validTypes.has(type)?type:'all'};
  };
  const matches=(item,next=state)=>(next.region==='all'||item.region===next.region)&&(next.type==='all'||item.types.includes(next.type));
  const mapIcon=(item,focused=false)=>{
    const kind=item.types.includes('beach')?'beach':item.types.includes('cafe')?'cafe':item.types.includes('restaurant')?'restaurant':'attraction';
    const icons={beach:'≋',cafe:'☕',restaurant:'♨',attraction:'◆'};
    return L.divIcon({className:`map-leaflet-icon-wrap${focused?' is-focused':''}`,html:`<span class="map-leaflet-icon is-${kind}" aria-hidden="true">${icons[kind]}</span>`,iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-18],tooltipAnchor:[0,-20]});
  };
  const popupHtml=(item)=>`<article class="map-popup-card">${item.image?`<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" width="280" height="175" loading="lazy">`:`<div class="map-popup-fallback" aria-hidden="true">SYDNEY PICK</div>`}<div><small>${escapeHtml(item.type)}</small><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.reason)}</p>${item.detail?`<a href="${escapeHtml(item.detail)}">상세 보기</a>`:`<button type="button" data-detail="${escapeHtml(item.id)}">상세 보기</button>`}</div></article>`;
  const showMapFallback=(message)=>{mapLoading?.setAttribute('hidden','');if(mapStatus){mapStatus.hidden=false;if(message)mapStatus.textContent=message}};
  const writeUrl=(next,mode='push')=>{
    const url=new URL(location.href);
    if(next.region==='all')url.searchParams.delete('region');else url.searchParams.set('region',next.region);
    if(next.type==='all')url.searchParams.delete('type');else url.searchParams.set('type',next.type);
    if(mode==='replace')window.history.replaceState(next,'',url);
    else window.history.pushState(next,'',url);
  };
  const clearFocusedPlace=()=>{
    if(!focusedPlaceId)return;
    const layer=placeLayers.get(focusedPlaceId);
    if(layer){layer.marker.closePopup();layer.marker.setIcon(mapIcon(layer.item,false))}
    document.querySelector(`[data-place-id="${focusedPlaceId}"]`)?.classList.remove('is-map-focused');
    focusedPlaceId=null;
  };
  const updateMapView=(region,{animate=true}={})=>{
    if(!map)return;
    if(region==='all')map.fitBounds(initialBounds,{padding:[24,24],maxZoom:11,animate});
    else{
      const info=data.regions.find(item=>item.id===region);
      const zoom=matchMedia('(max-width: 767px)').matches?Math.max(12,info.zoom-1):info.zoom;
      map.setView(info.center,zoom,{animate,duration:.55});
    }
  };
  const updateMapLayers=(next,{mapMove=false,animate=true}={})=>{
    if(!map)return;
    regionLayers.forEach((layer,id)=>layer.setStyle(id===next.region?{color:'#073d52',weight:4,fillColor:'#ff6b5c',fillOpacity:.34}:{color:'#087da6',weight:2,fillColor:'#67c7df',fillOpacity:.14}));
    placeLayers.forEach(({item,marker})=>{
      const visible=matches(item,next);
      if(visible&&!map.hasLayer(marker))marker.addTo(map);
      if(!visible&&map.hasLayer(marker))map.removeLayer(marker);
    });
    if(mapMove)updateMapView(next.region,{animate});
  };
  const applyState=(next,{historyMode=null,mapMove=false,animate=true,announce=true}={})=>{
    const normalized={region:validRegions.has(next.region)?next.region:'all',type:validTypes.has(next.type)?next.type:'all'};
    if(focusedPlaceId){const focused=data.places.find(({id})=>id===focusedPlaceId);if(!focused||!matches(focused,normalized))clearFocusedPlace()}
    state=normalized;
    const regionInfo=data.regions.find(({id})=>id===state.region);
    const visiblePlaces=data.places.filter(item=>matches(item));
    const visibleIds=new Set(visiblePlaces.map(({id})=>id));
    cards.forEach(card=>{card.hidden=!visibleIds.has(card.dataset.placeId)});
    regionButtons.forEach(button=>{const active=button.dataset.regionSelect===state.region;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
    typeButtons.forEach(button=>{const active=button.dataset.typeSelect===state.type;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
    const regionLabel=regionInfo?regionInfo.name:'전체 지역';
    title.textContent=`${regionLabel} · ${typeLabels[state.type]}`;
    description.textContent=regionInfo?regionInfo.description:'지도나 권역 버튼을 선택하면 해당 지역의 대표 장소만 모아볼 수 있습니다.';
    feature.textContent=state.type==='all'?(regionInfo?regionInfo.feature:'시드니의 대표 여행 권역을 실제 위치 관계로 비교해보세요.'):`${typeLabels[state.type]} 조건으로 지도 마커와 장소 카드를 함께 표시합니다.`;
    count.textContent=String(visiblePlaces.length);
    emptyState.hidden=visiblePlaces.length!==0;
    emptyRegionButton.hidden=state.region==='all'||state.type==='all';
    emptyTypeButton.hidden=state.type==='all'||state.region==='all';
    scrollButton.hidden=state.region==='all'&&state.type==='all';
    if(historyMode)writeUrl(state,historyMode);
    updateMapLayers(state,{mapMove,animate});
    if(announce&&matchMedia('(max-width: 767px)').matches&&mapStatus){mapStatus.hidden=false;mapStatus.textContent=`${regionLabel}, ${typeLabels[state.type]} 선택됨. 지도 아래에 추천 장소 ${visiblePlaces.length}곳이 표시됩니다.`}
  };
  const focusPlace=(placeId)=>{
    const layer=placeLayers.get(placeId);
    if(!layer||!map||!matches(layer.item))return;
    clearFocusedPlace();
    focusedPlaceId=placeId;
    layer.marker.setIcon(mapIcon(layer.item,true));
    document.querySelector(`[data-place-id="${placeId}"]`)?.classList.add('is-map-focused');
    map.setView([layer.item.coordinates.lat,layer.item.coordinates.lng],Math.max(map.getZoom(),14),{animate:true,duration:.45});
    layer.marker.openPopup();
    document.querySelector('#sydney-travel-map')?.scrollIntoView({behavior:'smooth',block:'center'});
  };
  const initMap=()=>{
    if(!window.L){showMapFallback('실시간 지도를 불러오지 못했습니다. 필터와 장소 목록으로 계속 탐색할 수 있습니다.');return}
    map=L.map('sydney-travel-map',{zoomControl:true,scrollWheelZoom:false,doubleClickZoom:true,dragging:!matchMedia('(pointer: coarse)').matches,touchZoom:true,boxZoom:false,keyboard:true,minZoom:9,maxZoom:16});
    map.attributionControl.setPrefix(false);
    map.fitBounds(initialBounds,{padding:[24,24],maxZoom:11,animate:false});
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
    let tileErrors=0;
    tiles.on('load',()=>mapLoading?.setAttribute('hidden',''));
    tiles.on('tileerror',()=>{tileErrors+=1;if(tileErrors===3)showMapFallback('일부 지도 타일을 불러오지 못했습니다. 필터와 장소 목록은 정상적으로 사용할 수 있습니다.')});
    tiles.addTo(map);
    data.regions.forEach((region,index)=>{
      const circle=L.circle(region.center,{radius:region.radius,color:'#087da6',weight:2,opacity:.85,fillColor:'#67c7df',fillOpacity:.16,className:'map-region-overlay',keyboard:true}).addTo(map);
      circle.bindTooltip(`${index+1}. ${region.short}`,{permanent:true,direction:'center',className:'map-region-label'});
      circle.on('click',()=>applyState({...state,region:region.id},{historyMode:'push',mapMove:true}));
      circle.on('keypress',event=>{if(event.originalEvent?.key==='Enter'||event.originalEvent?.key===' ')applyState({...state,region:region.id},{historyMode:'push',mapMove:true})});
      regionLayers.set(region.id,circle);
    });
    data.places.forEach(item=>{
      const marker=L.marker([item.coordinates.lat,item.coordinates.lng],{icon:mapIcon(item),keyboard:true,title:item.name,riseOnHover:true,alt:item.name}).addTo(map);
      marker.bindTooltip(item.name,{direction:'top',offset:[0,-18],className:'map-place-tooltip'});
      marker.bindPopup(popupHtml(item),{maxWidth:300,minWidth:240,closeButton:true});
      marker.on('click',()=>{if(focusedPlaceId&&focusedPlaceId!==item.id)clearFocusedPlace();focusedPlaceId=item.id;marker.setIcon(mapIcon(item,true))});
      marker.on('popupclose',()=>{if(focusedPlaceId===item.id){marker.setIcon(mapIcon(item,false));focusedPlaceId=null}});
      placeLayers.set(item.id,{item,marker});
    });
    mapLoading?.setAttribute('hidden','');
    updateMapLayers(state,{mapMove:true,animate:false});
  };

  regionButtons.forEach(button=>button.addEventListener('click',()=>applyState({...state,region:button.dataset.regionSelect},{historyMode:'push',mapMove:true})));
  typeButtons.forEach(button=>button.addEventListener('click',()=>applyState({...state,type:button.dataset.typeSelect},{historyMode:'push',mapMove:false})));
  resetMapButton?.addEventListener('click',()=>updateMapView(state.region));
  resetFiltersButton?.addEventListener('click',()=>applyState({region:'all',type:'all'},{historyMode:'push',mapMove:true}));
  emptyRegionButton?.addEventListener('click',()=>applyState({...state,type:'all'},{historyMode:'push',mapMove:false}));
  emptyTypeButton?.addEventListener('click',()=>applyState({...state,region:'all'},{historyMode:'push',mapMove:true}));
  scrollButton?.addEventListener('click',()=>results?.querySelector('.map-place-grid')?.scrollIntoView({behavior:'smooth',block:'start'}));
  window.addEventListener('popstate',()=>{const next=readState();applyState(next,{mapMove:next.region!==state.region,animate:true,announce:false})});
  document.querySelectorAll('.map-place-media img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;image.nextElementSibling.hidden=false}));
  document.addEventListener('click',event=>{
    const mapTrigger=event.target.closest('[data-show-on-map]');
    if(mapTrigger){focusPlace(mapTrigger.dataset.showOnMap);return}
    const trigger=event.target.closest('[data-detail]');
    if(trigger&&dialog){const item=data.places.find(({id})=>id===trigger.dataset.detail);if(!item)return;dialogContent.innerHTML=`<p class="section-kicker">${escapeHtml(item.type)}</p><h2>${escapeHtml(item.name)}</h2><p class="map-dialog-en">${escapeHtml(item.english)}</p><p>${escapeHtml(item.reason)}</p><p><strong>위치</strong><br>${escapeHtml(item.address)}</p><div class="map-dialog-links">${item.detail?`<a href="${escapeHtml(item.detail)}">시드니픽 상세 가이드</a>`:''}<a href="${escapeHtml(item.official)}" target="_blank" rel="noopener noreferrer">공식 홈페이지 ↗</a><a href="${escapeHtml(item.map)}" target="_blank" rel="noopener noreferrer">구글 길찾기 ↗</a></div>`;dialog.showModal()}
    if(event.target.closest('[data-dialog-close]'))dialog.close();
  });
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

  const initial=readState();
  const params=new URLSearchParams(location.search);
  const hasInvalidRegion=params.has('region')&&!validRegions.has(params.get('region'));
  const hasInvalidType=params.has('type')&&!validTypes.has(params.get('type'));
  applyState(initial,{historyMode:hasInvalidRegion||hasInvalidType?'replace':null,mapMove:false,animate:false,announce:false});
  initMap();
})();
