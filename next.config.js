/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    // for: fill and responsive image
    deviceSizes: [640, 768, 1080, 1280],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'vqfgzrqmqfbuwypfrvop.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
