import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

// Dynamically import the entire create product content to avoid SSR issues
const CreateProductContent = dynamic(
  () => import('./create-product-content'),
  { 
    ssr: false,
    loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }
);

export const metadata = {
  ...metaObject('Create Product'),
};

export default function CreateProductPage() {
  return (
    <>
      <CreateProductContent />
    </>
  );
}
