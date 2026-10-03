"use client";

import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "./scroll";

/**
 * Returns the id of the section currently under the header, using an
 * IntersectionObserver on a thin band below it. `ids` must be in page order.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The last section touching the band is the one being read.
        const current = [...sections].reverse().find((section) => visible.has(section.id));
        if (current) setActive(current.id);
      },
      { rootMargin: `-${HEADER_HEIGHT}px 0px -55% 0px`, threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}
