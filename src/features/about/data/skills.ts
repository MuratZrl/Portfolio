// src/features/about/data/skills.ts
import type { Group, Lang, Cert } from "@/features/about/types";

export const SKILL_GROUPS: readonly Group[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "TypeScript", level: 93, hint: "strict mode, generics, discriminated unions, utility types" },
      { name: "React.js", level: 89, hint: "hooks, context, Suspense/Concurrent features, memoization" },
      { name: "Next.js (RSC + SA)", level: 85, hint: "RSC, Server Actions, Route Handlers, caching/ISR, revalidation" },
      { name: "Tailwind CSS", level: 84, hint: "design tokens, responsive/variant utilities, dark mode, @layer composition" },
      { name: "MUI", level: 82, hint: "theme overrides, sx system, styled engine, slot props" },
      { name: "Shadcn UI", level: 81, hint: "Radix primitives, accessibility, composition patterns, variant props" },
      { name: "Ant Design", level: 81, hint: "Form & Table components, design tokens, theming, compact spacing" },
      { name: "Redux", level: 80, hint: "Redux Toolkit, RTK Query, Immer, entity normalization" },
    ],
    note: "Product-focused component design with accessibility and performance first.",
  },
  {
    id: "backend",
    title: "Backend",
    icon: "database",
    note: "Keep it simple. Fewer dependencies, higher productivity.",
    skills: [
      { name: "Node.js", level: 86, hint: "async I/O, streams, worker_threads, performance profiling" },
      { name: "Next.js Server Actions", level: 80, hint: "mutations, optimistic updates, cache tags, revalidatePath" },
      { name: "PostgreSQL", level: 77, hint: "indexes, EXPLAIN/ANALYZE, transactions, JSONB" },
      { name: "Supabase", level: 76, hint: "RLS policies, Auth, Storage, Edge Functions" },
      { name: "Prisma", level: 75, hint: "schema-first, migrations, data modeling" },
      { name: "Redis (Caching & KV)", level: 74, hint: "cache invalidation, rate limiting, sessions" },
      { name: "Queues & Jobs", level: 73, hint: "BullMQ, retries/backoff, scheduled jobs" },
      { name: "Auth & Security", level: 70, hint: "session/JWT, OAuth, roles/permissions, CSRF" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    icon: "wrench",
    note: "Fast feedback loops, reproducible builds, CI-first.",
    skills: [
      { name: "Prettier", level: 92, hint: "opinionated formatting, plugins, pre-commit integration" },
      { name: "ESLint", level: 88, hint: "flat config, custom rules, performance, CI cache" },
      { name: "pnpm", level: 86, hint: "workspaces, isolated store, monorepo linking" },
      { name: "Turborepo", level: 80, hint: "remote cache, pipeline graph, parallelism" },
      { name: "GitHub Actions", level: 78, hint: "matrix builds, caches, OIDC deployments" },
      { name: "SWC", level: 75, hint: "transpile and minify, Next compiler integration" },
      { name: "Vite", level: 74, hint: "fast dev server, HMR, library mode" },
      { name: "Docker", level: 72, hint: "multi-stage builds, slim images" },
      { name: "Webpack", level: 70, hint: "code splitting, loaders, tree shaking" },
    ],
  },
  {
    id: "quality",
    title: "Quality",
    icon: "shield",
    note: "Allow failures in CI so issues fall before they hit prod.",
    skills: [
      { name: "Lighthouse", level: 86, hint: "performance budgets, PWA audits, CI assertions" },
      { name: "Testing Library", level: 82, hint: "user-event, role-based queries, a11y-first assertions" },
      { name: "Axe (A11y)", level: 82, hint: "WCAG 2.2 checks, contrast, landmark roles" },
      { name: "Vitest", level: 80, hint: "unit tests, mocks/spies, coverage thresholds" },
      { name: "MSW", level: 80, hint: "API mocking, request handlers, test isolation" },
      { name: "Playwright", level: 78, hint: "e2e flows, auto-wait, traces, fixtures" },
      { name: "Sentry", level: 76, hint: "release health, performance traces, source maps" },
      { name: "Chromatic", level: 72, hint: "visual regression, PR checks, Storybook publish" },
      { name: "Playwright Snapshots", level: 70, hint: "image diffs, threshold tuning, flaky control" },
      { name: "OpenTelemetry", level: 60, hint: "traces/metrics, Web Vitals correlation" },
    ],
  },
] as const;

export const LANGUAGE_LIST: readonly Lang[] = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "B2" },
  { name: "Spanish", level: "B1" },
] as const;

export const CERT_LIST: readonly Cert[] = [
  { title: "Web Accessibility (A11y) Principles", org: "Independent Study", year: "2024" },
] as const;
