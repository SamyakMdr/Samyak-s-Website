"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { SlashItem } from "@/content/commands";
import { COMPLETIONS, useCommands, type OutputLine } from "@/lib/commands";
import { readHistory, recordHistory } from "@/lib/shellHistory";

export interface TerminalEntry {
  id: number;
  command: string;
  lines: OutputLine[];
}

type TerminalOptions = {
  /** Slash menu rows. The small terminals have none. */
  menu?: SlashItem[];
  /** The page's main terminal: "/" and Ctrl K focus it, and hint chips type into it. */
  main?: boolean;
};

const NO_MENU: SlashItem[] = [];

export function useTerminal({ menu: menuItems = NO_MENU, main = false }: TerminalOptions = {}) {
  const { run, registerTerminal, noteTerminalUse } = useCommands();
  // The Figma frame shows the main terminal with "/" typed and the menu open.
  const [input, setInput] = useState(main ? "/" : "");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  // Where the text caret is in the input. The real input is transparent, so the
  // mirror needs it to draw the block caret at the right place.
  const [caret, setCaret] = useState(main ? 1 : 0);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyIndex = useRef<number | null>(null);
  const nextId = useRef(0);

  const menu = useMemo(() => {
    if (!input.startsWith("/")) return [];
    const typed = input.toLowerCase();
    const head = typed.split(" ")[0] ?? typed;
    return menuItems.filter((item) => item.command.toLowerCase().startsWith(head));
  }, [input, menuItems]);

  const menuOpen = menu.length > 0;
  const activeIndex = Math.min(selected, Math.max(menu.length - 1, 0));

  // Grey completion shown after the typed text (plain commands only).
  const suggestion = useMemo(() => {
    if (!input || input.startsWith("/")) return "";
    const typed = input.toLowerCase();
    const match = COMPLETIONS.find((candidate) => candidate.startsWith(typed) && candidate.length > typed.length);
    return match ? match.slice(typed.length) : "";
  }, [input]);

  const submit = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;
      noteTerminalUse();
      const result = run(command);
      recordHistory(command);
      historyIndex.current = null;
      setEntries((previous) =>
        result.clear ? [] : [...previous, { id: nextId.current++, command, lines: result.lines }],
      );
      setInput("");
      setCaret(0);
      setSelected(0);
    },
    [run, noteTerminalUse],
  );

  // `at` is the caret after the edit; programmatic changes put it at the end.
  const change = useCallback((value: string, at = value.length) => {
    historyIndex.current = null;
    setSelected(0);
    setInput(value);
    setCaret(at);
  }, []);

  /** Follows arrow keys, Home/End, clicks and selection in the real input. */
  const syncCaret = useCallback((element: HTMLInputElement) => {
    setCaret(element.selectionEnd ?? element.value.length);
  }, []);

  useEffect(() => {
    if (!main) return;
    return registerTerminal({
      focus: () => {
        const element = inputRef.current;
        if (!element) return;
        element.focus({ preventScroll: true });
        element.setSelectionRange(element.value.length, element.value.length);
      },
      submit,
    });
  }, [main, registerTerminal, submit]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const item = menu[activeIndex];
      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp": {
          event.preventDefault();
          const step = event.key === "ArrowDown" ? 1 : -1;
          if (menuOpen) {
            setSelected((activeIndex + step + menu.length) % menu.length);
            return;
          }
          const list = readHistory();
          if (list.length === 0) return;
          const current = historyIndex.current ?? list.length;
          const next = Math.min(Math.max(current + step, 0), list.length);
          historyIndex.current = next === list.length ? null : next;
          const recalled = list[next] ?? "";
          setInput(recalled);
          setCaret(recalled.length);
          return;
        }
        case "Tab": {
          // Tab is only taken while it adds to what is typed. Otherwise, and for
          // Shift+Tab, focus moves on, so the prompt never traps the keyboard.
          if (event.shiftKey) return;
          let completed = input;
          if (menuOpen && item) {
            // `/open <name>` completes to "/open " so a project can be typed.
            const command = item.command.includes("<") ? `${item.command.split(" ")[0]} ` : item.command;
            if (command.toLowerCase().startsWith(input.toLowerCase())) completed = command;
          } else if (suggestion) {
            completed = input + suggestion;
          }
          if (completed === input) return;
          event.preventDefault();
          change(completed);
          return;
        }
        case "Enter": {
          event.preventDefault();
          const head = input.trim().split(" ")[0] ?? "";
          // A partly typed slash command runs the highlighted row.
          const partial = menuOpen && item && !input.trim().includes(" ") && head !== item.command;
          submit(partial ? item.run : menuOpen && item && input.trim() === item.command.split(" ")[0] ? item.run : input);
          return;
        }
        case "Escape": {
          if (input) {
            event.preventDefault();
            event.stopPropagation();
            change("");
          } else {
            inputRef.current?.blur();
          }
          return;
        }
        case "?": {
          if (input === "") {
            event.preventDefault();
            submit("help");
          }
          return;
        }
      }
    },
    [menu, menuOpen, activeIndex, suggestion, input, change, submit],
  );

  return {
    input,
    caret: Math.min(caret, input.length),
    change,
    syncCaret,
    entries,
    menu,
    menuOpen,
    activeIndex,
    setSelected,
    suggestion,
    submit,
    onKeyDown,
    inputRef,
    noteTerminalUse,
  };
}
