// Offline support for every tool on this site.
// Pages load from the network when online (so updates arrive) and fall back to the saved copy offline.
// When you add or change a tool, add its files to FILES and bump VERSION.
const VERSION = "tools-v30";
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
  "icons/ev-charge-180.png", "icons/ev-charge-192.png", "icons/ev-charge-512.png",
  "gem-blend/",
  "gem-blend/index.html",
  "gem-blend/manifest.webmanifest",
  "icons/gem-blend-180.png", "icons/gem-blend-192.png", "icons/gem-blend-512.png",
  "turbo-toolkit/",
  "turbo-toolkit/index.html",
  "turbo-toolkit/manifest.webmanifest",
  "icons/turbo-toolkit-180.png", "icons/turbo-toolkit-192.png", "icons/turbo-toolkit-512.png",
  "instrukit/",
  "instrukit/index.html",
  "instrukit/manifest.webmanifest",
  "icons/instrukit-180.png", "icons/instrukit-192.png", "icons/instrukit-512.png",
  "health-explorer/",
  "health-explorer/index.html",
  "health-explorer/manifest.webmanifest",
  "icons/health-explorer-180.png", "icons/health-explorer-192.png", "icons/health-explorer-512.png",
  "icons/health-explorer-maskable-512.png"
];

self.addEventListener("install", e => {
  // Cache each file on its own so one missing icon can't block the whole install.
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(FILES.map(f => c.add(f).catch(err => console.warn("sw: not cached", f, err)))))
    .then(() => self.skipWaiting()));
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
  const cached = () => caches.match(req, { ignoreSearch: true });
  // Revalidate past the HTTP cache so a deploy shows up straight away.
  const net = fetch(req, { cache: "no-cache" }).then(res => {
    if (res.ok) { const copy = res.clone(); e.waitUntil(caches.open(VERSION).then(c => c.put(req, copy))); }
    return res;
  });
  // On a slow connection, serve the cached copy after 3.5 s (if there is one).
  const slow = new Promise(r => setTimeout(r, 3500)).then(() => cached()).then(hit => hit || net);
  e.respondWith(Promise.race([net, slow]).catch(() => cached().then(hit => hit || net)));
});
