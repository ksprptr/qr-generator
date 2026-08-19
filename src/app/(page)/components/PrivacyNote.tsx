'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

/**
 * Component representing the privacy note under the generator, with the link to the logo page
 **/
export default function PrivacyNote() {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.16 }}
      className='flex flex-col items-center gap-1.5 text-center text-xs text-zinc-400 dark:text-zinc-500'>
      <p>Everything is generated in your browser — no upload, no account, no tracking.</p>
      <Link
        href='/logo'
        className='underline decoration-dotted underline-offset-2 transition-colors duration-150 ease-out hover:text-indigo-500'>
        Logo assets
      </Link>
    </motion.div>
  );
}
