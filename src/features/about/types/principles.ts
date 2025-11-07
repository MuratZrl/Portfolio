// src/features/about/types/principles.ts

export type PrincipleIconId =
  | "target"
  | "bolt"
  | "accessibility"
  | "layers"
  | "git-branch"
  | "shield";

export type Principle = {
  title: string;
  description: string;
  icon: PrincipleIconId;
  tags?: readonly string[];
};

export type Step = {
  title: string;
  description: string;
};
