// src/features/home/sections/TechStack.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Skill = {
  name: string;
  level: number; // 0..100
  hint?: string;
};

type Group = {
  title: string;
  skills: readonly Skill[];
};

type TechStackProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  className?: string;
};

const DEFAULT_GROUPS: readonly Group[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", level: 90, hint: "RSC, Server Actions, Route Handlers" },
      { name: "TypeScript", level: 90, hint: "strict, generics, utility types" },
      { name: "Shadcn UI", level: 85, hint: "primitives, composable API" },
      { name: "Tailwind CSS", level: 85, hint: "utility-first, design tokens" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Server Actions", level: 80 },
      { name: "PostgreSQL", level: 75, hint: "indexes, JSONB, CTE" },
      { name: "Prisma", level: 75, hint: "schema-first, migrations" },
      { name: "Auth (session/JWT)", level: 70 },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { name: "ESLint", level: 85, hint: "rules, perf, CI fail-fast" },
      { name: "Prettier", level: 90 },
      { name: "Turborepo", level: 70, hint: "caching, pipelines" },
      { name: "Vite", level: 70 },
    ],
  },
  {
    title: "Testing & Quality",
    skills: [
      { name: "Playwright", level: 70, hint: "e2e, trace viewer" },
      { name: "Vitest", level: 75, hint: "unit, mock, coverage" },
      { name: "Lighthouse", level: 85, hint: "PWA, perf budgets" },
      { name: "Axe (A11y)", level: 80 },
    ],
  },
] as const;

export default function TechStack({
  heading = "Tech Stack",
  subheading = "Tools I use daily and my proficiency. No fluff, measurable.",
  groups = DEFAULT_GROUPS,
  className,
}: TechStackProps): React.JSX.Element {
  return (
    <section
      aria-labelledby="tech-stack-heading"
      className={cn("py-12 sm:py-16", className)}
    >
      <div className="mb-8 flex flex-col gap-2">
        <h2
          id="tech-stack-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {groups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Parts -------------------------------- */

function SkillGroup({ group }: { group: Group }): React.JSX.Element {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        {group.title}
      </h3>
      <div className="space-y-4">
        {group.skills.map((s) => (
          <SkillRow key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }): React.JSX.Element {
  const clamped = clamp0to100(skill.level);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{skill.name}</Badge>
          {skill.hint ? (
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {skill.hint}
            </span>
          ) : null}
        </div>
        <span className="tabular-nums text-xs text-muted-foreground">
          {clamped}%
        </span>
      </div>

      <Progress
        value={clamped}
        aria-label={`${skill.name} level is ${clamped} percent`}
      />
    </div>
  );
}

function clamp0to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}
