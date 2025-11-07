// src/components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="mt-auto border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* 1 col on phones, 2 on small tablets, 3 on md+ */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-x-4 gap-y-3
            justify-items-center md:justify-items-stretch
            items-center
            text-sm text-muted-foreground
          "
        >
          {/* Left: nav links */}
          <div className="order-2 md:order-1 w-full">
            <nav aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2"
            >
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/donate" className="hover:text-foreground transition-colors">Donate</Link>
            </nav>
          </div>

          {/* Center: copyright (span 2 cols on small tablets so it stays centered) */}
          <p className="order-1 md:order-2 text-center sm:col-span-2 md:col-span-1 text-balance">
            © {year} <span className="font-medium">Murat Zorlu</span>. All rights reserved.
          </p>

          {/* Right: social links */}
          <div className="order-3 w-full">
            <div className="flex items-center justify-center md:justify-end gap-3">
              <Link
                href="https://github.com/MuratZrl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/murat-zorlu-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
