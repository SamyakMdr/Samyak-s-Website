import type { TimelineEntry } from "./experience";
import type { Tone } from "./types";

export const educationSection = {
  id: "education",
  title: "Education and learning",
  branch: "education",
  tone: "violet" satisfies Tone as Tone,
  intro: "Formal study, plus the courses that filled the gaps.",
  introMobile: "Formal study, plus what I do outside class.",
};

// School names, cities, years and summaries are placeholders. TODO: real data
export const education: TimelineEntry[] = [
  {
    title: "Bachelor's degree in Computer Science",
    dates: "2021 – 2025",
    place: "University or college name · City, Country",
    placeMobile: "University or college name",
    summaryMobile:
      "Data structures, databases, networks and software engineering. Final-year project on a web booking system.",
    summary:
      "Core subjects in data structures, databases, networks and software engineering. Final-year project on a web-based booking system.",
    hash: "e41b7a0",
    commit: "learn: final-year project shipped",
  },
  {
    title: "Higher secondary education (+2), Science",
    dates: "2019 – 2021",
    place: "School or college name · City, Country",
    placeMobile: "School or college name",
    summaryMobile: "Science stream with mathematics and computer science.",
    summary:
      "Science stream with mathematics and computer science, where I wrote my first programs.",
    hash: "0c93f2d",
    commit: "learn: hello world in C",
  },
];
