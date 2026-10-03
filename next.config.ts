import { existsSync, readdirSync } from "node:fs";
import type { NextConfig } from "next";

// Official brand logos dropped into public/logos/<slug>.svg replace the monogram
// tiles. The list is read once at startup, so restart the server after adding one.
const logoDir = "public/logos";
const logos = existsSync(logoDir)
  ? readdirSync(logoDir)
      .filter((file) => file.endsWith(".svg"))
      .map((file) => file.replace(/\.svg$/, ""))
  : [];

// The CV is a placeholder until public/cv/samyak-cv.pdf is added.
const cvReady = existsSync("public/cv/samyak-cv.pdf");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LOGOS: logos.join(","),
    NEXT_PUBLIC_CV_READY: cvReady ? "1" : "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
