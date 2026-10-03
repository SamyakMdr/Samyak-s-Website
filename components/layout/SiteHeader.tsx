"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, TerminalIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { NavTab } from "@/components/ui/NavTab";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { a11y, header, hero, nav } from "@/content/site";
import { useCommands } from "@/lib/commands";
import { useIsApple } from "@/lib/platform";
import { useActiveSection } from "@/lib/useActiveSection";
import { Brand } from "./Brand";


// Which header tab each Home section lights up. Sections without a tab
// (education, services, cv) leave every tab idle.
const SECTION_TAB: Record<string, string | null> = {
  main: "main",
  terminal: "main",
  work: "main",
  skills: "main",
  experience: "experience",
  projects: "feature/projects",
  education: null,
  services: null,
  cv: null,
  contact: "contact",
};
const SECTION_IDS = Object.keys(SECTION_TAB);

// The menu (and its animation code) is only needed below the desktop breakpoint,
// and only once it is opened, so it is fetched when the browser is idle there.
const loadMobileMenu = () => import("./MobileMenu");
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });
const MENU_QUERY = "(max-width: 1199px)";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const section = useActiveSection(SECTION_IDS, onHome);
  const [menuOpen, setMenuOpen] = useState(false);
  // Mounted on first open and kept, so the closing animation can play.
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(MENU_QUERY).matches) return;
    const idle = window.requestIdleCallback ?? ((run: () => void) => window.setTimeout(run, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => void loadMobileMenu());
    return () => cancel(handle);
  }, []);

  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };
  const { focusTerminal } = useCommands();
  const apple = useIsApple();

  const activeBranch = onHome
    ? section === null
      ? "main"
      : SECTION_TAB[section]
    : pathname.startsWith("/projects")
      ? "feature/projects"
      : null;

  // 40px as drawn; the pseudo-element widens the tap target to 44px.
  const iconButton =
    "relative flex size-10 shrink-0 items-center justify-center rounded-btn border border-line bg-panel text-fg transition-colors duration-(--dur-ui) ease-ui before:absolute before:-inset-0.5 before:content-[''] hover:bg-panel-hover";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-line bg-bg/80 backdrop-blur-[7px] desktop:bg-bg/72">
        <div className="page-x flex h-full items-center gap-2 desktop:gap-3.5">
          <Brand />

          <nav aria-label={a11y.sections} className="flex items-start gap-1 max-desktop:hidden">
            {nav.map((item) => (
              <NavTab key={item.branch} label={item.branch} href={item.href} active={item.branch === activeBranch} />
            ))}
          </nav>

          <span className="flex-1" />

          <div className="flex items-center gap-2 max-desktop:hidden">
            <button
              type="button"
              onClick={focusTerminal}
              className="flex items-center gap-2 rounded-btn border border-line bg-panel px-2.5 py-1.75 transition-colors duration-(--dur-ui) ease-ui hover:bg-panel-hover"
            >
              <span className="t-body-sm text-dim">{header.command}</span>
              <Kbd>{apple ? header.commandKeys.apple : header.commandKeys.other}</Kbd>
            </button>
            <Button href={hero.primary.href} variant="primary" size="sm" icon="download">
              {header.cv}
            </Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 desktop:hidden">
            <button type="button" onClick={focusTerminal} aria-label={header.openTerminal} className={iconButton}>
              <TerminalIcon size={18} />
            </button>
            <button
              type="button"
              onClick={openMenu}
              aria-label={header.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={iconButton}
            >
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuMounted && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeBranch={activeBranch ?? null} />
      )}
    </>
  );
}
