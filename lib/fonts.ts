import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_Devanagari,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";

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

// Google's "latin" subset drops a few glyphs the design uses as text: ← → in
// IBM Plex Sans, and ← → ✓ in IBM Plex Mono. These tiny files (the same fonts,
// cut down to those glyphs) follow the main family in the font stacks.
export const plexSansArrows = localFont({
  src: "../app/fonts/plex-sans-arrows.woff2",
  weight: "100 700",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-plex-sans-arrows",
  declarations: [{ prop: "unicode-range", value: "U+2190, U+2192" }],
});

export const plexMonoSymbols = localFont({
  src: [
    { path: "../app/fonts/plex-mono-symbols-400.woff2", weight: "400" },
    { path: "../app/fonts/plex-mono-symbols-500.woff2", weight: "500" },
  ],
  display: "swap",
  // Preloaded: the first screen of Home shows these glyphs, and without the hint
  // the file is only found once the stylesheet has loaded.
  preload: true,
  adjustFontFallback: false,
  variable: "--font-plex-mono-symbols",
  declarations: [{ prop: "unicode-range", value: "U+2190, U+2192, U+2713" }],
});

export const fontVariables = [
  spaceGrotesk.variable,
  plexSans.variable,
  plexMono.variable,
  notoDeva.variable,
  plexSansArrows.variable,
  plexMonoSymbols.variable,
].join(" ");
