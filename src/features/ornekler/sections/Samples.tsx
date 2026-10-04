// src/features/ornekler/sections/Samples.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { NEW_TAB_NOTE } from "@/constants/contact";
import {
  SAMPLE_SECTIONS,
  type SampleItem,
  type SampleSection,
} from "@/features/ornekler/data/samples";

/* ────────────────────────────── Copy ────────────────────────────── */

const HEADING = "Örnekler";
const SUBHEADING =
  "Sektörünüze yakın bir örneği açın, telefonunuzdan gezin. Hepsi canlı: butona bastığınızda sitenin kendisi açılır.";
const BADGE_NOTE =
  "“Örnek” işaretli olanlar müşteri işi değil, ne yaptığımı göstermek için hazırlanmış sitelerdir.";
const LIVE_LABEL = "Canlı incele";
const DETAIL_LABEL = "Projeyi oku";

const HEADING_ID = "ornekler-heading";

/* ────────────────────────────── Component ────────────────────────────── */

type SamplesProps = {
  /**
   * 1 where this section is the whole page and owns the h1 (/ornekler), the
   * way Packages does on /paketler. Section titles and card titles follow one
   * step down either way, so the outline never skips a level.
   */
  headingLevel?: 1 | 2;
  className?: string;
};

/**
 * `lang="tr"` because the document is `lang="en"` and every string below is
 * Turkish. Without it a screen reader reads this page in the wrong voice.
 * Packages does the same thing on /paketler.
 *
 * Server component: nothing here is stateful. The cards are not links, so
 * they get no `.interactive` and no hover lift. The buttons inside them are
 * the only things you can press, which keeps a card with two actions (the
 * live site and its write-up) from having a third, invisible one covering
 * both.
 */
export default function Samples({
  headingLevel = 2,
  className,
}: SamplesProps): React.JSX.Element {
  const Heading = (headingLevel === 1 ? "h1" : "h2") as "h1" | "h2";
  const SectionHeading = (headingLevel === 1 ? "h2" : "h3") as "h2" | "h3";
  const CardHeading = (headingLevel === 1 ? "h3" : "h4") as "h3" | "h4";

  return (
    <section lang="tr" aria-labelledby={HEADING_ID} className={cn("w-full", className)}>
      <Heading
        id={HEADING_ID}
        className="text-[length:var(--text-display-md)] leading-[1.05] text-[var(--text)]"
      >
        {HEADING}
      </Heading>
      <p className="mt-2 max-w-[68ch] text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]">
        {SUBHEADING}
      </p>
      <p className="mt-3 max-w-[68ch] text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
        {BADGE_NOTE}
      </p>

      {SAMPLE_SECTIONS.map((section) => (
        <SampleGroup
          key={section.id}
          section={section}
          SectionHeading={SectionHeading}
          CardHeading={CardHeading}
        />
      ))}
    </section>
  );
}

function SampleGroup({
  section,
  SectionHeading,
  CardHeading,
}: {
  section: SampleSection;
  SectionHeading: "h2" | "h3";
  CardHeading: "h3" | "h4";
}): React.JSX.Element {
  const headingId = `${section.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-12">
      <SectionHeading
        id={headingId}
        className="text-[length:var(--text-display-sm)] leading-[1.15] text-[var(--text)]"
      >
        {section.title}
      </SectionHeading>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <SampleCard key={item.id} item={item} CardHeading={CardHeading} />
        ))}
      </div>
    </section>
  );
}

function SampleCard({
  item,
  CardHeading,
}: {
  item: SampleItem;
  CardHeading: "h3" | "h4";
}): React.JSX.Element {
  return (
    <article className="plate flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--edge-soft)] bg-[var(--muted)]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
            {item.sector}
          </span>
          {/* The badge is text, not colour: "Örnek" and "Gerçek müşteri" are
              the whole distinction, and colour alone would hide it from
              anyone who cannot see the difference (WCAG 1.4.1). Same hairline
              separator the project cards use for provenance. */}
          <span className="flex items-center gap-2 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]">
            <span aria-hidden className="h-px w-4 bg-[var(--edge)]" />
            {item.badge}
          </span>
        </div>

        <CardHeading className="text-[length:var(--text-display-xs)] font-bold leading-[1.2] text-[var(--text)]">
          {item.name}
        </CardHeading>

        <p className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
          {item.description}
        </p>

        <ul role="list" className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {item.features.map((feature) => (
            <li
              key={feature}
              className="chip px-2 py-0.5 text-[length:var(--text-body-xs)] font-medium tracking-[0.01em] text-[var(--text-muted)]"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--edge-soft)] pt-4">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            draggable={false}
            className="soft-btn soft-btn-primary inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
          >
            <ExternalLink className="size-4" aria-hidden />
            {LIVE_LABEL}
            {/* The accessible name has to carry the site, or seven buttons
                all read as "Canlı incele" one after another. */}
            <span className="sr-only">: {item.name} ({NEW_TAB_NOTE})</span>
          </a>

          {item.detailHref ? (
            <Link
              href={item.detailHref}
              draggable={false}
              className="link-soft inline-flex min-h-11 items-center gap-1.5 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
            >
              {DETAIL_LABEL}
              <ArrowRight className="size-4" aria-hidden />
              <span className="sr-only">: {item.name}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
