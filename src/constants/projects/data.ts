// src/constants/projects/data.ts
import type { Project } from "./types";

/**
 * Listing order is client-acquisition order, not chronology. The two demo
 * sites for small businesses lead (order 1-2): the primary audience of
 * /projects is a business owner who wants a website, and the first thing they
 * see should look like the thing they came for. Client dashboards follow
 * (3-5), then personal builds (6-8). Recruiters scroll.
 *
 * The demos carry `featured: false`, which is the flag the home page strip
 * reads via getFeaturedProjects(). Drop the flag to put them on `/` as well;
 * that page's copy still describes the client trio and would need rewriting.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/salon-aura",
    title: "Aura Güzellik Stüdyosu",
    summary:
      "Demo site for a beauty salon, built to show a small business what it would get. One page in Turkish and English, with booking routed through WhatsApp: the button opens a chat with the salon, so requests land where the owner already answers customers. Three colour themes switch from the header, and the visitor's language and theme choices persist between visits. Sections animate in on scroll and stay still for anyone who has asked for reduced motion. On phones a sticky bar keeps the WhatsApp booking button on screen the whole way down. Vanilla HTML, CSS and JavaScript with zero dependencies: one stylesheet and one script beside the markup, no framework, no build step, deployed as static files.",
    cardSummary:
      "One-page salon site with WhatsApp booking, three colour themes, a TR/EN toggle and a sticky booking bar on phones. Vanilla HTML, CSS and JS, zero dependencies.",
    metaDescription:
      "Demo salon site: WhatsApp booking, three colour themes, TR/EN toggle, scroll animations and a sticky mobile booking bar. Vanilla HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "WhatsApp", "i18n"],
    category: "Website",
    sector: "demo",
    sectorLabel: "Beauty salon",
    caption: "No client behind this one. It is a demo, and every part of it is live.",
    badge: { label: "Demo site", variant: "muted" },
    image: { src: "/images/projects/salon-aura.png", alt: "Aura Güzellik Stüdyosu hero with the TR/EN toggle and three theme dots in the header" },
    links: {
      demo: { href: "https://salon-aura-demo.vercel.app", label: "Live" },
    },
    featured: false,
    order: 1,
    createdAt: "2026-08-12",
  },
  {
    slug: "/projects/cafe-kavella",
    title: "Kavella",
    summary:
      "Demo site for a coffee shop, five pages: home, menu, about, gallery and contact. The menu is real HTML rendered from a single data file, and the same data feeds a schema.org Menu block (JSON-LD) so search engines can read the sections, items and prices; swapping that file for an API response would leave the render code untouched. The gallery opens in a custom lightbox with keyboard and swipe navigation. The contact form validates in the browser and then hands the message to WhatsApp as a deep link, so there is no backend to run. Page changes go behind a curtain transition, and sections reveal on scroll at an editorial pace, both switched off under reduced motion. The site exists in two design directions, an editorial v2 and an experimental v3, built on the same content, menu data and WhatsApp integration: only the presentation layer differs between them. Vanilla HTML, CSS and JavaScript, zero dependencies.",
    cardSummary:
      "Five-page coffee shop site in two design directions on one data layer. The menu is real HTML rendered from one data file with schema.org markup, plus a lightbox gallery and a contact form that opens WhatsApp.",
    metaDescription:
      "Five-page demo coffee shop site in two design directions on one data layer: menu from one file with schema.org JSON-LD, lightbox gallery, WhatsApp contact form.",
    tags: ["HTML", "CSS", "JavaScript", "JSON-LD", "WhatsApp"],
    category: "Website",
    sector: "demo",
    sectorLabel: "Coffee shop",
    caption: "No client behind this one. It is a demo, and all five pages are live.",
    badge: { label: "Demo site", variant: "muted" },
    image: { src: "/images/projects/cafe-kavella.png", alt: "Kavella home page hero with the five-page navigation and editorial headline" },
    links: {
      demo: { href: "https://cafe-kavella-demo.vercel.app", label: "Live" },
    },
    variants: {
      title: "One data layer, two directions",
      body:
        "Both directions are live, each with all five pages. They share the content, the menu data file, the schema.org menu markup that menu.js writes from it, and the WhatsApp routing in the contact form. Same scripts and the same phone number. Each direction owns only its own markup, stylesheet and motion script, so choosing between them moves nothing in the data, and a redesign later is a stylesheet swap rather than a rebuild.",
      items: [
        {
          tag: "v2",
          name: "Editorial",
          summary: "Cream ground, serif display type, paired photography and scroll-timed reveals at a magazine pace.",
          image: { src: "/images/projects/cafe-kavella.png", alt: "Kavella v2 home page: cream ground, serif headline, photo pair and the WhatsApp button" },
          link: { href: "https://cafe-kavella-demo.vercel.app", label: "Live" },
        },
        {
          tag: "v3",
          name: "Experimental",
          summary: "Dark ground with a particle canvas, a skippable counter loader, kinetic wordmark, magnetic buttons under a custom cursor, and a horizontally pinned menu section.",
          image: { src: "/images/projects/cafe-kavella-v3.png", alt: "Kavella v3 home page: dark ground, particle field and the KAVELLA wordmark across the full width" },
          link: { href: "https://cafe-kavella-demo.vercel.app/index-v3.html", label: "Live" },
        },
      ],
    },
    featured: false,
    order: 2,
    createdAt: "2026-08-16",
  },
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/api-gateway",
    title: "API Gateway",
    summary:
      "An API Gateway written in Go, built as a chain of middleware rather than one request handler. It reverse-proxies to upstream services and spreads traffic across their replicas round-robin. Redis holds the rate limit counters and the response cache. Authentication takes a JWT or an API key. A circuit breaker isolates failing upstreams, failed requests are retried automatically, and the rest of the chain covers request and response transforms, IP filtering and body validation. The stack runs under Docker Compose, with Prometheus scraping metrics into Grafana dashboards. Integration tests cover the gateway, including one that runs two replicas of the same service and fails unless both serve an even share of the requests.",
    cardSummary:
      "API Gateway in Go. Auth, rate limiting, caching, retries and circuit breaking each sit in the middleware chain; what survives is round-robined to an upstream replica.",
    metaDescription:
      "API Gateway in Go. A middleware chain handles reverse proxying, Redis-backed rate limiting and caching, JWT auth, circuit breaking and round-robin balancing.",
    tags: ["Go", "Redis", "Docker", "Docker Compose", "Prometheus", "Grafana", "JWT"],
    category: "Backend",
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
    order: 8,
    createdAt: "2026-03-26",
  },
] as const;
