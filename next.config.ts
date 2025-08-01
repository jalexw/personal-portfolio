import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@schemavaults/ui", "@schemavaults/theme"],
};

module.exports = nextConfig;
