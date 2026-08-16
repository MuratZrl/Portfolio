// src/features/home/data/value-props.ts
import type { ValueItem } from "@/features/home/types/value-props";

/**
 * "How I build" — three claims, each verifiable by the reader in under thirty
 * seconds without leaving the site. The old `stat` slot is gone: "A11y score
 * 90+/100" and "Bug rate ↓" were self-reported numbers with no artifact behind
 * them. `check` replaces it with an instruction the reader can act on.
 */
export const DEFAULT_ITEMS = [
  {
    title: "Keyboard first",
    description:
      "Put the mouse down and press Tab. Every focus ring is visible, the skip link works, and nothing traps you. Contrast holds in both themes.",
    highlights: [
      "Visible focus on every control",
      "Skip link to main content",
      "AA contrast, light and dark",
    ],
    tags: ["WCAG 2.2 AA", "Semantic HTML", "Keyboard-first"],
    check: "Check it: press Tab, right now.",
  },
  {
    title: "Nothing loads that doesn't have to",
    description:
      "No animation library, no carousel, no hero video, no font CDN. One third-party script (Vercel Analytics) and nothing else. Fonts are self-hosted through next/font with a single file preloaded. Turn JavaScript off and the words on this page are still here; they are rendered on the server.",
    highlights: [
      "One third-party script: Vercel Analytics",
      "Self-hosted fonts, one file preloaded",
      "Text renders with JavaScript disabled",
    ],
    tags: ["Next.js 16", "RSC", "next/font"],
    check: "Check it: open the Network tab and reload.",
  },
  {
    title: "Open where it can be",
    description:
      "TypeScript strict in every TypeScript project, and no ts-ignore anywhere in the public repos. Three of the eight projects have public repos. Read the source instead of taking my word for it. The client work is private, and the project cards say exactly what is being held back and why.",
    highlights: [
      "strict: true in every tsconfig",
      "Zero @ts-ignore in public repos",
      "Private work labelled, not hidden",
    ],
    tags: ["TypeScript", "strict", "Public source"],
    check: "github.com/MuratZrl",
    checkHref: "https://github.com/MuratZrl",
  },
] satisfies readonly ValueItem[];
