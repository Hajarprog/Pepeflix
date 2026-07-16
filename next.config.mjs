/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

};

export default nextConfig;
