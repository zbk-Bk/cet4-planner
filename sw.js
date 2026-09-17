/* 离线缓存：首次打开后即可断网使用 */
var CACHE = 'cet4-v1';
var FILES = [
  './', './index.html', './manifest.webmanifest',
  './assets/css/app.css',
  './assets/js/data-vocab.js', './assets/js/data-reading.js', './assets/js/data-writing.js',
  './assets/js/data-skills.js', './assets/js/util.js', './assets/js/libs.js', './assets/js/store.js',
  './assets/js/plan.js', './assets/js/practice.js', './assets/js/practice2.js', './assets/js/views.js',
  './assets/icons/icon.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return; /* 云同步请求不缓存 */
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () { return caches.match('./index.html'); });
    })
  );
});
