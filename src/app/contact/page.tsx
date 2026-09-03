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
 * Result copy for the no-JS path. /api/contact answers a native form POST with
 * a 303 to ?sent=1 or ?error=<code>; the codes are short so the URL stays
 * clean and the wording stays here. The JS path never redirects, so it never
 * hits any of this: it renders its own status inside the form.
 */
const ERROR_COPY: Record<string, string> = {
  rate: "Too many messages from this connection. Wait a minute, then try again.",
  badrequest: "That submission could not be read. Please try again.",
  invalid:
    "Some fields need another look. Every field is required, and the message needs at least 12 characters.",
  spam: "That submission was flagged as automated.",
  send: "The message could not be sent. You can email me directly at me@muratzorlu.dev.",
};

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props): Promise<React.JSX.Element> {
  const { sent, error } = await searchParams;
  const errorMessage = error ? (ERROR_COPY[error] ?? ERROR_COPY.badrequest) : null;

  return (
    <Page
      title="Contact"
      description="Project work, contract work, or a role. Every message gets a reply."
    >
      {sent === "1" && !errorMessage ? (
        <div
          role="status"
          className="plate mb-6 border-l-4 border-l-[var(--accent)] p-4 text-[length:var(--text-body-base)] text-[color:var(--text)]"
        >
          Message sent. You will get a reply.
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
