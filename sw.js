const CACHE_NAME = 'em-tech-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg',
  './catalogo_productos_limpio.csv'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve la versión en caché si existe, si no, busca en la red
      return response || fetch(event.request).catch(() => {
        // Fallback de navegación si se intenta cargar sin red
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});