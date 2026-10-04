import type { Project, ProjectType } from "./types";

// Order = order on /projects (newest first). Copy is from doc/content.md.
// Covers live in public/images/projects, room screenshots in public/images/rooms/<slug>.
export const projects: Project[] = [
  {
    slug: "mountain-helicopter-website",
    alias: "mhn-site",
    title: "Mountain Helicopter Nepal Website",
    summary:
      "A public helicopter tour and rescue website with destination pages, tour details, team profiles, blogs, inquiry flows and performance-focused media.",
    summaryMobile:
      "A public helicopter tour and rescue website with tour pages, blogs, team profiles and inquiry flows.",
    category: "Website + CMS + Backend",
    type: "web",
    year: 2026,
    branch: "main",
    color: "var(--p-heli)",
    stack: ["Next.js", "React", "NestJS", "PostgreSQL"],
    cover: "/images/projects/cover-mountain-helicopter-website.webp",
    coverAlt:
      "Mountain Helicopter Nepal public website homepage and tour experience",
    command: "/open mhn-site",
    featured: true,
    graphLabel: "MHN website",
    links: {
      demo: "https://mountainhelicoptersnepal.com",
    },
    room: {
      lead: "A production website for Mountain Helicopter Nepal, built to present helicopter tours, rescue services, fleet information, safety content, blogs and customer inquiries from one managed platform.",
      facts: [
        { label: "Role", value: "Full-stack Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "2 people" },
        {
          label: "Status",
          value: "Live and actively maintained",
          valueMobile: "Live",
        },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "TypeORM",
        "Docker",
      ],
      story: [
        {
          title: "The problem",
          body: "The company needed a faster, more polished public website where visitors could explore helicopter tours, rescue services, safety information, fleet details and destination content without depending on manual page updates.",
          bodyMobile:
            "The company needed a faster public website for tours, rescue services, safety content and inquiries.",
        },
        {
          title: "What I built",
          body: "I built the public Next.js website, a private CMS for content management, and a NestJS backend that powers pages, blogs, teams, packages, inquiries, media uploads, SEO fields and reusable page sections.",
          bodyMobile:
            "I built the public website, private CMS and backend for pages, blogs, teams, inquiries and SEO content.",
        },
        {
          title: "What I learned",
          body: "Tourism websites need both strong visuals and easy content operations. Optimizing media, reusable sections, SEO metadata and inquiry flows mattered as much as the page design itself.",
          bodyMobile:
            "I learned how much media performance, SEO and content workflows matter for tourism websites.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/mountain-helicopter-website/shot-1.webp",
          alt: "Mountain Helicopter Nepal fleet page with aircraft specifications",
          caption: "Fleet page with aircraft details",
          captionMobile: "Fleet page",
        },
        {
          src: "/images/rooms/mountain-helicopter-website/shot-2.webp",
          alt: "Mountain Helicopter Nepal content management dashboard",
          caption: "Content management dashboard",
          captionMobile: "CMS dashboard",
        },
        {
          src: "/images/projects/cover-mountain-helicopter-website.webp",
          alt: "Mountain Helicopter Nepal homepage and service content",
          caption: "Homepage and service content",
          mobileOnly: true,
        },
      ],
      flow: {
        description:
          "Visitors browse the public website, content is managed privately through the CMS, and the backend serves structured page, tour, blog, media and inquiry data.",
        nodes: [
          {
            title: "Website + CMS",
            text: "Public pages, private content editing",
          },
          {
            title: "NestJS API",
            text: "Validation, uploads, entities and storage",
          },
          { title: "PostgreSQL", text: "Pages, packages, blogs and inquiries" },
        ],
        labels: {
          request: ["HTTPS", "API"],
          response: ["JSON", "content"],
        },
      },
      outcome: {
        stats: [
          {
            value: "20+",
            label: "public page types",
            labelMobile: "page types",
          },
          {
            value: "CMS",
            label: "editable content workflow",
            labelMobile: "content workflow",
          },
          {
            value: "SEO",
            label: "metadata managed per page",
            labelMobile: "SEO fields",
          },
          {
            value: "Docker",
            label: "production deployment setup",
            labelMobile: "deployment",
          },
        ],
        note: "Public website URL shown only. CMS and backend URLs are intentionally private.",
        noteMobile: "Only the public website URL is shown.",
      },
    },
  },
  {
    slug: "mountain-helicopter-system",
    alias: "mhn-admin",
    title: "Mountain Helicopter Operations System",
    summary:
      "An internal admin system for helicopter operations, bookings, inquiries, agents, pilots, payments, sectors, safety reports and operational history.",
    summaryMobile:
      "An internal admin system for bookings, operations, payments, pilots, agents and safety reports.",
    category: "System Admin + Backend",
    type: "web",
    year: 2026,
    branch: "main",
    color: "var(--p-mhn)",
    stack: ["React", "NestJS", "PostgreSQL"],
    cover: "/images/projects/cover-mountain-helicopter-system.webp",
    coverAlt: "Internal helicopter operations dashboard",
    command: "/open mhn-admin",
    featured: true,
    graphLabel: "MHN admin",
    links: {
      demo: "#",
    },
    room: {
      lead: "A private operations system for Mountain Helicopter Nepal. Staff can manage bookings, inquiries, sectors, pilots, agents, payments, operation records and safety workflows from a secured admin interface.",
      facts: [
        { label: "Role", value: "Full-stack Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "2 people" },
        {
          label: "Status",
          value: "Private internal system",
          valueMobile: "Private",
        },
      ],
      stack: [
        "React",
        "Vite",
        "TypeScript",
        "TanStack",
        "NestJS",
        "PostgreSQL",
        "TypeORM",
        "Docker",
      ],
      story: [
        {
          title: "The problem",
          body: "Operational data such as bookings, passengers, sectors, payments, pilots and inquiries needed a more structured internal workflow than scattered messages, files and manual tracking.",
          bodyMobile:
            "Operational data needed a structured internal workflow instead of scattered manual tracking.",
        },
        {
          title: "What I built",
          body: "I built the admin-facing system and backend modules for bookings, operations, passengers, sectors, agents, pilots, payments, inquiries, notifications, organization settings and safety reports.",
          bodyMobile:
            "I built admin workflows for bookings, operations, passengers, pilots, payments and safety reports.",
        },
        {
          title: "What I learned",
          body: "Internal tools work best when permissions, validation and audit-friendly data models are designed early. Clear forms and consistent backend rules reduce operational mistakes.",
          bodyMobile:
            "Permissions, validation and clear operational data models were the most important parts.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/mountain-helicopter-system/shot-1.webp",
          alt: "Inquiries list in the internal operations system",
          caption: "Inquiry management",
          captionMobile: "Inquiries",
        },
        {
          src: "/images/rooms/mountain-helicopter-system/shot-2.webp",
          alt: "Payments list with collected and outstanding totals",
          caption: "Payments and settlement tracking",
          captionMobile: "Payments",
        },
        {
          src: "/images/projects/cover-mountain-helicopter-system.webp",
          alt: "Admin system overview",
          caption: "Admin system overview",
          mobileOnly: true,
        },
      ],
      flow: {
        description:
          "Staff actions pass through the private admin interface, are validated by the API, and are stored as structured operational records in PostgreSQL.",
        nodes: [
          { title: "Admin app", text: "Bookings, agents, pilots, payments" },
          { title: "NestJS API", text: "Auth, validation, operation modules" },
          { title: "PostgreSQL", text: "Operational records and history" },
        ],
        labels: {
          request: ["HTTPS + auth", "SQL"],
          response: ["JSON", "records"],
        },
      },
      outcome: {
        stats: [
          { value: "10+", label: "operation modules", labelMobile: "modules" },
          {
            value: "Private",
            label: "secured admin access",
            labelMobile: "secured",
          },
          {
            value: "Docker",
            label: "separate production services",
            labelMobile: "services",
          },
          {
            value: "API",
            label: "shared backend for operations",
            labelMobile: "backend",
          },
        ],
        note: "Admin, CMS and backend URLs are not shown for security reasons.",
        noteMobile: "Private URLs hidden for security.",
      },
    },
  },
  {
    slug: "legend-adventures",
    alias: "legend",
    title: "Legend Adventures",
    summary:
      "A responsive expedition and trekking platform where travelers can explore Himalayan adventures, review detailed itineraries and submit bookings or inquiries.",
    summaryMobile:
      "A trekking and expedition website for discovering trips, viewing itineraries and sending bookings or inquiries.",
    category: "Travel platform",
    type: "web",
    year: 2026,
    branch: "development",
    color: "var(--p-legend)",
    stack: ["Next.js", "NestJS", "MySQL"],
    cover: "/images/projects/cover-legend-adventures.webp",
    coverAlt: "Legend Adventures trekking and expedition website",
    command: "/open legend",
    featured: true,
    graphLabel: "Legend Adventures",

    // Only the public website is exposed.
    links: {
      demo: "https://adventureslegend.com",
    },

    room: {
      lead: "A custom travel platform for a Nepal-based adventure company, helping travelers discover expeditions, trekking packages and peak-climbing experiences through a polished, mobile-friendly website.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Project", value: "Client website" },
        { label: "Status", value: "Live and maintained", valueMobile: "Live" },
      ],

      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "NestJS",
        "MySQL",
      ],

      story: [
        {
          title: "The problem",
          body: "The company needed a distinctive digital presence that could organize a large range of treks and expeditions while giving travelers enough information to confidently plan a high-altitude adventure.",
          bodyMobile:
            "The company needed a clear, distinctive website for presenting treks and high-altitude expeditions.",
        },
        {
          title: "What I built",
          body: "I developed a responsive travel platform with destination and package discovery, detailed itineraries, departure information, blogs, reviews, search, authentication and dedicated booking, inquiry and contact flows.",
          bodyMobile:
            "A responsive platform with trip discovery, detailed itineraries, search and booking and inquiry flows.",
        },
        {
          title: "What I learned",
          body: "Content-heavy travel products work best when technical details are carefully structured. Reusable page sections, validated forms and route-specific metadata made the experience easier to maintain and easier for travelers to navigate.",
          bodyMobile:
            "Reusable sections, structured trip content and route-specific metadata made the platform easier to use and maintain.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/legend-adventures/shot-1.webp",
          alt: "Legend Adventures trekking and expedition website",
          caption: "Trekking and expedition discovery",
          captionMobile: "Adventure discovery",
        },
        {
          src: "/images/rooms/legend-adventures/shot-2.webp",
          alt: "Legend Adventures website displayed on a phone",
          caption: "Responsive mobile experience",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-legend-adventures.webp",
          alt: "Legend Adventures package and destination experience",
          caption: "Adventure package experience",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "The Next.js application presents packages and destinations, sends validated requests through a NestJS API and stores operational data in MySQL.",
        nodes: [
          {
            title: "Next.js Front End",
            text: "Trip discovery, itineraries and customer forms",
          },
          {
            title: "NestJS API",
            text: "Authentication, validation and application services",
          },
          {
            title: "MySQL",
            text: "Packages, bookings, inquiries and website content",
          },
        ],
        labels: {
          request: ["HTTPS + JSON", "SQL"],
          response: ["JSON", "records"],
        },
      },

      outcome: {
        stats: [
          {
            value: "24+",
            label: "public routes and experiences",
            labelMobile: "public routes",
          },
          {
            value: "3",
            label: "customer conversion flows",
            labelMobile: "contact flows",
          },
          {
            value: "100%",
            label: "responsive across screen sizes",
            labelMobile: "responsive",
          },
          {
            value: "Live",
            label: "production website",
            labelMobile: "website",
          },
        ],
        note: "Live customer-facing platform for exploring and planning Himalayan adventures.",
        noteMobile: "Live Himalayan adventure platform.",
      },
    },
  },
  {
    slug: "8000-club",
    alias: "8000",
    title: "8000 Club",
    summary:
      "A full-stack expedition platform for discovering Himalayan peaks, exploring climbing packages and planning high-altitude journeys.",
    summaryMobile:
      "Explore Himalayan peaks, expedition packages and plan high-altitude journeys.",
    category: "Web platform",
    type: "web",
    year: 2026,
    branch: "server",
    color: "var(--p-club)",
    stack: ["Next.js", "NestJS", "MySQL"],
    cover: "/images/projects/cover-8000-club.webp",
    coverAlt:
      "8000 Club expedition website featuring Himalayan peaks and climbing packages",
    command: "/open 8000-club",
    featured: true,
    graphLabel: "8000 Club",

    // Only the public website is exposed.
    links: {
      demo: "https://8000club.com",
    },

    room: {
      lead: "A public expedition platform for discovering the world’s highest mountains, comparing climbing packages and sending booking or custom-trip requests.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "Jul 2025 – Jul 2026" },
        { label: "Platform", value: "Responsive web application" },
        {
          label: "Status",
          value: "Live and actively improving",
          valueMobile: "Live",
        },
      ],

      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "NestJS",
        "MySQL",
        "Docker",
      ],

      story: [
        {
          title: "The problem",
          body: "Expedition information, mountain profiles and trip enquiries needed to be brought together in one clear experience. Visitors needed an easier way to research demanding journeys and contact the team with the right details.",
          bodyMobile:
            "Expedition information and trip enquiries needed one clear, accessible experience.",
        },
        {
          title: "What I built",
          body: "I built a responsive platform for exploring Himalayan peaks, expedition packages, departures, itineraries, gear lists and summit stories. Visitors can book packages, request a custom trip and manage their expedition information through a personal account.",
          bodyMobile:
            "A responsive platform for exploring expeditions, booking packages and planning custom trips.",
        },
        {
          title: "What I learned",
          body: "Content-heavy travel products need strong information hierarchy and careful performance work. Interactive mountain experiences are most useful when they support research instead of competing with essential trip details.",
          bodyMobile:
            "Clear information hierarchy and performance matter when combining detailed trips with interactive content.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/8000-club/shot-1.webp",
          alt: "8000 Club expedition discovery experience",
          caption: "Expedition discovery and package browsing",
          captionMobile: "Explore expeditions",
        },
        {
          src: "/images/rooms/8000-club/shot-2.webp",
          alt: "8000 Club mobile expedition experience",
          caption: "Responsive trip planning experience",
          captionMobile: "Plan on mobile",
        },
        {
          src: "/images/projects/cover-8000-club.webp",
          alt: "8000 Club Himalayan expedition website",
          caption: "Himalayan expedition platform",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "Visitors explore server-rendered expedition content, submit booking or trip-planning requests through a secure API, and receive a consistent experience across desktop and mobile.",

        nodes: [
          {
            title: "Next.js Front End",
            text: "Expeditions, mountain stories and trip planning",
          },
          {
            title: "NestJS API",
            text: "Authentication, validation and business workflows",
          },
          {
            title: "MySQL",
            text: "Expedition, booking and account data",
          },
        ],

        labels: {
          request: ["HTTPS", "Validated"],
          response: ["JSON", "Rendered content"],
        },
      },

      outcome: {
        stats: [
          {
            value: "14",
            label: "eight-thousand-metre peaks represented",
            labelMobile: "major peaks",
          },
          {
            value: "3D",
            label: "interactive mountain exploration",
            labelMobile: "mountain views",
          },
          {
            value: "3",
            label: "booking and enquiry pathways",
            labelMobile: "trip pathways",
          },
          {
            value: "1",
            label: "connected discovery and planning platform",
            labelMobile: "unified platform",
          },
        ],

        note: "Figures describe implemented product scope and do not expose private operational data.",
        noteMobile: "Product scope only; private data is not shown.",
      },
    },
  },
  {
    slug: "bikri-ai",
    alias: "bikri",
    title: "BIKRI AI-powered inventory management system",
    summary:
      "Voice-powered inventory control and an AI business assistant built for Nepali retail shops, running locally without cloud dependency.",
    summaryMobile:
      "Voice inventory control and an AI business assistant for Nepali retail shops.",
    category: "AI / Mobile app",
    type: "mobile",
    year: 2026,
    branch: "feature/bikri-ai",
    color: "var(--p-bikri)",
    stack: ["React Native", "FastAPI", "PostgreSQL"],
    cover: "/images/projects/cover-bikri-ai.webp",
    coverAlt:
      "Bikri AI inventory dashboard with stock information and business insights",
    command: "/open bikri",
    featured: true,
    graphLabel: "Bikri AI",
    links: {
      demo: "#",
      github: "https://github.com/nikajr10/final-year-project",
    },

    room: {
      lead: "A local-first inventory management system for Nepali retail shops. Shop owners can manage stock using Nepali voice commands, view sales insights, and ask an AI assistant about their business.",

      facts: [
        { label: "Role", value: "Full-stack Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Final-year project" },
        {
          label: "Status",
          value: "Final-year project",
          valueMobile: "Final-year project",
        },
      ],

      stack: [
        "React Native",
        "TypeScript",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "Ollama",
        "Whisper",
      ],

      story: [
        {
          title: "The problem",
          body: "Small retail shops often manage inventory manually, making it difficult to keep stock records accurate, identify low-stock products, and understand sales performance.",
          bodyMobile:
            "Manual inventory makes stock tracking, low-stock detection and sales analysis difficult.",
        },
        {
          title: "What I built",
          body: "Bikri AI combines Nepali voice commands, real-time inventory management, sales reporting and an AI business assistant into one local-first system.",
          bodyMobile:
            "One local-first system combining Nepali voice inventory, sales reports and an AI business assistant.",
        },
        {
          title: "What I learned",
          body: "Building the system taught me how speech recognition, LLMs, semantic product matching, vector search and traditional backend logic can work together in a real application.",
          bodyMobile:
            "I learned how speech recognition, LLMs, vector search and backend logic can work together in a real application.",
        },
      ],

      // Order of the mobile swipe gallery; desktop shows the first two.
      screens: [
        {
          src: "/images/rooms/bikri-ai/shot-1.webp",
          alt: "Bikri AI voice listening and daily sales screens on phones",
          caption: "Nepali voice inventory control",
          captionMobile: "Voice inventory",
        },
        {
          src: "/images/rooms/bikri-ai/shot-2.webp",
          alt: "Bikri AI inventory breakdown and profile screens on phones",
          caption: "Real-time inventory dashboard",
          captionMobile: "Inventory dashboard",
        },
        {
          src: "/images/projects/cover-bikri-ai.webp",
          alt: "Bikri AI business assistant and inventory system",
          caption: "AI-powered business assistant",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "A Nepali voice command is transcribed locally with Whisper, interpreted into an inventory action, matched against products using semantic search, and processed through the FastAPI backend and PostgreSQL database.",

        nodes: [
          {
            title: "React Native",
            text: "Voice input, inventory and chatbot UI",
          },
          {
            title: "FastAPI",
            text: "Speech processing, AI logic and API",
          },
          {
            title: "PostgreSQL",
            text: "Products, transactions and vector data",
          },
        ],

        labels: {
          request: ["Audio + JWT", "SQL"],
          response: ["JSON", "Stock data"],
        },
      },

      outcome: {
        stats: [
          {
            value: "927",
            label: "voice samples collected",
            labelMobile: "voice samples",
          },
          {
            value: "4",
            label: "AI models used locally",
            labelMobile: "AI models",
          },
          {
            value: "12",
            label: "quick business actions",
            labelMobile: "quick actions",
          },
          {
            value: "100%",
            label: "local AI processing",
            labelMobile: "local processing",
          },
        ],

        note: "Bikri AI combines Whisper, Llama 3, Qwen 2.5 and SBERT to provide voice inventory control, semantic product matching and AI-powered business analysis without cloud APIs.",

        noteMobile:
          "Local AI powers voice inventory, product matching and business analysis without cloud APIs.",
      },
    },
  },
  {
    slug: "crm-software",
    alias: "crm",
    title: "CRM - Customer Relationship Management System",
    summary:
      "A role-based CRM for managing leads, contacts, accounts, deals, campaigns and daily sales activities from one workspace.",
    summaryMobile:
      "A role-based CRM for managing customers, deals, campaigns and sales activities.",
    category: "Web app",
    type: "web",
    year: 2026,
    branch: "developoment",
    color: "var(--p-crm)",

    stack: ["React", "NestJS", "MySQL"],
    cover: "/images/projects/cover-crm-software.webp",
    coverAlt:
      "CRM dashboard showing lead activity, deal progress and team performance",

    command: "/open crm",
    featured: true,
    graphLabel: "Rewasoft CRM",

    // Public Front End only. Backend, CMS and repository links are private.
    links: {
      demo: "https://crm.rewasoft.net",
    },

    room: {
      lead: "A business CRM that brings customer records, sales pipelines, campaigns and follow-up activities into one role-aware workspace.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Product", value: "Internal business CRM" },
        {
          label: "Status",
          value: "Live and actively maintained",
          valueMobile: "Live",
        },
      ],

      stack: ["React", "TypeScript", "Vite", "TanStack", "NestJS", "MySQL"],

      story: [
        {
          title: "The problem",
          body: "Customer information and sales follow-ups were difficult to manage across separate records and workflows. The team needed one place to track prospects, relationships, deals and daily activities.",
          bodyMobile:
            "Customer records and sales follow-ups needed one organized, shared workspace.",
        },
        {
          title: "What I built",
          body: "A responsive CRM interface for managing leads, contacts, accounts, deals and campaigns. It also includes dashboards, advanced filters, CSV imports, activity tracking and a drag-and-drop Kanban workflow.",
          bodyMobile:
            "A CRM for leads, contacts, accounts, deals, campaigns and sales activities.",
        },
        {
          title: "What I learned",
          body: "Building related CRM modules highlighted the importance of reusable data tables, predictable filters and consistent detail views. Role-aware navigation also kept the product focused for each type of user.",
          bodyMobile:
            "Reusable workflows and role-aware navigation made a complex CRM easier to use.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/crm-software/shot-1.webp",
          alt: "CRM contact list with status and service columns",
          caption: "Customer records and contact management",
          captionMobile: "Customer records",
        },
        {
          src: "/images/rooms/crm-software/shot-2.webp",
          alt: "CRM campaign types list",
          caption: "Campaign type management",
          captionMobile: "Campaigns",
        },
        {
          src: "/images/projects/cover-crm-software.webp",
          alt: "CRM dashboard with lead, deal and task summaries",
          caption: "Customer relationship workspace",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "The React application sends authenticated requests to a NestJS API, where access rules and validation are applied before CRM records are stored in MySQL.",

        nodes: [
          {
            title: "React Front End",
            text: "Role-aware views, forms, tables and Kanban workflows",
          },
          {
            title: "NestJS API",
            text: "Authentication, authorization and business validation",
          },
          {
            title: "MySQL",
            text: "Customers, deals, campaigns and activity records",
          },
        ],

        labels: {
          request: ["HTTPS + JWT", "SQL"],
          response: ["JSON", "records"],
        },
      },

      outcome: {
        stats: [
          {
            value: "2",
            label: "role-specific application experiences",
            labelMobile: "user roles",
          },
          {
            value: "6",
            label: "core customer and sales modules",
            labelMobile: "core modules",
          },
          {
            value: "4",
            label: "activity types managed in one place",
            labelMobile: "activity types",
          },
          {
            value: "1",
            label: "shared workspace for the sales lifecycle",
            labelMobile: "sales workspace",
          },
        ],

        note: "The live portfolio links only to the customer-facing CRM. Private infrastructure and source repositories are not exposed.",
        noteMobile: "Private infrastructure and source code are not exposed.",
      },
    },
  },
  {
    slug: "adventure-pathway",
    alias: "adventure",
    title: "Adventure Pathway",
    summary:
      "A full-stack adventure platform for exploring Himalayan treks, expeditions, peak climbing and custom journeys, with fixed departures, inquiries and rich travel content.",
    summaryMobile:
      "A Himalayan adventure platform for treks, expeditions, peak climbing and custom journeys.",
    category: "Web platform",
    type: "web",
    year: 2026,
    branch: "feature/adventure-pathway",
    color: "var(--p-adventure)",
    stack: ["Next.js", "NestJS", "PostgreSQL"],
    cover: "/images/projects/cover-adventure-pathway.webp",
    coverAlt: "Adventure Pathway Himalayan trekking and expedition website",
    command: "/open adventure",
    featured: false,
    graphLabel: "Adventure Pathway",
    links: { demo: "https://adventurepathway.com/" },

    room: {
      lead: "A complete digital platform for a Himalayan adventure company, bringing trekking, expeditions, peak climbing, cultural journeys, fixed departures and custom travel experiences into one place.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Development team" },
        {
          label: "Status",
          value: "Live and in use",
          valueMobile: "Live",
        },
      ],

      stack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Docker",
      ],

      story: [
        {
          title: "The problem",
          body: "Adventure companies need to present a large amount of travel information without making the experience feel like a traditional booking website. Treks, regions, departures, galleries, stories and inquiries all need to work together as one journey.",
          bodyMobile:
            "Treks, departures, regions, stories and inquiries needed to feel like one connected experience.",
        },
        {
          title: "What I built",
          body: "A content-driven adventure platform where visitors can explore Himalayan regions, discover trekking and expedition journeys, browse fixed departures, read stories from the trail and send personalized inquiries.",
          bodyMobile:
            "A connected platform for exploring journeys, fixed departures, stories and personalized inquiries.",
        },
        {
          title: "What I learned",
          body: "The project taught me how to structure a large travel platform around reusable content, dynamic routes and CMS-managed sections while keeping the frontend experience highly visual and easy to navigate.",
          bodyMobile:
            "I learned how to structure a visual travel platform around reusable content, dynamic routes and CMS-managed sections.",
        },
      ],

      // Order of the mobile swipe gallery; desktop shows the first two.
      screens: [
        {
          src: "/images/rooms/adventure-pathway/shot-1.webp",
          alt: "Adventure Pathway about page with the founder story",
          caption: "Founder story and team",
          captionMobile: "About page",
        },
        {
          src: "/images/rooms/adventure-pathway/shot-2.webp",
          alt: "Adventure Pathway website displayed on phones",
          caption: "Responsive mobile experience",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-adventure-pathway.webp",
          alt: "Adventure Pathway Himalayan adventure platform",
          caption: "Himalayan adventure platform",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "A visitor explores a journey through the HTML + Tailwind CSS + JS frontend, requests dynamic adventure content from the Laravel API, and receives structured data from MySQL.",

        nodes: [
          {
            title: "HTML + Tailwind CSS + JS",
            text: "Journeys, regions, departures and content",
          },
          {
            title: "Laravel",
            text: "Content, inquiry and business logic",
          },
          {
            title: "MySQL",
            text: "Trips, pages, stories and structured content",
          },
        ],

        labels: {
          request: ["HTTPS", "API"],
          response: ["JSON", "Content"],
        },
      },

      outcome: {
        stats: [
          {
            value: "4+",
            label: "major adventure categories",
            labelMobile: "categories",
          },
          {
            value: "10+",
            label: "featured Himalayan journeys",
            labelMobile: "journeys",
          },
          {
            value: "4",
            label: "trekking and adventure regions",
            labelMobile: "regions",
          },
          {
            value: "1",
            label: "connected adventure platform",
            labelMobile: "platform",
          },
        ],

        note: "The platform brings trekking, expeditions, peak climbing, cultural journeys, fixed departures, galleries, stories and inquiries together into a single digital experience.",

        noteMobile:
          "One platform connecting Himalayan journeys, departures, stories and inquiries.",
      },
    },
  },
  {
    slug: "himalayan-karma-treks",
    alias: "karma",
    title: "Himalayan Karma Treks",
    summary:
      "A full-stack travel platform for discovering Himalayan treks, peak climbing and high-altitude expeditions, with detailed itineraries, fixed departures and trip inquiries.",
    summaryMobile:
      "A Himalayan travel platform for treks, peak climbing and high-altitude expeditions.",
    category: "Web platform",
    type: "web",
    year: 2026,
    branch: "feature/karma-treks",
    color: "var(--p-karma)",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "Laravel", "MySQL"],
    cover: "/images/projects/cover-himalayan-karma-treks.webp",
    coverAlt: "Himalayan Karma Treks trekking and expedition platform",
    command: "/open karma",
    featured: false,
    graphLabel: "Karma Treks",
    links: { demo: "https://karmatrekking.com/" },

    room: {
      lead: "A full-stack travel platform for Himalayan trekking and mountaineering, helping travelers discover routes, explore expeditions, view detailed itineraries and send inquiries for planned journeys.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Development team" },
        {
          label: "Status",
          value: "Live and in use",
          valueMobile: "Live",
        },
      ],

      stack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Docker",
      ],

      story: [
        {
          title: "The problem",
          body: "A trekking and expedition company needs to present a large amount of travel information clearly. Packages require structured itineraries, destinations, durations, altitudes, departures, inclusions and other trip details.",
          bodyMobile:
            "Trekking packages contain complex itineraries, destinations, departures and trip details that need to stay organized.",
        },
        {
          title: "What I built",
          body: "A dynamic travel platform where visitors can explore trekking regions, peak climbing and high-altitude expeditions, browse detailed packages and itineraries, and submit inquiries for their desired trips.",
          bodyMobile:
            "A dynamic platform for exploring treks, expeditions, packages, itineraries and trip inquiries.",
        },
        {
          title: "What I learned",
          body: "The project strengthened my experience with Laravel-based full-stack development, database-driven content, reusable frontend components and Dockerized application deployment.",
          bodyMobile:
            "I strengthened my Laravel, database-driven development and Docker deployment skills.",
        },
      ],

      // Order of the mobile swipe gallery; desktop shows the first two.
      screens: [
        {
          src: "/images/rooms/himalayan-karma-treks/shot-1.webp",
          alt: "Himalayan Karma Treks other activities section",
          caption: "Peak climbing, heli tours and city tours",
          captionMobile: "Other activities",
        },
        {
          src: "/images/rooms/himalayan-karma-treks/shot-2.webp",
          alt: "Himalayan Karma Treks expeditions, treks and packages on phones",
          caption: "Expeditions and featured packages on mobile",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-himalayan-karma-treks.webp",
          alt: "Himalayan Karma Treks adventure platform",
          caption: "Himalayan adventure platform",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "A traveler explores a package through the frontend, requests dynamic content from the Laravel application, and receives structured package, itinerary and departure data from MySQL.",

        nodes: [
          {
            title: "HTML + Tailwind",
            text: "Responsive pages and travel experiences",
          },
          {
            title: "Laravel",
            text: "Routes, views, business logic and content",
          },
          {
            title: "MySQL",
            text: "Packages, itineraries and structured content",
          },
        ],

        labels: {
          request: ["HTTPS", "HTTP"],
          response: ["HTML", "Data"],
        },
      },

      outcome: {
        stats: [
          {
            value: "24+",
            label: "trekking packages",
            labelMobile: "trekking packages",
          },
          {
            value: "3",
            label: "expedition altitude categories",
            labelMobile: "expedition categories",
          },
          {
            value: "3+",
            label: "additional adventure activities",
            labelMobile: "activities",
          },
          {
            value: "1",
            label: "connected travel platform",
            labelMobile: "platform",
          },
        ],

        note: "The platform brings trekking packages, peak climbing, 6000m, 7000m and 8000m expeditions and other adventure experiences together through a Laravel and MySQL-powered platform.",

        noteMobile:
          "One platform connecting trekking packages, expeditions, peak climbing and adventure experiences.",
      },
    },
  },

  {
    slug: "hatti-hatti-treks",
    alias: "hatti",
    title: "Hatti Hatti Trek and Expedition",
    summary:
      "A trekking and expedition website for a Nepal-based company, with packages for treks, expeditions and peak climbing, a travel blog, a gallery and a trip planning form.",
    summaryMobile:
      "A Himalayan trekking and expedition website with packages, a blog and trip planning.",
    category: "Web platform",
    type: "web",
    year: 2026,
    branch: "feature/hatti-hatti-treks",
    color: "var(--p-hatti)",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "Laravel", "MySQL"],
    cover: "/images/projects/cover-hatti-hatti-treks.webp",
    coverAlt: "Hatti Hatti Trek and Expedition website",
    command: "/open hatti",
    featured: false,
    graphLabel: "Hatti Hatti Trek",
    links: { demo: "https://hattihattitreks.com/" },

    room: {
      lead: "A website for Hatti Hatti Trek and Expedition, where travelers browse treks, expeditions and peak climbing packages, read trekking guides and plan a trip with the team.",

      // Timeline and team follow the Karma Treks entry. TODO: confirm
      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Development team" },
        {
          label: "Status",
          value: "Live and in use",
          valueMobile: "Live",
        },
      ],

      stack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Docker",
      ],

      story: [
        {
          title: "The problem",
          body: "A trekking company sells many trips that differ in length, difficulty and region. Visitors need to compare them quickly and reach the team without digging through long pages.",
          bodyMobile:
            "Visitors needed to compare many trips quickly and reach the team easily.",
        },
        {
          title: "What I built",
          body: "A Laravel website with package listings for trekking, expeditions, peak climbing and other activities, each showing duration and difficulty. It also has a blog for stories and trekking guides, a gallery, a Plan Your Trip form and direct WhatsApp contact.",
          bodyMobile:
            "A Laravel website with trip packages, a blog, a gallery, a trip planning form and WhatsApp contact.",
        },
        {
          title: "What I learned",
          body: "Reusing one package structure across treks, expeditions and climbs kept the pages consistent and the content easy to manage. Putting duration and difficulty on every card made the listings quicker to scan.",
          bodyMobile:
            "One shared package structure kept every trip type consistent and easy to manage.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/hatti-hatti-treks/shot-1.webp",
          alt: "Hatti Hatti Trek trekking regions",
          caption: "Trekking regions across Nepal",
          captionMobile: "Trekking regions",
        },
        {
          src: "/images/rooms/hatti-hatti-treks/shot-2.webp",
          alt: "Hatti Hatti Trek website displayed on phones",
          caption: "Responsive mobile experience",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-hatti-hatti-treks.webp",
          alt: "Hatti Hatti Trek website",
          caption: "Trekking and expedition website",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "A visitor opens a package page, the Laravel application builds it from the stored package, blog and gallery content in MySQL, and trip requests go back through the same application.",

        nodes: [
          {
            title: "HTML + Tailwind",
            text: "Packages, blog, gallery and trip form",
          },
          {
            title: "Laravel",
            text: "Routes, views, content and inquiries",
          },
          {
            title: "MySQL",
            text: "Packages, posts, media and requests",
          },
        ],

        labels: {
          request: ["HTTPS", "SQL"],
          response: ["HTML", "Data"],
        },
      },

      outcome: {
        stats: [
          {
            value: "4",
            label: "adventure categories",
            labelMobile: "categories",
          },
          {
            value: "Blog",
            label: "stories and trekking guides",
            labelMobile: "blog",
          },
          {
            value: "Plan",
            label: "custom trip planning form",
            labelMobile: "trip planning",
          },
          {
            value: "Live",
            label: "production website",
            labelMobile: "website",
          },
        ],

        note: "The site brings trekking, expedition, peak climbing and other activity packages together with a blog, a gallery and trip planning in one Laravel and MySQL website.",

        noteMobile: "Packages, blog, gallery and trip planning in one website.",
      },
    },
  },
  {
    slug: "adventure-reisen",
    alias: "reisen",
    title: "Adventure Reisen",
    summary:
      "A bilingual travel website for a Switzerland-based company offering trekking, peak climbing and cultural journeys in Nepal, with package search, special offers and inquiries.",
    summaryMobile:
      "A bilingual English and German travel website for trekking and peak climbing in Nepal.",
    category: "Web platform",
    type: "web",
    year: 2026,
    branch: "feature/adventure-reisen",
    color: "var(--p-reisen)",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "Laravel", "MySQL"],
    cover: "/images/projects/cover-adventure-reisen.webp",
    coverAlt:
      "Adventure Reisen travel website for journeys from Switzerland to Nepal",
    command: "/open reisen",
    featured: false,
    graphLabel: "Adventure Reisen",
    links: { demo: "https://adventurereisen.com/" },

    room: {
      lead: "A travel website for Adventure Reisen, a Switzerland-based company that brings travelers to Nepal. Visitors explore trekking, peak climbing and other activities in English or German and send an inquiry for the trip they want.",

      // Timeline and team follow the Karma Treks entry. TODO: confirm
      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Development team" },
        {
          label: "Status",
          value: "Live and in use",
          valueMobile: "Live",
        },
      ],

      stack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Laravel",
        "MySQL",
        "Docker",
      ],

      story: [
        {
          title: "The problem",
          body: "The company serves travelers in Switzerland who are planning a trip to Nepal. It needed a website that works in both English and German, explains who is behind the company, and makes its packages easy to find.",
          bodyMobile:
            "The company needed an English and German website that makes its Nepal packages easy to find.",
        },
        {
          title: "What I built",
          body: "A Laravel website with English and German versions, package pages for trekking, peak climbing and other activities, a search across packages, destinations and pages, a special offers section, the founder's story and an inquiry form.",
          bodyMobile:
            "A Laravel website in English and German with packages, search, special offers and inquiries.",
        },
        {
          title: "What I learned",
          body: "Building for two languages affects every page: the content structure, the routes and the layout all have to work for both. Designing the templates for both languages from the start kept the two versions in step.",
          bodyMobile:
            "Designing the templates for both languages from the start kept the two versions in step.",
        },
      ],
      screens: [
        {
          src: "/images/rooms/adventure-reisen/shot-1.webp",
          alt: "Adventure Reisen package listing",
          caption: "Trekking and peak climbing packages",
          captionMobile: "Packages",
        },
        {
          src: "/images/rooms/adventure-reisen/shot-2.webp",
          alt: "Adventure Reisen website displayed on phones",
          caption: "Responsive mobile experience",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-adventure-reisen.webp",
          alt: "Adventure Reisen website",
          caption: "Switzerland to Nepal travel website",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "A visitor picks a language and opens a package, the Laravel application builds the page from the translated content in MySQL, and inquiries go back through the same application.",

        nodes: [
          {
            title: "HTML + Tailwind",
            text: "Bilingual pages, search and inquiry form",
          },
          {
            title: "Laravel",
            text: "Routes, translations, content and inquiries",
          },
          {
            title: "MySQL",
            text: "Packages, translations and inquiries",
          },
        ],

        labels: {
          request: ["HTTPS", "SQL"],
          response: ["HTML", "Data"],
        },
      },

      outcome: {
        stats: [
          {
            value: "2",
            label: "languages, English and German",
            labelMobile: "languages",
          },
          {
            value: "Search",
            label: "across packages, destinations and pages",
            labelMobile: "site search",
          },
          {
            value: "Offers",
            label: "special offers section",
            labelMobile: "special offers",
          },
          {
            value: "Live",
            label: "production website",
            labelMobile: "website",
          },
        ],

        note: "The site presents trekking, peak climbing and other activities in English and German, with search, special offers and inquiries, on Laravel and MySQL.",

        noteMobile:
          "A bilingual travel website with search, offers and inquiries.",
      },
    },
  },

  {
    slug: "pokemon-battle",
    alias: "pokemon",
    title: "Pokédex and turn-based battle simulator",
    summary:
      "A React-based Pokémon application combining a searchable Pokédex, detailed stat visualization and an interactive turn-based battle system.",
    summaryMobile:
      "A React Pokédex with search, stat visualization and turn-based battles.",
    category: "Web application",
    type: "web",
    year: 2026,
    branch: "feature/pokemon-battle",
    color: "var(--p-pokemon)",
    stack: ["React", "JavaScript", "CSS", "PokeAPI"],
    cover: "/images/projects/cover-pokemon-battle.webp",
    coverAlt: "Pokémon battle and Pokédex web application",
    command: "/open pokemon",
    featured: false,
    graphLabel: "Pokémon Battle",
    links: {
      demo: "https://pokemon-battle-hp.netlify.app/",
      github: "https://github.com/SamyakMdr/Pokemon",
    },

    room: {
      lead: "An interactive Pokémon web application combining a searchable Pokédex with detailed Pokémon information and a turn-based battle experience.",

      facts: [
        { label: "Role", value: "Front End Developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Personal project" },
        {
          label: "Status",
          value: "Live and in use",
          valueMobile: "Live",
        },
      ],

      stack: ["React", "JavaScript", "CSS"],

      story: [
        {
          title: "The problem",
          body: "A Pokémon catalogue can become difficult to use when users need to quickly find specific Pokémon, understand their stats and move from browsing into an interactive battle experience.",
          bodyMobile:
            "Users need a fast way to search Pokémon, understand their stats and start battles.",
        },
        {
          title: "What I built",
          body: "A component-driven React application with real-time Pokémon search and filtering, detailed stat visualization and a turn-based battle system that manages battle state and player interactions.",
          bodyMobile:
            "A React app combining searchable Pokémon data, stat views and turn-based battles.",
        },
        {
          title: "What I learned",
          body: "The project strengthened my understanding of component-driven React architecture, state management, API-driven interfaces and managing complex UI state across multiple battle turns.",
          bodyMobile:
            "I strengthened my React architecture, API integration and battle-state management skills.",
        },
      ],

      screens: [
        {
          src: "/images/rooms/pokemon-battle/shot-1.webp",
          alt: "Pokémon battle setup comparing two Pokémon and their stats",
          caption: "Pick two Pokémon and compare stats",
          captionMobile: "Stats and battle",
        },
        {
          src: "/images/rooms/pokemon-battle/shot-2.webp",
          alt: "Pokémon home, Pokédex and battle screens on phones",
          caption: "Responsive Pokédex and battle screens",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-pokemon-battle.webp",
          alt: "Pokémon battle application",
          caption: "Interactive Pokémon battle experience",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "The React application retrieves Pokémon data, transforms it into reusable UI components, and manages search, filtering, stat visualization and battle state entirely through the frontend.",

        nodes: [
          {
            title: "React frontend",
            text: "Pokédex, details and battle interface",
          },
          {
            title: "State management",
            text: "Search, selection and battle logic",
          },
          {
            title: "PokéAPI",
            text: "Pokémon data and statistics",
          },
        ],

        labels: {
          request: ["HTTPS", "API"],
          response: ["JSON", "Pokemon data"],
        },
      },

      outcome: {
        stats: [
          {
            value: "3",
            label: "core experiences",
            labelMobile: "experiences",
          },
          {
            value: "2",
            label: "interactive systems",
            labelMobile: "systems",
          },
          {
            value: "1",
            label: "React application",
            labelMobile: "application",
          },
          {
            value: "100%",
            label: "responsive interface",
            labelMobile: "responsive",
          },
        ],

        note: "The project combines API-driven Pokémon data, real-time search and filtering, visual stat exploration and turn-based battle logic into one responsive React experience.",

        noteMobile:
          "One responsive React app combining a Pokédex, stat visualization and turn-based battles.",
      },
    },
  },
  {
    slug: "mole-hole",
    alias: "mole",
    title: "Mole Hole Tap Game",
    summary:
      "A browser-based reaction game built with HTML, CSS and JavaScript where players tap appearing moles, track their score and adapt to increasing difficulty.",
    summaryMobile:
      "A fast-paced JavaScript game with mole tapping, scoring and increasing difficulty.",
    category: "Web game",
    type: "web",
    year: 2026,
    branch: "feature/mole-hole",
    color: "var(--p-mole)",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/images/projects/cover-mole-hole.webp",
    coverAlt: "Mole Hole Tap browser game",
    command: "/open mole",
    featured: false,
    graphLabel: "Mole Hole",
    links: {
      demo: "https://mole-hole-tap.netlify.app/",
      github: "https://github.com/SamyakMdr/simple_games",
    },

    room: {
      lead: "A lightweight browser game focused on fast interactions, dynamic mole appearances, score tracking and progressively increasing difficulty.",

      facts: [
        { label: "Role", value: "Frontend developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Personal project" },
        {
          label: "Status",
          value: "Completed",
          valueMobile: "Completed",
        },
      ],

      stack: ["HTML", "CSS", "JavaScript"],

      story: [
        {
          title: "The problem",
          body: "A simple browser game still needs responsive interactions, clear feedback and reliable game-state handling to keep the experience fast and engaging.",
          bodyMobile:
            "Even a simple game needs responsive interactions, clear feedback and reliable game logic.",
        },
        {
          title: "What I built",
          body: "A timed mole-tapping game where moles appear dynamically across the board. Players earn points by tapping them before they disappear while the game progressively increases the challenge.",
          bodyMobile:
            "A timed game with dynamic mole appearances, scoring and increasing difficulty.",
        },
        {
          title: "What I learned",
          body: "The project strengthened my understanding of JavaScript event handling, timers, DOM manipulation, game-state management and creating interactive animations without a framework.",
          bodyMobile:
            "I strengthened my JavaScript skills through timers, events, DOM updates and game logic.",
        },
      ],

      screens: [
        {
          src: "/images/rooms/mole-hole/shot-1.webp",
          alt: "Mole Hole Tap game interface",
          caption: "Tap the moles before time runs out",
          captionMobile: "Tap the moles",
        },
        {
          src: "/images/rooms/mole-hole/shot-2.webp",
          alt: "Mole Hole Tap game score interface",
          caption: "Track your score and progress",
          captionMobile: "Track your score",
        },
        {
          src: "/images/projects/cover-mole-hole.webp",
          alt: "Mole Hole Tap browser game",
          caption: "Fast and interactive browser gameplay",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "JavaScript controls the game timer, generates mole appearances, handles player interactions and updates the score and difficulty as the game progresses.",

        nodes: [
          {
            title: "HTML",
            text: "Game board and interactive elements",
          },
          {
            title: "JavaScript",
            text: "Game state, timers, scoring and difficulty",
          },
          {
            title: "CSS",
            text: "Responsive layout and game animations",
          },
        ],

        labels: {
          request: ["Click", "Timer"],
          response: ["Score", "Animation"],
        },
      },

      outcome: {
        stats: [
          {
            value: "1",
            label: "browser game",
            labelMobile: "game",
          },
          {
            value: "3",
            label: "core technologies",
            labelMobile: "technologies",
          },
          {
            value: "∞",
            label: "replayability",
            labelMobile: "replayability",
          },
          {
            value: "100%",
            label: "framework-free",
            labelMobile: "framework-free",
          },
        ],

        note: "The project demonstrates how HTML, CSS and JavaScript can be combined to create a responsive real-time game with dynamic interactions, scoring, animations and progressive difficulty.",

        noteMobile:
          "A framework-free JavaScript game built around interaction, scoring and increasing difficulty.",
      },
    },
  },
  {
    slug: "foodmandu-restaurant",
    alias: "foodmandu",
    title: "Foodmandu Restaurant website",
    summary:
      "A responsive restaurant website built with HTML, CSS and JavaScript, featuring interactive navigation, a carousel banner, food showcases, recipe galleries and reservation sections.",
    summaryMobile:
      "A responsive restaurant website with interactive navigation, food galleries and reservations.",
    category: "Web design",
    type: "web",
    year: 2026,
    branch: "feature/foodmandu",
    color: "var(--p-foodmandu)",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/images/projects/cover-foodmandu-restaurant.webp",
    coverAlt: "Foodmandu Restaurant responsive website",
    command: "/open foodmandu",
    featured: false,
    graphLabel: "Foodmandu Restaurant",
    links: {
      demo: "https://samyakmdr.github.io/website/project%202/index.html",
    },

    room: {
      lead: "A responsive restaurant website designed around food discovery, reservations and an engaging dining experience.",

      facts: [
        { label: "Role", value: "Frontend developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Personal project" },
        {
          label: "Status",
          value: "Completed",
          valueMobile: "Completed",
        },
      ],

      stack: ["HTML", "CSS", "JavaScript"],

      story: [
        {
          title: "The problem",
          body: "A restaurant website needs to present food, dining options and reservations in a visually engaging way while keeping navigation simple and accessible across different screen sizes.",
          bodyMobile:
            "A restaurant site needs engaging visuals, simple navigation and a responsive experience.",
        },
        {
          title: "What I built",
          body: "A responsive restaurant website with a collapsible navigation menu, carousel banner, dinner specials, reservation options, chef information and a recipe gallery featuring different dishes.",
          bodyMobile:
            "A responsive restaurant site with navigation, carousel, food sections, reservations and recipe galleries.",
        },
        {
          title: "What I learned",
          body: "The project strengthened my frontend fundamentals through responsive layouts, interactive JavaScript components, navigation behavior, image galleries and structuring a multi-section website.",
          bodyMobile:
            "I strengthened my responsive design, JavaScript interactions and frontend layout skills.",
        },
      ],

      screens: [
        {
          src: "/images/rooms/foodmandu-restaurant/shot-1.webp",
          alt: "Foodmandu Restaurant dinner special section",
          caption: "Dinner specials and featured dishes",
          captionMobile: "Featured dishes",
        },
        {
          src: "/images/rooms/foodmandu-restaurant/shot-2.webp",
          alt: "Foodmandu Restaurant website displayed on phones",
          caption: "Responsive mobile experience",
          captionMobile: "Mobile experience",
        },
        {
          src: "/images/projects/cover-foodmandu-restaurant.webp",
          alt: "Foodmandu Restaurant responsive website",
          caption: "Responsive restaurant website",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "The static website combines structured HTML content with CSS layouts and JavaScript interactions to create a responsive restaurant browsing experience.",

        nodes: [
          {
            title: "HTML",
            text: "Restaurant sections and content structure",
          },
          {
            title: "CSS",
            text: "Responsive layouts and visual styling",
          },
          {
            title: "JavaScript",
            text: "Navigation, carousel and interactions",
          },
        ],

        labels: {
          request: ["Click", "Interaction"],
          response: ["UI", "Animation"],
        },
      },

      outcome: {
        stats: [
          {
            value: "6+",
            label: "main website sections",
            labelMobile: "sections",
          },
          {
            value: "8",
            label: "recipe showcase items",
            labelMobile: "recipes",
          },
          {
            value: "3",
            label: "reservation options",
            labelMobile: "reservations",
          },
          {
            value: "100%",
            label: "responsive interface",
            labelMobile: "responsive",
          },
        ],

        note: "The project brings restaurant information, featured dishes, reservations, recipes and interactive navigation together into a responsive frontend experience.",

        noteMobile:
          "A responsive restaurant website focused on food discovery, reservations and interactive UI.",
      },
    },
  },
  {
    slug: "bhadakuda-nepal",
    alias: "bhadakuda",
    title: "Bhadakuda Nepal e-commerce website",
    summary:
      "A responsive e-commerce website for discovering kitchen tools, cookware and everyday household products through a simple and user-friendly shopping experience.",
    summaryMobile:
      "A responsive e-commerce website for kitchen tools and household products.",
    category: "E-commerce",
    type: "web",
    year: 2026,
    branch: "feature/bhadakuda-nepal",
    color: "var(--p-bhadakuda)",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/images/projects/cover-bhadakuda-nepal.webp",
    coverAlt: "Bhadakuda Nepal kitchen products e-commerce website",
    command: "/open bhadakuda",
    featured: false,
    graphLabel: "Bhadakuda Nepal",
    links: {
      demo: "https://samyakmdr.github.io/website/Project%203/index.html",
    },

    room: {
      lead: "A product-focused e-commerce website for exploring kitchen appliances, cookware, kitchen components and everyday household accessories.",

      facts: [
        { label: "Role", value: "Frontend developer" },
        { label: "Timeline", value: "2026" },
        { label: "Team", value: "Personal project" },
        {
          label: "Status",
          value: "Completed",
          valueMobile: "Completed",
        },
      ],

      stack: ["HTML", "CSS", "JavaScript"],

      story: [
        {
          title: "The problem",
          body: "A kitchen-focused e-commerce website needs to present a large variety of products clearly while making it easy for users to browse different categories and discover useful items.",
          bodyMobile:
            "A large product catalogue needs clear categories and simple browsing.",
        },
        {
          title: "What I built",
          body: "A responsive e-commerce interface featuring new kitchen products, kitchen components, minor accessories and household categories such as pressure cookers, rice cookers, pans, induction cookers, kettles and ovens.",
          bodyMobile:
            "A responsive store interface with product categories and kitchen essentials.",
        },
        {
          title: "What I learned",
          body: "The project strengthened my frontend fundamentals through product-focused layouts, responsive design, image-based product presentation, navigation and creating a clean shopping-oriented user experience.",
          bodyMobile:
            "I strengthened my responsive layouts, product presentation and frontend UI skills.",
        },
      ],

      screens: [
        {
          src: "/images/rooms/bhadakuda-nepal/shot-1.webp",
          alt: "Bhadakuda Nepal product listing",
          caption: "Featured kitchen products",
          captionMobile: "Product listing",
        },
        {
          src: "/images/rooms/bhadakuda-nepal/shot-2.webp",
          alt: "Bhadakuda Nepal product categories displayed on phones",
          caption: "Kitchen products and categories on mobile",
          captionMobile: "Product categories",
        },
        {
          src: "/images/projects/cover-bhadakuda-nepal.webp",
          alt: "Bhadakuda Nepal responsive e-commerce website",
          caption: "Responsive kitchen products storefront",
          mobileOnly: true,
        },
      ],

      flow: {
        description:
          "The website combines structured product content with responsive CSS layouts and JavaScript interactions to create a simple browsing experience for kitchen and household products.",

        nodes: [
          {
            title: "HTML",
            text: "Product sections and catalogue structure",
          },
          {
            title: "CSS",
            text: "Responsive layouts and visual presentation",
          },
          {
            title: "JavaScript",
            text: "Navigation and interactive behaviour",
          },
        ],

        labels: {
          request: ["Click", "Browse"],
          response: ["Products", "UI"],
        },
      },

      outcome: {
        stats: [
          {
            value: "200+",
            label: "featured products",
            labelMobile: "products",
          },
          {
            value: "80+",
            label: "kitchen components",
            labelMobile: "components",
          },
          {
            value: "50+",
            label: "minor kitchen needs",
            labelMobile: "accessories",
          },
          {
            value: "100%",
            label: "responsive interface",
            labelMobile: "responsive",
          },
        ],

        note: "The project brings kitchen appliances, cookware, components and everyday accessories together in a simple product-focused e-commerce experience.",

        noteMobile:
          "A responsive e-commerce interface focused on kitchen products and simple browsing.",
      },
    },
  },
];

// Home shows six cards in this order (rows 776/326, 551/551, 326/776): the
// first six projects marked `featured`.
export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .slice(0, 6);

// Commit graph: the same six, oldest → newest.
export const graphProjects: Project[] = [...featuredProjects].reverse();

export const projectFilters: { type: ProjectType | "all"; label: string }[] = [
  { type: "all", label: "All" },
  { type: "web", label: "Web apps" },
  { type: "backend", label: "Backend and APIs" },
  { type: "devops", label: "DevOps" },
  { type: "ai", label: "AI and voice" },
  { type: "mobile", label: "Mobile apps" },
  { type: "ui", label: "UI design" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Resolves a room slug or its short `/open` alias. */
export function findProject(name: string): Project | undefined {
  const key = name.trim().toLowerCase();
  return projects.find((p) => p.slug === key || p.alias === key);
}

export function projectHref(project: Project): string {
  return `/projects/${project.slug}`;
}

export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count]!,
    next: projects[(index + 1) % count]!,
  };
}
