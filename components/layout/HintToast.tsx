"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { HINT_STORAGE_KEY, useCommands } from "@/lib/commands";

const HintToastCard = dynamic(() => import("./HintToastCard"), { ssr: false });

const DELAY = 4000; // "a few seconds after the first page load"

function remember(): void {
  try {
    window.localStorage.setItem(HINT_STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the hint simply shows again.
  }
}

// First-visit hint, bottom left, shown once. It goes away on "Got it", Esc or
// any use of the terminal. Returning visitors never load the toast at all.
export function HintToast() {
  const { terminalUsed, focusTerminal, runInTerminal } = useCommands();
  const [due, setDue] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visible = due && !dismissed && !terminalUsed;

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(HINT_STORAGE_KEY) !== null;
    } catch {
      seen = false;
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      setDue(true);
      remember();
    }, DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => setDismissed(true), []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  const runHint = useCallback(
    (command: string) => {
      focusTerminal();
      runInTerminal(command);
    },
    [focusTerminal, runInTerminal],
  );

  if (!due) return null;
  return <HintToastCard visible={visible} onRun={runHint} onDismiss={dismiss} />;
}
