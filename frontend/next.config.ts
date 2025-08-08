import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatar.iran.liara.run"],
  },
  typescript: { ignoreBuildErrors: true },
  babel: {
    presets: ["next/babel"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
