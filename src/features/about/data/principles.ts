// src/features/about/data/principles.ts
import type { Principle, Step } from "@/features/about/types";

export const PRINCIPLES = [
  {
    title: "Goal Oriented",
    description: "Measurable outcomes and tight scope. Ship value, not detours.",
    icon: "target",
    tags: ["Scope clarity", "KPIs", "Impact"],
  },
  {
    title: "Speed & Simplicity",
    description: "Small surface area, predictable defaults, fast feedback loops.",
    icon: "bolt",
    tags: ["Edge-friendly", "Cache tags", "ISR"],
  },
  {
    title: "Accessibility",
    description: "WCAG 2.2 AA, keyboard-first, inclusive motion and color.",
    icon: "accessibility",
    tags: ["Axe", "ARIA roles", "Contrast"],
  },
  {
    title: "Component Architecture",
    description: "Primitive-first, composition, stable contracts under change.",
    icon: "layers",
    tags: ["Shadcn UI", "Radix", "Composable"],
  },
  {
    title: "Versioning & Branching",
    description: "Short-lived branches, frequent PRs, review early, release often.",
    icon: "git-branch",
    tags: ["Conv. Commits", "Small PRs", "CI gates"],
  },
  {
    title: "Quality & Confidence",
    description: "Test where it hurts, budgets in CI, monitor in prod.",
    icon: "shield",
    tags: ["Playwright", "Lighthouse", "Axe"],
  },
] as const satisfies readonly Principle[];

export const PROCESS_STEPS = [
  {
    title: "Discovery",
    description: "Goals, scenarios, success metrics and constraints.",
  },
  {
    title: "Skeleton",
    description: "Information architecture, routes, data model, component glossary.",
  },
  {
    title: "Development",
    description: "RSC + Server Actions, schema-first APIs, feature toggles.",
  },
  {
    title: "Validation",
    description: "Unit/integration/e2e, a11y and perf budgets, acceptance checks.",
  },
  {
    title: "Release & Monitoring",
    description: "Versioning, observability, small iterations, feedback loops.",
  },
] as const satisfies readonly Step[];
