import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['encrypted-tbn0.gstatic.com', 'cdn-media.buildersmart.in'], // add all external hosts here
  },
};

export default nextConfig;
