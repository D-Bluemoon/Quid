import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
