import { ExtendedProps } from '@/common/types/global.types';

import {
  Check,
  Clipboard,
  Download,
  Link,
  Mail,
  MessagesSquare,
  Phone,
  QrCode,
  SquarePen,
  User,
  Wifi,
} from 'lucide-react';

/** Icon registry — listing each icon explicitly keeps the bundle tree-shakeable. */
const ICONS = {
  Check,
  Clipboard,
  Download,
  Link,
  Mail,
  MessagesSquare,
  Phone,
  QrCode,
  SquarePen,
  User,
  Wifi,
} as const;

export type IconName = keyof typeof ICONS;

interface Props extends ExtendedProps {
  icon: IconName;
}

/**
 * Component representing an icon
 **/
export default function Icon({ icon, className }: Props) {
  const Component = ICONS[icon];

  return <Component className={`h-4 w-4 ${className ?? ''}`} />;
}
