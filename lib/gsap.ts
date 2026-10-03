// GSAP and ScrollTrigger are only needed for desktop motion on Home, so they
// are loaded on demand and shared by the intro, the stack slider and the cursor.
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import { attachTicker } from "./scroll";

export interface Motion {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
}

let cached: Promise<Motion> | null = null;

export function loadMotion(): Promise<Motion> {
  cached ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([core, plugin]) => {
    const { gsap } = core;
    const { ScrollTrigger } = plugin;
    gsap.registerPlugin(ScrollTrigger);
    // Lenis and ScrollTrigger must share one clock or pinned sections stutter.
    gsap.ticker.lagSmoothing(0);
    attachTicker({
      add: (tick) => gsap.ticker.add(tick),
      remove: (tick) => gsap.ticker.remove(tick),
      onScroll: () => ScrollTrigger.update(),
    });
    return { gsap, ScrollTrigger };
  });
  return cached;
}

/** Desktop motion runs at ≥ 1200px, on screens tall enough for a full panel, without reduced motion. */
export const INTRO_QUERY =
  "(min-width: 1200px) and (min-height: 820px) and (prefers-reduced-motion: no-preference)";
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
/** A real mouse or trackpad: smooth scrolling and the custom cursor. */
export const POINTER_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
