import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/boggle/game/index.html',
        destination: '/boggle/game/',
        permanent: true,
      },
      {
        source: '/boggle/solver/index.html',
        destination: '/boggle/solver/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
