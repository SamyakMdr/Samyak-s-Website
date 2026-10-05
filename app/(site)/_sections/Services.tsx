import { ServiceApiIcon, ServiceServerIcon, ServiceWebIcon } from "@/components/icons";
import { SectionHead } from "@/components/layout/SectionHead";
import { services, servicesSection, type Service } from "@/content/services";
import { cn } from "@/lib/cn";

const ICONS = { web: ServiceWebIcon, api: ServiceApiIcon, server: ServiceServerIcon } as const;

// Icon tile: accent at 16% with the icon in the accent colour.
const ACCENTS: Record<Service["accent"], string> = {
  blue: "bg-blue/16 text-blue",
  green: "bg-green/16 text-green",
  violet: "bg-violet/16 text-violet",
};

export function Services() {
  return (
    <section
      id={servicesSection.id}
      aria-labelledby="services-title"
      className="page-x section-top flex flex-col gap-5 tablet:gap-8"
    >
      <SectionHead
        title={servicesSection.title}
        tone={servicesSection.tone}
        branch={servicesSection.branch}
        intro={servicesSection.intro}
        introMobile={false}
        titleId="services-title"
        reveal
      />
      <ul className="grid gap-5 tablet:grid-cols-3">
        {services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <li
              key={service.title}
              data-reveal=""
              className="flex flex-col gap-3 rounded-card border border-line bg-panel p-4.5 tablet:rounded-lg tablet:p-6"
            >
              {/* The mobile cards have no icon tile. */}
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-md max-tablet:hidden",
                  ACCENTS[service.accent],
                )}
              >
                <Icon size={22} />
              </span>
              <h3 className="t-h3 text-fg">{service.title}</h3>
              <p className="t-body-sm text-dim max-tablet:hidden">{service.text}</p>
              <p className="t-body-sm text-dim tablet:hidden">{service.textMobile}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
