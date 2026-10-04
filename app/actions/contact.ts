"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { contactRequestSchema, type ContactResult } from "@/lib/contact";
import { mailConfig, sendAutoReply, sendNotification } from "@/lib/server/mail";
import { allowContactMessage } from "@/lib/server/rateLimit";
import { turnstileConfigured, verifyTurnstile } from "@/lib/server/turnstile";

// Address of the visitor. Vercel sets both headers itself, so a client cannot
// forge them there; x-forwarded-for lists the client first.
async function clientIp() {
  const list = await headers();
  return list.get("x-real-ip")?.trim() || list.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

// Next.js lets a request with no Origin header through. A browser always sends
// one with a Server Action, so in production a missing or foreign one is not a
// visitor to this site.
async function sameOrigin() {
  const list = await headers();
  const origin = list.get("origin");
  const host = list.get("x-forwarded-host") ?? list.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host.split(",")[0]?.trim();
  } catch {
    return false;
  }
}

// Handles the "pull request" from the contact form: checks it is from a
// person (honeypot, Turnstile, rate limits), emails it to the site owner and
// sends the visitor an automatic reply.
// Env: GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL, TURNSTILE_SECRET_KEY,
// UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (see .env.example).
export async function sendContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactRequestSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { company, turnstileToken, ...message } = parsed.data;
  // A filled honeypot is a bot: report success so it does not retry, send nothing.
  if (company) return { ok: true };

  const production = process.env.NODE_ENV === "production";
  if (production && !(await sameOrigin())) return { ok: false, reason: "invalid" };
  const ip = await clientIp();

  if (turnstileConfigured()) {
    const verdict = await verifyTurnstile(turnstileToken, ip, "contact");
    if (verdict === "bot") return { ok: false, reason: "bot" };
    if (verdict === "unavailable") return { ok: false, reason: "failed" };
  } else if (production) {
    // Never accept unchecked submissions in production.
    console.error("[contact] TURNSTILE_SECRET_KEY is not set");
    return { ok: false, reason: "failed" };
  }

  if (!(await allowContactMessage(ip, message.email))) return { ok: false, reason: "rate-limited" };

  const config = mailConfig();
  if (!config) {
    if (production) {
      // Never pretend a message was delivered when it cannot be.
      console.error("[contact] GMAIL_USER or GMAIL_APP_PASSWORD is not set");
      return { ok: false, reason: "failed" };
    }
    // Development fallback: log instead of sending.
    console.info("[contact] email is not configured, message logged instead of sent:", message);
    return { ok: true };
  }

  try {
    await sendNotification(config, message, ip);
  } catch (error) {
    console.error("[contact] sending failed:", error);
    return { ok: false, reason: "failed" };
  }

  // The message is delivered, which is what the visitor is told. The reply to
  // them goes out after the response, so a slow or bounced reply cannot turn a
  // delivered message into an error.
  after(async () => {
    try {
      await sendAutoReply(config, message);
    } catch (error) {
      console.error("[contact] automatic reply failed:", error);
    }
  });

  return { ok: true };
}
