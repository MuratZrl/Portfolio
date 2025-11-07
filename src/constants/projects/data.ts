// src/constants/projects/data.ts
import type { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/admin-panel",
    title: "Admin Panel",
    summary:
      "Internal admin panel with real-time metrics (Supabase Realtime), cache-aware data layer (tag-based revalidation), Server Actions with optimistic updates, audit logs, and MUI theming.",
    tags: ["Realtime", "Yup", "Server Actions", "RLS", "Caching", "MUI"],
    image: { src: "/images/projects/analytics.png", alt: "Admin analytics dashboard" },
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
    image: { src: "/images/projects/wallpaper-website.png", alt: "Wallpaper Website" },
    links: {
      demo: { href: "/wallpapers", label: "Live" },
      repo: { href: "https://github.com/youruser/wallpaper-website", label: "Repo" },
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
    image: { src: "/images/projects/blog.png", alt: "Blog platform homepage" },
    links: {
      demo: { href: "/blog", label: "Live" },
      repo: { href: "https://github.com/youruser/blog-platform", label: "Repo" },
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
    links: {
      demo: { href: "/pc-builder", label: "Live" },
      repo: { href: "https://github.com/youruser/pc-builder", label: "Repo" },
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
    links: {
      demo: { href: "/projects/forms-kit", label: "Demo" },
      repo: { href: "https://github.com/youruser/forms-kit", label: "Repo" },
    },
    featured: false,
    createdAt: "2025-10-11",
  },
] as const;