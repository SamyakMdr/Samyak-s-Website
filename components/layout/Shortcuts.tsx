"use client";

import { useShortcuts } from "@/lib/useShortcuts";

/** Mounts the global keyboard shortcuts for every page under the site layout. */
export function Shortcuts() {
  useShortcuts();
  return null;
}
