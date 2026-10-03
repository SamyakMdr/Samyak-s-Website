"use client";

import dynamic from "next/dynamic";

// The form's validation code (react-hook-form, zod) is the largest thing on the
// page and sits at the very bottom, so it loads as its own chunk instead of
// holding up everything above it. The form is still rendered on the server.
export const ContactFormLazy = dynamic(() => import("./ContactForm").then((module) => module.ContactForm));
