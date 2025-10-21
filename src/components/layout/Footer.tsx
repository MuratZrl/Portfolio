// src/components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
        
        {/* Sol kısım - linkler */}
        <div className="flex items-center gap-4 order-2 md:order-1 md:mr-auto">
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
        </div>

        {/* Orta kısım - copyright */}
        <p className="order-1 md:order-2 text-center md:absolute left-1/2 transform md:-translate-x-1/2">
          © {year} <span className="font-medium">Portfolio</span>. All rights reserved.
        </p>

        {/* Sağ kısım - tema & github + linkedin */}
        <div className="flex items-center gap-3 order-3 md:ml-auto">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
      
    </footer>
  );
}
