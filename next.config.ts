import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Media is served from /public for now; the plan moves video + frames to
  // Cloudflare R2 before launch (zero egress). Swap MEDIA_BASE in lib/config.ts.
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
