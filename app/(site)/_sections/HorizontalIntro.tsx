"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MouseIcon } from "@/components/icons";
import { a11y, hero, terminalSection } from "@/content/site";
import { cn } from "@/lib/cn";
import { INTRO_QUERY, loadMotion } from "@/lib/gsap";
import { stepBetween, type Steps } from "@/lib/introSteps";
import { registerAnchor, replayAnchor, scrollToY } from "@/lib/scroll";

type HorizontalIntroProps = {
  hero: ReactNode;
  terminal: ReactNode;
};

function ScrollCue({ label, arrow, step, onClick }: { label: string; arrow: string; step: 0 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="intro-cue absolute bottom-4.5 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 rounded-sm whitespace-nowrap text-dim"
    >
      <MouseIcon size={18} />
      <span className="t-body-sm">
        {label} {arrow}
      </span>
      <span aria-hidden="true" className="flex gap-1.5">
        {[0, 1].map((dot) => (
          <span key={dot} className={cn("h-1.5 rounded-[3px]", dot === step ? "w-5.5 bg-blue" : "w-2 bg-line")} />
        ))}
      </span>
    </button>
  );
}

// Sideways intro (desktop ≥ 1200, no reduced motion): the section is pinned and
// scrolling slides the track 100vw to the left, bringing the terminal in from
// the right. It moves in whole steps: any scroll goes all the way to the other
// panel. Everywhere else the two panels simply stack.
export function HorizontalIntro({ hero: heroPanel, terminal: terminalPanel }: HorizontalIntroProps) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // Scroll positions of the two panels while pinned; null when stacked.
  const bounds = useRef<{ start: number; end: number } | null>(null);
  const steps = useRef<Steps | null>(null);

  useEffect(() => {
    const root = section.current;
    const strip = track.current;
    if (!root || !strip) return;
    let dispose = () => {};
    let cancelled = false;

    void (async () => {
      if (!window.matchMedia(INTRO_QUERY).matches) {
        // Still watch for a resize into desktop motion.
        const query = window.matchMedia(INTRO_QUERY);
        const reload = () => window.location.reload();
        query.addEventListener("change", reload, { once: true });
        dispose = () => query.removeEventListener("change", reload);
        return;
      }
      const { gsap, ScrollTrigger } = await loadMotion();
      await document.fonts.ready;
      if (cancelled) return;

      const media = gsap.matchMedia();
      media.add(INTRO_QUERY, () => {
        // Pinning wraps the section in a spacer, now and on every refresh. That
        // re-parents it, which drops focus from the terminal, and adds the pin's
        // scroll distance above every section below, which moves a pending hash jump.
        let focused: HTMLElement | null = null;
        const beforeRefresh = () => {
          const active = document.activeElement;
          focused = active instanceof HTMLElement && root.contains(active) ? active : null;
        };
        const afterRefresh = () => {
          if (focused?.isConnected && document.activeElement !== focused) focused.focus({ preventScroll: true });
          focused = null;
          replayAnchor();
        };

        beforeRefresh();
        const tween = gsap.to(strip, {
          // One panel width: the visible width, which excludes a classic scrollbar.
          x: () => -root.clientWidth,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            pin: true,
            // Tied straight to the scroll position: the step's own easing is the motion.
            scrub: true,
            start: "top top+=56",
            end: () => `+=${window.innerWidth}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              bounds.current = { start: self.start, end: self.end };
            },
            onToggle: (self) => {
              strip.style.willChange = self.isActive ? "transform" : "auto";
            },
          },
        });
        const trigger = tween.scrollTrigger!;
        bounds.current = { start: trigger.start, end: trigger.end };
        root.dataset.pinned = "true";

        const offMain = registerAnchor("main", () => trigger.start);
        const offTerminal = registerAnchor("terminal", () => trigger.end);
        afterRefresh();
        ScrollTrigger.addEventListener("refreshInit", beforeRefresh);
        ScrollTrigger.addEventListener("refresh", afterRefresh);

        // Wheel, keys (↓ → Space PageDown, ↑ ← PageUp) and touch all move one whole panel.
        const stepper = stepBetween({ start: () => trigger.start, end: () => trigger.end });
        steps.current = stepper;

        // Tabbing can put focus in the panel that is off to the side; slide it in.
        const onFocusIn = (event: FocusEvent) => {
          const { target } = event;
          if (!(target instanceof Element) || !target.matches(":focus-visible")) return;
          const y = window.scrollY;
          if (target.closest("#terminal")) {
            if (y < trigger.end - 1) stepper.forward();
          } else if (y > trigger.start + 1) {
            stepper.back();
          }
        };
        root.addEventListener("focusin", onFocusIn);

        return () => {
          root.removeEventListener("focusin", onFocusIn);
          stepper.dispose();
          steps.current = null;
          ScrollTrigger.removeEventListener("refreshInit", beforeRefresh);
          ScrollTrigger.removeEventListener("refresh", afterRefresh);
          offMain();
          offTerminal();
          bounds.current = null;
          delete root.dataset.pinned;
        };
      });

      // Images and late fonts change the page height below the pin.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      dispose = () => {
        window.removeEventListener("load", refresh);
        media.revert();
      };
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  const goToTerminal = () => steps.current?.forward();
  const goPast = () => {
    if (bounds.current) scrollToY(bounds.current.end + window.innerHeight * 0.6);
  };

  return (
    <div ref={section} className="intro overflow-x-clip">
      <div ref={track} className="intro-track flex flex-col">
        <section id="main" aria-label={a11y.introduction} className="intro-panel page-x relative pt-5 pb-3 tablet:pt-6 tablet:pb-12">
          {heroPanel}
          <ScrollCue label={hero.cue} arrow="→" step={0} onClick={goToTerminal} />
        </section>
        <section
          id="terminal"
          aria-labelledby="terminal-title"
          className="intro-panel page-x relative pt-12 tablet:pt-6 tablet:pb-12"
        >
          {terminalPanel}
          <ScrollCue label={terminalSection.cue} arrow="↓" step={1} onClick={goPast} />
        </section>
      </div>
    </div>
  );
}
