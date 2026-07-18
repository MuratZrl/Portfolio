// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/szmetal-admin-panel",
    title: "SZMetal Admin Panel",
    summary:
      "Custom admin dashboard for a metal manufacturer: product catalog, client management, role-based access (Admin/Manager/User) enforced via Postgres RLS, MUI X analytics charts, live notifications and user presence via Supabase Realtime, and in-browser PDF drawing previews.",
    cardSummary:
      "Custom admin dashboard for a metal manufacturer — product catalog, client management, RLS roles, and live Realtime updates.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "MUI"],
    category: "Full-Stack",
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/szmetal-admin-panel.png", alt: "SZMetal admin panel dashboard" },
    gallery: [
      { src: "/images/projects/szmetal-dashboard.png", alt: "SZMetal kontrol paneli — döviz, aktivite akışı ve grafikler" },
      { src: "/images/projects/szmetal-users.png", alt: "SZMetal kullanıcı yönetimi — rol ve durum kontrolü" },
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
    badge: { label: "Client work", variant: "accent" },
    image: { src: "/images/projects/yenigunemlak.png", alt: "Yenigün Emlak property listings with map search" },
    gallery: [
      { src: "/images/projects/yenigun-istatistik.png", alt: "Yenigün Emlak istatistik paneli — Google Search Console CTR, sorgu ve ülke dağılımı" },
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
      "Ticimax e-commerce sync engine + admin dashboard — realtime supplier scraping and live sync progress monitoring.",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Puppeteer", "Tailwind CSS"],
    category: "Full-Stack",
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
] as const;
