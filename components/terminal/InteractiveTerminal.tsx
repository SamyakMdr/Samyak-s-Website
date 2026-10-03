"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { slashMenu, terminalCopy } from "@/content/commands";
import { cn } from "@/lib/cn";
import { TerminalOutput } from "./TerminalOutput";
import { Caret, TerminalWindow } from "./TerminalWindow";
import { useTerminal } from "./useTerminal";

// One terminal for every width: the mobile frame only swaps copy and drops the
// cwd line and /theme row, so those differences are handled with CSS.
function Swap({ desktop, mobile }: { desktop: string; mobile?: string }) {
  if (!mobile) return desktop;
  return (
    <>
      <span className="max-tablet:hidden">{desktop}</span>
      <span className="tablet:hidden">{mobile}</span>
    </>
  );
}

export function InteractiveTerminal({ className }: { className?: string }) {
  const terminal = useTerminal(slashMenu);
  const { input, entries, menu, menuOpen, activeIndex, suggestion, inputRef } = terminal;
  const log = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listId = useId();

  // Keep the newest output in view, just above the input.
  useEffect(() => {
    const element = log.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [entries]);

  return (
    <TerminalWindow
      title={
        <>
          <span className="max-tablet:hidden">{terminalCopy.title}</span>
          <span className="tablet:hidden">{terminalCopy.titleMobile}</span>
        </>
      }
      className={cn("rounded-card", className)}
    >
      <div
        className="flex min-h-0 flex-1 flex-col gap-3 p-3.5 tablet:gap-4 tablet:px-5.5 tablet:pt-5 tablet:pb-4.5"
        onClick={(event) => {
          // Clicking empty terminal space focuses the prompt, like a real shell.
          if (event.target === event.currentTarget) inputRef.current?.focus();
        }}
      >
        <div className="flex shrink-0 flex-col gap-0.75 rounded-btn border border-violet/70 px-3 py-2.5 tablet:gap-1.5 tablet:px-4 tablet:py-3">
          <p className="t-mono-label flex items-center gap-2">
            <span className="text-violet-t">✻</span>
            <span className="text-code-fg">{terminalCopy.welcome}</span>
          </p>
          <p className="t-mono-sm text-dim max-tablet:hidden">{terminalCopy.welcomeHint}</p>
          <p className="t-mono-sm text-dim tablet:hidden">{terminalCopy.welcomeHintMobile}</p>
          <p className="t-mono-sm text-dim max-tablet:hidden">{terminalCopy.cwd}</p>
        </div>

        <div
          ref={log}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          data-lenis-prevent
          className={cn(
            "thin-scroll flex min-h-0 flex-col gap-2 overflow-y-auto",
            entries.length === 0 ? "hidden" : "max-desktop:max-h-64 desktop:flex-1",
          )}
        >
          <TerminalOutput entries={entries} onRun={terminal.submit} />
        </div>

        <form
          className="flex shrink-0 items-center gap-2 rounded-btn border border-green/60 px-3 py-2.5 tablet:t-code tablet:gap-2.5 tablet:px-3.5 tablet:py-3 max-tablet:t-code-m focus-within:border-green"
          onSubmit={(event) => {
            event.preventDefault();
            terminal.submit(input);
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <label htmlFor={inputId} className="shrink-0 text-green-t">
            <span className="sr-only">{terminalCopy.inputLabel}</span>
            <span aria-hidden="true">❯</span>
          </label>
          {/* The real input is transparent; the mirror draws text, ghost and block caret. */}
          <div className="relative min-w-0 flex-1">
            <div aria-hidden="true" className="flex items-center whitespace-pre">
              <span className="text-code-fg">{input}</span>
              {suggestion && <span className="text-dim">{suggestion}</span>}
              <Caret className={cn(input || suggestion ? "ml-2 tablet:ml-2.5" : "")} />
              {!input && <span className="ml-2 truncate text-dim tablet:ml-2.5">{terminalCopy.idleHint}</span>}
            </div>
            <input
              ref={inputRef}
              id={inputId}
              value={input}
              onChange={(event) => terminal.change(event.target.value)}
              onKeyDown={terminal.onKeyDown}
              onFocus={terminal.noteTerminalUse}
              role="combobox"
              aria-expanded={menuOpen}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={menuOpen ? `${listId}-${activeIndex}` : undefined}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent focus:outline-none"
            />
          </div>
        </form>

        <ul
          id={listId}
          role="listbox"
          aria-label="Commands"
          className={cn("flex shrink-0 flex-col gap-0.5 px-1.5 max-tablet:px-0", !menuOpen && "hidden")}
        >
          {menu.map((item, index) => {
            const active = index === activeIndex;
            const row = cn(
              "flex w-full items-center gap-4 rounded-xs px-2.5 py-1.5 text-left max-tablet:min-h-9",
              active && "bg-panel",
            );
            const content = (
              <>
                <span className={cn("t-mono-label w-37.5 shrink-0 max-tablet:w-27.5", active ? "text-blue-t" : "text-code-fg")}>
                  <Swap desktop={item.command} mobile={item.commandMobile} />
                </span>
                <span className="t-mono-sm truncate text-dim">
                  <Swap desktop={item.description} mobile={item.descriptionMobile} />
                </span>
              </>
            );
            return (
              <li
                key={item.command}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={active}
                className={item.desktopOnly ? "max-tablet:hidden" : undefined}
                onMouseEnter={() => terminal.setSelected(index)}
              >
                {/* Rows with a destination are real links, so typing stays optional. */}
                {item.href ? (
                  <Link
                    href={item.href}
                    tabIndex={-1}
                    className={row}
                    onClick={(event) => {
                      event.preventDefault();
                      terminal.submit(item.run);
                    }}
                  >
                    {content}
                  </Link>
                ) : (
                  <button type="button" tabIndex={-1} className={row} onClick={() => terminal.submit(item.run)}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <p className="t-mono-sm mt-auto flex shrink-0 items-center justify-between gap-4 px-1.5 text-dim max-tablet:hidden">
          <span>{terminalCopy.statusLeft}</span>
          <span>{suggestion ? terminalCopy.completeHint : terminalCopy.statusRight}</span>
        </p>
        <p className="t-mono-sm shrink-0 text-dim tablet:hidden">{terminalCopy.statusMobile}</p>
      </div>
    </TerminalWindow>
  );
}
