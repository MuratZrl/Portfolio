// src/features/contact/sections/ContactDetails.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
} from "lucide-react";

type ContactDetailsProps = {
  email?: string;
  location?: string;
  timezoneLabel?: string;
  responseWindow?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  upworkUrl?: string;
};

const SOCIAL_LINKS = (
  githubUrl: string,
  linkedinUrl: string,
  upworkUrl: string,
) => [
  {
    label: "GitHub",
    icon: Github,
    href: githubUrl,
    handle: "@MuratZrl",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: linkedinUrl,
    handle: "murat-zorlu-dev",
  },
  {
    label: "Upwork",
    icon: Briefcase,
    href: upworkUrl,
    handle: "Murat Z.",
  },
];

export default function ContactDetails({
  email = "zorlu.murat2002@gmail.com",
  location = "Istanbul, Türkiye",
  timezoneLabel = "TRT (UTC+3)",
  responseWindow = "Mon–Fri, 10:00–18:00",
  githubUrl = "https://github.com/MuratZrl",
  linkedinUrl = "https://www.linkedin.com/in/murat-zorlu-dev/",
  upworkUrl = "https://www.upwork.com/freelancers/~01eb1693cb0c1f6b22",
}: ContactDetailsProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  }

  const socials = SOCIAL_LINKS(githubUrl, linkedinUrl, upworkUrl);

  return (
    <aside className="flex h-full flex-col gap-4">
      {/* ── Direct Contact ── */}
      <div
        className={cn(
          "rounded-2xl border p-5 sm:p-6",
          "border-border/50 bg-card/80 backdrop-blur-sm",
        )}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="text-base font-semibold">Direct</h3>
        </div>

        <div className="space-y-4 text-sm">
          {/* Email */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground">Email</div>
              <Link
                href={`mailto:${email}`}
                className="break-all text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {email}
              </Link>
            </div>
            <button
              type="button"
              aria-label="Copy email address"
              onClick={() => void copyToClipboard(email)}
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                copied
                  ? "bg-green-600/10 text-green-600 dark:text-green-400"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Copied email address" : ""}
            </span>
          </div>

          <div className="h-px bg-border/50" />

          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Location</div>
              <p className="text-sm font-medium">
                {location}{" "}
                <span className="text-muted-foreground">({timezoneLabel})</span>
              </p>
            </div>
          </div>

          {/* Response window */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Response window</div>
              <p className="text-sm font-medium">{responseWindow}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Elsewhere ── */}
      <div
        className={cn(
          "rounded-2xl border p-5 sm:p-6",
          "border-border/50 bg-card/80 backdrop-blur-sm",
        )}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ExternalLink className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="text-base font-semibold">Elsewhere</h3>
        </div>

        <div className="space-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                "hover:bg-muted",
              )}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <s.icon className="h-3.5 w-3.5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="truncate text-xs text-muted-foreground">{s.handle}</div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}
