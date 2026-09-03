// src/features/local/sections/ContactSection.tsx
//
// "İletişim" on the Turkish home: the WhatsApp button first, a phone link
// beside it, then the same form and details panel the /contact page carries.
// A business owner should not have to leave the home page to get in touch.
//
// Server component; the form inside is the client half.

import React from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { CONTACT_PHONE, TEL_HREF, whatsappHref } from "@/lib/site";
import ContactForm from "@/features/contact/sections/ContactForm";
import ContactDetails from "@/features/contact/sections/ContactDetails";

const HEADING_ID = "contact-section-heading";

type ContactSectionProps = {
  id?: string;
  className?: string;
};

export default function ContactSection({ id, className }: ContactSectionProps): React.JSX.Element {
  const t = useTranslations("home.contactSection");
  const tCommon = useTranslations("common");
  const tWa = useTranslations("whatsapp");

  return (
    <section id={id} aria-labelledby={HEADING_ID} className={cn("py-10 sm:py-12", className)}>
      <h2
        id={HEADING_ID}
        className="text-[length:var(--text-display-md)] font-bold leading-[1.05] text-[var(--text)]"
      >
        {t("heading")}
      </h2>
      <p className="mt-2 text-[length:var(--text-body-base)] text-[var(--text-muted)]">{t("subheading")}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
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
        <a
          href={TEL_HREF}
          draggable={false}
          className="soft-btn soft-btn-ghost inline-flex min-h-11 items-center gap-2 px-5 text-[length:var(--text-body-sm)] font-medium"
        >
          <Phone className="size-4" aria-hidden />
          {t("call")}: {CONTACT_PHONE.display}
        </a>
      </div>

      <div className="mt-8 grid w-full items-start gap-6 lg:grid-cols-[1fr_340px]">
        <ContactForm />
        <ContactDetails />
      </div>
    </section>
  );
}
