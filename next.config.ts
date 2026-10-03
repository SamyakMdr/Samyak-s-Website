import { existsSync } from "node:fs";
import type { NextConfig } from "next";

// The CV is a placeholder until public/cv/samyak-cv.pdf is added.
const cvReady = existsSync("public/cv/samyak-cv.pdf");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CV_READY: cvReady ? "1" : "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
