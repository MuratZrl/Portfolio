// src/app/paketler/loading.tsx
import { Shimmer, CardSkeleton } from "@/components/ui/skeleton-primitives";

/**
 * Without this file the route falls through to src/app/loading.tsx, which
 * draws the HOME layout: a 40rem hero coupon over a three-row plate. Every
 * other route in the app carries its own skeleton for the same reason.
 *
 * Geometry matches Packages: heading, subheading, then a three-card grid that
 * collapses the same way the real one does.
 */
export default function PackagesLoading() {
  return (
    <div className="w-full">
      <Shimmer className="h-8 w-40" />
      <Shimmer className="mt-2 h-6 w-full max-w-[68ch]" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} className="p-6 sm:p-7">
            <Shimmer className="h-7 w-48" />
            <Shimmer className="mt-2 h-5 w-full" />
            <Shimmer className="mt-1 h-5 w-4/5" />

            <div className="mt-5 mb-6 grid gap-2.5">
              {Array.from({ length: 6 }).map((__, j) => (
                <Shimmer key={j} className="h-5 w-full" />
              ))}
            </div>

            <div className="border-t border-[var(--edge-soft)] pt-4">
              <Shimmer className="h-7 w-40" />
              <Shimmer className="mt-1 h-5 w-36" />
            </div>

            <Shimmer className="mt-5 h-11 w-full" />
          </CardSkeleton>
        ))}
      </div>

      <Shimmer className="mt-6 h-5 w-full max-w-[60ch]" />
    </div>
  );
}
