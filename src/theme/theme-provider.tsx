// src/theme/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Cancels drags on anything the markup has already marked undraggable.
 *
 * globals.css sets `-webkit-user-drag: none` on links, buttons and images,
 * and every anchor on the site carries draggable={false} (verified against
 * the built HTML). Chromium honours the first, and that is the half that has
 * been working. Firefox implements neither reliably for anchors: a link with
 * the attribute set can still tear off a translucent URL ghost, which is the
 * CV button symptom.
 *
 * This is the engine-independent half. One listener at the document root,
 * keyed off the attribute that is already swept across the markup, so no
 * server component has to become a client component to opt in.
 */
function useCancelMarkedDrags(): void {
  React.useEffect(() => {
    const onDragStart = (event: DragEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('[draggable="false"]')) {
        event.preventDefault();
      }
    };

    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): React.JSX.Element {
  useCancelMarkedDrags();
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
