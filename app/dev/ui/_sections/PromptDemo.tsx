"use client";

import { useState } from "react";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { FilterChip } from "@/components/ui/FilterChip";
import { projectsPage } from "@/content/site";

/** The two stateful controls from /projects, wired to local state. */
export function PromptDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <TerminalPrompt
        value={query}
        onChange={setQuery}
        label={projectsPage.searchLabel}
        placeholder={projectsPage.searchPlaceholder}
        placeholderMobile={projectsPage.searchPlaceholderMobile}
      />
      <div className="flex flex-wrap gap-2">
        {["All", "Web apps", "UI design"].map((label, index) => (
          <FilterChip
            key={label}
            label={label}
            count={[12, 6, 2][index] ?? 0}
            selected={index === selected}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}
