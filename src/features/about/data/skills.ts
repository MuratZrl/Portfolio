// src/features/about/data/skills.ts
import type { Group, Lang, Cert } from "@/features/about/types";

export const SKILL_GROUPS: readonly Group[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    note: "Component-driven UI with type safety, accessibility, and performance.",
    skills: [
      { name: "Next.js", level: 92, hint: "App Router, RSC, Server Actions, ISR, caching" },
      { name: "React", level: 90, hint: "hooks, Suspense, context, memoization" },
      { name: "TypeScript", level: 90, hint: "strict mode, generics, discriminated unions" },
      { name: "Tailwind CSS", level: 88, hint: "utility-first, design tokens, dark mode" },
      { name: "shadcn/ui", level: 85, hint: "Radix primitives, composable, accessible" },
      { name: "MUI", level: 80, hint: "theming, sx prop, custom variants" },
      { name: "React Hook Form", level: 82, hint: "Zod resolvers, field arrays, validation" },
      { name: "Framer Motion", level: 75, hint: "layout animations, gestures, variants" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    note: "API design, real-time systems, and microservice architecture.",
    skills: [
      { name: "NestJS", level: 88, hint: "modules, guards, interceptors, pipes" },
      { name: "Node.js", level: 85, hint: "async I/O, streams, worker threads" },
      { name: "Go", level: 70, hint: "middleware, reverse proxy, goroutines" },
      { name: "Socket.io", level: 80, hint: "rooms, namespaces, real-time events" },
      { name: "REST API Design", level: 85, hint: "versioning, pagination, error handling" },
      { name: "SOAP Integration", level: 75, hint: "WSDL, XML, third-party sync" },
      { name: "JWT / OAuth", level: 80, hint: "auth flows, RBAC, refresh tokens" },
      { name: "Rate Limiting / Circuit Breaker", level: 75, hint: "Redis-backed, fail-safe patterns" },
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    icon: "database",
    note: "Data modeling, caching strategies, and real-time subscriptions.",
    skills: [
      { name: "PostgreSQL", level: 85, hint: "indexes, JSONB, CTE, RLS policies" },
      { name: "Supabase", level: 85, hint: "Auth, Realtime, RLS, Storage, Edge Functions" },
      { name: "Redis", level: 78, hint: "caching, rate limiting, pub/sub, sessions" },
      { name: "Prisma", level: 80, hint: "schema-first, migrations, relations" },
    ],
  },
  {
    id: "tooling",
    title: "DevOps & Tooling",
    icon: "wrench",
    note: "Containerized workflows, automation, and CI/CD.",
    skills: [
      { name: "Docker", level: 80, hint: "Compose, multi-stage builds, networking" },
      { name: "Git", level: 90, hint: "rebase, cherry-pick, worktrees, bisect" },
      { name: "Puppeteer", level: 75, hint: "web scraping, automation, headless Chrome" },
      { name: "Stripe", level: 70, hint: "payments, subscriptions, webhooks" },
      { name: "ESLint / Prettier", level: 88, hint: "flat config, pre-commit, CI cache" },
      { name: "Playwright", level: 70, hint: "E2E testing, auto-wait, traces" },
      { name: "GitHub Actions", level: 75, hint: "matrix builds, caches, deployments" },
    ],
  },
] as const;

export const LANGUAGE_LIST: readonly Lang[] = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "B2" },
  { name: "German", level: "A2" },
] as const;

export const CERT_LIST: readonly Cert[] = [
  { title: "React & Next.js Advanced Patterns", org: "Udemy", year: "2024" },
  { title: "TypeScript Masterclass", org: "Udemy", year: "2023" },
] as const;
