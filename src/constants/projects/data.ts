// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/admin-panel",
    title: "Admin Panel",
    summary:
      "Internal admin panel with real-time metrics (Supabase Realtime), cache-aware data layer (tag-based revalidation), Server Actions with optimistic updates, audit logs, and MUI theming.",
    tags: ["Realtime", "Yup", "Server Actions", "RLS", "Caching", "MUI"],
    category: "Full-Stack",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=Admin+Panel&font=raleway", alt: "Admin analytics dashboard" },
    links: {
      demo: { href: "https://szmetal.com.tr", label: "Live" },
      repo: {
        href: "https://github.com/MuratZrl/szmetal-admin-panel",
        label: "Repo",
        isPrivate: true,
      },
    },
    metrics: { lighthouse: "95+", stars: "-" },
    featured: true,
    createdAt: "2025-04-10",
  },
  {
    slug: "/projects/wallpaper-website",
    title: "Wallpaper Website",
    summary:
      "4K wallpaper gallery with a fast masonry grid, optimized images (LQIP + Next/Image), aggressive prefetch/preload, edge caching, and strong SEO (sitemap, robots, structured data, OG).",
    tags: ["Image Optimization", "Masonry Grid", "Prefetch/Preload", "SEO", "Edge Caching"],
    category: "Frontend",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=Wallpaper+Site&font=raleway", alt: "Wallpaper Website" },
    links: {
      demo: { href: "/wallpapers", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/wallpaper-website", label: "Repo" },
    },
    metrics: { lighthouse: "98", stars: "—" },
    featured: true,
    createdAt: "2025-03-01",
  },
  // NEW: Blog Platform
  {
    slug: "/projects/blog-platform",
    title: "Blog Platform",
    summary:
      "SEO-first blog with MDX content, nested routes, RSC streaming, per-post OG images, RSS/Atom, sitemap, and draft previews. Tag-based revalidation and edge caching for fast delivery.",
    tags: ["MDX", "RSC", "SEO", "OG Image", "RSS", "Sitemap", "Supabase"],
    category: "Full-Stack",
    image: { src: "https://placehold.co/800x450/e5e7eb/6b7280?text=Blog+Platform&font=raleway", alt: "Blog platform homepage" },
    links: {
      demo: { href: "/blog", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/blog-platform", label: "Repo" },
    },
    metrics: { lighthouse: "99", stars: "—" },
    featured: true,
    createdAt: "2025-05-18",
  },
  {
    slug: "/projects/pc-builder",
    title: "PC Builder",
    summary:
      "Real PC builder with part-compatibility checks (CPU socket, RAM type, GPU length), live filtering, total price, and PSU wattage suggestions.",
    tags: ["Compatibility", "Live Filters", "Power Estimate", "Saved Builds"],
    category: "Frontend",
    links: {
      demo: { href: "/pc-builder", label: "Live" },
      repo: { href: "https://github.com/MuratZrl/pc-builder", label: "Repo" },
    },
    metrics: { lighthouse: "95", stars: "—" },
    featured: true,
    createdAt: "2025-01-20",
  },
  {
    slug: "/projects/forms-kit",
    title: "Forms Kit",
    summary:
      "Type-safe form toolkit: Zod schemas end-to-end, React Hook Form bindings, shadcn/ui inputs, server actions with optimistic updates, field arrays, and a multi-step wizard.",
    tags: ["Zod", "React Hook Form", "shadcn/ui", "Server Actions", "Optimistic UI"],
    category: "Frontend",
    links: {
      demo: { href: "/projects/forms-kit", label: "Demo" },
      repo: { href: "https://github.com/MuratZrl/forms-kit", label: "Repo" },
    },
    featured: false,
    createdAt: "2025-10-11",
  },
  {
    slug: "/projects/realtime-chat",
    title: "Realtime Chat",
    summary:
      "Full-stack chat app with Supabase Realtime channels, presence indicators, typing status, message reactions, file uploads to Supabase Storage, and RLS-protected conversations.",
    tags: ["Supabase Realtime", "Presence", "RLS", "File Upload", "WebSocket"],
    category: "Full-Stack",
    links: {
      repo: {
        href: "https://github.com/MuratZrl/realtime-chat",
        label: "Repo",
        isPrivate: true,
      },
    },
    metrics: { lighthouse: "92", stars: "—" },
    featured: false,
    createdAt: "2025-07-05",
  },
  {
    slug: "/projects/ecommerce-storefront",
    title: "E-Commerce Storefront",
    summary:
      "Server-rendered storefront with product filtering, cart persistence (cookies + DB sync), Stripe checkout integration, order history, and incremental static regeneration for product pages.",
    tags: ["Stripe", "ISR", "Cart", "Filters", "PostgreSQL", "Next.js"],
    category: "E-Commerce",
    links: {
      demo: { href: "/projects/ecommerce-storefront", label: "Demo" },
      repo: { href: "https://github.com/MuratZrl/ecommerce-storefront", label: "Repo" },
    },
    metrics: { lighthouse: "96", stars: "—" },
    featured: false,
    createdAt: "2025-08-22",
  },
  {
    slug: "/projects/auth-starter",
    title: "Auth Starter",
    summary:
      "Production-ready authentication template with email/password, OAuth (Google, GitHub), magic links, session management, RBAC middleware, and protected API routes. Built on Supabase Auth.",
    tags: ["Supabase Auth", "OAuth", "RBAC", "Middleware", "Magic Link"],
    category: "Auth",
    links: {
      repo: { href: "https://github.com/MuratZrl/auth-starter", label: "Repo" },
    },
    featured: false,
    createdAt: "2025-06-14",
  },
  {
    slug: "/projects/devtools-cli",
    title: "DevTools CLI",
    summary:
      "Node.js CLI toolkit for scaffolding projects, running lint/format/typecheck in parallel, generating Zod schemas from JSON, and batch-renaming files with glob patterns.",
    tags: ["Node.js", "CLI", "Scaffolding", "Zod Codegen", "Glob"],
    category: "Tooling",
    links: {
      repo: { href: "https://github.com/MuratZrl/devtools-cli", label: "Repo" },
    },
    featured: false,
    createdAt: "2025-09-03",
  },
] as const;