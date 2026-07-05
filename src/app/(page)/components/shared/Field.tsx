import { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

/**
 * Shared input class name used across all QR form fields
 */
export const inputClassName =
  'w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500';

/**
 * Component representing a labeled form field
 */
export default function Field({ label, children }: Props) {
  return (
    <label className='block text-left'>
      <span className='mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400'>{label}</span>
      {children}
    </label>
  );
}
