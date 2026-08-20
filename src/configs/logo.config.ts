import { LogoConfig } from '@/common/types/logo.types';

/** The app logo (lucide `qr-code`, ISC licensed) as data — one definition for every consumer. */
export const logoConfig: LogoConfig = {
  size: 512,
  // Tighter than a 25% corner: iOS masks icons with its own squircle, leaving corner gaps.
  radius: 104,
  background: '#6366f1',
  foreground: '#ffffff',
  icon: {
    /** The lucide icon is authored on a 24×24 grid. */
    grid: 24,
    /** Edge length the icon occupies inside the tile (leaves a 76px inset per side). */
    box: 360,
    strokeWidth: 2,
    nodes: [
      { tag: 'rect', x: 3, y: 3, width: 5, height: 5, rx: 1 },
      { tag: 'rect', x: 16, y: 3, width: 5, height: 5, rx: 1 },
      { tag: 'rect', x: 3, y: 16, width: 5, height: 5, rx: 1 },
      { tag: 'path', d: 'M21 16h-3a2 2 0 0 0-2 2v3' },
      { tag: 'path', d: 'M21 21v.01' },
      { tag: 'path', d: 'M12 7v3a2 2 0 0 1-2 2H7' },
      { tag: 'path', d: 'M3 12h.01' },
      { tag: 'path', d: 'M12 3h.01' },
      { tag: 'path', d: 'M12 16v.01' },
      { tag: 'path', d: 'M16 12h1' },
      { tag: 'path', d: 'M21 12v.01' },
      { tag: 'path', d: 'M12 21v-1' },
    ],
  },
};

/** Scale + offset that center the icon grid inside the tile. */
export const logoGeometry = {
  scale: logoConfig.icon.box / logoConfig.icon.grid,
  offset: (logoConfig.size - logoConfig.icon.box) / 2,
};

/** File name used when the logo is downloaded */
export const LOGO_FILE_NAME = 'qr-generator-logo.svg';
