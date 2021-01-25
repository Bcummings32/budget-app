const { cache } = require("webpack");


const FILES_TO_CACHE = [
    "db.js",
    "/index.html",
    "/index.js",
    "/style.css",
    "/manifest.webmanifest",
    "/favicon.ico",
    "/assets/images/icons/icon-72x72.png",
    "/assets/images/icons/icon-96x96.png",
    "/assets/images/icons/icon-128x128.png",
    "/assets/images/icons/icon-144x144.png",
    "/assets/images/icons/icon-152x152.png",
    "/assets/images/icons/icon-192x192.png",
    "/assets/images/icons/icon-384x384.png",
    "/assets/images/icons/icon-512x512.png"
]

const CACHE_NAME = "static-cache-v1", DATA_CACHE_NAME = "data-cache-v1";

//set up event listener
self.addEventListener("instal", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            //Then pre-cache all of the files to cache. (Pre-caching is done in anticipation)
            console.log("Your files were pre-cahced successfully!");
            return cache.addAll(FILES_TO_CACHE);
            self.skipWaiting();
});

        })
});

self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
        .keys()
        .then((cacheNames) =>
        return cacheNames.filter(
            (cacheName) => !currentCaches.includes(cacheName) 
        );
        )
})
.then((cachesToDelete) => {
    return Promise.all
    cachesToDelete.map((cacheToDelete) => {
    return caches.delete(cacheToDelete);
});
}
)
.then(( => self.ClientRectList.claim())
);
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedREsponse) {
                    return.cachedResponse;
                }
                return caches.open(RUNTIME).then((cache) => {
                    return fetch(event.request).then((response) => {
                      return cache.put(event.request, response.clone()).then(() => {
                        return response;

            })
        )
    }
}
)



//add event listener


//wait till we retrieve keys from cache
