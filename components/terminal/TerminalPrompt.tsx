"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type TerminalPromptProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Shorter placeholder shown below the mobile breakpoint, when Figma has one. */
  placeholderMobile?: string;
  label: string;
  className?: string;
};

// Single-line search box styled as a shell prompt (used on /projects). 44px tall.
export function TerminalPrompt({ value, onChange, placeholder, placeholderMobile, label, className }: TerminalPromptProps) {
  const id = useId();

  return (
    <div
      data-theme="dark"
      data-cursor="text"
      className={cn(
        "t-code flex h-11 items-center gap-2.5 rounded-md border border-line bg-code-bg px-3.5 text-code-fg",
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
      <div className="relative flex min-w-0 flex-1">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "peer min-w-0 flex-1 bg-transparent text-code-fg placeholder:text-dim focus:outline-none [&::-webkit-search-cancel-button]:hidden",
            placeholderMobile && "max-tablet:placeholder:text-transparent",
          )}
        />
        {/* A placeholder cannot change with the viewport, so the mobile copy is
            drawn over the empty field instead. */}
        {placeholderMobile && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden items-center truncate text-dim max-tablet:peer-placeholder-shown:flex"
          >
            {placeholderMobile}
          </span>
        )}
      </div>
    </div>
  );
}
