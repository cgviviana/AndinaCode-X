const CACHE_NAME = "andina-codex-v1";

const urlsToCache = [
  "/AndinaCode-X/ENTORNO/index.html",
  "/AndinaCode-X/ENTORNO/styles-original.css",
  "/AndinaCode-X/ENTORNO/IMAGENES/Bitnarys.png",
  "/AndinaCode-X/ENTORNO/IMAGENES/Codara.png",
  "/AndinaCode-X/ENTORNO/IMAGENES/Tekron.png",
  "/AndinaCode-X/ENTORNO/AUDIO/Space.mp3",
  "/AndinaCode-X/ENTORNO/AUDIO/Viaje.mp3",
  "/AndinaCode-X/ENTORNO/AUDIO/Texto.mp3"
];

// Instalar Service Worker y guardar archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar Service Worker y limpiar cachés viejos
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

// Interceptar las peticiones y responder desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
