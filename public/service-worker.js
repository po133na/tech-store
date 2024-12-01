const CACHE_NAME = 'pwa-cache-v1';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/fallback.html',
  '/icon.png', // Optional: Your app icon
];

const API_URLS_TO_CACHE = [
  'http://localhost:5002/categories', // Cache categories API endpoint
  'http://localhost:5002/products',   // Cache products API endpoint
  'http://localhost:5001/users',      // Cache users API endpoint for registration
];

// Install event - Pre-cache static files and API responses for categories, products, and users
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets and API responses');
      // Add static files to the cache
      cache.addAll(STATIC_FILES);
      // Cache categories, products, and users API responses (GET only)
      return Promise.all(
        API_URLS_TO_CACHE.map((url) => {
          return fetch(url, { method: 'GET' }) // Ensure we're using GET
            .then((response) => {
              if (response.ok) {
                return cache.put(url, response.clone());
              }
              return null;
            })
            .catch((err) => {
              console.error('[Service Worker] Error fetching API:', err);
            });
        })
      );
    })
  );
  self.skipWaiting(); // Activate the service worker immediately
});

// Activate event - Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages
});

// Fetch event - Cache-first strategy for static files and API responses
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    // Cache GET requests for categories, products, and users
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            // Cache the GET response for categories, products, and users
            if (
              event.request.url.includes('/categories') ||
              event.request.url.includes('/products') ||
              event.request.url.includes('/users')
            ) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then((cache) =>
                cache.put(event.request.url, clonedResponse)
              );
            }
            return response;
          }).catch(() => caches.match('/fallback.html')) // Offline fallback
        );
      })
    );
  }

  // Skip POST requests from being cached
  if (event.request.method === 'POST' && event.request.url.includes('/users')) {
    // Handle the registration POST request
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          return response;
        })
        .catch((err) => {
          console.error('[Service Worker] Error during registration POST:', err);
          return caches.match('/fallback.html'); // Fallback in case of error
        })
    );

    // Do not attempt to cache POST requests
    return; // No cache action needed
  }
});

// Push Notifications (if you plan to use push notifications in the future)
self.addEventListener('push', (event) => {
  let data;

  try {
    // Attempt to parse the payload as JSON
    data = event.data ? event.data.json() : {};
  } catch (error) {
    // Fallback for plain string payloads
    data = { title: event.data ? event.data.text() : 'Default Title', body: '' };
  }

  const options = {
    body: data.body || 'Default Body',
    icon: '/icon.png', // Optional: Path to notification icon
    badge: '/badge.png', // Optional: Path to badge icon
  };

  // Check if notification permissions are granted
  if (Notification.permission === 'granted') {
    event.waitUntil(
      self.registration.showNotification(data.title || 'Default Title', options)
    );
  } else {
    console.warn('Notification permission not granted. Skipping notification.');
  }
});
