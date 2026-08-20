import { PropsWithChildren } from 'react';

/**
 * Component representing a layout
 **/
export default function Layout({ children }: PropsWithChildren) {
  return <main className='mx-auto max-w-5xl px-4'>{children}</main>;
}
