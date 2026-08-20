import { appConfig } from '@/configs/app.config';

import type { MetadataRoute } from 'next';

/** Last meaningful content change — a build timestamp would claim one on every deploy. */
const LAST_MODIFIED = new Date('2026-08-17');

/**
 * Sitemap — the app has two indexable routes: the generator and the logo page
 **/
export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${appConfig.urls.appUrl}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${appConfig.urls.appUrl}/logo`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
