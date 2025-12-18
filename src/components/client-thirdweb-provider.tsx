'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientThirdwebProviderProps {
  children: ReactNode;
}

export default function ClientThirdwebProvider({ children }: ClientThirdwebProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [ThirdwebProvider, setThirdwebProvider] = useState<any>(null);

  useEffect(() => {
    // Only import and setup ThirdwebProvider on the client side after mounting
    const loadThirdweb = async () => {
      try {
        const { ThirdwebProvider: TWProvider } = await import('thirdweb/react');
        setThirdwebProvider(() => TWProvider);
        setIsMounted(true);
      } catch (error) {
        console.warn('Failed to load ThirdwebProvider:', error);
        setIsMounted(true); // Still set mounted to render children without the provider
      }
    };

    loadThirdweb();
  }, []);

  // Don't render anything until we're mounted on the client
  if (!isMounted) {
    return <div style={{ minHeight: '100vh' }}>{/* Prevent layout shift */}</div>;
  }

  // If ThirdwebProvider failed to load, render children without it
  if (!ThirdwebProvider) {
    return <>{children}</>;
  }

  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}