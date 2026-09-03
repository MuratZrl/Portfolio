// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

/**
 * Turkish is the default and lives at the bare path; English sits under /en.
 *
 * `localeDetection: false` and `localeCookie: false` together mean nobody is
 * ever redirected by Accept-Language or by a remembered choice: `/` is Turkish
 * for every visitor, and English is reached only by following an /en link.
 * `alternateLinks` is off because the hreflang set is emitted from each
 * page's metadata instead (see src/lib/seo.ts), where x-default can be set.
 */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
