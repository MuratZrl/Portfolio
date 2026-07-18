// src/features/home/sections/Hero.tsx

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Href = "/" | `/${string}`;

type ActionLink = {
  href: Href;
  label: string;
  ariaLabel?: string;
  download?: boolean;
};

type HeroProps = {
  className?: string;
  title: string;
  subtitle: string;
  primary: ActionLink;
  secondary?: ActionLink;
  /** Logistics line stamped at the foot of the plate. Location, timezone, availability. */
  availability?: string;
};

/**
 * The sample coupon: one chamfered plate carrying the headline, the way a
 * milled sample carries its stamped grade.
 *
 * The H1 has NO animation property of any kind — not a fade, not a delay.
 * Chrome excludes `opacity: 0` elements from LCP candidacy, so animating it
 * would push the LCP timestamp to the first frame where opacity exceeds zero
 * and make the measurement depend on frame scheduling. Everything else
 * assembles around a headline that was already there.
 */
export default function Hero({
  className,
  title,
  subtitle,
  primary,
  secondary,
  availability,
}: HeroProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section
      className={cn("relative w-full", className)}
      aria-labelledby={headingId}
    >
      <div className="coupon p-6 sm:p-8">
        <h1
          id={headingId}
          className="max-w-[18ch] text-[length:var(--text-display-xl)] font-extrabold leading-[0.96] text-scribe"
        >
          {title}
        </h1>

        <p
          data-enter
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-5 max-w-[52ch] text-[length:var(--text-body-lead)] leading-[1.55] text-patina"
        >
          {subtitle}
        </p>

        <div
          data-enter
          style={{ "--i": 2 } as React.CSSProperties}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <Link
            href={primary.href}
            aria-label={primary.ariaLabel}
            className="btn-chamfer inline-flex min-h-11 items-center gap-2 rounded-[--radius-1] bg-eloksal px-5 text-[length:var(--text-body-sm)] font-medium text-[color:var(--primary-foreground)] transition-colors duration-[--dur-fast] ease-[--ease-standard] hover:bg-[--eloksal-hover]"
          >
            {primary.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          {secondary ? (
            <a
              href={secondary.href}
              download={secondary.download}
              aria-label={secondary.ariaLabel}
              className="plate inline-flex min-h-11 items-center rounded-[--radius-1] px-5 text-[length:var(--text-body-sm)] font-medium text-scribe transition-colors duration-[--dur-fast] ease-[--ease-standard] hover:bg-[--accent-surface]"
            >
              {secondary.label}
            </a>
          ) : null}
        </div>

        {/* Stamped at the foot of the plate — where a coupon carries its
            grade and batch. Text only: no dot, no marker. */}
        {availability ? (
          <p
            data-enter
            style={{ "--i": 3 } as React.CSSProperties}
            className="mt-7 border-t border-[--edge-hi] pt-4 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-patina"
          >
            {availability}
          </p>
        ) : null}
      </div>
    </section>
  );
}
