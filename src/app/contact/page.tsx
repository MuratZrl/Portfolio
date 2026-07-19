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
