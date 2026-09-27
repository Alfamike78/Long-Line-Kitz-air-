# AS 350 Rope Cycles

App web per telefono (PWA) che sostituisce il foglio **APP950-GEN – Zyklen Liste für Transportleinen & Loggingleinen & 2er Gehänge für AS 350**.

- **Ropes**: anagrafica delle corde (ID del codice a barre Kitz-Air, tipo, lunghezza, colore, costruttore, S/N, WLL, data di fabbricazione, stato). Toccare una corda per modificarla.
- **New entry**: data, PIC e cicli per ogni corda in servizio.
- **Totals**: cicli totali per singola corda.
- **Log**: elenco, eliminazione, esportazione CSV (una riga per corda per registrazione) e backup/ripristino JSON.

Al primo avvio sono caricate come esempio le corde 1409 e 1411.

I dati restano **solo sul telefono** (localStorage). Scaricare un backup regolarmente.

## Installazione sul telefono

1. Pubblicare la cartella su un hosting HTTPS (es. GitHub Pages: *Settings → Pages → branch*).
2. Aprire l'indirizzo dal telefono → *Aggiungi a schermata Home*.
3. Dopo la prima apertura funziona anche offline.

Dopo ogni modifica ai file, incrementare `VERSIONE` in `sw.js`, altrimenti i telefoni continuano a usare la versione in cache.
