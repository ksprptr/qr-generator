'use client';

import { motion } from 'framer-motion';

/**
 * Component representing the page hero
 */
export default function Hero() {
  return (
    <div className='text-center'>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className='text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl'>
        QR <span className='text-indigo-500'>Generator</span>
      </motion.h1>

      <motion.p
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.05 }}
        className='mx-auto mt-4 max-w-xl text-base text-zinc-500 sm:text-lg'>
        Free, private QR codes that never expire.
      </motion.p>
    </div>
  );
}
