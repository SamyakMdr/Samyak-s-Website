"use client";

import { useState, type BaseSyntheticEvent, type FormEvent } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { sendContactMessage } from "@/app/actions/contact";
import { BranchTag } from "@/components/ui/BranchTag";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { contactForm } from "@/content/contact";
import { cn } from "@/lib/cn";
import type { ContactFailure, ContactValues } from "@/lib/contact";
import { prefersReducedMotion } from "@/lib/scroll";
import { useTurnstile } from "@/lib/useTurnstile";

type CheckKey = keyof typeof contactForm.checks;
type CheckState = "running" | "passed" | "failed";
type Status = "idle" | "checking" | "sent" | "error";

const CHECK_ORDER: CheckKey[] = ["validate", "spam", "send"];
// How long each quick check stays "running" before it turns green.
const STEP = 420;

const pause = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const GLYPHS: Record<CheckState, { glyph: string; className: string }> = {
  running: { glyph: "→", className: "text-dim" },
  passed: { glyph: "✓", className: "text-green-t" },
  failed: { glyph: "✗", className: "text-bad" },
};

// The validation rules (zod) are the largest part of the form and are only
// needed to submit it, so they are fetched once someone starts writing.
let rules: Promise<Resolver<ContactValues>> | null = null;
function loadRules(): Promise<Resolver<ContactValues>> {
  rules ??= Promise.all([import("@hookform/resolvers/zod"), import("@/lib/contact")]).then(
    ([{ zodResolver }, { contactSchema }]) => zodResolver(contactSchema),
  );
  // A failed download is tried again on the next focus or submit.
  rules.catch(() => {
    rules = null;
  });
  return rules;
}
const resolver: Resolver<ContactValues> = async (values, context, options) =>
  (await loadRules())(values, context, options);

// The description starts one line tall and grows with the message. Done by
// hand because `field-sizing: content` would also size to the placeholder.
function growToContent(event: FormEvent<HTMLTextAreaElement>) {
  const field = event.currentTarget;
  field.style.height = "auto";
  field.style.height = `${field.scrollHeight + 2}px`;
}

// The contact form, written as a pull request: Submit PR runs a short list of
// checks (validate, spam, send) and then reports the result. The spam check is
// a Cloudflare Turnstile challenge, verified again by the Server Action.
export function ContactForm({ className }: { className?: string }) {
  const { fields } = contactForm;
  const [status, setStatus] = useState<Status>("idle");
  const [checks, setChecks] = useState<Partial<Record<CheckKey, CheckState>>>({});
  const [failure, setFailure] = useState<ContactFailure>("failed");
  const {
    enabled: turnstileEnabled,
    container: turnstileContainer,
    interactive: turnstileInteractive,
    prepare: prepareTurnstile,
    getToken: getTurnstileToken,
  } = useTurnstile("contact");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver,
    defaultValues: { name: "", email: "", title: "", description: "", company: "" },
  });

  const onValid = async (values: ContactValues, event?: BaseSyntheticEvent) => {
    const form = event?.target instanceof HTMLFormElement ? event.target : null;
    const step = prefersReducedMotion() ? 0 : STEP;
    setStatus("checking");
    setChecks({ validate: "running" });
    await pause(step);
    setChecks({ validate: "passed", spam: "running" });

    let turnstileToken: string | undefined;
    try {
      [turnstileToken] = await Promise.all([getTurnstileToken(), pause(step)]);
    } catch {
      setChecks({ validate: "passed", spam: "failed" });
      setFailure("bot");
      setStatus("error");
      return;
    }
    setChecks({ validate: "passed", spam: "passed", send: "running" });

    const result = await sendContactMessage({ ...values, turnstileToken }).catch(() => ({
      ok: false as const,
      reason: "failed" as const,
    }));
    if (result.ok) {
      setChecks({ validate: "passed", spam: "passed", send: "passed" });
      setStatus("sent");
      reset();
      // Back to the single-line box.
      form?.querySelector("textarea")?.style.removeProperty("height");
    } else if (result.reason === "bot") {
      setChecks({ validate: "passed", spam: "failed" });
      setFailure("bot");
      setStatus("error");
    } else {
      setChecks({ validate: "passed", spam: "passed", send: "failed" });
      setFailure(result.reason);
      setStatus("error");
    }
  };

  const busy = status === "checking";
  const failureText =
    failure === "bot" || failure === "rate-limited" ? contactForm.failures[failure] : contactForm.failure;

  return (
    <form
      onSubmit={(event) =>
        // Only rejects when the rules could not be fetched (offline).
        void handleSubmit(onValid)(event).catch(() => {
          setChecks({});
          setFailure("failed");
          setStatus("error");
        })
      }
      // Fetch the rules and Turnstile once someone starts writing, not on page load.
      onFocusCapture={() => {
        void loadRules().catch(() => {});
        void prepareTurnstile().catch(() => {});
      }}
      noValidate
      aria-label={contactForm.label}
      className={cn("overflow-hidden rounded-lg border border-line bg-panel", className)}
    >
      <div className="flex flex-wrap items-center gap-2.5 px-4.5 pt-4.5 tablet:bg-panel-2 tablet:px-5 tablet:py-3.5">
        <BranchTag tone={contactForm.from.tone} label={contactForm.from.branch} />
        <span className="t-body-sm text-dim max-tablet:hidden">{contactForm.mergeText}</span>
        <span className="t-body-sm text-dim tablet:hidden">{contactForm.mergeTextMobile}</span>
        <BranchTag tone={contactForm.into.tone} label={contactForm.into.branch} />
      </div>

      <div className="flex flex-col gap-3.5 px-4.5 pt-3.5 pb-4.5 tablet:gap-4 tablet:p-6">
        <div className="grid gap-3.5 tablet:grid-cols-2 tablet:gap-4">
          <Field
            label={fields.name.label}
            placeholder={fields.name.placeholder}
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Field
            label={fields.email.label}
            placeholder={fields.email.placeholder}
            type="email"
            inputMode="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Field
          label={fields.title.label}
          placeholder={fields.title.placeholder}
          error={errors.title?.message}
          {...register("title")}
        />
        <Field
          multiline
          label={fields.description.label}
          placeholder={fields.description.placeholder}
          placeholderMobile={fields.description.placeholderMobile}
          error={errors.description?.message}
          onInput={growToContent}
          {...register("description")}
        />

        {/* Honeypot: off screen and out of the tab order, so only bots fill it. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-2500 size-px opacity-0"
          {...register("company")}
        />

        {/* Out of the layout until Cloudflare asks the visitor to click. */}
        {turnstileEnabled && (
          <div ref={turnstileContainer} className={cn(!turnstileInteractive && "absolute size-0 overflow-hidden")} />
        )}

        <div className="flex items-center gap-3.5">
          <Button type="submit" variant="primary" fullWidth="mobile" disabled={busy}>
            {contactForm.submit}
          </Button>
          <p className="t-body-sm text-dim max-tablet:hidden">{contactForm.note}</p>
        </div>

        <div role="status" aria-label={contactForm.checksLabel} className="flex flex-col gap-1 empty:hidden">
          {status !== "idle" &&
            CHECK_ORDER.map((key) => {
              const state = checks[key];
              if (!state) return null;
              return (
                <p key={key} className="t-mono-sm flex items-center gap-2">
                  <span className={GLYPHS[state].className}>{GLYPHS[state].glyph}</span>
                  <span className={state === "running" ? "text-dim" : "text-fg"}>{contactForm.checks[key]}</span>
                </p>
              );
            })}
          {status === "sent" && <p className="t-body-sm pt-1 text-fg">{contactForm.success}</p>}
          {status === "error" && <p className="t-body-sm pt-1 text-bad">{failureText}</p>}
        </div>
      </div>
    </form>
  );
}
