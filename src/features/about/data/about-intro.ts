// src/features/about/data/about-intro.ts
//
// Data only. The role, location, bio and highlights are copy and live in
// messages under `about.intro`; what remains here is what a translation
// would not change: the name, the profile URLs, the stack tags and the CTA
// targets.

import type { AboutIntroDefaults } from "@/features/about/types";
import { CV_PATH, SOCIAL_URLS } from "@/lib/site";

import { Github, Linkedin } from "lucide-react";

export const ABOUT_DEFAULTS: AboutIntroDefaults = {
  name: "Murat Zorlu",
  availability: "available",
  techTags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker", "Redis", "Supabase", "Tailwind CSS", "MUI", "Prisma"],
  social: [
    { href: SOCIAL_URLS.github, label: "GitHub", icon: Github },
    { href: SOCIAL_URLS.linkedin, label: "LinkedIn", icon: Linkedin },
  ],
  stats: [],
  primaryHref: "/contact",
  secondaryHref: CV_PATH,
} as const;
