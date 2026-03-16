import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tripx-wp.imgix.net',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/destinations',
        destination: 'https://book.tripx.se/wp-json/tripx/v1/destinations',
      },
    ];
  },
};

export default nextConfig;
