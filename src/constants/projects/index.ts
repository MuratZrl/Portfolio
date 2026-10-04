// src/constants/projects/index.ts
export type {
  InternalHref as Href,
  InternalHref,
  MonthStr,
  DayStr,
  DateStr,
  ProjectLink,
  Project,
  ProjectCategory,
  TechnicalDecision,
  ProjectVariant,
  ProjectVariants,
} from "./types";

export { PROJECTS } from "./data";

// helpers’ları tek noktadan dağıt
export {
  getAllProjects,
  getFeaturedProjects,
  findProjectBySlug,
  getAllTags,
  getAllCategories,
  getProjectStats,
} from "./helpers";

export type { ProjectStats } from "./helpers";
