import { buildAppSchema } from '@/common/utils/schema.functions';
import JsonLd from '@/components/common/JsonLd';
import { appConfig } from '@/configs/app.config';

import Hero from './components/Hero';
import PrivacyNote from './components/PrivacyNote';
import QrGenerator from './components/QrGenerator';
import QrMenu from './components/QrMenu';
import { getQrType } from './helpers/page.helpers';
import type { Metadata } from 'next';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

// The type selector lives in `?type=`, so every variant canonicalizes to the bare route.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Component representing a home page
 **/
export default async function Page({ searchParams }: Props) {
  const { type } = await searchParams;
  const currentType = getQrType(type);

  return (
    <section className='flex flex-col gap-10 py-16 sm:py-24'>
      <JsonLd schema={buildAppSchema(appConfig.urls.appUrl)} />

      <Hero />
      <QrMenu currentType={currentType} />
      <QrGenerator key={currentType} type={currentType} />

      <PrivacyNote />
    </section>
  );
}
