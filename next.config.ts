import { existsSync } from "node:fs";
import type { NextConfig } from "next";

// The CV is a placeholder until public/cv/samyak-cv.pdf is added.
const cvReady = existsSync("public/cv/samyak-cv.pdf");

const production = process.env.NODE_ENV === "production";

// A per-request nonce would make every page dynamic, so the pages stay static
// and inline scripts (theme, structured data, Next's own) are allowed by
// 'unsafe-inline'. Everything else is limited to this site and Cloudflare
// Turnstile, which the contact form loads.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${production ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(production ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  ...(production ? [{ key: "Content-Security-Policy", value: csp }] : []),
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CV_READY: cvReady ? "1" : "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  experimental: {
    // A contact message is at most a few KB; refuse anything bigger early.
    serverActions: { bodySizeLimit: "32kb" },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
