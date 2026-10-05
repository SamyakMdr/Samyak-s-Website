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
    title:
      "Bachelor's of Science in Computer Science and Information Technology (BSc.CSIT)",
    dates: "2023 – Present",
    place: "Tribhuvan University | Prime College · Kathmandu, Nepal",
    placeMobile: "Tribhuvan University | Prime College",
    summaryMobile:
      "Data structures, databases, networks and software engineering. Final-year project on a web booking system.",
    summary:
      "Core subjects in data structures, databases, networks and software engineering. Final-year project on Mobile App 'Bikri' a Nepali Voice Enabled Web Inventory Management System.",
    hash: "e41b7a0",
    commit: "learn: final-year project shipped",
  },
  {
    title: "NATIONAL EXAMINATIONS BOARD, (+2 Science)",
    dates: "October 2022",
    place: "Trinity International College · Dillibazaar, Kathmandu",
    placeMobile: "Trinity International College",
    summaryMobile: "Science stream with mathematics and computer science.",
    summary:
      "Science stream with mathematics and computer science, where I wrote my first programs.",
    hash: "0c93f2d",
    commit: "learn: hello world in C",
  },
  {
    title: "Secondary Education Examination (SEE), GRADE-10",
    dates: "August 2020",
    place: "Shankari School · Chhauni, Kathmandu",
    placeMobile: "Shankari School",
    summaryMobile: "Science stream with mathematics and computer science.",
    summary:
      "I wrote my first HTML and CSS code in this period, and learned the basics of programming.",
    hash: "5d18ae6",
    commit: "learn: hello world in HTML, CSS and JS",
  },
];
