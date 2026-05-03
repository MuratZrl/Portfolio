// src/features/home/data/final-cta.ts
import { Gauge, ShieldCheck } from "lucide-react";
import type {
  CtaLink,
  Stat,
  Media,
  Variant,
  FinalCtaProps,
} from "@/features/home/types/final-cta";

/* ------------------------------- Defaults -------------------------------- */

export const DEFAULT_PRIMARY: CtaLink = { href: "/contact", label: "Get in touch" };

export const DEFAULT_HIGHLIGHTS: readonly string[] = [
  "Fast delivery",
  "WCAG compliant",
  "TypeScript strict",
];

export const DEFAULT_STATS: readonly Stat[] = [
  { label: "Lighthouse", value: "95+", icon: Gauge },
  { label: "Accessibility", value: "AA", icon: ShieldCheck },
];

export const DEFAULT_MEDIA: Media = { type: "pattern" };

export const FINAL_CTA_DEFAULTS = {
  heading: "Got a project?",
  subheading: "Production-ready full-stack apps. Built with Next.js, NestJS, and PostgreSQL.",
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
