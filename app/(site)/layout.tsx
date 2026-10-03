import type { ReactNode } from "react";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { HintToast } from "@/components/layout/HintToast";
import { Shortcuts } from "@/components/layout/Shortcuts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import { CommandProvider } from "@/lib/commands";

// Everything that stays put across pages: the fixed header, footer, Back to Top,
// the command registry behind the terminal and shortcuts, and desktop motion.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CommandProvider>
      <SmoothScroll />
      <Shortcuts />
      <SiteHeader />
      {children}
      <Footer />
      <BackToTop />
      <HintToast />
      <CustomCursor />
    </CommandProvider>
  );
}
