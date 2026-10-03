import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_Devanagari,
  Space_Grotesk,
} from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Only fetched where Nepali text appears, so it is not preloaded.
export const notoDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["600"],
  display: "swap",
  preload: false,
  variable: "--font-noto-deva",
});

export const fontVariables = [
  spaceGrotesk.variable,
  plexSans.variable,
  plexMono.variable,
  notoDeva.variable,
].join(" ");
