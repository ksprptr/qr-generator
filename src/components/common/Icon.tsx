import { ExtendedProps } from '@/common/types/global.types';

import {
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  LinkIcon,
  PencilSquareIcon,
  PhoneIcon,
  QrCodeIcon,
  UserIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

/**
 * Registry of the icons used across the app. Listing each icon explicitly keeps
 * the bundle tree-shakeable, unlike a namespace import with a dynamic lookup.
 */
const ICONS = {
  ArrowDownTray: ArrowDownTrayIcon,
  ChatBubbleLeftRight: ChatBubbleLeftRightIcon,
  Check: CheckIcon,
  ClipboardDocument: ClipboardDocumentIcon,
  Envelope: EnvelopeIcon,
  Link: LinkIcon,
  PencilSquare: PencilSquareIcon,
  Phone: PhoneIcon,
  QrCode: QrCodeIcon,
  User: UserIcon,
  Wifi: WifiIcon,
} as const;

export type IconName = keyof typeof ICONS;

interface Props extends ExtendedProps {
  icon: IconName;
  onClick?: () => void;
}

/**
 * Component representing an icon
 */
export default function Icon({ icon, className, onClick }: Props) {
  const Component = ICONS[icon];
  const composedClassName = `h-4 w-4 ${onClick ? 'cursor-pointer' : ''} ${className ?? ''}`;

  return <Component onClick={onClick} className={composedClassName} />;
}
