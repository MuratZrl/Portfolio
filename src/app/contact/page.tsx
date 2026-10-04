// src/app/contact/page.tsx
import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import ContactForm from "@/features/contact/sections/ContactForm";
import ContactDetails from "@/features/contact/sections/ContactDetails";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for projects, collaborations, or hiring.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: "Murat Zorlu",
    locale: "en_US",
    title: "Contact",
    description:
      "Project work, contract work, or a role. Istanbul, UTC+3.",
  },
};

/**
 * Statically rendered, and the only reason it was not is gone.
 *
 * The page used to take `searchParams` and await it, purely to turn the
 * ?sent=1 / ?error=<code> that /api/contact redirected the no-JS path to into
 * a banner above the form. Reading searchParams opts a route out of static
 * rendering, so the whole page was server-rendered on every request to carry
 * a result that only a visitor without JavaScript could ever arrive with.
 *
 * The no-JS submit is a Server Action now (src/features/contact/actions.ts).
 * Its result renders inside the form through useActionState, in the same slot
 * the JS path already used for its own status, so the banner and this
 * component's async-ness both went away together and the copy moved intact.
 */
export default function ContactPage(): React.JSX.Element {
  return (
    <Page
      title="Contact"
      description="Project work, contract work, or a role. Every message gets a reply."
    >
      <section className="grid w-full items-start gap-6 lg:grid-cols-[1fr_340px]">
        <ContactForm />
        <ContactDetails />
      </section>
    </Page>
  );
}
