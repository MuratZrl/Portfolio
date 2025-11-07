// src/features/contact/sections/ContactDetails.tsx
'use client'

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  ExternalLink,
  Copy,
  Check,
  HeartHandshake,
  Briefcase, // Upwork için
} from "lucide-react";

type ContactDetailsProps = {
  email?: string;
  location?: string;
  timezoneLabel?: string;
  responseWindow?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  upworkUrl?: string; // NEW
};

export default function ContactDetails({
  email = "zorlu.murat2002@gmail.com",
  location = "Istanbul, Türkiye",
  timezoneLabel = "TRT (UTC+3)",
  responseWindow = "Mon–Fri, 10:00–18:00",
  githubUrl = "https://github.com/MuratZrl",
  linkedinUrl = "https://www.linkedin.com/in/murat-zorlu-dev/",
  upworkUrl = "https://www.upwork.com/freelancers/~01eb1693cb0c1f6b22", // ← kendi profil URL’ini yaz
}: ContactDetailsProps): React.JSX.Element {
  const [copied, setCopied] = React.useState<boolean>(false);

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // no toast
    }
  }

  return (
    <aside className="w-full h-full space-y-4">
      {/* Direct contact card */}
      <Card>
        <CardHeader>
          <CardTitle>Direct</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <div>
                <div className="font-medium">Email</div>
                <Link
                  href={`mailto:${email}`}
                  className="text-muted-foreground hover:underline break-all"
                >
                  {email}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Copy email address"
                onClick={() => void copyToClipboard(email)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Copied email address" : ""}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div>
              <div className="font-medium">Location</div>
              <p className="text-muted-foreground">
                {location} <span className="ml-1">({timezoneLabel})</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div>
              <div className="font-medium">Response window</div>
              <p className="text-muted-foreground">{responseWindow}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social / elsewhere */}
      <Card>
        <CardHeader>
          <CardTitle>Elsewhere</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {/* GitHub */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" aria-hidden />
              <span>GitHub</span>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:underline"
            >
              {githubUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <Separator />

          {/* LinkedIn */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" aria-hidden />
              <span>LinkedIn</span>
            </div>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:underline"
            >
              {linkedinUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <Separator />

          {/* Upwork */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" aria-hidden />
              <span>Upwork</span>
            </div>
            <a
              href={upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:underline"
            >
              {upworkUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Support / donate */}
      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" aria-hidden />
              <span>Prefer bank transfer?</span>
            </div>
            <Link href="/donate" className="text-muted-foreground hover:underline">
              Donate
            </Link>
          </div>
          <p className="mt-3 text-muted-foreground">
            No PayPal. Bank transfer via IBAN on the Donate page.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
