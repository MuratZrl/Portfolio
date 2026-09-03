// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page. The
// group titles live in messages under `home.stack.groups.<key>`; only the
// proper-noun skill names are data.

import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    key: "languages",
    skills: [
      { name: "TypeScript" },
      { name: "Go" },
      { name: "Next.js" },
      { name: "React" },
      { name: "NestJS" },
      { name: "Node.js" },
    ],
  },
  {
    key: "interface",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Material UI" },
      { name: "Zustand" },
      { name: "TanStack React Query" },
    ],
  },
  {
    key: "data",
    skills: [
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Supabase" },
      { name: "Redis" },
      { name: "Socket.io" },
      { name: "REST API" },
      { name: "JWT / OAuth" },
      { name: "Stripe" },
    ],
  },
  {
    key: "build",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
      { name: "Railway" },
      { name: "Jest" },
      { name: "Playwright" },
    ],
  },
] satisfies readonly Group[];
