// Initialize required variables - Cache Assets
var shellCacheName = "pwa-travel-v1.1";
var filesToCache = [
  "./"
  ,"./index_travel.html"
  ,"./resource/css/travel/travel.css"
  ,"./resource/js/travel/app.js"
  ,"./resource/css/travel/bootstrap.min.css"
  ,"./resource/css/travel/bootstrap-theme.min.css"
  ,"./resource/css/travel/fontAwesome.css"
  ,"./resource/css/travel/jquery.modal.css"
  ,"./resource/css/travel/jquery.modal.theme-xenon.css"
  ,"./resource/css/travel/jquery.modal.theme-atlant.css"
  ,"./resource/js/travel/vendor/jquery-1.11.2.min.js"
  ,"./resource/js/travel/vendor/bootstrap.min.js"
  ,"./resource/js/travel/vendor/modernizr-2.8.3-respond-1.4.2.min.js"
  ,"./resource/js/plugins/jquery-ui/jquery-ui.min.js"
  ,"./resource/js/plugins/jquery-ui/touch-dnd.js"
  ,"./resource/js/travel/jquery.modal.js"
  ,"https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css"
  ,"https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"
  ,"https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"
];

// Listen to installation event
self.addEventListener("install", function(e) {
  //console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(shellCacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

// Listen to activation event - Update Assets Cache
self.addEventListener("activate", function(e) {
  //console.log("[ServiceWorker] Activate");
  e.waitUntil(
    // Get all cache containers
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          // Check and remove invalid cache containers
          if (key !== shellCacheName) {
            //console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  // Enforce immediate scope control
  return self.clients.claim();
});

// Listen to fetching event - Serve App Shell Offline From Cache
self.addEventListener("fetch", function(e) {
  //console.log("[ServiceWorker] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
