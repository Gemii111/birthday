/** @type {import('next').NextConfig} */
const nextConfig = {
  // دعم تشغيل الفيديو على Vercel
  async headers() {
    return [
      {
        source: '/video.mp4',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
