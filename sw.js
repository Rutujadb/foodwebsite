const cacheName = 'local_cache';
const assets = ['/', 'index.html', 'css\\all.min.css', 'css\\templatemo-style.css', 'sw.js', 'manifest.json',  'contact.html', 'about.html', 'js/app.js', 'js/jquery,min.js', 'js/parallax.min.js',"img\\gallery\\01.jpg",'img\\gallery\\02.jpg','img\\gallery\\03.jpg','img\\gallery\\04.jpg'];
self.addEventListener('install', function (event) { console.log('Service Worker Installed'); 
  event.waitUntil(caches.open(cacheName).then(cache => {
      cache.addAll(assets);
  }));});
self.addEventListener('activate', function (event) { console.log('Service Worker Activated'); });
self.addEventListener('fetch', function (event) { console.log('Service Worker Fetch', event); 
  event.respondWith(caches.match(event.request).then(function (response) {return response || fetch(event.request);}));});
  self.addEventListener('sync', event => {
    if (event.tag === 'persistToDatabase') {
      event.waitUntil(persistLocalChanges()
        .then(() => {
          self.registration.showNotification("Markdowns synced to server");
        })
        .catch(() => {
          console.log("Error syncing markdowns to server");
        })
      );
    }
  });