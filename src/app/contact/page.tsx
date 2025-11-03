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
      description="Want to build something useful, fast, and not embarrassing? Send a message."
    >
      <section className="w-full grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <ContactForm />
        <ContactDetails />
      </section>
    </Page>
  );
}
