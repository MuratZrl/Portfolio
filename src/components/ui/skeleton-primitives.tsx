// src/components/ui/skeleton-primitives.tsx
import { cn } from "@/lib/utils";

/* ── Shimmer bar ── */
export function Shimmer({
  className,
  rounded = "rounded-lg",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        rounded,
        "relative overflow-hidden bg-muted",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.72 0.17 162 / 0.08) 40%, oklch(0.72 0.17 162 / 0.14) 50%, oklch(0.72 0.17 162 / 0.08) 60%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ── Frosted glass card skeleton ── */
export function CardSkeleton({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 sm:p-6",
        className,
      )}
      style={{
        animation: `fade-in-up 0.5s ease-out ${delay}s both`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Icon box skeleton (the emerald squares) ── */
export function IconBoxSkeleton() {
  return (
    <div
      className="flex size-9 items-center justify-center rounded-lg bg-primary/10"
      style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
    >
      <div className="size-4 rounded bg-primary/20" />
    </div>
  );
}

/* ── Pill skeleton ── */
export function PillSkeleton({ width = "w-16" }: { width?: string }) {
  return <Shimmer className={cn("h-8", width)} rounded="rounded-full" />;
}
