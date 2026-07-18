// src/components/ui/skeleton-primitives.tsx
import { cn } from "@/lib/utils";

/**
 * Static skeletons, deliberately.
 *
 * The old shimmer ran an infinite 1.8s `background-position` cycle — a
 * main-thread paint property, animating forever, inside a Suspense window
 * that usually closes in well under 300ms. The cycle never completed once, so
 * it cost paint work to communicate nothing. A flat block in `--muted` reads
 * as "not loaded yet" just as well and costs nothing. It also removes three
 * animations that had to be special-cased under prefers-reduced-motion.
 */
export function Shimmer({
  className,
  rounded = "rounded-[2px]",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={cn(rounded, "bg-[var(--muted)]", className)} />;
}

/** A chamfered plate placeholder, matching the real plate's geometry. */
export function CardSkeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn("plate p-5 sm:p-6", className)}>{children}</div>;
}

export function IconBoxSkeleton() {
  return <div className="size-9 rounded-[2px] bg-[var(--muted)]" />;
}

export function PillSkeleton({ width = "w-16" }: { width?: string }) {
  return <Shimmer className={cn("h-11", width)} />;
}
