importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('androidmenugenerator').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/style.css',
       '/script.js'
     ]);
   }).then(function() {
   		console.log("Service Worker: Install completed");
   })
 );
});