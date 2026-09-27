# AS 350 Rope Cycles

App web per telefono (PWA) che sostituisce il foglio **APP950-GEN – Zyklen Liste für Transportleinen & Loggingleinen & 2er Gehänge für AS 350**.

- **Ropes**: anagrafica delle corde (ID del codice a barre Kitz-Air, tipo, lunghezza, colore, costruttore, S/N, WLL, data di fabbricazione). Toccare una corda per modificarla; "Remove" la nasconde dall'app.
- **New entry**: data, PIC e cicli per ogni corda.
- **Totals**: cicli totali per singola corda.
- **Log**: elenco con modifica ed eliminazione, esportazione CSV, impostazioni di sincronizzazione.

## Dati e sincronizzazione

I dati stanno in un foglio Google (schede `Ropes`, `Entries`, `History`), collegato all'app da `apps-script/Code.gs`.

- L'app salva sempre prima sul telefono e invia al foglio appena c'è rete.
- Nel foglio **nulla viene cancellato**: eliminare una registrazione o rimuovere una corda imposta `deleted = true`, e ogni modifica ricevuta è registrata in `History`.
- Se due telefoni modificano la stessa riga vince la modifica più recente.

Configurazione: vedi il documento *LEGGIMI* nella cartella Drive, oppure copiare `apps-script/Code.gs` in *Estensioni → Apps Script* del foglio, impostare `TOKEN`, pubblicare come *App web* (esegui come: me, accesso: chiunque) e inserire URL e codice nell'app (*Log → Google Drive sync*).

## Installazione sul telefono

1. Pubblicare la cartella su un hosting HTTPS (es. GitHub Pages: *Settings → Pages → branch*).
2. Aprire l'indirizzo dal telefono → *Aggiungi a schermata Home*.
3. Dopo la prima apertura funziona anche offline.

Dopo ogni modifica ai file, incrementare `VERSIONE` in `sw.js`, altrimenti i telefoni continuano a usare la versione in cache.
