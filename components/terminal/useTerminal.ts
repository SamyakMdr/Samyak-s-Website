"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { SlashItem } from "@/content/commands";
import { COMPLETIONS, useCommands, type OutputLine } from "@/lib/commands";

export interface TerminalEntry {
  id: number;
  command: string;
  lines: OutputLine[];
}

const HISTORY_KEY = "terminal-history";
const HISTORY_LIMIT = 50;

function readHistory(): string[] {
  try {
    const stored = window.sessionStorage.getItem(HISTORY_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function writeHistory(history: string[]): void {
  try {
    window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-HISTORY_LIMIT)));
  } catch {
    // History is a convenience; ignore storage failures.
  }
}

export function useTerminal(menuItems: SlashItem[]) {
  const { run, registerTerminal, noteTerminalUse } = useCommands();
  // The Figma frame shows the terminal with "/" typed and the menu open.
  const [input, setInput] = useState("/");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    history.current = readHistory();
  }, []);

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
      history.current = [...history.current.filter((item) => item !== command), command];
      writeHistory(history.current);
      historyIndex.current = null;
      setEntries((previous) =>
        result.clear ? [] : [...previous, { id: nextId.current++, command, lines: result.lines }],
      );
      setInput("");
      setSelected(0);
    },
    [run, noteTerminalUse],
  );

  const change = useCallback((value: string) => {
    historyIndex.current = null;
    setSelected(0);
    setInput(value);
  }, []);

  useEffect(
    () =>
      registerTerminal({
        focus: () => {
          const element = inputRef.current;
          if (!element) return;
          element.focus({ preventScroll: true });
          element.setSelectionRange(element.value.length, element.value.length);
        },
        submit,
      }),
    [registerTerminal, submit],
  );

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
          const list = history.current;
          if (list.length === 0) return;
          const current = historyIndex.current ?? list.length;
          const next = Math.min(Math.max(current + step, 0), list.length);
          historyIndex.current = next === list.length ? null : next;
          setInput(list[next] ?? "");
          return;
        }
        case "Tab": {
          if (menuOpen && item) {
            event.preventDefault();
            // `/open <name>` completes to "/open " so a project can be typed.
            change(item.command.includes("<") ? `${item.command.split(" ")[0]} ` : item.command);
          } else if (suggestion) {
            event.preventDefault();
            change(input + suggestion);
          }
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
    change,
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
