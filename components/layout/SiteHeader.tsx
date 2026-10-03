"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, TerminalIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { NavTab } from "@/components/ui/NavTab";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { header, hero, nav } from "@/content/site";
import { useCommands } from "@/lib/commands";
import { useIsApple } from "@/lib/platform";
import { useActiveSection } from "@/lib/useActiveSection";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";

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

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const section = useActiveSection(SECTION_IDS, onHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const { focusTerminal } = useCommands();
  const apple = useIsApple();

  const activeBranch = onHome
    ? section === null
      ? "main"
      : SECTION_TAB[section]
    : pathname.startsWith("/projects")
      ? "feature/projects"
      : null;

  const iconButton =
    "flex size-10 shrink-0 items-center justify-center rounded-btn border border-line bg-panel text-fg transition-colors duration-(--dur-ui) ease-ui hover:bg-panel-hover";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-line bg-bg/80 backdrop-blur-[7px] desktop:bg-bg/72">
        <div className="page-x flex h-full items-center gap-2 desktop:gap-3.5">
          <Brand />

          <nav aria-label="Sections" className="flex items-start gap-1 max-desktop:hidden">
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
              onClick={() => setMenuOpen(true)}
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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeBranch={activeBranch ?? null} />
    </>
  );
}
