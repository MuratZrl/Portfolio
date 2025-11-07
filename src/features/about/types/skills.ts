// src/features/about/types/skills.ts

/** Skill group identifier used for tabs. */
export type GroupId = "frontend" | "backend" | "tooling" | "quality";

/** Icon identifier (data React'tan bağımsız kalsın isteyenler için). */
export type IconId = "layout" | "database" | "wrench" | "shield";

/** CEFR-like levels for language list. */
export type LangLevel = "Native" | "C2" | "C1" | "B2" | "B1" | "A2" | "A1";

/** A single skill row in the matrix. Level is 0..100. */
export type Skill = {
  name: string;
  level: number;
  hint?: string;
};

/** Group (tab) that contains related skills and an icon. */
export type Group = {
  id: GroupId;
  title: string;
  icon: IconId;
  skills: readonly Skill[];
  note?: string;
};

/** Language proficiency entry. */
export type Lang = {
  name: string;
  level: LangLevel;
};

/** Certificate entry shown in the sidebar list. */
export type Cert = {
  title: string;
  org: string;
  year?: string;
  href?: string;
};
