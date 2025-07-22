import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  redirects: async () => [],
  rewrites: async () => [
    {
      source: "/:path*",
      destination: "/:path*",
    },
  ],
  i18n,
};

export default nextConfig;
