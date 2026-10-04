// src/features/ornekler/sections/SamplesCta.tsx

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { CONTACT_PHONE, whatsappHref, telHref, NEW_TAB_NOTE } from "@/constants/contact";

/* ────────────────────────────── Copy ────────────────────────────── */

const HEADING = "Kendi işiniz için konuşalım";
const BODY =
  "Yukarıdakilerden hangisi işinize yakınsa onu açıp yazın. Ne istediğinizi anlatın, kapsamı ve süreyi birlikte netleştirelim.";
const CTA_LABEL = "WhatsApp'tan yazın";
const CTA_MESSAGE = "Merhaba, örnekleri gördüm. Kendi işim için bilgi almak istiyorum.";
const PACKAGES_LABEL = "Paketlere bakın";

const HEADING_ID = "ornekler-cta-heading";

/* ────────────────────────────── Component ────────────────────────────── */

/**
 * The same call to action /paketler closes with, down to the number: both
 * read CONTACT_PHONE and build their wa.me link with the shared helper, so
 * the number exists in one place.
 *
 * `lang="tr"` for the same reason as the showcase above it.
 */
export default function SamplesCta({
  headingLevel = 2,
  className,
}: {
  headingLevel?: 2 | 3;
  className?: string;
}): React.JSX.Element {
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <section
      lang="tr"
      aria-labelledby={HEADING_ID}
      className={cn("plate p-6 sm:p-8", className)}
    >
      <Heading
        id={HEADING_ID}
        className="text-[length:var(--text-display-sm)] leading-[1.15] text-[var(--text)]"
      >
        {HEADING}
      </Heading>

      <p className="mt-2 max-w-[60ch] text-[length:var(--text-body-base)] leading-[1.6] text-[var(--text-muted)]">
        {BODY}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={whatsappHref(CTA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className="soft-btn soft-btn-primary inline-flex min-h-11 items-center justify-center px-5 text-[length:var(--text-body-sm)] font-medium"
        >
          {CTA_LABEL}
          <span className="sr-only"> ({NEW_TAB_NOTE})</span>
        </a>

        <Link
          href="/paketler"
          draggable={false}
          className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center justify-center px-5 text-[length:var(--text-body-sm)] font-medium"
        >
          {PACKAGES_LABEL}
        </Link>

        <a
          href={telHref()}
          draggable={false}
          className="link-soft inline-flex min-h-11 items-center gap-2 text-[length:var(--text-body-sm)] font-medium text-[var(--accent)]"
        >
          <Phone className="size-3.5" aria-hidden />
          {CONTACT_PHONE.display}
        </a>
      </div>
    </section>
  );
}
