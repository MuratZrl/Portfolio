// src/features/home/data/value-props.ts
import { Gauge, Accessibility, GitBranch } from "lucide-react";
import type { ValueItem } from "@/features/home/types/value-props";

export const DEFAULT_ITEMS = [
  {
    title: "Speed & Performance",
    description: "Next.js 15 + Edge optimization. Target LCP < 1.5s.",
    icon: Gauge,
    highlights: ["SSR/SG & smart cache", "Image optimization", "Preload & prefetch"],
    stat: { label: "Average LCP", value: "< 1.5s" },
    tags: ["Next.js", "Edge", "Lighthouse 95+"],
    cta: { href: "/projects", label: "Projects", ariaLabel: "Go to Projects page" },
  },
  {
    title: "Accessibility",
    description: "Semantic HTML, focus management, and contrast checks. Automation friendly.",
    icon: Accessibility,
    highlights: ["WCAG compliant", "Keyboard navigable", "ARIA labels"],
    stat: { label: "A11y score", value: "90+ / 100" },
    tags: ["WCAG", "Axe", "Keyboard-first"],
    cta: { href: "/about", label: "About" },
  },
  {
    title: "Sustainable Code",
    description: "Strict TypeScript, clear architecture, Shadcn UI. Long-lived.",
    icon: GitBranch,
    highlights: ["Strict TS", "UI primitives", "Testable"],
    stat: { label: "Bug rate", value: "↓" },
    tags: ["TypeScript", "Shadcn UI", "Clean Arch"],
    cta: { href: "/contact", label: "Contact" },
  },
] satisfies readonly ValueItem[];
