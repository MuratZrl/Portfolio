// src/features/home/types/tech-stack.ts
// Strong, reusable types for the Home > TechStack section.

import type { LucideIcon } from "lucide-react";

export type Skill = {
  name: string;
  /** 0..100 inclusive; the component clamps it but keep inputs sane. */
  level: number;
  hint?: string;
};

export type Group = {
  title: string;
  icon?: LucideIcon;
  skills: readonly Skill[];
};

export type TechStackProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  className?: string;
};
