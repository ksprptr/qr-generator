/* eslint-disable react-hooks/set-state-in-effect -- async QR generation has no sync API */
'use client';

import { ErrorLevel } from '../enums/qr.enums';
import { renderQrSvg } from '../helpers/qr.helpers';
import { useEffect, useState } from 'react';

interface QrCodeState {
  svg: string;
  error: string;
}

const GENERATION_ERROR = 'Failed to generate the QR code.';

/**
 * Hook that derives the SVG preview for a payload.
 *
 * The qrcode library has no synchronous API, so generation runs in an effect.
 * A cancelled flag drops results from a stale run when inputs change mid-flight.
 */
export function useQrCode(payload: string, level: ErrorLevel): QrCodeState {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!payload.trim()) {
      setSvg('');
      setError('');
      return;
    }

    let cancelled = false;

    renderQrSvg(payload, level)
      .then((markup) => {
        if (cancelled) return;
        setSvg(markup);
        setError('');
      })
      .catch((exception: unknown) => {
        if (cancelled) return;
        setSvg('');
        setError(exception instanceof Error ? exception.message : GENERATION_ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, [payload, level]);

  return { svg, error };
}
