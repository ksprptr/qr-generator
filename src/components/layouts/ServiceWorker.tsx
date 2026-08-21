'use client';

import { useEffect } from 'react';

/**
 * Component that registers the service worker backing offline use
 **/
// `updateViaCache: 'none'` stops the browser serving a stale worker from its HTTP cache.
export default function ServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(() => {
      // Unsupported or blocked — the app works fine online without it.
    });
  }, []);

  return null;
}
