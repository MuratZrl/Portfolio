// src/features/home/sections/FinalCta.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Heart } from "lucide-react";

import type {
  CtaLink,
  Stat,
  Media,
  Variant,
  FinalCtaProps,
} from "@/features/home/types/final-cta";
import { FINAL_CTA_DEFAULTS } from "@/features/home/data";

export default function FinalCta({
  heading = FINAL_CTA_DEFAULTS.heading,
  subheading = FINAL_CTA_DEFAULTS.subheading,
  primary = FINAL_CTA_DEFAULTS.primary,
  secondary = FINAL_CTA_DEFAULTS.secondary,
  tertiary,
  highlights = FINAL_CTA_DEFAULTS.highlights,
  stats = FINAL_CTA_DEFAULTS.stats,
  media = FINAL_CTA_DEFAULTS.media,
  showDonateHint = FINAL_CTA_DEFAULTS.showDonateHint,
  donateHintText = FINAL_CTA_DEFAULTS.donateHintText,
  className,
  variant = FINAL_CTA_DEFAULTS.variant,
}: FinalCtaProps): React.JSX.Element {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn("py-12 sm:py-16", className)}
    >
      <Card className="relative overflow-hidden">
        {/* Decorative background */}
        <BackgroundDecor />

        <CardContent className={cn("py-10 sm:py-12", layoutPadding(variant))}>
          {variant === "split" ? (
            <div className="grid items-center gap-8 md:grid-cols-2">
              <CopyBlock
                heading={heading}
                subheading={subheading}
                headingId={headingId}
                highlights={highlights}
                stats={stats}
                primary={primary}
                secondary={secondary}
                tertiary={tertiary}
                showDonateHint={showDonateHint}
                donateHintText={donateHintText}
                align="left"
              />
              <MediaBlock media={media} />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <CopyBlock
                heading={heading}
                subheading={subheading}
                headingId={headingId}
                highlights={variant === "minimal" ? [] : highlights}
                stats={variant === "minimal" ? [] : stats}
                primary={primary}
                secondary={secondary}
                tertiary={tertiary}
                showDonateHint={showDonateHint}
                donateHintText={donateHintText}
                align="center"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

/* --------------------------------- Parts --------------------------------- */

function CopyBlock(props: {
  heading: string;
  subheading: string;
  headingId: string;
  highlights: readonly string[];
  stats: readonly Stat[];
  primary: CtaLink;
  secondary: CtaLink;
  tertiary?: CtaLink;
  showDonateHint: boolean;
  donateHintText: string;
  align: "left" | "center";
}): React.JSX.Element {
  const {
    heading,
    subheading,
    headingId,
    highlights,
    stats,
    primary,
    secondary,
    tertiary,
    showDonateHint,
    donateHintText,
    align,
  } = props;

  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-6", alignClass)}>
      <header className={cn(align === "center" ? "" : "max-w-lg")}>
        <h2
          id={headingId}
          className={cn(
            "text-2xl font-semibold tracking-tight sm:text-3xl",
            align === "center" ? "" : "leading-tight"
          )}
        >
          {heading}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {subheading}
        </p>
      </header>

      {highlights.length > 0 ? (
        <Highlights list={highlights} align={align} />
      ) : null}

      {stats.length > 0 ? <StatsRow stats={stats} /> : null}

      <div
        className={cn(
          "mt-2 flex flex-col items-center gap-3 sm:flex-row",
          align === "left" && "items-start"
        )}
      >
        <Button asChild size="lg" aria-label={primary.ariaLabel ?? primary.label}>
          <Link href={primary.href}>
            <Mail className="mr-2 h-4 w-4" aria-hidden />
            {primary.label}
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          aria-label={secondary.ariaLabel ?? secondary.label}
        >
          <Link href={secondary.href}>
            <Heart className="mr-2 h-4 w-4" aria-hidden />
            {secondary.label}
          </Link>
        </Button>

        {tertiary ? (
          <Button
            asChild
            size="lg"
            variant="ghost"
            aria-label={tertiary.ariaLabel ?? tertiary.label}
            className="sm:ml-auto"
          >
            <Link href={tertiary.href}>{tertiary.label}</Link>
          </Button>
        ) : null}
      </div>

      {showDonateHint ? (
        <p
          className={cn(
            "text-xs text-muted-foreground",
            align === "center" ? "" : "max-w-md"
          )}
        >
          {donateHintText}
        </p>
      ) : null}
    </div>
  );
}

function Highlights({
  list,
  align,
}: {
  list: readonly string[];
  align: "left" | "center";
}): React.JSX.Element {
  return (
    <ul
      className={cn(
        "grid gap-2 text-sm text-muted-foreground sm:grid-cols-2",
        align === "center" && "text-left"
      )}
    >
      {list.map((item) => (
        <li key={item} className="flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-primary/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StatsRow({ stats }: { stats: readonly Stat[] }): React.JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <StatItem key={s.label} stat={s} />
      ))}
    </div>
  );
}

function StatItem({ stat }: { stat: Stat }): React.JSX.Element {
  const Icon = stat.icon;
  return (
    <div className="flex items-center align-center gap-2 rounded-md border px-3 py-2">
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      <span className="text-xs text-muted-foreground">{stat.label}</span>
      <span className="ml-auto font-medium tabular-nums">{stat.value}</span>
    </div>
  );
}

function MediaBlock({ media }: { media: Media }): React.JSX.Element {
  if (media.type === "image") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 480px, 100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    );
  }

  // Enhanced pattern: layered grid + dots + glow + rotating conic ring
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border bg-background/40"
      )}
      aria-hidden
    >
      {/* soft glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl opacity-30" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[hsl(var(--primary))] blur-3xl opacity-20" />

      {/* radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,hsl(var(--primary)/0.18),transparent_60%)]" />

      {/* diagonal grid */}
      <div className="absolute inset-0 [background:linear-gradient(to_bottom_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_top_left,hsl(var(--border))_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* subtle dot field */}
      <div className="absolute inset-0 [background-image:radial-gradient(hsl(var(--foreground)/0.06)_1px,transparent_1px)] [background-size:10px_10px]" />

      {/* rotating conic ring */}
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(closest-side,transparent_30%,black_32%)]">
        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_180deg,hsl(var(--primary))_0%,transparent_45%,transparent_100%)]" />
      </div>

      {/* corner label */}
      <div className="absolute right-3 top-3 rounded-full border bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
        Pattern preview
      </div>

      {/* bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
}

function BackgroundDecor(): React.JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,hsl(var(--primary)/0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
    </div>
  );
}

/* -------------------------------- Utils ---------------------------------- */

function layoutPadding(variant: Variant): string {
  switch (variant) {
    case "split":
      return "px-4 sm:px-6 lg:px-8";
    case "minimal":
      return "px-5 sm:px-6";
    case "center":
    default:
      return "px-5 sm:px-6";
  }
}
