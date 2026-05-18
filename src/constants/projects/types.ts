// src/constants/projects/types.ts

/** Internal routes only, e.g. "/projects/pc-builder" */
export type InternalHref = "/" | `/${string}`;

/** Zero-padded month string. Example: "01".."12" */
export type MonthStr =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

/** Zero-padded day string. Example: "01".."31" */
export type DayStr =
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10"
  | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20"
  | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31";

/** Date in YYYY-MM-DD format. */
export type DateStr = `${number}-${MonthStr}-${DayStr}`;

export type ProjectLink = {
  label: string;
  /** Can be internal or external. Keep it simple: string */
  href: string;
  ariaLabel?: string;
  isPrivate?: boolean;
};

export type ProjectCategory =
  | "Full-Stack"
  | "Frontend"
  | "Backend"
  | "Tooling"
  | "Auth"
  | "E-Commerce";

/** "accent" = highlighted (client / commercial work). "muted" = subtle (personal / demo). */
export type ProjectBadgeVariant = "accent" | "muted";

export type ProjectBadge = {
  label: string;
  variant: ProjectBadgeVariant;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: InternalHref;
  title: string;
  summary: string;
  /** Optional short summary used on cards (line-clamp-2). Falls back to `summary` if absent. */
  cardSummary?: string;
  tags: readonly string[];
  category: ProjectCategory;
  /** Badge rendered on the thumbnail — reflects project type, not tech category. */
  badge: ProjectBadge;
  /** Primary/hero image. Used on the card and as the first image on the detail page. */
  image?: ProjectImage;
  /** Additional screenshots shown on the detail page only, in order, after the hero. */
  gallery?: readonly ProjectImage[];
  links?: { demo?: ProjectLink; repo?: ProjectLink };
  metrics?: { lighthouse?: string; stars?: string };
  /** If omitted, treated as featured=true by consumers. */
  featured?: boolean;
  createdAt?: DateStr;
  /** Lower number = appears first in featured/listing order. Falls back to createdAt desc. */
  order?: number;
};
