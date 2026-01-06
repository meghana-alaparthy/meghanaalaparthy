import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Optional: Change links `/me` -> `/me/` and emits `/me.html` -> `/me/index.html`
  trailingSlash: true,
  // Optional: Prevent automatic image optimization as not supported in static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
