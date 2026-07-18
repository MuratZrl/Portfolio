// src/app/loading.tsx
import { Shimmer, CardSkeleton } from "@/components/ui/skeleton-primitives";

/**
 * Stands in for the real home layout, so the swap does not shift anything:
 * a 640px coupon plate, the How-I-build plate, then a three-card grid.
 * The old version drew a 96px circular avatar and a status-badge pill,
 * neither of which exists any more.
 */
export default function HomeLoading() {
  return (
    <div className="w-full">
      {/* Hero coupon */}
      <div className="plate max-w-[40rem] p-6 sm:p-8">
        <Shimmer className="h-12 w-full max-w-[18ch] sm:h-14" />
        <Shimmer className="mt-3 h-12 w-4/5 sm:h-14" />
        <Shimmer className="mt-5 h-5 w-full max-w-[52ch]" />
        <Shimmer className="mt-2 h-5 w-3/4" />
        <div className="mt-7 flex gap-3">
          <Shimmer className="h-11 w-40" />
          <Shimmer className="h-11 w-36" />
        </div>
        <Shimmer className="mt-7 h-4 w-72" />
      </div>

      {/* How I build — one plate, three rows */}
      <div className="py-12 sm:py-16">
        <Shimmer className="h-8 w-48" />
        <Shimmer className="mt-2 h-5 w-96 max-w-full" />
        <div className="plate mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={i > 0 ? "border-t-2 border-[var(--edge-hi)] px-6 py-7 sm:px-8" : "px-6 py-7 sm:px-8"}
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(220px,1fr)_2fr] lg:gap-12">
                <div>
                  <Shimmer className="h-6 w-40" />
                  <Shimmer className="mt-3 h-4 w-32" />
                </div>
                <div>
                  <Shimmer className="h-4 w-full" />
                  <Shimmer className="mt-2 h-4 w-5/6" />
                  <Shimmer className="mt-4 h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="py-12 sm:py-16">
        <Shimmer className="h-8 w-40" />
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <CardSkeleton key={i} className="p-0">
              <Shimmer className="aspect-[16/9] w-full" rounded="rounded-none" />
              <div className="flex flex-col gap-4 p-5">
                <Shimmer className="h-4 w-28" />
                <Shimmer className="h-6 w-3/4" />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-2/3" />
              </div>
            </CardSkeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
