// src/features/about/types/experience.ts
import type { Period, ExtLink } from "./common";

/** Kind of entry shown in the experience timeline. */
export type Kind = "work" | "freelance" | "education";

/** A single experience/timeline item. */
export type ExperienceItem = {
  id: string;
  kind: Kind;
  org: string;
  role: string;
  location?: string;
  period: Period;
  summary?: string;
  achievements?: readonly string[];
  responsibilities?: readonly string[];
  tags?: readonly string[];
  links?: readonly ExtLink[];
};
