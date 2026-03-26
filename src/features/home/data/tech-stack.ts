// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page.

import { Layout, Server, Wrench, Database } from "lucide-react";
import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "Next.js", level: 92, hint: "App Router, RSC, Server Actions" },
      { name: "React", level: 90, hint: "hooks, suspense, context" },
      { name: "TypeScript", level: 90, hint: "strict, generics, utility types" },
      { name: "Tailwind CSS", level: 88, hint: "utility-first, design tokens" },
      { name: "shadcn/ui", level: 85, hint: "Radix primitives, composable" },
      { name: "MUI", level: 80, hint: "theming, sx prop, custom variants" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "NestJS", level: 88, hint: "modules, guards, interceptors" },
      { name: "Node.js", level: 85, hint: "Express, streams, workers" },
      { name: "Go", level: 70, hint: "middleware, reverse proxy, concurrency" },
      { name: "Socket.io", level: 80, hint: "rooms, namespaces, events" },
      { name: "REST / SOAP", level: 85, hint: "API design, integrations" },
      { name: "JWT / OAuth", level: 80, hint: "auth flows, RBAC" },
    ],
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85, hint: "indexes, JSONB, CTE, RLS" },
      { name: "Supabase", level: 85, hint: "Auth, Realtime, RLS, Storage" },
      { name: "Redis", level: 78, hint: "caching, rate limiting, pub/sub" },
      { name: "Prisma", level: 80, hint: "schema-first, migrations" },
    ],
  },
  {
    title: "DevOps & Tooling",
    icon: Wrench,
    skills: [
      { name: "Docker", level: 80, hint: "compose, multi-stage, networking" },
      { name: "Git", level: 90, hint: "rebase, cherry-pick, worktrees" },
      { name: "Puppeteer", level: 75, hint: "web scraping, automation" },
      { name: "Stripe", level: 70, hint: "payments, subscriptions, webhooks" },
      { name: "ESLint / Prettier", level: 88, hint: "rules, CI fail-fast" },
      { name: "Playwright", level: 70, hint: "e2e, trace viewer" },
    ],
  },
] satisfies readonly Group[];
