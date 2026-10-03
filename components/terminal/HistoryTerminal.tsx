import { historyTerminal } from "@/content/site";
import { cn } from "@/lib/cn";
import { TerminalShell } from "./TerminalShell";
import { TerminalWindow } from "./TerminalWindow";

type HistoryView = {
  historyCommand: string;
  historyStart: number;
  history: string[];
  logCommand: string;
  log: { hash: string; message: string }[];
};

function Prompt({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-2">
      <span className="text-green-t">$</span>
      <span>{children}</span>
    </p>
  );
}

// The rows sit straight in the shell's column, so its gap spaces them.
function Lines({ view, className }: { view: HistoryView; className?: string }) {
  return (
    <div className={cn("contents", className)}>
      <Prompt>{view.historyCommand}</Prompt>
      {view.history.map((line, index) => (
        <p key={line} className="flex items-center gap-3 tablet:gap-3.5">
          <span className="whitespace-pre text-dim">{String(view.historyStart + index).padStart(3, " ")}</span>
          <span>{line}</span>
        </p>
      ))}
      <span className="h-1.5 max-tablet:hidden" />
      <Prompt>{view.logCommand}</Prompt>
      {view.log.map((entry) => (
        <p key={entry.hash} className="flex items-center gap-2">
          <span className="text-warn">{entry.hash}</span>
          <span>{entry.message}</span>
        </p>
      ))}
      <span className="h-1.5 max-tablet:hidden" />
    </div>
  );
}

// Shell history in the README hero, ending in a prompt that takes commands.
// Mobile shows a shorter tail in 12px type, with a bare bar (no title) and no
// blank lines between commands.
export function HistoryTerminal({ className }: { className?: string }) {
  const desktop: HistoryView = { ...historyTerminal, historyStart: 1 };
  const mobile: HistoryView = historyTerminal.mobile;

  return (
    <TerminalWindow title={<span className="max-tablet:hidden">{historyTerminal.title}</span>} className={className}>
      <TerminalShell
        className="px-3.5 py-2.75 tablet:t-code tablet:gap-1.5 tablet:px-4.5 tablet:pt-4 tablet:pb-4.5 max-tablet:t-code-m max-tablet:gap-0.5"
        entryClassName="tablet:pb-3"
      >
        <Lines view={desktop} className="max-tablet:hidden" />
        <Lines view={mobile} className="tablet:hidden" />
      </TerminalShell>
    </TerminalWindow>
  );
}
