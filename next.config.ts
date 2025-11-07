import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  images: {
    
    // Either this:
    domains: ["placehold.co"],
    // or remotePatterns:
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],

  },

  /* config options here */
};

export default nextConfig;
