import { SectionHead } from "@/components/layout/SectionHead";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { ShortcutsCard } from "@/components/terminal/ShortcutsCard";
import { hints } from "@/content/commands";
import { terminalSection } from "@/content/site";
import { Hints } from "./Hints";

export function TerminalSection() {
  return (
    <div className="flex flex-col gap-4 tablet:gap-5">
      <SectionHead
        title={terminalSection.title}
        tone={terminalSection.tone}
        branch={terminalSection.branch}
        titleId="terminal-title"
      />
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start">
        <InteractiveTerminal className="min-w-0 desktop:h-125.75 desktop:flex-1" />
        {/* Desktop: same height as the terminal, scrolls inside. Tablet (not
            designed): below the terminal at its natural height. Hidden on mobile. */}
        <ShortcutsCard className="max-tablet:hidden desktop:h-125.75 desktop:w-85 desktop:shrink-0" />
      </div>
      <Hints label={terminalSection.hintsLabel} commands={hints} />
    </div>
  );
}
