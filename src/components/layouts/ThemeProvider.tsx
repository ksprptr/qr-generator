'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

/**
 * Component that follows the system color scheme (light / dark).
 *
 * There is no theme switch — the theme is driven solely by the user's OS
 * preference through `prefers-color-scheme`.
 */
export default function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
