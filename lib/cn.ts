import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The text-style utilities (t-h1, t-body…) set font-size, so they must replace
// each other when merged instead of stacking.
const twMerge = extendTailwindMerge<"text-style">({
  extend: {
    classGroups: {
      "text-style": [
        {
          t: [
            "h1", "hero", "room", "h2", "h3", "h4", "stat",
            "body-lg", "body", "body-sm", "caption", "strong",
            "btn", "btn-sm", "mono-label", "mono-sm", "code",
            "m-display", "m-h2", "m-lead",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
