"use client";

import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";

type HintChipProps = {
  command: string;
  /** Fills the terminal with the command and runs it. */
  onRun?: (command: string) => void;
  className?: string;
};

export function HintChip({ command, onRun, className }: HintChipProps) {
  return (
    <button
      type="button"
      onClick={() => onRun?.(command)}
      aria-label={a11y.runCommand(command)}
      className={cn(
        "t-mono-sm inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-dashed border-line bg-panel-2 px-2.5 py-1.5 whitespace-nowrap text-fg",
        "transition-colors duration-(--dur-ui) ease-ui hover:bg-panel-hover",
        className,
      )}
    >
      <span aria-hidden="true" className="text-green-t">
        &gt;
      </span>
      {command}
    </button>
  );
}
