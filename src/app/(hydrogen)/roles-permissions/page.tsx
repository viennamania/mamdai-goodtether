import nextDynamic from 'next/dynamic';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Dynamically import the entire page content to avoid SSR issues
const RolesPermissionsContent = nextDynamic(() => import('./roles-permissions-content'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center min-h-screen">Loading...</div>
});

export default function RolesPermissionsPage() {
  return <RolesPermissionsContent />;
}
