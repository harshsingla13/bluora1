import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo name is 'bluora', uncomment the line below:
  // Only use basePath for production (GitHub Pages)
  basePath: isProd ? '/bluora1' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/bluora1' : '',
  },
};

export default nextConfig;
