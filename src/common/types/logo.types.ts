export type LogoIconNode =
  | { tag: 'rect'; x: number; y: number; width: number; height: number; rx: number }
  | { tag: 'path'; d: string };

export interface LogoConfig {
  /** Edge length of the square canvas (also the SVG viewBox). */
  size: number;
  /** Corner radius of the background tile. */
  radius: number;
  background: string;
  foreground: string;
  icon: {
    grid: number;
    box: number;
    strokeWidth: number;
    nodes: LogoIconNode[];
  };
}
