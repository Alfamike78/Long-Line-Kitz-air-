// Rende l'app utilizzabile offline (in campo spesso non c'è rete).
// Cambiare VERSIONE a ogni rilascio per aggiornare la cache sui telefoni.
const VERSIONE = 'v2';
const FILE = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIONE).then(c => c.addAll(FILE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(chiavi =>
    Promise.all(chiavi.filter(k => k !== VERSIONE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
