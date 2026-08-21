/** Bump when the caching strategy changes; older caches are dropped on activate. */
const CACHE = 'qr-generator-v1';

/** Served when a navigation fails and nothing matching is cached. */
const OFFLINE_URL = '/offline';

// Every page the app can show, so an offline visit gets the right one instead of a near miss.
const PRECACHE_PAGES = [
  '/',
  ...['url', 'text', 'wifi', 'email', 'phone', 'sms', 'contact'].map((type) => `/?type=${type}`),
  '/logo',
  OFFLINE_URL,
];

/** Unhashed files under `public/`, which runtime caching would only pick up on a second visit. */
const PRECACHE_ASSETS = [
  '/assets/easter-egg/pikachu.webp',
  '/logo.svg',
  '/manifest.webmanifest',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
];

/**
 * Function to cache the shell pages and the hashed build assets they reference
 **/
// Parsing the markup replaces a build-time precache manifest, so the first offline visit works.
const precache = async () => {
  const cache = await caches.open(CACHE);
  const assets = new Set();

  for (const page of PRECACHE_PAGES) {
    try {
      const response = await fetch(page, { cache: 'reload' });
      if (!response.ok) continue;

      const markup = await response.clone().text();
      for (const match of markup.matchAll(/\/_next\/static\/[^"']+?\.(?:js|css|woff2)/g)) {
        assets.add(match[0]);
      }

      await cache.put(page, response);
    } catch {
      // Offline during install — runtime caching picks these up later.
    }
  }

  await Promise.allSettled([...assets, ...PRECACHE_ASSETS].map((asset) => cache.add(asset)));
};

/**
 * Function to serve immutable build output from the cache, falling back to the network
 **/
const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) (await caches.open(CACHE)).put(request, response.clone());

  return response;
};

/**
 * Function to prefer the network so a new deploy is picked up immediately
 **/
const networkFirst = async (request, isNavigation) => {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(CACHE)).put(request, response.clone());

    return response;
  } catch {
    // Exact match only: falling back across query strings would silently show the wrong type.
    const cached = await caches.match(request);
    if (cached) return cached;

    return isNavigation ? caches.match(OFFLINE_URL) : Response.error();
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // The liveness probe must always reach the server.
  if (url.pathname === '/api/health') return;

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request, request.mode === 'navigate'));
});
