# AS 350 Rope Cycles

App web per telefono (PWA) che sostituisce il foglio **APP950-GEN – Zyklen Liste für Transportleinen & Loggingleinen & 2er Gehänge für AS 350**.

- **Inserisci**: data, PIC, Farbcode e cicli per Dämpfung, 10/20/30 m, Loggingleine rot/blau, 2er Gehänge rot/gelb/blau.
- **Totali**: cicli sommati per ogni attrezzatura (le Transportleinen sono separate per Farbcode).
- **Registro**: elenco, eliminazione, esportazione CSV (colonne come il foglio cartaceo) e backup/ripristino JSON.

I dati restano **solo sul telefono** (localStorage). Scaricare un backup regolarmente.

## Installazione sul telefono

1. Pubblicare la cartella su un hosting HTTPS (es. GitHub Pages: *Settings → Pages → branch*).
2. Aprire l'indirizzo dal telefono → *Aggiungi a schermata Home*.
3. Dopo la prima apertura funziona anche offline.

Dopo ogni modifica ai file, incrementare `VERSIONE` in `sw.js`, altrimenti i telefoni continuano a usare la versione in cache.
