var CACHE_NAME = 'androidmenugenerator';
var STATUS_CODE_OK = 200;
var BASIC_RESPONSE_TYPE = 'basic';
var urlsToCache = [
	'./',
   './index.html',
   './style.css',
   './script.js'
];


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll(urlsToCache);
   }).then(function() {
   		console.log("Service Worker: Install completed");
   }).catch(function(error) {
   	console.log("Service Worker: " + error);
   })
  ); 
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request)
        .then(function(response){
            if (!response || response.status !== STATUS_CODE_OK || response.type !== BASIC_RESPONSE_TYPE) {
               return response;
            }

            var cachedResponse = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
               cache.put(event.request, cachedResponse);
            });

            return response;
        });
      }
    )
  );
});