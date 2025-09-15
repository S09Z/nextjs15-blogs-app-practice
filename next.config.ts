import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      memoryLimit: 4096,
      rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } },
    },
    ppr: true,
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
  },
};

export default nextConfig;
