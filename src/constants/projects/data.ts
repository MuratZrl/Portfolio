// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/szmetal-admin-panel",
    title: "SZMetal Admin Panel",
    summary:
      "Full-stack admin dashboard for managing products, clients, and analytics. Features role-based access control (Admin/Manager/User), product catalog with category hierarchies and media uploads, analytics with date filtering and trend charts, and PDF document handling. Secured with RLS, IP restrictions, and CSP headers.",
    tags: ["Next.js 16", "TypeScript", "MUI 7", "Supabase", "React Query", "Framer Motion", "React Hook Form", "Yup"],
    category: "Full-Stack",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=SZMetal+Admin&font=raleway", alt: "SZMetal admin dashboard" },
    links: {
      demo: { href: "https://szmetal.com.tr", label: "Live" },
      repo: {
        href: "https://github.com/MuratZrl/szmetal-admin-panel",
        label: "Repo",
      },
    },
    featured: true,
    createdAt: "2025-04-10",
  },
  {
    slug: "/projects/realtime-chat",
    title: "Real-Time Chat",
    summary:
      "Full-stack real-time chat application with WebSocket messaging, typing indicators, read receipts, and online presence tracking. Features channels, direct messages, emoji reactions, file uploads, message pinning/starring, invite links, and role-based room moderation. Monorepo architecture with Docker Compose for deployment.",
    tags: ["Next.js 16", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Redis", "Socket.io", "Tailwind CSS", "Docker"],
    category: "Full-Stack",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=Real-Time+Chat&font=raleway", alt: "Real-time chat application" },
    links: {
      repo: {
        href: "https://github.com/MuratZrl/real-time-chat",
        label: "Repo",
      },
    },
    featured: true,
    createdAt: "2025-06-01",
  },
  {
    slug: "/projects/portfolio",
    title: "Portfolio",
    summary:
      "Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. Features a contact form backed by Supabase, skeleton loading states, responsive design, and Framer Motion animations.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "shadcn/ui"],
    category: "Frontend",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=Portfolio&font=raleway", alt: "Portfolio website" },
    links: {
      repo: {
        href: "https://github.com/MuratZrl/portfolio_",
        label: "Repo",
      },
    },
    featured: true,
    createdAt: "2025-03-01",
  },
] as const;