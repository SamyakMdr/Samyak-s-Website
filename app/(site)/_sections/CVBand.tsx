import { TerminalShell } from "@/components/terminal/TerminalShell";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { Button } from "@/components/ui/Button";
import { cvBand, site } from "@/content/site";
import { cn } from "@/lib/cn";

type Line = { prompt: string; text: string; tone: "command" | "info" | "success" };

function Lines({ lines }: { lines: readonly Line[] }) {
  return lines.map((line) => (
    <p key={line.text} className={cn("flex items-center gap-2", line.tone === "info" && "text-dim")}>
      <span className={line.tone === "info" ? undefined : "text-green-t"}>{line.prompt}</span>
      <span>{line.text}</span>
    </p>
  ));
}

export function CVBand() {
  return (
    <section id={cvBand.id} aria-labelledby="cv-title" className="page-x section-top">
      <div data-reveal="" className="flex flex-col gap-3.5 rounded-2xl border border-line bg-panel p-5.5 desktop:flex-row desktop:items-center desktop:gap-12 desktop:p-12">
        <div className="flex min-w-0 flex-col gap-3.5 desktop:flex-1 desktop:items-start desktop:gap-4">
          <h2 id="cv-title" className="t-h2 text-fg">
            {cvBand.title}
          </h2>
          <p className="t-body-lg max-w-115 text-dim max-tablet:hidden">{cvBand.text}</p>
          <p className="t-body-lg text-dim tablet:hidden">{cvBand.textMobile}</p>
          <div className="flex gap-3 max-tablet:hidden">
            <Button href={site.cv.href} download={site.cv.file} variant="primary" icon="download">
              {cvBand.primary}
            </Button>
            <Button href={site.cv.href} target="_blank" rel="noopener" variant="ghost">
              {cvBand.secondary}
            </Button>
          </div>
        </div>

        {/* The prompt under these lines takes commands, download cv among them. */}
        <TerminalWindow compact className="w-full shrink-0 max-tablet:hidden desktop:w-120">
          <TerminalShell className="t-code gap-2 px-4.5 pt-4 pb-4.5" caretClassName="tablet:h-4">
            <Lines lines={cvBand.terminal} />
          </TerminalShell>
        </TerminalWindow>

        {/* Mobile: a bare two-line terminal, then one full-width download button. */}
        <div data-theme="dark" className="overflow-hidden rounded-md bg-code-bg px-3.5 py-2.5 text-code-fg tablet:hidden">
          <div aria-hidden="true" className="t-code-m flex flex-col gap-1 whitespace-nowrap">
            <Lines lines={cvBand.terminalMobile} />
          </div>
        </div>
        <Button
          href={site.cv.href}
          download={site.cv.file}
          variant="primary"
          icon="download"
          fullWidth
          className="py-3.5 tablet:hidden"
        >
          {cvBand.primary}
        </Button>
      </div>
    </section>
  );
}
