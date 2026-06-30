import { type ErrorLevel, QR_TYPES, WIFI_ENCRYPTIONS } from '../enums/qr.enums';
import { MenuItem, QrFormProps } from '../types/qr.types';

/**
 * Menu items shown as the QR type selector
 */
export const QR_MENU: MenuItem[] = [
  { type: QR_TYPES.URL, label: 'URL', icon: 'Link' },
  { type: QR_TYPES.TEXT, label: 'Text', icon: 'PencilSquare' },
  { type: QR_TYPES.WIFI, label: 'WiFi', icon: 'Wifi' },
  { type: QR_TYPES.EMAIL, label: 'Email', icon: 'Envelope' },
  { type: QR_TYPES.PHONE, label: 'Phone', icon: 'Phone' },
  { type: QR_TYPES.SMS, label: 'SMS', icon: 'ChatBubbleLeftRight' },
  { type: QR_TYPES.CONTACT, label: 'Contact', icon: 'User' },
];

/**
 * Error correction options
 */
export const ERROR_LEVEL_OPTIONS: { value: ErrorLevel; label: string }[] = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

/**
 * Default form state
 */
export const defaultForm: QrFormProps = {
  url: '',
  text: '',
  email: { to: '', subject: '', body: '' },
  phone: '',
  sms: { number: '', message: '' },
  wifi: { ssid: '', password: '', encryption: WIFI_ENCRYPTIONS.WPA, hidden: false },
  contact: { firstName: '', lastName: '', org: '', title: '', phone: '', email: '', url: '' },
  level: 'M',
};

/**
 * Fixed margin (quiet zone) around the QR code
 */
export const QR_MARGIN = 1;

/**
 * Colors used when rendering the QR code
 */
export const QR_FOREGROUND = '#18181b';
export const QR_BACKGROUND = '#ffffff';
