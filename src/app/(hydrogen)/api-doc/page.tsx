import nextDynamic from 'next/dynamic';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Dynamically import the API documentation component 
const ApiDocumentation = nextDynamic(() => import('./api-documentation-client'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading API Documentation...</div>
});

export default function IndexPage() {
  return (
    <section className="container">
      <ApiDocumentation />
    </section>
  );
}
