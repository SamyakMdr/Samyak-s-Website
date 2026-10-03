"use server";

import { Resend } from "resend";
import { contactSchema, type ContactResult } from "@/lib/contact";

// Sends the "pull request" from the contact form by email (Resend).
// Env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (a sender on a
// domain verified with Resend).
export async function sendContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { name, email, title, description, company } = parsed.data;
  // A filled honeypot is a bot: report success so it does not retry, send nothing.
  if (company) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      // Never pretend a message was delivered when it cannot be.
      console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set");
      return { ok: false, reason: "failed" };
    }
    // Development fallback: log instead of sending.
    console.info("[contact] email is not configured, message logged instead of sent:", {
      name,
      email,
      title,
      description,
    });
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${title}`,
      text: `${description}\n\n${name}\n${email}`,
    });
    if (error) {
      console.error("[contact] Resend rejected the message:", error.message);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] sending failed:", error);
    return { ok: false, reason: "failed" };
  }
}
