import { cva } from "class-variance-authority";
import { GitBranchIcon } from "@/components/icons";
import type { Tone } from "@/content/types";
import { cn } from "@/lib/cn";

// Tinted capsule: tone at 12% fill and 55% border, icon in the tone colour so it
// stays visible in both themes. cyan = backups colour, pink = Travelease colour.
const branchTag = cva(
  "t-mono-sm inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 whitespace-nowrap text-fg",
  {
    variants: {
      tone: {
        blue: "border-blue/55 bg-blue/12 [&>svg]:text-blue",
        green: "border-green/55 bg-green/12 [&>svg]:text-green",
        violet: "border-violet/55 bg-violet/12 [&>svg]:text-violet",
        cyan: "border-p-backup/55 bg-p-backup/12 [&>svg]:text-p-backup",
        pink: "border-p-travel/55 bg-p-travel/12 [&>svg]:text-p-travel",
      } satisfies Record<Tone, string>,
    },
    defaultVariants: { tone: "blue" },
  },
);

export function BranchTag({ tone, label, className }: { tone: Tone; label: string; className?: string }) {
  return (
    <span className={cn(branchTag({ tone }), className)}>
      <GitBranchIcon size={12} />
      {label}
    </span>
  );
}
