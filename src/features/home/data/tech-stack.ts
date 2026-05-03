// src/features/home/data/tech-stack.ts
// Single source of truth for TechStack groups used on the Home page.

import { Code2, Palette, Database, Wrench } from "lucide-react";
import type { Group } from "@/features/home/types/tech-stack";

export const DEFAULT_GROUPS = [
  {
    title: "Languages & Frameworks",
    icon: Code2,
    skills: [
      { name: "TypeScript", hint: "strict, generics, utility types" },
      { name: "Next.js", hint: "App Router, RSC, Server Actions" },
      { name: "React", hint: "hooks, suspense, context" },
      { name: "NestJS", hint: "modules, guards, interceptors" },
      { name: "Node.js", hint: "Express, streams, workers" },
    ],
  },
  {
    title: "UI & Styling",
    icon: Palette,
    skills: [
      { name: "Tailwind CSS", hint: "utility-first, design tokens" },
      { name: "Material UI", hint: "theming, sx prop, custom variants" },
      { name: "Framer Motion", hint: "page transitions, gestures" },
      { name: "Zustand", hint: "lightweight state management" },
      { name: "TanStack React Query", hint: "server state, caching" },
    ],
  },
  {
    title: "Data & Infrastructure",
    icon: Database,
    skills: [
      { name: "PostgreSQL", hint: "indexes, JSONB, CTE, RLS" },
      { name: "Prisma", hint: "schema-first, migrations" },
      { name: "Supabase", hint: "Auth, Realtime, RLS, Storage" },
      { name: "Redis", hint: "caching, rate limiting, pub/sub" },
      { name: "Socket.io", hint: "rooms, namespaces, events" },
      { name: "REST API", hint: "design, integrations" },
      { name: "JWT / OAuth", hint: "auth flows, RBAC" },
      { name: "Stripe", hint: "payments, subscriptions, webhooks" },
    ],
  },
  {
    title: "DevOps & Testing",
    icon: Wrench,
    skills: [
      { name: "Docker", hint: "compose, multi-stage, networking" },
      { name: "Git", hint: "rebase, cherry-pick, worktrees" },
      { name: "GitHub Actions", hint: "CI/CD pipelines" },
      { name: "Vercel", hint: "frontend hosting, edge functions" },
      { name: "Railway", hint: "backend hosting, databases" },
      { name: "Jest", hint: "unit testing" },
      { name: "Playwright", hint: "E2E, trace viewer" },
    ],
  },
] satisfies readonly Group[];
