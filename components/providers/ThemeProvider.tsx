"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// next-themes sets the theme before paint with an inline script. That script
// only has to run from the server's HTML. When React creates the tag in the
// browser it can never run and React logs an error, so there it is marked as a
// data block, which React leaves alone.
const scriptProps =
  typeof window === "undefined" ? undefined : ({ type: "application/json", suppressHydrationWarning: true } as const);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      scriptProps={scriptProps}
      attribute="data-theme"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
