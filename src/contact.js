function initTrustPages(){
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle');
 menu?.addEventListener('click',()=>{const open=header?.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(Boolean(open)))});
 document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>header?.classList.remove('menu-open')));

 const form=document.querySelector('[data-contact-form]');
 if(!form)return;
 const config=window.__CONTACT_CONFIG__||{},message=form.querySelector('[data-contact-message]'),submit=form.querySelector('[data-contact-submit]');
 const openedAt=Date.now();let started=false,submitting=false;
 const track=(event)=>{window.dispatchEvent(new CustomEvent('sydneypick:analytics',{detail:{event}}));if(Array.isArray(window.dataLayer))window.dataLayer.push({event})};
 track('contact_view');
 const query=new URLSearchParams(location.search),type=query.get('type'),product=query.get('product');
 const typeMap={partnership:'제휴·광고',correction:'정보 수정·제보',privacy:'개인정보 문의'};
 if(typeMap[type])form.elements.inquiryType.value=typeMap[type];
 if(product&&[...form.elements.product.options].some(option=>option.value===product))form.elements.product.value=product;
 document.querySelectorAll('[data-contact-type]').forEach(button=>button.addEventListener('click',()=>{form.elements.inquiryType.value=button.dataset.contactType;form.elements.inquiryType.focus();form.scrollIntoView({behavior:'smooth',block:'center'})}));
 form.addEventListener('focusin',()=>{if(!started){started=true;track('contact_form_start')}},{once:true});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;
  if(!form.reportValidity()){message.textContent='필수항목, 이메일 형식과 개인정보 동의를 확인해주세요.';return}
  const data=new FormData(form);
  if(data.get('website')||Date.now()-openedAt<2500){message.textContent='잠시 후 다시 시도해주세요.';return}
  if(!config.privacyReady||!config.endpoint){message.textContent='현재 문의 기능 준비 중입니다. 입력한 내용은 전송되거나 저장되지 않았습니다.';return}
  submitting=true;submit.disabled=true;submit.textContent='문의를 안전하게 전송 중…';message.textContent='페이지를 닫지 말고 잠시 기다려주세요.';
  const payload={submittedAt:new Date().toISOString(),inquiryType:String(data.get('inquiryType')||''),name:String(data.get('name')||'').trim(),email:String(data.get('email')||'').trim(),company:String(data.get('company')||'').trim(),phone:String(data.get('phone')||'').trim(),referenceUrl:String(data.get('referenceUrl')||'').trim(),product:String(data.get('product')||''),message:String(data.get('message')||'').trim(),privacyConsent:data.get('privacyConsent')==='yes',sourcePage:document.referrer?new URL(document.referrer).pathname:'/',status:'new',note:''};
  try{const response=await fetch(config.endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),redirect:'follow'});const result=await response.json().catch(()=>null);if(!response.ok||!result||result.success!==true)throw new Error('Submission not confirmed');track('contact_submit');form.reset();message.textContent='문의가 정상적으로 접수되었습니다.'}
  catch{message.textContent='문의를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.'}
  finally{submitting=false;submit.disabled=false;submit.textContent='문의 보내기'}
 });
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initTrustPages,{once:true});else initTrustPages()}
