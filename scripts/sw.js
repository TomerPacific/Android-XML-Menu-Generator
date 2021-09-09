var CACHE_NAME = 'androidmenugenerator';
var STATUS_CODE_OK = 200;
var BASIC_RESPONSE_TYPE = 'basic';
var urlsToCache = [
	'./',
   './index.html',
   './style.css',
   './script.js',
   'https://code.jquery.com/jquery-3.2.1.slim.min.js',
   'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
   'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
   'https://smtpjs.com/v3/smtp.js'
];


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll(urlsToCache.map(function(url) {
      return new Request(url, {mode : 'no-cors'});
     })).then(function() {
      console.log("Service Worker: Install completed");
     })
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