// src/features/about/data/experience.ts
import type { ExperienceItem } from "@/features/about/types";

export const EXPERIENCE_ITEMS = [
  {
    id: "exp-eupholias",
    kind: "work",
    org: "Eupholias",
    role: "Freelance Developer",
    location: "Istanbul",
    period: { start: "2026-01", end: "2026-03" },
    summary:
      "Architected and delivered a production real estate platform for a Sakarya-based agency, currently live at yenigunemlak.com with 240+ active property listings.",
    achievements: [
      "Designed advanced property search with filters for price, area, rooms, location, and amenities, plus interactive map-based search using Google Maps and Leaflet.",
      "Integrated Google Cloud Storage for image galleries, WhatsApp API for agent contact, and a complete admin panel for listing management, customer tracking, and contract handling.",
      "Shipped on Vercel with ISR for server-side rendering and SEO optimization.",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "Google Maps",
      "Leaflet",
      "Vercel",
    ],
  },
  {
    id: "exp-alutem",
    kind: "work",
    org: "Alutem",
    role: "Full-Stack Developer",
    location: "Kocaeli",
    period: { start: "2025-04" },
    summary:
      "Developed and shipped a full-stack admin panel using Next.js 16, TypeScript, Supabase, and Material UI, serving a metal products company with 200+ commits in production.",
    achievements: [
      "Established role-based access control with 3 permission levels, Row Level Security across all database tables, IP-based route protection, and server-side session validation.",
      "Built a real-time analytics dashboard integrating live metal price data, interactive charts (Line, Bar, Pie, Gauge), and date range filtering using MUI X-Charts.",
      "Engineered a complete product catalog system supporting category hierarchies, variant filtering, media uploads (images & PDFs), and full CRUD operations.",
      "Delivered client management module with trend charts, data tables, and PDF report generation. Launched on Vercel with automated CI pipeline.",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "MUI",
      "MUI X-Charts",
      "Vercel",
    ],
  },
  {
    id: "exp-pavotek",
    kind: "work",
    org: "Pavotek",
    role: "IT Intern",
    location: "Istanbul",
    period: { start: "2024-07", end: "2024-08" },
    summary:
      "Completed IT internship at a defense sector company, supporting Active Directory management and network infrastructure documentation for 50+ users.",
    achievements: [
      "Supported Active Directory user/device management and onboarding/offboarding workflows.",
      "Documented network infrastructure and contributed to internal runbooks.",
    ],
    tags: [
      "IT Support",
      "Active Directory",
      "Windows",
      "Networking",
      "Documentation",
    ],
  },
  {
    id: "edu-1",
    kind: "education",
    org: "Necmettin Erbakan University",
    role: "Computer Engineering",
    location: "Konya",
    period: { start: "2020-09", end: "2024-09" },
    summary:
      "Completed a computer engineering curriculum spanning algorithms, operating systems, databases, and computer networks with electives in AI/ML and data mining.",
    achievements: [
      "Algorithms & data structures, OS, databases, and computer networks.",
      "AI/ML & data mining electives with hands-on classification and regression projects.",
      "Capstone: web-based analysis tool with data ingestion, analytics, and reporting dashboards.",
    ],
    tags: [
      "Computer Engineering",
      "Algorithms",
      "Databases",
      "AI/ML",
      "Python",
      "C/C++",
      "SQL",
    ],
  },
] as const satisfies readonly ExperienceItem[];
