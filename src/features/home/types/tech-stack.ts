// src/features/home/types/tech-stack.ts
// Strong, reusable types for the Home > TechStack section.

export type Skill = {
  name: string;
};

/** Message key under `home.stack.groups`; the visible title is translated. */
export type GroupKey = "languages" | "interface" | "data" | "build";

export type Group = {
  key: GroupKey;
  skills: readonly Skill[];
};

export type TechStackProps = {
  /** Stable anchor id, so old in-page links keep working. */
  id?: string;
  groups?: readonly Group[];
  className?: string;
};
