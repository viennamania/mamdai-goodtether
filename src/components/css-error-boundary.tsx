'use client';

import React from 'react';

interface CSSErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface CSSErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class CSSErrorBoundary extends React.Component<
  CSSErrorBoundaryProps,
  CSSErrorBoundaryState
> {
  constructor(props: CSSErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): CSSErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if it's a CSS loading error
    if (error.message.includes('Loading CSS chunk') || 
        error.message.includes('css') ||
        error.stack?.includes('onLinkComplete')) {
      console.warn('CSS loading error caught:', error.message);
      
      // Try to reload the page once after a short delay
      setTimeout(() => {
        if (window.location.reload) {
          window.location.reload();
        }
      }, 1000);
    } else {
      console.error('Unexpected error:', error, errorInfo);
    }
  }

  componentDidMount() {
    // Add a global listener for CSS loading errors
    const handleLinkError = (event: Event) => {
      const target = event.target as HTMLLinkElement;
      if (target?.tagName === 'LINK' && target.rel === 'stylesheet') {
        console.warn('CSS file failed to load:', target.href);
        // Try to reload after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    document.addEventListener('error', handleLinkError, true);

    return () => {
      document.removeEventListener('error', handleLinkError, true);
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading Error</h2>
            <p className="text-gray-600 mb-4">
              A resource failed to load. Refreshing the page...
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CSSErrorBoundary;