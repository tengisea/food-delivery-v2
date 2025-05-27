import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND: process.env.BACKEND || "http://localhost:8000",
  },
};

export default nextConfig;
