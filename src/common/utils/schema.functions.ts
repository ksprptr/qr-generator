import { metadataConfig } from '@/configs/app.config';

/**
 * Function to build the `WebApplication` structured data for the generator page
 **/
export const buildAppSchema = (origin: string): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: metadataConfig.title,
  alternateName: `${metadataConfig.title} · ${metadataConfig.tagline}`,
  description: metadataConfig.description,
  url: `${origin}/`,
  image: `${origin}/api/og`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: metadataConfig.author.name,
    url: metadataConfig.author.url,
  },
  codeRepository: metadataConfig.repositoryUrl,
  license: 'https://opensource.org/licenses/MIT',
  featureList: [
    'URL, text, WiFi, email, phone, SMS and contact (vCard) QR codes',
    'Live preview while typing',
    'PNG and SVG export with a selectable output size',
    'Adjustable error correction level',
    'Fully client-side — no backend, no tracking',
  ],
});
