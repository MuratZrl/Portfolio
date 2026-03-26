// src/features/about/utils/skills.ts
import React from "react";
import { Layout, Server, Database, Wrench } from "lucide-react";
import type { IconId } from "@/features/about/types";

type SvgComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ICONS: Record<IconId, SvgComp> = {
  layout: Layout,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export function renderIcon(id: IconId): React.ReactElement {
  const Icon = ICONS[id];
  return <Icon className="h-4 w-4" aria-hidden />;
}

export function clamp0to100(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}
