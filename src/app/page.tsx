// src/app/page.tsx
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";


export const metadata: Metadata = {
  title: "Home",
  description:
    "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "Murat Zorlu | Home",
    description:
      "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murat Zorlu | Home",
    description:
      "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    // Page sadece layout/padding işini yapıyor; başlık vermiyoruz
    <Page>
      <Hero
        title="Full-Stack Developer building type-safe web apps"
        subtitle="Next.js, NestJS & TypeScript. Available for remote roles and freelance work."
        primary={{ href: "/projects", label: "Projects" }}
        secondary={{ href: "/about", label: "About" }}
        statusText="Available for work"
        align="center"
        className="py-20 sm:py-28"
      />

      <ValueProps />
      <FeaturedProjects />
      <TechStack />

      <FinalCta />
    </Page>
  );
}
