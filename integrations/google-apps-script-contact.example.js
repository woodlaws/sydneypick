const CONTACT_HEADERS=['접수일시','문의유형','이름','이메일','회사명','연락처','참고링크','관심상품','문의내용','개인정보동의','유입페이지','처리상태','메모'];
function contactResponse(payload){return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON)}
function doPost(event){
 const lock=LockService.getScriptLock();if(!lock.tryLock(10000))return contactResponse({success:false,error:'busy'});
 try{
  const data=JSON.parse(event.postData.contents||'{}'),email=String(data.email||'').trim(),name=String(data.name||'').trim(),message=String(data.message||'').trim();
  if(!data.inquiryType||!name||!/^\S+@\S+\.\S+$/.test(email)||!message||data.privacyConsent!==true)return contactResponse({success:false,error:'validation_failed'});
  const sheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();if(sheet.getLastRow()===0)sheet.appendRow(CONTACT_HEADERS);
  sheet.appendRow([new Date(),data.inquiryType,name,email,data.company||'',data.phone||'',data.referenceUrl||'',data.product||'',message,'동의',data.sourcePage||'',data.status||'new',data.note||'']);
  return contactResponse({success:true});
 }catch(error){return contactResponse({success:false,error:'server_error'})}finally{lock.releaseLock()}
}
