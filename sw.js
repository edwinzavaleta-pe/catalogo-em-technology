const CACHE_NAME = 'em-tech-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve la versión en caché si existe, si no, busca en la red
      return response || fetch(event.request);
    })
  );
});
