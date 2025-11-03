// src/app/page.tsx
import Hero from "@/features/home/sections/Hero";
import ValueProps from "@/features/home/sections/ValueProps";
import FeaturedProjects from "@/features/home/sections/FeaturedProjects";
import TechStack from "@/features/home/sections/TechStack";
import FinalCta from "@/features/home/sections/FinalCTA";

import { Gauge, ShieldCheck } from "lucide-react";

import type { Metadata } from "next";
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
    <>
      <Hero
        kicker="Hello, I’m a developer"
        title="Ship quality software without the drama"
        subtitle="Type-safe stacks, testable architectures, and a design system that doesn’t cry itself to sleep."
        primary={{ href: "/about", label: "About" }}
        secondary={{ href: "/projects", label: "Projects" }}
        tertiary={{ href: "/contact", label: "Contact" }}
        badges={[
          { label: "Open to work" },
          { label: "TypeScript first" },
          { label: "Accessible UI" },
        ]}
        stats={[
          { label: "Years Experience", value: "5+" },
          { label: "Projects Delivered", value: "30+" },
          { label: "Satisfied Clients", value: "20+" },
        ]}
        showScrollCue
      />
      
      <ValueProps/>
      <FeaturedProjects/>
      <TechStack/>

      <FinalCta
        variant="split"
        media={{ type: "image", src: "/images/projects/analytics.png", alt: "Analytics" }}
        highlights={["Server Actions", "Caching Strategy", "Lighthouse 95+"]}
        stats={[
          { label: "Lighthouse", value: "97", icon: Gauge },
          { label: "Accessibility", value: "AA", icon: ShieldCheck },
        ]}
        tertiary={{ href: "/projects", label: "All Projects" }}
      />

      {/* Sonraki section'lar buraya eklenecek */}
    </>
  );
}
