// src/proxy.ts
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Locale routing only. Bare paths are rewritten to /tr/... internally and
 * /tr/... requests are redirected to the bare path, so the Turkish URLs never
 * show a prefix. No headers are touched here, so every page keeps its static
 * prerender (the CSP note in next.config.ts still holds).
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip the API, Next internals, Vercel internals, anything with a file
    // extension (public/ assets, sitemap.xml, robots.txt, icons) and the
    // per-locale OG images, whose URLs already carry their locale segment.
    // Plain alternation only: a nested group like (?:tr|en) inside the
    // matcher breaks Next's path-to-regexp compilation and the proxy then
    // matches nothing but "/".
    "/((?!api|_next|_vercel|.*\\..*|tr/opengraph-image|en/opengraph-image|tr/twitter-image|en/twitter-image).*)",
  ],
};
