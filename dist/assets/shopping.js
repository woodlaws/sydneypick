function initShopping(){
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle');
 menu?.addEventListener('click',()=>{const open=header?.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(Boolean(open)))});
 document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>header?.classList.remove('menu-open')));
 const filters=[...document.querySelectorAll('[data-shopping-filter]')],cards=[...document.querySelectorAll('[data-shopping-card]')];
 filters.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.shoppingFilter;filters.forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button))});cards.forEach(card=>{card.hidden=value!=='all'&&!card.dataset.shoppingCard.split(' ').includes(value)})}));
 const page=document.body.dataset.shoppingPage||'hub',key=`sydneyPickShopping:${page}`;let state={};
 try{state=JSON.parse(localStorage.getItem(key)||'{}')}catch{state={}}
 const inputs=[...document.querySelectorAll('[data-shopping-check]')],save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{}},progress=()=>{const done=inputs.filter(x=>x.checked).length;const el=document.querySelector('[data-check-progress]');if(el)el.textContent=`${done} / ${inputs.length} 완료`};
 inputs.forEach(input=>{input.checked=Boolean(state[input.dataset.shoppingCheck]);input.addEventListener('change',()=>{state[input.dataset.shoppingCheck]=input.checked;save();progress()})});progress();
 let custom=[];try{custom=JSON.parse(localStorage.getItem(`${key}:custom`)||'[]')}catch{custom=[]}
 const customList=document.querySelector('[data-shopping-custom-items]'),persistCustom=()=>{try{localStorage.setItem(`${key}:custom`,JSON.stringify(custom))}catch{}},renderCustom=()=>{if(!customList)return;customList.innerHTML=custom.map((item,i)=>`<label><input type="checkbox" data-custom-shopping="${i}" ${item.done?'checked':''}><span>${item.text.replace(/[<>&]/g,'')}</span></label>`).join('');customList.querySelectorAll('[data-custom-shopping]').forEach(x=>x.addEventListener('change',()=>{custom[Number(x.dataset.customShopping)].done=x.checked;persistCustom()}))};
 document.querySelector('[data-shopping-custom-form]')?.addEventListener('submit',event=>{event.preventDefault();const field=event.currentTarget.querySelector('input');const text=field?.value.trim();if(!text)return;custom.push({text,done:false});persistCustom();field.value='';renderCustom()});renderCustom();
 document.querySelector('[data-reset-shopping]')?.addEventListener('click',()=>{state={};custom=[];save();persistCustom();inputs.forEach(x=>x.checked=false);progress();renderCustom()});
 document.querySelector('[data-print-shopping]')?.addEventListener('click',()=>window.print());
 document.querySelector('[data-share-shopping]')?.addEventListener('click',async event=>{try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else await navigator.clipboard.writeText(location.href);event.currentTarget.textContent=navigator.share?'공유 완료':'링크 복사 완료'}catch(error){if(error?.name!=='AbortError')event.currentTarget.textContent='공유할 수 없어요'}})
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initShopping,{once:true});else initShopping()}
