import { type ErrorLevel, QR_TYPES, WIFI_ENCRYPTIONS } from '../enums/qr.enums';
import { MenuItem, QrFormProps, SelectOption } from '../types/qr.types';

/** Menu items shown as the QR type selector */
export const QR_MENU: MenuItem[] = [
  { type: QR_TYPES.URL, label: 'URL', icon: 'Link' },
  { type: QR_TYPES.TEXT, label: 'Text', icon: 'SquarePen' },
  { type: QR_TYPES.WIFI, label: 'WiFi', icon: 'Wifi' },
  { type: QR_TYPES.EMAIL, label: 'Email', icon: 'Mail' },
  { type: QR_TYPES.PHONE, label: 'Phone', icon: 'Phone' },
  { type: QR_TYPES.SMS, label: 'SMS', icon: 'MessagesSquare' },
  { type: QR_TYPES.CONTACT, label: 'Contact', icon: 'User' },
];

/** Error correction options — a higher recovery rate is paid for with extra modules. */
export const ERROR_LEVEL_OPTIONS: SelectOption<ErrorLevel>[] = [
  {
    value: 'L',
    label: 'Low — recovers 7%',
    hint: 'Fewest modules, biggest squares. Best on screen.',
  },
  {
    value: 'M',
    label: 'Medium — recovers 15%',
    hint: 'Balanced default for both screen and print.',
  },
  {
    value: 'Q',
    label: 'Quartile — recovers 25%',
    hint: 'Survives smudges, creases or a small logo on top.',
  },
  {
    value: 'H',
    label: 'High — recovers 30%',
    hint: 'Toughest and densest. For stickers and rough prints.',
  },
];

/** Export size options — the pixel edge length of the exported PNG / SVG. */
export const SIZE_OPTIONS: SelectOption<number>[] = [
  { value: 256, label: 'Small — 256 px', hint: 'Inline use, chat messages, email signatures.' },
  { value: 512, label: 'Medium — 512 px', hint: 'Web pages and slides.' },
  { value: 1024, label: 'Large — 1024 px', hint: 'Flyers, posters and most printing.' },
  { value: 2048, label: 'Huge — 2048 px', hint: 'Large-format print and archiving.' },
];

/** Default form state */
export const defaultForm: QrFormProps = {
  url: '',
  text: '',
  email: { to: '', subject: '', body: '' },
  phone: '',
  sms: { number: '', message: '' },
  wifi: { ssid: '', password: '', encryption: WIFI_ENCRYPTIONS.WPA, hidden: false },
  contact: { firstName: '', lastName: '', org: '', title: '', phone: '', email: '', url: '' },
  level: 'M',
  size: 1024,
};

/** Fixed margin (quiet zone) around the QR code */
export const QR_MARGIN = 1;

/** Colors used when rendering the QR code */
export const QR_FOREGROUND = '#18181b';
export const QR_BACKGROUND = '#ffffff';
