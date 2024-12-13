import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'plugin-storage.nyc3.digitaloceanspaces.com',
          port: '',
        pathname: '/families/images/**',
      },
    ],
  },
};

export default nextConfig;
