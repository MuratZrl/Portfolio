// src/features/contact/sections/ContactSection.tsx
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Clock, Github, Linkedin, HeartHandshake } from "lucide-react";

export default function ContactDetails(): React.JSX.Element {
  return (
    <aside className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Direct</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4" aria-hidden />
            <div>
              <div className="font-medium">Email</div>
              <Link href="mailto:hello@yourdomain.com" className="text-muted-foreground hover:underline">
                zorlu.murat2002@gmail.com
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4" aria-hidden />
            <div>
              <div className="font-medium">Location</div>
              <p className="text-muted-foreground">Istanbul, Türkiye (UTC+3)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4" aria-hidden />
            <div>
              <div className="font-medium">Response window</div>
              <p className="text-muted-foreground">Mon–Fri, 10:00–18:00 TRT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Elsewhere</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" aria-hidden />
              <span>GitHub</span>
            </div>
            <Link href="https://github.com/MuratZrl" className="text-muted-foreground hover:underline" target="_blank">
              github.com/MuratZrl
            </Link>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" aria-hidden />
              <span>LinkedIn</span>
            </div>
            <Link
              href="https://www.linkedin.com/in/murat-zorlu-dev/"
              className="text-muted-foreground hover:underline"
              target="_blank"
            >
              linkedin.com/in/murat-zorlu-dev/
            </Link>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" aria-hidden />
              <span>Support</span>
            </div>
            <Link href="/donate" className="text-muted-foreground hover:underline">
              Donate
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
