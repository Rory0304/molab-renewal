/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "xmkqclhjjvshhgohnwrg.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
