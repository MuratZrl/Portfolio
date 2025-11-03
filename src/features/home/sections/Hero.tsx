// src/features/home/sections/Hero.tsx
// A minimalist hero: single column, large title, short subtitle, two actions.
// No gradients, no grids, no icons. Just content.

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Href = "/" | `/${string}`;

type ActionLink = {
  href: Href;
  label: string;
  ariaLabel?: string;
};

type HeroProps = {
  className?: string;
  /** Small line above the title. Not shown if empty. */
  kicker?: string;
  title?: string;
  subtitle?: string;
  /** Primary action as a solid button */
  primary?: ActionLink;
  /** Secondary action as a subtle text link */
  secondary?: ActionLink;
};

export default function Hero({
  className,
  kicker,
  title = "Build clearly. Ship confidently.",
  subtitle = "Type-safe code, clean UX, and a workflow that respects your time.",
  primary = { href: "/about", label: "About" },
  secondary = { href: "/projects", label: "Projects" },
}: HeroProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative flex items-center",
        "py-24 sm:py-32",
        className
      )}
      aria-label="Hero"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {kicker && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {kicker}
          </p>
        )}

        <h1 className="mt-2 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            aria-label={primary.ariaLabel ?? `Go to ${primary.label} page`}
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>

          {secondary && (
            <Link
              className={cn(
                "text-sm font-medium underline underline-offset-4",
                "text-muted-foreground hover:text-foreground"
              )}
              href={secondary.href}
              aria-label={secondary.ariaLabel ?? `Go to ${secondary.label} page`}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
