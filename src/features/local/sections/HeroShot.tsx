// src/features/local/sections/HeroShot.tsx
//
// The Turkish hero's right column: a plain phone-width screenshot of a live
// client site, in the same card the portfolio's CodePanel uses (hairline
// border, surface fill, small radius, caption underneath). No device frame:
// the site is the evidence, the chrome would be decoration.
//
// Server component. The caption comes from messages; the image is a
// build-time asset captured at 390x844.

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const SHOT = {
  src: "/images/projects/yenigunemlak-mobile.png",
  width: 780,
  height: 1688,
} as const;

export default function HeroShot({ className }: { className?: string }): React.JSX.Element {
  const t = useTranslations("home.hero");

  return (
    <figure className={cn("flex min-w-0 flex-col", className)}>
      <div className="min-w-0 rounded-[var(--radius-sm)] border border-[var(--edge-soft)] bg-[var(--surface)] p-4">
        {/* Phone width, not column width: a 390px screenshot stretched to a
            600px column is a blur. The box is cropped to roughly the plate's
            height so the two columns read as one row; object-top keeps the
            search card and the city chips in view. */}
        <div className="relative mx-auto aspect-[39/70] w-full max-w-[280px] overflow-hidden rounded-[var(--radius-sm)] border border-[var(--edge-soft)] bg-[var(--ground)]">
          <Image
            src={SHOT.src}
            alt={t("shotAlt")}
            fill
            priority
            draggable={false}
            sizes="280px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <figcaption className="mt-3 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
        {t("shotCaption")}
      </figcaption>
    </figure>
  );
}
