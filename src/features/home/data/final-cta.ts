// src/features/home/data/final-cta.ts
import type {
  CtaLink,
  Stat,
  Media,
  Variant,
  FinalCtaProps,
} from "@/features/home/types/final-cta";

/* ------------------------------- Defaults -------------------------------- */

export const DEFAULT_PRIMARY: CtaLink = { href: "/contact", label: "Send a message" };

export const DEFAULT_HIGHLIGHTS: readonly string[] = [
  "Istanbul, UTC+3",
  "Turkish and English",
  "Contract or full-time",
];

export const DEFAULT_STATS: readonly Stat[] = [
];

export const DEFAULT_MEDIA: Media = { type: "pattern" };

export const FINAL_CTA_DEFAULTS = {
  heading: "Hiring, or have a system that needs building?",
  subheading:
    "Full-time roles and contract work both. If you have a process running on a spreadsheet that four people are editing at once, that is the thing I build.",
  primary: DEFAULT_PRIMARY,
  highlights: DEFAULT_HIGHLIGHTS,
  stats: DEFAULT_STATS,
  media: DEFAULT_MEDIA,
  variant: "center" as Variant,
} satisfies {
  heading: string;
  subheading: string;
  primary: CtaLink;
  highlights: readonly string[];
  stats: readonly Stat[];
  media: Media;
  variant: Variant;
};

/* Optional helper: merge partial props with defaults */
export function withFinalCtaDefaults(
  props: FinalCtaProps
): Required<Pick<
  FinalCtaProps,
  | "heading"
  | "subheading"
  | "primary"
  | "highlights"
  | "stats"
  | "media"
  | "variant"
>> & Omit<FinalCtaProps, keyof FinalCtaProps> {
  return {
    heading: props.heading ?? FINAL_CTA_DEFAULTS.heading,
    subheading: props.subheading ?? FINAL_CTA_DEFAULTS.subheading,
    primary: props.primary ?? FINAL_CTA_DEFAULTS.primary,
    highlights: props.highlights ?? FINAL_CTA_DEFAULTS.highlights,
    stats: props.stats ?? FINAL_CTA_DEFAULTS.stats,
    media: props.media ?? FINAL_CTA_DEFAULTS.media,
    variant: props.variant ?? FINAL_CTA_DEFAULTS.variant,
  };
}

export type {
  CtaLink,
  Stat,
  Media,
  Variant,
  FinalCtaProps,
} from "@/features/home/types/final-cta";
