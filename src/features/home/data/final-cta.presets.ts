// src/features/home/data/final-cta.presets.ts
import { FINAL_CTA_DEFAULTS } from "./final-cta";
import type { FinalCtaProps, Media } from "@/features/home/types/final-cta";

// split + image preset
export function presetSplitWithImage(media: Extract<Media, { type: "image" }>): FinalCtaProps {
  return {
    ...FINAL_CTA_DEFAULTS,
    variant: "split",
    media,
  };
}

// split + pattern preset
export function presetSplitPattern(): FinalCtaProps {
  return {
    ...FINAL_CTA_DEFAULTS,
    variant: "split",
    media: { type: "pattern" },
  };
}

// minimal preset (istatistik ve highlight'ları gizler)
export function presetMinimalCenter(): FinalCtaProps {
  return {
    ...FINAL_CTA_DEFAULTS,
    variant: "center",
    highlights: [],
    stats: [],
  };
}
