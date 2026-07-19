// src/features/home/sections/Hero.tsx

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import CodePanel from "@/features/home/sections/CodePanel";

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
      <div className="lg:grid lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className="coupon p-6 sm:p-8">
        <h1
          id={headingId}
          className="max-w-[18ch] text-[length:var(--text-display-xl)] font-extrabold leading-[0.96] text-[var(--text)]"
        >
          {title}
        </h1>

        <p
          data-enter
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-5 max-w-[52ch] text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]"
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
            className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
              draggable={false}
            >
            {primary.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          {secondary ? (
            <a
              href={secondary.href}
              download={secondary.download}
              aria-label={secondary.ariaLabel}
              className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center px-5 text-[length:var(--text-body-sm)] font-medium"
              draggable={false}
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
            className="mt-7 border-t border-[var(--edge-soft)] pt-4 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
          >
            {availability}
          </p>
        ) : null}
      </div>

        {/* Desktop only. It does not stack on smaller screens — a code block
            below the CTAs on a phone is scroll cost, not information. */}
        <div className="hidden lg:block">
          <CodePanel />
        </div>
      </div>
    </section>
  );
}
