import './src/env.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      /* vzrcy5vcsuuocnf3.public.blob.vercel-storage.com */
      {
        protocol: 'https',
        hostname: 'vzrcy5vcsuuocnf3.public.blob.vercel-storage.com',
      },
      /* doingdoit.vercel.app */
      {
        protocol: 'https',
        hostname: 'doingdoit.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn0.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 't0gqytzvlsa2lapo.public.blob.vercel-storage.com',
      },
    ],
  },
  reactStrictMode: false,

  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    // Enable webpack build worker to reduce main thread memory usage
    webpackBuildWorker: true,
  },
  
  // Move skipTrailingSlashRedirect out of experimental
  skipTrailingSlashRedirect: true,

  // Add memory and performance optimizations
  swcMinify: true,
  
  // Optimize output for smaller bundle sizes
  output: 'standalone',

  // Suppress Webpack deprecation warnings
  webpack: (config, { dev, isServer, webpack }) => {
    // Suppress Module.updateHash deprecation warnings
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // Fix for 'self is not defined' error in server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
        'encoding': 'commonjs encoding',
      });
    }
    
    // Define global variables to prevent "self is not defined" errors
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'typeof window': JSON.stringify(isServer ? 'undefined' : 'object'),
        'typeof self': JSON.stringify(isServer ? 'undefined' : 'object'),
        'typeof global': JSON.stringify('object'),
      })
    );
    
    // Add fallbacks for Node.js modules in browser environment
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      assert: false,
      http: false,
      https: false,
      os: false,
      url: false,
      zlib: false,
    };
    
    // Memory usage optimizations
    config.optimization = {
      ...config.optimization,
      // Enable more aggressive memory management
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 244000,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'all',
            priority: 15,
          },
          commons: {
            minChunks: 2,
            chunks: 'all',
            name: 'commons',
            priority: 5,
          },
        },
      },
    };
    
    // Reduce memory usage during compilation
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // Additional webpack config for memory optimization
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      // Enable tree shaking for better bundle optimization
      config.optimization.innerGraph = true;
    }
    
    return config;
  },

  // time zone for korea time
  env: {
    TZ: 'Asia/Seoul',
  },

};

export default nextConfig;
