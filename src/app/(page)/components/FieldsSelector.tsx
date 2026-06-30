import { QR_TYPES, QrType } from '../enums/qr.enums';
import { FieldsProps } from '../types/qr.types';
import ContactFields from './fields/ContactFields';
import EmailFields from './fields/EmailFields';
import PhoneFields from './fields/PhoneFields';
import SmsFields from './fields/SmsFields';
import TextFields from './fields/TextFields';
import UrlFields from './fields/UrlFields';
import WifiFields from './fields/WifiFields';

interface Props extends FieldsProps {
  type: QrType;
}

/**
 * Component representing a fields selector
 */
export default function FieldsSelector({ type, form, setForm }: Props) {
  switch (type) {
    case QR_TYPES.URL:
      return <UrlFields form={form} setForm={setForm} />;
    case QR_TYPES.TEXT:
      return <TextFields form={form} setForm={setForm} />;
    case QR_TYPES.WIFI:
      return <WifiFields form={form} setForm={setForm} />;
    case QR_TYPES.EMAIL:
      return <EmailFields form={form} setForm={setForm} />;
    case QR_TYPES.PHONE:
      return <PhoneFields form={form} setForm={setForm} />;
    case QR_TYPES.SMS:
      return <SmsFields form={form} setForm={setForm} />;
    case QR_TYPES.CONTACT:
      return <ContactFields form={form} setForm={setForm} />;
  }
}
