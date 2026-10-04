import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TerminalWindowProps = {
  /** Shown on the right of the bar. Omit for the compact CV terminal. */
  title?: ReactNode;
  /** Compact bar: 9px dots on --panel-2 (CV band). */
  compact?: boolean;
  children: ReactNode;
  className?: string;
};

// Terminals stay dark inside light pages: data-theme="dark" re-scopes the tokens.
// The mobile frames draw a smaller bar: 9px dots 6px apart, padding 8 × 12.
export function TerminalWindow({
  title,
  compact = false,
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      data-theme="dark"
      data-cursor="text"
      className={cn(
        "flex flex-col overflow-hidden rounded-win border border-line bg-code-bg text-code-fg",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center",
          compact
            ? "gap-1.5 bg-panel-2 px-3 py-2.25"
            : "gap-1.5 bg-panel px-3 py-2 tablet:gap-1.75 tablet:px-3.5 tablet:py-2.5",
        )}
      >
        {(["bg-win-red", "bg-win-yellow", "bg-win-green"] as const).map(
          (dot) => (
            <span
              key={dot}
              className={cn(
                "size-2.25 rounded-full",
                dot,
                !compact && "tablet:size-2.5",
              )}
            />
          ),
        )}
        {title && (
          <span className="t-mono-sm ml-auto pl-1.75 whitespace-nowrap text-dim">
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// The typed text of a prompt with the block caret where the real input's caret
// is: after the text, or over a letter when the arrow keys moved it back. The
// grey completion only shows while the caret is at the end.
export function TypedText({
  input,
  caret,
  suggestion,
  caretClassName,
  textClassName,
}: {
  input: string;
  caret: number;
  suggestion?: string;
  caretClassName?: string;
  textClassName?: string;
}) {
  if (caret >= input.length) {
    return (
      <>
        <span className={textClassName}>{input}</span>
        {suggestion && <span className="text-dim">{suggestion}</span>}
        <Caret
          className={cn(
            caretClassName,
            (input || suggestion) && "ml-2 tablet:ml-2.5",
          )}
        />
      </>
    );
  }
  return (
    <>
      <span className={textClassName}>{input.slice(0, caret)}</span>
      {/* Zero width, so the text does not shift as the caret moves through it. */}
      <span
        aria-hidden="true"
        className="relative inline-block h-0 w-0 self-center"
      >
        <Caret
          className={cn(
            caretClassName,
            "absolute top-1/2 left-0 -translate-y-1/2 opacity-80",
          )}
        />
      </span>
      <span className={textClassName}>{input.slice(caret)}</span>
    </>
  );
}

/** Blinking block cursor: 8 × 17 green (7 × 15 on mobile), 1.05s steps(1). */
export function Caret({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-3.75 w-0.5 shrink-0 animate-caret bg-green tablet:h-4.25 tablet:w-0.5",
        className,
      )}
    />
  );
}
