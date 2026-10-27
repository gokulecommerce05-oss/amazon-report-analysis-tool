/**
 * 2G Vibe Daily Label Entry — Google Sheet connector.
 *
 * Paste this into your sheet (Extensions → Apps Script), set ACCESS_KEY,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Put the Web app URL and the same ACCESS_KEY into the tool's settings.
 */
const ACCESS_KEY = 'change-me-to-a-long-secret';
const TAB = 'Orders';
const HEADERS = ['Dispatch date', 'Platform', 'Order ID', 'SKU ID', 'Product', 'Qty', 'Amount', 'Payment', 'Courier', 'AWB', 'Customer', 'State', 'Order date'];
const ORDER_COL = 3; // column C
const AWB_COL = 10;  // column J

function doGet() {
  return ContentService.createTextOutput('2G Vibe label connector is running.');
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }
  if (ACCESS_KEY === 'change-me-to-a-long-secret' || body.key !== ACCESS_KEY) {
    return json_({ ok: false, error: 'wrong_key' });
  }
  if (body.action === 'ids') return json_({ ok: true, ids: [...orderIds_(sheet_())] });
  if (body.action === 'append') return json_(append_(body.rows || []));
  return json_({ ok: false, error: 'bad_request' });
}

function append_(rows) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const sh = sheet_();
    const have = orderIds_(sh);
    const todo = [], skipped = [];
    rows.forEach(r => {
      const id = norm_(r[ORDER_COL - 1]);
      if (!id || have.has(id)) { skipped.push(r[ORDER_COL - 1]); return; }
      have.add(id);
      todo.push(r.slice(0, HEADERS.length));
    });
    let start = 0, end = 0;
    if (todo.length) {
      start = sh.getLastRow() + 1;
      end = start + todo.length - 1;
      // Keep Order IDs and AWBs as text so long numbers are not rounded.
      sh.getRange(start, ORDER_COL, todo.length, 1).setNumberFormat('@');
      sh.getRange(start, AWB_COL, todo.length, 1).setNumberFormat('@');
      sh.getRange(start, 1, todo.length, HEADERS.length).setValues(todo);
    }
    return { ok: true, added: todo.length, start, end, skipped, sheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl() };
  } finally {
    lock.releaseLock();
  }
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function orderIds_(sh) {
  const last = sh.getLastRow();
  if (last < 2) return new Set();
  return new Set(sh.getRange(2, ORDER_COL, last - 1, 1).getDisplayValues().map(v => norm_(v[0])).filter(Boolean));
}

function norm_(v) {
  return String(v || '').replace(/^'/, '').trim().toUpperCase();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
