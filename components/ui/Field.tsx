import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type FieldBase = {
  label: string;
  error?: string;
  /** Shorter placeholder shown below the mobile breakpoint, when Figma has one. */
  placeholderMobile?: string;
  className?: string;
};

type InputFieldProps = FieldBase & Omit<ComponentProps<"input">, "className"> & { multiline?: false };

type TextareaFieldProps = FieldBase & Omit<ComponentProps<"textarea">, "className"> & { multiline: true };

export type FieldProps = InputFieldProps | TextareaFieldProps;

// Default 1px line · focus 2px blue · error 2px bad. The 2px states are drawn as
// an inset ring on top of the border so the box never changes size.
const box = cn(
  "peer t-body w-full rounded-md border border-line bg-bg px-3 py-2.5 text-fg placeholder:text-dim",
  "transition-[border-color,box-shadow] duration-(--dur-fast) ease-ui",
  "focus:border-blue focus:shadow-[inset_0_0_0_1px_var(--blue)] focus:outline-none",
  "aria-invalid:border-bad aria-invalid:shadow-[inset_0_0_0_1px_var(--bad)]",
);

export function Field(props: FieldProps) {
  const { label, error, placeholderMobile, className, id, name, multiline, ...rest } = props;
  const fieldId = id ?? `field-${name}`;
  const errorId = `${fieldId}-error`;
  const shared = {
    id: fieldId,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    // Figma's field is 80px tall: label, 6px, 48px box and 8px of slack below it.
    <div className={cn("flex min-w-0 flex-col gap-1.5 pb-2", className)}>
      <label htmlFor={fieldId} className="t-mono-label text-fg">
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            rows={1}
            {...(rest as ComponentProps<"textarea">)}
            {...shared}
            className={cn(box, "field-grow block resize-none", placeholderMobile && "max-tablet:placeholder:text-transparent")}
          />
        ) : (
          <input
            {...(rest as ComponentProps<"input">)}
            {...shared}
            className={cn(box, placeholderMobile && "max-tablet:placeholder:text-transparent")}
          />
        )}
        {/* A placeholder cannot change with the viewport, so the mobile copy is
            drawn over the empty field instead. */}
        {placeholderMobile && (
          <span
            aria-hidden="true"
            className="t-body pointer-events-none absolute top-2.75 left-3.25 hidden truncate text-dim max-tablet:peer-placeholder-shown:block"
          >
            {placeholderMobile}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="t-caption text-bad">
          {error}
        </p>
      )}
    </div>
  );
}
