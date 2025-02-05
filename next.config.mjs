/** @type {import('next').NextConfig} */
import nextPWA from "@ducanh2912/next-pwa";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = nextPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true, // Minify with SWC
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|json)$/, // Cache image and JSON files
        handler: "CacheFirst", // Cache assets first
        options: {
          cacheName: "images",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 30 days
          },
        },
      },
      {
        urlPattern: /\/api\/.*$/, // API calls - NetworkFirst caching strategy
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24, // Cache API responses for 24 hours
          },
        },
      },
      {
        urlPattern: /\/static\/.*$/, // Static assets
        handler: "StaleWhileRevalidate", // Serve stale content while revalidating in the background
        options: {
          cacheName: "static-assets",
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 1 week
          },
        },
      },
    ],
  },
});

const nextConfig = {
  reactStrictMode: true, // Enable strict mode for better error handling and optimization
  images: {
    domains: ['image.tmdb.org'], // Allow images from tmdb
  },
};

export default bundleAnalyzer(withPWA(nextConfig));
