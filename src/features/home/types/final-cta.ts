// src/features/home/types/final-cta.ts
import type { LucideIcon } from "lucide-react";

/** Internal route only, because this CTA is for on-site actions. */
export type Href = "/" | `/${string}`;

export type CtaLink = {
  href: Href;
  label: string;
  ariaLabel?: string;
};

export type Stat = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "pattern" };

export type Variant = "center" | "split" | "minimal";

export type FinalCtaProps = {
  heading?: string;
  subheading?: string;
  primary?: CtaLink;   // usually /contact
  tertiary?: CtaLink;  // optional third link
  highlights?: readonly string[];
  stats?: readonly Stat[];
  media?: Media;       // fills the right side in the split variant
  className?: string;
  variant?: Variant;
};
