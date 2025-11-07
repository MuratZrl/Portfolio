// src/features/about/sections/Skills.client.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Languages, ExternalLink } from "lucide-react";

import type { Skill, Group } from "@/features/about/types";
import { SKILL_GROUPS, LANGUAGE_LIST, CERT_LIST } from "@/features/about/data/skills";
import { renderIcon, clamp0to100 } from "@/features/about/utils/skills";

type SkillsMatrixProps = {
  heading?: string;
  subheading?: string;
  groups?: readonly Group[];
  languages?: readonly { name: string; level: string }[];
  certs?: readonly { title: string; org: string; year?: string; href?: string }[];
  className?: string;
};

export default function SkillsMatrix({
  heading = "Skills & Tools",
  subheading = "Technologies used in practice and quality tooling.",
  groups = SKILL_GROUPS,
  languages = LANGUAGE_LIST,
  certs = CERT_LIST,
  className,
}: SkillsMatrixProps): React.JSX.Element {
  const headingId = React.useId();
  const firstTab = groups[0]?.id ?? "frontend";

  return (
    <section aria-labelledby={headingId} className={cn(className)}>
      
      <div className="mb-8 flex flex-col gap-2">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 h-full">
          <Tabs defaultValue={firstTab} className="h-full flex flex-col">
            <TabsList className="flex w-full flex-wrap justify-start">
              {groups.map((g) => (
                <TabsTrigger key={g.id} value={g.id} className="gap-2">
                  {renderIcon(g.icon)}
                  <span>{g.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {groups.map((g) => (
              <TabsContent key={g.id} value={g.id} className="mt-6 flex-1">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base sm:text-lg">{g.title}</CardTitle>
                    {g.note ? <CardDescription>{g.note}</CardDescription> : null}
                  </CardHeader>

                  <CardContent className="pt-4 flex-1">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {g.skills.map((s) => (
                        <SkillRow key={s.name} skill={s} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="h-full grid grid-rows-[auto,1fr] gap-6">

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Languages className="h-4 w-4" aria-hidden />
                Languages
              </CardTitle>
              <CardDescription>Language proficiency for communication and documentation.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between">
                    <span className="text-sm">{l.name}</span>
                    <Badge variant="outline" className="text-xs">{l.level}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                {renderIcon("shield")}
                Certificates
              </CardTitle>
              <CardDescription>Official or independent validations.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ul className="space-y-3">
                {certs.map((c) => (
                  <li key={`${c.title}-${c.org}`} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{c.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.org}{c.year ? ` · ${c.year}` : ""}
                      </div>
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View certificate: ${c.title}`}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        Open
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>
        
      </div>
      
    </section>
  );
}

/* -------------------------------- Parts ---------------------------------- */

function SkillRow({ skill }: { skill: Skill }): React.JSX.Element {
  const clamped = clamp0to100(skill.level);

  return (
    <div>
      {/* Üst satır: isim + yüzde */}
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Badge variant="outline">{skill.name}</Badge>
        </div>
        <span className="tabular-nums text-xs text-muted-foreground">{clamped}%</span>
      </div>

      {/* İpucu: ayrı satır, tam görünür, taşarsa alt satıra insin */}
      {skill.hint ? (
        <p className="mb-2 text-xs text-muted-foreground whitespace-normal break-words">
          {skill.hint}
        </p>
      ) : null}

      <Progress value={clamped} aria-label={`Level for ${skill.name} is ${clamped} percent`} />
    </div>
  );
}