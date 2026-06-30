import FooterBadge from '@/components/layouts/FooterBadge';
import GitHubLink from '@/components/layouts/GitHubLink';
import Layout from '@/components/layouts/Layout';
import { metadataConfig } from '@/configs/app.config';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: metadataConfig.title,
  description: metadataConfig.description,
  keywords: metadataConfig.keywords,
};

/**
 * Component representing a root layout
 */
export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.className} relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-900 antialiased`}>
        {/* Decorative background */}
        <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
          <div className='animate-float absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl' />
          <div className='animate-float-slow absolute top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/15 blur-3xl' />
          <div className='animate-float absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-100/20 blur-3xl' />
        </div>

        <Layout>{children}</Layout>

        <FooterBadge />
        <GitHubLink />
      </body>
    </html>
  );
}
