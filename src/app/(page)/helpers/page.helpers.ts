import { QR_TYPES, QrType } from '../enums/qr.enums';

/**
 * Function to get a QR type from search parameters
 */
export const getQrType = (type: string | undefined): QrType => {
  if (!type) return QR_TYPES.URL;

  const qrType = Object.values(QR_TYPES).find((value) => value.toLowerCase() === type.toLowerCase());

  return qrType || QR_TYPES.URL;
};
