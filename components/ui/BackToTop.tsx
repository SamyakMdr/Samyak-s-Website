"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { useScroller } from "@/lib/scroll";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollToTop } = useScroller();

  // Hidden on the first screen, fades in after it.
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTop()}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border border-line bg-panel text-fg shadow-float tablet:right-6 tablet:bottom-6",
        "transition-[opacity,background-color,color,border-color] duration-(--dur-ui) ease-ui hover:border-blue hover:bg-blue hover:text-on-accent",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUpIcon size={20} />
    </button>
  );
}
