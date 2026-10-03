// The sideways intro has two resting places, the hero and the terminal, and
// nothing worth stopping at between them. Any attempt to scroll while it is
// pinned therefore becomes one whole step to the other panel.
import { glideTo, scrollTarget, scrollToY } from "./scroll";

export interface StepRange {
  /** Scroll position where the first panel rests. */
  start(): number;
  /** Scroll position where the second panel rests; normal scrolling resumes below it. */
  end(): number;
}

export interface Steps {
  forward(): void;
  back(): void;
  dispose(): void;
}

// How far below the second panel's resting place still counts as being on it.
const NEAR = 40;
// A gap this long between wheel events means a new gesture has started.
const QUIET = 180;
// A trackpad keeps sending shrinking wheel events after the fingers lift. One
// this much bigger than the last is a new push rather than that tail.
const PUSH = 12;
// Longest the tail of a gesture is ignored after the step it started has landed.
// Events this small are ignored for as long as the tail runs, so it cannot nudge the page.
const TAIL_MAX = 1500;
const TINY = 4;
// How long the page may sit between the panels (touch, scrollbar) before the move is finished for it.
const IDLE = 140;

const FORWARD_KEYS = ["ArrowDown", "ArrowRight", "PageDown"];
const BACK_KEYS = ["ArrowUp", "ArrowLeft", "PageUp"];

function isTyping(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("input, textarea, select, [contenteditable=true]") !== null;
}

/** Space presses a focused button or link rather than scrolling. */
function isControl(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("a[href], button, summary, [role=button]") !== null;
}

/** A scrollable box under the pointer that can still move in the wheel's direction. */
function innerScroller(target: EventTarget | null, down: boolean): boolean {
  const box = target instanceof Element ? target.closest<HTMLElement>("[data-lenis-prevent]") : null;
  if (!box) return false;
  return down ? box.scrollTop + box.clientHeight < box.scrollHeight - 1 : box.scrollTop > 0;
}

export function stepBetween(range: StepRange): Steps {
  let stepping = false;
  // When the last step landed; 0 once the gesture behind it is over.
  let landedAt = 0;
  let lastWheelAt = 0;
  let lastWheelSize = 0;

  let lastY = window.scrollY;
  let direction = 0;
  // Where the page last stood still outside the stretch between the panels.
  let restY = lastY;
  let touching = false;
  let idle = 0;

  const between = (y: number) => y > range.start() + 1 && y < range.end() - 1;

  const step = (to: number) => {
    if (stepping) return;
    stepping = true;
    window.clearTimeout(idle);
    glideTo(to, () => {
      stepping = false;
      landedAt = performance.now();
    });
  };

  const swallow = (event: Event) => {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.deltaY === 0) return;
    // When the wheel moved, not when a busy page got round to hearing about it.
    const now = event.timeStamp;
    const size = Math.abs(event.deltaY);
    const tail = now - lastWheelAt < QUIET && size < lastWheelSize + PUSH;
    lastWheelAt = now;
    lastWheelSize = size;

    if (stepping) return swallow(event);
    if (landedAt) {
      if (tail && (now - landedAt < TAIL_MAX || size <= TINY)) return swallow(event);
      landedAt = 0;
    }

    const down = event.deltaY > 0;
    if (innerScroller(event.target, down)) {
      // The box takes this gesture; what is left of it must not move the page.
      landedAt = now;
      return;
    }

    const y = window.scrollY;
    const start = range.start();
    const end = range.end();
    if (down) {
      if (y >= start - 1 && y < end - 1) {
        swallow(event);
        step(end);
      }
      return;
    }
    if (y > start + 1 && y <= end + NEAR) {
      swallow(event);
      step(start);
      return;
    }
    // Scrolling up from the page below lands on the second panel; going on to
    // the first takes another push.
    const pixels = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
    if (y > end + NEAR && scrollTarget() + pixels < end) {
      swallow(event);
      landedAt = now;
      scrollToY(end);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
    const space = event.key === " " && !isControl(event.target);
    const forward = FORWARD_KEYS.includes(event.key) || (space && !event.shiftKey);
    const back = BACK_KEYS.includes(event.key) || (space && event.shiftKey);
    if (!forward && !back) return;
    if (stepping) return event.preventDefault();

    const y = window.scrollY;
    const start = range.start();
    const end = range.end();
    if (forward && y >= start - 1 && y < end - 1) {
      event.preventDefault();
      step(end);
    } else if (back && y > start + 1 && y <= end + NEAR) {
      event.preventDefault();
      step(start);
    }
  };

  // Anything else that leaves the page between the panels (a touch drag, the
  // scrollbar, a box handing its scroll on) is finished off once it stops.
  const settle = () => {
    const y = window.scrollY;
    // A smooth scroll still on its way out (Back to Top easing into place) is left alone.
    if (stepping || touching || !between(y) || !between(scrollTarget())) return;
    const end = range.end();
    // Scrolled up from the page below: stop on the second panel, as the wheel does.
    const fromBelow = restY > end + NEAR;
    const nearer = y - range.start() < end - y ? range.start() : end;
    step(fromBelow || direction > 0 ? end : direction < 0 ? range.start() : nearer);
  };

  const rest = () => {
    if (!between(window.scrollY)) restY = window.scrollY;
  };

  const onScroll = () => {
    const y = window.scrollY;
    if (y !== lastY) direction = y > lastY ? 1 : -1;
    lastY = y;
    window.clearTimeout(idle);
    if (!between(y)) idle = window.setTimeout(rest, IDLE);
    else if (!stepping) idle = window.setTimeout(settle, IDLE);
  };

  const onTouchStart = () => {
    touching = true;
    rest();
  };
  const onTouchEnd = () => {
    touching = false;
    onScroll();
  };

  window.addEventListener("wheel", onWheel, { capture: true, passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  // A reload can restore a position between the panels.
  idle = window.setTimeout(settle, IDLE);

  return {
    forward: () => step(range.end()),
    back: () => step(range.start()),
    dispose: () => {
      window.clearTimeout(idle);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    },
  };
}
