// src/app/[locale]/twitter-image.tsx
//
// Twitter card image — shares the renderer from opengraph-image.tsx so the
// JSX/font-loading logic stays in one place. Route segment config
// (`alt`, `size`, `contentType`) must be declared inline here: Next.js
// statically parses these fields and refuses re-exports.
//
// No `runtime` export: the default (Node.js) is what lets this prerender at
// build time, now that the shared renderer reads its fonts off disk instead
// of fetching them per request.

import { routing } from "@/i18n/routing";

export const alt = "Murat Zorlu";

export const size = {
  width: 1200,
  height: 630,
} as const;

export const contentType = "image/png";

// Must be declared here as well: Next reads it per file, not through the
// re-export below, and without it this route renders on demand.
export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export { default } from "./opengraph-image";
