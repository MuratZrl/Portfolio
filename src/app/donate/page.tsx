// src/app/donate/page.tsx
import React from "react";
import type { Metadata } from "next";
import { Page } from "@/components/layout/Page";
import Donate from "@/features/donate/sections/Donate.client";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support my work via bank transfer (IBAN) or BTC tip. No PayPal.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate",
    description: "Support my work via bank transfer (IBAN) or BTC tip.",
    url: "/donate",
    type: "website",
  },
};

export default function DonatePage(): React.JSX.Element {
  return (
    <Page
      title="Donate"
      description="Support my work via bank transfer or BTC tip. Thanks for keeping the lights on."
    >
      <Donate />
    </Page>
  );
}
