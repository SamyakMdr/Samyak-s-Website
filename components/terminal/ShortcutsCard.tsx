import { Fragment } from "react";
import { Kbd } from "@/components/ui/Kbd";
import { gitCommands, shortcuts, terminalCopy } from "@/content/commands";
import { cn } from "@/lib/cn";

// Desktop only. Same height as the terminal; scrolls inside with a 4px bar.
export function ShortcutsCard({ className }: { className?: string }) {
  return (
    <aside
      aria-label={terminalCopy.shortcutsTitle}
      data-lenis-prevent
      tabIndex={0}
      className={cn(
        "thin-scroll flex flex-col gap-2.25 overflow-x-clip overflow-y-auto rounded-card border border-line bg-panel px-5.5 py-5",
        className,
      )}
    >
      <h3 className="t-h3 text-fg">{terminalCopy.shortcutsTitle}</h3>
      <p className="t-body-sm text-dim">{terminalCopy.shortcutsText}</p>

      <dl className="contents">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.label} className="flex items-center gap-1.5">
            <dt className="flex items-center gap-1.5">
              {shortcut.keys.map((key, index) => (
                <Fragment key={key + index}>
                  {index > 0 && <span className="t-caption text-dim">{terminalCopy.shortcutsThen}</span>}
                  <Kbd>{key}</Kbd>
                </Fragment>
              ))}
            </dt>
            <dd className="t-body-sm ml-auto whitespace-nowrap text-fg">{shortcut.label}</dd>
          </div>
        ))}
      </dl>

      <hr className="h-px shrink-0 border-0 bg-line" />

      <h4 className="t-h4 text-fg">{terminalCopy.gitTitle}</h4>
      <dl className="contents">
        {gitCommands.map((item) => (
          <div key={item.command} className="flex items-start gap-2.5 whitespace-nowrap">
            <dt className="t-mono-sm text-green-t">{item.command}</dt>
            <dd className="t-caption text-dim">{item.description}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
