"use client";

import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/ui/LoadingSkeletons";

// The form sits at the very bottom, so it loads as its own chunk instead of
// holding up everything above it. It is still rendered on the server; its
// validation rules (zod) are fetched later, when someone starts writing.
export const ContactFormLazy = dynamic(
  () => import("./ContactForm").then((module) => module.ContactForm),
  {
    loading: () => <ContactFormSkeleton className="min-w-0 desktop:flex-1" />,
  },
);
