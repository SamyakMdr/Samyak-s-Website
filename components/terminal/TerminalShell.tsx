"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { terminalCopy } from "@/content/commands";
import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";
import { loadOutput, TerminalOutput } from "./TerminalOutputLazy";
import { TypedText } from "./TerminalWindow";
import { useTerminal } from "./useTerminal";

type TerminalShellProps = {
  /** The lines already on screen. They stay, and scroll up as commands run. */
  children: ReactNode;
  /** Padding, type and row gap of the screen. */
  className?: string;
  /** Added to each command and its result (the hero leaves a blank line under each). */
  entryClassName?: string;
  caretClassName?: string;
};

// The screen of a small terminal (README hero, CV band). At rest it is the
// frame as drawn: its lines, then `$` and the block cursor. That prompt takes
// every command the main terminal does, and the frame never grows: output is
// printed above the prompt and older lines scroll away, as in a real shell.
export function TerminalShell({ children, className, entryClassName, caretClassName }: TerminalShellProps) {
  const terminal = useTerminal();
  const { input, caret, entries, suggestion, inputRef } = terminal;
  const screen = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const inputId = useId();
  const scrolls = entries.length > 0;

  // Keep the prompt in view, with the newest output just above it.
  useEffect(() => {
    const element = screen.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [entries, input]);

  // Output lands a moment after its command (its code is fetched on first use,
  // project covers later still), so the screen also follows the log as it grows.
  useEffect(() => {
    const element = screen.current;
    const output = log.current;
    if (!element || !output) return;
    const observer = new ResizeObserver(() => {
      element.scrollTop = element.scrollHeight;
    });
    observer.observe(output);
    return () => observer.disconnect();
  }, []);

  const column = cn("flex flex-col whitespace-nowrap", className);

  return (
    <div className="relative">
      {/* An unseen copy of the resting frame holds its height, so the screen
          below can fill it and scroll inside. */}
      <div aria-hidden="true" className={cn(column, "invisible")}>
        {children}
        <p>$</p>
      </div>

      <div
        ref={screen}
        data-lenis-prevent={scrolls ? "" : undefined}
        className={cn(column, "thin-scroll absolute inset-0 overflow-x-hidden", scrolls ? "overflow-y-auto" : "overflow-y-hidden")}
        onClick={(event) => {
          // Clicking the screen focuses the prompt, like a real shell. Selecting
          // text to copy it, or pressing something in the output, does not.
          if (event.target instanceof Element && event.target.closest("a, button")) return;
          if (window.getSelection()?.isCollapsed === false) return;
          inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div aria-hidden="true" className="contents">
          {children}
        </div>

        <div
          ref={log}
          role="log"
          aria-live="polite"
          aria-label={a11y.terminalOutput}
          className={cn("flex shrink-0 flex-col gap-[inherit] whitespace-normal", !scrolls && "hidden")}
        >
          {scrolls && <TerminalOutput shell entries={entries} onRun={terminal.submit} entryClassName={entryClassName} />}
        </div>

        <form
          className="flex shrink-0 items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            terminal.submit(input);
          }}
        >
          <label htmlFor={inputId} className="shrink-0 text-green-t">
            <span className="sr-only">{terminalCopy.inputLabel}</span>
            <span aria-hidden="true">$</span>
          </label>
          {/* The real input is transparent; the mirror draws text, ghost and block
              caret. Reversing the row keeps the caret in view when a command is
              longer than the frame: the start of the line is what gets cut off. */}
          <div className={cn("relative flex min-w-0 flex-1 overflow-hidden", input && "flex-row-reverse")}>
            <div aria-hidden="true" className={cn("flex min-w-0 items-center whitespace-pre", input && "mr-auto shrink-0")}>
              <TypedText input={input} caret={caret} suggestion={suggestion} caretClassName={caretClassName} />
              {focused && !input && <span className="ml-2 min-w-0 truncate text-dim tablet:ml-2.5">{terminalCopy.idleHint}</span>}
            </div>
            <input
              ref={inputRef}
              id={inputId}
              value={input}
              onChange={(event) => terminal.change(event.target.value, event.target.selectionEnd ?? undefined)}
              onSelect={(event) => terminal.syncCaret(event.currentTarget)}
              onKeyDown={terminal.onKeyDown}
              onFocus={() => {
                setFocused(true);
                terminal.noteTerminalUse();
                void loadOutput();
              }}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              // 16px, though nothing of it shows: a smaller field makes iOS zoom the page on focus.
              className="absolute inset-0 w-full bg-transparent text-[16px] text-transparent caret-transparent focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
