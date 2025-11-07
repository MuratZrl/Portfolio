// src/features/about/data/experience.ts
import type { ExperienceItem } from "@/features/about/types";

export const EXPERIENCE_ITEMS = [
  {
    id: "exp-3",
    kind: "work",
    org: "Alutem",
    role: "Full Stack Web Developer",
    location: "Kocaeli",
    period: { start: "2025-06", end: "2025-11" },
    summary:
      "Delivered an internal admin portal for company use with Supabase (RLS) and Next.js. Implemented the UI with MUI and form validation with Yup.",
    achievements: [
      "Shipped authenticated, role-based CRUD panels with consistent MUI components.",
      "Introduced schema-based validation (Yup) and basic operational documentation.",
    ],
    responsibilities: [
      "Supabase schema design and RLS policies; protected routes and RBAC.",
      "Next.js application structure; MUI-based UI; Yup-driven form validation.",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "Node.js",
      "MUI",
      "Yup",
    ],
    links: [{ label: "Admin Portal Case", href: "/projects/alutem-admin" }],
  },
  {
    id: "exp-1",
    kind: "work",
    org: "Pavotek",
    role: "IT Support Intern",
    location: "Istanbul",
    period: { start: "2024-07", end: "2024-09" },
    summary:
      "Provided Level-1/2 support during a two-month internship: resolved tickets, diagnosed Windows/Linux issues, performed basic Active Directory administration, and supported server operations with documentation and follow-ups.",
    achievements: [
      "Resolved ~150+ help-desk tickets with a median first-response time under 10 minutes.",
      "Standardized Windows/Linux endpoint imaging and baseline setup; cut provisioning time by ~30%.",
      "Assisted with AD user/device management and onboarding/offboarding using basic PowerShell scripts.",
      "Supported patching/updates and server monitoring, helping improve ticket MTTR by ~20%.",
      "Authored 15+ internal runbooks/KBs, reducing repeat issues and handover friction.",
    ],
    tags: [
      "IT Support",
      "Help Desk / Ticketing",
      "Windows 10/11",
      "Linux (Ubuntu/Debian)",
      "Active Directory",
      "PowerShell",
      "Endpoint Imaging",
      "Patching & Updates",
      "Monitoring",
      "Documentation",
    ],
    links: [
      { label: "Ops Notes (PDF)", href: "/files/pavotek-it-support-notes.pdf" },
      { label: "Runbook Samples", href: "/projects/it-support" },
    ],
  },
  {
    id: "edu-1",
    kind: "education",
    org: "Necmettin Erbakan University",
    role: "Computer Engineering",
    location: "Turkey/Konya",
    period: { start: "2020-09", end: "2024-09" },
    summary:
      "Completed a computer engineering curriculum spanning algorithms, operating systems, databases, and computer networks. Took advanced electives in AI/ML and data mining, supported by strong mathematical foundations (linear algebra, calculus, differential equations). Hands-on labs in network management and wireless networking, plus coursework in electronic circuits and systems.",
    achievements: [
      "Algorithms & data structures, OS, DB, and networks: implemented classic data structures and scheduling/transaction concepts with practical exercises.",
      "AI/ML & data mining: built small projects applying classification and regression (e.g., k-NN, decision trees, basic SVM/linear models) with train/validation workflows.",
      "Mathematics for engineering: linear algebra and differential equations used to reason about optimization and model behavior in ML coursework.",
      "Network management & wireless: configured routing/switching basics, VLANs, and explored wireless protocols and performance considerations.",
      "Electronics: analyzed basic analog/digital circuits; practiced measurement and debugging in lab settings.",
      "Capstone: web-based analysis tool focusing on data ingestion, simple analytics, and reporting dashboards; delivered documentation and testable modules."
    ],
    tags: [
      "Computer Engineering",
      "Algorithms",
      "Operating Systems",
      "Databases",
      "Computer Networks",
      "Wireless",
      "AI",
      "ML",
      "Data Mining",
      "Linear Algebra",
      "Differential Equations",
      "Electronics",
      "Python",
      "C/C++",
      "SQL"
    ]
  }
] as const satisfies readonly ExperienceItem[];
