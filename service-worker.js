const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192x192.png",
  "./icon-512x512.png",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  "https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css",
  "https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css",
  "https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css",
  "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js",
  "https://code.jquery.com/jquery-3.6.0.min.js",
  "https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js",
  "https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js",
  "https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js",
  "https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js",
  "https://cdn.datatables.net/buttons/2.4.1/js/buttons.print.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"
];

// Instala o service worker e adiciona os arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o service worker e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde com o cache, se disponível
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});