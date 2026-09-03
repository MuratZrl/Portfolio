// src/app/page.tsx
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import Hero from "@/features/home/sections/Hero";
import HowIBuild from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Admin panels, dashboards and sync engines running in production. Next.js, NestJS, Go and PostgreSQL. Open to full-time and contract work.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "Murat Zorlu | Fullstack developer, Istanbul",
    description:
      "I build the internal tools companies run on. Next.js, NestJS, Go and PostgreSQL. Three client systems in daily production use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murat Zorlu | Fullstack developer, Istanbul",
    description:
      "I build the internal tools companies run on. Next.js, NestJS, Go and PostgreSQL. Three client systems in daily production use.",
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    <Page>
      <Hero
        title="I build the internal tools companies run on"
        subtitle="Next.js, NestJS, Go and PostgreSQL. Three of these systems are in daily use: a metal manufacturer, a real estate agency, an e-commerce operation."
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
