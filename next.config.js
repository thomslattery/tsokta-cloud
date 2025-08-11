/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Use SWC minifier for better performance
  swcMinify: true,

  // Experimental features
  experimental: {
    // Enable server components logging
    serverComponentsExternalPackages: ['@prisma/client'],
    // Enable optimized package imports
    optimizePackageImports: ['@heroicons/react', 'lodash'],
  },

  // Image optimization configuration
  images: {
    domains: [
      'localhost',
      'your-domain.com',
      'images.unsplash.com',
      'cdn.tsoktasprockets.com',
      // Add your Okta domain for user avatars
      'tsoktacloud.okta.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Environment variables that should be available on the client side
  env: {
    CUSTOM_KEY: process.env.NEXTAUTH_SECRET,
    APP_VERSION: process.env.npm_package_version,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // HSTS (uncomment for production with HTTPS)
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=31536000; includeSubDomains; preload'
          // },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      // Cache static assets
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Redirect legacy routes
      {
        source: '/dashboard',
        destination: '/customer/dashboard',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signin',
        permanent: true,
      },
      // Product category redirects
      {
        source: '/product/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
    ]
  },

  // Rewrites for clean URLs or API proxying
  async rewrites() {
    return [
      // API rewrites (if needed for external APIs)
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ]
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack configurations here
    
    // Example: Add polyfills for Node.js modules in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Example: Add custom loaders
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    // Bundle analyzer (only in production build with ANALYZE=true)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')()
      config.plugins.push(new BundleAnalyzerPlugin())
    }

    return config
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Output configuration
  output: process.env.BUILD_MODE === 'export' ? 'export' : undefined,
  trailingSlash: process.env.BUILD_MODE === 'export',
  distDir: '.next',

  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors (not recommended)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors (not recommended)
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'hooks', 'lib', 'types'],
  },

  // Internationalization (if needed)
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en',
  // },

  // Runtime configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Development configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Enable source maps in development
    productionBrowserSourceMaps: false,
    // Disable x-powered-by header
    poweredByHeader: false,
  }),

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Disable source maps in production for security
    productionBrowserSourceMaps: false,
    // Compress responses
    compress: true,
    // Generate ETags for caching
    generateEtags: true,
    // Disable x-powered-by header for security
    poweredByHeader: false,
  }),
}

// Wrap config with plugins if needed
let configWithPlugins = nextConfig

// Bundle analyzer plugin
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  configWithPlugins = withBundleAnalyzer(configWithPlugins)
}

module.exports = configWithPlugins