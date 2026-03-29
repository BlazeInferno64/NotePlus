// Define a cache name with version
const VERSION = 'v5.5'; // Increment this to force cache update (v1, v2, v3, etc.)
const CACHE_NAME = `NotePlus ${VERSION}`;

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
    '/public/css/cartograph-regular-italic.woff2',
    'https://kit.fontawesome.com/f3220d5256.js' // Consider replacing this with a local copy
];

// External files that may fail (not critical for app to work)
const OPTIONAL_FILES_TO_CACHE = [
    'https://kit.fontawesome.com/f3220d5256.js' // Consider replacing this with a local copy
];


// Function to check if updates are available
async function checkForUpdates() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cachedFiles = new Set();
        const requests = await cache.keys();

        requests.forEach(req => cachedFiles.add(req.url));

        let updateAvailable = false;

        // Check each file for updates
        for (const file of FILES_TO_CACHE) {
            try {
                const response = await fetch(file, { cache: 'no-store' });
                if (response.ok) {
                    const cachedResponse = await cache.match(file);

                    // Compare by checking if content changed
                    if (cachedResponse) {
                        const newContent = await response.clone().text();
                        const oldContent = await cachedResponse.text();

                        if (newContent !== oldContent) {
                            console.log(`[Service Worker] Update available for: ${file}`);
                            updateAvailable = true;
                            // Update the cache with new version
                            cache.put(file, response.clone());
                            //break; // Stop checking further if an update is found
                        }
                    }
                }
            } catch (error) {
                console.error(`[Service Worker] Error checking update for ${file}:`, error);
            }
        }

        // Notify all clients about the update status
        const allClients = await clients.matchAll();
        if (updateAvailable) {
            allClients.forEach(client => {
                client.postMessage({
                    type: 'UPDATE_AVAILABLE',
                    message: 'A new version of Blaze Audio Player is available!'
                });
            });
        } else {
            // Explicitly notify that no update was found
            allClients.forEach(client => {
                client.postMessage({ type: 'NO_UPDATE_FOUND' });
            });
        }

        return updateAvailable;
    } catch (error) {
        console.error('[Service Worker] Error during update check:', error);
        return false;
    }
}

// Install event
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] Installing version ${VERSION}...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[Service Worker] Caching essential files...`);

                // Cache all required files
                return cache.addAll(FILES_TO_CACHE)
                    .then(() => {
                        console.log(`[Service Worker] ✓ All essential files cached successfully!`);

                        // Try to cache optional files but don't fail if they error
                        return Promise.allSettled(
                            OPTIONAL_FILES_TO_CACHE.map(file => cache.add(file))
                        ).then((results) => {
                            results.forEach((result, index) => {
                                if (result.status === 'fulfilled') {
                                    console.log(`[Service Worker] ✓ Optional file cached: ${OPTIONAL_FILES_TO_CACHE[index]}`);
                                } else {
                                    console.warn(`[Service Worker] ⚠ Failed to cache optional file: ${OPTIONAL_FILES_TO_CACHE[index]}`, result.reason);
                                }
                            });
                        });
                    });
            })
            .catch(err => {
                console.error(`[Service Worker] ✗ Caching failed: ${err}`);
                throw err;
            })
    );

    // Force the service worker to skip the waiting phase
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log(`[Service Worker] Activating version ${VERSION}...`);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            ).then(() => {
                console.log('[Service Worker] ✓ Cache cleanup complete');

                // Notify all clients that installation is complete
                return clients.matchAll().then((allClients) => {
                    allClients.forEach(client => {
                        client.postMessage({
                            type: 'INSTALLATION_COMPLETE',
                            version: VERSION,
                            message: 'Service Worker updated! Please refresh the page to load the latest version.'
                        });
                    });
                });
            });
        })
    );

    // Take control of all pages immediately
    self.clients.claim();
});

// Message event - listen for update check requests from the main page
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting(); // Forces the waiting service worker to become active
    }
    if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
        console.log('[Service Worker] Checking for updates...');
        checkForUpdates();
    }
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
