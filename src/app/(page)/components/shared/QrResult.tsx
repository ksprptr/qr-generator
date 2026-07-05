'use client';

import { ErrorLevel } from '@/app/(page)/enums/qr.enums';
import { renderQrCanvas } from '@/app/(page)/helpers/qr.helpers';
import { useQrCode } from '@/app/(page)/hooks/qr.hooks';
import Icon from '@/components/common/Icon';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  payload: string;
  level: ErrorLevel;
}

const PNG_EXPORT_SCALE = 12;
const CLIPBOARD_SCALE = 10;
const COPIED_RESET_MS = 2000;
const DOWNLOAD_FILE_PREFIX = 'qr-code';

/**
 * Function to trigger a browser download for the given href
 */
function triggerDownload(href: string, fileName: string) {
  const link = document.createElement('a');

  link.href = href;
  link.download = fileName;
  link.click();
}

/**
 * Component representing the QR result section with the preview and actions
 */
export default function QrResult({ payload, level }: Props) {
  const { svg, error } = useQrCode(payload, level);
  const [copied, setCopied] = useState(false);

  const hasContent = payload.trim().length > 0;

  const downloadPng = async () => {
    if (!hasContent) return;

    const canvas = await renderQrCanvas(payload, level, PNG_EXPORT_SCALE);
    triggerDownload(canvas.toDataURL('image/png'), `${DOWNLOAD_FILE_PREFIX}-${Date.now()}.png`);
  };

  const downloadSvg = () => {
    if (!svg) return;

    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    triggerDownload(url, `${DOWNLOAD_FILE_PREFIX}-${Date.now()}.svg`);
    URL.revokeObjectURL(url);
  };

  const copyImage = async () => {
    if (!hasContent) return;

    try {
      const canvas = await renderQrCanvas(payload, level, CLIPBOARD_SCALE);
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);

      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard API unavailable or blocked — silently ignore.
    }
  };

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.08 }}
      className='flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
      {/* Preview */}
      <div className='mx-auto flex aspect-square w-full max-w-70 items-center justify-center overflow-hidden rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950'>
        <AnimatePresence mode='wait'>
          {hasContent && svg ? (
            <motion.div
              key='qr'
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
              className='h-full w-full [&>svg]:h-full [&>svg]:w-full'
              // QR SVG is generated locally by the qrcode library
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <motion.div
              key='placeholder'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col items-center gap-3 text-center text-zinc-300 dark:text-zinc-600'>
              <Icon icon='QrCode' className='h-16 w-16' />
              <p className='text-sm text-zinc-400 dark:text-zinc-500'>Fill in the form to generate a code</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className='text-center text-sm text-indigo-600 dark:text-indigo-400'>{error}</p>}

      {/* Actions */}
      <div className='flex flex-col gap-2.5'>
        <div className='grid grid-cols-2 gap-2.5'>
          <button
            type='button'
            onClick={downloadPng}
            disabled={!hasContent}
            className='flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-indigo-600 disabled:hover:bg-indigo-500'>
            <Icon icon='ArrowDownTray' className='h-4 w-4' />
            PNG
          </button>
          <button
            type='button'
            onClick={downloadSvg}
            disabled={!hasContent}
            className='flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors duration-150 ease-out hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'>
            <Icon icon='ArrowDownTray' className='h-4 w-4' />
            SVG
          </button>
        </div>
        <button
          type='button'
          onClick={copyImage}
          disabled={!hasContent || copied}
          className='flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors duration-150 ease-out hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'>
          <Icon
            icon={copied ? 'Check' : 'ClipboardDocument'}
            className={`h-4 w-4 ${copied ? 'text-indigo-500' : ''}`}
          />
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
      </div>

      <p className='text-center text-xs text-zinc-400 dark:text-zinc-500'>
        This QR code never expires — the data lives inside it.
      </p>
    </motion.section>
  );
}
