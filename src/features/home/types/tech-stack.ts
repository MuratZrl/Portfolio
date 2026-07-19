// src/features/home/types/tech-stack.ts
// Strong, reusable types for the Home > TechStack section.

export type Skill = {
  name: string;
};

export type Group = {
  title: string;
  skills: readonly Skill[];
};

export type TechStackProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  className?: string;
};
