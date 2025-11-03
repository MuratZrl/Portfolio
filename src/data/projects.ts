// src/data/projects.ts
// Single source of truth for your portfolio projects.

export type Href = "/" | `/${string}`;

export type ProjectLink = {
  label: string;
  href: string; // can be internal (/projects/...) or external (https://...)
  ariaLabel?: string;
};

export type Project = {
  slug: Href;
  title: string;
  summary: string;
  tags: readonly string[];
  image?: { src: string; alt: string };
  links?: { demo?: ProjectLink; repo?: ProjectLink };
  metrics?: { lighthouse?: string; stars?: string };
  featured?: boolean;     // defaults to true if omitted
  createdAt?: `${number}-${"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"}-${"01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29"|"30"|"31"}`;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "/projects/analytics-dashboard",
    title: "Analytics Dashboard",
    summary: "Real-time metrics, server actions, and a cache-aware data layer.",
    tags: ["Next.js", "TypeScript", "Shadcn UI"],
    image: { src: "/images/projects/analytics.png", alt: "Analytics Dashboard screenshot" },
    links: {
      demo: { href: "/projects/analytics-dashboard", label: "Demo" },
      repo: { href: "https://github.com/youruser/analytics-dashboard", label: "Repo" },
    },
    metrics: { lighthouse: "95+", stars: "—" },
    featured: true,
    createdAt: "2025-04-10",
  },
  {
    slug: "/projects/landing-accelerator",
    title: "Landing Accelerator",
    summary: "SaaS landing template. Preload/prefetch, optimized images, and strong SEO.",
    tags: ["SEO", "Edge", "Tailwind"],
    image: { src: "/images/projects/landing.png", alt: "Landing Accelerator cover" },
    links: {
      demo: { href: "/projects/landing-accelerator", label: "Demo" },
      repo: { href: "https://github.com/youruser/landing-accelerator", label: "Repo" },
    },
    metrics: { lighthouse: "98", stars: "—" },
    featured: true,
    createdAt: "2025-03-01",
  },
  {
    slug: "/projects/admin-dashboard",
    title: "Admin Dashboard",
    summary: "Admin panel with role-based access, table filters, and theme support.",
    tags: ["RSC", "PostgreSQL", "Auth"],
    links: {
      demo: { href: "/projects/admin-dashboard", label: "Demo" },
      repo: { href: "https://github.com/youruser/admin-dashboard", label: "Repo" },
    },
    metrics: { lighthouse: "92", stars: "—" },
    featured: true,
    createdAt: "2025-01-20",
  },
  {
    slug: "/projects/image-optimizer",
    title: "Image Optimizer",
    summary: "Edge transform with smart formats and responsive delivery.",
    tags: ["Edge", "Performance"],
    links: {
      demo: { href: "/projects/image-optimizer", label: "Demo" },
      repo: { href: "https://github.com/youruser/image-optimizer", label: "Repo" },
    },
    featured: false,
    createdAt: "2024-12-05",
  },
  {
    slug: "/projects/forms-kit",
    title: "Forms Kit",
    summary: "Type-safe forms with Zod, server actions, and optimistic UI.",
    tags: ["TypeScript", "RSC", "Zod"],
    links: {
      demo: { href: "/projects/forms-kit", label: "Demo" },
      repo: { href: "https://github.com/youruser/forms-kit", label: "Repo" },
    },
    featured: false,
    createdAt: "2024-10-11",
  },
] as const;

// Helpers so you don’t re-implement map/filter like it’s a personality trait.

export function getAllProjects(): readonly Project[] {
  // newest first, because humans like shiny things
  return [...PROJECTS].sort((a, b) => {
    const ad = a.createdAt ?? "1970-01-01";
    const bd = b.createdAt ?? "1970-01-01";
    return bd.localeCompare(ad);
  });
}

export function getFeaturedProjects(limit?: number): readonly Project[] {
  const list = getAllProjects().filter(p => p.featured !== false);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function findProjectBySlug(slug: Href): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAllTags(): readonly string[] {
  const set = new Set<string>();
  PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
  return [...set].sort();
}
