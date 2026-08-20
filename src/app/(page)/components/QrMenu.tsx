'use client';

import Icon from '@/components/common/Icon';

import { QR_MENU } from '../data/qr.data';
import { QrType } from '../enums/qr.enums';
import { motion } from 'motion/react';
import Link from 'next/link';

interface Props {
  currentType: QrType;
}

/**
 * Component representing the QR type menu
 **/
export default function QrMenu({ currentType }: Props) {
  return (
    <motion.ul
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.1 }}
      className='flex flex-wrap justify-center gap-2'>
      {QR_MENU.map(({ type, label, icon }) => {
        const active = currentType === type;

        return (
          <li key={type}>
            <Link
              href={`/?type=${type.toLowerCase()}`}
              scroll={false}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out ${
                active
                  ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/30'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}>
              <Icon icon={icon} className='h-4 w-4' />
              {label}
            </Link>
          </li>
        );
      })}
    </motion.ul>
  );
}
