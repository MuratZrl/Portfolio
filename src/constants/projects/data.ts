// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/teamboard",
    title: "TeamBoard",
    summary:
      "Multi-tenant project management SaaS with kanban boards, team workspaces, and Stripe subscription billing.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    category: "Full-Stack",
    image: { src: "/images/projects/teamboard.png", alt: "TeamBoard kanban dashboard" },
    links: {
      demo: { href: "https://teamboard-web.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/teamboard", label: "Repo" },
    },
    featured: true,
    order: 1,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/pulsechat",
    title: "PulseChat",
    summary:
      "Real-time chat platform with WebSocket messaging, multi-room channels, and 10+ live features powered by Redis pub/sub.",
    tags: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Socket.io"],
    category: "Full-Stack",
    image: { src: "/images/projects/pulsechat.png", alt: "PulseChat real-time chat interface" },
    links: {
      demo: { href: "https://pulsechat-plum.vercel.app", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/pulsechat", label: "Repo" },
    },
    featured: true,
    order: 2,
    createdAt: "2026-02-01",
  },
  {
    slug: "/projects/yenigunemlak",
    title: "YenigunEmlak",
    summary:
      "Live real estate platform serving 240+ active property listings, with map-based search and full admin panel.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Zustand", "Google Maps", "Leaflet"],
    category: "Full-Stack",
    image: { src: "/images/projects/yenigunemlak.png", alt: "YenigunEmlak property listings with map search" },
    links: {
      demo: { href: "https://yenigunemlak.com", label: "Live" },
    },
    featured: true,
    order: 3,
    createdAt: "2026-01-01",
  },
] as const;
