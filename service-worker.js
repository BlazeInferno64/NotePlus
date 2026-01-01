// Define a cache name
const CACHE_NAME = 'NotePlus';

// List of files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/public/css/styles.css',
    '/public/js/file-info.js',
    '/public/js/script.js',
    '/public/js/search.js',
    '/public/js/themes.js',
    '/public/js/fetch.js',
    '/public/js/ai.js',
    '/manifest.json',
    '/public/img/icon.png',
    'https://kit.fontawesome.com/f3220d5256.js' // Consider replacing this with a local copy
];

// Install event
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] Installing...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[Service Worker] Caching essential files...`);
                return Promise.all(
                    FILES_TO_CACHE.map(async (file) => {
                        return cache.add(file).catch((error) => {
                            console.error('Failed to cache:', file, error);
                        });
                    })
                );
            })
            .catch(err => {
                return console.error(`[Service Worker] Caching failed: ${err}`);
            })
    );

    // Force the service worker to skip the waiting phase
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response from cache
                if (response) {
                    console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
                    return response;
                }
                console.log(`[Service Worker] Fetching from network: ${event.request.url}`);
                return fetch(event.request);
            })
    );
});
