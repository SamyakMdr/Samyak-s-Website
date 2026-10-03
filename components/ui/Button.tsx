import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { DownloadIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

// Figma component set "Button": 3 styles × 5 states. Hover, pressed, focus and
// disabled are CSS states; the focus ring comes from the global :focus-visible.
const button = cva(
  [
    "t-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-btn whitespace-nowrap select-none",
    "transition-[background-color,color,box-shadow,opacity] duration-(--dur-ui) ease-ui",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-blue text-on-accent hover:bg-blue-hover active:bg-blue-pressed active:shadow-pressed",
          "disabled:bg-line disabled:text-dim aria-disabled:bg-line aria-disabled:text-dim",
        ],
        secondary: [
          "border border-line bg-panel text-fg hover:bg-panel-hover active:bg-panel-2",
          "disabled:opacity-55 aria-disabled:opacity-55",
        ],
        ghost: [
          "text-dim hover:bg-panel-2 hover:text-fg active:bg-panel-hover",
          "disabled:opacity-55 aria-disabled:opacity-55",
        ],
      },
      size: {
        md: "px-4.5 py-3",
        sm: "px-3.5 py-2",
      },
      // Mobile buttons are full width with 14 × 18 padding (≥ 44px tall).
      fullWidth: {
        false: "",
        true: "w-full",
        mobile: "max-tablet:w-full max-tablet:py-3.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md", fullWidth: false },
  },
);

type ButtonOwnProps = VariantProps<typeof button> & {
  icon?: "download";
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, fullWidth, icon, children, className, ...rest } = props;
  const classes = cn(button({ variant, size, fullWidth }), className);
  const content = (
    <>
      {icon === "download" && <DownloadIcon size={16} />}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    // Downloads, hashes and external URLs stay plain anchors; routes use next/link.
    const isRoute = href.startsWith("/") && anchorProps.download === undefined;
    if (isRoute) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
