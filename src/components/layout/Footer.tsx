// src/components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Briefcase, Mail, Heart } from "lucide-react";

/* ────────────────────────────── Data ────────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/MuratZrl",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/murat-zorlu-dev/",
    icon: Linkedin,
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01eb1693cb0c1f6b22",
    icon: Briefcase,
  },
] as const;

/* ────────────────────────────── Component ────────────────────────────── */

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  const email = "zorlu.murat2002@gmail.com";

  return (
    <footer role="contentinfo" className="mt-auto border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main row ── */}
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3">
          {/* Brand + email */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Murat Zorlu
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Full Stack Web Developer
            </p>

            <address className="mt-3 not-italic">
              <a
                href={`mailto:${email}`}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  "bg-muted text-muted-foreground hover:text-foreground",
                )}
                aria-label={`Email ${email}`}
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {email}
              </a>
            </address>
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pages
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-end">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Connect
            </div>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg transition-colors",
                    "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-2 border-t border-border/50 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {year} Murat Zorlu. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1">
            Built with
            <Heart className="h-3 w-3 text-primary" aria-hidden />
            Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
