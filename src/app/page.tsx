// src/app/page.tsx
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";


export const metadata: Metadata = {
  title: "Murat Zorlu — Home",
  description:
    "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
  openGraph: {
    title: "Portfolio — Home",
    description:
      "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
    type: "website",
    url: "https://example.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Home",
    description:
      "Build, ship, iterate. Simple, fast, and clear. A developer portfolio with clean UX and solid engineering.",
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    // Page sadece layout/padding işini yapıyor; başlık vermiyoruz
    <Page>
      <Hero
        kicker="Murat Zorlu"
        title="Ship reliable web apps, minus the chaos"
        subtitle="Full-stack developer crafting type-safe, production-ready applications."
        techStack={["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker", "Redis", "Tailwind CSS"]}
        primary={{ href: "/about", label: "About" }}
        secondary={{ href: "/projects", label: "Projects" }}
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
