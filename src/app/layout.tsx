// src/app/layout.tsx

import "./globals.css";

import React from "react";
import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Container } from "@/components/layout/Container";

import { ThemeProvider } from "@/theme/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://murat-zorlu-dev.vercel.app"),
  title: "Portfolio",
  description: "Minimal portfolio website. Pages: Home, About, Projects, Donation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-svh flex flex-col font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

          <Navbar />

           {/* main artık flex konteyner */}
            <main className="flex-1 min-h-0 flex py-12 lg:py-16">
              <Container className="flex flex-1">
                <div className="flex flex-1 flex-col">{children}</div>
              </Container>
            </main>

          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}
