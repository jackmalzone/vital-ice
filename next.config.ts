import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/vital-ice',
  assetPrefix: '/vital-ice/',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
