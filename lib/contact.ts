import { z } from "zod";
import { contactForm } from "@/content/contact";

const { errors } = contactForm;

// Shared by the form (client) and the Server Action, so both apply the same rules.
export const contactSchema = z.object({
  name: z.string().trim().min(1, errors.name).max(120, errors.name),
  email: z.string().trim().pipe(z.email(errors.email)),
  title: z.string().trim().min(1, errors.title).max(160, errors.title),
  description: z.string().trim().min(1, errors.description).max(5000, errors.description),
  // Honeypot: hidden from people, so anything in it comes from a bot.
  company: z.string().max(200).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };
