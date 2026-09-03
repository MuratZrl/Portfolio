// src/features/contact/sections/ContactDetails.tsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { CONTACT_PHONE, EMAIL, SOCIAL_URLS, whatsappHref } from "@/lib/site";

type Social = { label: string; icon: LucideIcon; href: string; handle: string };

/**
 * The portfolio lists developer profiles. The Turkish site lists what a
 * business owner reaches for: WhatsApp with the number printed, then
 * LinkedIn as the one profile that reads as a real person.
 */
function socialsFor(locale: Locale, waHref: string, waHandle: string): readonly Social[] {
  if (locale === "tr") {
    return [
      { label: "WhatsApp", icon: MessageCircle, href: waHref, handle: `${CONTACT_PHONE.display} · ${waHandle}` },
      { label: "LinkedIn", icon: Linkedin, href: SOCIAL_URLS.linkedin, handle: "murat-zorlu-dev" },
    ];
  }
  return [
    { label: "GitHub", icon: Github, href: SOCIAL_URLS.github, handle: "@MuratZrl" },
    { label: "LinkedIn", icon: Linkedin, href: SOCIAL_URLS.linkedin, handle: "murat-zorlu-dev" },
    { label: "Upwork", icon: Briefcase, href: SOCIAL_URLS.upwork, handle: "Murat Z." },
  ];
}

export default function ContactDetails(): React.JSX.Element {
  const t = useTranslations("contact.details");
  const tWa = useTranslations("whatsapp");
  const locale = useLocale();
  const [copied, setCopied] = React.useState(false);

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  }

  const socials = socialsFor(locale, whatsappHref(tWa("defaultMessage")), t("whatsappHandle"));

  return (
    <aside className="flex h-full flex-col gap-4">
      {/* ── Direct Contact ── */}
      <div className={cn("plate rounded-2xl border p-5 sm:p-6")}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="text-base font-semibold">{t("direct")}</h3>
        </div>

        <div className="space-y-4 text-sm">
          {/* Email */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground">{t("email")}</div>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-sm font-medium text-foreground hover:text-primary interactive"
                draggable={false}
              >
                {EMAIL}
              </a>
            </div>
            <button
              type="button"
              aria-label={t("copyEmail")}
              onClick={() => void copyToClipboard(EMAIL)}
              className={cn(
                "flex size-8 shrink-0 cursor-pointer select-none items-center justify-center rounded-lg interactive",
                copied
                  ? "bg-green-600/10 text-green-600 dark:text-green-400"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? t("copied") : ""}
            </span>
          </div>

          <div className="h-px bg-border/50" />

          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">{t("location")}</div>
              <p className="text-sm font-medium">
                {t("locationValue")}{" "}
                <span className="text-muted-foreground">({t("timezone")})</span>
              </p>
            </div>
          </div>

          {/* Response window */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">{t("responseWindow")}</div>
              <p className="text-sm font-medium">{t("responseWindowValue")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Elsewhere ── */}
      <div className={cn("plate rounded-2xl border p-5 sm:p-6")}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ExternalLink className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="text-base font-semibold">{t("elsewhere")}</h3>
        </div>

        <div className="-mb-2.5 space-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="group flex select-none items-center gap-3 py-2.5 text-sm"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <s.icon className="h-3.5 w-3.5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="truncate text-xs text-muted-foreground">{s.handle}</div>
              </div>
              <ExternalLink
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground interactive group-hover:text-primary"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
