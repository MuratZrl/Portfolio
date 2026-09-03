// src/app/[locale]/[...rest]/page.tsx
import { notFound } from "next/navigation";

/**
 * Catch-all under the locale segment. Any path that matches no real page
 * lands here and is handed to the locale's not-found.tsx, so a mistyped URL
 * gets the localized 404 inside the normal layout rather than Next's bare
 * default page.
 *
 * The home page and its loading.tsx live in the (home) route group on
 * purpose: a loading.tsx at this level would wrap this route in a Suspense
 * boundary, the shell would flush with a 200 before notFound() ran, and the
 * 404 status would be lost.
 */
export default function CatchAllPage(): never {
  notFound();
}
