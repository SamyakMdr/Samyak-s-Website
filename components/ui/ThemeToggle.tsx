"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";
import { header } from "@/content/site";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/platform";

// Sun in dark mode, moon in light. Both icons are rendered and CSS picks one
// from data-theme, so the server HTML matches whatever theme was stored.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The stored theme is only known on the client, so the label waits for mount.
  const mounted = useMounted();
  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? header.themeToDark : header.themeToLight}
      aria-pressed={isLight}
      className={cn(
        "flex size-8.5 shrink-0 items-center justify-center rounded-btn border border-line bg-panel text-fg",
        "transition-colors duration-(--dur-ui) ease-ui hover:bg-panel-hover",
        className,
      )}
    >
      <SunIcon size={16} className="theme-dark-only" />
      <MoonIcon size={16} className="theme-light-only" />
    </button>
  );
}
