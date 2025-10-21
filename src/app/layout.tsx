// src/app/layout.tsx

import React from "react";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/theme/theme-provider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Minimal portfolyo sitesi. Dört sayfa: Home, About, Projects, Donation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      
      {/* body: ekran boyu kadar min-yükseklik + kolon yerleşim */}
      <body className="min-h-svh flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          
          <Navbar />

          {/* main: kalan tüm yüksekliği kaplayan FLEX konteyner */}
          <main className="flex-1 min-h-0 flex flex-col">
            {children}
          </main>

          <Footer/>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
