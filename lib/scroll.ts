// Scroll helpers shared by anchors, nav tabs, Back to Top and terminal commands.
// Lenis drives the scroll on desktop pointers; everything else falls back to
// the native scroller. Targets land 68px below the top (the fixed header).

export const HEADER_HEIGHT = 68;

interface LenisLike {
  /** Where a smooth scroll in flight is heading. */
  targetScroll: number;
  scrollTo(
    target: number,
    options?: {
      immediate?: boolean;
      lock?: boolean;
      duration?: number;
      easing?: (progress: number) => number;
      onComplete?: () => void;
    },
  ): void;
  resize(): void;
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
  if (lenis) {
    // Lenis measures the page lazily; a stale height would clamp the target
    // right after a route change or the intro pin being set up.
    lenis.resize();
    lenis.scrollTo(top, { immediate: instant });
  } else {
    window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
  }
}

/** Where the page is heading: ahead of scrollY while a smooth scroll is in flight. */
export function scrollTarget(): number {
  return lenis ? lenis.targetScroll : window.scrollY;
}

const GLIDE_SECONDS = 0.85;
// Longest a glide may take to report that it has landed.
const GLIDE_TIMEOUT = 1500;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * A fixed-length eased scroll that cannot be interrupted: wheel and touch are
 * ignored until it lands, then `onLand` runs once. The sideways intro uses it,
 * because there is nowhere to stop between its two panels.
 */
export function glideTo(y: number, onLand: () => void): void {
  const top = Math.max(0, Math.round(y));
  let landed = false;
  const land = () => {
    if (landed) return;
    landed = true;
    window.clearTimeout(timer);
    window.removeEventListener("scrollend", land);
    onLand();
  };
  // Covers a browser without "scrollend" and a scroller that refuses the move.
  const timer = window.setTimeout(land, GLIDE_TIMEOUT);

  if (lenis) {
    lenis.resize();
    lenis.scrollTo(top, { lock: true, duration: GLIDE_SECONDS, easing: easeInOut, onComplete: land });
  } else if (Math.abs(window.scrollY - top) < 1) {
    land();
  } else {
    // Native scrolling: the browser picks the timing and reports the landing.
    window.addEventListener("scrollend", land);
    window.scrollTo({ top, behavior: "smooth" });
  }
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

// How long a requested jump may still be replayed after the layout settles.
const REPLAY_WINDOW = 8000;
const TAKEOVER_EVENTS = ["wheel", "touchstart", "keydown"] as const;

function forgetAnchor(): void {
  pending = null;
}

/**
 * Jumps to a section now and remembers it: arriving on Home with a hash, the
 * pinned intro is set up a moment later and pushes everything below it down.
 * Scrolling by hand cancels the replay.
 */
export function requestAnchor(id: string): void {
  pending = { id, until: performance.now() + REPLAY_WINDOW };
  for (const type of TAKEOVER_EVENTS) {
    window.addEventListener(type, forgetAnchor, { once: true, passive: true });
  }
  scrollToId(id, { immediate: true });
}

/** Repeats the remembered jump once the layout above it has changed. */
export function replayAnchor(): void {
  if (!pending || performance.now() > pending.until) return;
  scrollToId(pending.id, { immediate: true });
}

/** Drops any smooth scroll still in flight, e.g. when the route changes. */
export function settleScroll(): void {
  lenis?.scrollTo(window.scrollY, { immediate: true });
}

export function scrollToTop(options?: ScrollOptions): void {
  scrollToY(0, options);
}

export function useScroller() {
  return { scrollToId, scrollToTop, scrollToY };
}
