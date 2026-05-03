// src/features/home/sections/TechStack.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { DEFAULT_GROUPS } from "@/features/home/data";
import type { TechStackProps, Skill, Group } from "@/features/home/types/tech-stack";

export default function TechStack({
  heading = "Tech Stack",
  subheading = "Technologies I work with day-to-day.",
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

      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Parts -------------------------------- */

function SkillGroup({ group }: { group: Group }): React.JSX.Element {
  const Icon = group.icon;

  return (
    <div className={cn(
      "rounded-xl border p-5",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
    )}>
      <div className="mb-4 flex items-center gap-3">
        {Icon ? (
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        ) : null}
        <h3 className="text-sm font-semibold">{group.title}</h3>
        <span className="ml-auto text-[11px] text-muted-foreground">
          {group.skills.length}
        </span>
      </div>

      <ul className="space-y-2">
        {group.skills.map((s) => (
          <SkillRow key={s.name} skill={s} />
        ))}
      </ul>
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }): React.JSX.Element {
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="text-sm font-semibold">{skill.name}</span>
      {skill.hint ? (
        <span className="text-[12px] text-muted-foreground">— {skill.hint}</span>
      ) : null}
    </li>
  );
}
