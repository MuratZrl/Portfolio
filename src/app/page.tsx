// src/app/page.tsx
import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";

import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/Projects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";

import { presetSplitPattern } from "@/features/home/data"; // ← index.ts

import { Gauge, ShieldCheck } from "lucide-react";

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
        subtitle="Next.js 16 · Node.js · TypeScript · Shadcn UI · MUI · Supabase"
        primary={{ href: "/about", label: "About" }}
        secondary={{ href: "/projects", label: "Projects" }}
        align="center"
        className="py-16 sm:py-24"
      />

      <ValueProps />
      <FeaturedProjects />
      <TechStack />

      {/* Image'lı split varyant */}
      <FinalCta
        {...presetSplitPattern()}
        highlights={["Server Actions", "Caching Strategy"]}
        stats={[
          { label: "Lighthouse", value: "95", icon: Gauge },
          { label: "Accessibility", value: "AA", icon: ShieldCheck },
        ]}
        tertiary={{ href: "/projects", label: "All Projects" }}
      />
    </Page>
  );
}
