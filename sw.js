var CACHE_NAME = 'androidmenugenerator';
var urlsToCache = [
	'/',
   'index.html',
   'style.css',
   'script.js'
];


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll(urlsToCache);
   }).then(function() {
   		console.log("Service Worker: Install completed");
   }).catch(function(error) {
   	console.log("Service Worker: " + error);
   }
 );
});