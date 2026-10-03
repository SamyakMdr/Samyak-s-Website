import Image from "next/image";
import { ContactRow } from "@/components/content/ContactRow";
import { Glow } from "@/components/layout/Glow";
import { SectionHead } from "@/components/layout/SectionHead";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { TechLogo } from "@/components/ui/TechLogo";
import { contactCard, contactSection, socials } from "@/content/contact";
import { cn } from "@/lib/cn";
import { ContactForm } from "./ContactForm";

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
        <ContactRow key={detail.label} detail={detail} className={cn(detail.desktopOnly && "max-tablet:hidden")} />
      ))}

      {/* The mobile card goes straight from the rows to the social logos. */}
      <span aria-hidden="true" className="h-px shrink-0 bg-line max-tablet:hidden" />
      <h3 className="t-h4 text-fg max-tablet:hidden">{contactCard.socialsTitle}</h3>
      <ul aria-label={contactCard.socialsTitle} className="flex gap-2.5">
        {socials.map((social) => (
          <li key={social.name}>
            <a href={social.href} aria-label={social.name} className="block rounded-btn">
              <TechLogo name={social.name} size={40} />
            </a>
          </li>
        ))}
      </ul>
      <AvailabilityBadge className="self-start max-tablet:hidden">{contactCard.badge}</AvailabilityBadge>
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
        <ContactForm className="min-w-0 desktop:flex-1" />
      </div>
    </section>
  );
}
