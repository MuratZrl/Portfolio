// src/features/about/data/faq.ts
import type { QA } from "@/features/about/types";

export const FAQ_ITEMS: readonly QA[] = [
  {
    question: "How does the project process work?",
    answer:
      "Discovery → Skeleton → Development → Validation → Release. After each phase, we do a brief review and iterate in small steps.",
    category: "Process",
  },
  {
    question: "What are your performance targets?",
    answer:
      "Lighthouse 90+ and LCP around 1.5s. I apply image optimization, preload/prefetch, and cache-aware data flows.",
    category: "Quality",
  },
  {
    question: "What’s the scope of accessibility (A11y)?",
    answer:
      "WCAG checks, keyboard navigation, visible focus rings, sufficient contrast. Automated with Axe where possible.",
    category: "Quality",
  },
  {
    question: "What’s your approach to Next.js architecture?",
    answer:
      "RSC and Server Actions first. Simple data layer, low dependency count, and component composition.",
    category: "Technical",
  },
  {
    question: "How do revisions and delivery work?",
    answer:
      "We agree on acceptance criteria. A QA pass before delivery, then a small revision window. I also add documentation.",
    category: "Delivery",
  },
  {
    question: "How do you guarantee code quality?",
    answer:
      "ESLint + Prettier, unit and e2e tests (Vitest/Playwright). Builds that don’t meet CI quality thresholds don’t ship.",
    category: "Quality",
  },
] as const;
