export const QR_TYPES = {
  URL: 'URL',
  TEXT: 'TEXT',
  WIFI: 'WIFI',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  SMS: 'SMS',
  CONTACT: 'CONTACT',
} as const;

export const WIFI_ENCRYPTIONS = {
  WPA: 'WPA',
  WEP: 'WEP',
  NOPASS: 'nopass',
} as const;

export const ERROR_LEVELS = {
  L: 'L',
  M: 'M',
  Q: 'Q',
  H: 'H',
} as const;

export type QrType = keyof typeof QR_TYPES;

export type WifiEncryption = (typeof WIFI_ENCRYPTIONS)[keyof typeof WIFI_ENCRYPTIONS];

export type ErrorLevel = keyof typeof ERROR_LEVELS;
