import * as z from "zod/mini";
import { contactForm } from "@/content/contact";

const { errors } = contactForm;

const text = (message: string, max: number) =>
  z.string().check(z.trim(), z.minLength(1, message), z.maxLength(max, message));

// Shared by the form (client) and the Server Action, so both apply the same
// rules. zod/mini keeps the validation code in the browser small.
export const contactSchema = z.object({
  name: text(errors.name, 120),
  // 254 is the longest address a mail server accepts.
  email: z.pipe(z.string().check(z.trim(), z.maxLength(254, errors.email)), z.email(errors.email)),
  title: text(errors.title, 160),
  description: text(errors.description, 5000),
  // Honeypot: hidden from people, so anything in it comes from a bot.
  company: z.optional(z.string().check(z.maxLength(200))),
});

export type ContactValues = z.infer<typeof contactSchema>;

// What the Server Action receives: the fields plus the Turnstile token the
// browser earned for this submission.
export const contactRequestSchema = z.extend(contactSchema, {
  turnstileToken: z.optional(z.string().check(z.maxLength(2048))),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export type ContactFailure = "invalid" | "bot" | "rate-limited" | "failed";

export type ContactResult = { ok: true } | { ok: false; reason: ContactFailure };
