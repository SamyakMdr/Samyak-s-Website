import nodemailer, { type Transporter } from "nodemailer";
import { contactCard, contactEmails } from "@/content/contact";
import type { ContactValues } from "@/lib/contact";

type Message = Pick<ContactValues, "name" | "email" | "title" | "description">;

interface MailConfig {
  user: string;
  password: string;
  to: string;
}

/** Gmail account the site sends from, or null when it is not set up. */
export function mailConfig(): MailConfig | null {
  const user = process.env.GMAIL_USER;
  // Google shows app passwords in groups of four; the spaces are not part of it.
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !password) return null;
  return { user, password, to: process.env.CONTACT_TO_EMAIL || user };
}

let transporter: Transporter | undefined;

function getTransporter({ user, password }: MailConfig) {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: password },
    // A serverless function is cut off at its time limit, so fail first.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

// Header values are one line. nodemailer rejects injected headers as well;
// this also keeps a pasted line break out of the subject.
const oneLine = (value: string) => value.replace(/[\r\n\t]+/g, " ").trim();

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const paragraphs = (value: string) =>
  value
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 16px">${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");

const wrap = (body: string) =>
  `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1f2328;max-width:560px">${body}</div>`;

// A name is safe to greet with unless it carries a link: the reply goes to
// whatever address was typed, so it must not deliver someone's advert.
const greetingName = (name: string) => (/https?:|www\.|\.[a-z]{2,}\//i.test(name) ? "" : oneLine(name));

/** The message itself, delivered to the site owner. Replying answers the sender. */
export async function sendNotification(config: MailConfig, message: Message, ip: string | null) {
  const name = oneLine(message.name);
  const title = oneLine(message.title);
  const meta = [`From: ${name} <${message.email}>`, ip && `IP: ${ip}`].filter(Boolean).join("\n");

  await getTransporter(config).sendMail({
    from: { name: contactEmails.notification.sender, address: config.user },
    to: config.to,
    replyTo: { name, address: message.email },
    subject: `${contactEmails.notification.subjectPrefix} ${title}`,
    text: `${message.description}\n\n--\n${meta}`,
    html: wrap(
      `${paragraphs(message.description)}<hr style="border:0;border-top:1px solid #d0d7de;margin:24px 0 12px"><p style="margin:0;font-size:13px;color:#59636e">${escapeHtml(meta).replace(/\n/g, "<br>")}</p>`,
    ),
  });
}

/** The automatic "I got your message" reply to the person who wrote. */
export async function sendAutoReply(config: MailConfig, message: Message) {
  const { autoReply } = contactEmails;
  const name = greetingName(message.name);
  const lines = [autoReply.greeting(name), ...autoReply.body, autoReply.signOff];
  const text = lines.join("\n\n");

  await getTransporter(config).sendMail({
    from: { name: contactCard.name, address: config.user },
    to: message.email,
    subject: autoReply.subject,
    text,
    html: wrap(paragraphs(text)),
    headers: {
      // Marks the mail as automatic, so out-of-office responders and other
      // auto-repliers do not answer it and start a loop.
      "Auto-Submitted": "auto-replied",
      "X-Auto-Response-Suppress": "All",
    },
  });
}
