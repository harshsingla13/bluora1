import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo name is 'bluora', uncomment the line below:
  basePath: '/bluora1',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/bluora1',
  },
};

export default nextConfig;
