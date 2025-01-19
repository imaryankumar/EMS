import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run'],
  },
  babel: {
    presets: ['next/babel'], 
  },
};

export default nextConfig;
