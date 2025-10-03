const CACHE_NAME = "andina-cache-v2";
const urlsToCache = [
  "/AndinaCode-X/ENTORNO/index.html",
  "/AndinaCode-X/ENTORNO/styles-original.css",
  "/AndinaCode-X/ENTORNO/original-style.css",
  "/AndinaCode-X/ENTORNO/manifest.json"
];

// INSTALAR: guarda los archivos iniciales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVAR: limpia caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH: primero busca en caché, si no existe lo descarga y lo guarda dinámicamente
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // usar lo que está en caché
      }
      return fetch(event.request).then((networkResponse) => {
        // Guardar en caché dinámico solo si es válido
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          let responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Aquí puedes mostrar una página offline personalizada si quieres
        return caches.match("/AndinaCode-X/ENTORNO/index.html");
      });
    })
  );
});
