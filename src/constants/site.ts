// src/constants/site.ts

/**
 * The site's canonical origin, and the only place it is written down.
 *
 * Hard-coded on purpose. It used to be read as
 * `process.env.NEXT_PUBLIC_SITE_URL ?? "https://muratzorlu.dev"` in the root
 * layout, which left every canonical and every og:url one mis-set Vercel
 * environment variable away from naming a *.vercel.app deployment host. A
 * deployment that advertises itself as canonical is worse than one with no
 * canonical at all: it invites Google to fold the real pages into a throwaway
 * host. This site is served from exactly one origin, so the origin is a
 * constant rather than configuration, and `metadataBase` can no longer be
 * overridden from the environment.
 *
 * Next.js' own fallback is the same trap by default: with no `metadataBase`
 * set it derives one from VERCEL_URL, which is always a *.vercel.app host.
 *
 * No trailing slash. Consumers append a path that already opens with one, and
 * `${SITE_URL}/` is the home page's own URL.
 */
export const SITE_URL = "https://muratzorlu.dev";
