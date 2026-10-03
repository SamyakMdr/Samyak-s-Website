"use client";

import { useEffect } from "react";
import { shortcuts } from "@/content/commands";
import { useCommands } from "./commands";

// How long the first key of a two-key shortcut ("g" then "p") stays armed.
const SEQUENCE_WINDOW = 1200;

function isTyping(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("input, textarea, select, [contenteditable=true]") !== null;
}

/** Global keyboard shortcuts (doc/interactions.md §2). Ignored while typing. */
export function useShortcuts(): void {
  const { run, runInTerminal, focusTerminal } = useCommands();

  useEffect(() => {
    let prefix: string | null = null;
    let timer = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      // Ctrl/⌘ K focuses the terminal from anywhere, even from another input.
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        focusTerminal();
        return;
      }
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;

      const pressed = prefix ? [prefix, event.key] : [event.key];
      window.clearTimeout(timer);
      prefix = null;

      const match = shortcuts.find(
        (shortcut) => shortcut.keys.length === pressed.length && shortcut.keys.every((key, index) => key === pressed[index]),
      );
      if (match) {
        event.preventDefault();
        if (match.run === "focus") {
          focusTerminal();
        } else if (match.inTerminal) {
          // Output-only commands are only useful where they can be read.
          focusTerminal();
          runInTerminal(match.run);
        } else {
          run(match.run);
        }
        return;
      }

      const startsSequence = pressed.length === 1 && shortcuts.some((shortcut) => shortcut.keys.length > 1 && shortcut.keys[0] === event.key);
      if (startsSequence) {
        prefix = event.key;
        timer = window.setTimeout(() => {
          prefix = null;
        }, SEQUENCE_WINDOW);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [run, runInTerminal, focusTerminal]);
}
