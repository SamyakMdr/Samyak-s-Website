"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Button } from "@/components/ui/Button";
import { HintChip } from "@/components/ui/HintChip";
import { Kbd } from "@/components/ui/Kbd";
import { terminalCopy } from "@/content/commands";
import { header } from "@/content/site";
import { useIsApple } from "@/lib/platform";

type HintToastCardProps = {
  visible: boolean;
  onRun: (command: string) => void;
  onDismiss: () => void;
};

// The toast itself (see HintToast for when it shows). Loaded on demand so its
// animation code is not part of the first bundle.
export default function HintToastCard({ visible, onRun, onDismiss }: HintToastCardProps) {
  const reducedMotion = useReducedMotion();
  const apple = useIsApple();
  const copy = terminalCopy.hintToast;

  return (
    <MotionProvider>
      <AnimatePresence>
        {visible && (
          <m.div
            role="status"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-20 left-4 z-40 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-x-3 gap-y-1.5 rounded-win border border-blue bg-panel px-4.5 py-3 shadow-toast tablet:bottom-6 tablet:left-6"
          >
            <span className="t-body-sm text-fg">{copy.text}</span>
            <HintChip command={copy.command} onRun={onRun} />
            <span className="t-body-sm text-fg">{copy.or}</span>
            <Kbd>{apple ? header.commandKeys.apple : header.commandKeys.other}</Kbd>
            <Button variant="ghost" onClick={onDismiss}>
              {copy.dismiss}
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </MotionProvider>
  );
}
