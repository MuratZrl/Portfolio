// src/features/home/HomeTr.tsx
//
// The Turkish home: the small-business offer. Hero, what I build, examples,
// how it works, contact. Same design system and the same section components
// as the portfolio; only the words, the targets and the section set differ.
//
// No code panel beside the hero and no stack list: both are jargon to a
// shop owner, and the hero copy already says who the site is for.

import React from "react";
import { useMessages, useTranslations } from "next-intl";

import { whatsappHref } from "@/lib/site";
import type { ValueItem } from "@/features/home/types/value-props";

import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FinalCta from "@/features/home/sections/FinalCTA";
import Examples from "@/features/local/sections/Examples";
import ContactSection from "@/features/local/sections/ContactSection";

/** Service key -> the example site that demonstrates it. */
const SERVICES = [
  { key: "realEstate", exampleHref: "https://yenigunemlak.com" },
  { key: "brochure", exampleHref: "https://salon-aura-demo.vercel.app" },
  { key: "booking", exampleHref: "https://ritim-fitness.vercel.app" },
] as const;

/** Message lists are objects keyed "1", "2", ... ; this reads them in order. */
function values(obj: unknown): string[] {
  return Object.values((obj ?? {}) as Record<string, string>);
}

export default function HomeTr(): React.JSX.Element {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tWa = useTranslations("whatsapp");
  const messages = useMessages();

  const waHref = whatsappHref(tWa("defaultMessage"));

  const services: ValueItem[] = SERVICES.map(({ key, exampleHref }) => ({
    title: t(`services.items.${key}.title`),
    description: t(`services.items.${key}.description`),
    highlights: values(messages.home.services.items[key].highlights),
    check: t(`services.items.${key}.example`),
    checkHref: exampleHref,
    checkNewTabNote: tCommon("opensInNewTab"),
  }));

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ href: waHref, label: t("hero.primary"), external: true }}
        secondary={{ href: "#ornekler", label: t("hero.secondary"), ariaLabel: t("hero.secondaryAria") }}
        availability={t("hero.availability")}
        className="pb-10 sm:pb-12"
      />

      <ValueProps
        id="hizmetler"
        heading={t("services.heading")}
        subheading={t("services.subheading")}
        checkPrefix={t("services.examplePrefix")}
        items={services}
      />
      <Examples id="ornekler" />
      <FinalCta
        id="nasil-calisir"
        badge={t("howItWorks.badge")}
        heading={t("howItWorks.heading")}
        subheading={t("howItWorks.subheading")}
        steps={[
          { label: t("howItWorks.steps.1.label"), description: t("howItWorks.steps.1.description") },
          { label: t("howItWorks.steps.2.label"), description: t("howItWorks.steps.2.description") },
          { label: t("howItWorks.steps.3.label"), description: t("howItWorks.steps.3.description") },
        ]}
        primary={{ href: waHref, label: t("howItWorks.primary"), external: true }}
      />
      <ContactSection id="iletisim" />
    </>
  );
}
