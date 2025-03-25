import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "api.dicebear.com",
      "www.canva.com",
      "via.placeholder.com",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; img-src *; media-src *; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
