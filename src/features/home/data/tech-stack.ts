// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page.

import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    title: "Languages and frameworks",
    skills: [
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "React" },
      { name: "NestJS" },
      { name: "Node.js" },
    ],
  },
  {
    title: "Interface and state",
    skills: [
      { name: "Tailwind CSS" },
      { name: "Material UI" },
      { name: "Zustand" },
      { name: "TanStack React Query" },
    ],
  },
  {
    title: "Data and infrastructure",
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
    title: "Build, deploy, test",
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
