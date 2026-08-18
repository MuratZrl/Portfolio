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
  | "E-Commerce"
  /** Small business sites: single-page and few-page marketing sites, no app behind them. */
  | "Website";

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

/**
 * A single engineering decision called out on the project detail page.
 * `title` is the short heading (e.g. "Why Supabase over Firebase").
 * `body` is a 2-3 sentence prose paragraph: problem, choice, and rationale vs. the alternative.
 */
export type TechnicalDecision = {
  title: string;
  body: string;
};

/**
 * One presentation of a project that ships several: a design direction, an
 * A/B variant, a theme. Each has its own screenshot and its own live URL.
 * `tag` is the short marker rendered as a chip before the name ("v2");
 * `summary` is one line on what this presentation changes.
 */
export type ProjectVariant = {
  tag?: string;
  name: string;
  summary?: string;
  image: ProjectImage;
  link: ProjectLink;
};

/**
 * A set of presentations built on one data layer. `title` and `body` frame
 * the section on the detail page and belong to the project, not the
 * template: what the variants share, what differs, and why that split is
 * the point. The section is hidden entirely when the field is missing.
 */
export type ProjectVariants = {
  title: string;
  body: string;
  items: readonly ProjectVariant[];
};

/**
 * Which client sector a project belongs to. The colour it once drove is gone
 * (see ProjectCard); what remains is the paid/unpaid split the card reads.
 * `personal` and `demo` are the two unpaid values. `demo` is a site built to
 * show prospective clients what they would get: no client, no invoice, so it
 * must never render the "Client work" mark. The industry it targets is
 * carried by `sectorLabel` text ("Beauty salon", "Coffee shop").
 */
export type ProjectSector = "metal" | "property" | "commerce" | "personal" | "demo";

/**
 * The withheld slab. Present only on private client work.
 *
 * `rows` is HAND-AUTHORED — it is never derived from the shape of the real
 * record. That is the whole point: the confidential values are not authored
 * into this codebase in any form, so there is nothing in the payload to
 * inspect. Deriving the size from real data would reintroduce exactly the leak
 * the slab exists to prevent.
 */
export type ProjectWithheld = {
  rows: number;
  reason: string;
};

export type Project = {
  slug: InternalHref;
  title: string;
  summary: string;
  /** Optional short summary used on cards (line-clamp-2). Falls back to `summary` if absent. */
  cardSummary?: string;
  /** Truncation-safe description for `generateMetadata`; `summary` runs past the SERP limit. */
  metaDescription?: string;
  tags: readonly string[];
  category: ProjectCategory;
  sector: ProjectSector;
  /**
   * REQUIRED. The visible text that carries the same information as the sector
   * colour. Without it the coloured edge is colour-alone (WCAG 1.4.1), so the
   * type makes a card with a sector but no label impossible to construct.
   */
  sectorLabel: string;
  /** Present only on private client work. See ProjectWithheld. */
  withheld?: ProjectWithheld;
  /** Shown in the slab's slot on projects that have a public artifact instead. */
  caption?: string;
  /**
   * Project type as a display string ("Client work", "Personal project",
   * "Demo site"). Rendered as the Type row of the detail page's spec sheet.
   * The card derives the same word from `sector`; keep the two in step.
   * `variant` is currently unused: the thumbnail badge it was written for
   * never shipped.
   */
  badge: ProjectBadge;
  /** Primary/hero image. Used on the card and as the first image on the detail page. */
  image?: ProjectImage;
  /** Additional screenshots shown on the detail page only, in order, after the hero. */
  gallery?: readonly ProjectImage[];
  links?: { demo?: ProjectLink; repo?: ProjectLink };
  metrics?: { lighthouse?: string; stars?: string };
  /**
   * Optional list of 2-4 key engineering decisions shown on the detail page.
   * Section is hidden entirely when this field is missing or empty.
   */
  technicalDecisions?: readonly TechnicalDecision[];
  /**
   * Optional set of presentations (design directions, variants) built on the
   * same content and data. Rendered as its own section on the detail page,
   * side by side with a screenshot and live link each. See ProjectVariants.
   */
  variants?: ProjectVariants;
  /** If omitted, treated as featured=true by consumers. */
  featured?: boolean;
  createdAt?: DateStr;
  /** Lower number = appears first in featured/listing order. Falls back to createdAt desc. */
  order?: number;
};
