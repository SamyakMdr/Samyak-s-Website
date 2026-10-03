import { SectionHead } from "@/components/layout/SectionHead";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { ShortcutsCard } from "@/components/terminal/ShortcutsCard";
import { hints } from "@/content/commands";
import { terminalSection } from "@/content/site";
import { Hints } from "./Hints";

export function TerminalSection() {
  return (
    // 503px in Figma (900px-tall frame). On shorter laptop screens the terminal
    // gives up height so the whole panel still fits one screen of the intro.
    <div className="flex flex-col gap-4 tablet:gap-5 [--terminal-h:min(503px,calc(100svh-265px))]">
      <SectionHead
        title={terminalSection.title}
        tone={terminalSection.tone}
        branch={terminalSection.branch}
        titleId="terminal-title"
      />
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start">
        <InteractiveTerminal className="min-w-0 desktop:h-(--terminal-h) desktop:flex-1" />
        {/* Desktop: same height as the terminal, scrolls inside. Tablet (not
            designed): below the terminal at its natural height. Hidden on mobile. */}
        <ShortcutsCard className="max-tablet:hidden desktop:h-(--terminal-h) desktop:w-85 desktop:shrink-0" />
      </div>
      <Hints label={terminalSection.hintsLabel} commands={hints} />
    </div>
  );
}
