// src/app/projects/[slug]/loading.tsx
import { Shimmer } from "@/components/ui/skeleton-primitives";

export default function ProjectDetailLoading() {
  return (
    <div className="w-full">
      {/* Back link */}
      <Shimmer className="h-5 w-32 mb-6" />

      {/* Hero image */}
      <Shimmer className="aspect-video w-full" rounded="rounded-xl" />

      {/* Title & buttons */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <Shimmer className="h-10 w-72 mb-2" />
          <Shimmer className="h-5 w-full max-w-xl mb-1" />
          <Shimmer className="h-5 w-3/4 max-w-md" />
        </div>
        <div className="flex gap-2 shrink-0">
          <Shimmer className="h-10 w-24" rounded="rounded-md" />
          <Shimmer className="h-10 w-24" rounded="rounded-md" />
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-6 w-20" rounded="rounded-md" />
        ))}
      </div>

      {/* Separator */}
      <Shimmer className="h-px w-full my-8" />

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-24 w-full" rounded="rounded-xl" />
        ))}
      </div>

      {/* Languages */}
      <div className="mt-8">
        <Shimmer className="h-6 w-28 mb-4" />
        <Shimmer className="h-3 w-full" rounded="rounded-full" />
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-5 w-24" />
          ))}
        </div>
      </div>

      {/* README */}
      <div className="mt-8">
        <Shimmer className="h-6 w-24 mb-4" />
        <Shimmer className="h-64 w-full" rounded="rounded-xl" />
      </div>
    </div>
  );
}
