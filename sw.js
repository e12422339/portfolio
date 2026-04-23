// Service Worker v7 - Fixed for GitHub Pages subpath /portfolio/
const CACHE_NAME = 'portfolio-v7';

// Use relative paths - works regardless of deployment path
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => {
        console.log('SW install cache error (non-fatal):', err);
        return self.skipWaiting();
      })
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for APIs, cache-first for app shell
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Always use network for external APIs (stock prices etc.)
  const isExternal = (
    url.includes('yahoo.com') ||
    url.includes('twse.com.tw') ||
    url.includes('tpex.org.tw') ||
    url.includes('allorigins.win') ||
    url.includes('corsproxy.io') ||
    url.includes('codetabs.com') ||
    url.includes('jsdelivr.net') ||
    url.includes('cdn.')
  );

  if (isExternal) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('{}', { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // Cache-first for app shell (works offline)
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Only cache successful same-origin responses
          if (response.ok && response.type !== 'opaque') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return response;
        });
      })
      .catch(() => {
        // Offline fallback: return cached index.html for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
