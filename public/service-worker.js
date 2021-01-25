var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
var FILES_TO_CACHE = [
  "/",
  "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

//set up event listener
self.addEventListener("instal", function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            //Then pre-cache all of the files to cache. (Pre-caching is done in anticipation)
            console.log("Your files were pre-cahced successfully!");
            return cache.addAll(FILES_TO_CACHE);
            self.skipWaiting();
})

)
});

// self.addEventListener("activate", (event) => {
//     const currentCaches = [PRECACHE, RUNTIME];
//     event.waitUntil(
//         caches
//         .keys()
//         .then((cacheNames) =>
//         return cacheNames.filter(
//             (cacheName) => !currentCaches.includes(cacheName) 
//         );
//         )
// })
// .then((cachesToDelete) => {
//     return Promise.all
//     cachesToDelete.map((cacheToDelete) => {
//     return caches.delete(cacheToDelete);
// });
// }
// )
// .then(( => self.ClientRectList.claim())
// );
// });

self.addEventListener("fetch", (event) => {if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(event.request);
          });
      }).catch(err => console.log(err))
    );
    return;
  }
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          // return the cached home page for all requests for html pages
          return caches.match("/");
        }
      });
    })
  );
    
})



//add event listener


//wait till we retrieve keys from cache
