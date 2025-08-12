// Instalación del Service Worker
// Activación del Service Worker
// Estrategia Cache First para assets estáticos
// Manejo de mensajes del cliente

// Service Worker para Galaxia AndinaCode X
// Service Worker para Galaxia AndinaCode X
const CACHE_NAME = 'galaxia-andinacode-v2.0.0';
const STATIC_ASSETS = [
  './',
  './ENTORNO/index.html',
  './INGRESO/Index.html',
  './assets/css/variables.css',
  './assets/css/base.css', 
  './assets/css/layout.css',
  './assets/css/animations.css',
  './assets/css/components.css',
  './assets/js/config.js',
  './assets/js/utils.js',
  './assets/js/audio-manager.js',
  './assets/js/animation-manager.js',
  './assets/js/app.js',
  './assets/images/Bitnarys.png',
  './assets/images/Codara.png',
  './assets/images/Tekron.png',
  './assets/images/AccesoSi.png',
  './assets/images/AccesoNo.png',
  './assets/audio/Space.mp3',
  './assets/audio/Viaje.mp3',
  './assets/audio/Texto.mp3'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto:', CACHE_NAME);
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Error al cachear assets:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia Cache First para assets estáticos
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en cache, devolverlo
        if (response) {
          return response;
        }
        
        // Si no está en cache, intentar red
        return fetch(event.request)
          .then((response) => {
            // Verificar si es una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para el cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Fallback para navegación offline
            if (event.request.destination === 'document') {
              return caches.match('./ENTORNO/index.html');
            }
          });
      })
  );
});

// Manejo de mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

