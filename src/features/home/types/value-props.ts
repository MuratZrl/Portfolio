// src/features/home/types/value-props.ts
import type { LucideIcon } from "lucide-react";

export type Href = "/" | `/${string}`;

export type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlights?: readonly string[];
  stat?: { label: string; value: string };
  tags?: readonly string[];
  cta?: { href: Href; label: string; ariaLabel?: string };
};

export type ValuePropsProps = {
  items?: readonly ValueItem[];
  heading?: string;
  subheading?: string;
  className?: string;
};
