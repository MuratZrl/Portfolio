// src/app/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";

import AboutIntro from "@/features/about/sections/AboutIntro.client";
import ExperienceTimeline from "@/features/about/sections/Experience.client";
import CvSection from "@/features/about/sections/CV.client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I work, and what I’ve built — experience timeline, skills, and a downloadable CV.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "About",
    description:
      "Experience, skills, and CV — all in one place.",
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <Page
      title="About"
      description="Who I am, how I work, and what I’ve built."
    >
      {/* Page artık H1 veriyor, o yüzden AboutIntro başlığını H2 yapıyoruz */}
      <AboutIntro />
      <ExperienceTimeline />
      <CvSection />
    </Page>
  );
}
