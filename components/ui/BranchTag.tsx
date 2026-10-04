import { cva } from "class-variance-authority";
import type { CSSProperties } from "react";
import { GitBranchIcon } from "@/components/icons";
import type { Tone } from "@/content/types";
import { cn } from "@/lib/cn";

// Tinted capsule: tone at 12% fill and 55% border, icon in the tone colour so it
// stays visible in both themes. cyan = backups colour, pink = CRM colour. A
// project passes its own colour instead, which gets the same treatment.
const branchTag = cva(
  "t-mono-sm inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 whitespace-nowrap text-fg",
  {
    variants: {
      tone: {
        blue: "border-blue/55 bg-blue/12 [&>svg]:text-blue",
        green: "border-green/55 bg-green/12 [&>svg]:text-green",
        violet: "border-violet/55 bg-violet/12 [&>svg]:text-violet",
        cyan: "border-p-backup/55 bg-p-backup/12 [&>svg]:text-p-backup",
        pink: "border-p-crm/55 bg-p-crm/12 [&>svg]:text-p-crm",
      } satisfies Record<Tone, string>,
    },
    defaultVariants: { tone: "blue" },
  },
);

type BranchTagProps = {
  tone?: Tone;
  /** Any CSS colour; takes the place of `tone`. */
  color?: string;
  label: string;
  className?: string;
};

export function BranchTag({ tone, color, label, className }: BranchTagProps) {
  if (color) {
    return (
      <span
        className={cn(
          branchTag({ tone: null }),
          "border-[color-mix(in_srgb,var(--tag)_55%,transparent)] bg-[color-mix(in_srgb,var(--tag)_12%,transparent)] [&>svg]:text-(--tag)",
          className,
        )}
        style={{ "--tag": color } as CSSProperties}
      >
        <GitBranchIcon size={12} />
        {label}
      </span>
    );
  }
  return (
    <span className={cn(branchTag({ tone }), className)}>
      <GitBranchIcon size={12} />
      {label}
    </span>
  );
}
