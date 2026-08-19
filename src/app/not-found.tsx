import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * Component representing the 404 page
 **/
export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center'>
      <p className='text-sm font-semibold tracking-widest text-indigo-500 uppercase'>Error 404</p>
      <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50'>Page not found</h1>
      <p className='max-w-md text-zinc-500 dark:text-zinc-400'>
        This page does not exist — but your QR codes still do.
      </p>
      <Link
        href='/'
        className='rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-indigo-600'>
        Back to the generator
      </Link>
    </div>
  );
}
