// Offline support for every tool on this site.
// Pages load from the network when online (so updates arrive) and fall back to the saved copy offline.
// When you add or change a tool, add its files to FILES and bump VERSION.
const VERSION = "tools-v3";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/hub-180.png", "icons/hub-192.png", "icons/hub-512.png",
  "vo2max/",
  "vo2max/index.html",
  "vo2max/manifest.webmanifest",
  "icons/vo2max-180.png", "icons/vo2max-192.png", "icons/vo2max-512.png",
  "ev-charge/",
  "ev-charge/index.html",
  "ev-charge/manifest.webmanifest",
  "icons/ev-charge-180.png", "icons/ev-charge-192.png", "icons/ev-charge-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
