"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animation features for Motion's `m` components. Only the pieces that animate
 * (mobile menu, hint toast, terminal output) use it, and each of those is loaded
 * on demand, so the animation library is never part of the first bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
