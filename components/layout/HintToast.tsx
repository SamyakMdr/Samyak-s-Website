"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HintChip } from "@/components/ui/HintChip";
import { Kbd } from "@/components/ui/Kbd";
import { terminalCopy } from "@/content/commands";
import { header } from "@/content/site";
import { HINT_STORAGE_KEY, useCommands } from "@/lib/commands";
import { useIsApple } from "@/lib/platform";

const DELAY = 4000; // "a few seconds after the first page load"

function remember(): void {
  try {
    window.localStorage.setItem(HINT_STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the hint simply shows again.
  }
}

// First-visit hint, bottom left, shown once. It goes away on "Got it", Esc or
// any use of the terminal.
export function HintToast() {
  const { terminalUsed, focusTerminal, runInTerminal } = useCommands();
  const [due, setDue] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reducedMotion = useReducedMotion();
  const apple = useIsApple();
  const copy = terminalCopy.hintToast;
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

  const runHint = (command: string) => {
    focusTerminal();
    runInTerminal(command);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-20 left-4 z-40 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-x-3 gap-y-1.5 rounded-win border border-blue bg-panel px-4.5 py-3 shadow-toast tablet:bottom-6 tablet:left-6"
        >
          <span className="t-body-sm text-fg">{copy.text}</span>
          <HintChip command={copy.command} onRun={runHint} />
          <span className="t-body-sm text-fg">{copy.or}</span>
          <Kbd>{apple ? header.commandKeys.apple : header.commandKeys.other}</Kbd>
          <Button variant="ghost" onClick={dismiss}>
            {copy.dismiss}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
