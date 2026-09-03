// src/components/layout/Navbar.tsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Download, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CV_PATH, whatsappHref } from "@/lib/site";
import { ThemeToggle } from "@/theme/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

type NavKey = "about" | "projects" | "contact" | "packages";

type NavItem = {
  href: "/" | `/${string}`;
  key: NavKey;
};

/**
 * Per-locale menus, hrefs only; the labels come from messages. The Turkish
 * site is the small-business offer (packages, contact); the English site is
 * the developer portfolio (about, projects, contact).
 */
const NAV_BY_LOCALE: Record<Locale, readonly NavItem[]> = {
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

export default function Navbar(): React.JSX.Element {
  const t = useTranslations("nav");
  const tWa = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const items = NAV_BY_LOCALE[locale];
  // The right-hand action: CV download for the portfolio, WhatsApp for the
  // small-business site. A business owner has no use for a CV.
  const isPortfolio = locale === "en";
  const waHref = whatsappHref(tWa("defaultMessage"));

  // Close mobile nav on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: NavItem["href"]): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--edge-soft)] bg-[var(--surface)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" draggable={false} className="flex select-none items-center gap-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            MZ
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            Murat Zorlu
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map(({ href, key }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                draggable={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "select-none rounded-md px-3 py-1.5 text-sm interactive",
                  active
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <LocaleSwitcher className="mr-1" />
          <ThemeToggle />

          {isPortfolio ? (
            <a
              href={CV_PATH}
              download
              draggable={false}
              aria-label={t("downloadCv")}
              className={cn(
                "hidden select-none items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium interactive sm:inline-flex",
                "border border-[var(--edge-soft)] text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              {t("cv")}
            </a>
          ) : (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className={cn(
                "hidden select-none items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium interactive sm:inline-flex",
                "border border-[var(--edge-soft)] text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              {t("whatsapp")}
            </a>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            className="inline-flex size-9 select-none items-center justify-center rounded-md text-muted-foreground interactive hover:bg-muted hover:text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen ? (
        <nav className="border-t border-[var(--edge-soft)] bg-[var(--surface)] md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {items.map(({ href, key }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  draggable={false}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block select-none rounded-md px-3 py-2 text-sm interactive",
                    active
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {t(key)}
                </Link>
              );
            })}

            {isPortfolio ? (
              <a
                href={CV_PATH}
                download
                draggable={false}
                className="flex select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground interactive hover:bg-muted hover:text-foreground"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                {t("downloadCv")}
              </a>
            ) : (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="flex select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground interactive hover:bg-muted hover:text-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                {t("whatsapp")}
              </a>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
