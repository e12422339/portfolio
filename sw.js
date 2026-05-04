const CACHE = 'portfolio-v8';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Pass through all external API calls (stock prices, crypto, etc.)
  const isExternal = [
    'yahoo.com','twse.com.tw','tpex.org.tw','binance.com',
    'coingecko.com','allorigins.win','corsproxy.io','codetabs.com',
    'jsdelivr.net','cdn.','stooq.com'
  ].some(d => url.includes(d));

  if (isExternal) {
    e.respondWith(fetch(e.request).catch(() => new Response('{}', {headers:{'Content-Type':'application/json'}})));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
