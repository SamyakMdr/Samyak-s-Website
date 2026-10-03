import { historyTerminal } from "@/content/site";
import { cn } from "@/lib/cn";
import { Caret, TerminalWindow } from "./TerminalWindow";

type HistoryView = {
  historyCommand: string;
  historyStart: number;
  history: string[];
  logCommand: string;
  log: { hash: string; message: string }[];
};

function Prompt({ children }: { children?: string }) {
  return (
    <p className="flex items-center gap-2">
      <span className="text-green-t">$</span>
      {children ? <span>{children}</span> : <Caret />}
    </p>
  );
}

function Lines({ view, className }: { view: HistoryView; className?: string }) {
  return (
    <div className={cn("flex flex-col whitespace-nowrap", className)}>
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
      <Prompt />
    </div>
  );
}

// Decorative shell history in the README hero. Mobile shows a shorter tail in
// 12px type, with a bare bar (no title) and no blank lines between commands.
export function HistoryTerminal({ className }: { className?: string }) {
  const desktop: HistoryView = { ...historyTerminal, historyStart: 1 };
  const mobile: HistoryView = historyTerminal.mobile;

  return (
    <TerminalWindow title={<span className="max-tablet:hidden">{historyTerminal.title}</span>} className={className}>
      <div aria-hidden="true" className="overflow-hidden px-3.5 py-2.75 tablet:px-4.5 tablet:pt-4 tablet:pb-4.5">
        <Lines view={desktop} className="t-code gap-1.5 max-tablet:hidden" />
        <Lines view={mobile} className="t-code-m gap-0.5 tablet:hidden" />
      </div>
    </TerminalWindow>
  );
}
