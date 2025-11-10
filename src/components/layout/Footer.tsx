// src/components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  // Replace with your real domain or alias, e.g. "hello" + "@" + "murat.dev"
  const emailUser = "zorlu.murat2002";   // soldaki kısım
  const emailDomain = "gmail.com";       // sağdaki kısım
  const email = `${emailUser}@${emailDomain}`;

  // Mailto'yu SSR'da boş bırak, istemcide doldur
  const [mailtoHref, setMailtoHref] = React.useState<string>("");

  React.useEffect(() => {
    setMailtoHref(`mailto:${email}`);
  }, [email]);

  return (
    <footer role="contentinfo" className="mt-auto border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top row: nav • copyright • socials */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-x-4 gap-y-4
            justify-items-center md:justify-items-stretch
            items-center
            text-sm text-muted-foreground
          "
        >
          {/* Left: nav + email */}
          <div className="order-2 md:order-1 w-full">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2"
            >
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/donate" className="hover:text-foreground transition-colors">
                Donate
              </Link>
            </nav>

            {/* Contact email (simple obfuscation in text, real mailto in href) */}
            <address className="mt-2 not-italic text-center md:text-left">
              <a
                href={mailtoHref || "#"}
                onClick={(e) => {
                  if (!mailtoHref) {
                    // JS devre dışıysa son çare
                    (e.currentTarget as HTMLAnchorElement).href = `mailto:${email}`;
                  }
                }}
                className="hover:text-foreground transition-colors"
                aria-label={`Email ${email}`}
              >
                {emailUser} [at] {emailDomain}
              </a>
            </address>

          </div>

          {/* Center: copyright */}
          <p className="order-1 md:order-2 text-center sm:col-span-2 md:col-span-1 text-balance">
            © {year} <span className="font-medium">Murat Zorlu</span>. All rights reserved.
          </p>

          {/* Right: social links */}
          <div className="order-3 w-full">
            <div className="flex items-center justify-center md:justify-end gap-3">
              <a
                href="https://github.com/MuratZrl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="GitHub profile (opens in a new tab)"
              >
                GitHub
                <span className="sr-only">, opens in a new tab</span>
              </a>
              <span className="text-muted-foreground" aria-hidden>·</span>
              <a
                href="https://www.linkedin.com/in/murat-zorlu-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                LinkedIn
                <span className="sr-only">, opens in a new tab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: legal + sitemap */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center md:text-right">
            Built with Next.js, TypeScript and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
