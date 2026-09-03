// src/features/home/HomeEn.tsx
//
// The English home: the developer portfolio as it stood before the site got
// a Turkish default. Same sections, same order; the copy now comes from
// messages/en.json rather than from inline strings and data files.
//
// Section ids are stable anchors (#projects, #stack, #contact) so any old
// in-page link keeps landing where it used to.

import React from "react";
import { useMessages, useTranslations } from "next-intl";

import { CV_PATH, SOCIAL_URLS } from "@/lib/site";
import type { ValueItem } from "@/features/home/types/value-props";

import Hero from "@/features/home/sections/Hero";
import CodePanel from "@/features/home/sections/CodePanel";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";

const HOW_I_BUILD_KEYS = ["keyboard", "lean", "open"] as const;

/** Message lists are objects keyed "1", "2", ... ; this reads them in order. */
function values(obj: unknown): string[] {
  return Object.values((obj ?? {}) as Record<string, string>);
}

export default function HomeEn(): React.JSX.Element {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const messages = useMessages();

  const howIBuild: ValueItem[] = HOW_I_BUILD_KEYS.map((key) => ({
    title: t(`howIBuild.items.${key}.title`),
    description: t(`howIBuild.items.${key}.description`),
    highlights: values(messages.home.howIBuild.items[key].highlights),
    tags: values(messages.home.howIBuild.items[key].tags),
    check: t(`howIBuild.items.${key}.check`),
    // The third claim names a destination, the first two name an action.
    ...(key === "open"
      ? { checkHref: SOCIAL_URLS.github, checkNewTabNote: tCommon("opensInNewTab") }
      : {}),
  }));

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primary={{ href: "/projects", label: t("hero.primary") }}
        secondary={{
          href: CV_PATH,
          label: t("hero.secondary"),
          ariaLabel: t("hero.secondaryAria"),
          download: true,
        }}
        availability={t("hero.availability")}
        aside={<CodePanel />}
        className="pb-10 sm:pb-12"
      />

      <ValueProps
        id="how-i-build"
        heading={t("howIBuild.heading")}
        subheading={t("howIBuild.subheading")}
        checkPrefix={t("howIBuild.checkPrefix")}
        items={howIBuild}
      />
      <FeaturedProjects id="projects" />
      <TechStack id="stack" />
      <FinalCta
        id="contact"
        badge={t("finalCta.badge")}
        heading={t("finalCta.heading")}
        subheading={t("finalCta.subheading")}
        steps={[
          { label: t("finalCta.steps.1.label"), description: t("finalCta.steps.1.description") },
          { label: t("finalCta.steps.2.label"), description: t("finalCta.steps.2.description") },
          { label: t("finalCta.steps.3.label"), description: t("finalCta.steps.3.description") },
        ]}
        primary={{ href: "/contact", label: t("finalCta.primary") }}
      />
    </>
  );
}
