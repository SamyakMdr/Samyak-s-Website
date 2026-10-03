import type { ReactNode } from "react";
import { BranchTag } from "@/components/ui/BranchTag";
import type { Tone } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  title: string;
  tone: Tone;
  branch: string;
  intro?: ReactNode;
  /** Shorter intro shown below the mobile breakpoint; `false` drops the intro there. */
  introMobile?: ReactNode | false;
  /** id for aria-labelledby on the section. */
  titleId?: string;
  className?: string;
};

export function SectionHead({ title, tone, branch, intro, introMobile, titleId, className }: SectionHeadProps) {
  return (
    // Mobile sections are one column with a 20px gap, so the intro sits 20px
    // below the title there and 12px below it from the tablet breakpoint up.
    <div className={cn("flex flex-col gap-5 tablet:gap-3", className)}>
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
        <h2 id={titleId} className="t-h2 text-fg">
          {title}
        </h2>
        <BranchTag tone={tone} label={branch} />
      </div>
      {intro && (
        <p className={cn("max-w-160 text-dim tablet:t-body-lg max-tablet:t-body", introMobile !== undefined && "max-tablet:hidden")}>
          {intro}
        </p>
      )}
      {introMobile && <p className="t-body text-dim tablet:hidden">{introMobile}</p>}
    </div>
  );
}
