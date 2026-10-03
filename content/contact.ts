import type { TechName } from "./tech";
import type { Tone } from "./types";

export const contactSection = {
  id: "contact",
  title: "Let's work together",
  branch: "contact",
  tone: "green" satisfies Tone as Tone,
  intro:
    "Send a message the way you'd open a pull request, or reach me directly. I usually reply within a day.",
  introMobile: "Send a message like a pull request, or reach me directly.",
};

export interface ContactDetail {
  icon: "mail" | "phone" | "location" | "website";
  label: string;
  value: string;
  href?: string;
  /** The mobile card shows three rows (no website). */
  desktopOnly?: boolean;
}

// Email, phone, location, website and social URLs are placeholders. TODO: real data
export const contactCard = {
  name: "Samyak",
  title: "Junior Full-Stack Developer",
  avatar: { src: "/images/people/portrait.jpg", alt: "Portrait of Samyak" },
  details: [
    { icon: "mail", label: "Email", value: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com" },
    { icon: "phone", label: "Phone", value: "+977 98XX XXX XXX" },
    { icon: "location", label: "Based in", value: "Kathmandu, Nepal" },
    { icon: "website", label: "Website", value: "yourdomain.com", href: "https://yourdomain.com", desktopOnly: true },
  ] satisfies ContactDetail[] as ContactDetail[],
  socialsTitle: "Find me online",
  badge: "Available for new projects",
};

export interface SocialLink {
  name: TechName;
  href: string;
  /** A public profile, listed as `sameAs` in the Person structured data. */
  profile?: boolean;
}

export const socials: SocialLink[] = [
  { name: "GitHub", href: "#", profile: true }, // TODO: real data
  { name: "LinkedIn", href: "#", profile: true }, // TODO: real data
  { name: "X", href: "#", profile: true }, // TODO: real data
  { name: "Instagram", href: "#", profile: true }, // TODO: real data
  { name: "WhatsApp", href: "#" }, // TODO: real data
];

export const contactForm = {
  label: "Send a message",
  from: { branch: "contact/your-message", tone: "green" satisfies Tone as Tone },
  mergeText: "wants to merge into",
  mergeTextMobile: "into",
  into: { branch: "main", tone: "blue" satisfies Tone as Tone },
  fields: {
    name: { label: "Your name", placeholder: "Full name" },
    email: { label: "Assignee (your email)", placeholder: "you@example.com" },
    title: { label: "Title", placeholder: "What's this about?" },
    description: {
      label: "Description",
      placeholder: "Tell me about the project, the role or your question.",
      placeholderMobile: "Tell me about the project or role.",
    },
  },
  submit: "Submit PR",
  note: "Runs a few quick checks, then sends.",
  // The title message is from Figma (Input Field / Error). The other three are
  // written to match it. TODO: confirm copy
  errors: {
    name: "Add your name so I know who is writing.",
    email: "Add a valid email so I can reply.",
    title: "Add a title so I know what this is about.",
    description: "Add a few lines about the project, the role or your question.",
  },
  // "Checks" sequence shown after Submit PR (doc/interactions.md §12).
  checksLabel: "Checks",
  checks: { validate: "validating fields", spam: "scanning for spam", send: "sending" },
  // Result lines are not drawn in Figma. TODO: confirm copy
  success: "Message sent. I usually reply within a day.",
  failure: "Could not send the message. Try again, or email me directly.",
};
