"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MouseIcon } from "@/components/icons";
import { hero, terminalSection } from "@/content/site";
import { cn } from "@/lib/cn";
import { INTRO_QUERY, loadMotion } from "@/lib/gsap";
import { registerAnchor, scrollToY } from "@/lib/scroll";

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
// about one viewport of scrolling slides the track 100vw to the left, bringing
// the terminal in from the right. Everywhere else the two panels simply stack.
export function HorizontalIntro({ hero: heroPanel, terminal: terminalPanel }: HorizontalIntroProps) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // Scroll positions of the two panels while pinned; null when stacked.
  const bounds = useRef<{ start: number; end: number } | null>(null);

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
        const tween = gsap.to(strip, {
          // One panel width: the visible width, which excludes a classic scrollbar.
          x: () => -root.clientWidth,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            pin: true,
            scrub: 0.8,
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

        // ↓ → Space step forward to the terminal, ↑ ← step back to the hero.
        const onKeyDown = (event: KeyboardEvent) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
          if (event.metaKey || event.ctrlKey || event.altKey) return;
          const y = window.scrollY;
          const inside = y >= trigger.start - 1 && y <= trigger.end + 1;
          if (!inside) return;
          const forward = ["ArrowDown", "ArrowRight", " "].includes(event.key) && !event.shiftKey;
          const back = ["ArrowUp", "ArrowLeft"].includes(event.key) || (event.key === " " && event.shiftKey);
          if (forward && y < trigger.end - 1) {
            event.preventDefault();
            scrollToY(trigger.end);
          } else if (back && y > trigger.start + 1) {
            event.preventDefault();
            scrollToY(trigger.start);
          }
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
          window.removeEventListener("keydown", onKeyDown);
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

  const goToTerminal = () => {
    if (bounds.current) scrollToY(bounds.current.end);
  };
  const goPast = () => {
    if (bounds.current) scrollToY(bounds.current.end + window.innerHeight * 0.6);
  };

  return (
    <div ref={section} className="intro overflow-x-clip">
      <div ref={track} className="intro-track flex flex-col">
        <section id="main" aria-label="Introduction" className="intro-panel page-x relative pt-5 pb-3 tablet:pt-6 tablet:pb-12">
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
