import withBundleAnalyzerPlugin from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? withBundleAnalyzerPlugin({ enabled: true, openAnalyzer: false })
    : (config: NextConfig) => config;

const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  images: {
    // The multi-service vercel.json setup doesn't serve /_next/image (it 404s),
    // so serve files from /public directly instead of through the optimizer.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stellar.creit.tech",
        pathname: "/wallet-icons/**",
      },
    ],
  },
  // Local dev: proxy /api/* to NestJS (matches Vercel rewrites in production).
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "@iconify/react",
      "framer-motion",
      "lucide-react",
      "react-icons",
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
