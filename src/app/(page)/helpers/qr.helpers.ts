import { QR_BACKGROUND, QR_FOREGROUND, QR_MARGIN } from '../data/qr.data';
import { type ErrorLevel, QR_TYPES, QrType, WIFI_ENCRYPTIONS } from '../enums/qr.enums';
import { QrFormProps } from '../types/qr.types';
import QRCode from 'qrcode';

/**
 * Function to escape special characters for the WiFi QR format
 **/
const escapeWifi = (value: string): string => value.replace(/([\\;,:"])/g, '\\$1');

/**
 * Function to escape a vCard text value (RFC 2426)
 **/
const escapeVCard = (value: string): string =>
  value.replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');

/**
 * Function to build the raw string that gets encoded into the QR code
 **/
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

      // Not URLSearchParams: it encodes a space as `+`, which mail clients take literally.
      const params = [
        subject ? `subject=${encodeURIComponent(subject)}` : '',
        body ? `body=${encodeURIComponent(body)}` : '',
      ].filter(Boolean);

      return `mailto:${to.trim()}${params.length ? `?${params.join('&')}` : ''}`;
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

      const { firstName, lastName, org, title, phone, email, url } = contact;

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
        `FN:${escapeVCard(`${firstName} ${lastName}`.trim())}`,
        org ? `ORG:${escapeVCard(org)}` : '',
        title ? `TITLE:${escapeVCard(title)}` : '',
        phone ? `TEL;TYPE=CELL:${escapeVCard(phone)}` : '',
        email ? `EMAIL:${escapeVCard(email)}` : '',
        url ? `URL:${escapeVCard(url)}` : '',
        'END:VCARD',
      ].filter(Boolean);

      // vCard lines are CRLF-delimited; a bare \n trips the stricter phone parsers.
      return lines.join('\r\n');
    }

    default:
      return '';
  }
};

/**
 * Function to render the payload as an SVG string — without a size it carries only a `viewBox`
 **/
export const renderQrSvg = (payload: string, level: ErrorLevel, size?: number): Promise<string> =>
  QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: level,
    margin: QR_MARGIN,
    width: size,
    color: { dark: QR_FOREGROUND, light: QR_BACKGROUND },
  });

/**
 * Function to render the payload onto a canvas, used for PNG export and clipboard copying
 **/
export const renderQrCanvas = async (
  payload: string,
  level: ErrorLevel,
  size: number,
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');

  await QRCode.toCanvas(canvas, payload, {
    errorCorrectionLevel: level,
    margin: QR_MARGIN,
    width: size,
    color: { dark: QR_FOREGROUND, light: QR_BACKGROUND },
  });

  return canvas;
};

/**
 * Function to count the modules (the little squares) along one edge of the code
 **/
export const getQrModuleCount = (payload: string, level: ErrorLevel): number => {
  try {
    return QRCode.create(payload, { errorCorrectionLevel: level }).modules.size;
  } catch {
    return 0;
  }
};
