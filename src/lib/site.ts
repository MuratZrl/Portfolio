// src/lib/site.ts
//
// Site-wide constants that are data rather than copy: the origin, the phone
// number every WhatsApp and tel: link is built from, the social profiles, and
// the helpers that turn a locale plus a path into canonical and hreflang
// metadata. Nothing here is a user-facing string in its own right.

import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://muratzorlu.dev";
export const EMAIL = "me@muratzorlu.dev";
export const CV_PATH = "/cv/Murat_Zorlu_CV.pdf" as const;

/**
 * `e164` is digits only, country code first, no plus and no spaces, which is
 * the form wa.me expects in the URL path. `display` is the printed form.
 */
export const CONTACT_PHONE = {
  e164: "905416577925",
  display: "+90 541 657 79 25",
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${CONTACT_PHONE.e164}?text=${encodeURIComponent(message)}`;
}

export const TEL_HREF = `tel:+${CONTACT_PHONE.e164}`;

export const SOCIAL_URLS = {
  github: "https://github.com/MuratZrl",
  linkedin: "https://www.linkedin.com/in/murat-zorlu-dev/",
  upwork: "https://www.upwork.com/freelancers/~01eb1693cb0c1f6b22",
} as const;

export const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
};

/**
 * Pages that only exist in English: the developer portfolio. Their bare
 * (Turkish) URLs redirect to /en in next.config.ts, so the locale switcher
 * sends a visitor on one of these to the Turkish home rather than into that
 * redirect, and the hreflang set for them lists English only.
 */
const EN_ONLY_PREFIXES = ["/about", "/projects"] as const;
const TR_ONLY_PREFIXES = ["/paketler"] as const;

export function isEnOnlyPath(pathname: string): boolean {
  return EN_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isTrOnlyPath(pathname: string): boolean {
  return TR_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Absolute-path form of a route in a given locale: "/" -> "/" or "/en". */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/**
 * `alternates` for the metadata API. Shared pages list both locales with
 * x-default pointing at Turkish, the site default. English-only pages list
 * English alone and make it the x-default too, because the Turkish URL is a
 * redirect, not a page.
 */
export function localeAlternates(locale: Locale, path: string, opts?: { enOnly?: boolean }) {
  const canonical = localizedPath(locale, path);
  if (opts?.enOnly) {
    const en = localizedPath("en", path);
    return { canonical, languages: { en, "x-default": en } };
  }
  const tr = localizedPath("tr", path);
  const en = localizedPath("en", path);
  return { canonical, languages: { tr, en, "x-default": tr } };
}
