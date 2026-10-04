// src/app/page.tsx
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import { numberWord } from "@/lib/number-words";
import { getProjectStats } from "@/constants/projects";

import Hero from "@/features/home/sections/Hero";
import HowIBuild from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";

const stats = getProjectStats();

/**
 * Shared by the Open Graph and Twitter descriptions, which carried the same
 * hand-typed "Three client systems in daily production use."
 */
const SOCIAL_DESCRIPTION =
  `I build the internal tools companies run on. Next.js, NestJS, Go and PostgreSQL. ` +
  `${numberWord(stats.client, { capitalize: true })} client systems in daily production use.`;

export const metadata: Metadata = {
  /**
   * `absolute` bypasses the layout's "Murat Zorlu | %s" template. Without it
   * the tab reads "Murat Zorlu | Home", which names the route, not the person.
   */
  title: { absolute: "Murat Zorlu | Fullstack developer, Istanbul" },
  description:
    "Admin panels, dashboards and sync engines running in production. Next.js, NestJS, Go and PostgreSQL. Open to full-time and contract work.",
  /**
   * Resolves against `metadataBase` to https://muratzorlu.dev/. Declared here
   * rather than in the root layout even though every page needs one: Next.js
   * inherits `alternates` down the tree, so a layout-level "/" would quietly
   * make the home page canonical for any future route that forgets its own.
   * A missing canonical lets Google infer the URL; a wrong one tells it to
   * throw the page away.
   */
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "Murat Zorlu | Fullstack developer, Istanbul",
    description: SOCIAL_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Murat Zorlu | Fullstack developer, Istanbul",
    description: SOCIAL_DESCRIPTION,
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    <Page>
      <Hero
        title="I build the internal tools companies run on"
        /* The count is derived; the sectors after the colon are written by
           hand, because "two real estate agencies" is a noun the data does not
           carry. Adding a client in a new sector means editing this list. */
        subtitle={
          `Next.js, NestJS, Go and PostgreSQL. ` +
          `${numberWord(stats.client, { capitalize: true })} of these systems are in daily use: ` +
          `a metal manufacturer, two real estate agencies, an e-commerce operation.`
        }
        primary={{ href: "/projects", label: "See the projects" }}
        secondary={{
          href: "/cv/Murat_Zorlu_CV.pdf",
          label: "Download the CV",
          ariaLabel: "Download the CV as a PDF",
          download: true,
        }}
        availability="Istanbul · UTC+3 · open to full-time roles and contract work"
        className="pb-10 sm:pb-12"
      />

      <HowIBuild />
      <FeaturedProjects />
      <TechStack />
      <FinalCta />
    </Page>
  );
}
