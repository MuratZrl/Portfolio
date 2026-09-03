// src/features/about/types/about-intro.ts
import type { LucideIcon } from "lucide-react";
import type { Href } from "./common";

export type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type Availability = "available" | "busy" | "unavailable";

export type Cta = {
  href: Href | string;
  label: string;
  ariaLabel?: string;
  download?: boolean;
};

export type Stat = { label: string; value: string; icon?: LucideIcon };

/** The non-copy half of the About intro. Copy comes from `about.intro`. */
export type AboutIntroDefaults = {
  name: string;
  availability: Availability;
  techTags: readonly string[];
  social: readonly SocialLink[];
  stats: readonly Stat[];
  primaryHref: Href;   // e.g. /contact
  secondaryHref: string; // e.g. /cv/..pdf
};
