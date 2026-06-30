import Hero from './components/Hero';
import QrGenerator from './components/QrGenerator';
import QrMenu from './components/QrMenu';
import { getQrType } from './helpers/page.helpers';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

/**
 * Component representing a home page
 */
export default async function Page({ searchParams }: Props) {
  const { type } = await searchParams;
  const currentType = getQrType(type);

  return (
    <section className='flex flex-col gap-10 py-16 sm:py-24'>
      <Hero />
      <QrMenu currentType={currentType} />
      <QrGenerator key={currentType} type={currentType} />
    </section>
  );
}
