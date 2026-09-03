// src/features/about/sections/AboutIntro.client.tsx
//
// Server component. Nothing here is interactive: no state, no effects, no
// handlers. The only thing that required "use client" was React.useId() for
// the heading id, and there is exactly one AboutIntro per page, so a module
// constant does the same job without shipping the component to the browser.

import React from "react";
import { useMessages, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import { MapPin, Download, ArrowRight } from "lucide-react";

import { ABOUT_DEFAULTS } from "@/features/about/data/about-intro";

const HEADING_ID = "about-intro-heading";

type AboutIntroProps = {
  className?: string;
};

/** Message lists are objects keyed "1", "2", ... ; this reads them in order. */
function values(obj: unknown): string[] {
  return Object.values((obj ?? {}) as Record<string, string>);
}

export default function AboutIntro({ className }: AboutIntroProps): React.JSX.Element {
  const t = useTranslations("about.intro");
  const messages = useMessages();
  const { name, availability, techTags, social, stats, primaryHref, secondaryHref } = ABOUT_DEFAULTS;

  const bio = values(messages.about.intro.bio);
  const highlights = values(messages.about.intro.highlights);

  return (
    <section aria-labelledby={HEADING_ID} className={cn(className)}>
      {/* .plate already carries the border and the 16px radius, so the old
          `rounded-2xl border` alongside it was overriding the token with the
          same value by hand. */}
      <div className="plate p-6 sm:p-8">
        <div className="space-y-8">

          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {/* h2 picks up the display face and weight 800 from the base
                  layer; only the size token belongs here. */}
              <h2
                id={HEADING_ID}
                className="text-[length:var(--text-display-md)] leading-[1.15] text-[var(--text)]"
              >
                {name}
              </h2>

              {availability === "available" ? (
                <span className="chip inline-flex items-center gap-2 px-2.5 py-0.5 text-[length:var(--text-body-xs)] font-medium text-[var(--accent)]">
                  <span className="relative inline-flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  {t("available")}
                </span>
              ) : null}
            </div>

            <p className="text-[length:var(--text-body-base)] text-[var(--text-muted)]">
              {t("role")}
            </p>

            <span className="chip inline-flex items-center gap-1.5 px-3 py-1 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
              <MapPin className="size-3" aria-hidden />
              {t("location")}
            </span>
          </header>

          {/* Same button pair as the home hero: filled primary, hairline
              ghost. The shadcn Button variants are gone. */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              draggable={false}
              aria-label={t("primaryAria")}
              className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
            >
              {t("primary")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>

            <a
              href={secondaryHref}
              download
              draggable={false}
              aria-label={t("secondary")}
              className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
            >
              <Download className="size-4" aria-hidden />
              {t("secondary")}
            </a>

            {social.length > 0 ? (
              <nav aria-label={t("socialNav")} className="ml-auto flex items-center gap-2">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    draggable={false}
                    aria-label={s.label}
                    className="soft-btn soft-btn-ghost inline-flex size-11 items-center justify-center"
                  >
                    <s.icon className="size-4" aria-hidden />
                  </a>
                ))}
              </nav>
            ) : null}
          </div>

          <div className="space-y-3 text-[length:var(--text-body-base)] leading-[1.6] text-[var(--text-muted)]">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {highlights.length > 0 ? (
            <ul className="grid gap-2 text-[length:var(--text-body-sm)] text-[var(--text-muted)] sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span aria-hidden className="inline-block size-1 rounded-full bg-[var(--accent)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
            {t("languages")}
          </p>

          {/* Static labels, not controls: .chip, the same primitive the
              project cards and the footer email use. */}
          {techTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="chip px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {stats.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {stats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
              ))}
            </div>
          ) : null}

        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Parts --------------------------------- */

/**
 * A panel pressed into the plate it sits on, which is what .recessed is for.
 *
 * The old version carried `interactive` plus a hover border change on an
 * element that is not a link, a button, or focusable by anything. It
 * advertised an affordance that does not exist, so both are gone.
 */
function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}): React.JSX.Element {
  return (
    <div className="recessed flex items-center gap-3 px-4 py-3">
      {Icon ? (
        <Icon className="size-4 flex-none text-[var(--accent)]" aria-hidden />
      ) : null}
      <div className="min-w-0">
        <div className="text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
          {label}
        </div>
        <div className="text-[length:var(--text-body-sm)] font-bold tabular-nums text-[var(--accent)]">
          {value}
        </div>
      </div>
    </div>
  );
}
