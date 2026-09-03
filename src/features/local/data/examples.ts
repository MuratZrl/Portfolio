// src/features/local/data/examples.ts
//
// The three sites on the Turkish home's "Örnekler" strip. Data only: hrefs,
// screenshots and the paid / demo flag. Titles, summaries, sector labels,
// alt text and tags come from messages under `home.examples.items.<key>`,
// and src/features/home/HomeTr.tsx folds the two halves into the same
// `Project` shape the English featured cards render from.

import type { ProjectSector } from "@/constants/projects/types";

export type ExampleKey = "yenigun" | "ritim" | "salon";

export type ExampleSite = {
  key: ExampleKey;
  /** Where the card's title and "visit" link go. */
  href: string;
  image: string;
  /**
   * Drives the provenance mark the card prints beside the sector label:
   * `property` is paid client work, `demo` is a demo site. Same field, same
   * words, as the English cards.
   */
  sector: Extract<ProjectSector, "property" | "demo">;
};

export const EXAMPLE_SITES: readonly ExampleSite[] = [
  {
    key: "yenigun",
    href: "https://yenigunemlak.com",
    image: "/images/projects/yenigunemlak.png",
    sector: "property",
  },
  {
    key: "ritim",
    href: "https://ritim-fitness.vercel.app",
    image: "/images/projects/ritim-fitness.png",
    sector: "demo",
  },
  {
    key: "salon",
    href: "https://salon-aura-demo.vercel.app",
    image: "/images/projects/salon-aura.png",
    sector: "demo",
  },
] as const;
