// src/features/packages/sections/Packages.tsx

import React from "react";
import { useMessages, useTranslations } from "next-intl";
import { Check, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { CONTACT_PHONE, TEL_HREF, whatsappHref } from "@/lib/site";

/* ────────────────────────────── Data ────────────────────────────── */

type PackageKey = "brochure" | "catalogue" | "system";

/**
 * Two shapes, not one nullable price. The scoped package has no number to
 * print and never will, so it carries a sentence where the others carry a
 * setup fee and a renewal fee. A discriminated union makes the renderer
 * handle both instead of guarding on an empty string.
 */
type PackageItem = {
  key: PackageKey;
  price: "fixed" | "scoped";
  /** Prints a second, visible tel: link under the CTA. */
  showPhone: boolean;
};

/**
 * Structure only. Titles, summaries, feature lists, prices and CTA text all
 * live in messages under `packages.cards.<key>`: change a figure once there
 * and it changes everywhere it is rendered.
 */
const PACKAGES: readonly PackageItem[] = [
  { key: "brochure", price: "fixed", showPhone: false },
  { key: "catalogue", price: "fixed", showPhone: false },
  { key: "system", price: "scoped", showPhone: true },
] as const;

/** A module constant, not useId: this section stays a server component. */
const HEADING_ID = "packages-heading";

/** Message lists are objects keyed "1", "2", ... ; this reads them in order. */
function values(obj: unknown): string[] {
  return Object.values((obj ?? {}) as Record<string, string>);
}

/* ────────────────────────────── Component ────────────────────────────── */

type PackagesProps = {
  /**
   * 1 where this section is the whole page and owns the h1 (/paketler), the
   * way Hero owns it on /. 2 where it sits under another page's h1. Card
   * titles follow one step down either way, so the outline never skips.
   */
  headingLevel?: 1 | 2;
  className?: string;
};

/**
 * Three packages, one card each, no card-level affordance: the card is not a
 * link, so it gets no `.interactive` and no hover state. The CTA inside it is
 * the only thing you can press.
 *
 * Server component: nothing here is stateful.
 */
export default function Packages({
  headingLevel = 2,
  className,
}: PackagesProps): React.JSX.Element {
  const t = useTranslations("packages");
  const messages = useMessages();
  const Heading = (headingLevel === 1 ? "h1" : "h2") as "h1" | "h2";
  const CardHeading = (headingLevel === 1 ? "h2" : "h3") as "h2" | "h3";

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn("w-full", className)}
    >
      <Heading
        id={HEADING_ID}
        className="text-[length:var(--text-display-md)] leading-[1.05] text-[var(--text)]"
      >
        {t("heading")}
      </Heading>
      <p className="mt-2 max-w-[68ch] text-[length:var(--text-body-lead)] leading-[1.55] text-[var(--text-muted)]">
        {t("subheading")}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg) => {
          const card = messages.packages.cards[pkg.key];
          const features = values(card.features);
          return (
            <article
              key={pkg.key}
              className="plate flex flex-col p-6 sm:p-7"
            >
              <CardHeading className="text-[length:var(--text-display-sm)] leading-[1.15] text-[var(--text)]">
                {t(`cards.${pkg.key}.title`)}
              </CardHeading>

              <p className="mt-2 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--text-muted)]">
                {t(`cards.${pkg.key}.summary`)}
              </p>

              <ul role="list" className="mt-5 mb-6 grid gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--text)]"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* `mt-auto` pins the price and the CTA to the foot of the card,
                  so the three buttons line up however unevenly the summaries
                  and feature lists wrap above them. */}
              <div className="mt-auto border-t border-[var(--edge-soft)] pt-4">
                {"setup" in card ? (
                  <>
                    <p className="text-[length:var(--text-display-sm)] font-semibold leading-[1.2] text-[var(--text)]">
                      {card.setup}
                    </p>
                    <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
                      {card.renewal}
                    </p>
                  </>
                ) : (
                  <p className="text-[length:var(--text-body-base)] font-medium leading-[1.5] text-[var(--text)]">
                    {card.note}
                  </p>
                )}

                {/* Above the button, not below it. Below, the extra line pushes
                    this card's CTA 36px clear of the other two and the row of
                    buttons stops reading as a row. */}
                {pkg.showPhone ? (
                  <a
                    href={TEL_HREF}
                    draggable={false}
                    className="link-soft mt-3 inline-flex min-h-6 items-center gap-2 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
                  >
                    <Phone className="size-3.5" aria-hidden />
                    {CONTACT_PHONE.display}
                  </a>
                ) : null}
              </div>

              <a
                href={whatsappHref(t(`cards.${pkg.key}.ctaMessage`))}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="soft-btn soft-btn-primary mt-5 inline-flex min-h-11 w-full items-center justify-center px-5 text-[length:var(--text-body-sm)] font-medium"
              >
                {t(`cards.${pkg.key}.cta`)}
                <span className="sr-only"> ({t("newTab")})</span>
              </a>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-[length:var(--text-body-sm)] text-[var(--text-muted)]">
        {t("footnote")}
      </p>
    </section>
  );
}
