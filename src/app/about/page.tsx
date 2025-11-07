// src/app/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";

import AboutIntro from "@/features/about/sections/AboutIntro.client";
import ExperienceTimeline from "@/features/about/sections/Experience.client";
import Principles from "@/features/about/sections/Principles.client";
import SkillsMatrix from "@/features/about/sections/Skills.client";
import Testimonials from "@/features/about/sections/Testimonials.client";
import FAQ from "@/features/about/sections/FAQ.client";
import CvSection from "@/features/about/sections/CV.client";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Who I am, how I work, and what I’ve built — experience timeline, principles, skills, testimonials, FAQ, and a downloadable CV.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Experience, principles, skills, testimonials, FAQ, and CV — all in one place.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <Page
      title="About Me"
      description="Who I am, how I work, and what I’ve built."
    >
      {/* Page artık H1 veriyor, o yüzden AboutIntro başlığını H2 yapıyoruz */}
      <AboutIntro />
      <ExperienceTimeline />
      <Principles />
      <SkillsMatrix />
      {/* <Testimonials /> */}
      <FAQ />
      <CvSection />
    </Page>
  );
}
