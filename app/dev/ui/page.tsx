import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommandProvider } from "@/lib/commands";
import { Components } from "./_sections/Components";
import { Foundations } from "./_sections/Foundations";

export const metadata: Metadata = {
  title: "UI kit",
  robots: { index: false, follow: false },
};

// Visual QA board for tokens and components. Not part of the public site.
export default function DevUiPage() {
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SHOW_DEV_UI) {
    notFound();
  }

  return (
    // The terminal and hint chips need the command registry, as on the site.
    <CommandProvider>
      <main className="page-x flex flex-col gap-16 py-12">
        <h1 className="t-h1">UI kit</h1>
        <Foundations />
        <Components />
      </main>
    </CommandProvider>
  );
}
