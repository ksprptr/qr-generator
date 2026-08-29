import { AppConfig, MetadataConfig } from '@/common/types/metadata.types';

/** Web metadata — the single source for the layout metadata, manifest, robots and the OG image. */
export const metadataConfig: MetadataConfig = {
  title: 'QR Generator',
  shortTitle: 'QR Generator',
  tagline: 'Permanent QR codes that never expire',
  subtitle: 'Free, private QR codes that never expire.',
  description:
    'Generate modern QR codes that never expire. The data is encoded directly into the code — no backend, no tracking, no expiration. Free and easy to use!',
  keywords: [
    'qr generator',
    'qr code generator',
    'qr code',
    'free qr code',
    'permanent qr',
    'qr code that never expires',
    'wifi qr code',
    'vcard qr',
    'contact qr code',
    'email qr code',
    'sms qr code',
    'phone qr code',
    'svg qr code',
    'png qr code',
    'offline qr generator',
    'no tracking',
    'open source',
  ],
  author: {
    name: 'Petr Kašpar',
    url: 'https://ksprptr.dev',
  },
  repositoryUrl: 'https://github.com/ksprptr/qr-generator',
  colors: {
    background: '#fafafa',
    theme: '#6366f1',
  },
};

/** Application configuration — read on the server only, holds no secrets. */
export const appConfig: AppConfig = {
  urls: {
    // Security: the only origin source — `x-forwarded-host` is client-supplied and not trusted.
    appUrl: (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  },
};
