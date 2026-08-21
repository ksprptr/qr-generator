import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
};

/**
 * Component representing the page shown when a navigation fails while offline
 **/
export default function Offline() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <p className='text-sm font-semibold tracking-widest text-indigo-500 uppercase'>Offline</p>
      <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50'>No connection</h1>
      <p className='max-w-md text-zinc-500 dark:text-zinc-400'>
        This page has not been opened before, so there is no cached copy. Pages you have already
        visited keep working — QR codes are generated in your browser, not on a server.
      </p>
    </div>
  );
}
