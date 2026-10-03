"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type TerminalPromptProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
};

// Single-line search box styled as a shell prompt (used on /projects).
export function TerminalPrompt({ value, onChange, placeholder, label, className }: TerminalPromptProps) {
  const id = useId();

  return (
    <div
      data-theme="dark"
      data-cursor="text"
      className={cn(
        "t-code flex items-center gap-2.5 rounded-md border border-line bg-code-bg px-3.5 py-2.75 text-code-fg",
        "focus-within:border-blue focus-within:shadow-[inset_0_0_0_1px_var(--blue)]",
        className,
      )}
    >
      <label htmlFor={id} className="shrink-0 text-green-t">
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">samyak@dev:~$</span>
      </label>
      {/* The block cursor marks the prompt until the field has text or focus. */}
      {value === "" && (
        <span aria-hidden="true" className="h-4.5 w-2.25 shrink-0 animate-caret bg-green" />
      )}
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent text-code-fg placeholder:text-dim focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
    </div>
  );
}
