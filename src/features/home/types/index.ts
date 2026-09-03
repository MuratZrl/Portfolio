// src/features/home/types/index.ts
// Only types. No runtime values should leak from here.

export type {
  // Value Props
  Href as ValueHref,
  ValueItem,
  ValuePropsProps,
} from "./value-props";

export type {
  // Tech Stack
  Skill,
  Group,
  TechStackProps,
} from "./tech-stack";

export type {
  // Final CTA
  Href as CtaHref,
  CtaLink,
  Stat,
  Media,
  Variant,
  FinalCtaProps,
} from "./final-cta";

// Projects — canonical types come from constants.
// Avoids “two different Project types” drama.
export type {
  Project,
  ProjectLink,
  InternalHref as ProjectHref,
  DateStr as ProjectDateStr,
  MonthStr as ProjectMonthStr,
  DayStr as ProjectDayStr,
} from "@/constants/projects";
