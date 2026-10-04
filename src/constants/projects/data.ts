// src/constants/projects/data.ts
import type { Project } from "./types";

/**
 * Paid client work first (order 1-4), then personal builds (5-7). The two
 * demo sites that used to lead this array are gone from it: they are sample
 * sites rather than projects, and they now live on /ornekler, which is
 * written in Turkish for the shop owner they were built to convince.
 * /projects/salon-aura and /projects/cafe-kavella redirect there (see the
 * redirects block in next.config.ts), so the URLs they were indexed under
 * still land somewhere that shows the site.
 *
 * `featured: false` is the flag the home page strip reads via
 * getFeaturedProjects(). Nothing carries it today. The copy around that strip
 * does not need editing when this array changes: every count in it is derived
 * from these entries through getProjectStats().
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/yurtsever-emlak",
    title: "Yurtsever Emlak",
    summary:
      "Brand site for a real estate agency running five offices across Tuzla and Maltepe in Istanbul. Every office has its own page carrying the address, the phone numbers, opening hours and an embedded map, and each of those fields is nullable in the data model: an office whose address has not been verified renders no address block and no map rather than a placeholder standing in for one. The home page pulls featured videos from the agency's own YouTube channel. Listings are not duplicated here. They stay in the agency's sahibinden store, which the site links out to. The contact form takes KVKK consent before it will send and posts through Resend, behind a signed opening timestamp and a honeypot, so a submission that arrives within three seconds or fills the hidden field never reaches the mail API. A floating WhatsApp button appears once the hero's own button scrolls out of view, because that is where this agency already answers. Live since September 2026 and indexed in Search Console.",
    cardSummary:
      "Brand site for a real estate agency with five offices in Tuzla and Maltepe: office pages with maps, team and about pages, featured YouTube videos, and a KVKK-gated contact form that sends through Resend.",
    metaDescription:
      "Brand site for a real estate agency with five offices in Tuzla and Maltepe. Office pages with maps, YouTube videos and a KVKK-gated contact form via Resend.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    category: "Business site",
    sector: "property",
    sectorLabel: "Real estate",
    caption: "The whole site is public. The screenshot is the live home page.",
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/yurtsever-emlak.png", alt: "Yurtsever Emlak home page: the Tuzla headline and WhatsApp button beside office photographs, with the five office names along the foot" },
    links: {
      demo: { href: "https://yurtseveremlak.com", label: "Live" },
      repo: { href: "#", label: "Private repo", isPrivate: true },
    },
    featured: true,
    order: 1,
    createdAt: "2026-09-05",
  },
  {
    slug: "/projects/szmetal-admin-panel",
    title: "SZMetal Admin Panel",
    summary:
      "Custom admin dashboard for a metal manufacturer: product catalog, client management, role-based access (Admin/Manager/User) enforced via Postgres RLS, MUI X analytics charts, live notifications and user presence via Supabase Realtime, and in-browser PDF drawing previews.",
    cardSummary:
      "Custom admin dashboard for a metal manufacturer: product catalog, client management, RLS roles, and live Realtime updates.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "MUI"],
    category: "Ops dashboard",
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
    order: 2,
    createdAt: "2025-07-22",
  },
  {
    slug: "/projects/yenigunemlak",
    title: "Yenigün Emlak",
    summary:
      "Next.js frontend for a real estate agency, built against a REST API owned by another developer on the project. This repo holds no database: every call is rewritten to that API and goes out through one axios client. Property search runs on Google Maps, with filters for location and category. Behind a cookie-gated login sit the admin screens for listings, customers, categories and statistics, each of them driving the same external API. The server-side piece that does belong here is a Google Search Console route: it authenticates with a service account, fires six analytics queries in parallel and holds the result in memory for an hour. Listing pages render per request rather than from a cache and generate their own SEO metadata; the home page data is revalidated on a timer instead.",
    cardSummary:
      "Next.js frontend for a real estate agency, built against another developer's REST API. Google Maps search, admin screens for listings and customers, and a cached Search Console route.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Google Maps", "Axios", "Search Console"],
    category: "Frontend build",
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
    order: 3,
    createdAt: "2025-11-26",
  },
  {
    slug: "/projects/ticimax-dashboard",
    title: "Ticimax Dashboard",
    summary:
      "Sync engine and admin dashboard for a Ticimax storefront. Supplier stock arrives as an XML feed over a plain HTTPS request and is parsed into a flat product list, then written back to Ticimax through hand-rolled SOAP envelopes with a few hundred milliseconds between calls. The engine is CommonJS under lib/sync and the dashboard spawns it as a detached child process, which keeps it out of the Next.js bundle and its dependencies out of the build. Each run writes its progress to Supabase and the dashboard subscribes to postgres_changes, so a sync in flight is visible while it happens rather than after it finishes. Scheduling comes from Railway's scheduled jobs.",
    cardSummary:
      "Sync engine and admin dashboard for a Ticimax store. Supplier stock comes in as an XML feed and goes back out over SOAP, with run progress streaming into the dashboard over Supabase Realtime.",
    tags: ["Next.js 16", "TypeScript", "Supabase", "SOAP", "Tailwind CSS"],
    category: "Ops dashboard",
    sector: "commerce",
    sectorLabel: "E-commerce",
    withheld: { rows: 3, reason: "Withheld: supplier data for an e-commerce client." },
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/ticimax-dashboard.png", alt: "Ticimax sync dashboard" },
    links: {
      repo: { href: "#", label: "Private repo", isPrivate: true },
    },
    featured: true,
    order: 4,
    createdAt: "2026-03-30",
  },
  {
    slug: "/projects/teamboard",
    title: "TeamBoard",
    summary:
      "Multi-tenant project management SaaS with kanban boards, team workspaces, and Stripe subscription billing.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    category: "Product app",
    sector: "personal",
    sectorLabel: "Personal project",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/teamboard.png", alt: "TeamBoard kanban dashboard" },
    links: {
      demo: { href: "https://teamboard-web.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/teamboard", label: "Repo" },
    },
    featured: true,
    order: 5,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/pulsechat",
    title: "PulseChat",
    summary:
      "Real-time chat platform with WebSocket messaging, multi-room channels, and 10+ live features powered by Redis pub/sub.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Socket.io"],
    category: "Product app",
    sector: "personal",
    sectorLabel: "Personal project",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/pulsechat.png", alt: "PulseChat real-time chat interface" },
    links: {
      demo: { href: "https://pulsechat-plum.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/pulsechat", label: "Repo" },
    },
    featured: true,
    order: 6,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/api-gateway",
    title: "API Gateway",
    summary:
      "An API Gateway written in Go, built as a chain of middleware rather than one request handler. It reverse-proxies to upstream services and spreads traffic across their replicas round-robin. Redis holds the rate limit counters and the response cache. Authentication takes a JWT or an API key. A circuit breaker isolates failing upstreams, failed requests are retried automatically, and the rest of the chain covers request and response transforms, IP filtering and body validation. The stack runs under Docker Compose, with Prometheus scraping metrics into Grafana dashboards and traces leaving over OTLP through OpenTelemetry. Request logs land in MongoDB, which also holds the route table that an admin API lists, adds to and deletes from while the gateway is running, so an upstream can be repointed without a redeploy. Nine of the twelve middleware carry their own test file and fourteen test files cover the gateway in total, including one that runs two replicas of the same service and fails unless both serve an even share of the requests.",
    cardSummary:
      "API Gateway in Go. Auth, rate limiting, caching, retries and circuit breaking each sit in the middleware chain; what survives is round-robined to an upstream replica.",
    metaDescription:
      "API Gateway in Go. A middleware chain handles reverse proxying, Redis-backed rate limiting and caching, JWT auth, circuit breaking and round-robin balancing.",
    tags: ["Go", "Redis", "Docker", "Docker Compose", "Prometheus", "Grafana", "JWT"],
    category: "Infrastructure",
    sector: "personal",
    sectorLabel: "Personal project",
    badge: { label: "Personal project", variant: "muted" },
    image: { src: "/images/projects/api-gateway.png", alt: "API Gateway Grafana dashboard showing request throughput and upstream latency" },
    links: {
      repo: { href: "https://github.com/MuratZrl/api-gateway", label: "Repo" },
    },
    technicalDecisions: [
      {
        title: "One middleware per concern",
        body: "Auth, rate limiting, caching, circuit breaking, retries, transforms, IP filtering and validation are each their own middleware, not branches inside a single proxy handler. Ordering between them becomes an explicit contract you have to get right. In exchange every layer has its own test file.",
      },
      {
        title: "Rate limit counters live in Redis",
        body: "Counters and cached responses sit in Redis rather than the gateway's own memory. That costs a network hop per request. Keeping them in process would avoid the hop and drop a dependency, but it would also make the gateway stateful: run two replicas and each one enforces its own separate share of the limit, against its own separate cache.",
      },
      {
        title: "A circuit breaker in front of the retries",
        body: "Failed requests are retried automatically, but the retry sits behind a circuit breaker. Retrying on its own amplifies load on the service that is already in trouble. Once failures cross the threshold the breaker opens and requests fail fast, and it half-opens later to test whether the upstream came back before closing again.",
      },
      {
        title: "The round-robin claim has a test behind it",
        body: "Six requests go through two replicas of the same upstream, and the test fails unless both replicas served exactly three. It also rejects any response that came out of the cache, because a cached response never reaches an upstream and would not count toward either replica. CI runs this on pushes and pull requests to main, alongside golangci-lint.",
      },
    ],
    featured: true,
    order: 7,
    createdAt: "2026-03-26",
  },
] as const;
