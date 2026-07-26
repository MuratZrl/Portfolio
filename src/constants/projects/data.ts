// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/szmetal-admin-panel",
    title: "SZMetal Admin Panel",
    summary:
      "Custom admin dashboard for a metal manufacturer: product catalog, client management, role-based access (Admin/Manager/User) enforced via Postgres RLS, MUI X analytics charts, live notifications and user presence via Supabase Realtime, and in-browser PDF drawing previews.",
    cardSummary:
      "Custom admin dashboard for a metal manufacturer: product catalog, client management, RLS roles, and live Realtime updates.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "MUI"],
    category: "Full-Stack",
    sector: "metal",
    sectorLabel: "Metal manufacturing",
    withheld: { rows: 3, reason: "Withheld: this is SZMetal's operations data." },
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/szmetal-admin-panel.png", alt: "SZMetal admin panel dashboard" },
    gallery: [
      { src: "/images/projects/szmetal-dashboard.png", alt: "SZMetal dashboard with exchange rates, activity feed and charts" },
      { src: "/images/projects/szmetal-users.png", alt: "SZMetal user management with role and status controls" },
    ],
    links: {
      repo: { href: "#", label: "Private repo", isPrivate: true },
    },
    featured: true,
    order: 1,
    createdAt: "2025-07-22",
  },
  {
    slug: "/projects/yenigunemlak",
    title: "Yenigün Emlak",
    summary:
      "Real estate platform for a client: map-based property search with Google Maps, a full admin panel (listing CRUD with image/video upload, customer and category management, statistics dashboard), and a Google Search Console integration that pulls and caches six analytics queries via a service-account API route. Built with Next.js App Router, ISR, and per-listing dynamic SEO metadata.",
    cardSummary:
      "Real estate platform with Google Maps property search, a full admin panel, and a Google Search Console analytics integration.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Google Maps", "Axios", "JWT Auth"],
    category: "Full-Stack",
    sector: "property",
    sectorLabel: "Real estate",
    caption: "The public site is live. The admin panel behind it isn't.",
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/yenigunemlak.png", alt: "Yenigün Emlak property listings with map search" },
    gallery: [
      { src: "/images/projects/yenigun-istatistik.png", alt: "Yenigun Emlak analytics panel showing Search Console CTR, queries and country breakdown" },
    ],
    links: {
      demo: { href: "https://yenigunemlak.com", label: "Live" },
      repo: { href: "#", label: "Private repo", isPrivate: true },
    },
    featured: true,
    order: 2,
    createdAt: "2025-11-26",
  },
  {
    slug: "/projects/ticimax-dashboard",
    title: "Ticimax Dashboard",
    summary:
      "Ticimax e-commerce sync engine and admin dashboard: realtime supplier scraping with Puppeteer, a Supabase backend, and live sync progress monitoring built on Next.js App Router.",
    cardSummary:
      "Ticimax e-commerce sync engine + admin dashboard: realtime supplier scraping and live sync progress monitoring.",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Puppeteer", "Tailwind CSS"],
    category: "Full-Stack",
    sector: "commerce",
    sectorLabel: "E-commerce",
    withheld: { rows: 3, reason: "Withheld: supplier data for an e-commerce client." },
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/ticimax-dashboard.png", alt: "Ticimax sync dashboard" },
    links: {
      repo: { href: "#", label: "Private repo", isPrivate: true },
    },
    featured: true,
    order: 3,
    createdAt: "2026-03-30",
  },
  {
    slug: "/projects/teamboard",
    title: "TeamBoard",
    summary:
      "Multi-tenant project management SaaS with kanban boards, team workspaces, and Stripe subscription billing.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    category: "Full-Stack",
    sector: "personal",
    sectorLabel: "Personal project",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/teamboard.png", alt: "TeamBoard kanban dashboard" },
    links: {
      demo: { href: "https://teamboard-web.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/teamboard", label: "Repo" },
    },
    featured: true,
    order: 4,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/pulsechat",
    title: "PulseChat",
    summary:
      "Real-time chat platform with WebSocket messaging, multi-room channels, and 10+ live features powered by Redis pub/sub.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Socket.io"],
    category: "Full-Stack",
    sector: "personal",
    sectorLabel: "Personal project",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/pulsechat.png", alt: "PulseChat real-time chat interface" },
    links: {
      demo: { href: "https://pulsechat-plum.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/pulsechat", label: "Repo" },
    },
    featured: true,
    order: 5,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/api-gateway",
    title: "API Gateway",
    summary:
      "A production-shaped API Gateway written in Go, built around a composable middleware chain. Handles reverse proxying to upstream services with round-robin load balancing, Redis-backed rate limiting and response caching, JWT and API-key authentication, a circuit breaker for failing upstreams, automatic retries, request/response transforms, IP filtering, and body validation. Fully containerized with Docker Compose and instrumented with Prometheus metrics and Grafana dashboards. Covered by integration tests, including a test that proves round-robin distribution across two service replicas.",
    cardSummary:
      "Feature-rich API Gateway in Go with a middleware-based architecture — reverse proxy, rate limiting, auth, circuit breaking, and load balancing.",
    metaDescription:
      "API Gateway in Go: a middleware chain doing reverse proxy, Redis-backed rate limiting and caching, JWT auth, circuit breaking and round-robin load balancing.",
    tags: ["Go", "Redis", "Docker", "Docker Compose", "Prometheus", "Grafana", "JWT"],
    category: "Backend",
    sector: "personal",
    sectorLabel: "Personal project",
    caption: "Self-hosted service, so there is nothing to link a demo at. The repo is the artifact.",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/api-gateway.png", alt: "API Gateway Grafana dashboard showing request throughput and upstream latency" },
    links: {
      repo: { href: "https://github.com/MuratZrl/api-gateway", label: "Repo" },
    },
    technicalDecisions: [
      {
        title: "A middleware chain, not one request handler",
        body: "Every gateway concern — auth, rate limiting, caching, circuit breaking, retries, transforms, IP filtering, body validation — is its own middleware rather than a branch inside a single proxy handler. A route runs only the layers it enables, and a new concern lands as a new layer instead of an edit to shared control flow. The cost is an explicit ordering contract between layers; the payoff is that each one is tested on its own.",
      },
      {
        title: "Redis for rate limiting and caching, not in-process state",
        body: "Rate limit counters and cached responses live in Redis instead of the gateway's own memory. In-process state is faster and drops a dependency, but it makes the gateway stateful: two replicas would each enforce their own share of the limit and each hold their own cache. Redis keeps the gateway horizontally scalable at the cost of one network hop per request.",
      },
      {
        title: "A circuit breaker in front of the retries",
        body: "A failing upstream is retried automatically, but the retry sits behind a circuit breaker rather than standing alone. Retries on their own amplify load on exactly the service that is already struggling; the breaker bounds that by failing fast while the upstream recovers, then letting traffic back through once it does.",
      },
      {
        title: "Load balancing proved by a test, not by inspection",
        body: "Round-robin distribution is covered by an integration test that runs two replicas of the same upstream and asserts requests reach both. It is a property that is easy to claim and easy to get silently wrong, because a single-replica test passes either way. CI runs the suite alongside golangci-lint on every push.",
      },
    ],
    featured: true,
    order: 6,
    createdAt: "2026-03-26",
  },
] as const;
