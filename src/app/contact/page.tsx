// src/app/contact/page.tsx
import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import ContactForm from "@/features/contact/sections/ContactForm";
import ContactDetails from "@/features/contact/sections/ContactDetails";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for projects, collaborations, or hiring.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <Page
      title="Contact"
      description="Get in touch for project inquiries, collaborations, or hiring. I typically review and respond to every message within 1–2 business days."
    >
      <section className="w-full grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(320px, 360px)]">
        <ContactForm />
        <ContactDetails />
      </section>
    </Page>
  );
}
