import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { seo } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { pageMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

// Defaults for every route; pages override title, description and canonical.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({ ...seo.home, path: "/" }),
};

export const viewport: Viewport = {
  // Dark is the default theme, so the browser chrome starts on --bg.
  themeColor: "#0d1117",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
