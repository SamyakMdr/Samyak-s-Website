export interface Activity {
  role: string;
  org: string;
  dates: string;
  /** Monogram shown until the organisation's logo is added. */
  logo: string;
}

export const activitiesBox = {
  title: "Activities and Roles",
  text: "What I do outside work and class.",
};

// Organisation names, roles, dates and logos are placeholders. TODO: real data
export const activities: Activity[] = [
  {
    role: "Creative Hub Director",
    org: "Organisation or club name",
    dates: "2024 – Present",
    logo: "CH",
  },
  { role: "Hackathon team lead", org: "Event name", dates: "2024", logo: "HX" },
  {
    role: "Volunteer web developer",
    org: "Community or NGO name",
    dates: "2023 – 2024",
    logo: "VW",
  },
];
