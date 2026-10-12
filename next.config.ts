import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully client-side site: no API routes, no server data, no dynamic routes.
  // Static output serves on any host with no Node.js/Worker runtime at all.
  output: "export",
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
