import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Media is served from /public for now; the plan moves video + frames to
  // Cloudflare R2 before launch (zero egress). Swap MEDIA_BASE in lib/config.ts.
  images: { formats: ["image/avif", "image/webp"] },

  // Locale routing as static redirect rules — no middleware, no Edge function,
  // no per-request invocation. A browser whose primary language is Arabic or
  // French lands on its locale; everyone else gets /en. The header switcher
  // covers the rest.
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "^ar.*" }],
        destination: "/ar",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "^fr.*" }],
        destination: "/fr",
        permanent: false,
      },
      { source: "/", destination: "/en", permanent: false },
      // /build was the drink builder before it became a full order system
      { source: "/:locale(en|ar|fr)/build", destination: "/:locale/order", permanent: true },
      { source: "/:locale(en|ar|fr)/verdict", destination: "/:locale", permanent: true },
    ];
  },
};

export default nextConfig;
