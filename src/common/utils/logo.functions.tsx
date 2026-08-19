import { logoConfig } from '@/configs/logo.config';

import type { ReactElement } from 'react';

/**
 * Function to build the logo icon paths, shared by the app logo and the OG image
 **/
// Returns an array rather than a fragment: Satori does not unwrap fragments inside `<svg>`.
export const logoIconNodes = (): ReactElement[] =>
  logoConfig.icon.nodes.map((node, index) =>
    node.tag === 'rect' ? (
      <rect
        key={index}
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={node.rx}
      />
    ) : (
      <path key={index} d={node.d} />
    ),
  );
