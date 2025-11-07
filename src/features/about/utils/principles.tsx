// src/features/about/utils/principles.ts
import React from "react";
import {
  Target,
  Bolt,
  Accessibility,
  Layers,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import type { PrincipleIconId } from "@/features/about/types";

const MAP: Record<PrincipleIconId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  target: Target,
  bolt: Bolt,
  accessibility: Accessibility,
  layers: Layers,
  "git-branch": GitBranch,
  shield: ShieldCheck,
};

export function renderPrincipleIcon(id: PrincipleIconId): React.ReactElement {
  const Icon = MAP[id];
  return <Icon className="h-5 w-5" aria-hidden />;
}
