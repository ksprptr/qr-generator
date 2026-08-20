import { IconName } from '@/components/common/Icon';

import { ErrorLevel, QrType, WifiEncryption } from '../enums/qr.enums';
import { Dispatch, SetStateAction } from 'react';

export interface QrFormProps {
  url: string;
  text: string;
  email: { to: string; subject: string; body: string };
  phone: string;
  sms: { number: string; message: string };
  wifi: { ssid: string; password: string; encryption: WifiEncryption; hidden: boolean };
  contact: {
    firstName: string;
    lastName: string;
    org: string;
    title: string;
    phone: string;
    email: string;
    url: string;
  };
  level: ErrorLevel;
  /** Pixel edge length of the exported PNG / SVG. */
  size: number;
}

export interface SelectOption<T> {
  value: T;
  label: string;
  /** One-line explanation shown under the select for the picked option. */
  hint: string;
}

export interface MenuItem {
  type: QrType;
  label: string;
  icon: IconName;
}

export interface FieldsProps {
  form: QrFormProps;
  setForm: Dispatch<SetStateAction<QrFormProps>>;
}
