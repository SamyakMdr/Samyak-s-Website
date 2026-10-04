"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { CloseIcon, GitBranchIcon } from "@/components/icons";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Button } from "@/components/ui/Button";
import { TechLogo } from "@/components/ui/TechLogo";
import { socials } from "@/content/contact";
import { a11y, header, hero, mobileMenu, nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Brand } from "./Brand";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activeBranch: string | null;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Full-screen menu that slides in from the right (300ms). While open it traps
// focus, locks the page scroll and closes on Esc, the X or any link.
export default function MobileMenu({ open, onClose, activeBranch }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = overflow;
      document.documentElement.classList.remove("lenis-stopped");
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <MotionProvider>
      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={a11y.menu}
            data-lenis-prevent
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-bg desktop:hidden"
          >
            <div className="page-x flex h-(--header-h) shrink-0 items-center justify-between border-b border-line">
              <Brand onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label={header.closeMenu}
                className="relative flex size-10 items-center justify-center rounded-btn border border-line bg-panel text-fg before:absolute before:-inset-0.5 before:content-['']"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <nav aria-label={a11y.sections} className="page-x flex flex-col gap-1 py-6">
              {nav.map((item) => {
                const current = item.branch === activeBranch;
                return (
                  <Link
                    key={item.branch}
                    href={item.href}
                    onClick={onClose}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md border px-3.5 py-4",
                      current ? "border-blue bg-blue/12" : "border-transparent",
                    )}
                  >
                    <GitBranchIcon size={18} className={current ? "text-blue" : "text-dim"} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="t-h3 text-fg">{item.title}</span>
                      <span className="t-mono-sm text-dim">{item.branch}</span>
                    </span>
                    <span aria-hidden="true" className="t-h3 text-dim">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="page-x flex flex-col gap-3.5 pt-1 pb-8">
              <Button href={hero.primary.href} onClick={onClose} variant="primary" icon="download" fullWidth className="py-3.5">
                {header.cv}
              </Button>

              <div className="flex items-center justify-between rounded-md border border-line bg-panel px-3.5 py-3">
                <span className="t-strong text-fg">{mobileMenu.theme}</span>
                <div role="group" aria-label={mobileMenu.theme} className="flex overflow-hidden rounded-sm bg-panel-2">
                  {(["dark", "light"] as const).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setTheme(theme)}
                      aria-pressed={resolvedTheme === theme}
                      className={cn(
                        "t-btn-sm px-3 py-1.5",
                        resolvedTheme === theme ? "rounded-sm bg-blue text-on-accent" : "text-dim",
                      )}
                    >
                      {mobileMenu[theme]}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="-ml-2 flex gap-1">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-10 items-center justify-center rounded-btn text-fg transition-colors duration-(--dur-ui) ease-ui hover:text-blue-t active:text-blue-t"
                    >
                      <TechLogo name={social.name} size={24} mono />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="t-caption text-dim">
                {mobileMenu.tip} <span className="t-mono-sm ml-1 text-green-t">{mobileMenu.tipKey}</span>
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </MotionProvider>
  );
}
