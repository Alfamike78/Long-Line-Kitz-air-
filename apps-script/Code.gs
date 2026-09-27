// Script Google collegato al foglio "Kitz Air – Rope Cycles DB".
// Riceve le modifiche dall'app e restituisce tutti i dati. Nulla viene mai cancellato:
// le eliminazioni sono righe con deleted = true, e ogni modifica ricevuta finisce in History.

// Codice di accesso: lo stesso va inserito nell'app (Log → Google Drive sync).
const TOKEN = 'CHANGE-ME';

const TABELLE = {
  Ropes: ['id', 'type', 'length', 'color', 'manufacturer', 'serial', 'wll', 'mfg', 'note', 'deleted', 'updatedAt', 'updatedBy'],
  Entries: ['id', 'date', 'pic', 'cycles', 'deleted', 'updatedAt', 'updatedBy'],
  History: ['receivedAt', 'table', 'id', 'action', 'by', 'data'],
};

function doPost(e) {
  let req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return risposta({ error: 'Invalid request.' }); }
  if (TOKEN === 'CHANGE-ME' || req.token !== TOKEN) return risposta({ error: 'Wrong access code.' });

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    for (const c of req.changes || []) {
      if (c.table !== 'Ropes' && c.table !== 'Entries') continue;
      applica(ss, c.table, c.item);
    }
    return risposta({ ropes: leggiTabella(ss, 'Ropes'), entries: leggiTabella(ss, 'Entries') });
  } finally {
    lock.releaseLock();
  }
}

function foglio(ss, nome) {
  let sh = ss.getSheetByName(nome);
  if (!sh) {
    sh = ss.insertSheet(nome);
    scriviRiga(sh, 1, TABELLE[nome]);
  }
  return sh;
}

// Tutto come testo, altrimenti Sheets trasforma "1409" in numero e "2024-11" in data.
function scriviRiga(sh, riga, valori) {
  sh.getRange(riga, 1, 1, valori.length).setNumberFormat('@').setValues([valori]);
}

function applica(ss, tabella, item) {
  const sh = foglio(ss, tabella);
  const colonne = TABELLE[tabella];
  const valori = colonne.map(k => item[k] == null ? '' : typeof item[k] === 'object' ? JSON.stringify(item[k]) : String(item[k]));
  const ids = sh.getRange(1, 1, sh.getLastRow(), 1).getDisplayValues().map(r => r[0]);
  const i = ids.indexOf(String(item.id));
  let azione = item.deleted ? 'delete' : i > 0 ? 'update' : 'create';
  if (i > 0) {
    // Vince la modifica più recente: una modifica vecchia arrivata in ritardo (telefono offline) non sovrascrive.
    const attuale = sh.getRange(i + 1, colonne.indexOf('updatedAt') + 1).getDisplayValue();
    if (attuale > valori[colonne.indexOf('updatedAt')]) azione = 'ignored (older than sheet)';
    else scriviRiga(sh, i + 1, valori);
  } else {
    scriviRiga(sh, sh.getLastRow() + 1, valori);
  }
  const storia = foglio(ss, 'History');
  scriviRiga(storia, storia.getLastRow() + 1,
    [new Date().toISOString(), tabella, String(item.id), azione, String(item.updatedBy || ''), JSON.stringify(item)]);
}

function leggiTabella(ss, nome) {
  const [intestazione, ...righe] = foglio(ss, nome).getDataRange().getDisplayValues();
  return righe.filter(r => r[0]).map(r => Object.fromEntries(intestazione.map((k, j) => [k, r[j]])));
}

function risposta(dati) {
  return ContentService.createTextOutput(JSON.stringify(dati)).setMimeType(ContentService.MimeType.JSON);
}
