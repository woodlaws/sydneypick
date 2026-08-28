const HEADERS = [
  '접수일시', '이름', '이메일', '여행 예정 시기', '여행기간', '여행 유형',
  '관심정보', '개인정보 동의', '마케팅 수신 동의', '유입페이지',
  'UTM Source', 'UTM Medium', 'UTM Campaign', '처리상태', '메모'
];

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return jsonResponse({ success: false, error: 'busy' });
  try {
    const data = JSON.parse(event.postData.contents || '{}');
    const email = String(data.email || '').trim();
    const name = String(data.name || '').trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || data.privacyConsent !== true) {
      return jsonResponse({ success: false, error: 'validation_failed' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      new Date(), name, email, data.travelPeriod || '', data.duration || '',
      data.travelType || '', data.interest || '', '동의',
      data.marketingConsent === true ? '동의' : '미동의', data.sourcePage || '',
      data.utmSource || '', data.utmMedium || '', data.utmCampaign || '',
      data.status || 'new', data.note || ''
    ]);
    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}
