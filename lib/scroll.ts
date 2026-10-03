// Scroll helpers shared by anchors, nav tabs, Back to Top and terminal commands.
// Lenis drives the scroll on desktop pointers; everything else falls back to
// the native scroller. Targets land 56px below the top (the fixed header).

export const HEADER_HEIGHT = 56;

interface LenisLike {
  scrollTo(target: number, options?: { immediate?: boolean; lock?: boolean }): void;
  raf(time: number): void;
  on(event: "scroll", callback: () => void): () => void;
}

/** A clock that can drive Lenis instead of its own requestAnimationFrame loop. */
interface Ticker {
  /** Called with the time in seconds (GSAP's ticker convention). */
  add(tick: (time: number) => void): void;
  remove(tick: (time: number) => void): void;
  onScroll(): void;
}

type ScrollOptions = { immediate?: boolean };

let lenis: LenisLike | null = null;
const anchors = new Map<string, () => number>();
let pending: { id: string; until: number } | null = null;

let ticker: Ticker | null = null;
let frame = 0;
let detach: (() => void) | null = null;

function drive(): void {
  detach?.();
  detach = null;
  cancelAnimationFrame(frame);
  const instance = lenis;
  if (!instance) return;

  if (ticker) {
    const clock = ticker;
    const tick = (time: number) => instance.raf(time * 1000);
    clock.add(tick);
    const off = instance.on("scroll", clock.onScroll);
    detach = () => {
      clock.remove(tick);
      off();
    };
  } else {
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }
}

export function setLenis(instance: LenisLike | null): void {
  lenis = instance;
  drive();
}

/** Hands the scroll clock to GSAP so Lenis and ScrollTrigger stay in step. */
export function attachTicker(next: Ticker): void {
  ticker = next;
  drive();
}

/**
 * Lets a section answer "where do I scroll to reach you?" itself. The pinned
 * sideways intro uses this: its panels sit side by side, so #terminal is a
 * scroll distance rather than an element offset.
 */
export function registerAnchor(id: string, getY: () => number): () => void {
  anchors.set(id, getY);
  // A jump requested before this section was ready (e.g. arriving on Home from
  // another page, before the pinned intro has been set up) is replayed now.
  if (pending && pending.id === id && performance.now() < pending.until) {
    scrollToY(getY(), { immediate: true });
    pending = null;
  }
  return () => {
    if (anchors.get(id) === getY) anchors.delete(id);
  };
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToY(y: number, { immediate = false }: ScrollOptions = {}): void {
  const instant = immediate || prefersReducedMotion();
  const top = Math.max(0, Math.round(y));
  if (lenis) lenis.scrollTo(top, { immediate: instant });
  else window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
}

/** Scrolls to a section by id. Returns false when the id is not on this page. */
export function scrollToId(id: string, options?: ScrollOptions): boolean {
  const custom = anchors.get(id);
  if (custom) {
    scrollToY(custom(), options);
    return true;
  }
  const element = document.getElementById(id);
  if (!element) return false;
  scrollToY(element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT, options);
  return true;
}

/** Jumps to a section now, and again if it registers itself shortly after. */
export function requestAnchor(id: string): void {
  pending = { id, until: performance.now() + 2500 };
  scrollToId(id, { immediate: true });
}

export function scrollToTop(options?: ScrollOptions): void {
  scrollToY(0, options);
}

export function useScroller() {
  return { scrollToId, scrollToTop, scrollToY };
}
