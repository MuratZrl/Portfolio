// src/components/layout/Footer.tsx
//
// Server component. Nothing here is interactive; the previous "use client"
// bought nothing and shipped the footer to the browser for no reason.

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Github, Linkedin, Briefcase, Mail, Heart, MessageCircle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { EMAIL, SOCIAL_URLS, whatsappHref } from "@/lib/site";

/* ────────────────────────────── Data ────────────────────────────── */

type NavKey = "about" | "projects" | "contact" | "packages";

const NAV_BY_LOCALE: Record<Locale, readonly { href: `/${string}`; key: NavKey }[]> = {
  tr: [
    { href: "/paketler", key: "packages" },
    { href: "/contact", key: "contact" },
  ],
  en: [
    { href: "/about", key: "about" },
    { href: "/projects", key: "projects" },
    { href: "/contact", key: "contact" },
  ],
};

type Social = { label: string; href: string; icon: LucideIcon };

/**
 * The portfolio lists the developer profiles. The Turkish site lists the
 * channels a business owner actually uses: WhatsApp first, LinkedIn as the
 * one profile that reads as a real person. Labels are proper nouns, not copy.
 */
function socialsFor(locale: Locale, waHref: string): readonly Social[] {
  if (locale === "tr") {
    return [
      { label: "WhatsApp", href: waHref, icon: MessageCircle },
      { label: "LinkedIn", href: SOCIAL_URLS.linkedin, icon: Linkedin },
    ];
  }
  return [
    { label: "GitHub", href: SOCIAL_URLS.github, icon: Github },
    { label: "LinkedIn", href: SOCIAL_URLS.linkedin, icon: Linkedin },
    { label: "Upwork", href: SOCIAL_URLS.upwork, icon: Briefcase },
  ];
}

/* ────────────────────────────── Component ────────────────────────────── */

export default function Footer(): React.JSX.Element {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tWa = useTranslations("whatsapp");
  const locale = useLocale();

  const year = new Date().getFullYear();
  const navLinks = NAV_BY_LOCALE[locale];
  const socials = socialsFor(locale, whatsappHref(tWa("defaultMessage")));

  return (
    <footer role="contentinfo" className="mt-auto border-t border-[var(--edge-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main row ── */}
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3">
          {/* Brand + email */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" draggable={false} className="select-none text-lg font-semibold tracking-tight">
              {tCommon("brand")}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{t("tagline")}</p>

            <address className="mt-3 not-italic">
              <a
                href={`mailto:${EMAIL}`}
                draggable={false}
                className={cn(
                  "chip inline-flex min-h-6 select-none items-center gap-2 px-3 py-1.5 text-xs font-medium interactive",
                  "text-muted-foreground hover:text-foreground",
                )}
                aria-label={t("emailAria", { email: EMAIL })}
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {EMAIL}
              </a>
            </address>
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("pages")}
            </div>
            <nav aria-label={t("navAria")} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  draggable={false}
                  className="inline-flex min-h-6 select-none items-center text-sm text-muted-foreground interactive hover:text-primary"
                >
                  {tNav(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-end">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("connect")}
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  aria-label={`${s.label} (${tCommon("opensInNewTab")})`}
                  className={cn(
                    "flex size-9 select-none items-center justify-center rounded-lg interactive",
                    "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-2 border-t border-[var(--edge-soft)] py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>{t("copyright", { year })}</p>
          <p className="inline-flex items-center gap-1">
            {t("builtWith")}
            <Heart className="h-3 w-3 text-primary" aria-hidden />
            {t("builtWithSuffix")}
          </p>
        </div>
      </div>
    </footer>
  );
}
