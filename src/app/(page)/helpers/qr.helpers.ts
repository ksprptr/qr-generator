import { QR_BACKGROUND, QR_FOREGROUND, QR_MARGIN } from '../data/qr.data';
import { type ErrorLevel, QR_TYPES, QrType, WIFI_ENCRYPTIONS } from '../enums/qr.enums';
import { QrFormProps } from '../types/qr.types';
import QRCode from 'qrcode';

/**
 * Function to escape special characters for the WiFi QR format
 */
const escapeWifi = (value: string): string => value.replace(/([\\;,:"])/g, '\\$1');

/**
 * Function to build the raw string that gets encoded into the QR code.
 *
 * Everything is encoded directly into the QR — there is no backend, no redirect
 * and no link shortener — so the generated codes never expire.
 */
export const buildPayload = (type: QrType, form: QrFormProps): string => {
  switch (type) {
    case QR_TYPES.URL: {
      const value = form.url.trim();
      if (!value) return '';

      // Add a scheme so phones treat it as a link
      return /^[a-z][\w+.-]*:\/\//i.test(value) ? value : `https://${value}`;
    }

    case QR_TYPES.TEXT:
      return form.text;

    case QR_TYPES.EMAIL: {
      const { to, subject, body } = form.email;
      if (!to.trim()) return '';

      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);

      const query = params.toString();
      return `mailto:${to.trim()}${query ? `?${query}` : ''}`;
    }

    case QR_TYPES.PHONE: {
      const value = form.phone.trim();
      return value ? `tel:${value}` : '';
    }

    case QR_TYPES.SMS: {
      const { number, message } = form.sms;
      if (!number.trim()) return '';

      return message ? `SMSTO:${number.trim()}:${message}` : `SMSTO:${number.trim()}`;
    }

    case QR_TYPES.WIFI: {
      const { ssid, password, encryption, hidden } = form.wifi;
      if (!ssid.trim()) return '';

      const parts = [
        `T:${encryption}`,
        `S:${escapeWifi(ssid)}`,
        encryption !== WIFI_ENCRYPTIONS.NOPASS ? `P:${escapeWifi(password)}` : '',
        hidden ? 'H:true' : '',
      ].filter(Boolean);

      return `WIFI:${parts.join(';')};;`;
    }

    case QR_TYPES.CONTACT: {
      const contact = form.contact;
      if (!contact.firstName.trim() && !contact.lastName.trim() && !contact.org.trim()) return '';

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${contact.lastName};${contact.firstName};;;`,
        `FN:${`${contact.firstName} ${contact.lastName}`.trim()}`,
        contact.org ? `ORG:${contact.org}` : '',
        contact.title ? `TITLE:${contact.title}` : '',
        contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : '',
        contact.email ? `EMAIL:${contact.email}` : '',
        contact.url ? `URL:${contact.url}` : '',
        'END:VCARD',
      ].filter(Boolean);

      return lines.join('\n');
    }

    default:
      return '';
  }
};

/**
 * Function to render the payload as an SVG string for the live preview
 */
export const renderQrSvg = (payload: string, level: ErrorLevel): Promise<string> =>
  QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: level,
    margin: QR_MARGIN,
    color: { dark: QR_FOREGROUND, light: QR_BACKGROUND },
  });

/**
 * Function to render the payload onto a canvas at the given pixel scale, used for
 * PNG export and clipboard copying
 */
export const renderQrCanvas = async (
  payload: string,
  level: ErrorLevel,
  scale: number,
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');

  await QRCode.toCanvas(canvas, payload, {
    errorCorrectionLevel: level,
    margin: QR_MARGIN,
    scale,
    color: { dark: QR_FOREGROUND, light: QR_BACKGROUND },
  });

  return canvas;
};
