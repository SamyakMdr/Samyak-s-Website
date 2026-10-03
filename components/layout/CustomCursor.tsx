"use client";

import { useEffect, useRef } from "react";
import { cursor } from "@/content/site";
import { loadMotion, POINTER_QUERY } from "@/lib/gsap";

type Variant = "default" | "link" | "card" | "text";

const INTERACTIVE = "a[href], button, [role='button'], summary, label, select";
const TEXT_FIELD = "input:not([type='checkbox'], [type='radio']), textarea";
const FOLLOW = 0.08; // seconds: the ring trails the dot with 80ms easing

// Nearest thing under the pointer that asks for a variant. Links and buttons
// inside a terminal win over the terminal's own text caret.
function variantAt(target: EventTarget | null): Variant {
  if (!(target instanceof Element)) return "default";
  const hit = target.closest(`[data-cursor], ${INTERACTIVE}, ${TEXT_FIELD}`);
  if (!hit) return "default";
  const explicit = hit.getAttribute("data-cursor");
  if (explicit === "link" || explicit === "card" || explicit === "text") return explicit;
  return hit.matches(TEXT_FIELD) ? "text" : "link";
}

// Ring + dot that follow the mouse. Default / Link / Card ("Open" disc) / Text
// (green caret). Never mounted for touch or reduced motion, where the native
// cursor stays visible.
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const ringElement = ring.current;
    const dotElement = dot.current;
    if (!element || !ringElement || !dotElement) return;

    const query = window.matchMedia(POINTER_QUERY);
    let dispose = () => {};
    let cancelled = false;

    const start = async () => {
      const { gsap } = await loadMotion();
      if (cancelled) return;

      const media = gsap.matchMedia();
      media.add(POINTER_QUERY, () => {
        const ringX = gsap.quickTo(ringElement, "x", { duration: FOLLOW, ease: "power2.out" });
        const ringY = gsap.quickTo(ringElement, "y", { duration: FOLLOW, ease: "power2.out" });
        const dotX = gsap.quickSetter(dotElement, "x", "px") as (value: number) => void;
        const dotY = gsap.quickSetter(dotElement, "y", "px") as (value: number) => void;
        let shown = false;

        const show = (visible: boolean) => {
          shown = visible;
          element.style.opacity = visible ? "1" : "0";
        };

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          dotX(event.clientX);
          dotY(event.clientY);
          if (!shown) {
            // First sighting: jump the ring there instead of sweeping in from the corner.
            gsap.set(ringElement, { x: event.clientX, y: event.clientY });
            element.dataset.variant = variantAt(event.target);
            show(true);
          }
          ringX(event.clientX);
          ringY(event.clientY);
        };
        const onOver = (event: MouseEvent) => {
          element.dataset.variant = variantAt(event.target);
        };
        const onLeave = () => show(false);

        document.documentElement.classList.add("custom-cursor");
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("mouseover", onOver, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);

        return () => {
          document.documentElement.classList.remove("custom-cursor");
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("mouseover", onOver);
          document.documentElement.removeEventListener("mouseleave", onLeave);
          show(false);
        };
      });
      dispose = () => media.revert();
    };

    if (query.matches) {
      void start();
    } else {
      // e.g. a mouse plugged into a tablet later on.
      const onChange = () => {
        if (!query.matches) return;
        query.removeEventListener("change", onChange);
        void start();
      };
      query.addEventListener("change", onChange);
      dispose = () => query.removeEventListener("change", onChange);
    }

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-variant="default"
      className="cursor pointer-events-none fixed top-0 left-0 z-100 opacity-0 transition-opacity duration-(--dur-fast)"
    >
      <div ref={ring} className="absolute top-0 left-0">
        <span className="cursor-shape cursor-ring size-8 rounded-full border-[1.5px] border-fg/60" />
        <span className="cursor-shape cursor-link size-11 rounded-full border-[1.5px] border-blue bg-blue/20" />
        <span className="cursor-shape cursor-card t-btn-sm flex size-18 items-center justify-center rounded-full bg-blue/90 text-on-accent">
          {cursor.open}
        </span>
      </div>
      <div ref={dot} className="absolute top-0 left-0">
        <span className="cursor-shape cursor-dot size-1.5 rounded-full bg-green" />
        <span className="cursor-shape cursor-caret h-6.5 w-0.75 bg-green" />
      </div>
    </div>
  );
}
