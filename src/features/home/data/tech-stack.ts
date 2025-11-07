// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page.

import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", level: 90, hint: "RSC, Server Actions, Route Handlers" },
      { name: "TypeScript", level: 90, hint: "strict, generics, utility types" },
      { name: "Shadcn UI", level: 85, hint: "primitives, composable API" },
      { name: "Tailwind CSS", level: 85, hint: "utility-first, design tokens" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Server Actions", level: 80 },
      { name: "PostgreSQL", level: 75, hint: "indexes, JSONB, CTE" },
      { name: "Prisma", level: 75, hint: "schema-first, migrations" },
      { name: "Auth (session/JWT)", level: 70 },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { name: "ESLint", level: 85, hint: "rules, perf, CI fail-fast" },
      { name: "Prettier", level: 90 },
      { name: "Turborepo", level: 70, hint: "caching, pipelines" },
      { name: "Vite", level: 70 },
    ],
  },
  {
    title: "Testing & Quality",
    skills: [
      { name: "Playwright", level: 70, hint: "e2e, trace viewer" },
      { name: "Vitest", level: 75, hint: "unit, mock, coverage" },
      { name: "Lighthouse", level: 85, hint: "PWA, perf budgets" },
      { name: "Axe (A11y)", level: 80 },
    ],
  },
] satisfies readonly Group[];

// Optional re-export for convenience if you prefer single-import style.
// export type { Group, Skill, TechStackProps } from "@/features/home/types/tech-stack";
