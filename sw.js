const CACHE_NAME = 'em-tech-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
  // Nota: El CSV no se pone aquí, se guarda en el localStorage desde el index.html para evitar conflictos de caché dura.
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