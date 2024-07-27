const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.poizon.com',
      },
    ]
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  }
});
