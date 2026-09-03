// src/features/home/sections/Hero.tsx

import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ActionLink = {
  /** Internal path ("/projects"), in-page anchor ("#ornekler") or absolute URL. */
  href: string;
  label: string;
  ariaLabel?: string;
  download?: boolean;
  /** Absolute URLs open in a new tab; the sr-only note is appended by the caller's copy. */
  external?: boolean;
};

type HeroProps = {
  className?: string;
  title: string;
  subtitle: string;
  primary: ActionLink;
  secondary?: ActionLink;
  /** Logistics line stamped at the foot of the plate. Location, timezone, availability. */
  availability?: string;
  /**
   * Desktop-only right column. The portfolio puts the code panel here; the
   * small-business site leaves it out, and the plate then takes the row on
   * its own rather than sitting beside an empty half.
   */
  aside?: React.ReactNode;
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
  aside,
}: HeroProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section
      className={cn("relative w-full", className)}
      aria-labelledby={headingId}
    >
      <div className={cn(aside && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8")}>
      <div className={cn("coupon p-6 sm:p-8", !aside && "max-w-[40rem]")}>
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
          <ActionAnchor
            action={primary}
            className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
          >
            {primary.label}
            <ArrowRight className="size-4" aria-hidden />
          </ActionAnchor>

          {secondary ? (
            <ActionAnchor
              action={secondary}
              className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center px-5 text-[length:var(--text-body-sm)] font-medium"
            >
              {secondary.label}
            </ActionAnchor>
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
        {aside ? <div className="hidden lg:block">{aside}</div> : null}
      </div>
    </section>
  );
}

/**
 * One anchor, three kinds of href. Internal paths go through the locale-aware
 * Link so /projects becomes /en/projects on the English site; anchors and
 * downloads are plain <a>; absolute URLs open in a new tab.
 */
function ActionAnchor({
  action,
  className,
  children,
}: {
  action: ActionLink;
  className: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const isInternalRoute = action.href.startsWith("/") && !action.download;

  if (isInternalRoute) {
    return (
      <Link href={action.href} aria-label={action.ariaLabel} className={className} draggable={false}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={action.href}
      download={action.download}
      aria-label={action.ariaLabel}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      draggable={false}
    >
      {children}
    </a>
  );
}
