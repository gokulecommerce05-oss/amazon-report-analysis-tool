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
const SKU_COL = 4;   // column D
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
  if (body.action === 'ids') {
    const sh = sheet_();
    return json_({ ok: true, ids: [...orderIds_(sh)], keys: [...rowKeys_(sh)] });
  }
  if (body.action === 'append') return json_(append_(body.rows || []));
  if (body.action === 'orders') return json_(orders_());
  return json_({ ok: false, error: 'bad_request' });
}

function append_(rows) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const sh = sheet_();
    // One order can hold several products: a row is a repeat only if Order ID AND SKU match.
    const have = rowKeys_(sh);
    const todo = [], skipped = [], skippedKeys = [];
    rows.forEach(r => {
      const id = norm_(r[ORDER_COL - 1]);
      const key = id + '|' + norm_(r[SKU_COL - 1]);
      if (!id || have.has(key)) { skipped.push(r[ORDER_COL - 1]); skippedKeys.push(key); return; }
      have.add(key);
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
    return { ok: true, added: todo.length, start, end, skipped, skippedKeys, sheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl() };
  } finally {
    lock.releaseLock();
  }
}

// Read-only rows for the tool's Sales report. Only the columns the report needs:
// dispatch date, platform, order ID, SKU, product, qty, amount, Master SKU, Master product,
// unit cost, total cost. Customer names and states are not sent.
function orders_() {
  const sh = sheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, rows: [] };
  const width = Math.min(sh.getLastColumn(), 17); // A..Q
  const tz = Session.getScriptTimeZone();
  const day = v => v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : String(v || '');
  const v = sh.getRange(2, 1, last - 1, width).getValues();
  const rows = v.filter(r => String(r[2] || '').trim()).map(r =>
    [day(r[0]), r[1], String(r[2]), String(r[3] || ''), String(r[4] || ''), r[5], r[6], r[13] || '', r[14] || '', r[15] === undefined ? '' : r[15], r[16] === undefined ? '' : r[16]]);
  return { ok: true, rows };
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

function rowKeys_(sh) {
  const last = sh.getLastRow();
  if (last < 2) return new Set();
  return new Set(sh.getRange(2, ORDER_COL, last - 1, SKU_COL - ORDER_COL + 1).getDisplayValues()
    .filter(v => norm_(v[0])).map(v => norm_(v[0]) + '|' + norm_(v[SKU_COL - ORDER_COL])));
}

function norm_(v) {
  return String(v || '').replace(/^'/, '').trim().toUpperCase();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
