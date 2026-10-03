"use client";

import { HintChip } from "@/components/ui/HintChip";
import { useCommands } from "@/lib/commands";

export function Hints({ label, commands }: { label: string; commands: string[] }) {
  const { runInTerminal } = useCommands();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="t-body-sm text-dim">{label}</span>
      {commands.map((command) => (
        <HintChip key={command} command={command} onRun={runInTerminal} />
      ))}
    </div>
  );
}
