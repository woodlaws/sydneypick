function initFoodPages(){
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-toggle');
  menu?.addEventListener('click',()=>{const open=header?.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(Boolean(open)));});
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>header?.classList.remove('menu-open')));
  const buttons=[...document.querySelectorAll('[data-food-filter]')];
  const cards=[...document.querySelectorAll('[data-food-card]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.foodFilter;
    buttons.forEach(item=>item.classList.toggle('active',item===button));
    buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    cards.forEach(card=>{const tags=(card.dataset.foodCard||'').split(' ');card.hidden=value!=='all'&&!tags.includes(value);});
  }));
}
if(typeof document!=='undefined'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initFoodPages,{once:true});
  else initFoodPages();
}
