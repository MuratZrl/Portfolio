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

export type Project = {
  slug: InternalHref;
  title: string;
  summary: string;
  tags: readonly string[];
  category: ProjectCategory;
  image?: { src: string; alt: string };
  links?: { demo?: ProjectLink; repo?: ProjectLink };
  metrics?: { lighthouse?: string; stars?: string };
  /** If omitted, treated as featured=true by consumers. */
  featured?: boolean;
  createdAt?: DateStr;
  /** Lower number = appears first in featured/listing order. Falls back to createdAt desc. */
  order?: number;
};
