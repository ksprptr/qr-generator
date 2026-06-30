import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack doesn't infer a
  // parent directory (which fails the build under Next 16).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
