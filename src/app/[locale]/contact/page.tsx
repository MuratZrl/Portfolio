// src/app/[locale]/contact/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MessageCircle } from "lucide-react";

import { Page } from "@/components/layout/Page";
import ContactForm from "@/features/contact/sections/ContactForm";
import ContactDetails from "@/features/contact/sections/ContactDetails";
import { routing } from "@/i18n/routing";
import { localeAlternates, localizedPath, OG_LOCALE, whatsappHref } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/contact"),
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/contact"),
      siteName: "Murat Zorlu",
      locale: OG_LOCALE[locale],
      title: t("title"),
      description: t("ogDescription"),
    },
  };
}

/**
 * Result codes for the no-JS path. /api/contact answers a native form POST
 * with a 303 to ?sent=1 or ?error=<code>; the codes are short so the URL
 * stays clean and the wording lives in messages under `contact.errors`. The
 * JS path never redirects, so it never hits any of this: it renders its own
 * status inside the form.
 */
const ERROR_CODES = ["rate", "badrequest", "invalid", "spam", "send"] as const;
type ErrorCode = (typeof ERROR_CODES)[number];

function isErrorCode(value: string): value is ErrorCode {
  return (ERROR_CODES as readonly string[]).includes(value);
}

export default async function ContactPage({ params, searchParams }: Props): Promise<React.JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const { sent, error } = await searchParams;
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const tWa = await getTranslations("whatsapp");

  const errorMessage = error ? t(`errors.${isErrorCode(error) ? error : "badrequest"}`) : null;

  // The Turkish site leads with WhatsApp everywhere else, so it leads with
  // it here too. The portfolio keeps the form and email as the front door.
  const showWhatsApp = locale === "tr";

  return (
    <Page
      title={t("title")}
      description={t("description")}
      actions={
        showWhatsApp ? (
          <a
            href={whatsappHref(tWa("defaultMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
          >
            <MessageCircle className="size-4" aria-hidden />
            {t("whatsapp")}
            <span className="sr-only"> ({tCommon("opensInNewTab")})</span>
          </a>
        ) : undefined
      }
    >
      {sent === "1" && !errorMessage ? (
        <div
          role="status"
          className="plate mb-6 border-l-4 border-l-[var(--accent)] p-4 text-[length:var(--text-body-base)] text-[color:var(--text)]"
        >
          {t("sent")}
        </div>
      ) : null}

      {errorMessage ? (
        <div
          role="alert"
          className="plate mb-6 border-l-4 border-l-[var(--danger)] p-4 text-[length:var(--text-body-base)] text-[color:var(--text)]"
        >
          {errorMessage}
        </div>
      ) : null}

      <section className="grid w-full items-start gap-6 lg:grid-cols-[1fr_340px]">
        <ContactForm />
        <ContactDetails />
      </section>
    </Page>
  );
}
