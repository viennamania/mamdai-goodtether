import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

// Dynamically import the entire edit product component to avoid SSR issues
const EditProductContent = dynamic(
  () => import('./edit-product-content'),
  { 
    ssr: false,
    loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }
);

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return metaObject(`Edit ${slug}`);
}

export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return <EditProductContent slug={params.slug} />;
}
