// src/features/about/data/faq.ts
import type { QA } from "@/features/about/types";

export const FAQ_ITEMS: readonly QA[] = [
  // ── Process ──
  {
    question: "How does the project process work?",
    answer:
      "Discovery → Skeleton → Development → Validation → Release. After each phase, we do a brief review and iterate in small steps.",
    category: "Process",
  },
  {
    question: "Do you set up CI/CD?",
    answer:
      "Yes. GitHub Actions to lint, type-check, test, build, and upload artifacts. Only green main can deploy; PRs get preview URLs.",
    category: "Process",
  },
  {
    question: "How do you communicate during the project?",
    answer:
      "Weekly checkpoints, async status updates, clear acceptance criteria, and a shared backlog for scope and priorities.",
    category: "Process",
  },
  {
    question: "How do you estimate timelines?",
    answer:
      "I break features into small, shippable slices and estimate per slice. Buffer is built in for unknowns. We re-evaluate scope weekly.",
    category: "Process",
  },

  // ── Quality ──
  {
    question: "What are your performance targets?",
    answer:
      "Lighthouse 90+ and LCP around 1.5s. I apply image optimization, preload/prefetch, and cache-aware data flows.",
    category: "Quality",
  },
  {
    question: "What's the scope of accessibility (A11y)?",
    answer:
      "WCAG checks, keyboard navigation, visible focus rings, sufficient contrast. Automated with Axe where possible.",
    category: "Quality",
  },
  {
    question: "How do you handle SEO basics?",
    answer:
      "Semantic HTML, Metadata API for titles and meta, sitemap/robots, OG/Twitter cards, canonical tags, clean URLs, and CLS prevention.",
    category: "Quality",
  },
  {
    question: "What security practices do you follow?",
    answer:
      "HTTPS, security headers, sanitized inputs, CSRF awareness on mutations, secrets in envs, RLS in the DB, and dependency audits.",
    category: "Quality",
  },

  // ── Technical ──
  {
    question: "What's your approach to Next.js architecture?",
    answer:
      "RSC and Server Actions first. Simple data layer, low dependency count, and component composition.",
    category: "Technical",
  },
  {
    question: "What is your testing strategy?",
    answer:
      "Unit tests for utilities, component tests with React Testing Library, and critical E2E flows with Playwright running in CI.",
    category: "Technical",
  },
  {
    question: "How do you deal with errors and monitoring?",
    answer:
      "Typed guards and error boundaries on the client, consistent API error shapes on the server, structured logs, and monitoring via Sentry/Log drains.",
    category: "Technical",
  },
  {
    question: "How do you cache and revalidate data?",
    answer:
      "ISR for static-ish routes, tag-based revalidation for targeted updates, SWR patterns for client hydration, and proper cache headers.",
    category: "Technical",
  },
  {
    question: "How do you design APIs?",
    answer:
      "Route Handlers with small RESTful endpoints returning JSON. I use Zod for input/output schemas and keep endpoints versionable when needed.",
    category: "Technical",
  },
  {
    question: "How do you handle authentication and authorization?",
    answer:
      "Supabase Auth for sessions, RLS policies for row-level access, server-side checks in RSC, and protected routes/components.",
    category: "Technical",
  },
  {
    question: "What about forms and validation?",
    answer:
      "React Hook Form + Zod for schema-first validation, accessible inputs, server actions for mutations, and optimistic UX when safe.",
    category: "Technical",
  },
  {
    question: "How do you approach styling and components?",
    answer:
      "Tailwind for utility-first styles and shadcn/ui for accessible primitives. Tokens, responsive rules, and a consistent design language.",
    category: "Technical",
  },
  {
    question: "Do you use a monorepo or single repo?",
    answer:
      "Depends on project size. For multi-package setups I use pnpm workspaces + Turborepo. For smaller projects a single repo with clear feature folders.",
    category: "Technical",
  },

  // ── Delivery ──
  {
    question: "How do revisions and delivery work?",
    answer:
      "We agree on acceptance criteria. A QA pass before delivery, then a small revision window. I also add documentation.",
    category: "Delivery",
  },
  {
    question: "Where do you deploy and host?",
    answer:
      "Vercel with preview deployments per PR, production protected by checks, custom domain and SSL by default, edge when it brings real value.",
    category: "Delivery",
  },
  {
    question: "What happens after launch?",
    answer:
      "Stabilization window for fixes, dependency bumps, and monitoring. We define a lightweight maintenance plan or SLA if required.",
    category: "Delivery",
  },
] as const;
