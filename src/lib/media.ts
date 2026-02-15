// src/lib/media.ts
export function placeholder(
  w: number = 1280,
  h: number = 720,
  text?: string,
  format: "png" | "jpg" = "png"
): string {
  const bg = "e5e7eb";       // neutral-200 — light, theme-friendly
  const fg = "6b7280";       // neutral-500 — muted text
  const textParam = text ? `&text=${encodeURIComponent(text)}` : "";
  return `https://placehold.co/${w}x${h}/${bg}/${fg}.${format}?font=raleway${textParam}`;
}