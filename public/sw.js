/* Service worker mínimo de VetCheck: habilita instalación (PWA) y un
   fallback offline básico. Estrategia network-first para no servir
   contenido viejo; si no hay red, cae al app-shell cacheado. */

const CACHE = 'vetcheck-v1'
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/pwa-192.png', '/pwa-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // Navegaciones: network-first, fallback al shell cacheado.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/').then((r) => r || caches.match('/index.html'))),
    )
    return
  }

  // Recursos: network-first con respaldo en caché.
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(request, copy))
        return res
      })
      .catch(() => caches.match(request)),
  )
})
