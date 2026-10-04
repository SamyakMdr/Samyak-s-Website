export interface Activity {
  role: string;
  org: string;
  dates: string;
  /** Organisation logo, a file in public/. */
  logo: string;
  /** The organisation's website. The name and logo link to it when set. */
  href?: string;
}

export const activitiesBox = {
  title: "Activities and Roles",
  text: "What I do outside work and class.",
};

// Organisation names, roles and dates are placeholders. TODO: real data
export const activities: Activity[] = [
  {
    role: "Prime Creative Hub Director",
    org: "Prime Creative Hub",
    dates: "– Present",
    logo: "/logos/Creatiive-hub.jpg",
    href: "https://creativehub.primeitclub.com/",
  },
  {
    role: "Prime IT Club",
    org: "Prime IT Club",
    dates: "2023 - Present",
    logo: "/logos/prime-it-club-logo.png",
    href: "https://primeitclub.com/",
  },
  {
    role: "General Member of Simrik Club",
    org: "Simrik Yuva Pariwar",
    dates: "2023 – 2026",
    logo: "/logos/simric-logo.jpg",
    href: "https://www.facebook.com/simrik.club/",
  },
];
