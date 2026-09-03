// src/features/home/HomeTr.tsx
//
// The Turkish home: the small-business offer. Hero, what I build, examples,
// how it works, contact. Same design system and the same section components
// as the portfolio; only the words, the targets and the section set differ.
//
// No code panel beside the hero and no stack list: both are jargon to a
// shop owner. The hero's right column carries a phone screenshot of a live
// client site instead, and it stacks under the plate on small screens.

import React from "react";
import { useMessages, useTranslations } from "next-intl";

import { whatsappHref } from "@/lib/site";
import type { Project } from "@/constants/projects";
import type { ValueItem } from "@/features/home/types/value-props";
import { EXAMPLE_SITES } from "@/features/local/data/examples";

import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import FinalCta from "@/features/home/sections/FinalCTA";
import ContactSection from "@/features/local/sections/ContactSection";
import HeroShot from "@/features/local/sections/HeroShot";

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

  // The examples in the exact shape the English featured cards render from,
  // so they go through FeaturedProjects and ProjectCard unchanged. `slug` is
  // only a React key here: `titleHrefs` sends the title to the live site.
  const examples: Project[] = EXAMPLE_SITES.map((site) => ({
    slug: `/examples/${site.key}`,
    title: t(`examples.items.${site.key}.title`),
    summary: t(`examples.items.${site.key}.summary`),
    tags: values(messages.home.examples.items[site.key].tags),
    category: "Business site",
    sector: site.sector,
    sectorLabel: t(`examples.items.${site.key}.sector`),
    badge: { label: t(`examples.items.${site.key}.sector`), variant: "muted" },
    image: { src: site.image, alt: t(`examples.items.${site.key}.imageAlt`) },
    links: { demo: { href: site.href, label: t("examples.visit") } },
  }));
  const exampleHrefs = Object.fromEntries(
    EXAMPLE_SITES.map((site) => [`/examples/${site.key}`, site.href]),
  );

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ href: waHref, label: t("hero.primary"), external: true }}
        secondary={{ href: "#ornekler", label: t("hero.secondary"), ariaLabel: t("hero.secondaryAria") }}
        availability={t("hero.availability")}
        aside={<HeroShot />}
        stackAside
        className="pb-10 sm:pb-12"
      />

      <ValueProps
        id="hizmetler"
        heading={t("services.heading")}
        subheading={t("services.subheading")}
        checkPrefix={t("services.examplePrefix")}
        items={services}
      />
      <FeaturedProjects
        id="ornekler"
        projects={examples}
        heading={t("examples.heading")}
        subheading={t("examples.subheading")}
        allLink={null}
        titleHrefs={exampleHrefs}
      />
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
