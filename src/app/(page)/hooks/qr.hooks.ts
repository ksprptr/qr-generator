/* eslint-disable react-hooks/set-state-in-effect -- async QR generation has no sync API */
'use client';

import { ErrorLevel } from '../enums/qr.enums';
import { getQrModuleCount, renderQrSvg } from '../helpers/qr.helpers';
import { useEffect, useState } from 'react';

interface QrCodeState {
  svg: string;
  /** Modules along one edge, resolved together with the preview so the two never disagree. */
  moduleCount: number;
  error: string;
}

const GENERATION_ERROR = 'Failed to generate the QR code.';

/** Collapses a typing burst into a single encode. */
const DEBOUNCE_MS = 150;

const EMPTY_STATE: QrCodeState = { svg: '', moduleCount: 0, error: '' };

/**
 * Hook that derives the SVG preview and the module count for a payload
 **/
export function useQrCode(payload: string, level: ErrorLevel): QrCodeState {
  const [state, setState] = useState<QrCodeState>(EMPTY_STATE);

  useEffect(() => {
    if (!payload.trim()) {
      setState(EMPTY_STATE);
      return;
    }

    // Drops the result of a stale run when the inputs change mid-flight.
    let cancelled = false;

    const timeout = setTimeout(() => {
      renderQrSvg(payload, level)
        .then((svg) => {
          if (cancelled) return;
          setState({ svg, moduleCount: getQrModuleCount(payload, level), error: '' });
        })
        .catch((exception: unknown) => {
          if (cancelled) return;
          const message = exception instanceof Error ? exception.message : GENERATION_ERROR;
          setState({ ...EMPTY_STATE, error: message });
        });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [payload, level]);

  return state;
}
