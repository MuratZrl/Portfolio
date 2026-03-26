// src/features/about/data/about-intro.ts
import {
  type AboutIntroDefaults,
} from "@/features/about/types";

import {
  Github,
  Linkedin,
  Gauge,
  FolderGit2,
} from "lucide-react";

export const ABOUT_DEFAULTS: AboutIntroDefaults = {
  name: "Murat Zorlu",
  role: "Fullstack Web Developer",
  location: "Istanbul, Turkey",
  availability: "available",
  avatar: { src: "/images/profile.jpg", alt: "Murat Zorlu" },
  bio: [
    "Fullstack TypeScript developer with production experience in Next.js, NestJS, and PostgreSQL.",
    "Delivered two live applications serving real businesses in Turkey.",
  ],
  highlights: [
    "Full-stack apps with Next.js, NestJS & PostgreSQL",
    "Real-time systems with WebSocket & Redis",
    "Containerized deployments with Docker",
  ],
  techTags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker", "Redis", "Supabase", "Tailwind CSS", "MUI", "Prisma"],
  social: [
    { href: "https://github.com/MuratZrl", label: "GitHub", icon: Github },
    { href: "https://www.linkedin.com/in/murat-zorlu-dev", label: "LinkedIn", icon: Linkedin },
  ],
  stats: [
    { label: "Lighthouse", value: "95+", icon: Gauge },
    { label: "Projects", value: "10+", icon: FolderGit2 },
  ],
  primary: { href: "/contact", label: "Get in touch", ariaLabel: "Open contact page" },
  secondary: { href: "/cv/MuratZorlu-CV.pdf", label: "Download CV", ariaLabel: "Download CV", download: true },
} as const;
