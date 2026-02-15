// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page.

import { Layout, Server, Wrench, TestTube } from "lucide-react";
import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", level: 90, hint: "hooks, context, suspense" },
      { name: "Next.js", level: 90, hint: "RSC, Server Actions, Route Handlers" },
      { name: "TypeScript", level: 90, hint: "strict, generics, utility types" },
      { name: "Tailwind CSS", level: 85, hint: "utility-first, design tokens" },
      { name: "Shadcn UI", level: 85, hint: "primitives, composable API" },
      { name: "MUI", level: 80, hint: "theming, sx prop, custom variants" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 85, hint: "Express, Fastify, streams" },
      { name: "Supabase", level: 85, hint: "Auth, Realtime, RLS, Storage" },
      { name: "Server Actions", level: 80 },
      { name: "PostgreSQL", level: 75, hint: "indexes, JSONB, CTE" },
      { name: "Prisma", level: 75, hint: "schema-first, migrations" },
      { name: "Auth (session/JWT)", level: 70 },
    ],
  },
  {
    title: "Tooling",
    icon: Wrench,
    skills: [
      { name: "Git", level: 90, hint: "rebase, cherry-pick, worktrees" },
      { name: "ESLint", level: 85, hint: "rules, perf, CI fail-fast" },
      { name: "Prettier", level: 90 },
      { name: "Docker", level: 65, hint: "compose, multi-stage builds" },
      { name: "Turborepo", level: 70, hint: "caching, pipelines" },
      { name: "Vite", level: 70 },
    ],
  },
  {
    title: "Testing & Quality",
    icon: TestTube,
    skills: [
      { name: "Lighthouse", level: 85, hint: "PWA, perf budgets" },
      { name: "Axe (A11y)", level: 80 },
      { name: "Vitest", level: 75, hint: "unit, mock, coverage" },
      { name: "Playwright", level: 70, hint: "e2e, trace viewer" },
    ],
  },
] satisfies readonly Group[];
