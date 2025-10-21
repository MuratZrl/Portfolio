// src/components/layout/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/theme/theme-toggle";

type NavItem = {
  href: "/" | `/${string}`;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

function DesktopNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-sm transition-colors",
              isActive
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menüyü aç"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="px-0">
        <div className="px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
              M
            </span>
            <span className="text-base font-semibold tracking-tight">
              Portfolio
            </span>
          </Link>
        </div>

        <Separator />

        <nav className="flex flex-col">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <SheetClose asChild key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-6 py-3 text-sm transition-colors",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* relative konteyner: orta grup absolute merkezde */}
        <div className="relative flex h-14 items-center">
          {/* Sol grup: hamburger (mobil) + logo (her zaman) */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <MobileNav />
            </div>

            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
                P
              </span>
              <span className="hidden sm:inline text-sm font-semibold tracking-tight">
                Portfolio
              </span>
            </Link>
          </div>

          {/* Orta: SADECE linkler (mutlak merkez) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <DesktopNav />
          </div>

          {/* Sağ: theme toggle */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
