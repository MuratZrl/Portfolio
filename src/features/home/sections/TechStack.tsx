// src/features/home/sections/TechStack.tsx

import React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { DEFAULT_GROUPS } from "@/features/home/data";
import type { TechStackProps } from "@/features/home/types/tech-stack";

/**
 * A reference index, not a feature section.
 *
 * Four cards for 24 short strings was mostly padding. One flat block, one
 * line per group, items inline. The per-item annotations are dropped rather
 * than moved to `title` — a title attribute is invisible to keyboard and
 * touch users, so it would be decoration pretending to be information, and
 * the "what I use it for" depth already lives on the project pages.
 *
 * Group titles come from messages; the skill names are proper nouns and stay
 * in the data file.
 *
 * Server component — nothing here is interactive.
 */
export default function TechStack({
  id,
  groups = DEFAULT_GROUPS,
  className,
}: TechStackProps): React.JSX.Element {
  const t = useTranslations("home.stack");

  return (
    <section id={id} aria-labelledby="tech-stack-heading" className={cn("py-10 sm:py-12", className)}>
      <h2
        id="tech-stack-heading"
        className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
      >
        {t("heading")}
      </h2>
      <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
        {t("subheading")}
      </p>

      <dl className="mt-4 border-t border-[var(--edge-soft)]">
        {groups.map((group) => (
          <div
            key={group.key}
            className="grid gap-x-6 gap-y-1 border-b border-[var(--edge-soft)] py-2 sm:grid-cols-[minmax(170px,auto)_1fr]"
          >
            <dt className="text-[length:var(--text-body-sm)] font-medium text-[var(--text)]">
              {t(`groups.${group.key}`)}
            </dt>
            <dd className="text-[length:var(--text-body-sm)] leading-relaxed text-[var(--text-muted)]">
              {group.skills.map((s, i) => (
                <React.Fragment key={s.name}>
                  {i > 0 ? <span aria-hidden className="px-1.5 opacity-50">·</span> : null}
                  {s.name}
                </React.Fragment>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
