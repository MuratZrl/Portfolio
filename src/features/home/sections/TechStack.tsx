// src/features/home/sections/TechStack.tsx
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { DEFAULT_GROUPS } from "@/features/home/data";
import type { TechStackProps, Skill, Group } from "@/features/home/types/tech-stack";

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
