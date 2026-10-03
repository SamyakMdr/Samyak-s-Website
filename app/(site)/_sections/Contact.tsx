import Image from "next/image";
import { ContactRow } from "@/components/content/ContactRow";
import { Glow } from "@/components/layout/Glow";
import { SectionHead } from "@/components/layout/SectionHead";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { TechLogo } from "@/components/ui/TechLogo";
import { contactCard, contactSection, socials } from "@/content/contact";
import { cn } from "@/lib/cn";
import { ContactFormLazy } from "./ContactFormLazy";

function ContactCard() {
  return (
    <aside className="flex flex-col gap-3.5 rounded-lg border border-line bg-panel p-4.5 tablet:gap-4.5 tablet:p-6 desktop:w-95 desktop:shrink-0">
      <div className="flex items-center gap-3.5">
        <Image
          src={contactCard.avatar.src}
          alt={contactCard.avatar.alt}
          width={56}
          height={56}
          sizes="56px"
          className="size-12 shrink-0 rounded-full object-cover tablet:size-14"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="t-h3 text-fg">{contactCard.name}</h3>
          <p className="t-body-sm text-dim">{contactCard.title}</p>
        </div>
      </div>

      {contactCard.details.map((detail) => (
        <ContactRow
          key={detail.label}
          detail={detail}
          className={cn(detail.desktopOnly && "max-tablet:hidden")}
        />
      ))}

      {/* The mobile card goes straight from the rows to the social logos. */}
      <span
        aria-hidden="true"
        className="h-px shrink-0 bg-line max-tablet:hidden"
      />
      <h3 className="t-h4 text-fg max-tablet:hidden">
        {contactCard.socialsTitle}
      </h3>
      {/* 24px marks in 40px tap areas; the row is pulled left so the first mark lines up with the text. */}
      <ul aria-label={contactCard.socialsTitle} className="-ml-2 flex gap-1">
        {socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              aria-label={social.name}
              className="flex size-10 items-center justify-center rounded-btn text-fg transition-colors duration-(--dur-ui) ease-ui hover:text-dim"
            >
              <TechLogo name={social.name} size={24} mono />
            </a>
          </li>
        ))}
      </ul>
      <AvailabilityBadge className="self-start max-tablet:hidden">
        {contactCard.badge}
      </AvailabilityBadge>
    </aside>
  );
}

export function Contact() {
  return (
    <section
      id={contactSection.id}
      aria-labelledby="contact-title"
      className="page-x section-top relative isolate flex flex-col gap-5 overflow-x-clip pb-24 tablet:gap-8 tablet:pb-30"
    >
      <Glow />
      <SectionHead
        title={contactSection.title}
        tone={contactSection.tone}
        branch={contactSection.branch}
        intro={contactSection.intro}
        introMobile={contactSection.introMobile}
        titleId="contact-title"
      />
      <div className="flex flex-col gap-5 desktop:flex-row desktop:items-start desktop:gap-6">
        <ContactCard />
        <ContactFormLazy className="min-w-0 desktop:flex-1" />
      </div>
    </section>
  );
}
