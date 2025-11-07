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

export type Avatar = { src: string; alt: string };

export type AboutIntroDefaults = {
  name: string;
  role: string;
  location: string;
  availability: Availability;
  avatar: Avatar;
  bio: readonly string[];
  highlights: readonly string[];
  techTags: readonly string[];
  social: readonly SocialLink[];
  stats: readonly Stat[];
  primary: Cta;   // e.g. /contact
  secondary: Cta; // e.g. /cv/..pdf
};
